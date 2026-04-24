import React, { useState } from 'react';
import { GameState, Choice } from '../types';
import { motion } from 'motion/react';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface OutcomeScreenProps {
  choice: Choice | null;
  gameState: GameState;
  onContinue: () => void;
  onRestart: () => void;
}

export default function OutcomeScreen({ choice, gameState, onContinue, onRestart }: OutcomeScreenProps) {
  const { isGameOver, gameOutcome, stats } = gameState;
  
  if (!choice && isGameOver) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--color-bg)] relative z-10 text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl text-center space-y-8 bg-[var(--color-glass)] p-12 border border-[#d4af37]/20 rounded-[12px] backdrop-blur-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <h1 className="font-serif text-4xl md:text-6xl font-normal text-[#d4af37]">
            {gameOutcome === 'win' ? 'Understanding Found' : 'Connection Lost'}
          </h1>
          <p className="font-serif italic text-xl text-white/80">
            {gameOutcome === 'win' 
              ? "You balanced your identity while honoring the past. The bridge between generations is built." 
              : "The weight of expectations and miscommunication fractured the bond beyond repair."}
          </p>
          
          <div className="flex justify-center gap-10 pt-8 border-t border-white/10">
             <div className="text-center">
                <span className="block text-[11px] uppercase tracking-[1px] text-white/50 mb-2">Final Identity</span>
                <span className="font-serif text-3xl text-[#a78bfa]">{stats.identity}%</span>
             </div>
             <div className="text-center">
                <span className="block text-[11px] uppercase tracking-[1px] text-white/50 mb-2">Final Bond</span>
                <span className="font-serif text-3xl text-[#fb7185]">{stats.bond}%</span>
             </div>
          </div>

          <button 
            onClick={onRestart}
            className="mt-8 bg-[#d4af37]/10 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#140d0b] transition-all rounded-[6px] px-[30px] py-[16px] uppercase tracking-[1.5px] text-[12px] font-bold inline-flex items-center gap-2"
          >
            <RotateCcw size={16} /> Play Again
          </button>
        </motion.div>
      </div>
    );
  }

  // Normal turn outcome
  if (choice) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--color-bg)] relative z-10 text-[var(--color-ink)]">
         <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl bg-[var(--color-glass)] border border-white/10 rounded-[12px] p-[40px] backdrop-blur-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center relative z-20"
          >
            <p className="font-serif text-[20px] leading-[1.6] text-white mb-8">
              {choice.outcomeText}
            </p>
            
            <button 
              onClick={onContinue}
              className="mt-4 bg-white/[0.03] border border-white/10 hover:bg-[#d4af37]/10 hover:border-[#d4af37] hover:text-white text-white/80 transition-all rounded-[6px] px-[20px] py-[14px] uppercase tracking-[1.5px] text-[12px] font-bold inline-flex items-center gap-2"
            >
              {isGameOver ? 'See Results' : 'Continue'} <ArrowRight size={16} />
            </button>
          </motion.div>
      </div>
    );
  }

  return null;
}
