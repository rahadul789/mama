import { verifySession } from "@/app/lib/dal";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await verifySession();
  const userRole = session?.role; // Assuming 'role' is part of the session object

  if (userRole === "admin") {
    return <p>I am Admin</p>;
  } else if (userRole === "user") {
    return <p>I am User</p>;
  } else {
    redirect("/login");
  }
}
