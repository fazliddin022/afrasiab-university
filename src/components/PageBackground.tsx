export default function PageBackground() {
  return (
    <>
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--accent-soft), transparent 70%)',
          opacity: 'var(--bg-blob-opacity)',
          animation: 'floatBlob 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--accent-soft), transparent 70%)',
          opacity: 'var(--bg-blob-opacity)',
          animation: 'floatBlob 13s ease-in-out infinite reverse',
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="var(--grid-line)" strokeWidth="1" style={{ opacity: 'var(--bg-line-opacity)' }}>
          <line x1="60" y1="80" x2="280" y2="220" strokeDasharray="6 10" style={{ animation: 'lineFlow 7s linear infinite' }} />
          <line x1="280" y1="220" x2="500" y2="120" strokeDasharray="6 10" style={{ animation: 'lineFlow 8s linear infinite' }} />
          <line x1="900" y1="700" x2="1120" y2="560" strokeDasharray="6 10" style={{ animation: 'lineFlow 6.5s linear infinite' }} />
          <line x1="700" y1="800" x2="900" y2="700" strokeDasharray="6 10" style={{ animation: 'lineFlow 9s linear infinite' }} />
          <line x1="60" y1="80" x2="120" y2="340" strokeDasharray="6 10" style={{ animation: 'lineFlow 7.5s linear infinite' }} />
          <line x1="1120" y1="560" x2="1080" y2="820" strokeDasharray="6 10" style={{ animation: 'lineFlow 8.5s linear infinite' }} />
        </g>
        <g fill="var(--grid-line)" style={{ opacity: 'var(--bg-line-opacity)' }}>
          {[
            [60, 80], [280, 220], [500, 120], [120, 340],
            [900, 700], [1120, 560], [700, 800], [1080, 820],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="3"
              style={{ animation: `nodePulse ${3 + (i % 4)}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </g>
      </svg>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 'calc(var(--bg-line-opacity) * 0.35)',
        }}
      />
    </>
  )
}