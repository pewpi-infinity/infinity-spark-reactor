import { useState } from 'react'
import { SlotMachine } from '@/components/SlotMachine'
import { WorldArchetypeSelector } from '@/components/WorldArchetypeSelector'
import { WorldArchetype } from '@/lib/worldTypes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkle, ListBullets } from '@phosphor-icons/react'

interface HomeViewProps {
  onCreateWorld: (archetype: WorldArchetype, rarityMultiplier: number, slotCombination: string) => Promise<void>
  isCreating: boolean
}

export function HomeView({ onCreateWorld, isCreating }: HomeViewProps) {
  const [selectedArchetype, setSelectedArchetype] = useState<WorldArchetype | undefined>()
  const [creationMode, setCreationMode] = useState<'slot' | 'select'>('slot')

  const handleSlotSpin = async (archetype: string, rarityMultiplier: number, combination: string) => {
    await onCreateWorld(archetype as WorldArchetype, rarityMultiplier, combination)
  }

  const handleManualSelect = async (archetype: WorldArchetype) => {
    setSelectedArchetype(archetype)
    await onCreateWorld(archetype, 1.0, JSON.stringify({ manual: true, archetype }))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-7xl w-full space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
            <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
              INFINITY SPARK
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Where learning feels like play, play creates assets, and assets have real value.
            Spin the neural slot machine or choose your world archetype.
          </p>
        </div>

        <Tabs value={creationMode} onValueChange={(v) => setCreationMode(v as 'slot' | 'select')} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="slot" className="gap-2">
              <Sparkle size={20} />
              <span>Neural Slot</span>
            </TabsTrigger>
            <TabsTrigger value="select" className="gap-2">
              <ListBullets size={20} />
              <span>Browse Worlds</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="slot" className="mt-0">
            <div className="flex flex-col items-center space-y-8">
              <div className="text-center max-w-2xl space-y-3">
                <h2 className="text-3xl font-bold">Neural Slot Machine</h2>
                <p className="text-muted-foreground">
                  Your behavior influences the outcome - hover time, hesitation, and timing combine with emoji reels to create unique educational worlds
                </p>
              </div>
              
              <SlotMachine onSpin={handleSlotSpin} isSpinning={isCreating} />
            </div>
          </TabsContent>

          <TabsContent value="select" className="mt-0">
            <WorldArchetypeSelector 
              onSelect={handleManualSelect} 
              selectedArchetype={selectedArchetype}
            />
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8 border-t border-border">
          <div className="space-y-3">
            <div className="text-4xl">🎮</div>
            <h3 className="text-lg font-semibold text-foreground">12 Learning Worlds</h3>
            <p className="text-sm text-muted-foreground">
              Physics playgrounds, logic gyms, research libraries, quantum visualizers, and more
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-4xl">🎰</div>
            <h3 className="text-lg font-semibold text-foreground">Neural Creation</h3>
            <p className="text-sm text-muted-foreground">
              Behavior signals + emoji reels = unique worlds with rarity multipliers
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-4xl">💎</div>
            <h3 className="text-lg font-semibold text-foreground">Anti-Clone Value</h3>
            <p className="text-sm text-muted-foreground">
              Originality is rewarded — identical worlds lose value, unique creations win
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
