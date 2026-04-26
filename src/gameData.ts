import { Character, GameEvent, World } from './types';

export const CHARACTERS: Character[] = [
  {
    id: 'june',
    name: 'Jing-Mei "June" Woo',
    role: 'The bridge between generations',
    description: 'Tasked with taking her late mother\'s place at the mahjong table and traveling to China to meet her long-lost half-sisters.',
    visualSymbol: 'Piano + Thread',
    visualDescription: 'A gold-lit portrait framed by piano keys, a mahjong tile, and a red thread leading toward China.',
    abilityName: 'Inherited Memory',
    abilityDesc: 'Unlocks deeper understanding in key moments, giving access to hidden dialogue choices.',
    baseStats: { identity: 50, communication: 30, bond: 50, culture: 30 },
    themeColor: '#d4af37',
    tasks: [
      'Represent her mother in the Joy Luck Club',
      'Understand her mother\'s sacrifices',
      'Travel to China and meet her half-sisters',
    ],
  },
  {
    id: 'waverly',
    name: 'Waverly Jong',
    role: 'The strategist',
    description: 'A former child chess prodigy whose success strained her relationship with her proud, exacting mother.',
    visualSymbol: 'Knight + Lantern',
    visualDescription: 'A sharp chessboard silhouette with Chinatown market lanterns behind it, showing strategy and public pressure.',
    abilityName: 'Strategic Mind',
    abilityDesc: 'Can read hidden incentives and foresee the emotional cost of a move before committing.',
    baseStats: { identity: 80, communication: 50, bond: 30, culture: 50 },
    themeColor: '#c9774f',
    tasks: [
      'Navigate life under her mother\'s scrutiny',
      'Balance pride with vulnerability',
      'Bring her fiance into the family without turning love into a contest',
    ],
  },
  {
    id: 'lena',
    name: 'Lena St. Clair',
    role: 'The observer',
    description: 'Passive and fearful of conflict, she lives inside careful silences that have turned her marriage into an unequal ledger.',
    visualSymbol: 'Table + Ledger',
    visualDescription: 'An uneven table beneath a split household ledger, representing imbalance disguised as fairness.',
    abilityName: 'Emotional Insight',
    abilityDesc: 'Detects hidden tensions before they harden into permanent damage.',
    baseStats: { identity: 30, communication: 30, bond: 50, culture: 30 },
    themeColor: '#8ca6c8',
    tasks: [
      'Recognize the imbalance in her marriage',
      'Break inherited habits of passivity',
      'Learn to speak before resentment chooses for her',
    ],
  },
  {
    id: 'rose',
    name: 'Rose Hsu Jordan',
    role: 'The conflicted heart',
    description: 'Overwhelmed by choices, she yields to stronger voices until divorce forces her to decide whether she still has one of her own.',
    visualSymbol: 'Roots + Papers',
    visualDescription: 'Hardy weeds growing around divorce papers, showing a voice that survives pressure and grief.',
    abilityName: 'Inner Voice',
    abilityDesc: 'Can cut through fear and take a bold stance when silence would cost too much.',
    baseStats: { identity: 30, communication: 50, bond: 80, culture: 30 },
    themeColor: '#e0a84f',
    tasks: [
      'Face the unraveling of her marriage',
      'Separate love from surrender',
      'Claim the authority to decide her own life',
    ],
  },
];

export const WORLDS: World[] = [
  { id: 'w1', level: 1, name: 'Childhood Roots', description: 'Early family dynamics and lessons.', theme: 'A soft, nostalgic glow.' },
  { id: 'w2', level: 2, name: 'Cultural Divide', description: 'Identity versus assimilation challenges.', theme: 'A stark, contrasting light.' },
  { id: 'w3', level: 3, name: 'Fracture Points', description: 'Major conflicts and high-risk decision-making.', theme: 'Intense and focused shadows.' },
  { id: 'w4', level: 4, name: 'Reflection & Truth', description: 'Memory Echoes intensify. Reinterpreting the past.', theme: 'Dreamlike and faded.' },
  { id: 'w5', level: 5, name: 'Joy Luck Reunion', description: 'All choices converge. Final consequences.', theme: 'Warm, encompassing light.' },
  { id: 'w6', level: 6, name: 'Final Reckoning', description: 'A final boss encounter where only hard-won balance can carry you through.', theme: 'The story demands proof of who you have become.' },
];

