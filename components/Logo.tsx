type LogoProps = {
  className?: string
  title?: string
}

export default function Logo({ className, title = 'Al-Asali Jewelry Studio' }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 140"
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <g fill="currentColor">
        <text
          x="155"
          y="70"
          fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif"
          fontWeight="700"
          fontSize="58"
          letterSpacing="4"
          textAnchor="end"
        >
          AL
        </text>

        <g transform="translate(200, 54)" fill="none" stroke="currentColor">
          <path
            d="M 0,-26 L 22,-4 L 0,26 L -22,-4 Z"
            strokeWidth="1.6"
            fill="currentColor"
            fillOpacity="0.14"
            strokeLinejoin="round"
          />
          <path d="M -22,-4 L 22,-4" strokeWidth="1.3" opacity="0.85" />
          <path
            d="M -12,-4 L 0,-26 L 12,-4"
            strokeWidth="1"
            opacity="0.7"
            strokeLinejoin="round"
          />
          <path
            d="M -14,-4 L 0,26 L 14,-4"
            strokeWidth="0.8"
            opacity="0.45"
            strokeLinejoin="round"
          />
        </g>

        <text
          x="245"
          y="70"
          fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif"
          fontWeight="700"
          fontSize="58"
          letterSpacing="4"
        >
          ASALI
        </text>

        <text
          x="200"
          y="115"
          fontFamily="'Playfair Display', 'Cormorant Garamond', 'Times New Roman', serif"
          fontWeight="500"
          fontStyle="italic"
          fontSize="24"
          letterSpacing="1"
          textAnchor="middle"
        >
          Jewelry Studio
        </text>
      </g>
    </svg>
  )
}
