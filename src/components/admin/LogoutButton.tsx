import { signOut } from "@/lib/auth";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/admin/login" });
      }}
    >
      <button type="submit" className="btn btn-secondary btn-sm">
        Sair
      </button>
    </form>
  );
}
