import { drizzle } from "drizzle-orm/neon-http";
export const db = drizzle(process.env.DATABASE_URL!);

// import "dotenv/config";
// import { drizzle } from "drizzle-orm/neon-http";

// export const db = drizzle(process.env.DATABASE_URL!);

// const user = {
//   name: "Phon",
//   age: 20,
//   email: "phon@example.com",
// };

// async function main() {
//   await db.insert(usersTable).values(user);
//   console.log("New user created!");

//   const users = await db.select().from(usersTable);
//   console.log("Getting all users from the database: ", users);
// }

// main();
