import React, { useRef, useEffect } from "react";

// Reuse your FlowingLines animation class
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
    window.addEventListener("resize", handleResize);

    this.cleanupFunctions = [
      () => window.removeEventListener("resize", handleResize),
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
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance) {
          const opacity = 1 - dist / this.connectionDistance;
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
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
    if (this.cleanupFunctions)
      this.cleanupFunctions.forEach((fn) => fn());
  }
}

const LoadingBackground = () => {
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

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "linear-gradient(135deg, #0F2920 0%, #2D5A3D 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.4)",
        }}
      />
    </div>
  );
};

export default LoadingBackground;
