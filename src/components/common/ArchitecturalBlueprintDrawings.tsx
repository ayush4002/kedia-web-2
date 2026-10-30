import React, { useEffect, useState } from 'react';

/**
 * ArchitecturalBlueprintDrawings:
 * Faint architectural line drawings (outlines, floor plans, elevations) in navy sections
 * that draw themselves smoothly on scroll.
 */
export const ArchitecturalBlueprintDrawings: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDrawn(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
      {/* Background blueprint Cartesian grid */}
      <div className="absolute inset-0 bg-navy-blueprint opacity-60" />

      {/* Architectural Elevation & Floor Plan Vector Blueprint */}
      <svg
        className="w-full h-full text-brass-500/25"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          className="transition-all duration-1000 ease-out"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: drawn ? 0 : 2000,
            transitionDuration: '2.5s'
          }}
        >
          {/* Ground datum level */}
          <line x1="80" y1="520" x2="1360" y2="520" stroke="currentColor" strokeWidth="1.5" />
          <line x1="80" y1="526" x2="1360" y2="526" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 4" />

          {/* Left Elevation Profile: Modern Rajasthani Haveli Portico */}
          <rect x="140" y="240" width="380" height="280" stroke="currentColor" strokeWidth="1.2" />
          
          {/* Haveli Multi-foil Cusped Arch Entrance */}
          <path
            d="M 230 520 L 230 350 C 230 310, 260 280, 330 270 C 400 280, 430 310, 430 350 L 430 520"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Inner arch cusps */}
          <path
            d="M 250 520 L 250 360 C 250 335, 275 315, 330 305 C 385 315, 410 335, 410 360 L 410 520"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="4 2"
          />
          {/* Keystone medallion */}
          <circle cx="330" cy="270" r="10" stroke="currentColor" strokeWidth="1" />
          <circle cx="330" cy="270" r="4" fill="currentColor" fillOpacity="0.4" />

          {/* Cornices & Parapets */}
          <line x1="120" y1="240" x2="540" y2="240" stroke="currentColor" strokeWidth="2" />
          <line x1="130" y1="225" x2="530" y2="225" stroke="currentColor" strokeWidth="1" />
          
          {/* Rooftop Chhatri Pavilions (Signature Jaipur Motif) */}
          <path d="M 180 225 L 180 180 Q 200 150 220 180 L 220 225 Z" stroke="currentColor" strokeWidth="1" />
          <line x1="200" y1="150" x2="200" y2="135" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="133" r="3" stroke="currentColor" strokeWidth="0.8" />

          <path d="M 440 225 L 440 180 Q 460 150 480 180 L 480 225 Z" stroke="currentColor" strokeWidth="1" />
          <line x1="460" y1="150" x2="460" y2="135" stroke="currentColor" strokeWidth="1" />
          <circle cx="460" cy="133" r="3" stroke="currentColor" strokeWidth="0.8" />

          {/* Jharokha Balcony Windows */}
          <rect x="170" y="270" width="45" height="70" stroke="currentColor" strokeWidth="0.8" />
          <line x1="170" y1="305" x2="215" y2="305" stroke="currentColor" strokeWidth="0.6" />
          <line x1="192.5" y1="270" x2="192.5" y2="340" stroke="currentColor" strokeWidth="0.6" />

          <rect x="445" y="270" width="45" height="70" stroke="currentColor" strokeWidth="0.8" />
          <line x1="445" y1="305" x2="490" y2="305" stroke="currentColor" strokeWidth="0.6" />
          <line x1="467.5" y1="270" x2="467.5" y2="340" stroke="currentColor" strokeWidth="0.6" />

          {/* Dimension Witness Lines */}
          <line x1="100" y1="240" x2="100" y2="520" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="90" y1="240" x2="110" y2="240" stroke="currentColor" strokeWidth="0.8" />
          <line x1="90" y1="520" x2="110" y2="520" stroke="currentColor" strokeWidth="0.8" />
          <text x="75" y="385" fill="currentColor" fontSize="11" fontFamily="monospace" transform="rotate(-90 75 385)">
            HT: +9.60 MTRS
          </text>

          {/* Right Section: Technical Cadastral Layout & Master Grid */}
          <rect x="740" y="160" width="580" height="360" stroke="currentColor" strokeWidth="1" />
          
          {/* Subdivided Plot Boundaries */}
          <line x1="740" y1="280" x2="1320" y2="280" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
          <line x1="740" y1="400" x2="1320" y2="400" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
          
          <line x1="930" y1="160" x2="930" y2="520" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
          <line x1="1130" y1="160" x2="1130" y2="520" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />

          {/* Central Courtyard Circulation Circle */}
          <circle cx="1030" cy="340" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="5 3" />
          <circle cx="1030" cy="340" r="15" stroke="currentColor" strokeWidth="0.8" />
          <line x1="1030" y1="280" x2="1030" y2="400" stroke="currentColor" strokeWidth="0.6" />
          <line x1="970" y1="340" x2="1090" y2="340" stroke="currentColor" strokeWidth="0.6" />

          {/* Technical Blueprint Annotations */}
          <text x="760" y="200" fill="currentColor" fontSize="10" fontFamily="monospace">
            SECTOR-A &middot; RESIDENTIAL LAYOUT &middot; VASTU-COMPLIANT PLOTS
          </text>
          <text x="760" y="225" fill="currentColor" fontSize="9" fontFamily="monospace">
            SANCTION REF: JDA/BPC/2026/8941 &middot; ROAD WIDTH: 40'-0"
          </text>

          <text x="950" y="315" fill="currentColor" fontSize="9" fontFamily="monospace">
            PLOT 101 [85 SQ YD]
          </text>
          <text x="1150" y="315" fill="currentColor" fontSize="9" fontFamily="monospace">
            PLOT 102 [108 SQ YD]
          </text>
          <text x="950" y="435" fill="currentColor" fontSize="9" fontFamily="monospace">
            PLOT 103 [150 SQ YD]
          </text>
          <text x="1150" y="435" fill="currentColor" fontSize="9" fontFamily="monospace">
            PLOT 104 [200 SQ YD]
          </text>

          {/* Radius & Coordinate Dimension Arc */}
          <path d="M 1260 220 A 40 40 0 0 1 1300 260" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
          <text x="1230" y="215" fill="currentColor" fontSize="9" fontFamily="monospace">R=12.0m</text>

          {/* North Direction Compass */}
          <g transform="translate(1340, 80)">
            <circle cx="0" cy="0" r="28" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
            <polygon points="0,-24 6,0 0,-4 -6,0" fill="currentColor" />
            <polygon points="0,24 6,0 0,4 -6,0" stroke="currentColor" strokeWidth="0.6" />
            <text x="-4" y="-28" fill="currentColor" fontSize="10" fontFamily="monospace">N</text>
          </g>

          {/* Blueprint Footer Stamp */}
          <rect x="740" y="480" width="580" height="40" stroke="currentColor" strokeWidth="1" fill="#0B1F3A" fillOpacity="0.4" />
          <text x="755" y="505" fill="currentColor" fontSize="9" fontFamily="monospace">
            ARCHITECTURAL MONOGRAPH &middot; KEDIA BUILDERS &amp; COLONIZERS &middot; EST. 1980 JAIPUR
          </text>
        </g>
      </svg>
    </div>
  );
};

