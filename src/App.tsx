import React, { useState } from 'react';
import { GameState, Character, Choice, GameEvent } from './types';
import { EVENTS } from './gameData';
import CharacterSelect from './components/CharacterSelect';
import GameUI from './components/GameUI';
import OutcomeScreen from './components/OutcomeScreen';

const MAX_STAT = 100;
const INITIAL_STATE: GameState = {
  currentCharacter: null,
  currentWorldIndex: 0,
  stats: { identity: 50, communication: 50, bond: 50, culture: 50 },
  eventHistory: [],
  currentEvent: null,
  isGameOver: false,
  unlockedMemories: 0
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [lastChoice, setLastChoice] = useState<Choice | null>(null);

  const handleCharacterSelect = (character: Character) => {
    // Find first event for this character
    const charEvents = EVENTS.filter(e => e.characterId === character.id);
    const firstEvent = charEvents[0] || null;

    setGameState({
      ...INITIAL_STATE,
      currentCharacter: character,
      stats: { ...character.baseStats },
      currentEvent: firstEvent
    });
  };

  const handleChoiceMade = (choice: Choice) => {
    // Apply stat changes
    const newStats = { ...gameState.stats };
    let bondCollapse = false;
    let identityCollapse = false;

    if (choice.statChanges) {
      Object.keys(choice.statChanges).forEach((key) => {
        const statKey = key as keyof typeof newStats;
        newStats[statKey] = Math.max(0, Math.min(MAX_STAT, newStats[statKey] + (choice.statChanges[statKey] || 0)));
      });
    }

    // Check Loss conditions
    if (newStats.bond <= 0) bondCollapse = true;
    if (newStats.identity <= 0) identityCollapse = true; // extreme stat imbalance loss

    const isGameOver = bondCollapse || identityCollapse || (!choice.nextEventId && getNextSequenceEvent(gameState, choice) === null);
    
    setGameState(prev => ({
      ...prev,
      stats: newStats,
      isGameOver,
      gameOutcome: isGameOver ? (bondCollapse || identityCollapse ? 'loss' : 'win') : undefined,
      eventHistory: prev.currentEvent ? [...prev.eventHistory, prev.currentEvent.id] : prev.eventHistory
    }));
    
    setLastChoice(choice);
  };

  const getNextSequenceEvent = (state: GameState, currentChoice: Choice): GameEvent | null => {
    if (!state.currentEvent) return null;
    if (currentChoice.nextEventId) {
      return EVENTS.find(e => e.id === currentChoice.nextEventId) || null;
    }
    
    // Find the next unplayed event for this character in the current world
    const charEvents = EVENTS.filter(e => e.characterId === state.currentCharacter?.id);
    const currentIndex = charEvents.findIndex(e => e.id === state.currentEvent?.id);
    
    if (currentIndex !== -1 && currentIndex < charEvents.length - 1) {
       return charEvents[currentIndex + 1];
    }
    
    return null;
  };

  const handleContinue = () => {
    if (!lastChoice) return;
    
    const nextEvent = getNextSequenceEvent(gameState, lastChoice);
    
    if (nextEvent) {
       // Check if world index needs updating based on nextEvent.worldId
       const worldIndexes: Record<string, number> = { 'w1':0, 'w2':1, 'w3':2, 'w4':3, 'w5':4 };
       const newWorldIdx = worldIndexes[nextEvent.worldId] ?? gameState.currentWorldIndex;

       setGameState(prev => ({
         ...prev,
         currentEvent: nextEvent,
         currentWorldIndex: newWorldIdx
       }));
       setLastChoice(null);
    } else {
       // Game win!
       setGameState(prev => ({
         ...prev,
         isGameOver: true,
         gameOutcome: 'win'
       }));
    }
  };

  const handleRestart = () => {
    setGameState(INITIAL_STATE);
    setLastChoice(null);
  };

  if (!gameState.currentCharacter) {
    return <CharacterSelect onSelect={handleCharacterSelect} />;
  }

  if (lastChoice || gameState.isGameOver) {
    // If it's a game over and we don't have a last choice to show the outcome of
    // or we do have a choice outcome to show.
    // If we have a choice, show outcome then wait for 'Continue'.
    // If it's game over directly from the choice, OutcomeScreen handles it.
    
    // For intermediate turn outcomes
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
