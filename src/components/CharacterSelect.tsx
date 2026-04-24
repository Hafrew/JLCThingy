import React, { useState } from 'react';
import { GameState, Character, GameEvent, Choice } from '../types';
import { CHARACTERS, WORLDS, EVENTS } from '../gameData';
import { ArrowRight, BookOpen, Heart, User, MessagesSquare, Globe, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CharacterSelect({ 
  onSelect 
}: { 
  onSelect: (character: Character) => void 
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 relative z-10 font-serif">
      <div className="absolute top-8 left-0 w-full text-center">
         <h2 className="text-[12px] uppercase tracking-[2px] text-[#d4af37] font-bold mb-1">A Narrative Survival Game</h2>
      </div>

      <div className="max-w-5xl w-full z-10 text-center">
        <h1 className="text-5xl sm:text-[60px] mb-4 font-normal text-[#d4af37]">Joy Luck Journey</h1>
        <p className="max-w-2xl mx-auto text-[20px] text-white/80 font-serif italic mb-12 sm:mb-20">
          Navigate a journey of identity, culture, and self-understanding. Choose whose story to walk.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
          {CHARACTERS.map((char) => (
            <div 
              key={char.id}
              onClick={() => onSelect(char)}
              className="group cursor-pointer bg-[var(--color-glass)] border border-white/10 rounded-[12px] p-[30px] backdrop-blur-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="w-[80px] h-[80px] mx-auto mb-[20px] border-2 border-[#d4af37] rounded-full p-[3px] bg-gradient-to-tr from-[#d4af37] to-transparent flex shrink-0">
                 <div className="w-full h-full rounded-full bg-[#2a1a15] flex items-center justify-center text-[28px] text-[#d4af37] font-serif">
                   {char.name[0]}
                 </div>
              </div>
              
              <h3 className="text-[20px] font-serif text-white font-bold mb-2 text-center">{char.name}</h3>
              <p className="text-[10px] text-[#d4af37] uppercase tracking-[1.5px] mb-4 text-center">{char.role}</p>
              
              <p className="text-white/70 text-[14px] mb-6 flex-grow leading-[1.6]">
                {char.description}
              </p>

              <div className="border-t border-white/10 pt-4 mt-auto mb-6">
                <p className="text-[12px] font-serif italic text-[#d4af37] mb-2 flex items-center gap-1.5">
                  <Sparkles size={12} /> {char.abilityName}
                </p>
                <p className="text-[11px] text-white/50 leading-tight">
                  {char.abilityDesc}
                </p>
              </div>

              <div className="flex items-center justify-between text-white/40 group-hover:text-[#d4af37] transition-colors border-t border-white/10 pt-4">
                <span className="text-[11px] uppercase tracking-[1px] font-bold">Play Story</span>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