export const HOW_TO_PLAY = [
  'Choose one of the four daughters from The Joy Luck Club.',
  'Read each story scene and pick the response that best balances identity, communication, family bond, and cultural balance.',
  'Use character powers when they appear; some choices unlock memory threads or require high enough stats.',
  'Advance through each world until the Final Reckoning boss stage.',
];

export const OBJECTIVE = 'The object of the game is to guide a daughter through family conflict, cultural misunderstanding, and inherited memory without losing her sense of self or her family connection.';

export const WIN_CONDITION = 'To win, reach the final boss and choose the stat-gated response. You need strong enough Identity, Communication, Family Bond, and Cultural Balance to resolve the character arc instead of collapsing into silence, surrender, or conflict.';

export const PROGRESS_SYSTEM = [
  'World 1: Childhood Roots introduces the wound or lesson that shapes the character.',
  'World 2: Cultural Divide tests how Chinese family expectations and American independence collide.',
  'World 3: Fracture Points presents a major conflict where weak stats can block the healthiest response.',
  'World 4: Reflection & Truth uses Memory Echo scenes to reinterpret the past.',
  'World 5: Joy Luck Reunion asks the player to act from what they have learned.',
  'World 6: Final Reckoning is the boss stage that measures whether the player built enough emotional balance to win.',
];

export const RUBRIC_OBSTACLES = [
  {
    title: 'Prodigy Pressure',
    plotTie: 'June\'s piano lessons and recital conflict with Suyuan\'s dream of an exceptional daughter.',
    challenge: 'Players must choose between obedience, rebellion, and honest communication while protecting both Identity and Family Bond.',
  },
  {
    title: 'Dinner Table Translation',
    plotTie: 'Waverly bringing Rich to dinner exposes cultural expectations he does not understand and criticism she fears from Lindo.',
    challenge: 'Players must translate between cultures instead of turning the meal into embarrassment or a mother-daughter contest.',
  },
  {
    title: 'The Marriage Ledger',
    plotTie: 'Lena and Harold\'s split-expense marriage shows how a supposedly fair American arrangement can hide emotional inequality.',
    challenge: 'Players must name the imbalance before politeness and passivity drain Identity and Communication.',
  },
  {
    title: 'Divorce Papers',
    plotTie: 'Rose faces Ted\'s expectation that she will quietly sign away the house and the marriage on his terms.',
    challenge: 'Players must claim a voice and make a decision instead of letting fear or old guilt choose for her.',
  },
];

