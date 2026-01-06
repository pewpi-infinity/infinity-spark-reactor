export type WorldArchetype = 
  | 'slot-forge'
  | 'physics-world'
  | 'script-genome-lab'
  | 'neural-cart-playground'
  | 'world-stitcher'
  | 'research-library'
  | 'intent-magnet'
  | 'logic-gym'
  | 'game-film-studio'
  | 'quantum-playground'
  | 'emulator-dock'
  | 'dreamscape-architect'

export interface WorldTypeDefinition {
  id: WorldArchetype
  name: string
  emoji: string
  description: string
  educationalGoal: string
  baseValue: number
  primaryColor: string
  tools: string[]
}

export const WORLD_ARCHETYPES: Record<WorldArchetype, WorldTypeDefinition> = {
  'slot-forge': {
    id: 'slot-forge',
    name: 'Infinity Slot Forge',
    emoji: '🎰',
    description: 'Neural slot machine that creates worlds from randomness and pattern recognition',
    educationalGoal: 'Teaches pattern recognition, creativity from randomness, systems thinking',
    baseValue: 1000,
    primaryColor: 'oklch(0.75 0.15 85)',
    tools: ['slot-machine', 'pattern-analyzer', 'rarity-tracker']
  },
  'physics-world': {
    id: 'physics-world',
    name: 'Mario-Scale Physics World',
    emoji: '🍄',
    description: 'Platform-style physics playground for learning gravity, collision, and momentum',
    educationalGoal: 'Teaches gravity, collision detection, momentum, level design',
    baseValue: 1200,
    primaryColor: 'oklch(0.55 0.18 150)',
    tools: ['physics-sandbox', 'level-builder', 'gravity-control']
  },
  'script-genome-lab': {
    id: 'script-genome-lab',
    name: 'Game Script Genome Lab',
    emoji: '⚙️',
    description: 'Extract and recombine game logic patterns as reusable genomes',
    educationalGoal: 'Teaches game mechanics, logic patterns, modular design',
    baseValue: 1500,
    primaryColor: 'oklch(0.65 0.12 220)',
    tools: ['script-parser', 'genome-library', 'mechanic-combiner']
  },
  'neural-cart-playground': {
    id: 'neural-cart-playground',
    name: 'Neural Cart Playground',
    emoji: '🛒',
    description: 'Employ tiny thinking agents (carts) that perform specialized cognitive jobs',
    educationalGoal: 'Teaches AI delegation, modular thinking, task decomposition',
    baseValue: 1300,
    primaryColor: 'oklch(0.55 0.15 280)',
    tools: ['cart-spawner', 'task-manager', 'cart-combiner']
  },
  'world-stitcher': {
    id: 'world-stitcher',
    name: 'World Stitcher',
    emoji: '🧵',
    description: 'Combine mechanics from multiple worlds into hybrid learning environments',
    educationalGoal: 'Teaches systems interoperability, creative synthesis, cross-domain thinking',
    baseValue: 1800,
    primaryColor: 'oklch(0.65 0.20 310)',
    tools: ['world-selector', 'mechanic-merger', 'compatibility-checker']
  },
  'research-library': {
    id: 'research-library',
    name: 'Playable Research Library',
    emoji: '📚',
    description: 'Research as explorable rooms where charts are doors and data is interactive',
    educationalGoal: 'Teaches research navigation, spatial learning, citation networks',
    baseValue: 1400,
    primaryColor: 'oklch(0.60 0.12 200)',
    tools: ['research-room', 'citation-map', 'interactive-data']
  },
  'intent-magnet': {
    id: 'intent-magnet',
    name: 'Intent Magnet Arena',
    emoji: '🧲',
    description: 'Build worlds from behavior - mouse movement, timing, and hesitation patterns',
    educationalGoal: 'Teaches subconscious decision-making, behavioral awareness, HCI principles',
    baseValue: 1600,
    primaryColor: 'oklch(0.70 0.18 30)',
    tools: ['behavior-tracker', 'intent-classifier', 'gesture-analyzer']
  },
  'logic-gym': {
    id: 'logic-gym',
    name: 'Logic & Reasoning Gym',
    emoji: '🧠',
    description: 'Deduction puzzles, logic circuits, and cause-effect simulations',
    educationalGoal: 'Teaches deductive reasoning, logic patterns, cause-effect relationships',
    baseValue: 1100,
    primaryColor: 'oklch(0.50 0.16 260)',
    tools: ['puzzle-builder', 'logic-circuit', 'reasoning-engine']
  },
  'game-film-studio': {
    id: 'game-film-studio',
    name: 'Game-to-Film Studio',
    emoji: '🎬',
    description: 'Turn game mechanics into cinematic storyboards and narratives',
    educationalGoal: 'Teaches story structure, cinematics, motion as language',
    baseValue: 1700,
    primaryColor: 'oklch(0.55 0.15 340)',
    tools: ['storyboard-builder', 'motion-capture', 'scene-composer']
  },
  'quantum-playground': {
    id: 'quantum-playground',
    name: 'Quantum Playground',
    emoji: '🌌',
    description: 'Visual metaphors for quantum concepts - waves, probability, superposition',
    educationalGoal: 'Teaches quantum intuition, probability, wave mechanics (visual metaphors only)',
    baseValue: 1900,
    primaryColor: 'oklch(0.45 0.20 270)',
    tools: ['wave-simulator', 'probability-visualizer', 'superposition-toy']
  },
  'emulator-dock': {
    id: 'emulator-dock',
    name: 'Emulator Dock',
    emoji: '🕹️',
    description: 'Container for user-provided emulators - extract logic, never host ROMs',
    educationalGoal: 'Teaches game archaeology, reverse engineering ethics, legal boundaries',
    baseValue: 2000,
    primaryColor: 'oklch(0.60 0.18 120)',
    tools: ['emulator-container', 'logic-extractor', 'legal-validator']
  },
  'dreamscape-architect': {
    id: 'dreamscape-architect',
    name: 'Dreamscape Architect',
    emoji: '💭',
    description: 'Build worlds from emotions and symbols - emoji-driven, no text required',
    educationalGoal: 'Teaches emotional intelligence, symbolic reasoning, non-verbal expression',
    baseValue: 1400,
    primaryColor: 'oklch(0.70 0.15 320)',
    tools: ['emotion-mapper', 'symbol-builder', 'dreamscape-canvas']
  }
}

