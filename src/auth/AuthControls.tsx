import React, { FormEvent, useState } from "react";
import { useAuth } from "./AuthProvider";
import "./auth.css";

export type AuthControlsProps = {
  redirectTo?: string;
  compact?: boolean;
};

export function AuthControls({ redirectTo, compact = false }: AuthControlsProps) {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState<string | null>(null);

  if (!auth) return null;

  async function handleEmailLogin(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    await auth.signInWithEmail(email.trim(), redirectTo);
    setInfo("Check your inbox for the magic link.");
  }

  if (auth.loading) {
    return <p className="wtc-auth-note">Checking session...</p>;
  }

  if (auth.user) {
    return (
      <div className="wtc-auth-row">
        <span className="wtc-auth-note">Signed in as {auth.user.email}</span>
        <button type="button" className="wtc-auth-btn" onClick={() => auth.signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className={`wtc-auth-login ${compact ? "compact" : ""}`}>
      <form onSubmit={handleEmailLogin} className="wtc-auth-form">
        <label htmlFor="wtc-email-login" className="wtc-visually-hidden">
          Email login
        </label>
        <input
          id="wtc-email-login"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          required
          className="wtc-auth-input"
        />
        <button type="submit" className="wtc-auth-btn">
          Login with Email
        </button>
      </form>
      <button type="button" className="wtc-auth-btn wtc-auth-google" onClick={() => auth.signInWithGoogle(redirectTo)}>
        Continue with Google
      </button>
      {(auth.authError || info) && <p className="wtc-auth-note">{auth.authError ?? info}</p>}
    </div>
  );
}

export default AuthControls;