const JUNE_EVENTS: GameEvent[] = [
  {
    id: 'june_w1_1',
    characterId: 'june',
    worldId: 'w1',
    title: 'The Piano Journey',
    description: 'Your mother trades housecleaning services for a used piano and lessons. She expects you to be a prodigy, like the girls on television. You sit at the bench with her hope pressing on your shoulders.',
    choices: [
      { id: 'june_w1_c1', text: 'Try your hardest to play perfectly.', statChanges: { bond: 10, identity: -10 }, outcomeText: 'You play mechanically. Your mother claps proudly, but you feel yourself shrinking inside her dream.' },
      { id: 'june_w1_c2', text: 'Deliberately play the wrong notes.', statChanges: { identity: 10, bond: -15, communication: -5 }, outcomeText: 'You force chaos out of the keys. Her disappointment stings, but it also feels like proof that your life belongs to you.' },
      { id: 'june_w1_c3', text: 'Ask why it matters so much to her.', statChanges: { communication: 15, bond: 5 }, outcomeText: '"I want you to know your worth," she says. For a moment the pressure becomes love instead of command.' },
    ],
  },
  {
    id: 'june_w2_1',
    characterId: 'june',
    worldId: 'w2',
    title: 'A Crab Dinner',
    description: 'At Chinese New Year dinner, your mother quietly gives herself the broken crab and leaves the best one for you. Waverly makes a pointed remark about your career while everyone pretends not to notice.',
    choices: [
      { id: 'june_w2_c1', text: 'Defend yourself sharply against Waverly.', statChanges: { identity: 10, bond: -10, communication: -10 }, outcomeText: 'You win the moment and lose the room. The silence afterward is heavier than the insult.' },
      { id: 'june_w2_c2', text: 'Stay quiet and accept the crab.', statChanges: { identity: -10, culture: 10 }, outcomeText: 'You swallow the insult with the meal. Your mother notices your restraint and mistakes it for agreement with her sacrifices.' },
      { id: 'june_w2_c3', text: 'Praise your mother\'s cooking and redirect the table.', statChanges: { communication: 15, bond: 10, culture: 5 }, requiredAbility: 'Inherited Memory', isMemoryUnlock: true, outcomeText: 'You move the conversation toward gratitude. Your mother\'s face softens as if an older feast has flickered back to life inside her.' },
    ],
  },
  {
    id: 'june_w3_1',
    characterId: 'june',
    worldId: 'w3',
    title: 'Taking Her Place',
    description: 'After your mother dies, the aunties ask you to sit in her place at the Joy Luck Club and carry a message to the half-sisters she left behind in China.',
    choices: [
      { id: 'june_w3_c1', text: '"I barely knew how to talk to her. What can I possibly tell them?"', statChanges: { communication: -10, identity: -10 }, outcomeText: 'The aunties recoil. Their shock makes your doubt feel like a betrayal you cannot undo.' },
      { id: 'june_w3_c2', text: 'Accept the money and promise to tell your mother\'s story.', statChanges: { bond: 15, culture: 15, identity: 10 }, outcomeText: 'The promise frightens you, but it also steadies you. Her life begins to feel less like a sealed room and more like an inheritance.' },
    ],
  },
  {
    id: 'june_w4_1',
    characterId: 'june',
    worldId: 'w4',
    title: 'Memory Echo: Kweilin',
    isMemoryEcho: true,
    description: 'Your mother\'s voice rises from memory: she fled Kweilin carrying twins, hope, and grief all at once. For the first time, the scale of what she survived enters your body instead of just your ears.',
    choices: [
      { id: 'june_w4_c1', text: 'Let the grief move through you.', statChanges: { bond: 20, identity: 15 }, outcomeText: 'Your resentment thins into sorrow and then into recognition. She was trying to hand you survival, not perfection.' },
      { id: 'june_w4_c2', text: 'Push the pain away before it settles.', statChanges: { bond: -15, identity: -10 }, outcomeText: 'You harden against the memory. It protects you for a moment, then leaves a colder emptiness behind.' },
    ],
  },
  {
    id: 'june_w5_1',
    characterId: 'june',
    worldId: 'w5',
    title: 'Arrival in Shanghai',
    description: 'At the airport you search the crowd for faces that might carry your mother back to you. Then two women step forward, and their features answer the question before language can.',
    choices: [
      { id: 'june_w5_c1', text: 'Embrace them and call out for your mother through them.', statChanges: { culture: 20, bond: 20, identity: 20 }, outcomeText: 'You hold each other and feel the family line rejoin across distance, war, and silence.' },
      { id: 'june_w5_c2', text: 'Approach carefully, clinging to formality.', statChanges: { communication: -10, culture: 5 }, outcomeText: 'The meeting is stiff at first. Even so, blood and grief begin doing their slow work beneath the awkwardness.' },
    ],
  },
  {
    id: 'june_w6_boss',
    characterId: 'june',
    worldId: 'w6',
    isBossStage: true,
    title: 'Final Boss: Suyuan\'s Story',
    description: 'At the reunion dinner, your sisters ask you to speak for your mother in full. This is the last trial: can you carry grief, culture, and identity together strongly enough to make her life visible?',
    choices: [
      {
        id: 'june_w6_c1',
        text: 'Tell Suyuan\'s story with love, memory, and your own voice intact.',
        statChanges: { bond: 10, identity: 10, culture: 10, communication: 10 },
        requiredStats: { bond: 70, identity: 65, culture: 65, communication: 45 },
        outcomeText: 'The room stills around your words. For the first time, you are not only your mother\'s daughter but also the keeper of her unfinished story.',
      },
      {
        id: 'june_w6_c2',
        text: 'Admit that the story is too heavy and let the silence swallow it.',
        statChanges: { bond: -100, identity: -100 },
        outcomeText: 'The silence feels safer than failure for one second. Then you realize what has been lost: not perfection, but the chance to finally answer her with your whole self.',
      },
    ],
  },
];

