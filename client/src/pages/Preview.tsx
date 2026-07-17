import { useEffect, useRef } from 'react';

export default function Preview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255,255,255,0.045)';
      ctx.lineWidth = 0.5;

      // Horizontal lines
      const hSpacing = 80;
      for (let y = 0; y < canvas.height; y += hSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Vertical lines
      const vSpacing = 80;
      for (let x = 0; x < canvas.width; x += vSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Diagonal lines from bottom-right
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      const diagCount = 8;
      for (let i = 0; i < diagCount; i++) {
        const startX = canvas.width * (0.4 + i * 0.12);
        ctx.beginPath();
        ctx.moveTo(startX, 0);
        ctx.lineTo(canvas.width + 200, canvas.height);
        ctx.stroke();
      }

      // Wireframe globe — bottom right
      const cx = canvas.width * 0.82;
      const cy = canvas.height * 0.78;
      const r = Math.min(canvas.width, canvas.height) * 0.22;
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 0.6;

      // Latitude lines
      for (let lat = -80; lat <= 80; lat += 20) {
        const latRad = (lat * Math.PI) / 180;
        const latR = r * Math.cos(latRad);
        const latY = cy + r * Math.sin(latRad);
        ctx.beginPath();
        ctx.ellipse(cx, latY, latR, latR * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude lines
      for (let lon = 0; lon < 180; lon += 20) {
        const lonRad = (lon * Math.PI) / 180;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * Math.abs(Math.cos(lonRad)), r, lonRad, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshair dots
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      const dotPositions = [
        [0.12, 0.18], [0.88, 0.12], [0.05, 0.72], [0.92, 0.55],
        [0.45, 0.08], [0.25, 0.88], [0.72, 0.92],
      ];
      dotPositions.forEach(([px, py]) => {
        const x = canvas.width * px;
        const y = canvas.height * py;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        // small cross
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x - 6, y);
        ctx.lineTo(x + 6, y);
        ctx.moveTo(x, y - 6);
        ctx.lineTo(x, y + 6);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      });
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Grid canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      {/* Logo — top centre */}
      <div
        style={{
          position: 'absolute',
          top: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          letterSpacing: '0.18em',
          fontSize: 13,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.9)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        EARNEDREACH
      </div>

      {/* Centre content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: 680,
          padding: '0 24px',
        }}
      >
        {/* Status label */}
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.35)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          SOMETHING IS BEING BUILT
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 58px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
          }}
        >
          Every story deserves<br />
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>
            to be earned.
          </em>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.4)',
            margin: '0 0 52px',
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          We're building something worth showing. More soon.
        </p>

        {/* CTA */}
        <a
          href="mailto:david@earnedreach.org"
          style={{
            display: 'inline-block',
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            paddingBottom: 3,
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.9)';
            (e.target as HTMLAnchorElement).style.borderBottomColor = 'rgba(255,255,255,0.6)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)';
            (e.target as HTMLAnchorElement).style.borderBottomColor = 'rgba(255,255,255,0.2)';
          }}
        >
          GET IN TOUCH
        </a>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
