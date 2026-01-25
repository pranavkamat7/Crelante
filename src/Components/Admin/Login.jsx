import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (
      user === import.meta.env.VITE_ADMIN_USER &&
      pass === import.meta.env.VITE_ADMIN_PASS
    ) {
      localStorage.setItem("admin", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>
        <p style={styles.subtitle}>Invoice Generator Access</p>

        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255,255,255,0.96)",
    padding: "clamp(20px, 5vw, 32px)",
    borderRadius: "18px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
    textAlign: "center",
  },

  title: {
    fontSize: "clamp(22px, 5vw, 26px)",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#111827",
  },

  subtitle: {
    fontSize: "clamp(13px, 3.5vw, 14px)",
    color: "#6b7280",
    marginBottom: "24px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "14px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "clamp(14px, 4vw, 15px)",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    marginTop: "10px",
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    color: "#fff",
    fontSize: "clamp(15px, 4vw, 16px)",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(99,102,241,0.45)",
  },
};
