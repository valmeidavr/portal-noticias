import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login | Painel Admin",
};

export default function LoginPage() {
  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="logo">
          <span className="logo-mark">P</span>ortal
        </div>
        <p className="subtitle">Painel Administrativo</p>
        <LoginForm />
        <p
          style={{
            marginTop: 20,
            fontSize: 12,
            color: "#999",
            textAlign: "center",
          }}
        >
          Acesso de demonstração: admin@portal.com / admin123
        </p>
      </div>
    </div>
  );
}
