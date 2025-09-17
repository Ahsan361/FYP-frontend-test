import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

//user context 
import { UserContext } from "../../contexts/UserContext";

//custom components
import LoadingBackground from "../../components/ui/LoadingBackground";

// Animated background class
class FlowingLines {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
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
    
    window.addEventListener('resize', handleResize);
    this.canvas.addEventListener('mousemove', handleMouseMove);
    
    // Store references for cleanup
    this.cleanupFunctions = [
      () => window.removeEventListener('resize', handleResize),
      () => this.canvas.removeEventListener('mousemove', handleMouseMove)
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
        size: Math.random() * 3 + 1
      });
    }
  }

  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    });
  }

  drawParticles() {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawConnections() {
    this.particles.forEach((particle1, i) => {
      this.particles.slice(i + 1).forEach(particle2 => {
        const distance = Math.sqrt(
          Math.pow(particle1.x - particle2.x, 2) +
          Math.pow(particle1.y - particle2.y, 2)
        );

        if (distance < this.connectionDistance) {
          const opacity = 1 - (distance / this.connectionDistance);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
          this.ctx.lineWidth = opacity * 2;
          this.ctx.beginPath();
          this.ctx.moveTo(particle1.x, particle1.y);
          this.ctx.lineTo(particle2.x, particle2.y);
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
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.cleanupFunctions) {
      this.cleanupFunctions.forEach(cleanup => cleanup());
    }
  }
}

function Login({ onLogin }) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const canvasRef = useRef(null);
  const flowingLinesRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      flowingLinesRef.current = new FlowingLines(canvasRef.current);
    }

    return () => {
      if (flowingLinesRef.current) {
        flowingLinesRef.current.cleanup();
      }
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        email,
        password_hash: password,
      });
      
      const userWithToken = {
        ...data,
        token: data.token // Make sure token is part of the user object
      };
      localStorage.setItem("token", data.token);
      setUser(userWithToken);

      onLogin?.(userWithToken);
      
      // Navigate based on user role
      if (data.role === "admin") { 
        navigate("/adminDashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const containerStyle = {
    position: 'relative',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const videoContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    background: 'linear-gradient(135deg, #0F2920 0%, #2D5A3D 100%)',
    // background: 'linear-gradient(135deg, #1B4332 0%, #616161 100%)',

  };

  const canvasStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  };

  const floatingElementStyle = {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite',
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '450px',
    width: '100%',
    boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    animation: 'slideInUp 0.8s ease-out',
  };

  const titleStyle = {
    color: '#fff',
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    letterSpacing: '-0.5px',
    textAlign: 'center',
  };

  const subtitleStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1rem',
    fontWeight: 300,
    letterSpacing: '0.5px',
    textAlign: 'center',
    marginBottom: '30px',
  };

const inputStyle = {
  width: '100%',
  padding: '15px 20px',
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '12px',
  color: '#fff',
  fontSize: '16px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
  outline: 'none',
  boxSizing: 'border-box',
  lineHeight: '18px', // 👈 Match content height to reduce internal spacing
};

  const buttonStyle = {
    width: '100%',
    padding: '15px',
     background: loading 
    ? 'rgba(153, 153, 153, 0.6)' 
    : 'linear-gradient(135deg, #1B4332 0%, #2D5A3D 100%)', // green gradient
    color: '#FFFFFF', // white text for contrast
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '10px',
    position: 'relative',
    overflow: 'hidden',
    opacity: loading ? 0.7 : 1,
  };

  const linkButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0',
    marginLeft: '5px',
  };

  const messageStyle = {
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    fontSize: '14px',
  };

  const errorStyle = {
    ...messageStyle,
    background: 'rgba(255, 82, 82, 0.2)',
    border: '1px solid rgba(255, 82, 82, 0.5)',
    color: '#ff5252',
  };

  const successStyle = {
    ...messageStyle,
    background: 'rgba(76, 175, 80, 0.2)',
    border: '1px solid rgba(76, 175, 80, 0.5)',
    color: '#4caf50',
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .login-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 35px 60px rgba(0, 0, 0, 0.2);
        }
        
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
        
        @media (max-width: 768px) {
          .login-card {
            padding: 30px !important;
            margin: 20px !important;
          }
          
          .title {
            font-size: 2rem !important;
          }
        }
      `}</style>
      
      {/* Animated Background */}
      <div style={videoContainerStyle}>
        <canvas ref={canvasRef} style={canvasStyle} />
        <div style={overlayStyle} />
        
        {/* Floating Elements */}
        <div 
          style={{
            ...floatingElementStyle,
            width: '80px',
            height: '80px',
            top: '20%',
            left: '10%',
            animationDelay: '0s'
          }} 
        />
        <div 
          style={{
            ...floatingElementStyle,
            width: '60px',
            height: '60px',
            top: '60%',
            right: '15%',
            animationDelay: '2s'
          }} 
        />
        <div 
          style={{
            ...floatingElementStyle,
            width: '100px',
            height: '100px',
            bottom: '20%',
            left: '20%',
            animationDelay: '4s'
          }} 
        />
      </div>

      {/* Login Form */}
      <div style={contentStyle}>
        <div style={cardStyle} className="login-card">
          <div>
            <h1 style={titleStyle} className="title">Welcome Back</h1>
            <p style={subtitleStyle}>Access your museum collection</p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom:"1rem" }}>
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
              <div style={{ position: "relative" }}>
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
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
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
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && (
              <div style={errorStyle}>
                {error}
              </div>
            )}
            {success && (
              <div style={successStyle}>
                <LoadingBackground message="Redirecting..." size={50} />
              </div>
            )}
            <button
              type="submit"
              style={buttonStyle}
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px',
              marginBottom: '10px'
            }}>
              <button
                style={linkButtonStyle}
                className="link-button"
                onClick={handleGuestLogin}
                type="button"
              >
                Continue as Guest
              </button>
            </p>
            
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px'
            }}>
              Don't have an account?{" "}
              <button
                style={linkButtonStyle}
                className="link-button"
                onClick={handleRegister}
                type="button"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;