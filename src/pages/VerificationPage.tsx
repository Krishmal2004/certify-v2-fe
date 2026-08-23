import { useState } from "react";


import { useNavigate } from "react-router-dom";

function VerificationPage() {
    const [mode, setMode] = useState<"certificate" | "badge">("certificate");
    const [certificateId, setCertificateId] = useState("");
    const [badgeId, setBadgeId] = useState("");
    const navigate = useNavigate();

    const isCert = mode === "certificate";

    const handleVerify = () => {
        if (isCert) {
            const trimmed = certificateId.trim();
            if (!trimmed) return;
            navigate(`/certificates/${encodeURIComponent(trimmed)}`);
        } else {
            const trimmed = badgeId.trim();
            if (!trimmed) return;
            navigate(`/badges/verify`, { state: { badgeId: trimmed } });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleVerify();
    };

    return (
        <>
            <section style={styles.section}>
                <div style={styles.inner}>
                    {/* Hero heading */}
                    <h1 style={styles.heading}>
                        {isCert ? (
                            <>
                                <span style={styles.orange}>Your Achievements.</span>
                                <br />
                                <span style={styles.black}>Officially Certified.</span>
                            </>
                        ) : (
                            <>
                                <span style={styles.orange}>Your Badges.</span>
                                <br />
                                <span style={styles.black}>Officially Verified.</span>
                            </>
                        )}
                    </h1>

                    {/* Subtitle */}
                    <p style={styles.subtitle}>
                        {isCert
                            ? "Get your certificates in one place."
                            : "Confirm the authenticity of your digital badge."}
                    </p>

                    {/* Input */}
                    <input
                        id={isCert ? "certificate-id-input" : "badge-id-input"}
                        type="text"
                        placeholder={isCert ? "Certificate ID" : "Badge ID"}
                        value={isCert ? certificateId : badgeId}
                        onChange={(e) =>
                            isCert
                                ? setCertificateId(e.target.value)
                                : setBadgeId(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        style={styles.input}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#ff7139";
                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,113,57,0.12)";
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#dcdcdc";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    />

                    {/* Primary CTA Button */}
                    <button
                        id={isCert ? "verify-button" : "verify-badge-button"}
                        onClick={handleVerify}
                        style={styles.button}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#e3572a";
                            e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,113,57,0.48)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#ff7139";
                            e.currentTarget.style.boxShadow = "0 4px 18px rgba(255,113,57,0.35)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.opacity = "0.92";
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.opacity = "1";
                        }}
                    >
                        {isCert ? "Verify Your Certificate" : "Verify Your Badge"}
                    </button>

                    {/* Mode toggle link */}
                    <p style={styles.switchRow}>
                        {isCert ? (
                            <>
                                Have a badge?{" "}
                                <button
                                    id="switch-to-badge"
                                    onClick={() => setMode("badge")}
                                    style={styles.switchLink}
                                >
                                    Verify a Badge instead →
                                </button>
                            </>
                        ) : (
                            <>
                                Have a certificate?{" "}
                                <button
                                    id="switch-to-certificate"
                                    onClick={() => setMode("certificate")}
                                    style={styles.switchLink}
                                >
                                    Verify a Certificate instead →
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </section>

            <style>{`
                #certificate-id-input::placeholder,
                #badge-id-input::placeholder {
                    color: #c0bfbf;
                }
            `}</style>
        </>
    );
}

/* ─── Scoped inline styles ──────────────────────────────────────────────── */

const styles: Record<string, React.CSSProperties> = {
    section: {
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        padding: "3rem 1.5rem",
    },

    inner: {
        width: "100%",
        maxWidth: "680px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 0,
    },

    heading: {
        fontSize: "clamp(2.6rem, 7vw, 4.25rem)",
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: "-0.03em",
        margin: "0 0 1rem",
        fontFamily: "Inter, 'Inter Fallback', system-ui, sans-serif",
    },

    orange: {
        color: "#ff7139",
    },

    black: {
        color: "#1a1a1a",
    },

    subtitle: {
        fontSize: "1rem",
        color: "#8a8a8a",
        margin: "0 0 2rem",
        fontWeight: 400,
        lineHeight: 1.5,
    },

    input: {
        width: "100%",
        maxWidth: "460px",
        padding: "0.875rem 1.1rem",
        borderRadius: "4px",
        border: "1.5px solid #dcdcdc",
        background: "#ffffff",
        color: "#1a1a1a",
        fontSize: "0.95rem",
        fontFamily: "Inter, 'Inter Fallback', system-ui, sans-serif",
        outline: "none",
        boxSizing: "border-box",
        marginBottom: "0.75rem",
        transition: "border-color 0.18s ease, box-shadow 0.18s ease",
    },

    button: {
        width: "100%",
        maxWidth: "460px",
        padding: "0.9rem 1rem",
        borderRadius: "4px",
        border: "none",
        background: "#ff7139",
        color: "#ffffff",
        fontSize: "1rem",
        fontWeight: 700,
        fontFamily: "Inter, 'Inter Fallback', system-ui, sans-serif",
        cursor: "pointer",
        boxShadow: "0 4px 18px rgba(255,113,57,0.35)",
        transition: "background 0.18s ease, transform 0.15s ease, box-shadow 0.18s ease",
        letterSpacing: "0.01em",
        marginBottom: "1.25rem",
    },

    switchRow: {
        fontSize: "0.82rem",
        color: "#a0a0a0",
        margin: 0,
    },

    switchLink: {
        background: "none",
        border: "none",
        color: "#ff7139",
        fontWeight: 600,
        cursor: "pointer",
        fontSize: "0.82rem",
        fontFamily: "Inter, 'Inter Fallback', system-ui, sans-serif",
        padding: 0,
        textDecoration: "underline",
        textDecorationColor: "transparent",
        transition: "text-decoration-color 0.15s",
    },
};

export default VerificationPage;
