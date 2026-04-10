import { motion } from 'motion/react';
import { MagneticButton } from './MagneticButton';

export function GlassNavbar() {
  const navItems = ['Work', 'About'];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="flex items-center justify-between px-6 py-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10"
          style={{
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.1), inset 0 0 40px rgba(255, 255, 255, 0.03)',
          }}
        >
          <motion.a
            href="#"
            className="text-xl bg-gradient-to-r from-[var(--neon-teal)] to-[var(--neon-purple)] bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Portfolio
          </motion.a>

          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/70 hover:text-white transition-colors relative"
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--neon-teal)] to-[var(--neon-purple)]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            <MagneticButton variant="secondary" size="sm">
              Resume
            </MagneticButton>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
