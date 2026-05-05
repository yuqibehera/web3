import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useMemo, useRef } from 'react';

import trackerImg from '../../assets/sidekick/tracker.png';
import therapyImg1 from '../../assets/sidekick/therapy-1.png';
import therapyImg2 from '../../assets/sidekick/therapy-2.png';

function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        'relative rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10',
        className ?? '',
      ].join(' ')}
      style={{
        boxShadow: '0 0 60px rgba(0, 240, 255, 0.08), inset 0 0 60px rgba(255, 255, 255, 0.03)',
      }}
    >
      {children}
    </div>
  );
}

function InteractiveProjectCard({
  title,
  emphasis,
  description,
  highlights,
  images,
  accent,
}: {
  title: string;
  emphasis?: string;
  description: string;
  highlights: string[];
  images: { src: string; alt: string }[];
  accent: 'teal' | 'purple' | 'blue';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 160, damping: 22 });
  const sy = useSpring(my, { stiffness: 160, damping: 22 });

  const rotX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const glowBg = useTransform([sx, sy], ([x, y]) => {
    const px = `${Math.round((x + 0.5) * 100)}%`;
    const py = `${Math.round((y + 0.5) * 100)}%`;
    return `radial-gradient(420px circle at ${px} ${py}, rgba(0, 240, 255, 0.14), transparent 55%)`;
  });

  const accentClass =
    accent === 'teal'
      ? 'from-[var(--neon-teal)]/25 to-transparent'
      : accent === 'purple'
        ? 'from-[var(--neon-purple)]/25 to-transparent'
        : 'from-[var(--neon-blue)]/25 to-transparent';

  return (
    <motion.div
      ref={ref}
      className="group relative"
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        mx.set(px);
        my.set(py);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: glowBg }}
      />

      <motion.div
        className="relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: 'preserve-3d',
          boxShadow: '0 0 60px rgba(0, 240, 255, 0.08), inset 0 0 60px rgba(255, 255, 255, 0.03)',
        }}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      >
        <div className={`absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl bg-gradient-to-br ${accentClass}`} />

        <div className="relative grid lg:grid-cols-2 gap-8 p-10">
          <div className="space-y-5" style={{ transform: 'translateZ(30px)' }}>
            <div className="space-y-2">
              <h3 className="text-3xl bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {title}
              </h3>
              {emphasis ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-teal)]" />
                  {emphasis}
                </div>
              ) : null}
            </div>

            <p className="text-white/70 leading-relaxed whitespace-pre-line">{description}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              {highlights.map((h) => (
                <motion.span
                  key={h}
                  className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
                  whileHover={{ y: -1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  {h}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="relative" style={{ transform: 'translateZ(40px)' }}>
            <div className="relative rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                animate={{ opacity: [0.55, 0.75, 0.55] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background:
                    'radial-gradient(800px circle at 30% 20%, rgba(168, 85, 247, 0.14), transparent 55%)',
                }}
              />
              <div className="relative p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-red-500/60" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
                  <span className="h-2 w-2 rounded-full bg-green-500/60" />
                  <span className="ml-3 text-xs text-white/40">preview</span>
                </div>

                <div className={images.length === 1 ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-2 gap-3'}>
                  {images.map((img, idx) => (
                    <motion.div
                      key={img.alt}
                      className="relative rounded-xl overflow-hidden border border-white/10"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                      style={{ transform: `translateZ(${idx === 0 ? 16 : 10}px)` }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.35))',
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SidekickProjectsSection() {
  const cards = useMemo(
    () => [
      {
        title: 'Tracker',
        emphasis: 'Competitor intelligence in real time',
        description:
          'A competitor intelligence system that tracks, analyzes, and explains market movement in real time.\nBuilt to think like an analyst — not just display data.',
        highlights: ['Intel feed', 'Market movement', 'Analyst-style explanations', 'Real-time'],
        images: [{ src: trackerImg, alt: 'Tracker dashboard preview' }],
        accent: 'teal' as const,
      },
      {
        title: 'Therapy AI',
        emphasis: 'Calm presence, not just chat',
        description:
          'An AI that doesn’t just respond — it understands pace, emotion, and presence.\nBuilt to simulate calm, not just conversation.',
        highlights: ['Pacing', 'Emotion', 'Presence', 'Gentle UX'],
        images: [
          { src: therapyImg1, alt: 'Therapy AI check-in screen' },
          { src: therapyImg2, alt: 'Therapy AI landing screen' },
        ],
        accent: 'purple' as const,
      },
    ],
    [],
  );

  return (
    <section id="sidekick" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-5xl mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Sidekick Projects
          </h2>
          <p className="text-white/50 text-lg">Two focused builds, presented like real products.</p>
        </motion.div>

        <GlassPanel className="p-10 overflow-hidden">
          <motion.div
            className="absolute -top-28 -left-28 w-80 h-80 bg-gradient-to-br from-[var(--neon-teal)]/14 to-[var(--neon-purple)]/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-28 -right-28 w-80 h-80 bg-gradient-to-br from-[var(--neon-blue)]/12 to-[var(--neon-teal)]/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative space-y-8">
            {cards.map((c) => (
              <InteractiveProjectCard key={c.title} {...c} />
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

