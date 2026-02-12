# Supabase Auth module

Centralized session management for all screens.

## What it provides
- `AuthProvider`: initializes Supabase auth, hydrates session on load, subscribes to `onAuthStateChange`.
- `useAuth()`: shared auth state + actions.
- `AuthControls`: reusable UI controls for email magic-link login + Google OAuth + sign out.

## Session logic
1. On app mount, `AuthProvider` calls `supabase.auth.getSession()`.
2. Provider subscribes to `supabase.auth.onAuthStateChange(...)` for live session updates.
3. Session, user, loading, and auth errors are stored in context.
4. Screens consume this context through `AuthControls` and/or `useAuth`.
5. Sign-in methods:
   - Email: `signInWithOtp` (magic link)
   - Google: `signInWithOAuth({ provider: "google" })`
6. Sign-out uses `supabase.auth.signOut()` and updates context immediately via auth state listener.

## Setup
Set env vars:
- `NEXT_PUBLIC_SUPABASE_URL` (or `VITE_SUPABASE_URL`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or `VITE_SUPABASE_ANON_KEY`)

Wrap app root:

```tsx
<AuthProvider>
  <AppLayout>
    <HomeScreen />
  </AppLayout>
</AuthProvider>
```
