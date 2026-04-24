import { EVENTS, WORLDS } from './gameData';
import { BaseStats, Choice, GameEvent, GameState, StatName } from './types';

const WORLD_INDEX_BY_ID = Object.fromEntries(
  WORLDS.map((world, index) => [world.id, index]),
) as Record<string, number>;

const EVENTS_BY_CHARACTER = EVENTS.reduce<Record<string, GameEvent[]>>((acc, event) => {
  if (!acc[event.characterId]) {
    acc[event.characterId] = [];
  }

  acc[event.characterId].push(event);
  return acc;
}, {});

export function clampStat(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function getCharacterEvents(characterId: string) {
  return EVENTS_BY_CHARACTER[characterId] ?? [];
}

export function getInitialEvent(characterId: string) {
  return getCharacterEvents(characterId)[0] ?? null;
}

export function getWorldIndexForEvent(event: GameEvent | null) {
  if (!event) {
    return 0;
  }

  return WORLD_INDEX_BY_ID[event.worldId] ?? 0;
}

export function applyChoiceToStats(stats: BaseStats, choice: Choice): BaseStats {
  const nextStats = { ...stats };

  for (const [statName, delta] of Object.entries(choice.statChanges)) {
    const key = statName as StatName;
    nextStats[key] = clampStat(nextStats[key] + (delta ?? 0));
  }

  return nextStats;
}

export function getChoiceAvailability(choice: Choice, gameState: GameState) {
  if (choice.requiredAbility && choice.requiredAbility !== gameState.currentCharacter?.abilityName) {
    return { available: false, reason: `Requires ${choice.requiredAbility}` };
  }

  if (choice.requiredStats) {
    const missingStats: string[] = [];

    for (const [statName, threshold] of Object.entries(choice.requiredStats)) {
      const key = statName as StatName;
      if (gameState.stats[key] < (threshold ?? 0)) {
        missingStats.push(`${formatStatName(key)} ${threshold}+`);
      }
    }

    if (missingStats.length > 0) {
      return { available: false, reason: `Requires ${missingStats.join(' and ')}` };
    }
  }

  return { available: true as const };
}

export function formatChoiceRequirements(choice: Choice) {
  const requirements: string[] = [];

  if (choice.requiredAbility) {
    requirements.push(choice.requiredAbility);
  }

  if (choice.requiredStats) {
    requirements.push(
      ...Object.entries(choice.requiredStats).map(([statName, threshold]) => (
        `${formatStatName(statName as StatName)} ${threshold}+`
      )),
    );
  }

  return requirements;
}

export function getNextEvent(gameState: GameState, choice: Choice) {
  if (!gameState.currentEvent || !gameState.currentCharacter) {
    return null;
  }

  if (choice.nextEventId) {
    return EVENTS.find((event) => event.id === choice.nextEventId) ?? null;
  }

  const characterEvents = getCharacterEvents(gameState.currentCharacter.id);
  const currentIndex = characterEvents.findIndex((event) => event.id === gameState.currentEvent?.id);

  if (currentIndex === -1 || currentIndex === characterEvents.length - 1) {
    return null;
  }

  return characterEvents[currentIndex + 1];
}

export function getEndingSummary(gameState: GameState) {
  const { currentCharacter, stats, gameOutcome } = gameState;

  if (gameOutcome === 'loss') {
    if (stats.bond <= 0) {
      return 'The bond gave way under the strain. Love stayed present, but trust and connection did not survive the silence around it.';
    }

    return 'The self was pressed flat by fear, pressure, or surrender. Without enough identity to stand on, the story collapses inward.';
  }

  if (!currentCharacter) {
    return 'A story ended, but its meaning stayed unfinished.';
  }

  const strongestStat = Object.entries(stats).sort((a, b) => b[1] - a[1])[0]?.[0] as StatName | undefined;

  const characterSpecificSummaries: Record<string, Partial<Record<StatName, string>>> = {
    june: {
      bond: 'You meet your mother again through the family she could not keep, and the reunion finally turns inheritance into understanding.',
      culture: 'You cross into your mother\'s history without losing yourself, letting culture become a bridge instead of a burden.',
      identity: 'You stop measuring yourself against an impossible daughter and become someone capable of carrying memory in your own voice.',
      communication: 'What was once left unsaid begins to move through you clearly enough to reach the family waiting on the other side.',
    },
    waverly: {
      bond: 'Competition loosens its grip, making room for a bond that is no longer built on display, approval, or defense.',
      culture: 'You learn to translate love across generations without flattening either side into caricature.',
      identity: 'Your confidence stops performing and starts grounding you, turning strategy into self-possession rather than armor.',
      communication: 'Instead of anticipating attacks, you finally name what you want and let honesty do what calculation never could.',
    },
    lena: {
      bond: 'Connection becomes possible again once it is no longer purchased by your silence.',
      culture: 'Inherited warnings become wisdom instead of paralysis, helping you read a room without disappearing inside it.',
      identity: 'You stop mistaking passivity for peace and begin living from a center that can actually hold your weight.',
      communication: 'Speaking the imbalance out loud changes the story because you are finally present inside your own sentences.',
    },
    rose: {
      bond: 'You discover that staying connected does not require becoming invisible, and love grows more honest because of it.',
      culture: 'Your mother\'s fierce faith becomes a resource instead of an irritation, helping you remain rooted when life shifts under you.',
      identity: 'You reclaim the authority to choose, and that single act reorganizes the rest of the story around your own voice.',
      communication: 'The words you once delayed become the very thing that keeps your life from being decided by someone else.',
    },
  };

  return characterSpecificSummaries[currentCharacter.id]?.[strongestStat ?? 'identity']
    ?? 'You found a way to keep love, memory, and selfhood in the same room long enough for understanding to take hold.';
}

function formatStatName(statName: StatName) {
  switch (statName) {
    case 'identity':
      return 'Identity';
    case 'communication':
      return 'Communication';
    case 'bond':
      return 'Bond';
    case 'culture':
      return 'Culture';
    default:
      return statName;
  }
}
