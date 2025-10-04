import { logout, updatec } from "@/app/actions/auth";

export default async function ProfilePage() {
  return (
    <div>
      <h1>I am profile...hahahaha!</h1>
      <div>users list</div>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
      <button type="submit" onClick={updatec}>
        update
      </button>
    </div>
  );
}
