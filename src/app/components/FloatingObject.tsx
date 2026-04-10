import { motion } from 'motion/react';

export function FloatingObject() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative"
        animate={{
          y: [0, -20, 0],
          rotateY: [0, 360],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotateY: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative w-64 h-64">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--neon-teal)] to-[var(--neon-purple)] opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-48 h-48 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20"
              style={{
                boxShadow:
                  '0 0 60px rgba(0, 240, 255, 0.3), inset 0 0 60px rgba(168, 85, 247, 0.1)',
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateX: [0, 10, 0, -10, 0],
                rotateZ: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-[var(--neon-teal)]/20 to-[var(--neon-purple)]/20 backdrop-blur-sm" />

              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[var(--neon-teal)] to-[var(--neon-purple)]"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 40px rgba(0, 240, 255, 0.5)',
                    '0 0 60px rgba(168, 85, 247, 0.7)',
                    '0 0 40px rgba(0, 240, 255, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>

          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-white/10"
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 2, 2],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
