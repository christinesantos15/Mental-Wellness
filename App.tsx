
import React, { useState, useCallback } from 'react';
import { Mood, Screen } from './types';
import MoodSelection from './screens/MoodSelection';
import PositivityBoard from './screens/PositivityBoard';
import CheerUp from './screens/CheerUp';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('mood');
  const [mood, setMood] = useState<Mood | null>(null);

  const handleContinue = useCallback((selectedMood: Mood) => {
    setMood(selectedMood);
    if (selectedMood === Mood.Happy || selectedMood === Mood.Neutral) {
      setScreen('positivity');
    } else {
      setScreen('cheerup');
    }
  }, []);

  const handleGoBack = useCallback(() => {
    setScreen('mood');
    setMood(null);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'mood':
        return <MoodSelection onContinue={handleContinue} />;
      case 'positivity':
        return <PositivityBoard onGoBack={handleGoBack} />;
      case 'cheerup':
        return <CheerUp onGoBack={handleGoBack} />;
      default:
        return <MoodSelection onContinue={handleContinue} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto max-w-sm p-4 bg-white min-h-screen shadow-lg">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
