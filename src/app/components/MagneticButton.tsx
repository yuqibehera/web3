import { motion } from 'motion/react';
import { useRef, useState, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function MagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const variantStyles =
    variant === 'primary'
      ? {
          background:
            'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(168, 85, 247, 0.1))',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 0 30px rgba(0, 240, 255, 0.2), inset 0 0 20px rgba(168, 85, 247, 0.1)',
        }
      : {
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)',
        };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-full backdrop-blur-sm text-white cursor-pointer overflow-hidden ${sizeClasses[size]}`}
      style={variantStyles}
      animate={{ x: position.x, y: position.y }}
      whileHover={{
        scale: 1.05,
        boxShadow:
          variant === 'primary'
            ? '0 0 50px rgba(0, 240, 255, 0.4), inset 0 0 30px rgba(168, 85, 247, 0.2)'
            : '0 0 30px rgba(255, 255, 255, 0.1)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{
          background:
            variant === 'primary'
              ? 'radial-gradient(circle at center, rgba(0, 240, 255, 0.2), transparent 70%)'
              : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent 70%)',
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
