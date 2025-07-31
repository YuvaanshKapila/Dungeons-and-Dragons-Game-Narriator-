import { useState, useEffect } from "react";
import { PixelButton } from "./PixelButton";
import { PixelCard } from "./PixelCard";

interface StoryDisplayProps {
  currentTurn: number;
  totalTurns: number;
  storyText: string;
  isGenerating: boolean;
  onNextTurn: () => void;
  onEndSession: () => void;
}

export const StoryDisplay = ({
  currentTurn,
  totalTurns,
  storyText,
  isGenerating,
  onNextTurn,
  onEndSession,
}: StoryDisplayProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!storyText || isGenerating) return setDisplayedText(storyText);

    setIsTyping(true);
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(storyText.slice(0, i + 1));
      i++;
      if (i >= storyText.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [storyText, isGenerating]);

  const progress = (currentTurn / totalTurns) * 100;
  const isComplete = currentTurn >= totalTurns;
  const disableButtons = isGenerating || isTyping;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="pixel-text text-xl text-accent font-pixel mb-2"> PixelQuest Chronicles </h1>
        <p className="pixel-text text-sm text-muted-foreground">Turn {currentTurn} of {totalTurns}</p>
        <div className="mt-4 bg-input border-2 border-border h-4 relative overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent to-accent-glow transition-all duration-500" style={{ width: `${progress}%` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      <PixelCard className="mb-6" variant="highlight">
        <div className="min-h-[200px] relative">
          {isGenerating ? (
            <div className="flex items-center justify-center h-full pixel-text text-sm text-muted-foreground animate-pixel-pulse">
               The Dungeon Master is weaving your tale...
            </div>
          ) : (
            <div className="pixel-text text-base leading-relaxed text-foreground">
              {displayedText}
              {isTyping && <span className="inline-block w-0.5 h-5 bg-accent ml-1 animate-blink-caret" />}
            </div>
          )}
        </div>
      </PixelCard>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <PixelButton
          onClick={isComplete ? onEndSession : onNextTurn}
          disabled={disableButtons}
          size="lg"
          variant={isComplete ? "accent" : "primary"}
        >
          {isGenerating ? "Generating..." : isTyping ? "Reading..." : isComplete ? " Quest Complete!" : "⏭ Next Turn"}
        </PixelButton>

        <PixelButton onClick={onEndSession} variant="secondary" size="lg">
            Save & Exit
        </PixelButton>
      </div>

      <div className="text-center mt-6 inline-flex gap-2 justify-center">
        {Array.from({ length: totalTurns }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 border border-border ${i < currentTurn ? "bg-accent" : "bg-muted"}`}
          />
        ))}
      </div>
    </div>
  );
};
