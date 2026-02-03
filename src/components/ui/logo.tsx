import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

const Logo = ({ className = "", size = 40, showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* THE ICON WRAPPER */}
      <div className="relative flex items-center justify-center">
        {/* Optional: Subtle Glow behind the logo */}
        <div 
          className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full" 
          style={{ width: size, height: size }} 
        />

        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* The "Marg" Gradient: Starts Deep Blue, ends Electric Green */}
            <linearGradient id="neuralGradient" x1="0" y1="40" x2="40" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" /> {/* Blue-500 */}
              <stop offset="50%" stopColor="#10B981" /> {/* Emerald-500 */}
              <stop offset="100%" stopColor="#6EE7B7" /> {/* Emerald-300 (Brighter tip) */}
            </linearGradient>
          </defs>

          {/* THE MAIN PATH: Abstract 'M' + Growth Curve */}
          <path 
            d="M6 34 L6 14 L18 24 L34 6" 
            stroke="url(#neuralGradient)" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />

          {/* THE ACCENT DOTS (Nodes in the network) */}
          {/* A small node at the dip (The 'Learning' phase) */}
          <circle cx="18" cy="24" r="2.5" fill="#1e293b" stroke="#10B981" strokeWidth="1.5" />
          
          {/* The Goal Node (Success) - Solid and bright */}
          <circle cx="34" cy="6" r="3.5" fill="#6EE7B7" stroke="#064E3B" strokeWidth="1" />
        </svg>
      </div>

      {/* THE TYPOGRAPHY */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span className="text-xl font-bold tracking-tight text-white leading-none font-heading group-hover:text-emerald-50 transition-colors">
            Marg<span className="text-emerald-400">AI</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;