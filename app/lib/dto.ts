// import "server-only";
// import { getUser } from "@/app/lib/dal";
// import { db } from "@/db";
// import { usersTable } from "@/db/schema";
// import { eq } from "drizzle-orm";

// // Define or import the User type
// type User = {
//   id: number;
//   name?: string;
//   //   email: string;
//   //   password: string;
//   //   isAdmin?: boolean;
//   //   updated_at: Date;
//   //   created_at: Date;
// } | null;

// function canSeeUsername(viewer: User) {
//   return true;
// }

// export async function getProfileDTO(id: number) {
//   const data = await db.select().from(usersTable).where(eq(usersTable.id, id));

//   const user = data[0];

//   const currentUser = await getUser();

//   // Or return only what's specific to the query here
//   return {
//     name: canSeeUsername(currentUser) ? user.name : null,
//     email: canSeeUsername(currentUser) ? user.email : null,
//   };
// }
