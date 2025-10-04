import { db } from "@/db";
import { usersTable } from "@/db/schema";
import React from "react";

const page = async () => {
  const data = await db.select().from(usersTable);
  return (
    <div>
      {data.map((u) => (
        <p key={u.id}>{u.name}</p>
      ))}
    </div>
  );
};

export default page;
