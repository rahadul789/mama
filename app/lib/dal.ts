import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, Number(session.userId)));

  return { isAuth: true, userId: session.userId, role: user.role };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, Number(session.userId)));
    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
