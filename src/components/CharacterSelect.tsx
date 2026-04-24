import { CSSProperties } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CHARACTERS } from '../gameData';
import { Character } from '../types';

interface CharacterSelectProps {
  onSelect: (character: Character) => void;
}

export default function CharacterSelect({ onSelect }: CharacterSelectProps) {
  return (
    <div className="relative z-10 min-h-screen px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="app-shell flex min-h-[calc(100vh-4rem)] flex-col justify-center gap-10 lg:gap-14">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end">
          <div className="space-y-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
              Narrative Survival Drama
            </p>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-5xl leading-none text-[#f7efe3] sm:text-6xl lg:text-7xl">
                Joy Luck Journey
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/72 sm:text-[21px]">
                Step into each daughter&rsquo;s story and navigate family pressure, cultural inheritance, and the cost of silence.
              </p>
            </div>
          </div>

          <div className="panel rounded-[24px] p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">Playable Arcs</p>
                <p className="mt-2 font-serif text-3xl text-[#d4af37]">{CHARACTERS.length}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">Story Worlds</p>
                <p className="mt-2 font-serif text-3xl text-[#d4af37]">5</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">Core Tension</p>
                <p className="mt-2 text-sm leading-6 text-white/70">Identity versus expectation.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-4">
          {CHARACTERS.map((character) => {
            const accentStyle = {
              '--accent-color': character.themeColor,
            } as CSSProperties;

            return (
              <button
                key={character.id}
                type="button"
                onClick={() => onSelect(character)}
                className="panel group relative flex h-full appearance-none flex-col overflow-hidden rounded-[24px] p-0 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 focus:outline-none"
                style={accentStyle}
              >
                <div className="h-1 w-full" style={{ background: character.themeColor }} />
                <div className="flex h-full flex-col p-6 sm:p-7">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border text-2xl font-serif"
                      style={{
                        color: character.themeColor,
                        borderColor: `${character.themeColor}80`,
                        background: `${character.themeColor}18`,
                        boxShadow: `0 0 24px ${character.themeColor}22`,
                      }}
                    >
                      {character.name[0]}
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/45">
                      {character.abilityName}
                    </div>
                  </div>

                  <div className="mb-5">
                    <h2 className="text-[29px] leading-none text-white sm:text-[32px]">{character.name}</h2>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.25em]" style={{ color: character.themeColor }}>
                      {character.role}
                    </p>
                  </div>

                  <p className="mb-6 text-[15px] leading-7 text-white/72">
                    {character.description}
                  </p>

                  <div className="mb-6 rounded-[18px] border border-white/10 bg-black/18 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm" style={{ color: character.themeColor }}>
                      <Sparkles size={14} />
                      <span className="font-medium">{character.abilityName}</span>
                    </div>
                    <p className="text-[13px] leading-6 text-white/60">{character.abilityDesc}</p>
                  </div>

                  <div className="space-y-2 border-t border-white/10 pt-5">
                    {character.tasks.map((task) => (
                      <p key={task} className="text-[12px] leading-6 text-white/56">
                        {task}
                      </p>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-white/45 transition-colors group-hover:text-white">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em]">Begin Story</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </button>
            );
          })}
        </section>
      </div>
    </div>
  );
}