const WAVERLY_EVENTS: GameEvent[] = [
  {
    id: 'waverly_w1_1',
    characterId: 'waverly',
    worldId: 'w1',
    title: 'The Market Parade',
    description: 'You walk through Chinatown after another chess victory. Your mother stops every few steps to announce your brilliance to strangers, steering you like a prize she carved herself.',
    choices: [
      { id: 'waverly_w1_c1', text: 'Smile and let her celebrate you.', statChanges: { bond: 10, identity: -10 }, outcomeText: 'Her pride glows so brightly that you disappear inside it. Everyone sees a champion, but no one asks how tired you are.' },
      { id: 'waverly_w1_c2', text: 'Snap that she should stop showing you off.', statChanges: { identity: 10, bond: -15, communication: -5 }, outcomeText: 'The words cut free before you can soften them. The hurt on her face follows you longer than the relief does.' },
      { id: 'waverly_w1_c3', text: 'Ask for a quieter celebration after the market.', statChanges: { communication: 15, bond: 5 }, outcomeText: 'She does not fully understand, but she hears enough to lower her voice. It is a small negotiation instead of a war.' },
    ],
  },
  {
    id: 'waverly_w2_1',
    characterId: 'waverly',
    worldId: 'w2',
    title: 'Dinner With Rich',
    description: 'You bring Rich home, already braced for your mother\'s judgments and his cheerful ignorance of the rules. At dinner he praises the food too loudly, reaches across dishes, and laughs where restraint is expected.',
    choices: [
      { id: 'waverly_w2_c1', text: 'Coach Rich in a tight whisper and try to manage the table.', statChanges: { communication: 10, culture: 5, bond: -5 }, outcomeText: 'You keep the evening from collapsing, but you also turn love into another board to control.' },
      { id: 'waverly_w2_c2', text: 'Pretend not to notice and hope everyone survives it.', statChanges: { identity: -10, bond: -10 }, outcomeText: 'Every mistake lands harder because no one names it. By the end, everyone feels judged and nobody feels protected.' },
      { id: 'waverly_w2_c3', text: 'Use your Strategic Mind to explain each side to the other before resentment sets in.', statChanges: { communication: 15, bond: 10, culture: 10 }, requiredAbility: 'Strategic Mind', isMemoryUnlock: true, outcomeText: 'You translate the room instead of trying to win it. The dinner is still awkward, but it becomes human rather than hostile.' },
    ],
  },
  {
    id: 'waverly_w3_1',
    characterId: 'waverly',
    worldId: 'w3',
    title: 'Invisible Chess Match',
    description: 'After dinner, every conversation with your mother feels like an opening move in a match neither of you admits you are playing. Her pauses criticize. Your rehearsed answers defend before she attacks.',
    choices: [
      { id: 'waverly_w3_c1', text: 'Prepare a sharper move and confront her before she can judge Rich again.', statChanges: { identity: 10, bond: -15, communication: -10 }, outcomeText: 'The argument arrives right on schedule. You feel powerful for a second, then stranded inside another needless victory.' },
      { id: 'waverly_w3_c2', text: 'Tell her plainly that you want her blessing, not another contest.', statChanges: { communication: 15, bond: 10 }, requiredStats: { communication: 55 }, outcomeText: 'The honesty surprises both of you. She cannot answer cleanly, but the board finally tilts toward truth instead of tactics.' },
      { id: 'waverly_w3_c3', text: 'Withdraw and keep the peace on the surface.', statChanges: { bond: -5, identity: -10 }, outcomeText: 'The fight never happens, yet nothing heals. Silence becomes its own strategy, and it costs more than you expected.' },
    ],
  },
  {
    id: 'waverly_w4_1',
    characterId: 'waverly',
    worldId: 'w4',
    title: 'Memory Echo: Blade and Mirror',
    isMemoryEcho: true,
    description: 'In memory, you see how your mother taught you to look ahead, hide weakness, and sense danger before it could embarrass you. The same lessons that sharpened you also taught you to mistrust tenderness.',
    choices: [
      { id: 'waverly_w4_c1', text: 'Accept that her pressure was love distorted by fear.', statChanges: { bond: 15, identity: 10, culture: 10 }, outcomeText: 'The old humiliation does not vanish, but it gains context. You can finally separate cruelty from inherited worry.' },
      { id: 'waverly_w4_c2', text: 'Hold onto the belief that she only wanted control.', statChanges: { identity: 5, bond: -15 }, outcomeText: 'Certainty feels safer than ambiguity. It also leaves no room for the parts of her love that were real.' },
    ],
  },
  {
    id: 'waverly_w5_1',
    characterId: 'waverly',
    worldId: 'w5',
    title: 'Choosing the Next Move',
    description: 'You sit with your mother before the wedding plans harden into another battleground. Rich is not in the room. For once, there is only the question of whether you will speak as daughter, rival, or both.',
    choices: [
      { id: 'waverly_w5_c1', text: 'Ask her to stand beside you without trying to command the future.', statChanges: { communication: 15, bond: 20, identity: 10 }, outcomeText: 'She studies you, then nods as if recognizing a grown opponent she can finally respect. The truce feels like love.' },
      { id: 'waverly_w5_c2', text: 'Keep the conversation strategic and emotionally guarded.', statChanges: { identity: 5, communication: -10 }, outcomeText: 'You preserve your advantage, but the distance remains. Nothing breaks, yet nothing truly joins either.' },
    ],
  },
  {
    id: 'waverly_w6_boss',
    characterId: 'waverly',
    worldId: 'w6',
    isBossStage: true,
    title: 'Final Boss: The Last Match',
    description: 'Your mother makes one final testing remark, half challenge and half invitation. The old board is set again, but this time the real question is whether you can answer without turning love into combat.',
    choices: [
      {
        id: 'waverly_w6_c1',
        text: 'Stay open, strategic, and honest all at once.',
        statChanges: { communication: 10, bond: 10, identity: 10 },
        requiredStats: { identity: 75, communication: 65, bond: 50, culture: 55 },
        outcomeText: 'You neither surrender nor attack. The old contest breaks open into something rarer: mutual recognition without humiliation.',
      },
      {
        id: 'waverly_w6_c2',
        text: 'Retreat behind superior poise and win the exchange alone.',
        statChanges: { bond: -100, identity: -100 },
        outcomeText: 'You land the cleanest move on the board and feel the emptiness immediately. Mastery without intimacy becomes its own defeat.',
      },
    ],
  },
];

