"use server";

import bcrypt from "bcryptjs";
import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import {
  createSessionInDB,
  deleteSession,
  updateSession,
} from "../lib/session";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Call the provider or db to create a user...
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
    return {
      message: "An error occurred while creating your account.",
    };
  }

  await createSessionInDB(user.id, user.role);
  redirect("/profile");
}

export async function updatec() {
  await updateSession();
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
