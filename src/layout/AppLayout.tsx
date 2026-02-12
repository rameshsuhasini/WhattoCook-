import React, { ReactNode, useState } from "react";
import "./AppLayout.css";
import { useAuth } from "../auth";

export type NavItem = {
  key: "home" | "recipes" | "weekly-menu" | "groceries";
  label: string;
  href: string;
};

export type AppLayoutProps = {
  appName?: string;
  appIcon?: ReactNode;
  navItems?: NavItem[];
  activeNavKey?: NavItem["key"];
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  headerActions?: ReactNode;
  children: ReactNode;
  useSupabaseAuth?: boolean;
  authRedirectTo?: string;
};

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "recipes", label: "Recipes", href: "/recipes" },
  { key: "weekly-menu", label: "Weekly Menu", href: "/weekly-menu" },
  { key: "groceries", label: "Groceries", href: "/groceries" },
];

function DefaultAppIcon() {
  return <span className="wtc-logo-mark" aria-hidden="true">🍲</span>;
}

export function AppLayout({
  appName = "WhatToCook?",
  appIcon,
  navItems = DEFAULT_NAV_ITEMS,
  activeNavKey,
  isLoggedIn = false,
  onLogin,
  onProfileClick,
  onSettingsClick,
  headerActions,
  children,
  useSupabaseAuth = true,
  authRedirectTo,
}: AppLayoutProps) {
  const auth = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="wtc-layout-root">
      <header className="wtc-top-header">
        <div className="wtc-header-left">
          <button
            className="wtc-icon-btn wtc-menu-btn"
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isSidebarOpen}
          >
            ☰
          </button>
          <div className="wtc-brand-wrap">
            {appIcon ?? <DefaultAppIcon />}
            <span className="wtc-brand-name">{appName}</span>
          </div>
        </div>

        <div className="wtc-header-right">
          {headerActions}
          {useSupabaseAuth && auth ? (
            auth.loading ? (
              <span className="wtc-auth-inline-note">Checking session...</span>
            ) : auth.user ? (
              <>
                <span className="wtc-auth-inline-note">{auth.user.email}</span>
                <button className="wtc-icon-btn" type="button" onClick={onProfileClick} aria-label="Open profile">
                  👤
                </button>
                <button className="wtc-icon-btn" type="button" onClick={onSettingsClick} aria-label="Open settings">
                  ⚙️
                </button>
                <button className="wtc-btn" type="button" onClick={() => auth.signOut()}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button className="wtc-btn" type="button" onClick={() => auth.signInWithGoogle(authRedirectTo)}>
                  Google
                </button>
                <button className="wtc-btn wtc-btn-primary" type="button" onClick={onLogin}>
                  Login
                </button>
              </>
            )
          ) : !isLoggedIn ? (
            <button className="wtc-btn wtc-btn-primary" type="button" onClick={onLogin}>
              Login
            </button>
          ) : (
            <>
              <button className="wtc-icon-btn" type="button" onClick={onProfileClick} aria-label="Open profile">
                👤
              </button>
              <button className="wtc-icon-btn" type="button" onClick={onSettingsClick} aria-label="Open settings">
                ⚙️
              </button>
            </>
          )}
        </div>
      </header>

      <div className="wtc-layout-body">
        <aside className={`wtc-sidebar ${isSidebarOpen ? "open" : ""}`}>
          <nav aria-label="Primary">
            <ul className="wtc-nav-list">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    className={`wtc-nav-link ${activeNavKey === item.key ? "active" : ""}`}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="wtc-main-content" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
