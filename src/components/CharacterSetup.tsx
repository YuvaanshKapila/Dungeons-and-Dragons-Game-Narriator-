import { useState } from "react";
import { PixelButton } from "./PixelButton";
import { PixelCard } from "./PixelCard";

interface Character {
  name: string;
  class: string;
  level: number;
}

export const CharacterSetup = ({ onComplete }: { onComplete: (characters: Character[]) => void }) => {
  const [characters, setCharacters] = useState<Character[]>([{ name: "", class: "Fighter", level: 1 }]);

  const classes = [
    "Fighter", "Wizard", "Rogue", "Cleric", "Ranger", "Barbarian",
    "Bard", "Druid", "Monk", "Paladin", "Sorcerer", "Warlock"
  ];

  const update = (i: number, field: keyof Character, val: string | number) =>
    setCharacters(chars => chars.map((c, j) => j === i ? { ...c, [field]: val } : c));

  const add = () =>
    characters.length < 6 && setCharacters([...characters, { name: "", class: "Fighter", level: 1 }]);

  const remove = (i: number) =>
    characters.length > 1 && setCharacters(chars => chars.filter((_, j) => j !== i));

  const submit = () => {
    const valid = characters.filter(c => c.name.trim());
    if (valid.length) onComplete(valid);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="pixel-text text-2xl text-accent font-pixel mb-2"> Create Your Party </h1>
        <p className="pixel-text text-sm text-muted-foreground">Set up your adventurers for the quest ahead</p>
      </div>

      <div className="grid gap-6">
        {characters.map((c, i) => (
          <PixelCard key={i} title={`Hero ${i + 1}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <input
                className="pixel-input w-full"
                placeholder="Hero name..."
                value={c.name}
                onChange={(e) => update(i, 'name', e.target.value)}
              />
              <select
                className="pixel-input w-full"
                value={c.class}
                onChange={(e) => update(i, 'class', e.target.value)}
              >
                {classes.map(cls => <option key={cls}>{cls}</option>)}
              </select>
              <input
                className="pixel-input w-full"
                type="number"
                min="1"
                max="20"
                value={c.level}
                onChange={(e) => update(i, 'level', parseInt(e.target.value) || 1)}
              />
              {characters.length > 1 && (
                <PixelButton onClick={() => remove(i)} variant="danger" size="sm">Remove</PixelButton>
              )}
            </div>
          </PixelCard>
        ))}

        {characters.length < 6 && (
          <div className="text-center">
            <PixelButton onClick={add} variant="secondary">+ Add Another Hero</PixelButton>
          </div>
        )}

        <div className="text-center pt-6">
          <PixelButton
            onClick={submit}
            size="lg"
            variant="accent"
            disabled={characters.every(c => !c.name.trim())}
          >
            Begin Adventure! 
          </PixelButton>
        </div>
      </div>
    </div>
  );
};
