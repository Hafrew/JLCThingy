import { Character, GameEvent, World } from './types';

export const CHARACTERS: Character[] = [
  {
    id: 'june',
    name: 'Jing-Mei "June" Woo',
    role: 'The bridge between generations',
    description: 'Tasked with taking her late mother\'s place at the Mahjong table and traveling to China to meet her long-lost half-sisters.',
    abilityName: 'Inherited Memory',
    abilityDesc: 'Unlocks deeper understanding in key moments, giving access to hidden dialogue choices.',
    baseStats: { identity: 50, communication: 30, bond: 50, culture: 30 },
    themeColor: 'bg-jade',
    tasks: ['Represent her mother in the Joy Luck Club', 'Understand her mother\'s sacrifices', 'Travel to China and meet her half-sisters']
  },
  {
    id: 'waverly',
    name: 'Waverly Jong',
    role: 'The strategist',
    description: 'A former child chess prodigy whose success strained her relationship with her proud, controlling mother.',
    abilityName: 'Strategic Mind',
    abilityDesc: 'Can predict consequences of choices before making them.',
    baseStats: { identity: 80, communication: 50, bond: 30, culture: 50 },
    themeColor: 'bg-clay',
    tasks: ['Navigate relationship with controlling mother', 'Balance pride vs vulnerability', 'Introduce her fiancé to her family']
  },
  {
    id: 'lena',
    name: 'Lena St. Clair',
    role: 'The observer',
    description: 'Passive and fearful of conflict, she is stuck in an imbalanced marriage where everything is split exactly down the middle, except power.',
    abilityName: 'Emotional Insight',
    abilityDesc: 'Detect hidden tensions before they escalate.',
    baseStats: { identity: 30, communication: 30, bond: 50, culture: 30 },
    themeColor: 'bg-memory',
    tasks: ['Recognize imbalance in her marriage', 'Break cycles of passivity', 'Learn to assert herself']
  },
  {
    id: 'rose',
    name: 'Rose Hsu Jordan',
    role: 'The conflicted heart',
    description: 'Overwhelmed by decisions, she relies on her mother\'s advice or simply yields, especially as she faces an impending divorce.',
    abilityName: 'Inner Voice',
    abilityDesc: 'Can override fear-based decisions once per level to take a bold stance.',
    baseStats: { identity: 30, communication: 50, bond: 80, culture: 30 },
    themeColor: 'bg-gold',
    tasks: ['Navigate divorce', 'Develop independence', 'Stand up for herself']
  }
];

export const WORLDS: World[] = [
  { id: 'w1', level: 1, name: 'Childhood Roots', description: 'Early family dynamics and lessons.', theme: 'A soft, nostalgic glow.' },
  { id: 'w2', level: 2, name: 'Cultural Divide', description: 'Identity vs assimilation challenges.', theme: 'A stark, contrasting light.' },
  { id: 'w3', level: 3, name: 'Fracture Points', description: 'Major conflicts and high-risk decision-making.', theme: 'Intense and focused shadows.' },
  { id: 'w4', level: 4, name: 'Reflection & Truth', description: 'Memory Echoes intensify. Reinterpreting the past.', theme: 'Dreamlike and faded.' },
  { id: 'w5', level: 5, name: 'Joy Luck Reunion', description: 'All choices converge. Final consequences.', theme: 'Warm, encompassing light.' }
];

