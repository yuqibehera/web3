import { motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

function useTypewriterLines(lines: string[], speedMs = 18, lineDelayMs = 220) {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;
    let timeout: number | undefined;

    const tick = () => {
      if (cancelled) return;

      const currentLine = lines[lineIdx] ?? '';

      if (charIdx < currentLine.length) {
        const nextChar = currentLine[charIdx];
        charIdx += 1;
        setText((prev) => prev + nextChar);
        timeout = window.setTimeout(tick, speedMs);
        return;
      }

      if (lineIdx < lines.length - 1) {
        lineIdx += 1;
        charIdx = 0;
        setText((prev) => prev + '\n');
        timeout = window.setTimeout(tick, lineDelayMs);
        return;
      }

      setDone(true);
    };

    timeout = window.setTimeout(tick, 250);
    return () => {
      cancelled = true;
      if (timeout) window.clearTimeout(timeout);
    };
  }, [lines, speedMs, lineDelayMs]);

  return { text, done };
}

type HoverStackItem = {
  title: string;
  detail: string;
  accent: 'teal' | 'purple' | 'blue';
};

function AccentDot({ accent }: { accent: HoverStackItem['accent'] }) {
  const className =
    accent === 'teal'
      ? 'bg-[var(--neon-teal)]'
      : accent === 'purple'
        ? 'bg-[var(--neon-purple)]'
        : 'bg-[var(--neon-blue)]';
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${className}`} />;
}

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

export function LabsPageSection() {
  const heroLines = useMemo(
    () => [
      '🔥 Project lines (VERY important)',
      'Learning in public. Building in real time.',
      'Not experienced yet — but not waiting either.',
      '',
      'Breaking things. Fixing them. Repeating the process.',
      'Half curiosity, half obsession.',
    ],
    [],
  );

  const { text: heroTyped, done: heroDone } = useTypewriterLines(heroLines, 16, 240);

  const works = useMemo(
    () => [
      {
        title: 'Therapy AI',
        accent: 'purple' as const,
        tagline: 'Calm, presence, and emotional pacing',
        description:
          'An AI that doesn’t just respond — it understands pace, emotion, and presence.\nBuilt to simulate calm, not just conversation.',
        micro: ['Emotion-aware pacing', 'Presence simulation', 'Gentle UX'],
      },
      {
        title: 'Tracker',
        accent: 'teal' as const,
        tagline: 'Competitor intelligence, explained like an analyst',
        description:
          'A competitor intelligence system that tracks, analyzes, and explains market movement in real time.\nBuilt to think like an analyst — not just display data.',
        micro: ['Signal detection', 'Narrative explanations', 'Real-time feed'],
        strong: true,
      },
    ],
    [],
  );

  const hoverStack = useMemo<HoverStackItem[]>(
    () => [
      {
        title: 'Ship faster than comfort',
        detail: 'Build the prototype, then earn the polish.',
        accent: 'teal',
      },
      {
        title: 'Design is a system',
        detail: 'Motion + hierarchy + restraint = trust.',
        accent: 'blue',
      },
      {
        title: 'AI should feel human',
        detail: 'Not “smart” — safe, calm, and predictable.',
        accent: 'purple',
      },
      {
        title: 'Work in public',
        detail: 'Make progress visible. Let feedback shape it.',
        accent: 'teal',
      },
    ],
    [],
  );
  const [activeHoverTitle, setActiveHoverTitle] = useState(hoverStack[0]?.title ?? '');

  const splitItems = useMemo(
    () => [
      {
        key: 'identity',
        label: 'identity',
        title: 'Identity',
        body:
          'Builder of interactive interfaces and intelligent systems.\nFocused on shipping, learning, and iterating in the open.',
      },
      {
        key: 'projects',
        label: 'projects',
        title: 'Projects',
        body: 'Tradekyunik, gesture control system and more.',
      },
      {
        key: 'skills',
        label: 'skills',
        title: 'Skills',
        body: 'Motion, UX hierarchy, React systems, and AI-driven experiences.',
      },
      {
        key: 'learning',
        label: 'learning',
        title: 'Learning',
        body: 'Building real-time systems and practicing product thinking daily.',
      },
    ],
    [],
  );
  const [activeSplitKey, setActiveSplitKey] = useState(splitItems[0]?.key ?? 'identity');

  const terminalCommands = useMemo(
    () => [
      {
        cmd: 'identity',
        out: [
          'name: yuki',
          'mode: builder',
          'vibe: half curiosity, half obsession',
          'status: learning in public',
        ],
      },
      {
        cmd: 'projects',
        out: [
          'Tradekyunik',
          'gesture control system',
          'and more',
        ],
      },
      {
        cmd: 'skills',
        out: ['motion systems', 'glass UI', 'react components', 'AI/analysis tooling'],
      },
    ],
    [],
  );
  const [terminalCmd, setTerminalCmd] = useState(terminalCommands[0]?.cmd ?? 'identity');

  const timeline = useMemo(
    () => [
      {
        key: 'curiosity',
        title: 'curiosity',
        sub: 'questions → prototypes',
        body: 'Experiment with interfaces, motion, and fast ideas.',
      },
      {
        key: 'experiments',
        title: 'experiments',
        sub: 'systems → signals',
        body: 'Turn messy inputs into clean feedback loops and usable tools.',
      },
      {
        key: 'real-systems',
        title: 'real systems',
        sub: 'shipping → iteration',
        body: 'Build products that explain themselves and improve with use.',
      },
    ],
    [],
  );
  const [openTimelineKey, setOpenTimelineKey] = useState(timeline[1]?.key ?? 'experiments');

  const activeSplit = splitItems.find((i) => i.key === activeSplitKey) ?? splitItems[0]!;
  const activeTerminal = terminalCommands.find((c) => c.cmd === terminalCmd) ?? terminalCommands[0]!;

  return (
    <section id="labs" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-5xl mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Labs
          </h2>
          <p className="text-white/50 text-lg">Staged experiences, not just text.</p>
        </motion.div>

        {/* 2) Interactive hover mindset */}
        <div className="grid lg:grid-cols-2 gap-8">
          <GlassPanel className="p-10">
            <div className="space-y-4">
              <h3 className="text-3xl bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Hover mindset
              </h3>

              <div className="pt-6 grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-3">
                  {hoverStack.map((item) => {
                    const active = item.title === activeHoverTitle;
                    return (
                      <motion.button
                        key={item.title}
                        type="button"
                        onMouseEnter={() => setActiveHoverTitle(item.title)}
                        onFocus={() => setActiveHoverTitle(item.title)}
                        className={[
                          'w-full text-left relative rounded-2xl border overflow-hidden',
                          active ? 'border-white/20 bg-white/8' : 'border-white/10 bg-white/5',
                        ].join(' ')}
                        whileHover={{ y: -2, scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      >
                        <motion.div
                          className="absolute inset-0 opacity-0"
                          animate={{ opacity: active ? 1 : 0 }}
                          transition={{ duration: 0.25 }}
                          style={{
                            background:
                              item.accent === 'teal'
                                ? 'radial-gradient(500px circle at 20% 20%, rgba(0, 240, 255, 0.14), transparent 55%)'
                                : item.accent === 'purple'
                                  ? 'radial-gradient(500px circle at 20% 20%, rgba(168, 85, 247, 0.14), transparent 55%)'
                                  : 'radial-gradient(500px circle at 20% 20%, rgba(59, 130, 246, 0.14), transparent 55%)',
                          }}
                        />
                        <div className="relative px-5 py-4">
                          <div className="flex items-center gap-2 text-white/90">
                            <AccentDot accent={item.accent} />
                            <span>{item.title}</span>
                          </div>
                          <div className="text-xs text-white/40 mt-1">hover to preview</div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="relative">
                  {(() => {
                    const active =
                      hoverStack.find((h) => h.title === activeHoverTitle) ?? hoverStack[0]!;
                    return (
                      <motion.div
                        key={active.title}
                        initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="relative p-6 rounded-2xl bg-black/25 border border-white/10 overflow-hidden"
                      >
                        <motion.div
                          className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.22, 0.4, 0.22] }}
                          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                          style={{
                            background:
                              active.accent === 'teal'
                                ? 'rgba(0, 240, 255, 0.22)'
                                : active.accent === 'purple'
                                  ? 'rgba(168, 85, 247, 0.22)'
                                  : 'rgba(59, 130, 246, 0.22)',
                          }}
                        />
                        <div className="relative space-y-3">
                          <div className="text-lg text-white/90">{active.title}</div>
                          <div className="text-white/65 leading-relaxed">{active.detail}</div>
                          <div className="pt-2 text-white/45 text-sm">
                            Connection: calm UX, fast shipping, and systems that explain themselves.
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* 3) Split personality layout */}
          <GlassPanel className="p-10">
            <div className="space-y-6">
              <h3 className="text-3xl bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Split personality
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  {splitItems.map((i) => {
                    const active = i.key === activeSplitKey;
                    return (
                      <motion.button
                        key={i.key}
                        type="button"
                        onMouseEnter={() => setActiveSplitKey(i.key)}
                        onFocus={() => setActiveSplitKey(i.key)}
                        className={[
                          'w-full text-left px-4 py-3 rounded-2xl border transition-colors',
                          active
                            ? 'bg-white/8 border-white/20 text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:text-white',
                        ].join(' ')}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="font-mono text-sm">{i.label}</div>
                          {active ? (
                            <motion.div
                              layoutId="split-active-pill"
                              className="h-2 w-2 rounded-full bg-[var(--neon-teal)]"
                              style={{ boxShadow: '0 0 18px rgba(0, 240, 255, 0.55)' }}
                            />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-white/10" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="relative">
                  <motion.div
                    key={activeSplit.key}
                    initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="relative p-6 rounded-2xl bg-black/25 border border-white/10 overflow-hidden"
                  >
                    <motion.div
                      className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl"
                      animate={{ scale: [1, 1.18, 1], opacity: [0.18, 0.35, 0.18] }}
                      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ background: 'rgba(0, 240, 255, 0.18)' }}
                    />
                    <div className="text-white/90 text-lg mb-2">{activeSplit.title}</div>
                    <div className="text-white/60 whitespace-pre-line leading-relaxed">
                      {activeSplit.body}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* 4) “System terminal” style */}
        <GlassPanel className="p-10">
          <div className="space-y-6">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <h3 className="text-3xl bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  System terminal
                </h3>
                <p className="text-white/60">Commands reveal the story with smooth motion.</p>
              </div>

              <div className="flex gap-3 flex-wrap">
                {terminalCommands.map((c) => {
                  const active = c.cmd === terminalCmd;
                  return (
                    <motion.button
                      key={c.cmd}
                      type="button"
                      onClick={() => setTerminalCmd(c.cmd)}
                      className={[
                        'px-4 py-2 rounded-full font-mono text-sm border',
                        active
                          ? 'bg-white/10 border-white/20 text-white'
                          : 'bg-white/5 border-white/10 text-white/70 hover:text-white',
                      ].join(' ')}
                      whileHover={{ y: -1 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                    >
                      {c.cmd}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-red-500/70" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
                <span className="h-2 w-2 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-white/40">terminal</span>
              </div>

              <motion.div
                key={activeTerminal.cmd}
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="font-mono text-[14px] leading-6 text-white/80"
              >
                <div className="text-white/60">
                  <span className="text-[var(--neon-teal)]">yuki@system</span>
                  <span className="text-white/30">:</span>
                  <span className="text-[var(--neon-purple)]">~</span>
                  <span className="text-white/30">$</span> {activeTerminal.cmd}
                </div>
                <div className="mt-3 space-y-1">
                  {activeTerminal.out.map((l) => (
                    <motion.div
                      key={l}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.22 }}
                      className="text-white/80"
                    >
                      {l}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </GlassPanel>

        {/* 5) Timeline growth */}
        <GlassPanel className="p-10">
          <div className="space-y-8">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <h3 className="text-3xl bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  Timeline growth
                </h3>
                <p className="text-white/60">
                  Curiosity → experiments → real systems. Click to expand.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
              <div className="space-y-4">
                {timeline.map((t, idx) => {
                  const open = t.key === openTimelineKey;
                  return (
                    <motion.button
                      key={t.key}
                      type="button"
                      onClick={() => setOpenTimelineKey((prev) => (prev === t.key ? '' : t.key))}
                      className="w-full text-left pl-10 pr-4 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/7 transition-colors relative"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                    >
                      <div
                        className={[
                          'absolute left-[7px] top-6 h-3 w-3 rounded-full',
                          idx === 0
                            ? 'bg-[var(--neon-purple)]'
                            : idx === 1
                              ? 'bg-[var(--neon-teal)]'
                              : 'bg-[var(--neon-blue)]',
                        ].join(' ')}
                        style={{ boxShadow: '0 0 18px rgba(0, 240, 255, 0.25)' }}
                      />
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-white/90 font-mono">{t.title}</div>
                          <div className="text-sm text-white/50">{t.sub}</div>
                        </div>
                        <div className="text-xs text-white/40">{open ? 'collapse' : 'expand'}</div>
                      </div>
                      <motion.div
                        initial={false}
                        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 text-white/70">{t.body}</div>
                        <div className="pt-3 text-white/50">
                          Example: <span className="text-white/70">Tracker</span> for real-time signal
                          narration, <span className="text-white/70">Therapy AI</span> for calm
                          presence UX.
                        </div>
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

