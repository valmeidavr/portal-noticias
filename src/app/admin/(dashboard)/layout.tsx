import Link from "next/link";
import { auth } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="logo">
          <span className="logo-mark">P</span>ortal
        </Link>
        <AdminNav />
      </aside>
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-user">
            Olá, <strong>{session?.user?.name ?? "Admin"}</strong>
          </div>
          <LogoutButton />
        </div>
        {children}
      </div>
    </div>
  );
}
