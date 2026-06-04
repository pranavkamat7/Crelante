import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevents page reload on form submit
    
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

        .login-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #F9F8F6; /* Matches your new off-white theme background */
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: #FFFFFF;
          padding: 48px 40px;
          border-radius: 20px;
          border: 1px solid #E5E5E5;
          box-shadow: 0 12px 32px rgba(0,0,0,0.03);
          text-align: center;
        }

        .login-logo-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .login-logo {
          width: 64px;
          height: 64px;
          border-radius: 14px;
          object-fit: contain;
          border: 1px solid #E5E5E5;
          padding: 4px;
        }

        .login-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #0A0A0A;
          margin-bottom: 8px;
        }

        .login-subtitle {
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #FF4E25;
          margin-bottom: 32px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .login-input {
          width: 100%;
          padding: 16px;
          border-radius: 10px;
          border: 1px solid #E5E5E5;
          background: #F9F8F6;
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #0A0A0A;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .login-input::placeholder {
          color: #A0A0A0;
        }

        .login-input:focus {
          background: #FFFFFF;
          border-color: #FF4E25;
          box-shadow: 0 0 0 3px rgba(255, 78, 37, 0.1);
        }

        .login-btn {
          width: 100%;
          padding: 16px;
          border-radius: 10px;
          border: none;
          margin-top: 8px;
          background: #0A0A0A;
          color: #FFFFFF;
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.8, 0, 0.2, 1), background 0.3s ease;
        }

        .login-btn:hover {
          background: #FF4E25;
          transform: translateY(-2px);
        }

        .login-btn:active {
          transform: scale(0.98);
        }
      `}</style>
      
      <div className="login-page">
        <div className="login-card">
          
          <div className="login-logo-wrap">
            <img src="/crelante.jpg" alt="Crelante Logo" className="login-logo" style={{ borderRadius: '8px', objectFit: 'contain' }} />
          </div>
          
          <h2 className="login-title">Admin Access</h2>
          <p className="login-subtitle">Invoice Generator</p>

          <form className="login-form" onSubmit={handleLogin}>
            <input
              className="login-input"
              placeholder="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />

            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />

            <button type="submit" className="login-btn">
              Secure Login
            </button>
          </form>
          
        </div>
      </div>
    </>
  );
}