'use client'

const DiamondPattern = ({ className = "" }: { className?: string }) => {
  const diamonds = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 15,
    rotation: Math.random() * 360,
    opacity: Math.random() * 0.3 + 0.1
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {diamonds.map((diamond) => (
          <g key={diamond.id} transform={`translate(${diamond.x}, ${diamond.y}) rotate(${diamond.rotation})`}>
            <path
              d="M 0,-1 L 0.5,0 L 0,1 L -0.5,0 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.05"
              opacity={diamond.opacity}
              transform={`scale(${diamond.size / 100})`}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default DiamondPattern;
