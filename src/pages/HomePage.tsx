import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [mode, setMode] = useState<"certificate" | "badge">("certificate");
  const [certId, setCertId] = useState("");
  const [badgeId, setBadgeId] = useState("");
  const navigate = useNavigate();

  const isCert = mode === "certificate";
  const inputValue = isCert ? certId : badgeId;
  const setInputValue = isCert ? setCertId : setBadgeId;

  const handleVerify = () => {
    if (isCert) {
      const t = certId.trim();
      if (!t) return;
      navigate(`/certificates/${encodeURIComponent(t)}`);
    } else {
      const t = badgeId.trim();
      if (!t) return;
      navigate(`/badges/verify`, { state: { badgeId: t } });
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleVerify();
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <div style={styles.hero}>
        {/* Gradient overlay */}
        <div style={styles.heroGradient} />

        <div style={styles.heroInner}>
          {/* Blurry shadow layer: positioned absolutely behind the text */}
          <h1 style={styles.brandWordShadow} aria-hidden="true">CERTIFY</h1>
          {/* Foreground text layer */}
          <h1 style={styles.brandWord} aria-label="Certify">CERTIFY</h1>
        </div>
      </div>

      {/* ── Content section ──────────────────────────────────────────────── */}
      <div style={styles.contentSection}>
        <div style={styles.contentInner}>

          {/* Mode tabs — subtle pill switcher */}
          <div style={styles.modeTabs}>
            <button
              id="tab-certificate"
              style={{
                ...styles.modeTab,
                ...(isCert ? styles.modeTabActive : {}),
              }}
              onClick={() => setMode("certificate")}
            >
              Certificate
            </button>
            <button
              id="tab-badge"
              style={{
                ...styles.modeTab,
                ...(!isCert ? styles.modeTabActive : {}),
              }}
              onClick={() => setMode("badge")}
            >
              Badge
            </button>
          </div>

          <p style={styles.headline}>
            Enter the unique {isCert ? "certificate" : "badge"} ID to instantly verify an
            <br />
            official credential issued by{" "}
            <a
              href="https://sliitmozilla.org"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.orgLink}
            >
              SLIIT Mozilla Club
            </a>
            .
          </p>

          {/* Input label */}
          <label htmlFor="credential-id-input" style={styles.inputLabel}>
            {isCert ? "Certificate ID" : "Badge ID"}
          </label>

          {/* Input */}
          <input
            id="credential-id-input"
            type="text"
            placeholder={isCert ? "Eg : E189A0B95472" : "Eg : BDG-12345678"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKey}
            style={styles.input}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#F47624";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(244,118,36,0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#D9D9D9";
              e.currentTarget.style.boxShadow = "none";
            }}
          />

          {/* CTA */}
          <button
            id="verify-credential-button"
            onClick={handleVerify}
            style={styles.verifyBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d96810";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F47624";
            }}
            onMouseDown={(e) => { e.currentTarget.style.opacity = "0.9"; }}
            onMouseUp={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            Verify {isCert ? "Certificate" : "Badge"}
          </button>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        #credential-id-input::placeholder {
          color: #B3B3B3;
          font-family: 'Prompt', system-ui, sans-serif;
        }
      `}</style>
    </div>
  );
}

/* ─── Styles ────────────────────────────────────────────────────────────── */
const ORANGE = "#F47624";
const PROMPT = "'Prompt', system-ui, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  hero: {
    position: "relative",
    width: "100%",
    paddingTop: "clamp(24px, 4vw, 48px)",
    paddingBottom: 0,
    overflow: "visible",
    flexShrink: 0,
  },

  heroGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "calc(100% + 5rem)",
    background: "linear-gradient(90deg, #F47624 0%, #FFFFFF 100%)",
    opacity: 0.3,
    zIndex: 0,
    pointerEvents: "none",
    WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
    maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
  },

  heroInner: {
    position: "relative",
    zIndex: 2,
    marginBottom: "clamp(-24px, -5vw, -48px)",
  },

  brandWordShadow: {
    margin: 0,
    padding: "0 4px",
    fontFamily: PROMPT,
    fontWeight: 600,
    fontSize: "clamp(64px, 12vw, 160px)",
    lineHeight: 1,
    letterSpacing: "0.14em",
    color: "#000000",
    textAlign: "center",
    userSelect: "none",
    position: "absolute",
    inset: 0,
    whiteSpace: "nowrap",
    filter: "blur(16px)",
    opacity: 0.55,
    transform: "translateY(24px)",
    zIndex: -1,
  },

  brandWord: {
    margin: 0,
    padding: "0 4px",
    fontFamily: PROMPT,
    fontWeight: 600,
    fontSize: "clamp(64px, 12vw, 160px)",
    lineHeight: 1,
    letterSpacing: "0.14em",
    color: "#000000",
    textAlign: "center",
    userSelect: "none",
    position: "relative",
    whiteSpace: "nowrap",
  },

  /* Cream section — top padding reserves space the h1 overlaps.
     Padding tightened so the button is visible without scrolling at 100% zoom. */
  contentSection: {
    flex: 1,
    /* Smoothly fade the top boundary so it perfectly merges with the hero above */
    background: "linear-gradient(to bottom, transparent 0%, rgba(233, 145, 4, 0.19) clamp(1.5rem, 4vw, 3rem))",
    padding: "clamp(2.25rem, 5vw, 4rem) 1.5rem clamp(1.75rem, 3vw, 2.5rem)",
    position: "relative",
    zIndex: 1,
  },

  contentInner: {
    maxWidth: "900px",
    marginLeft: "clamp(1.5rem, 6vw, 80px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 0,
  },

  /* Mode switcher — no visible container, just pill buttons */
  modeTabs: {
    display: "flex",
    gap: "0px",
    marginBottom: "1.1rem",
    background: "transparent",
    padding: "0",
    border: "none",
  },
  modeTab: {
    fontFamily: PROMPT,
    fontWeight: 600,
    fontSize: "0.88rem",
    padding: "8px 20px",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    background: "transparent",
    color: "#83756b",
    transition: "all 0.18s ease",
  },
  modeTabActive: {
    background: ORANGE,
    color: "#fff",
    boxShadow: "0 2px 10px rgba(244,118,36,0.35)",
  },

  headline: {
    fontFamily: PROMPT,
    fontWeight: 600,
    fontSize: "clamp(1.1rem, 2.1vw, 1.7rem)",
    lineHeight: 1.5,
    letterSpacing: "0.02em",
    color: "#000000",
    margin: "0 0 1.3rem",
    maxWidth: "900px",
  },

  /* SLIIT Mozilla Club — orange underline, matches reference */
  orgLink: {
    color: ORANGE,
    fontFamily: PROMPT,
    fontWeight: 600,
    textDecoration: "underline",
    textDecorationColor: ORANGE,
    textDecorationThickness: "2px",
    textUnderlineOffset: "4px",
    whiteSpace: "nowrap",
  },

  /* Input label — small, semibold, black */
  inputLabel: {
    fontFamily: PROMPT,
    fontWeight: 600,
    fontSize: "1rem",
    color: "#000000",
    marginBottom: "0.5rem",
    display: "block",
    letterSpacing: "0.02em",
  },

  /* Text input — matches reference width, radius & border */
  input: {
    width: "100%",
    maxWidth: "478px",
    padding: "0.85rem 1.1rem",
    borderRadius: "16px",
    border: "1px solid #D9D9D9",
    background: "#ffffff",
    color: "#000000",
    fontSize: "1rem",
    fontFamily: "'Inter', system-ui, sans-serif",
    outline: "none",
    boxSizing: "border-box" as const,
    marginBottom: "1.2rem",
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
  },

  /* Verify button — orange pill, matched proportional size */
  verifyBtn: {
    width: "100%",
    maxWidth: "354px",
    padding: "0.9rem 1.5rem",
    borderRadius: "999px",
    border: "none",
    background: ORANGE,
    color: "#ffffff",
    fontSize: "1.05rem",
    fontFamily: "'Montserrat', system-ui, sans-serif",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0px 2px 4px rgba(136,144,194,0.2), 0px 5px 15px rgba(37,44,97,0.15)",
    transition: "background 0.18s ease, opacity 0.15s ease",
  },
};