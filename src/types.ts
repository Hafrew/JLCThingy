export type StatName = 'identity' | 'communication' | 'bond' | 'culture';

export interface BaseStats {
  identity: number; // 0-100
  communication: number; // 0-100
  bond: number; // 0-100
  culture: number; // 0-100
}

export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  visualSymbol: string;
  visualDescription: string;
  abilityName: string;
  abilityDesc: string;
  baseStats: BaseStats;
  tasks: string[];
  themeColor: string; // Hex or CSS color string used for character accents
}

export interface Choice {
  id: string;
  text: string;
  statChanges: Partial<BaseStats>;
  nextEventId?: string; // If undefined, proceeds to the next sequence event if any, or next world
  outcomeText: string;
  isMemoryUnlock?: boolean; // Whether taking this choice reveals a memory
  requiredAbility?: string; // Optional: Only available if this character ability matches
  requiredStats?: Partial<BaseStats>; // e.g., { identity: 60 } means requires at least 60
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  isMemoryEcho?: boolean; // Changes UI presentation to memory style
  isBossStage?: boolean;
  characterId: string; // Filter events by character, or 'all'
  worldId: string;
  choices: Choice[];
  imagePrompt?: string; // For generating image if we want to use placeholders/icons
}

export interface World {
  id: string;
  level: number;
  name: string;
  description: string;
  theme: string;
}

export interface GameState {
  currentCharacter: Character | null;
  currentWorldIndex: number;
  stats: BaseStats;
  eventHistory: string[]; // Event IDs completed
  currentEvent: GameEvent | null;
  isGameOver: boolean;
  gameOutcome?: 'win' | 'loss';
  unlockedMemories: number;
}
