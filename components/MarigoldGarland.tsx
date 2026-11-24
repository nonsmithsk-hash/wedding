'use client';

import React from 'react';

export default function MarigoldGarland({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Top Hanging Marigold Garland Banner */}
      <svg
        viewBox="0 0 1200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-md"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Orange Marigold Radial Gradient */}
          <radialGradient id="marigoldOrange" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF099" />
            <stop offset="35%" stopColor="#FFA500" />
            <stop offset="80%" stopColor="#FF6600" />
            <stop offset="100%" stopColor="#CC3700" />
          </radialGradient>

          {/* Yellow Marigold Radial Gradient */}
          <radialGradient id="marigoldYellow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FFEE55" />
            <stop offset="85%" stopColor="#FFCC00" />
            <stop offset="100%" stopColor="#E69500" />
          </radialGradient>

          {/* Mango Leaf Gradient */}
          <linearGradient id="mangoLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3E7B27" />
            <stop offset="70%" stopColor="#1E5112" />
            <stop offset="100%" stopColor="#0F3308" />
          </linearGradient>

          {/* Golden Thread */}
          <linearGradient id="goldThread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFF0AA" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>

          {/* Single Flower Def */}
          <g id="flower-orange">
            <circle cx="0" cy="0" r="14" fill="url(#marigoldOrange)" />
            <circle cx="0" cy="0" r="11" fill="none" stroke="#FF5500" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="0" cy="0" r="6" fill="#FFEE55" />
          </g>

          <g id="flower-yellow">
            <circle cx="0" cy="0" r="14" fill="url(#marigoldYellow)" />
            <circle cx="0" cy="0" r="11" fill="none" stroke="#E69500" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="0" cy="0" r="6" fill="#FFA500" />
          </g>

          <g id="leaf">
            <path
              d="M0 0 C-6 12, -4 28, 0 34 C4 28, 6 12, 0 0 Z"
              fill="url(#mangoLeaf)"
              stroke="#2E601C"
              strokeWidth="0.5"
            />
          </g>
        </defs>

        {/* Supporting Top Golden String / Garland Arch Swags */}
        <path
          d="M0 15 Q 150 55 300 15 Q 450 55 600 15 Q 750 55 900 15 Q 1050 55 1200 15"
          stroke="url(#goldThread)"
          strokeWidth="3"
          fill="none"
        />

        {/* Hanging Floral Drops at the 5 Swag Nodes */}
        {[0, 300, 600, 900, 1200].map((cx, i) => (
          <g key={`drop-${i}`} transform={`translate(${cx}, 15)`}>
            {/* Hanging String */}
            <line x1="0" y1="0" x2="0" y2="85" stroke="#C5A059" strokeWidth="1.5" />
            
            {/* Mango Leaves Fan */}
            <use href="#leaf" transform="translate(0, 8) rotate(-35)" />
            <use href="#leaf" transform="translate(0, 8) rotate(35)" />
            <use href="#leaf" transform="translate(0, 10)" />

            {/* Alternating Marigold Flower Drops */}
            <use href="#flower-orange" transform="translate(0, 24)" />
            <use href="#flower-yellow" transform="translate(0, 44)" />
            <use href="#flower-orange" transform="translate(0, 64)" />
            <use href="#flower-yellow" transform="translate(0, 84)" />

            {/* Bottom Golden Bell / Tassel */}
            <circle cx="0" cy="98" r="5" fill="#D4AF37" />
            <path d="M-4 98 L4 98 L6 108 L-6 108 Z" fill="#D4AF37" />
            <circle cx="0" cy="110" r="2.5" fill="#FFE57F" />
          </g>
        ))}

        {/* Secondary Intermediate Mini Drops */}
        {[150, 450, 750, 1050].map((cx, i) => (
          <g key={`mini-drop-${i}`} transform={`translate(${cx}, 35)`}>
            <line x1="0" y1="0" x2="0" y2="45" stroke="#C5A059" strokeWidth="1" strokeDasharray="2 2" />
            <use href="#flower-yellow" transform="translate(0, 18) scale(0.85)" />
            <use href="#flower-orange" transform="translate(0, 36) scale(0.85)" />
            <circle cx="0" cy="48" r="3" fill="#D4AF37" />
          </g>
        ))}

        {/* Main Swag Curved Marigold Flower Garland Continuous Row */}
        {Array.from({ length: 49 }).map((_, i) => {
          const t = i / 48; // 0 to 1
          const x = t * 1200;
          // Curve equation matching Q swags: 4 arcs
          const localT = (x % 300) / 300;
          const y = 15 + 40 * Math.sin(localT * Math.PI);
          const isOrange = i % 2 === 0;

          return (
            <g key={`swag-flower-${i}`} transform={`translate(${x}, ${y})`}>
              <use href={isOrange ? '#flower-orange' : '#flower-yellow'} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
