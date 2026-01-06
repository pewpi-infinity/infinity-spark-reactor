import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { WORLD_ARCHETYPES, type WorldArchetype } from '@/lib/worldTypes'
import { Sparkle } from '@phosphor-icons/react'

interface WorldArchetypeSelectorProps {
  onSelect: (archetype: WorldArchetype) => void
  selectedArchetype?: WorldArchetype
}

export function WorldArchetypeSelector({ onSelect, selectedArchetype }: WorldArchetypeSelectorProps) {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Choose Your World Type</h3>
        <p className="text-muted-foreground">Or use the slot machine above for a neural surprise</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.values(WORLD_ARCHETYPES).map((world) => {
          const isSelected = selectedArchetype === world.id
          
          return (
            <motion.div
              key={world.id}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all relative overflow-hidden group ${
                  isSelected ? 'cosmic-glow ring-2 ring-accent' : 'hover:cosmic-border'
                }`}
                onClick={() => onSelect(world.id)}
                style={{
                  background: `linear-gradient(135deg, ${world.primaryColor} 0%, oklch(0.18 0.02 260) 100%)`
                }}
              >
                <div className="relative z-10">
                  <div className="text-6xl mb-4 text-center group-hover:animate-bounce">
                    {world.emoji}
                  </div>
                  
                  <h4 className="text-lg font-bold mb-2 text-center">
                    {world.name}
                  </h4>
                  
                  <p className="text-sm text-foreground/80 mb-3 line-clamp-2">
                    {world.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {world.tools.slice(0, 3).map((tool) => (
                      <Badge key={tool} variant="secondary" className="text-xs">
                        {tool.split('-').join(' ')}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Base: {world.baseValue} ∞
                    </span>
                    {isSelected && (
                      <div className="flex items-center gap-1 text-accent">
                        <Sparkle size={16} weight="fill" />
                        <span className="text-xs font-medium">Selected</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-foreground/10">
                    <p className="text-xs text-foreground/60 italic">
                      {world.educationalGoal}
                    </p>
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${world.primaryColor}22 0%, transparent 70%)`
                  }}
                />
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
