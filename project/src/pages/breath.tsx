import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wind } from 'lucide-react';

interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold?: number;
  exhale: number;
  holdAfterExhale?: number;
  color: string;
}

const breathingTechniques: BreathingTechnique[] = [
  {
    id: '4-7-8',
    name: '4-7-8 Breathing',
    description: 'Reduces anxiety and helps with sleep. Inhale for 4, hold for 7, exhale for 8.',
    inhale: 4,
    hold: 7,
    exhale: 8,
    color: 'from-blue-400 to-indigo-600'
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Used by Navy SEALs for calm and focus. Equal counts of 4 for inhale, hold, exhale, and hold.',
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdAfterExhale: 4,
    color: 'from-purple-400 to-pink-600'
  },
  {
    id: 'relaxing',
    name: 'Relaxing Breath',
    description: 'Simple calming breath. Long inhale, longer exhale to activate the parasympathetic system.',
    inhale: 4,
    exhale: 6,
    color: 'from-green-400 to-emerald-600'
  }
];

const Breathing: React.FC = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdAfterExhale'>('inhale');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!isActive || !selectedTechnique) return;

    const timer = setInterval(() => {
      setCounter(prev => {
        const newCount = prev + 1;
        
        switch (phase) {
          case 'inhale':
            if (newCount >= selectedTechnique.inhale) {
              setPhase(selectedTechnique.hold ? 'hold' : 'exhale');
              return 0;
            }
            break;
          case 'hold':
            if (newCount >= (selectedTechnique.hold || 0)) {
              setPhase('exhale');
              return 0;
            }
            break;
          case 'exhale':
            if (newCount >= selectedTechnique.exhale) {
              setPhase(selectedTechnique.holdAfterExhale ? 'holdAfterExhale' : 'inhale');
              return 0;
            }
            break;
          case 'holdAfterExhale':
            if (newCount >= (selectedTechnique.holdAfterExhale || 0)) {
              setPhase('inhale');
              return 0;
            }
            break;
        }
        return newCount;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, selectedTechnique, phase]);

  const goBack = () => {
    if (selectedTechnique) {
      setSelectedTechnique(null);
      setIsActive(false);
    } else {
      window.history.back();
    }
  };

  const getInstructions = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'holdAfterExhale':
        return 'Hold';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={goBack}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {selectedTechnique ? 'Back to Techniques' : 'Back to Home'}
        </button>

        <h1 className="text-4xl font-bold text-center mb-12 gradient-text">
          Guided Breathing
        </h1>

        {!selectedTechnique ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {breathingTechniques.map((technique) => (
              <button
                key={technique.id}
                onClick={() => setSelectedTechnique(technique)}
                className={`bg-gradient-to-r ${technique.color} p-6 rounded-2xl text-left hover:scale-105 transition-transform`}
              >
                <Wind className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-bold mb-2">{technique.name}</h3>
                <p className="text-sm opacity-90">{technique.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">{selectedTechnique.name}</h2>
            <p className="text-gray-300 mb-8">{selectedTechnique.description}</p>

            <div className="relative w-64 h-64 mx-auto mb-8">
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${
                  selectedTechnique.color
                } transition-all duration-1000 flex items-center justify-center`}
                style={{
                  transform: `scale(${phase === 'inhale' ? 1 : phase === 'exhale' ? 0.5 : 0.75})`,
                }}
              >
                <div className="text-2xl font-bold">{getInstructions()}</div>
              </div>
              {isActive && (
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${selectedTechnique.color} opacity-20`}
                  style={{
                    animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                  }}
                />
              )}
            </div>

            <div className="text-4xl font-bold mb-8">{counter}</div>

            <button
              onClick={() => setIsActive(!isActive)}
              className={`px-8 py-4 rounded-full text-lg font-semibold transition-all ${
                isActive
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105'
              }`}
            >
              {isActive ? 'Stop' : 'Start'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Breathing;