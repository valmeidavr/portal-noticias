"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { authenticate } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-block" disabled={pending}>
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
}

export default function LoginForm() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);

  return (
    <form action={formAction}>
      {errorMessage && <div className="form-error">{errorMessage}</div>}
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="admin@portal.com"
          defaultValue="admin@portal.com"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
}
