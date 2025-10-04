import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import { db } from "@/db";
import { sessions } from "@/db/schema";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax", // Strict, Lax, None
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function isSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return false;
  }

  return true;
}

export async function createSessionInDB(id: number, role: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // 1. Create a session in the database
  const data = await db
    .insert(sessions)
    .values({
      userId: id,
      expiresAt,
    })
    // Return the session ID
    .returning({ id: sessions.userId });

  const sessionId = data[0].id;

  // 2. Encrypt the session ID
  const session = await encrypt({ userId: sessionId, expiresAt, role: role });

  // 3. Store the session in cookies for optimistic auth checks
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

// HttpOnly : যদি কুকি HttpOnly হিসেবে সেট করা হয়, তাহলে ব্রাউজারের JavaScript (client-side) দিয়ে ওই কুকি অ্যাক্সেস করা যাবে না।

// কেন দরকার: XSS (Cross-Site Scripting) আক্রমণ থেকে সুরক্ষার জন্য।
// ➡️ উদাহরণ: document.cookie দিয়ে কুকি পড়তে চাইলে পাবেন না।

// 🔒 Secure
// মানে: Secure সেট করা থাকলে কুকি শুধুমাত্র HTTPS কানেকশন এর মাধ্যমে পাঠানো হবে।
// কেন দরকার: অনিরাপদ HTTP তে কুকি পাঠানো আটকানোর জন্য।
// ➡️ এতে man-in-the-middle আক্রমণ থেকে সুরক্ষা মেলে।

// 🌍 SameSite : কুকি কখন cross-site request এর সাথে পাঠানো যাবে, সেটা নিয়ন্ত্রণ করে।

//   Strict
// কুকি শুধুমাত্র একই সাইট থেকে পাঠানো হলে যাবে।
// অন্য কোনো সাইট থেকে আসা request এ কুকি যাবে না।
// সবচেয়ে নিরাপদ, তবে ইউজার এক্সপেরিয়েন্স কিছুটা কমে যেতে পারে।
// উদাহরণ: ইউজার যদি ফেসবুক থেকে লিঙ্কে ক্লিক করে আপনার সাইটে আসে, তখন কুকি যাবে না।

//   Lax
// ডিফল্ট মোড।
// সাধারণত cross-site request এ কুকি যাবে না, কিন্তু কিছু "safe" request (যেমন GET, top-level navigation) এ কুকি যাবে।
// উদাহরণ: ইউজার Google search থেকে আপনার সাইটে এলো, তখন কুকি যাবে।

//   None
// সব ধরনের cross-site request এ কুকি যাবে।
// তবে Secure=true থাকতে হবে।
// সাধারণত third-party সেবা (যেমন payment gateway, social login) এর জন্য দরকার হয়।
