import { motion } from 'motion/react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { getEndingSummary } from '../gameLogic';
import { Choice, GameState } from '../types';

interface OutcomeScreenProps {
  choice: Choice | null;
  gameState: GameState;
  onContinue: () => void;
  onRestart: () => void;
}

export default function OutcomeScreen({ choice, gameState, onContinue, onRestart }: OutcomeScreenProps) {
  const { isGameOver, gameOutcome, stats, currentCharacter } = gameState;

  if (!choice && isGameOver) {
    return (
      <div className="relative z-10 min-h-screen px-4 py-8 text-white sm:px-6">
        <div className="app-shell flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="panel w-full max-w-3xl rounded-[30px] p-8 text-center sm:p-12"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37]">
              {currentCharacter?.name}
            </p>
            <h1 className="mt-5 text-5xl leading-none text-[#f8efe0] sm:text-6xl">
              {gameOutcome === 'win' ? 'Understanding Found' : 'Connection Lost'}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[20px] leading-8 text-white/78">
              {getEndingSummary(gameState)}
            </p>

            <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Identity</p>
                <p className="mt-3 font-serif text-4xl text-[#a78bfa]">{stats.identity}%</p>
              </div>
              <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Bond</p>
                <p className="mt-3 font-serif text-4xl text-[#fb7185]">{stats.bond}%</p>
              </div>
              <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Voice</p>
                <p className="mt-3 font-serif text-4xl text-[#34d399]">{stats.communication}%</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onRestart}
              className="mt-10 inline-flex appearance-none items-center gap-2 rounded-full border border-[#d4af37] bg-[#d4af37]/10 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f7d97a] transition-colors hover:bg-[#d4af37] hover:text-[#140d0b]"
            >
              <RotateCcw size={16} />
              Play Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (choice) {
    return (
      <div className="relative z-10 min-h-screen px-4 py-8 text-white sm:px-6">
        <div className="app-shell flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="panel w-full max-w-2xl rounded-[28px] p-8 text-center sm:p-10"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37]">Story Consequence</p>
            <p className="mt-6 text-[21px] leading-8 text-white/82">
              {choice.outcomeText}
            </p>

            <button
              type="button"
              onClick={onContinue}
              className="mt-10 inline-flex appearance-none items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75 transition-colors hover:border-[#d4af37]/55 hover:bg-[#d4af37]/10 hover:text-white"
            >
              {isGameOver ? 'See Results' : 'Continue'}
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
