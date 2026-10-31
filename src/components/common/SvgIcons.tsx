import React from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

/**
 * Clean, hand-crafted vector SVG icons for Sea View Skydiving
 */

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

