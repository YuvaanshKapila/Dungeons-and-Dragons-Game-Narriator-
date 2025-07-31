import { useState } from "react";
import { PixelButton } from "./PixelButton";
import { PixelCard } from "./PixelCard";

export const DiceRoller = ({ isVisible, onToggle }: { isVisible: boolean; onToggle: () => void }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [selectedDie, setSelectedDie] = useState(20);
  const diceTypes = [4, 6, 8, 10, 12, 20];

  const roll = async () => {
    setIsRolling(true);
    setResult(null);
    await new Promise(res => setTimeout(res, 800));
    setResult(Math.floor(Math.random() * selectedDie) + 1);
    setIsRolling(false);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <PixelButton onClick={onToggle} size="sm">🎲 Show Dice</PixelButton>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <PixelCard title="Dice Roller" className="w-64">
        <div className="space-y-4">
          <p className="pixel-text text-xs text-muted-foreground">Select Die:</p>
          <div className="grid grid-cols-3 gap-2">
            {diceTypes.map(die => (
              <PixelButton
                key={die}
                size="sm"
                variant={selectedDie === die ? "accent" : "secondary"}
                onClick={() => setSelectedDie(die)}
              >
                d{die}
              </PixelButton>
            ))}
          </div>

          <div className="text-center py-4">
            <div className={`inline-block w-16 h-16 bg-gradient-to-br from-accent to-accent/80 border-2 border-accent/30 relative ${isRolling ? 'animate-dice-roll' : ''}`}>
              <div className="absolute inset-2 bg-accent/20 flex items-center justify-center">
                <span className="pixel-text text-lg text-accent-foreground font-pixel">
                  {isRolling ? '?' : result ?? '?'}
                </span>
              </div>
            </div>
          </div>

          {result && (
            <p className="text-center pixel-text text-sm text-accent font-pixel">
              d{selectedDie}: {result}
            </p>
          )}

          <div className="flex gap-2">
            <PixelButton onClick={roll} disabled={isRolling} className="flex-1">
              {isRolling ? "Rolling..." : "Roll"}
            </PixelButton>
            <PixelButton onClick={onToggle} variant="secondary" size="sm">Hide</PixelButton>
          </div>
        </div>
      </PixelCard>
    </div>
  );
};
