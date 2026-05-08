import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { ParticleField } from './components/ParticleField';
import { GlassNavbar } from './components/GlassNavbar';
import { MagneticButton } from './components/MagneticButton';
import { ProjectCard } from './components/ProjectCard';
import { FeaturedProjectCard } from './components/FeaturedProjectCard';
import { FloatingObject } from './components/FloatingObject';
import { LabsPageSection } from './components/LabsPageSection';
import { SidekickProjectsSection } from './components/SidekickProjectsSection';
import { useRef, useState, useEffect } from 'react';
import gestureImage1 from '../assets/21c09d9be33a8bcf477c193540b3be7abfbc7a8b.png';
import gestureImage2 from '../assets/81f8057985d0becc55d9c1738255f6fb0683613f.png';
import nexusHero1 from '../assets/nexus-hero-1.png';
import nexusHero2 from '../assets/nexus-hero-2.png';
import tradeImg1 from '../assets/7e5acb5e0eb6f104bef8925c5127db3f201d87a5.png';
import tradeImg2 from '../assets/3c3fc5e1ec8031f2857fdbabaf36b6e178dc4929.png';
import tradeImg3 from '../assets/55a3500366e430ff1c773f025b8b41636801e663.png';
import tradeImg4 from '../assets/2617cef18fee1a5860b67ada945375fff7e4508a.png';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const heroRoles = [
    'Applied AI systems',
    'Interactive product builds',
    'AI-powered tools',
    'Rapid prototyping',
    'Product thinking',
  ];
  const [heroRoleIndex, setHeroRoleIndex] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setHeroRoleIndex((i) => (i + 1) % heroRoles.length), 2200);
    return () => window.clearInterval(t);
  }, []);

  const tradeKyunik = {
    title: 'TradeKyunik',
    tagline: 'AI trading analysis system',
    tags: ['Behavior analytics', 'Strategy breakdown', 'Decision review'],
    problem:
      'Most trading journals store numbers but don’t explain why performance breaks down.',
    built:
      'An AI-assisted journal that turns sessions into structured reviews: patterns, mistakes, and the “why” behind outcomes.',
    outcome:
      'Faster post-trade clarity and a tighter improvement loop.',
    stack: ['React', 'AI/LLM', 'Analytics', 'UI systems'],
    images: [tradeImg1, tradeImg2, tradeImg3, tradeImg4],
    badge: 'Case study',
  };

  const gestureControl = {
    title: 'Neural Gesture-Control Interface',
    tagline: 'Real-time vision control + 3D brain exploration',
    tags: ['Real-time interaction', '3D exploration', 'Vision pipeline'],
    problem:
      'Turning a vision demo into a usable interface means latency, stability, and clear feedback.',
    built:
      'A gesture control layer mapped to UI/3D interactions, including a brain model you can rotate and explore.',
    outcome:
      'A stable interaction prototype that makes 3D exploration feel learnable.',
    stack: ['MediaPipe', 'Computer Vision', 'WebGL', 'React'],
    images: [gestureImage2],
    badge: 'Case study',
  };

  const projects = [
    {
      title: 'High-Impact UI & Web Experiences',
      description:
        'A collection of modern, visually driven websites focused on motion, clarity, and user experience. Built using AI-assisted workflows and refined with design principles to create clean, high-performing interfaces.',
      tagline: 'Glassmorphism • Motion design • AI-assisted UI',
      tags: ['React', 'Motion', 'Tailwind', 'UX/UI'],
      images: [nexusHero1, nexusHero2],
    },
    {
      title: 'Algorithm Strategy Engine',
      description:
        'Currently developing an AI-powered system designed to generate, test, and refine algorithmic strategies. Focused on automation, pattern recognition, and intelligent decision-making.',
      tagline: 'Coming soon',
      tags: ['AI', 'Algorithms', 'Automation', 'In Progress'],
      badge: 'In Progress',
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0a15] to-[#0a0a0f] text-white overflow-x-hidden"
    >
      <ParticleField />

      <motion.div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 240, 255, 0.06), transparent 40%)`,
        }}
      />

      <GlassNavbar />

      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0, 240, 255, 0.15), transparent)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="relative z-20 max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <motion.div
                className="inline-block px-4 py-2 rounded-full backdrop-blur-sm bg-white/5 border border-white/10 text-sm text-white/70"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Building applied AI products
              </motion.div>

              <h1 className="text-6xl lg:text-7xl leading-tight">
                <span className="block text-white/70 text-xl tracking-wide mb-2">Yuki</span>
                <motion.span
                  className="block bg-gradient-to-r from-[var(--neon-teal)] via-[var(--neon-purple)] to-[var(--neon-blue)] bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  AI product builder
                </motion.span>
              </h1>

              <div className="max-w-xl space-y-4">
                <p className="text-lg text-white/55 leading-relaxed">
                  I build applied AI systems and interactive products—fast prototypes that turn into real tools.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/40 tracking-wider uppercase">Focus</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="flex items-center gap-3 min-h-[28px]">
                  <div className="text-sm text-white/60">→</div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={heroRoles[heroRoleIndex]}
                      initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80"
                    >
                      {heroRoles[heroRoleIndex]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-4"
            >
              <MagneticButton
                variant="primary"
                onClick={() =>
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                View case studies
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative h-96 lg:h-[500px]"
          >
            <FloatingObject />
          </motion.div>
        </motion.div>
      </section>

      <section id="work" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-5xl mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Selected work
            </h2>
            <p className="text-white/50 text-lg">Two shipped systems, then the rest.</p>
          </motion.div>

          <div className="space-y-8">
            {/* Dominant case studies */}
            <FeaturedProjectCard {...tradeKyunik} />
            <FeaturedProjectCard {...gestureControl} />

            {/* Smaller Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative p-12 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10"
            style={{
              boxShadow:
                '0 0 60px rgba(0, 240, 255, 0.1), inset 0 0 60px rgba(255, 255, 255, 0.03)',
            }}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-[var(--neon-purple)]/20 to-[var(--neon-blue)]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <h2 className="text-4xl mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              About Me
            </h2>

            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
              A creative developer who works on AI systems, interactive interfaces, and experimental ideas that turn complexity into something usable and clear.

              Still early, but focused on one thing: shipping real products, learning fast, and pushing ideas beyond just concepts.
              </p>
              <p>
                Passionate about the intersection of{' '}
                <motion.span
                  className="text-[var(--neon-teal)]"
                  whileHover={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.8)' }}
                >
                  design
                </motion.span>
                ,{' '}
                <motion.span
                  className="text-[var(--neon-purple)]"
                  whileHover={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.8)' }}
                >
                  technology
                </motion.span>
                , and{' '}
                <motion.span
                  className="text-[var(--neon-blue)]"
                  whileHover={{ textShadow: '0 0 20px rgba(59, 130, 246, 0.8)' }}
                >
                  innovation
                </motion.span>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <SidekickProjectsSection />

      <LabsPageSection />

      <footer className="relative py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
         
        </div>
      </footer>
    </div>
  );
}