const LENA_EVENTS: GameEvent[] = [
  {
    id: 'lena_w1_1',
    characterId: 'lena',
    worldId: 'w1',
    title: 'A House Built on Warnings',
    description: 'As a child you learn to hear catastrophe in every creak of the house and every story your mother tells. Fear becomes a kind of obedience: if you stay quiet enough, maybe disaster will pass over you.',
    choices: [
      { id: 'lena_w1_c1', text: 'Listen carefully and absorb every warning.', statChanges: { bond: 10, identity: -10 }, outcomeText: 'You become excellent at anticipating danger and terrible at trusting yourself. Safety comes at the cost of your own shape.' },
      { id: 'lena_w1_c2', text: 'Ask which fears are real and which belong to the adults.', statChanges: { communication: 15, identity: 5 }, outcomeText: 'The question unsettles the room, but it opens a tiny space where your own judgment can exist.' },
      { id: 'lena_w1_c3', text: 'Retreat inward and promise yourself you will never cause trouble.', statChanges: { bond: 5, communication: -10, identity: -5 }, outcomeText: 'No one scolds you. The cost is that silence begins to feel like your only useful skill.' },
    ],
  },
  {
    id: 'lena_w2_1',
    characterId: 'lena',
    worldId: 'w2',
    title: 'The Marriage Ledger',
    description: 'Harold insists that everything in your marriage be split exactly down the middle: meals, furniture, toothpaste, rent. The arrangement is called fair, even as it leaves you anxious, indebted, and small.',
    choices: [
      { id: 'lena_w2_c1', text: 'Keep following the rules because at least they are clear.', statChanges: { bond: -5, identity: -10, culture: -5 }, outcomeText: 'The numbers balance on paper while the emotional weight keeps sliding toward you. Order becomes another mask for control.' },
      { id: 'lena_w2_c2', text: 'Name the arrangement as unequal, even if you cannot yet fix it.', statChanges: { communication: 10, identity: 10 }, outcomeText: 'The truth feels dangerous in your mouth, but once spoken it refuses to disappear back into the ledger.' },
      { id: 'lena_w2_c3', text: 'Use Emotional Insight to notice what he gains from calling this fairness.', statChanges: { identity: 5, communication: 15, culture: 5 }, requiredAbility: 'Emotional Insight', isMemoryUnlock: true, outcomeText: 'You see that the system protects Harold from obligation more than it protects either of you from resentment. Naming the pattern changes the room.' },
    ],
  },
  {
    id: 'lena_w3_1',
    characterId: 'lena',
    worldId: 'w3',
    title: 'The Table on Uneven Legs',
    description: 'A beautiful table Harold bought with your warnings ignored begins to tip under its own flaw. You keep watching the vase tremble, knowing the crash will come if no one moves.',
    choices: [
      { id: 'lena_w3_c1', text: 'Catch the vase and say nothing about the table itself.', statChanges: { bond: -5, communication: -10 }, outcomeText: 'You prevent the immediate break and preserve the deeper one. Once again, your labor disappears into maintenance.' },
      { id: 'lena_w3_c2', text: 'Tell Harold the table is the marriage: beautiful, unstable, and built without listening.', statChanges: { communication: 15, identity: 15, bond: -5 }, requiredStats: { identity: 35 }, outcomeText: 'The metaphor lands harder than an accusation. Even if he resists it, you cannot go back to pretending you did not see the flaw.' },
      { id: 'lena_w3_c3', text: 'Back away and let the crash prove what words have not.', statChanges: { identity: -10, bond: -10 }, outcomeText: 'The vase shatters and so does your claim that passivity is gentler than confrontation. The proof arrives too late to feel useful.' },
    ],
  },
  {
    id: 'lena_w4_1',
    characterId: 'lena',
    worldId: 'w4',
    title: 'Memory Echo: What Mother Saw',
    isMemoryEcho: true,
    description: 'You remember your mother looking past appearances and reading danger in a room before anyone else would admit it. She was not weak because she feared collapse; she was warning you not to live inside one.',
    choices: [
      { id: 'lena_w4_c1', text: 'Reclaim her warning as a lesson in perception, not paralysis.', statChanges: { identity: 15, culture: 10, bond: 10 }, outcomeText: 'The stories you inherited become tools instead of cages. You can notice danger without surrendering to it.' },
      { id: 'lena_w4_c2', text: 'Decide that seeing the problem only makes you more trapped.', statChanges: { identity: -10, bond: -10 }, outcomeText: 'Insight curdles into despair. Everything becomes clearer and yet somehow harder to move.' },
    ],
  },
  {
    id: 'lena_w5_1',
    characterId: 'lena',
    worldId: 'w5',
    title: 'Terms Rewritten',
    description: 'With the pattern finally visible, you stand in your own kitchen and decide whether this marriage will keep measuring your life in halves. Harold waits for the version of you who usually yields.',
    choices: [
      { id: 'lena_w5_c1', text: 'State what must change and accept that truth may end the marriage.', statChanges: { communication: 15, identity: 20, bond: 10 }, outcomeText: 'Your voice shakes, but it does not disappear. For the first time the future belongs to a decision you actually made.' },
      { id: 'lena_w5_c2', text: 'Offer one more compromise so no one has to rupture the illusion.', statChanges: { bond: -10, identity: -15 }, outcomeText: 'Peace returns in the same shape that was hurting you. It is familiar, and that is exactly the problem.' },
    ],
  },
  {
    id: 'lena_w6_boss',
    characterId: 'lena',
    worldId: 'w6',
    isBossStage: true,
    title: 'Final Boss: The Uneven House',
    description: 'Harold asks for one more calm, reasonable arrangement. The old fear rises with it. This is the final test: can you speak clearly enough to stop living inside a structure that is collapsing around you?',
    choices: [
      {
        id: 'lena_w6_c1',
        text: 'Name the imbalance and refuse to disappear inside it.',
        statChanges: { identity: 10, communication: 10, culture: 5 },
        requiredStats: { identity: 60, communication: 60, bond: 40, culture: 45 },
        outcomeText: 'You do not need to shout. The steadiness is enough. By standing inside the truth, you finally become heavier than the fear that kept you quiet.',
      },
      {
        id: 'lena_w6_c2',
        text: 'Accept the arrangement one last time to avoid the rupture.',
        statChanges: { bond: -100, identity: -100 },
        outcomeText: 'The familiar calm settles back over the room like dust. Underneath it, your sense of self gives way completely.',
      },
    ],
  },
];