export const SLOT_EMOJIS = ['🎰', '🍄', '⚙️', '📀', '👑', '🧲', '🧠', '🎬', '🌌', '🕹️', '💭', '🧵']

export interface SlotCombination {
  emojis: [string, string, string]
  archetype: WorldArchetype
  rarityMultiplier: number
  name: string
}

export function classifySlotCombination(emojis: [string, string, string]): SlotCombination {
  const emojiString = emojis.join('')
  
  if (emojis[0] === emojis[1] && emojis[1] === emojis[2]) {
    const archetype = getArchetypeFromEmoji(emojis[0])
    return {
      emojis,
      archetype,
      rarityMultiplier: 3.0,
      name: `Triple ${emojis[0]} - Pure ${WORLD_ARCHETYPES[archetype].name}`
    }
  }
  
  if (emojis[0] === emojis[1] || emojis[1] === emojis[2] || emojis[0] === emojis[2]) {
    const primaryEmoji = emojis[0] === emojis[1] ? emojis[0] : emojis[1]
    const archetype = getArchetypeFromEmoji(primaryEmoji)
    return {
      emojis,
      archetype,
      rarityMultiplier: 1.8,
      name: `Paired ${primaryEmoji} - Enhanced ${WORLD_ARCHETYPES[archetype].name}`
    }
  }
  
  const primaryEmoji = emojis[Math.floor(Math.random() * 3)]
  const archetype = getArchetypeFromEmoji(primaryEmoji)
  return {
    emojis,
    archetype,
    rarityMultiplier: 1.0,
    name: `Mixed Combination - ${WORLD_ARCHETYPES[archetype].name} Hybrid`
  }
}

function getArchetypeFromEmoji(emoji: string): WorldArchetype {
  const mapping: Record<string, WorldArchetype> = {
    '🎰': 'slot-forge',
    '🍄': 'physics-world',
    '⚙️': 'script-genome-lab',
    '📀': 'neural-cart-playground',
    '👑': 'world-stitcher',
    '🧲': 'intent-magnet',
    '🧠': 'logic-gym',
    '🎬': 'game-film-studio',
    '🌌': 'quantum-playground',
    '🕹️': 'emulator-dock',
    '💭': 'dreamscape-architect',
    '🧵': 'world-stitcher'
  }
  
  return mapping[emoji] || 'research-library'
}
