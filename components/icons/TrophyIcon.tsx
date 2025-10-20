import React from 'react';

const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21A2.5 2.5 0 0 1 8 21.5a2.5 2.5 0 0 1-1.97-.79A1 1 0 0 0 5 21.5V17c0-1.66 1.34-3 3-3h8c1.66 0 3 1.34 3 3v4.5a1 1 0 0 0-1.03.79A2.5 2.5 0 0 1 16 21.5a2.5 2.5 0 0 1-1.03-4.29A1 1 0 0 0 14 17v-2.34" />
    <path d="M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);

export default TrophyIcon;
