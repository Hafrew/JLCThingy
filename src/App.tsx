import { useState } from 'react';
import CharacterSelect from './components/CharacterSelect';
import GameUI from './components/GameUI';
import OutcomeScreen from './components/OutcomeScreen';
import {
  applyChoiceToStats,
  getChoiceAvailability,
  getInitialEvent,
  getNextEvent,
  getWorldIndexForEvent,
} from './gameLogic';
import { Character, Choice, GameState } from './types';

const INITIAL_STATE: GameState = {
  currentCharacter: null,
  currentWorldIndex: 0,
  stats: { identity: 50, communication: 50, bond: 50, culture: 50 },
  eventHistory: [],
  currentEvent: null,
  isGameOver: false,
  unlockedMemories: 0,
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [lastChoice, setLastChoice] = useState<Choice | null>(null);

  const handleCharacterSelect = (character: Character) => {
    const firstEvent = getInitialEvent(character.id);

    setGameState({
      ...INITIAL_STATE,
      currentCharacter: character,
      stats: { ...character.baseStats },
      currentEvent: firstEvent,
      currentWorldIndex: getWorldIndexForEvent(firstEvent),
    });
  };

  const handleChoiceMade = (choice: Choice) => {
    if (!getChoiceAvailability(choice, gameState).available) {
      return;
    }

    const nextStats = applyChoiceToStats(gameState.stats, choice);
    const nextEvent = getNextEvent(gameState, choice);
    const hasLoss = nextStats.bond <= 0 || nextStats.identity <= 0;
    const isGameOver = hasLoss || nextEvent === null;

    setGameState((prev) => ({
      ...prev,
      stats: nextStats,
      isGameOver,
      gameOutcome: isGameOver ? (hasLoss ? 'loss' : 'win') : undefined,
      eventHistory: prev.currentEvent ? [...prev.eventHistory, prev.currentEvent.id] : prev.eventHistory,
      unlockedMemories: prev.unlockedMemories + (choice.isMemoryUnlock ? 1 : 0),
    }));

    setLastChoice(choice);
  };

  const handleContinue = () => {
    if (!lastChoice) {
      return;
    }

    const nextEvent = getNextEvent(gameState, lastChoice);

    if (nextEvent) {
      setGameState((prev) => ({
        ...prev,
        currentEvent: nextEvent,
        currentWorldIndex: getWorldIndexForEvent(nextEvent),
      }));
      setLastChoice(null);
      return;
    }

    setGameState((prev) => ({
      ...prev,
      isGameOver: true,
      gameOutcome: prev.gameOutcome ?? 'win',
    }));
    setLastChoice(null);
  };

  const handleRestart = () => {
    setGameState(INITIAL_STATE);
    setLastChoice(null);
  };

  if (!gameState.currentCharacter) {
    return <CharacterSelect onSelect={handleCharacterSelect} />;
  }

  if (lastChoice || gameState.isGameOver) {
    return (
      <OutcomeScreen
        choice={lastChoice}
        gameState={gameState}
        onContinue={handleContinue}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <GameUI
      gameState={gameState}
      onChoiceMade={handleChoiceMade}
      onQuit={handleRestart}
    />
  );
}
