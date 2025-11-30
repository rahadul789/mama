"use server";

import bcrypt from "bcryptjs";
import crypto from "crypto";

import {
  SignupFormSchema,
  FormState,
  LoginFormSchema,
  LoginFormState,
  ChangePasswordSchema,
  ChangePasswordFormState,
} from "@/app/lib/definitions";
import { db } from "@/db";
import {
  passwordResetTokens,
  sessions,
  settings,
  usersTable,
} from "@/db/schema";
import {
  createSessionInDB,
  decrypt,
  deleteSession,
  updateSession,
} from "../lib/session";
import { redirect } from "next/navigation";
import { and, eq, gt } from "drizzle-orm";
import { cookies } from "next/headers";
import { sendResetEmail } from "@/lib/mail";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    pin: formData.get("pin"),
  });

  // Early return if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, pin } = validatedFields.data;

  // 🔍 1. Check if email already exists
  const existingUser = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      errors: {
        email: ["Email already exists. Please log in instead."],
      },
    };
  }

  // Getting pin from Database for validation
  const [pinRecord] = await db.select().from(settings).limit(1);

  if (pinRecord?.REGISTER_PIN !== pin) {
    return {
      errors: {
        pin: ["Pin is incorrect. Please contact support."],
      },
    };
  }

  // 🧂 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 💾 3. Insert new user
  const data = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({ id: usersTable.id, role: usersTable.role });

  const user = data[0];
  if (!user) {
    return { message: "An error occurred while creating your account." };
  }

  // 🔑 4. Create session and redirect
  await createSessionInDB(user.id, user.role);
  redirect("/dashboard");
}

export async function login(state: LoginFormState, formData: FormData) {
  // 1) Validate inputs
  const parsed = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { email, password } = parsed.data;

  // 2) Look up user by email
  const rows = await db
    .select({
      id: usersTable.id,
      password: usersTable.password,
      role: usersTable.role,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  const user = rows[0];

  // 3) Do NOT reveal which field is wrong (security)
  if (!user) {
    return {
      // attach to password so it renders near the field
      errors: { password: ["Invalid email or password."] },
    };
  }

  // 4) Check password
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return {
      errors: { password: ["Invalid email or password."] },
    };
  }

  // 5) Session + redirect (reuse your existing helper)
  await createSessionInDB(user.id, user.role);
  redirect("/dashboard");
}

export async function changePassword(
  state: ChangePasswordFormState,
  formData: FormData
) {
  const parsed = ChangePasswordSchema.safeParse({
    oldPassword: formData.get("oldPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { oldPassword, newPassword } = parsed.data;

  // 2) Identify current user via session
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);
  if (!payload || typeof payload.userId === "undefined") {
    return { message: "You must be logged in to change your password." };
  }

  const userId = Number(payload.userId);
  if (Number.isNaN(userId)) {
    return { message: "Invalid session payload." };
  }

  const user = await db
    .select({ password: usersTable.password })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1)
    .then((r) => r[0]);

  if (!user) return { message: "User not found." };

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) {
    return { errors: { oldPassword: ["Old password is incorrect."] } };
  }

  const hashed = await bcrypt.hash(newPassword ?? "", 10);

  await db
    .update(usersTable)
    .set({ password: hashed })
    .where(eq(usersTable.id, userId));

  redirect("/dashboard?success=password-changed");
}

export async function requestPasswordReset(_: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  if (!email) return { message: "Please provide your email." };

  const user = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1)
    .then((r) => r[0]);

  if (!user) {
    // Avoid revealing that the email doesn't exist
    return {
      message: "If this email exists, you’ll receive a reset link shortly.",
    };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await db.insert(passwordResetTokens).values({
    userId: user.id,
    token,
    expiresAt,
  });

  await sendResetEmail(email, token);

  return { message: "If this email exists, a reset link was sent." };
}

export async function resetPassword(_: any, formData: FormData) {
  const token = formData.get("token")?.toString();
  const newPassword = formData.get("newPassword")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  // Validate password match
  if (newPassword !== confirmPassword) {
    return { message: "Passwords did not match." };
  }

  // Ensure new password is provided
  if (!newPassword) {
    return { message: "Please provide a new password." };
  }

  // Ensure token is present to avoid passing undefined into the query
  if (!token) {
    return { message: "Invalid or expired reset link." };
  }

  // Check token
  const record = await db
    .select({
      userId: passwordResetTokens.userId,
      expiresAt: passwordResetTokens.expiresAt,
    })
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.token, token),
        gt(passwordResetTokens.expiresAt, new Date())
      )
    )
    .limit(1)
    .then((r) => r[0]);

  if (!record) return { message: "Invalid or expired reset link." };

  const hashed = await bcrypt.hash(newPassword, 10);

  await db
    .update(usersTable)
    .set({ password: hashed })
    .where(eq(usersTable.id, record.userId));

  // Cleanup token
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.token, token));

  redirect("/1tltd-login?reset=success");
}

export async function updatec() {
  await updateSession();
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function loggedInUser() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);
  if (!payload || typeof payload.userId === "undefined") {
    return null;
  }
  const userId = Number(payload.userId);
  if (Number.isNaN(userId)) {
    return null;
  }

  // Get user details
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1)
    .then((r) => r[0]);
  return user;
}
