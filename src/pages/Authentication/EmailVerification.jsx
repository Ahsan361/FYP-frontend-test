import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { UserContext } from "../../contexts/UserContext";
import { verifyEmail, resendOTP } from "../../services/authService"; // Import auth service

// FlowingLines class remains unchanged
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

function EmailVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(UserContext);
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const { userId, email } = location.state || {};
  
  const canvasRef = useRef(null);
  const flowingLinesRef = useRef(null);

  useEffect(() => {
    if (!userId || !email) {
      navigate("/register");
      return;
    }

    if (canvasRef.current) {
      flowingLinesRef.current = new FlowingLines(canvasRef.current);
    }
    return () => {
      if (flowingLinesRef.current) flowingLinesRef.current.cleanup();
    };
  }, [userId, email, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter the verification code");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await verifyEmail({ userId, otp: otp.trim() });

      localStorage.setItem("token", data.token);
      setUser(data);
      setSuccess("✅ Email verified successfully! Redirecting...");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setSuccess("");
    setResendLoading(true);

    try {
      await resendOTP(userId);

      setSuccess("New verification code sent to your email");
      setCountdown(60);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend code");
    } finally {
      setResendLoading(false);
    }
  };

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
    fontSize: "18px", 
    textAlign: "center",
    letterSpacing: "8px",
    outline: "none", 
    boxSizing: "border-box",
    lineHeight: "18px",
    fontWeight: "600"
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
    cursor: loading ? "not-allowed" : "pointer",
    marginBottom: "15px"
  };
  const resendButtonStyle = {
    width: "100%",
    padding: "12px",
    background: "transparent",
    color: "#fff",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: countdown > 0 || resendLoading ? "not-allowed" : "pointer",
    opacity: countdown > 0 || resendLoading ? 0.5 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  };
  const errorStyle = { padding: "12px", borderRadius: "8px", textAlign: "center", background: "rgba(255, 82, 82, 0.2)", border: "1px solid rgba(255, 82, 82, 0.5)", color: "#ff5252", marginBottom: "15px" };
  const successStyle = { padding: "12px", borderRadius: "8px", textAlign: "center", background: "rgba(76, 175, 80, 0.2)", border: "1px solid rgba(76, 175, 80, 0.5)", color: "#4caf50", marginBottom: "15px" };

  const maskedEmail = email ? `${email.substring(0, 2)}***@${email.split('@')[1]}` : "";

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
        .verify-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .verify-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .resend-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.5);
        }
        .icon-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .mail-icon {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          padding: 20px;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
      
      <div style={videoContainerStyle}>
        <canvas ref={canvasRef} style={canvasStyle} />
        <div style={overlayStyle} />
      </div>

      <div style={contentStyle}>
        <div style={cardStyle}>
          <div className="icon-container">
            <div className="mail-icon">
              <Mail size={40} color="#fff" />
            </div>
          </div>
          
          <h1 style={titleStyle}>Verify Your Email</h1>
          <p style={subtitleStyle}>
            We've sent a 6-digit verification code to<br />
            <strong>{maskedEmail}</strong>
          </p>

          <form onSubmit={handleVerifyOTP}>
            <div style={{ marginBottom: "20px" }}>
              <input 
                type="text" 
                placeholder="000000" 
                style={inputStyle} 
                className="form-input"
                value={otp} 
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setOtp(value);
                }}
                maxLength={6}
                required 
                disabled={loading} 
              />
            </div>
            
            {error && <div style={errorStyle}><AlertCircle size={16} style={{ display: "inline", marginRight: "8px" }} />{error}</div>}
            {success && <div style={successStyle}><CheckCircle size={16} style={{ display: "inline", marginRight: "8px" }} />{success}</div>}
            
            <button 
              type="submit" 
              style={buttonStyle} 
              className="verify-btn"
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <button
            style={resendButtonStyle}
            className="resend-btn"
            onClick={handleResendOTP}
            disabled={countdown > 0 || resendLoading}
          >
            {resendLoading ? (
              <>
                <RefreshCw size={16} className="animate-spin" /> Sending...
              </>
            ) : countdown > 0 ? (
              `Resend code in ${countdown}s`
            ) : (
              <>
                <RefreshCw size={16} /> Resend verification code
              </>
            )}
          </button>

          <div style={{ textAlign: "center", paddingTop: "20px" }}>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>
              Didn't receive the code? Check your spam folder or try resending.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;