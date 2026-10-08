import React from 'react';

interface PmiLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  textColor?: string;
}

export const PmiLogo: React.FC<PmiLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  textColor = 'text-slate-900'
}) => {
  // Dimensions based on size
  const flowerSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const textSizes = {
    sm: 'text-xs leading-none font-bold',
    md: 'text-sm leading-tight font-extrabold tracking-tight',
    lg: 'text-lg leading-tight font-extrabold tracking-tight',
    xl: 'text-2xl leading-none font-black tracking-tight'
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official PMI 5-Petal Jasmine Flower Emblem with Red Cross */}
      <div className={`relative shrink-0 ${flowerSizes[size]} aspect-square flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 5 Petal Rounded Lobes with Red Border */}
          <g transform="translate(50, 50)">
            {/* Top petal */}
            <circle cx="0" cy="-24" r="18" fill="#ffffff" stroke="#DC2626" strokeWidth="4" />
            {/* Top-right petal */}
            <circle cx="23" cy="-7" r="18" fill="#ffffff" stroke="#DC2626" strokeWidth="4" />
            {/* Bottom-right petal */}
            <circle cx="14" cy="20" r="18" fill="#ffffff" stroke="#DC2626" strokeWidth="4" />
            {/* Bottom-left petal */}
            <circle cx="-14" cy="20" r="18" fill="#ffffff" stroke="#DC2626" strokeWidth="4" />
            {/* Top-left petal */}
            <circle cx="-23" cy="-7" r="18" fill="#ffffff" stroke="#DC2626" strokeWidth="4" />
            
            {/* Center smooth connector mask */}
            <circle cx="0" cy="0" r="23" fill="#ffffff" />

            {/* Equal-Armed Red Cross in the center */}
            <rect x="-5" y="-19" width="10" height="38" fill="#DC2626" rx="1" />
            <rect x="-19" y="-5" width="38" height="10" fill="#DC2626" rx="1" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className={`flex flex-col uppercase font-sans ${textSizes[size]} ${textColor}`}>
          <span className="tracking-tight">Palang</span>
          <span className="tracking-tight">Merah</span>
          <span className="tracking-tight text-red-600">Indonesia</span>
        </div>
      )}
    </div>
  );
};
