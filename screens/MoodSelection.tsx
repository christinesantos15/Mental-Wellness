import React, { useState } from 'react';
import { Mood } from '../types';
import { HappyIcon, NeutralIcon, SadIcon } from '../components/icons/MoodIcons';

interface MoodSelectionProps {
  onContinue: (mood: Mood) => void;
}

const MoodOption: React.FC<{
  mood: Mood;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
  colorClasses: string;
}> = ({ mood, icon, selected, onSelect, colorClasses }) => (
  <button
    onClick={onSelect}
    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 w-28 h-28
      ${selected ? colorClasses : 'bg-gray-100 border-gray-100'}
    `}
    aria-pressed={selected}
  >
    <div className="w-12 h-12 mb-2">{icon}</div>
    <span className="text-base font-medium text-gray-700">{mood}</span>
  </button>
);

const MoodSelection: React.FC<MoodSelectionProps> = ({ onContinue }) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const moodOptions = [
    { mood: Mood.Happy, icon: <HappyIcon />, colors: 'bg-emerald-50 border-emerald-400' },
    { mood: Mood.Neutral, icon: <NeutralIcon />, colors: 'bg-orange-50 border-orange-400' },
    { mood: Mood.Sad, icon: <SadIcon />, colors: 'bg-blue-100 border-blue-400' },
  ];

  return (
    <div className="flex flex-col h-full">
      <header className="text-center py-6 border-b">
        <h2 className="text-sm text-gray-500">Mood Selection</h2>
      </header>
      <main className="flex-grow flex flex-col justify-center">
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">How are you feeling?</h1>
            <div className="flex justify-center space-x-3">
            {moodOptions.map(({ mood, icon, colors }) => (
                <MoodOption
                key={mood}
                mood={mood}
                icon={icon}
                selected={selectedMood === mood}
                onSelect={() => setSelectedMood(mood)}
                colorClasses={colors}
                />
            ))}
            </div>
        </div>
      </main>
      <footer className="py-4">
        <button
          onClick={() => selectedMood && onContinue(selectedMood)}
          disabled={!selectedMood}
          className="w-full py-4 text-lg font-semibold text-white rounded-2xl transition-colors duration-200 bg-emerald-400 hover:bg-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </footer>
    </div>
  );
};

export default MoodSelection;