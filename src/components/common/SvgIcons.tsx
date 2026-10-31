import React from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

/**
 * Clean, hand-crafted vector SVG icons for Sea View Skydiving
 */

// Dropzone Luxury Emblem SVG (Modern Geometric Mark)
export const DropzoneEmblemSvg: React.FC<SvgProps> = ({ className = 'h-6 w-6', size = 24, ...props }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    {/* Outer precision compass ring */}
    <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" strokeDasharray="1.5 2.5" />
    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
    
    {/* Parachute canopy arc */}
    <path
      d="M8 14.5C8 10.0817 11.5817 6.5 16 6.5C20.4183 6.5 24 10.0817 24 14.5C21.3333 14 18.6667 13.5 16 13.5C13.3333 13.5 10.6667 14 8 14.5Z"
      fill="currentColor"
      fillOpacity="0.12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Internal canopy ribs */}
    <path d="M16 6.5V13.5" stroke="currentColor" strokeWidth="1.25" />
    <path d="M12 8.5C13 10.5 13.5 12 13.5 13.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
    <path d="M20 8.5C19 10.5 18.5 12 18.5 13.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
    
    {/* Suspension lines */}
    <path d="M9 14.5L16 23.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    <path d="M23 14.5L16 23.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    <path d="M13.5 13.5L16 23.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
    <path d="M18.5 13.5L16 23.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
    
    {/* Jumper payload center */}
    <circle cx="16" cy="23.5" r="1.5" fill="currentColor" />
  </svg>
);

// Scenic Coastal Dropzone Banner Illustration SVG (For Chatbot Header & Welcome)
export const DropzoneSkylineSvg: React.FC<SvgProps> = ({ className = 'w-full h-24', ...props }) => (
  <svg
    viewBox="0 0 360 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <defs>
      <linearGradient id="sky-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff7ed" />
        <stop offset="50%" stopColor="#ffedd5" />
        <stop offset="100%" stopColor="#fed7aa" />
      </linearGradient>
      <linearGradient id="ocean-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
    </defs>

    {/* Sky Backdrop */}
    <rect width="360" height="90" rx="12" fill="url(#sky-gradient)" />
    
    {/* Distant Sun */}
    <circle cx="290" cy="30" r="14" fill="#fb923c" fillOpacity="0.4" />
    <circle cx="290" cy="30" r="8" fill="#f97316" fillOpacity="0.7" />

    {/* Distant Clouds */}
    <path d="M30 35c2-4 6-5 10-3 3-5 10-4 13 0 4-1 8 2 8 6H30c-2 0-3-1-3-3z" fill="#ffffff" fillOpacity="0.75" />
    <path d="M190 25c2-3 5-4 8-2 2-4 8-3 10 0 3-1 6 1 6 5h-24c-1 0-2-1-2-3z" fill="#ffffff" fillOpacity="0.6" />

    {/* Cruising Jump Airplane at 13,000 ft */}
    <g transform="translate(60, 18) scale(0.65)">
      <path d="M2 15h12l5-11h4l-3 11h9l3-4h2.5l-1.5 7.5-2 .5H2z" fill="#1c1917" />
      <circle cx="34" cy="18" r="1.5" fill="#f97316" />
    </g>

    {/* Parachute in Freefall / Glide */}
    <g transform="translate(145, 14)">
      {/* Canopy */}
      <path d="M0 16C0 7.16 7.16 0 16 0s16 7.16 16 16c-4.5-1-9-1.5-16-1.5S4.5 15 0 16z" fill="#ea580c" />
      <path d="M11 0c-3 4-4.5 9-4.5 15" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.8" />
      <path d="M21 0c3 4 4.5 9 4.5 15" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.8" />
      <path d="M16 0v14.5" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.8" />
      
      {/* Cords */}
      <path d="M2 16L16 32M30 16L16 32M10 15L16 32M22 15L16 32" stroke="#44403c" strokeWidth="0.85" />
      
      {/* Tandem pair */}
      <circle cx="16" cy="32" r="2.2" fill="#1c1917" />
      <path d="M14 34h4v3h-4z" fill="#0284c7" />
    </g>

    {/* Pattaya Coastline Ocean Waves */}
    <path
      d="M0 72c20-2 40 2 60 0s40-4 60-2 40 4 60 1 40-4 60-2 40 4 60 1v19H0V72z"
      fill="url(#ocean-gradient)"
      fillOpacity="0.85"
    />
    <path
      d="M0 78c25-1 50 2 75 0s50-3 75-1 50 3 75 0 50-3 75 0 35 2 60 0v12H0V78z"
      fill="#0369a1"
    />
    <text x="12" y="84" fill="#ffffff" fillOpacity="0.9" fontSize="8" fontFamily="monospace" fontWeight="bold">
      GULF OF THAILAND • PATTAYA DROPZONE
    </text>
  </svg>
);

// Parachute Canopy SVG
export const ParachuteSvg: React.FC<SvgProps> = ({ className = 'h-6 w-6', size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12c3.5 0 7-1.5 10-1.5S18.5 12 22 12c0-5.52-4.48-10-10-10z" />
    <path d="M12 2v8.5" />
    <path d="M4 11.5L12 22" />
    <path d="M20 11.5L12 22" />
    <path d="M8.5 11L12 22" />
    <path d="M15.5 11L12 22" />
    <circle cx="12" cy="22" r="1" fill="currentColor" />
  </svg>
);

// Jump Aircraft / Altitude SVG
export const AltitudePlaneSvg: React.FC<SvgProps> = ({ className = 'h-6 w-6', size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <path d="M2 15h7l3-9h3l-2 9h6l2-3h1.5l-1 5.5-1.5.5H2z" />
    <path d="M12 15v4l2 1v1h-6v-1l2-1v-4" />
    <path d="M3 19h18" strokeDasharray="2 2" />
  </svg>
);

// Coastline / Ocean Waves SVG
export const CoastlineWaveSvg: React.FC<SvgProps> = ({ className = 'h-6 w-6', size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <path d="M2 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    <path d="M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    <path d="M2 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
  </svg>
);

// USPA Safety Shield SVG
export const SafetyShieldSvg: React.FC<SvgProps> = ({ className = 'h-6 w-6', size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// Certificate of Achievement SVG
export const CertificateSvg: React.FC<SvgProps> = ({ className = 'h-6 w-6', size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <rect x="3" y="3" width="18" height="14" rx="2" />
    <circle cx="12" cy="10" r="3" />
    <path d="m10 13-1 6 3-2 3 2-1-6" />
  </svg>
);

// Camera / Media Equipment SVG
export const CameraShutterSvg: React.FC<SvgProps> = ({ className = 'h-6 w-6', size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <rect x="2" y="6" width="20" height="15" rx="3" />
    <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
    <circle cx="12" cy="13.5" r="3.5" />
    <circle cx="18" cy="9.5" r="1" fill="currentColor" />
  </svg>
);

// Freefall Speedometer SVG
export const SpeedometerSvg: React.FC<SvgProps> = ({ className = 'h-6 w-6', size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <path d="M12 14v-4" />
    <path d="M12 2a10 10 0 0 0-7.07 17.07L12 14l7.07 5.07A10 10 0 0 0 12 2z" />
    <circle cx="12" cy="14" r="1.5" fill="currentColor" />
  </svg>
);
