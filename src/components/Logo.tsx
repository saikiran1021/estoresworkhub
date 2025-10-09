import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="50"
    height="50"
    className={cn('h-16 w-16', props.className)}
    {...props}
  >
    <circle cx="50" cy="50" r="50" fill="#FFA500" />
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dy=".3em"
      fontFamily="Playfair Display, serif"
      fontSize="40"
      fontWeight="bold"
      fill="#FFFFFF"
    >
      ES
    </text>
  </svg>
);

export default Logo;
