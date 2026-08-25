export default function HeroGridBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="var(--grid-line)" strokeWidth="1" opacity="0.18">
        <line x1="80" y1="60" x2="320" y2="180" strokeDasharray="6 10" style={{ animation: 'lineFlow 6s linear infinite' }} />
        <line x1="320" y1="180" x2="560" y2="90" strokeDasharray="6 10" style={{ animation: 'lineFlow 7s linear infinite' }} />
        <line x1="560" y1="90" x2="820" y2="220" strokeDasharray="6 10" style={{ animation: 'lineFlow 5.5s linear infinite' }} />
        <line x1="820" y1="220" x2="1080" y2="120" strokeDasharray="6 10" style={{ animation: 'lineFlow 8s linear infinite' }} />
        <line x1="320" y1="180" x2="480" y2="360" strokeDasharray="6 10" style={{ animation: 'lineFlow 6.5s linear infinite' }} />
        <line x1="480" y1="360" x2="820" y2="220" strokeDasharray="6 10" style={{ animation: 'lineFlow 9s linear infinite' }} />
        <line x1="480" y1="360" x2="720" y2="470" strokeDasharray="6 10" style={{ animation: 'lineFlow 7.5s linear infinite' }} />
        <line x1="720" y1="470" x2="1000" y2="400" strokeDasharray="6 10" style={{ animation: 'lineFlow 6s linear infinite' }} />
        <line x1="80" y1="60" x2="120" y2="320" strokeDasharray="6 10" style={{ animation: 'lineFlow 8.5s linear infinite' }} />
      </g>

      <g fill="var(--grid-line)">
        {[
          [80, 60], [320, 180], [560, 90], [820, 220], [1080, 120],
          [480, 360], [720, 470], [1000, 400], [120, 320],
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
  )
}