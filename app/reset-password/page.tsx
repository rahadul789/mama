// app/reset-password/page.tsx

import { ResetPasswordForm } from "../(dashboard)/_components/reset-password";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams?.token || "";

  return (
    <div className="">
      <ResetPasswordForm token={token} />
    </div>
  );
}
