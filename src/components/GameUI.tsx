import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, LogOut, Sparkles, Swords } from 'lucide-react';
import { WORLDS } from '../gameData';
import { formatChoiceRequirements, getCharacterEvents, getChoiceAvailability } from '../gameLogic';
import { Choice, GameState } from '../types';
import { cn } from '../lib/utils';

interface GameUIProps {
  gameState: GameState;
  onChoiceMade: (choice: Choice) => void;
  onQuit: () => void;
}

interface StatBarProps {
  value: number;
  label: string;
  colorVar: string;
}

function StatBar({ value, label, colorVar }: StatBarProps) {
  const percentage = Math.max(0, Math.min(100, value));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/45">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            background: colorVar,
            boxShadow: `0 0 12px ${colorVar}`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function GameUI({ gameState, onChoiceMade, onQuit }: GameUIProps) {
  const { currentCharacter, currentWorldIndex, stats, currentEvent, eventHistory, unlockedMemories } = gameState;
  const currentWorld = WORLDS[currentWorldIndex];
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  if (!currentCharacter || !currentEvent || !currentWorld) {
    return null;
  }

  const characterEvents = getCharacterEvents(currentCharacter.id);
  const currentEventPosition = characterEvents.findIndex((event) => event.id === currentEvent.id) + 1;
  const isMemory = currentEvent.isMemoryEcho;
  const isBossStage = currentEvent.isBossStage;

  const handleChoice = (choice: Choice) => {
    const availability = getChoiceAvailability(choice, gameState);
    if (!availability.available) {
      return;
    }

    setSelectedChoiceId(choice.id);
    window.setTimeout(() => {
      setSelectedChoiceId(null);
      onChoiceMade(choice);
    }, 450);
  };

  return (
    <div className={cn('relative z-10 min-h-screen text-[#f5f2ed]', isMemory ? 'memory-overlay' : '')}>
      <div className="app-shell flex min-h-screen flex-col px-4 py-4 sm:px-0 sm:py-6">
        <nav className="panel panel-strong flex flex-wrap items-center justify-between gap-4 rounded-[22px] px-5 py-4 sm:px-6">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#d4af37]">
              {currentCharacter.name}
            </p>
            <div className="text-xl leading-none sm:text-2xl">
              {currentWorld.name}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/55">
              Scene {currentEventPosition} of {characterEvents.length}
            </div>
            <button
              type="button"
              onClick={onQuit}
              className="inline-flex appearance-none items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/68 transition-colors hover:border-[#d4af37]/50 hover:text-[#d4af37]"
            >
              <LogOut size={14} />
              Return to Cast
            </button>
          </div>
        </nav>

        <div className="mt-4 grid flex-1 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
          <section className="space-y-4">
            <div className="panel rounded-[24px] p-5 sm:p-6">
              <div className="mb-4 flex flex-wrap gap-2">
                {WORLDS.map((world, index) => {
                  const isActive = index === currentWorldIndex;
                  const isComplete = index < currentWorldIndex;

                  return (
                    <div
                      key={world.id}
                      className={cn(
                        'rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.22em] transition-colors',
                        isActive
                          ? 'border-[#d4af37]/70 bg-[#d4af37]/12 text-[#f7d97a]'
                          : isComplete
                            ? 'border-white/10 bg-white/6 text-white/55'
                            : 'border-white/8 bg-transparent text-white/28',
                      )}
                    >
                      {world.name}
                    </div>
                  );
                })}
              </div>

              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_240px] md:items-start">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#d4af37]">
                    {currentWorld.description}
                  </p>
                  <p className="mt-3 max-w-3xl text-[15px] leading-7 text-white/58">
                    {currentWorld.theme}
                  </p>
                </div>

                <div className="rounded-[18px] border border-white/10 bg-black/18 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Character Ability</p>
                  <p className="mt-2 text-base text-white">{currentCharacter.abilityName}</p>
                  <p className="mt-2 text-[13px] leading-6 text-white/56">{currentCharacter.abilityDesc}</p>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentEvent.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45 }}
                className="panel rounded-[28px] p-6 sm:p-8"
              >
                <div className="mb-5 flex flex-wrap gap-3">
                  {isMemory && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/8 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-[#f7d97a]">
                      <Sparkles size={14} /> Memory Echo
                    </div>
                  )}
                  {isBossStage && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#fb7185]/35 bg-[#fb7185]/10 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-[#ffd3dd]">
                      <Swords size={14} /> Final Boss
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/38">
                      {isBossStage ? 'Final Trial' : 'Current Scene'}
                    </p>
                    <h1 className="mt-3 text-4xl leading-none text-[#f9f2e7] sm:text-[48px]">
                      {currentEvent.title}
                    </h1>
                  </div>

                  <p className="max-w-4xl text-[18px] leading-8 text-white/78 sm:text-[20px] sm:leading-9">
                    {currentEvent.description}
                  </p>
                </div>

                {isBossStage && (
                  <div className="mt-6 rounded-[18px] border border-[#fb7185]/18 bg-[#fb7185]/6 p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#ffd3dd]">Boss Rules</p>
                    <p className="mt-2 max-w-3xl text-[14px] leading-7 text-white/70">
                      Only the stat-gated response can clear the boss encounter. If your build is missing key strengths, the safer-looking option will end the run in defeat.
                    </p>
                  </div>
                )}

                <div className="mt-8 space-y-3">
                  {currentEvent.choices.map((choice) => {
                    const availability = getChoiceAvailability(choice, gameState);
                    const isDisabled = selectedChoiceId !== null || !availability.available;
                    const requirements = formatChoiceRequirements(choice);

                    return (
                      <button
                        key={choice.id}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => handleChoice(choice)}
                        className={cn(
                          'w-full appearance-none rounded-[20px] border p-5 text-left transition-all duration-250',
                          'border-white/10 bg-white/[0.04]',
                          selectedChoiceId === choice.id
                            ? 'scale-[0.99] border-[#d4af37] bg-[#d4af37]/18'
                            : availability.available
                              ? 'hover:border-[#d4af37]/55 hover:bg-[#d4af37]/10'
                              : 'cursor-not-allowed opacity-45 grayscale',
                          selectedChoiceId !== null && selectedChoiceId !== choice.id ? 'opacity-50 grayscale' : '',
                        )}
                      >
                        <div className="flex gap-4">
                          <div className="mt-1 h-3 w-3 shrink-0 rotate-45 rounded-[2px] border border-[#d4af37]/70" />
                          <div className="min-w-0 flex-1">
                            <p className={cn('text-[16px] leading-7 text-white/84', choice.isMemoryUnlock ? 'italic text-[#f4d57b]' : '')}>
                              {choice.text}
                            </p>

                            {requirements.length > 0 && (
                              <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-white/42">
                                Requirements: {requirements.join(' · ')}
                              </p>
                            )}
                            {!availability.available && (
                              <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-[#ffd3dd]">
                                {availability.reason}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </section>

          <aside className="space-y-4">
            <div className="panel rounded-[24px] p-6">
              <div className="flex items-start gap-4">
                <div
                  className="flex shrink-0 items-center justify-center rounded-full border text-3xl font-serif"
                  style={{
                    width: 72,
                    height: 72,
                    color: currentCharacter.themeColor,
                    borderColor: `${currentCharacter.themeColor}88`,
                    background: `${currentCharacter.themeColor}18`,
                  }}
                >
                  {currentCharacter.name[0]}
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-white/35">Perspective</p>
                  <h2 className="mt-2 text-[30px] leading-none text-white">{currentCharacter.name}</h2>
                  <p className="mt-2 text-[12px] uppercase tracking-[0.22em]" style={{ color: currentCharacter.themeColor }}>
                    {currentCharacter.role}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[14px] leading-7 text-white/64">{currentCharacter.description}</p>
            </div>

            <div className="panel rounded-[24px] p-6">
              <p className="text-[11px] uppercase tracking-[0.26em] text-white/38">Emotional State</p>
              <div className="mt-5 space-y-5">
                <StatBar value={stats.identity} label="Identity" colorVar="var(--color-identity)" />
                <StatBar value={stats.bond} label="Family Bond" colorVar="var(--color-bond)" />
                <StatBar value={stats.communication} label="Communication" colorVar="var(--color-comm)" />
                <StatBar value={stats.culture} label="Cultural Balance" colorVar="var(--color-balance)" />
              </div>
            </div>

            <div className="panel rounded-[24px] p-6">
              <p className="text-[11px] uppercase tracking-[0.26em] text-white/38">Character Goals</p>
              <div className="mt-4 space-y-3">
                {currentCharacter.tasks.map((task, index) => (
                  <div key={task} className="rounded-[16px] border border-white/8 bg-black/16 px-4 py-3 text-[13px] leading-6 text-white/63">
                    <span className="mr-2 text-[#d4af37]">{index + 1}.</span>
                    {task}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel rounded-[24px] p-6">
              <div className="flex items-center gap-3 text-[#f7d97a]">
                <BookOpen size={20} />
                <p className="text-[11px] uppercase tracking-[0.26em]">Recovered Threads</p>
              </div>

              <p className="mt-4 font-serif text-4xl text-white">{unlockedMemories}</p>
              <p className="mt-3 text-[13px] leading-6 text-white/58">
                {unlockedMemories > 0
                  ? `${unlockedMemories} memory thread${unlockedMemories === 1 ? '' : 's'} are shaping how this story resolves.`
                  : 'No memory threads recovered yet. Hidden choices will surface deeper understanding.'}
              </p>
              <div className="mt-5 rounded-[16px] border border-dashed border-white/12 px-4 py-3 text-[12px] uppercase tracking-[0.2em] text-white/38">
                Completed Scenes: {eventHistory.length} / {characterEvents.length}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
