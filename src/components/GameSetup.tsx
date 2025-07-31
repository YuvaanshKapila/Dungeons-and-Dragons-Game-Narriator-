import { useState } from "react";
import { PixelButton } from "./PixelButton";
import { PixelCard } from "./PixelCard";

export interface GameSettings {
  sessionLength: number;
  difficulty: 'easy' | 'normal' | 'hard' | 'nightmare';
  useDiceRoller: boolean;
}

export const GameSetup = ({ onComplete }: { onComplete: (s: GameSettings) => void }) => {
  const [settings, setSettings] = useState<GameSettings>({
    sessionLength: 10,
    difficulty: 'normal',
    useDiceRoller: true
  });

  const update = (patch: Partial<GameSettings>) =>
    setSettings(prev => ({ ...prev, ...patch }));

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="pixel-text text-2xl text-accent font-pixel mb-2">Quest Configuration</h1>
        <p className="pixel-text text-sm text-muted-foreground">Customize your adventure parameters</p>
      </div>

      <div className="space-y-6">
        <PixelCard title="Session Length">
          <div className="space-y-4">
            <p className="pixel-text text-xs text-muted-foreground">How many story turns?</p>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={5}
                max={50}
                value={settings.sessionLength}
                onChange={(e) => update({ sessionLength: +e.target.value })}
                className="flex-1 h-2 bg-input border-2 border-border cursor-pointer"
              />
              <span className="pixel-text text-sm text-accent font-pixel w-16">
                {settings.sessionLength} turns
              </span>
            </div>
          </div>
        </PixelCard>

        <PixelCard title="Difficulty Setting">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'easy', label: 'Easy', desc: 'Gentle challenges, heroic moments' },
              { key: 'normal', label: 'Normal', desc: 'Balanced adventure with fair stakes' },
              { key: 'hard', label: 'Hard', desc: 'Dangerous encounters, real consequences' },
              { key: 'nightmare', label: 'Nightmare', desc: 'Death lurks around every corner' }
            ].map(({ key, label, desc }) => (
              <PixelButton
                key={key}
                variant={settings.difficulty === key ? "accent" : "secondary"}
                onClick={() => update({ difficulty: key as GameSettings['difficulty'] })}
                className="text-left p-4"
              >
                <div>
                  <div className="pixel-text text-sm font-pixel">{label}</div>
                  <div className="pixel-text text-xs text-muted-foreground mt-1">{desc}</div>
                </div>
              </PixelButton>
            ))}
          </div>
        </PixelCard>

        <PixelCard title="Game Features">
          <div className="flex justify-between">
            <div>
              <p className="pixel-text text-sm font-pixel">Digital Dice Roller</p>
              <p className="pixel-text text-xs text-muted-foreground">Animated pixel dice or physical rolls</p>
            </div>
            <PixelButton
              variant={settings.useDiceRoller ? "accent" : "secondary"}
              size="sm"
              onClick={() => update({ useDiceRoller: !settings.useDiceRoller })}
            >
              {settings.useDiceRoller ? "Digital" : "Physical"}
            </PixelButton>
          </div>
        </PixelCard>

        <div className="text-center pt-6">
          <PixelButton onClick={() => onComplete(settings)} size="lg" variant="primary">
            Start the Quest!
          </PixelButton>
        </div>
      </div>
    </div>
  );
};
