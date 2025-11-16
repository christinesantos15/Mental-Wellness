
import React, { useState, useEffect } from 'react';
import { getSelfCareTasks } from '../services/geminiService';
import { SelfCareTask } from '../types';
import { BreathingIcon, MusicIcon, GratitudeIcon, TalkIcon } from '../components/icons/ContentIcons';
import LoadingSpinner from '../components/LoadingSpinner';

interface CheerUpProps {
  onGoBack: () => void;
}

const fallbackTasks: SelfCareTask[] = [
    { title: "Mindful Breathing", description: "Take 5 deep breaths, focusing on the sensation of air filling your lungs." },
    { title: "Listen to Calming Music", description: "Put on your favorite relaxing playlist for 15 minutes." },
    { title: "Practice Gratitude", description: "List three things you are thankful for today, no matter how small." }
];

const taskIcons: { [key: string]: React.ReactNode } = {
    "breathing": <BreathingIcon />,
    "music": <MusicIcon />,
    "gratitude": <GratitudeIcon />
};

const getIconForTask = (title: string): React.ReactNode => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('breath')) return taskIcons['breathing'];
    if (lowerTitle.includes('music') || lowerTitle.includes('listen')) return taskIcons['music'];
    if (lowerTitle.includes('gratitude') || lowerTitle.includes('thankful')) return taskIcons['gratitude'];
    return taskIcons['breathing']; // default icon
};

const CheerUp: React.FC<CheerUpProps> = ({ onGoBack }) => {
  const [tasks, setTasks] = useState<SelfCareTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [helplineVisible, setHelplineVisible] = useState(false);
  
  const memes = [
    { id: 1, src: "https://picsum.photos/seed/meme1/400/300", caption: "When you remember your favorite snack exists." },
    { id: 2, src: "https://picsum.photos/seed/meme2/400/300", caption: "Me after a 10-minute power nap." },
    { id: 3, src: "https://picsum.photos/seed/meme3/400/300", caption: "Trying to be an adult is hard." },
    { id: 4, src: "https://picsum.photos/seed/meme4/400/300", caption: "That feeling when the code finally works." },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
        try {
            setLoading(true);
            const generatedTasks = await getSelfCareTasks();
            setTasks(generatedTasks);
        } catch(e) {
            console.error(e);
            setError("Couldn't get fresh ideas, but these are tried and true.");
            setTasks(fallbackTasks);
        } finally {
            setLoading(false);
        }
    };
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <header className="text-center py-6 border-b">
        <h2 className="text-sm text-gray-500">Cheer Up</h2>
      </header>
      <main className="flex-grow pt-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Need a little pick-me-up?</h1>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Uplifting Memes</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {memes.map(meme => (
              <div key={meme.id} className="flex-shrink-0 w-40 relative">
                <img src={meme.src} alt={meme.caption} className="w-full h-40 object-cover rounded-xl" />
                <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-xl">{meme.caption}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Self-Care Tasks</h2>
          {error && <p className="text-center text-amber-600 bg-amber-100 p-3 rounded-lg mb-4 text-sm">{error}</p>}
          {loading ? (
            <div className="flex justify-center items-center p-6"><LoadingSpinner/></div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center p-4 rounded-xl bg-gray-100 border border-gray-200">
                    <div className="w-8 h-8 mr-4 text-orange-400">{getIconForTask(task.title)}</div>
                    <div>
                        <h4 className="font-semibold text-gray-800">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <footer className="py-4 mt-auto text-center">
        <button
          onClick={() => setHelplineVisible(true)}
          className="w-full py-4 text-lg font-semibold text-emerald-800 rounded-2xl bg-emerald-200 hover:bg-emerald-300 transition-colors flex items-center justify-center space-x-2"
        >
          <div className="w-6 h-6"><TalkIcon /></div>
          <span>Need to talk?</span>
        </button>
        <button
          onClick={onGoBack}
          className="w-full mt-3 py-4 text-lg font-semibold text-white rounded-2xl bg-emerald-400 hover:bg-emerald-500 transition-colors"
        >
          Done
        </button>
      </footer>

      {helplineVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Help is Available</h2>
            <p className="text-center text-gray-600 mb-6">
              If you're in crisis or need immediate support, please reach out. You are not alone.
            </p>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <strong className="font-semibold text-gray-700 w-1/2">NCMH Crisis Hotline:</strong>
                <span className="text-gray-600">1553</span>
              </div>
              <div className="flex items-start">
                <strong className="font-semibold text-gray-700 w-1/2">In Touch Crisis Line:</strong>
                <span className="text-gray-600">0917-800-1123</span>
              </div>
              <div className="flex items-start">
                <strong className="font-semibold text-gray-700 w-1/2">Philippine Red Cross:</strong>
                <span className="text-gray-600">1158</span>
              </div>
            </div>
            <button
              onClick={() => setHelplineVisible(false)}
              className="mt-8 w-full py-3 text-lg font-semibold text-white rounded-xl bg-emerald-400 hover:bg-emerald-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheerUp;