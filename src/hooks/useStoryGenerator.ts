import { useState, useCallback } from 'react';

interface Character {
  name: string;
  class: string;
  level: number;
}

interface GameSettings {
  sessionLength: number;
  difficulty: 'easy' | 'normal' | 'hard' | 'nightmare';
  useDiceRoller: boolean;
  useVoiceNarration: boolean;
}

interface StoryState {
  currentTurn: number;
  storyHistory: string[];
  isGenerating: boolean;
}

export const useStoryGenerator = () => {
  const [storyState, setStoryState] = useState<StoryState>({
    currentTurn: 0,
    storyHistory: [],
    isGenerating: false
  });

  const generateStoryTurn = useCallback(async (
    characters: Character[],
    settings: GameSettings,
    turnNumber: number
  ): Promise<string> => {
    setStoryState(prev => ({ ...prev, isGenerating: true }));

    const storyPrompts = {
      1: generateOpeningStory(characters, settings),
      [Math.floor(settings.sessionLength / 2)]: generateMidpointStory(characters, settings),
      [settings.sessionLength]: generateEndingStory(characters, settings)
    };

    const specificStory = storyPrompts[turnNumber as keyof typeof storyPrompts];
    const story = specificStory || generateRandomEncounter(characters, settings, turnNumber);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setStoryState(prev => ({
      ...prev,
      currentTurn: turnNumber,
      storyHistory: [...prev.storyHistory, story],
      isGenerating: false
    }));

    return story;
  }, []);

  return {
    ...storyState,
    generateStoryTurn
  };
};

const generateOpeningStory = (characters: Character[], settings: GameSettings): string => {
  const partySize = characters.length;
  const heroNames = characters.map(c => c.name).join(", ");
  
  const openings = [
    `The tavern door slams shut behind ${heroNames} as rain begins to fall. The bartender, a grizzled dwarf, looks up with knowing eyes. "You're the ones here about the missing caravan, aren't you?" Thunder rumbles overhead as your adventure begins...`,
    
    `Ancient runes glow softly on the dungeon entrance as ${heroNames} stand before the sealed doorway. Legend speaks of treasures within, but also of horrors that have claimed many brave souls. The ${partySize === 1 ? 'hero' : 'party'} exchanges determined glances...`,
    
    `The forest path ahead disappears into misty shadows. ${heroNames} can hear strange whispers in the wind and see glowing eyes watching from between the trees. Your quest to find the Crystal of Eternal Light has led you here, to the heart of the Whispering Woods...`
  ];

  return openings[Math.floor(Math.random() * openings.length)];
};

const generateMidpointStory = (characters: Character[], settings: GameSettings): string => {
  const heroNames = characters.map(c => c.name).join(" and ");
  
  const midpoints = [
    `${heroNames} discover a hidden chamber filled with ancient murals depicting a great battle between light and darkness. At the center stands a pedestal with a mysterious artifact pulsing with otherworldly energy. But as you approach, the shadows begin to move...`,
    
    `The path splits before you into three directions: a narrow bridge over a chasm of fire, a dark tunnel echoing with distant roars, and a spiral staircase ascending into clouds. ${heroNames} must choose wisely, for each path holds different perils and rewards...`,
    
    `A wounded knight approaches ${heroNames} on the road. "Please," he gasps, "the village... they've taken everyone. The shadow cult has risen again, and their dark magic grows stronger by the hour. You're our only hope!" His eyes pleading, he collapses at your feet...`
  ];

  return midpoints[Math.floor(Math.random() * midpoints.length)];
};

const generateEndingStory = (characters: Character[], settings: GameSettings): string => {
  const heroNames = characters.map(c => c.name).join(" and ");
  
  const endings = [
    `The final confrontation approaches! ${heroNames} stand before the dark lord's throne, magical energy crackling in the air. Your journey has led to this moment - will you emerge victorious, or will darkness claim the realm forever? The fate of all hangs in the balance!`,
    
    `As the last enemy falls, ${heroNames} stand triumphant in the treasure chamber. Ancient gold glints in the torchlight, and magical artifacts hum with power. Your quest is complete, but new adventures await beyond the horizon. The realm is safe once more, thanks to your courage!`,
    
    `The portal begins to close, reality bending around ${heroNames} as you make your final escape. Behind you, the collapsing dungeon seals away the ancient evil forever. As you emerge into daylight, the townspeople cheer your return. You are true heroes now!`
  ];

  return endings[Math.floor(Math.random() * endings.length)];
};

const generateRandomEncounter = (characters: Character[], settings: GameSettings, turnNumber: number): string => {
  const encounters = [
    `A mysterious merchant appears at a crossroads, offering magical wares in exchange for tales of your adventures. His cart seems to contain impossible items that shimmer and shift when you're not looking directly at them...`,
    
    `The ground trembles as a massive creature emerges from the earth ahead. Its crystal hide reflects the sunlight in dazzling patterns, but its roar suggests it's not friendly to travelers in its territory...`,
    
    `You discover an abandoned campsite with signs of a struggle. Among the scattered belongings, a journal tells of other adventurers who came this way. Their final entry speaks of a hidden treasure, but also warns of "the watchers in the stones"...`,
    
    `A riddle spoken by an ancient tree blocks your path: "I speak without a voice, I hear without ears. I have no body, but come alive with the wind. What am I?" The tree's eyes glow, waiting for your answer...`,
    
    `The party stumbles upon a magical clearing where time seems to flow differently. Flowers bloom and wither in seconds, while a gentle brook flows upward into the sky. In the center stands a fountain that shows visions of possible futures...`
  ];

  return encounters[Math.floor(Math.random() * encounters.length)];
};