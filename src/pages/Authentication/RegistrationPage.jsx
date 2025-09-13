import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; 

//user context
import { UserContext } from "../../contexts/UserContext";

// Reuse the animated background class
class FlowingLines {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.particleCount = 100;
    this.connectionDistance = 150;
    this.mouse = { x: 0, y: 0 };

    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();
  }

  bindEvents() {
    const handleResize = () => this.resizeCanvas();
    const handleMouseMove = (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    this.canvas.addEventListener("mousemove", handleMouseMove);

    this.cleanupFunctions = [
      () => window.removeEventListener("resize", handleResize),
      () => this.canvas.removeEventListener("mousemove", handleMouseMove),
    ];
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
      });
    }
  }

  updateParticles() {
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
    });
  }

  drawParticles() {
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    this.particles.forEach((p) => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawConnections() {
    this.particles.forEach((p1, i) => {
      this.particles.slice(i + 1).forEach((p2) => {
        const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        if (dist < this.connectionDistance) {
          const opacity = 1 - dist / this.connectionDistance;
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
          this.ctx.lineWidth = opacity * 2;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      });
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateParticles();
    this.drawConnections();
    this.drawParticles();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  cleanup() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.cleanupFunctions) this.cleanupFunctions.forEach((fn) => fn());
  }
}

function Register({ onRegister }) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 Add state for password visibility

  const canvasRef = useRef(null);
  const flowingLinesRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      flowingLinesRef.current = new FlowingLines(canvasRef.current);
    }
    return () => {
      if (flowingLinesRef.current) flowingLinesRef.current.cleanup();
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        {
          username,
          email,
          password_hash: password,
        }
      );

      localStorage.setItem("token", data.token);
      setUser(data);
      setSuccess("✅ Registration successful! Redirecting...");
      onRegister?.(data);

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // --- STYLES (reused from Login) ---
  const containerStyle = {
    position: "relative",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };
  const videoContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    background: "linear-gradient(135deg, #0F2920 0%, #2D5A3D 100%)",
  };
  const canvasStyle = { position: "absolute", width: "100%", height: "100%", opacity: 0.8 };
  const overlayStyle = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.4)", zIndex: 1 };
  const contentStyle = { position: "relative", zIndex: 2, minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" };
  const cardStyle = { background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px", padding: "40px", maxWidth: "450px", width: "100%", boxShadow: "0 25px 45px rgba(0, 0, 0, 0.1)" };
  const titleStyle = { color: "#fff", fontSize: "2.5rem", fontWeight: 700, marginBottom: "10px", textAlign: "center" };
  const subtitleStyle = { color: "rgba(255, 255, 255, 0.8)", fontSize: "1rem", textAlign: "center", marginBottom: "30px" };
  const inputStyle = { 
    width: "100%", 
    padding: "15px 20px", 
    background: "rgba(255, 255, 255, 0.1)", 
    border: "1px solid rgba(255, 255, 255, 0.3)", 
    borderRadius: "12px", 
    color: "#fff", 
    fontSize: "16px", 
    outline: "none", 
    boxSizing: "border-box",
    lineHeight: "18px" // 👈 Added from Login for consistency
  };
  const buttonStyle = { 
    width: "100%", 
    padding: "15px", 
    background: loading ? "rgba(153,153,153,0.6)" : "linear-gradient(135deg, #1B4332 0%, #2D5A3D 100%)", 
    color: "#fff", 
    border: "none", 
    borderRadius: "12px", 
    fontSize: "16px", 
    fontWeight: 600, 
    cursor: loading ? "not-allowed" : "pointer" 
  };
  const linkButtonStyle = { background: "none", border: "none", color: "white", textDecoration: "underline", cursor: "pointer", fontSize: "14px", marginLeft: "5px" };
  const errorStyle = { padding: "12px", borderRadius: "8px", textAlign: "center", background: "rgba(255, 82, 82, 0.2)", border: "1px solid rgba(255, 82, 82, 0.5)", color: "#ff5252" };
  const successStyle = { padding: "12px", borderRadius: "8px", textAlign: "center", background: "rgba(76, 175, 80, 0.2)", border: "1px solid rgba(76, 175, 80, 0.5)", color: "#4caf50" };

  return (
    <div style={containerStyle}>
      <style>{`
        .form-input:focus {
          border-color: #fff;
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.02);
        }
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .link-button:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-radius: 4px;
          padding: 2px 4px !important;
        }
      `}</style>
      <div style={videoContainerStyle}>
        <canvas ref={canvasRef} style={canvasStyle} />
        <div style={overlayStyle} />
      </div>

      <div style={contentStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Create Account</h1>
          <p style={subtitleStyle}>Join our cultural heritage community</p>

          <form onSubmit={handleRegister}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom:"2rem" }}>
              <input 
                type="text" 
                placeholder="Username" 
                style={inputStyle} 
                className="form-input"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                disabled={loading} 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                style={inputStyle} 
                className="form-input"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                disabled={loading} 
              />
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  style={{ ...inputStyle, paddingRight: "40px" }}
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                    padding: 0,
                    width: "24px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    right: "12px",
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && <div style={errorStyle}>{error}</div>}
            {success && <div style={successStyle}>{success}</div>}
            <button 
              type="submit" 
              style={buttonStyle} 
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div style={{ textAlign: "center", paddingTop: "25px" }}>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
              Already have an account?
              <button 
                style={linkButtonStyle} 
                className="link-button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
