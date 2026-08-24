import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PDFViewer from "../components/PDFViewer";

function PreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const certificateId = id || "Not provided";
  const [certificateBlob, setCertificateBlob] = useState<Blob>();
  const [certificateImg, setCertificateImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl = "";

    const fetchCertificate = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_BACKEND_API}/certificate/${encodeURIComponent(certificateId)}/preview`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          setError("Certificate not found. Please check the ID and try again.");
          return;
        }

        const rawBlob = await response.blob();
        const blob = new Blob([rawBlob], { type: "application/pdf" });
        objectUrl = URL.createObjectURL(blob);
        setCertificateImg(objectUrl);
        setCertificateBlob(blob);
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          return;
        }
        setError(
          `Error fetching certificate: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();

    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [certificateId]);

  const handleDownload = () => {
    if (!certificateBlob) return;
    const fileUrl = URL.createObjectURL(certificateBlob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `certificate-${certificateId}.pdf`;
    link.click();
    URL.revokeObjectURL(fileUrl);
  };

  return (
    <>
      <section style={styles.section}>
        {/* Background blurry word */}
        <h1 style={styles.brandWordShadow} aria-hidden="true">CERTIFY</h1>

        {/* Top Left Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={styles.backBtn}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(0.92)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px" }}>
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        {/* Top Right Download Button */}
        {certificateImg && !loading && !error && (
          <button
            id="download-certificate-button"
            onClick={handleDownload}
            style={styles.downloadBtn}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.96)"}
            onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Download PDF
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "8px", width: "16px", height: "16px" }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        )}

        <div style={styles.inner}>

          {/* Header block */}
          <div style={styles.headerBlock}>
            <h1 style={styles.title}>CERTIFICATE PREVIEW</h1>
            <p style={styles.subtitle}>Certificate ID : {certificateId.toUpperCase()}</p>
          </div>

          {/* Loading */}
          {loading && (
            <div style={styles.statusBox}>
              <span style={styles.spinner}>⟳</span>&nbsp; Loading certificate…
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={styles.errorBox}>⚠ {error}</div>
          )}

          {/* Certificate card */}
          {certificateImg && !loading && !error && (
            <>
              <div style={styles.card}>
                {/* PDF */}
                <div style={styles.pdfWrap}>
                  <PDFViewer url={certificateImg} />
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        #preview-spinner {
          display: inline-block;
          animation: spin-slow 1s linear infinite;
        }
        
        /* Remove the browser scrollbar for a seamless, app-like aesthetic */
        ::-webkit-scrollbar {
          display: none;
          width: 0px;
          background: transparent;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}

/* ─── Scoped styles ─────────────────────────────────────────────────────── */

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    minHeight: "calc(100vh - 72px)",
    background: "rgba(233, 145, 4, 0.19)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "clamp(3rem, 6vw, 5rem) 1.5rem 4rem",
    overflow: "hidden",
  },

  brandWordShadow: {
    margin: 0,
    fontFamily: "'Prompt', system-ui, sans-serif",
    fontWeight: 600,
    fontSize: "clamp(120px, 20vw, 300px)",
    lineHeight: 1,
    letterSpacing: "0.14em",
    color: "#000000",
    textAlign: "center",
    userSelect: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    whiteSpace: "nowrap",
    filter: "blur(18px)",
    opacity: 0.25,
    zIndex: 0,
    pointerEvents: "none",
  },

  backBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "40px",
    height: "40px",
    left: "clamp(1.5rem, 4vw, 3rem)",
    top: "clamp(1.5rem, 4vw, 3rem)",
    background: "#F47624",
    borderRadius: "50%",
    filter: "drop-shadow(0px 4px 6px rgba(244,118,36,0.3))",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    zIndex: 10,
  },

  inner: {
    width: "100%",
    maxWidth: "950px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 0,
  },

  headerBlock: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "2rem",
  },

  title: {
    fontFamily: "'Prompt', system-ui, sans-serif",
    fontWeight: 700,
    fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
    color: "#000000",
    letterSpacing: "0.02em",
    margin: "0 0 0.5rem",
    textTransform: "uppercase",
  },

  subtitle: {
    fontFamily: "'Prompt', system-ui, sans-serif",
    fontWeight: 600,
    fontSize: "0.95rem",
    color: "#000000",
    margin: 0,
  },

  /* Certificate card */
  card: {
    width: "100%",
    background: "#ffffff",
    borderRadius: "16px", /* Matching the 16px radius of the input on home */
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07), 0 8px 40px rgba(89,42,203,0.06)",
    marginBottom: "2rem",
  },

  pdfWrap: {
    padding: "1.5rem",
    height: "58vh",
    minHeight: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Download button - Matches Verify pill button from Homepage */
  downloadBtn: {
    position: "absolute",
    top: "clamp(1.5rem, 4vw, 3rem)",
    right: "clamp(1.5rem, 4vw, 3rem)",
    display: "flex",
    alignItems: "center",
    padding: "0.7rem 1.2rem",
    borderRadius: "999px",
    border: "none",
    background: "#F47624",
    color: "#ffffff",
    fontSize: "0.95rem",
    fontFamily: "'Montserrat', system-ui, sans-serif",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0px 2px 4px rgba(136,144,194,0.2), 0px 5px 15px rgba(37,44,97,0.15)",
    transition: "transform 0.15s ease, opacity 0.15s ease",
    zIndex: 10,
  },

  /* Status displays */
  statusBox: {
    padding: "1rem",
    color: "#000000",
    fontFamily: "'Prompt', system-ui, sans-serif",
    fontSize: "1.1rem",
    fontWeight: 500,
  },

  errorBox: {
    padding: "1rem 1.5rem",
    background: "#fff0ed",
    color: "#cc2b04",
    borderRadius: "8px",
    fontFamily: "'Prompt', system-ui, sans-serif",
    border: "1px solid #ffd2c7",
    fontWeight: 500,
  },

  spinner: {
    display: "inline-block",
    animation: "spin-slow 1s linear infinite",
  },

};

export default PreviewPage;
