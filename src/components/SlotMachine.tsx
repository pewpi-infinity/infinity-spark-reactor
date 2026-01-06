import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sparkle } from '@phosphor-icons/react'
import { SLOT_EMOJIS, classifySlotCombination, WORLD_ARCHETYPES } from '@/lib/worldTypes'

interface SlotMachineProps {
  onSpin: (archetype: string, rarityMultiplier: number, combination: string) => Promise<void>
  isSpinning: boolean
}

export function SlotMachine({ onSpin, isSpinning }: SlotMachineProps) {
  const [reels, setReels] = useState<[string[], string[], string[]]>([
    SLOT_EMOJIS.slice(0, 5),
    SLOT_EMOJIS.slice(3, 8),
    SLOT_EMOJIS.slice(6, 11)
  ])
  const [currentIndices, setCurrentIndices] = useState<[number, number, number]>([2, 2, 2])
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<{ name: string; rarityMultiplier: number } | null>(null)
  const [behaviorSignals, setBehaviorSignals] = useState({
    hoverTime: 0,
    clickTiming: Date.now(),
    hesitationCount: 0
  })

  useEffect(() => {
    let hoverInterval: NodeJS.Timeout

    const handleMouseEnter = () => {
      hoverInterval = setInterval(() => {
        setBehaviorSignals(prev => ({ ...prev, hoverTime: prev.hoverTime + 100 }))
      }, 100)
    }

    const handleMouseLeave = () => {
      clearInterval(hoverInterval)
      setBehaviorSignals(prev => ({ ...prev, hesitationCount: prev.hesitationCount + 1 }))
    }

    const slotElement = document.getElementById('slot-machine')
    slotElement?.addEventListener('mouseenter', handleMouseEnter)
    slotElement?.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearInterval(hoverInterval)
      slotElement?.removeEventListener('mouseenter', handleMouseEnter)
      slotElement?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleSpin = async () => {
    if (spinning || isSpinning) return

    setSpinning(true)
    setResult(null)

    const clickTiming = Date.now() - behaviorSignals.clickTiming
    setBehaviorSignals(prev => ({ ...prev, clickTiming: Date.now() }))

    const spinDuration = 2000
    const spinInterval = 50
    const totalSteps = spinDuration / spinInterval

    let step = 0
    const spinTimer = setInterval(() => {
      step++

      setReels(prev => [
        rotateArray(prev[0]),
        rotateArray(prev[1]),
        rotateArray(prev[2])
      ])

      if (step >= totalSteps) {
        clearInterval(spinTimer)
        finalizeSpin()
      }
    }, spinInterval)
  }

  const finalizeSpin = async () => {
    const finalEmojis: [string, string, string] = [
      reels[0][2],
      reels[1][2],
      reels[2][2]
    ]

    const combination = classifySlotCombination(finalEmojis)
    setResult({
      name: combination.name,
      rarityMultiplier: combination.rarityMultiplier
    })

    setTimeout(async () => {
      await onSpin(
        combination.archetype,
        combination.rarityMultiplier,
        JSON.stringify({
          slotEmojis: finalEmojis,
          hoverTime: behaviorSignals.hoverTime,
          hesitationCount: behaviorSignals.hesitationCount,
          archetype: combination.archetype,
          rarityMultiplier: combination.rarityMultiplier,
          name: combination.name
        })
      )
      setSpinning(false)
    }, 1000)
  }

  const rotateArray = (arr: string[]) => {
    const newArr = [...arr]
    newArr.push(newArr.shift()!)
    return newArr
  }

  return (
    <div id="slot-machine" className="flex flex-col items-center gap-8">
      <div className="relative">
        <div className="flex gap-4 md:gap-8">
          {[0, 1, 2].map((reelIndex) => (
            <motion.div
              key={reelIndex}
              className="relative w-20 h-32 md:w-32 md:h-48 rounded-2xl overflow-hidden cosmic-border"
              style={{
                background: 'linear-gradient(180deg, oklch(0.15 0.04 270) 0%, oklch(0.12 0.02 260) 100%)'
              }}
              animate={spinning ? { 
                boxShadow: [
                  '0 0 20px oklch(0.75 0.15 85 / 0.3)',
                  '0 0 40px oklch(0.75 0.15 85 / 0.6)',
                  '0 0 20px oklch(0.75 0.15 85 / 0.3)'
                ]
              } : {}}
              transition={{ duration: 0.5, repeat: spinning ? Infinity : 0 }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <AnimatePresence mode="popLayout">
                  {reels[reelIndex].map((emoji, idx) => {
                    const offset = idx - currentIndices[reelIndex]
                    return (
                      <motion.div
                        key={`${reelIndex}-${emoji}-${idx}`}
                        className={`text-4xl md:text-6xl absolute ${idx === 2 ? 'z-10' : 'z-0 opacity-40'}`}
                        initial={{ y: offset * 60 }}
                        animate={{ 
                          y: offset * 60,
                          scale: idx === 2 ? 1.2 : 0.8,
                          opacity: idx === 2 ? 1 : 0.3
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        {emoji}
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-accent/50 -translate-y-1/2" />
            </motion.div>
          ))}
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
          >
            <div className="text-accent font-bold text-lg">{result.name}</div>
            <div className="text-accent-foreground/70 text-sm">
              {result.rarityMultiplier}x Rarity Multiplier
            </div>
          </motion.div>
        )}
      </div>

      <Button
        size="lg"
        onClick={handleSpin}
        disabled={spinning || isSpinning}
        className="cosmic-glow gap-3 text-xl px-12 py-6 relative overflow-hidden group"
      >
        <motion.div
          animate={spinning ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: spinning ? Infinity : 0, ease: 'linear' }}
        >
          <Sparkle size={28} weight="fill" />
        </motion.div>
        <span className="relative z-10">
          {spinning ? 'Spinning...' : isSpinning ? 'Creating World...' : 'SPIN & CREATE'}
        </span>
        {!spinning && !isSpinning && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </Button>

      <div className="text-center text-sm text-muted-foreground max-w-md">
        <p>Your behavior influences the outcome - hover time, hesitation, and timing all matter</p>
      </div>
    </div>
  )
}
