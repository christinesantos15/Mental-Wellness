
import React, { useState, useEffect } from 'react';
import { getPositivityBoost } from '../services/geminiService';
import { PositivityContent } from '../types';
import { FuelIcon, BrightenIcon, ComfortIcon } from '../components/icons/ContentIcons';
import LoadingSpinner from '../components/LoadingSpinner';

interface PositivityBoardProps {
  onGoBack: () => void;
}

const fallbackContent: PositivityContent = {
  spirit: {
    title: "Fuel Your Spirit",
    body: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. — Christian D. Larson"
  },
  brighten: {
    title: "Brighten Your Day",
    items: [
      "Practice gratitude: Write down three things you're thankful for each day.",
      "Mindful breathing: Take a few deep breaths when feeling overwhelmed.",
      "Connect with nature: Spend at least 15 minutes outdoors."
    ]
  },
  comfort: {
    title: "Words of Comfort",
    body: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope. — Jeremiah 29:11"
  }
};

const ContentCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  color: string;
}> = ({ icon, title, children, color }) => (
  <div className={`p-6 rounded-2xl border ${color}`}>
    <div className="flex items-center mb-3">
      <div className="w-6 h-6 mr-3">{icon}</div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    </div>
    <div className="border-t pt-3 text-gray-600 space-y-2">{children}</div>
  </div>
);

const PositivityBoard: React.FC<PositivityBoardProps> = ({ onGoBack }) => {
  const [content, setContent] = useState<PositivityContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const positivityContent = await getPositivityBoost();
        setContent(positivityContent);
      } catch (e) {
        console.error(e);
        setError("Couldn't fetch a fresh boost, but here's a classic!");
        setContent(fallbackContent);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <LoadingSpinner />
        <p className="mt-4 text-gray-500">Curating your daily boost...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="text-center py-6 border-b">
        <h2 className="text-sm text-gray-500">Positivity Board</h2>
      </header>
      <main className="flex-grow pt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Daily Boost</h1>
        {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}
        {content && (
          <div className="space-y-4">
            <ContentCard icon={<FuelIcon />} title={content.spirit.title} color="bg-emerald-50 border-emerald-200">
              <p>{content.spirit.body}</p>
            </ContentCard>
            <ContentCard icon={<BrightenIcon />} title={content.brighten.title} color="bg-orange-50 border-orange-200">
              <ul className="list-disc list-inside">
                {content.brighten.items.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </ContentCard>
            <ContentCard icon={<ComfortIcon />} title={content.comfort.title} color="bg-gray-100 border-gray-200">
              <p>{content.comfort.body}</p>
            </ContentCard>
          </div>
        )}
      </main>
      <footer className="py-4">
        <button
          onClick={onGoBack}
          className="w-full py-4 text-lg font-semibold text-white rounded-2xl bg-emerald-400 hover:bg-emerald-500 transition-colors"
        >
          Done
        </button>
      </footer>
    </div>
  );
};

export default PositivityBoard;