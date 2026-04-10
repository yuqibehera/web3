import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import image2 from 'figma:asset/7e5acb5e0eb6f104bef8925c5127db3f201d87a5.png';
import image3 from 'figma:asset/3c3fc5e1ec8031f2857fdbabaf36b6e178dc4929.png';
import image4 from 'figma:asset/55a3500366e430ff1c773f025b8b41636801e663.png';
import image5 from 'figma:asset/2617cef18fee1a5860b67ada945375fff7e4508a.png';

interface FeaturedProjectCardProps {
  title: string;
  description: string;
  tagline: string;
  tags: string[];
}

export function FeaturedProjectCard({ title, description, tagline, tags }: FeaturedProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image2, image3, image4, image5];
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
      style={{
        perspective: '1500px',
      }}
    >
      <motion.div
        className="relative rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          boxShadow: '0 0 60px rgba(0, 240, 255, 0.15)',
        }}
        whileHover={{
          boxShadow: '0 0 80px rgba(0, 240, 255, 0.25), 0 0 120px rgba(168, 85, 247, 0.15)',
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.15), transparent 60%)',
          }}
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Slot */}
          <motion.div
            className="relative h-96 md:h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`${title} screenshot ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            <motion.div
              className="absolute top-4 right-4 px-4 py-2 rounded-full backdrop-blur-sm bg-[var(--neon-teal)]/20 border border-[var(--neon-teal)]/30 text-sm text-white"
              whileHover={{ scale: 1.1 }}
            >
              Featured
            </motion.div>

            {/* Image Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <motion.button
                onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="w-8 h-8 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </motion.button>

              <div className="flex gap-2">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-[var(--neon-teal)] w-6'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    style={{
                      boxShadow: index === currentImageIndex ? '0 0 10px rgba(0, 240, 255, 0.5)' : 'none',
                    }}
                  />
                ))}
              </div>

              <motion.button
                onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="w-8 h-8 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.button>
            </div>
          </motion.div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 flex flex-col justify-center space-y-6">
            <div>
              <motion.div
                className="inline-flex items-center gap-2 mb-4"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--neon-teal)] to-[var(--neon-purple)] flex items-center justify-center"
                  style={{
                    boxShadow: '0 0 30px rgba(0, 240, 255, 0.4)',
                  }}
                >
                  <div className="w-6 h-6 rounded-md bg-white/30 backdrop-blur-sm" />
                </div>
              </motion.div>

              <h3 className="text-3xl md:text-4xl text-white mb-3">{title}</h3>

              <p className="text-sm text-[var(--neon-teal)]/80 mb-4">{tagline}</p>
            </div>

            <p className="text-white/70 leading-relaxed text-lg">
              {description}
            </p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 text-white/70"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(0, 240, 255, 0.1)',
                    borderColor: 'rgba(0, 240, 255, 0.3)',
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <motion.button
              className="self-start px-6 py-3 rounded-full backdrop-blur-sm bg-gradient-to-r from-[var(--neon-teal)]/20 to-[var(--neon-purple)]/20 border border-white/20 text-white flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(0, 240, 255, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.button>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--neon-teal)] via-[var(--neon-purple)] to-[var(--neon-blue)] opacity-0 group-hover:opacity-100"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}
