import React, { useState } from 'react';
import { GameState, Choice, GameEvent } from '../types';
import { WORLDS } from '../gameData';
import { Heart, Brain, MessagesSquare, Globe2, Sparkles, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface GameUIProps {
  gameState: GameState;
  onChoiceMade: (choice: Choice) => void;
  onQuit: () => void;
}

const StatBar = ({ value, label, colorVar }: { value: number, label: string, colorVar: string }) => {
  const percentage = Math.max(0, Math.min(100, value));
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-[11px] uppercase tracking-[1px] text-white/50">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-sm overflow-hidden">
        <motion.div 
          className="h-full rounded-sm"
          style={{ 
            width: `${percentage}%`, 
            background: colorVar,
            boxShadow: `0 0 10px ${colorVar}`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default function GameUI({ gameState, onChoiceMade, onQuit }: GameUIProps) {
  const { currentCharacter, currentWorldIndex, stats, currentEvent } = gameState;
  const currentWorld = WORLDS[currentWorldIndex];
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  if (!currentCharacter || !currentEvent || !currentWorld) return null;

  const isMemory = currentEvent.isMemoryEcho;

  const handleChoice = (c: Choice) => {
    setSelectedChoiceId(c.id);
    setTimeout(() => {
      setSelectedChoiceId(null);
      onChoiceMade(c);
    }, 600);
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col font-serif text-[#f5f2ed] transition-colors duration-1000 relative z-10",
      isMemory ? "memory-overlay" : ""
    )}>
      {/* Top Bar */}
      <nav className="h-[60px] border-b border-[#d4af37]/20 flex justify-between items-center px-6 lg:px-[40px] bg-black/40 sticky top-0 z-20">
        <div className="font-variant-caps uppercase tracking-[2px] text-[#d4af37] text-[14px]">
          World {currentWorld.level}: {currentWorld.name}
        </div>
        <div className="flex gap-5 text-xs items-center">
          <button onClick={onQuit} className="flex items-center gap-2 hover:text-[#d4af37] transition-colors text-white/60 uppercase tracking-widest font-bold">
            <LogOut size={14} /> Quit
          </button>
        </div>
      </nav>

      {/* Main Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 p-6 lg:p-[40px] relative">
        
        {/* Narrative Zone */}
        <section className="flex flex-col justify-end relative rounded-xl min-h-[400px]">
          <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-transparent to-[var(--color-bg)] opacity-30 rounded-lg pointer-events-none -z-10"></div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentEvent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="bg-[var(--color-glass)] border border-white/10 rounded-[12px] p-6 sm:p-[30px] backdrop-blur-[10px] relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-5"
            >
              {isMemory && (
                <div className="flex items-center gap-2 text-[#d4af37] text-xs uppercase tracking-[0.2em] font-bold mb-4 opacity-80">
                  <Sparkles size={14} /> Memory Echo
                </div>
              )}
              
              <div className="text-[12px] uppercase tracking-[1.5px] text-[#d4af37] font-bold mb-2">
                {currentEvent.title}
              </div>
              
              <div className="text-[20px] leading-[1.6] text-white mb-6">
                {currentEvent.description}
              </div>

              <div className="flex flex-col gap-3">
                {currentEvent.choices.map((choice) => (
                  <button
                    key={choice.id}
                    disabled={selectedChoiceId !== null}
                    onClick={() => handleChoice(choice)}
                    className={cn(
                      "bg-white/[0.03] border border-white/10 p-[14px_20px] rounded-[6px] text-[15px] transition-all duration-300 text-white/80 flex items-center text-left group",
                      selectedChoiceId === choice.id 
                        ? "bg-[#d4af37]/20 border-[#d4af37] text-white scale-[0.98]" 
                        : "hover:bg-[#d4af37]/10 hover:border-[#d4af37] hover:text-white cursor-pointer",
                      selectedChoiceId !== null && selectedChoiceId !== choice.id ? "opacity-50 grayscale" : ""
                    )}
                  >
                    <div className="w-2 h-2 border border-[#d4af37] shrink-0 rotate-45 mr-[15px]"></div>
                    <div className="flex-1">
                      <span className={cn(
                        choice.isMemoryUnlock ? "italic text-[#d4af37]" : ""
                      )}>
                        {choice.text}
                      </span>
                      {choice.requiredAbility && (
                        <span className="ml-2 text-[11px] text-[#d4af37] opacity-80 uppercase tracking-wider font-sans">
                          [Ability: {choice.requiredAbility}]
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Stats Panel */}
        <aside className="bg-black/30 lg:border-l lg:border-[#d4af37]/10 p-[30px] flex flex-col gap-[24px]">
          <div className="text-center mb-2">
             <div className="w-[120px] h-[120px] mx-auto mb-[15px] border-2 border-[#d4af37] rounded-full p-[5px] bg-gradient-to-tr from-[#d4af37] to-transparent">
               <div className="w-full h-full rounded-full bg-[#2a1a15] flex items-center justify-center text-[40px] text-[#d4af37] font-serif">
                 {currentCharacter.name[0]}
               </div>
             </div>
             <h2 className="font-serif text-[22px] text-white">{currentCharacter.name}</h2>
             <p className="text-[12px] opacity-60 italic">{currentCharacter.role}</p>
          </div>

          <StatBar value={stats.identity} label="Identity" colorVar="var(--color-identity)" />
          <StatBar value={stats.bond} label="Family Bond" colorVar="var(--color-bond)" />
          <StatBar value={stats.communication} label="Communication" colorVar="var(--color-comm)" />
          <StatBar value={stats.culture} label="Cultural Balance" colorVar="var(--color-balance)" />

          <div className="mt-auto p-5 border border-dashed border-[#d4af37]/30 rounded-lg text-center">
            <div className="text-[10px] uppercase text-[#d4af37] opacity-70 mb-2 tracking-wider">Memory Echoes</div>
            <div className="text-[24px] filter grayscale opacity-50 mb-2 leading-none">🐚</div>
            <p className="text-[11px] opacity-50 tracking-wide">
              No active echoes. Listen for ripples in the conversation.
            </p>
          </div>
        </aside>

      </main>
    </div>
  );
}
