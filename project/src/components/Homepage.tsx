import React, { useState } from 'react';
import {
  Heart,
  Shield,
  Brain,
  Sparkles,
  Clock,
  AlertCircle,
  Volume2,
  VolumeX,
  Info,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type SupportType = 'gentle' | 'motivational' | 'mindful' | 'reflective' | null;
type Mood = 'neutral' | 'down' | 'anxious' | 'okay' | 'grateful';
type Step = 'support' | 'mood' | 'prompt' | 'ready';

const quickStartPrompts = [
  "I've been feeling really anxious lately.",
  "I don't know what's wrong, just off.",
  "Can we do a calming exercise?",
  "I had a tough day."
];

const moodEmojis: Record<Mood, string> = {
  neutral: '😐',
  down: '😢',
  anxious: '😟',
  okay: '🙂',
  grateful: '😃'
};

function Homepage() {
  const navigate=useNavigate()
  const [currentStep, setCurrentStep] = useState<Step>('support');
  const [supportType, setSupportType] = useState<SupportType>(null);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleStepTransition = (nextStep: Step) => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setCurrentStep(nextStep);
    }, 300);
  };

  const handleSupportTypeSelect = (type: SupportType) => {
    setSupportType(type);
    handleStepTransition('mood');
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    handleStepTransition('prompt');
  };

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    handleStepTransition('ready');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative">
        {/* Sound Toggle */}
        <button 
          onClick={() => setIsSoundOn(!isSoundOn)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-200 transition-colors z-10"
        >
          {isSoundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        <div 
          className={`max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 transition-all duration-300 transform
            ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        >
          {/* Ambient Background Animation */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute w-96 h-96 rounded-full bg-purple-500/10 animate-pulse" 
                 style={{ top: '-50%', left: '-50%' }} />
            <div className="absolute w-96 h-96 rounded-full bg-blue-500/10 animate-pulse" 
                 style={{ bottom: '-50%', right: '-50%' }} />
          </div>

          {currentStep === 'support' && (
            <div className="relative z-10">
              <h1 className="text-2xl font-bold text-center mb-8 text-white">
                How would you like MindMesh to support you today?
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleSupportTypeSelect('gentle')}
                  className="p-6 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-all hover:scale-105 flex flex-col items-center gap-3"
                >
                  <Heart className="text-green-400 w-8 h-8" />
                  <span className="font-medium text-white">🌿 Gentle Listener</span>
                </button>
                <button
                  onClick={() => handleSupportTypeSelect('motivational')}
                  className="p-6 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-all hover:scale-105 flex flex-col items-center gap-3"
                >
                  <Sparkles className="text-orange-400 w-8 h-8" />
                  <span className="font-medium text-white">💪 Motivational Boost</span>
                </button>
                <button
                  onClick={() => handleSupportTypeSelect('mindful')}
                  className="p-6 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-all hover:scale-105 flex flex-col items-center gap-3"
                >
                  <Brain className="text-blue-400 w-8 h-8" />
                  <span className="font-medium text-white">🧘 Calm + Mindfulness</span>
                </button>
                <button
                  onClick={() => handleSupportTypeSelect('reflective')}
                  className="p-6 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-all hover:scale-105 flex flex-col items-center gap-3"
                >
                  <Clock className="text-purple-400 w-8 h-8" />
                  <span className="font-medium text-white">🤔 Help Me Reflect</span>
                </button>
              </div>
            </div>
          )}

          {currentStep === 'mood' && (
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-center mb-8 text-white">
                How are you feeling right now?
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(moodEmojis).map(([mood, emoji]) => (
                  <button
                    key={mood}
                    onClick={() => handleMoodSelect(mood as Mood)}
                    className="p-6 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-all hover:scale-105 flex flex-col items-center gap-3"
                  >
                    <span className="text-4xl">{emoji}</span>
                    <span className="text-white capitalize">{mood}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'prompt' && (
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-center mb-8 text-white">
                What would you like to talk about?
              </h2>
              <div className="space-y-3">
                {quickStartPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptSelect(prompt)}
                    className="w-full text-left p-4 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-all hover:scale-[1.02] text-white flex items-center justify-between group"
                  >
                    <span>{prompt}</span>
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'ready' && (
            <div className="relative z-10 text-center">
              <h2 className="text-2xl font-bold mb-6 text-white">Ready to begin</h2>
              <p className="text-gray-300 mb-8">
                Your space is prepared with {supportType === 'gentle' ? 'gentle' : 
                  supportType === 'motivational' ? 'motivational' :
                  supportType === 'mindful' ? 'mindful' : 'reflective'} support.
              </p>
              <button onClick={() => navigate('/home')} className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors text-lg font-medium">
                Start Chat
              </button>
            </div>
          )}

          {/* Privacy Note - Always visible */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400 relative z-10">
            <Shield size={16} />
            <span>Your chat is private and secure.</span>
            <button onClick={() => setShowPrivacyModal(true)}>
              <Info size={16} className="text-gray-500 hover:text-gray-300" />
            </button>
          </div>

          {/* Crisis Help Button - Always visible */}
          <button className="mt-4 w-full py-3 px-4 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2 relative z-10">
            <AlertCircle size={20} />
            I need urgent support
          </button>
        </div>

        {/* Privacy Modal */}
        {showPrivacyModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4 text-white">Your Privacy Matters</h2>
              <p className="mb-4 text-gray-300">
                We never store identifiable data or share your conversations. All chats are encrypted
                and automatically deleted after your session ends.
              </p>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;