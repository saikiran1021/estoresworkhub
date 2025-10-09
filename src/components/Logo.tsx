import { cn } from '@/lib/utils';
import Image from 'next/image';

const Logo = ({ className, ...props }: { className?: string }) => (
  <Image
    src="https://estoresedu.com/estores_logo-transformed.png"
    alt="eStores Logo"
    width={160}
    height={40}
    className={cn('h-auto', className)}
    priority
    {...props}
  />
);

export default Logo;
