import { Link, useLocation } from "react-router-dom";
import { ExternalLink, ChevronDown, ShieldCheck, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ADMIN_ROUTES = [
  { label: "Issue Certificate", to: "/admin/certificates/new" },
  { label: "Upload Cert Template", to: "/admin/templates/new" },
  { label: "Issue Badge", to: "/admin/badges/new" },
  { label: "Upload Badge Template", to: "/admin/badges/templates/new" },
];

// The accounts backend login endpoint — called directly from certify
const ACCOUNTS_LOGIN_API = "https://accounts.sliitmozilla.org/api/login";

/** Token key used by certify frontend (we store it ourselves after login) */
const TOKEN_KEY = "certify_token";

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export default function Header() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getToken());
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Re-check on route change (handles tab-wide logout)
  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    clearToken();
    setIsLoggedIn(false);
  };

  return (
    <>
      <header
        id="site-header"
        className="bg-white z-50 sticky top-0"
        style={{ borderBottom: "1px solid #e8e8e8" }}
      >
        <div
          className="max-w-[1760px] mx-auto flex items-center justify-between"
          style={{ padding: "0 28px", height: "72px" }}
        >
          {/* Brand / Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 shrink-0"
            aria-label="SLIIT Mozilla Club home"
          >
            <img
              src="https://www.sliitmozilla.org/assets/Mozilla-logo.png"
              alt="Mozilla logo"
              style={{ height: "36px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Right side actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* sliitmozilla.org pill link */}
            <a
              href="https://sliitmozilla.org"
              target="_blank"
              rel="noopener noreferrer"
              id="header-club-link"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-moz-gray-mid border border-moz-gray-light rounded-full transition hover:text-moz-orange hover:border-moz-orange shrink-0"
            >
              <span>sliitmozilla.org</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Admin Dropdown (when logged in) */}
            {isLoggedIn && (
              <div className="relative" ref={menuRef}>
                <button
                  id="admin-menu-btn"
                  onClick={() => setMenuOpen((o) => !o)}
                  style={hStyles.adminBtn}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  <ShieldCheck style={{ width: "15px", height: "15px" }} />
                  <span>Admin</span>
                  <ChevronDown
                    style={{
                      width: "14px",
                      height: "14px",
                      transition: "transform 0.2s",
                      transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {menuOpen && (
                  <div
                    id="admin-dropdown"
                    style={hStyles.dropdown}
                  >
                    {ADMIN_ROUTES.map((route) => (
                      <Link
                        key={route.to}
                        to={route.to}
                        onClick={() => setMenuOpen(false)}
                        style={hStyles.dropdownItem}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#fdf3ef";
                          e.currentTarget.style.color = "#F47624";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#414141";
                        }}
                      >
                        {route.label}
                      </Link>
                    ))}
                    <div style={{ borderTop: "1px solid #e8e8e8" }} />
                    <button
                      onClick={handleLogout}
                      style={{ ...hStyles.dropdownItem, color: "#ef4444", background: "none", border: "none", width: "100%", textAlign: "left", cursor: "pointer" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#fef2f2"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Login button — orange, rounded */}
            {!isLoggedIn && (
              <button
                id="login-btn"
                onClick={() => setShowLoginModal(true)}
                style={hStyles.loginBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#d96810";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F47624";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
}

/* ─── Header inline styles ──────────────────────────────────────────────── */

const ORANGE = "#F47624";
const PROMPT = "'Prompt', 'Inter', system-ui, sans-serif";

const hStyles: Record<string, React.CSSProperties> = {
  /* Pill external link — exact Figma spec: 291×54, border-radius 50.82px */
  pill: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9.08px",
    width: "291px",
    height: "54px",
    paddingTop: "20px",
    paddingBottom: "23px",
    boxSizing: "border-box" as const,
    background: "#ffffff",
    border: "1px solid #948D83",
    borderRadius: "50.82px",
    fontFamily: PROMPT,
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "#4a3520",
    textDecoration: "none",
    transition: "border-color 0.18s, color 0.18s",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  /* Admin button */
  adminBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "0 16px",
    height: "44px",
    background: "#fff4ee",
    border: `1px solid ${ORANGE}`,
    borderRadius: "8px",
    fontFamily: "'Segoe UI', sans-serif",
    fontWeight: 350,
    fontSize: "18px",
    lineHeight: "100%",
    letterSpacing: "0%",
    color: ORANGE,
    cursor: "pointer",
    transition: "opacity 0.15s",
  },

  /* Admin dropdown panel */
  dropdown: {
    position: "absolute" as const,
    right: 0,
    top: "calc(100% + 8px)",
    width: "220px",
    background: "#ffffff",
    border: "1px solid #e8e8e8",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
    overflow: "hidden",
    zIndex: 50,
  },

  /* Dropdown list items */
  dropdownItem: {
    display: "block",
    padding: "10px 16px",
    fontFamily: PROMPT,
    fontWeight: 600,
    fontSize: "0.82rem",
    color: "#414141",
    textDecoration: "none",
    transition: "background 0.15s, color 0.15s",
  },

  /* Orange Login button */
  loginBtn: {
    padding: "6px 16px", /* matched to py-1.5 px-4 */
    background: ORANGE,
    border: "none",
    borderRadius: "5px",
    fontFamily: PROMPT,
    fontWeight: 700,
    fontSize: "0.875rem", /* text-sm to match sliitmozilla.org */
    color: "#ffffff",
    cursor: "pointer",
    letterSpacing: "0.01em",
    boxShadow: "0 4px 14px rgba(244,118,36,0.3)",
    transition: "background 0.18s, transform 0.15s",
    whiteSpace: "nowrap",
  },
};

/* ─── Inline Login Modal ─────────────────────────────────────────────────── */

function LoginModal({
  onSuccess,
  onClose,
}: {
  onSuccess: (token: string) => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(ACCOUNTS_LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data?.data?.token) {
        const msg =
          data?.error?.message ?? data?.message ?? "Invalid email or password.";
        setError(Array.isArray(msg) ? msg[0]?.reason ?? msg[0] : msg);
        return;
      }

      onSuccess(data.data.token);
    } catch {
      setError("Could not reach the auth server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
      onClick={handleBackdrop}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative animate-[fadeInUp_0.18s_ease]"
        style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-moz-gray-mid hover:text-moz-black transition-colors cursor-pointer"
          aria-label="Close"
          style={{ background: "none", border: "none" }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://www.sliitmozilla.org/assets/Mozilla-logo.png"
            alt="Mozilla logo"
            className="h-8 w-auto mb-3"
          />
          <h2 className="text-xl font-extrabold text-moz-black tracking-tight m-0">
            Admin Sign In
          </h2>
          <p className="text-xs text-moz-gray-mid mt-1">
            SLIIT Mozilla Club - Certify Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="login-email" className="text-xs font-semibold text-moz-gray-dark">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@sliit.edu.lk"
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="login-password" className="text-xs font-semibold text-moz-gray-dark">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="form-input"
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-xs text-[#c0392b] bg-[#fdf0ef] border border-[#f5c6c2] rounded-lg px-3 py-2 m-0">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-white text-[0.9rem] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background: "linear-gradient(135deg, var(--color-moz-orange) 0%, var(--color-moz-orange-mid) 100%)",
              border: "none",
              boxShadow: loading ? "none" : "0 4px 14px rgba(255,113,57,0.35)",
            }}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