// We will construct a small narrative sample for June to demonstrate the game loop.
export const EVENTS: GameEvent[] = [
  // --- JUNE EVENTS ---
  // World 1
  {
    id: 'june_w1_1',
    characterId: 'june',
    worldId: 'w1',
    title: 'The Piano Journey',
    description: 'Your mother trades housecleaning services for a used piano and lessons. She expects you to be a prodigy, like the girls on The Ed Sullivan Show. You are sitting at the piano bench, staring at the keys. Your mother watches expectantly.',
    choices: [
      { id: 'c1', text: 'Try your hardest to play perfectly.', statChanges: { bond: 10, identity: -10 }, outcomeText: 'You play mechanically. Your mother claps out of rhythm, proud of the effort, but you feel hollow inside.' },
      { id: 'c2', text: 'Deliberately play the wrong notes.', statChanges: { identity: 10, bond: -15, communication: -5 }, outcomeText: 'You mash the keys. Your mother\'s face falls in disappointment. "Why you not try?" she asks. You feel a surge of defiant independence.' },
      { id: 'c3', text: 'Ask her why she wants you to play.', statChanges: { communication: 15, bond: 5 }, outcomeText: '"I just want you be best you can," she says softly. For a moment, the pressure lifts slightly.' }
    ]
  },
  {
    id: 'june_w1_2',
    characterId: 'june',
    worldId: 'w1',
    title: 'The Recital',
    description: 'The talent show arrives. You perform "Pleading Child." You haven\'t practiced properly, relying on the belief that you are naturally gifted. You strike the first wrong note. Then another.',
    choices: [
      { id: 'c1', text: 'Stop playing and run off stage.', statChanges: { identity: -15, bond: -10 }, outcomeText: 'The silence in the hall is deafening. Your mother looks away in shame. The defeat is absolute.' },
      { id: 'c2', text: 'Keep playing through the mistakes.', statChanges: { identity: 5, culture: 5 }, outcomeText: 'You finish the piece, a discordant mess. Later, your mother says nothing, a silence louder than yelling. But you didn\'t quit.' }
    ]
  },
  // World 2
  {
    id: 'june_w2_1',
    characterId: 'june',
    worldId: 'w2',
    title: 'A Crab Dinner',
    description: 'It\'s Chinese New Year. Your mother has prepared a feast, including fresh Dungeness crabs. She places the worst, broken crab on her own plate, offering you the best one. Waverly makes a subtle dig about your career.',
    choices: [
      { id: 'c1', text: 'Defend yourself aggressively against Waverly.', statChanges: { identity: 10, bond: -10, communication: -10 }, outcomeText: 'You snap at Waverly. Your mother sighs, embarrassed by the outburst at the table. The tension ruins the meal.' },
      { id: 'c2', text: 'Stay silent and eat the crab.', statChanges: { identity: -10, culture: 10 }, outcomeText: 'You swallow your pride. Your mother notices and later whispers, "You have good heart, Jing-Mei, like me." You feel a strange sense of loss and connection.' },
      { id: 'c3', text: 'Compliment your mother\'s cooking instead to redirect.', statChanges: { communication: 15, bond: 10, culture: 5 }, requiredAbility: 'Inherited Memory', isMemoryUnlock: true, outcomeText: 'You shift the focus. Your mother smiles, her eyes flashing back to a feast in Kweilin long ago. She appreciates your grace.' }
    ]
  },
  // World 3
  {
    id: 'june_w3_1',
    characterId: 'june',
    worldId: 'w3',
    title: 'Taking Her Place',
    description: 'Your mother has passed away. You are invited to take her seat at the Joy Luck Club. The aunties are murmuring, placing stacks of mahjong tiles. They hand you an envelope of money to go to China to meet your half-sisters.',
    choices: [
      { id: 'c1', text: '"I don\'t know anything about them. What will I say?"', statChanges: { communication: -10, identity: -10 }, outcomeText: 'The aunties look shocked. "How can you not know your own mother?" they ask in horror. The doubt paralyzes you.' },
      { id: 'c2', text: 'Accept the money and promise to tell them her story.', statChanges: { bond: 15, culture: 15, identity: 10 }, outcomeText: 'They nod solemnly. You realize you know more about her than you thought. The pieces of her life are within you.' }
    ]
  },
  // World 4
  {
    id: 'june_w4_1',
    characterId: 'june',
    worldId: 'w4',
    title: 'Memory Echo: Kweilin',
    isMemoryEcho: true,
    description: 'A sudden memory washes over you. Your mother\'s voice: "I lost my family, my home, everything in Kweilin. But I kept hoping." You finally understand the weight of her expectations.',
    choices: [
      { id: 'c1', text: 'Let the grief finally wash over you.', statChanges: { bond: 20, identity: 15 }, outcomeText: 'The resentment you held for years dissolves into profound sadness and understanding.' },
      { id: 'c2', text: 'Push the painful memory away.', statChanges: { bond: -15, identity: -10 }, outcomeText: 'It\'s too much. You close yourself off, but the hollowness inside grows larger.' }
    ]
  },
  // World 5
  {
    id: 'june_w5_1',
    characterId: 'june',
    worldId: 'w5',
    title: 'Arrival in Shanghai',
    description: 'You get off the plane. A crowd of faces presses against the barriers. You are looking for two faces that look like your mother\'s. Suddenly, you see them.',
    choices: [
      { id: 'c1', text: 'Embrace them, crying: "Mama, Mama!"', statChanges: { culture: 20, bond: 20, identity: 20 }, outcomeText: 'You hold them. Together, the three of you look exactly like her. The fragmentation is healed.' },
      { id: 'c2', text: 'Approach formally, unsure what to do.', statChanges: { communication: -10, culture: 5 }, outcomeText: 'The moment is stiff. The language barrier is thick, but there is still a quiet acknowledgement of shared blood.' }
    ]
  }
  
  // (Other characters would have their events defined here similarly)
];
