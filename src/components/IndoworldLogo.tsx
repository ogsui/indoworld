import React from 'react';

interface IndoworldLogoProps {
  className?: string;
  variant?: 'color' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const IndoworldLogo: React.FC<IndoworldLogoProps> = ({
  className = '',
  variant = 'color',
  size = 'md',
  showSubtitle = true,
}) => {
  const isWhite = variant === 'white';
  const blueColor = isWhite ? '#FAF9F6' : '#002FA7';
  const redColor = isWhite ? '#FF6B6B' : '#DC2626';

  const sizeClasses = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
    xl: 'h-16',
  };

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <div className={`flex items-center gap-1.5 ${sizeClasses[size]}`}>
        <svg
          viewBox="0 0 340 68"
          className="h-full w-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Indoworld Tourism Services Official Logo"
        >
          {/* INDO */}
          <text
            x="0"
            y="48"
            fill={blueColor}
            fontFamily="'Arial Black', 'Impact', sans-serif"
            fontWeight="900"
            fontSize="44"
            letterSpacing="-0.5px"
          >
            INDO
          </text>

          {/* W */}
          <text
            x="134"
            y="48"
            fill={blueColor}
            fontFamily="'Arial Black', 'Impact', sans-serif"
            fontWeight="900"
            fontSize="44"
            letterSpacing="-0.5px"
          >
            W
          </text>

          {/* Realistic 3D Earth Globe for 'O' */}
          <g transform="translate(193, 31)">
            {/* Base Deep Ocean */}
            <circle cx="0" cy="0" r="17" fill="#0052CC" />
            <circle cx="0" cy="0" r="17" fill="url(#oceanGlow)" />
            
            {/* Continents / Landmass Silhouettes */}
            <path
              d="M -9 -7 C -6 -12, 1 -13, 6 -9 C 9 -6, 12 -2, 11 4 C 8 8, 3 11, -3 10 C -7 8, -11 3, -12 -2 C -11 -4, -10 -6, -9 -7 Z"
              fill="#EBF5FB"
              opacity="0.9"
            />
            <path
              d="M -4 -11 C -2 -14, 4 -12, 7 -7 C 5 -4, -1 -4, -4 -7 Z"
              fill="#85C1E9"
              opacity="0.8"
            />
            <path
              d="M -8 1 C -4 4, 3 2, 7 8 C 4 12, -2 14, -6 11 Z"
              fill="#D4EFDF"
              opacity="0.85"
            />
            
            {/* Globe Atmosphere / Shine Overlay */}
            <circle
              cx="0"
              cy="0"
              r="17"
              fill="url(#globeShine)"
              stroke={blueColor}
              strokeWidth="1.2"
            />
          </g>

          {/* RLD */}
          <text
            x="215"
            y="48"
            fill={blueColor}
            fontFamily="'Arial Black', 'Impact', sans-serif"
            fontWeight="900"
            fontSize="44"
            letterSpacing="-0.5px"
          >
            RLD
          </text>

          {/* Stylized Red Sail Motif (3 aerodynamic dynamic facets) */}
          <g transform="translate(288, 2)">
            {/* Main Upper Wing */}
            <path
              d="M 12 40 C 14 26, 22 10, 42 0 C 34 16, 28 28, 26 42 Z"
              fill={redColor}
            />
            {/* Lower Wing Curve */}
            <path
              d="M 6 46 C 18 43, 26 38, 38 43 C 24 50, 14 52, 6 46 Z"
              fill={redColor}
              opacity="0.95"
            />
            {/* Center Wing Core */}
            <path
              d="M 12 40 C 20 28, 28 20, 36 28 C 28 36, 20 42, 12 40 Z"
              fill="#B91C1C"
            />
          </g>

          {/* Defs for Globe Shading */}
          <defs>
            <radialGradient id="oceanGlow" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="60%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#0B2545" />
            </radialGradient>
            <linearGradient id="globeShine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtitle: Tourism services (in official red italic/cursive script) */}
      {showSubtitle && (
        <div className="flex justify-center -mt-1 pl-12 pr-6">
          <span
            className="italic font-serif tracking-normal text-[11px] sm:text-[12px] font-bold"
            style={{
              color: redColor,
              fontFamily: "'Playfair Display', Georgia, cursive, serif",
              letterSpacing: '0.02em',
            }}
          >
            Tourism services
          </span>
        </div>
      )}
    </div>
  );
};