const ROSE_EVENTS: GameEvent[] = [
  {
    id: 'rose_w1_1',
    characterId: 'rose',
    worldId: 'w1',
    title: 'The Missing Brother',
    description: 'After Bing disappears in the water, grief settles over your family like weather. You learn early that a single moment of indecision can split a life into before and after.',
    choices: [
      { id: 'rose_w1_c1', text: 'Carry the guilt quietly and let others decide what it means.', statChanges: { bond: 10, identity: -10 }, outcomeText: 'You become skilled at holding sorrow without language. It binds you to your family and buries you inside their grief.' },
      { id: 'rose_w1_c2', text: 'Ask your mother how to survive something that cannot be repaired.', statChanges: { communication: 15, bond: 5, culture: 5 }, outcomeText: 'She answers in faith and stubbornness rather than comfort. It is not easy solace, but it teaches you grief can move instead of only drown.' },
      { id: 'rose_w1_c3', text: 'Decide never to be the one who chooses again.', statChanges: { identity: -15, communication: -5 }, outcomeText: 'Surrender feels like protection. It quietly becomes a habit.' },
    ],
  },
  {
    id: 'rose_w2_1',
    characterId: 'rose',
    worldId: 'w2',
    title: 'Ted\'s Decisions',
    description: 'Ted chooses the restaurants, the routes, the plans, the pace. At first it feels like relief to be loved by someone decisive. Over time, relief turns into absence.',
    choices: [
      { id: 'rose_w2_c1', text: 'Let Ted keep deciding because it keeps everything smooth.', statChanges: { bond: 5, identity: -10 }, outcomeText: 'The relationship remains easy on the surface. Underneath, your own wants continue fading from practice.' },
      { id: 'rose_w2_c2', text: 'Tell Ted you want to choose together, even if it slows things down.', statChanges: { communication: 15, identity: 10 }, outcomeText: 'The conversation is awkward, but it introduces the possibility that love could include your preferences too.' },
      { id: 'rose_w2_c3', text: 'Use your Inner Voice to insist on one decision that matters to you.', statChanges: { identity: 15, communication: 10, bond: -5 }, requiredAbility: 'Inner Voice', isMemoryUnlock: true, outcomeText: 'The assertion surprises both of you. It does not solve everything, but it proves you are still inside this marriage.' },
    ],
  },
  {
    id: 'rose_w3_1',
    characterId: 'rose',
    worldId: 'w3',
    title: 'Divorce Papers',
    description: 'Ted presents the divorce as if it were simply the next efficient decision. He expects you to sign, leave the house, and drift out of the story with the same quiet compliance he once depended on.',
    choices: [
      { id: 'rose_w3_c1', text: 'Sign quickly so the conflict can end.', statChanges: { bond: -15, identity: -15 }, outcomeText: 'The ease of surrender feels almost familiar. Then the finality lands, and you realize how much of yourself went unsigned for years.' },
      { id: 'rose_w3_c2', text: 'Tell Ted you need time and that the house is not automatically his.', statChanges: { communication: 15, identity: 15 }, requiredStats: { communication: 55 }, outcomeText: 'The sentence comes out steadier than you feel. For once, delay is not avoidance but a boundary.' },
      { id: 'rose_w3_c3', text: 'Call your mother before answering him.', statChanges: { bond: 10, culture: 10, identity: 5 }, outcomeText: 'Her certainty irritates and steadies you at once. She reminds you that yielding is also a decision, and rarely the one that saves you.' },
    ],
  },
  {
    id: 'rose_w4_1',
    characterId: 'rose',
    worldId: 'w4',
    title: 'Memory Echo: The Weeds and the Wall',
    isMemoryEcho: true,
    description: 'You remember your mother pointing to weeds that survive where flowers fail, insisting that what bends is not always what breaks. Her faith was never passive; it was a refusal to disappear.',
    choices: [
      { id: 'rose_w4_c1', text: 'Take her lesson as permission to stay rooted.', statChanges: { identity: 15, bond: 10, culture: 10 }, outcomeText: 'Her stubbornness stops looking like noise and starts looking like a blueprint. Endurance can include resistance.' },
      { id: 'rose_w4_c2', text: 'Dismiss her certainty as another form of pressure.', statChanges: { bond: -10, identity: -5 }, outcomeText: 'You protect your independence from her voice, but you also lose one of the few models of strength available to you.' },
    ],
  },
  {
    id: 'rose_w5_1',
    characterId: 'rose',
    worldId: 'w5',
    title: 'The House and the Voice',
    description: 'Ted waits for your answer in the house where you learned to become agreeable. This time the room asks a different question: what remains if you stop confusing love with erasure?',
    choices: [
      { id: 'rose_w5_c1', text: 'Tell Ted you are staying until the terms are fair and your life is named.', statChanges: { communication: 15, identity: 20, bond: 10 }, outcomeText: 'The fear does not vanish, but it no longer leads. You hear your own voice as if meeting it for the first time.' },
      { id: 'rose_w5_c2', text: 'Leave quietly and trust that peace is worth the loss.', statChanges: { identity: -15, bond: -10 }, outcomeText: 'The exit is smooth, almost elegant. Later, the emptiness reveals how much was traded for that calm.' },
    ],
  },
  {
    id: 'rose_w6_boss',
    characterId: 'rose',
    worldId: 'w6',
    isBossStage: true,
    title: 'Final Boss: The Choice Is Yours',
    description: 'Ted presses for the final signature and expects the old version of you to yield. This is the boss fight at the center of your story: can you stay rooted in your own will while fear begs you to disappear?',
    choices: [
      {
        id: 'rose_w6_c1',
        text: 'Hold your ground and choose yourself out loud.',
        statChanges: { identity: 10, communication: 10, bond: 10 },
        requiredStats: { identity: 60, communication: 65, bond: 55, culture: 45 },
        outcomeText: 'The moment hurts, but it does not erase you. Your choice finally carries as much weight as your fear once did.',
      },
      {
        id: 'rose_w6_c2',
        text: 'Let the decision be made for you one final time.',
        statChanges: { bond: -100, identity: -100 },
        outcomeText: 'Relief arrives first, then vanishes. What remains is the ache of realizing you handed away the very voice you had fought to hear.',
      },
    ],
  },
];

export const EVENTS: GameEvent[] = [
  ...JUNE_EVENTS,
  ...WAVERLY_EVENTS,
  ...LENA_EVENTS,
  ...ROSE_EVENTS,
];
