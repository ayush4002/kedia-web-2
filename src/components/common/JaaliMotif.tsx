import React from 'react';

/**
 * Traditional Jaipur Jaali (Geometric Lattice) Pattern SVG
 * Can be used as repeating background or decorative section divider
 */
export const JaaliDivider: React.FC<{ className?: string; light?: boolean }> = ({ className = '', light = false }) => {
  const strokeColor = light ? 'rgba(200, 162, 75, 0.35)' : 'rgba(200, 162, 75, 0.45)';
  const dotColor = light ? '#C8A24B' : '#C8A24B';

  return (
    <div className={`w-full overflow-hidden flex items-center justify-center py-4 ${className}`}>
      <div className="flex items-center space-x-3 w-full max-w-4xl px-4">
        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-brass-500/40 to-brass-500" />
        
        {/* Central Jaali Medallion */}
        <svg width="42" height="24" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <path d="M21 2L29 12L21 22L13 12L21 2Z" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <path d="M21 6L25 12L21 18L17 12L21 6Z" stroke={strokeColor} strokeWidth="0.8" fill="none" />
          <circle cx="21" cy="12" r="2" fill={dotColor} />
          <path d="M7 12L13 12M29 12L35 12" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="5" cy="12" r="1.5" fill={dotColor} />
          <circle cx="37" cy="12" r="1.5" fill={dotColor} />
        </svg>

        <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent via-brass-500/40 to-brass-500" />
      </div>
    </div>
  );
};

/**
 * Haveli Architectural Arch Frame (Cusped / Multi-Foil Jaipur Arch)
 * Wraps content or media inside a royal Rajasthani arch silhouette
 */
export const HaveliArchFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  outlineColor?: string;
}> = ({ children, className = '', outlineColor = 'border-brass-500/40' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Arch Shape Top Border Contour */}
      <div
        className="w-full h-full relative"
        style={{
          borderTopLeftRadius: '50% 30%',
          borderTopRightRadius: '50% 30%',
        }}
      >
        {children}
      </div>
      
      {/* Decorative hairline brass rim */}
      <div
        className={`absolute inset-0 pointer-events-none border ${outlineColor}`}
        style={{
          borderTopLeftRadius: '50% 30%',
          borderTopRightRadius: '50% 30%',
        }}
      />
    </div>
  );
};

/**
 * Architectural Technical Drawing Overlay (Compass, Coordinates, Scale)
 */
export const ArchitecturalDraftingOverlay: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden opacity-25 select-none ${className}`}>
      {/* Blueprint grid lines */}
      <div className="absolute inset-0 bg-navy-blueprint" />
      
      {/* Compass Rose Top Right */}
      <svg className="absolute top-6 right-6 w-16 h-16 text-brass-400 stroke-current" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="35" strokeWidth="0.6" />
        <path d="M50 5 L53 45 L50 40 L47 45 Z" fill="#C8A24B" />
        <path d="M50 95 L53 55 L50 60 L47 55 Z" fill="rgba(200, 162, 75, 0.4)" />
        <path d="M5 50 L45 47 L40 50 L45 53 Z" fill="rgba(200, 162, 75, 0.4)" />
        <path d="M95 50 L55 47 L60 50 L55 53 Z" fill="rgba(200, 162, 75, 0.4)" />
        <text x="47" y="2" fill="#C8A24B" fontSize="9" fontFamily="monospace">N</text>
      </svg>

      {/* Elevation Level Indicator Bottom Left */}
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-brass-400 space-y-1">
        <div>JAIPUR REF: 26.9124° N, 75.7873° E</div>
        <div>DATUM: +431.00m MSL · MASTER LAYOUT SANCTION</div>
        <div>SCALE 1:200 · ARCHITECTURAL SPECIFICATION</div>
      </div>
    </div>
  );
};
