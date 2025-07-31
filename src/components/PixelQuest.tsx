import { useState } from "react";
import { CharacterSetup } from "./CharacterSetup";
import { GameSetup } from "./GameSetup";
import { StoryDisplay } from "./StoryDisplay";
import { DiceRoller } from "./DiceRoller";
import { useStoryGenerator } from "@/hooks/useStoryGenerator";

interface Character {
  name: string;
  class: string;
  level: number;
}

interface GameSettings {
  sessionLength: number;
  difficulty: "easy" | "normal" | "hard" | "nightmare";
  useDiceRoller: boolean;
  useVoiceNarration: boolean;
}

type GamePhase = "character-setup" | "game-setup" | "playing" | "complete";

export const PixelQuest = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>("character-setup");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  const [showDiceRoller, setShowDiceRoller] = useState(false);
  const [currentStory, setCurrentStory] = useState("");

  const { currentTurn, storyHistory, isGenerating, generateStoryTurn } = useStoryGenerator();

  const handleCharacterSetupComplete = (newCharacters: Character[]) => {
    setCharacters(newCharacters);
    setGamePhase("game-setup");
  };

  const handleGameSetupComplete = (settings: GameSettings) => {
    setGameSettings(settings);
    setShowDiceRoller(settings.useDiceRoller);
    setGamePhase("playing");
    startFirstTurn(settings);
  };

  const startFirstTurn = async (settings: GameSettings) => {
    const story = await generateStoryTurn(characters, settings, 1);
    setCurrentStory(story);
  };

  const handleNextTurn = async () => {
    if (!gameSettings) return;

    const nextTurnNumber = currentTurn + 1;
    if (nextTurnNumber <= gameSettings.sessionLength) {
      const story = await generateStoryTurn(characters, gameSettings, nextTurnNumber);
      setCurrentStory(story);
    }
    if (nextTurnNumber >= gameSettings.sessionLength) {
      setGamePhase("complete");
    }
  };

  const handleEndSession = () => {
    setGamePhase("character-setup");
    setCharacters([]);
    setGameSettings(null);
    setCurrentStory("");
    setShowDiceRoller(false);
  };

  const resetGame = () => {
    setGamePhase("character-setup");
    setCharacters([]);
    setGameSettings(null);
    setCurrentStory("");
    setShowDiceRoller(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pixel-dark to-pixel-darker relative">
      <div className="crt-scanlines fixed inset-0 pointer-events-none" />

      <div className="relative z-10">
        {gamePhase === "character-setup" && <CharacterSetup onComplete={handleCharacterSetupComplete} />}
        {gamePhase === "game-setup" && <GameSetup onComplete={handleGameSetupComplete} />}
        {gamePhase === "playing" && gameSettings && (
          <StoryDisplay
            currentTurn={currentTurn}
            totalTurns={gameSettings.sessionLength}
            storyText={currentStory}
            isGenerating={isGenerating}
            onNextTurn={handleNextTurn}
            onEndSession={handleEndSession}
          />
        )}
        {gamePhase === "complete" && (
          <div className="max-w-2xl mx-auto p-6 text-center">
            <div className="pixel-card">
              <h1 className="pixel-text text-2xl text-accent font-pixel mb-4"> Quest Complete! </h1>
              <p className="pixel-text text-base text-foreground mb-6">
                Your adventures have reached their epic conclusion! The realm owes you a great debt, brave heroes.
              </p>
              <div className="space-y-4">
                <div className="pixel-text text-sm text-muted-foreground">
                  Heroes: {characters.map((c) => c.name).join(", ")}
                </div>
                <div className="pixel-text text-sm text-muted-foreground">
                  Total Turns: {gameSettings?.sessionLength}
                </div>
                <div className="pixel-text text-sm text-muted-foreground">
                  Difficulty: {gameSettings?.difficulty.toUpperCase()}
                </div>
              </div>
              <div className="mt-8">
                <button onClick={resetGame} className="pixel-button">
                    Start New Quest
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {gameSettings?.useDiceRoller && gamePhase === "playing" && (
        <DiceRoller isVisible={showDiceRoller} onToggle={() => setShowDiceRoller(!showDiceRoller)} />
      )}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-pixel-darker/80 to-transparent">
        <div className="text-center">
          <p className="pixel-text text-xs text-muted-foreground">PixelQuest v1.0 - Retro D&D Adventure Generator</p>
        </div>
      </div>
    </div>
  );
};
