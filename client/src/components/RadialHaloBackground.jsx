import { useEffect, useRef } from "react";

export default function RadialHaloBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      const t = tRef.current;

      ctx.fillStyle = "#FDF8FF";
      ctx.fillRect(0, 0, W, H);

      const pulse = Math.sin(t * 0.20) * 0.5 + 0.5;
      const r = Math.round(59  + (220 - 59)  * pulse);
      const g = Math.round(80  + (80  - 80)  * pulse);
      const b = Math.round(216 + (170 - 216) * pulse);

      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0,    `rgba(${r},${g},${b},0.35)`);
      grad.addColorStop(0.20, `rgba(140,70,210,0.26)`);
      grad.addColorStop(0.45, `rgba(180,120,230,0.16)`);
      grad.addColorStop(0.70, `rgba(${r},${g},${b},0.08)`);
      grad.addColorStop(1,    `rgba(140,70,210,0.03)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const sideGrad = ctx.createLinearGradient(0, 0, W, 0);
      sideGrad.addColorStop(0,   `rgba(59,80,216,0.12)`);
      sideGrad.addColorStop(0.5, `rgba(140,70,210,0.06)`);
      sideGrad.addColorStop(1,   `rgba(220,80,170,0.12)`);
      ctx.fillStyle = sideGrad;
      ctx.fillRect(0, 0, W, H);

      tRef.current += 0.004;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
