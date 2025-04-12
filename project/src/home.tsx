import React, { useState } from 'react';
import { 
  Brain, 
  Shield, 
  MessageCircle, 
  Sparkles, 
  Heart, 
  Lock,
  ChevronRight,
  Wind,
  PenLine,
  Music,
  LineChart,
  Timer
} from 'lucide-react';
import ChatModal from './components/ChatModal';
import MusicPage from './pages/Music';
import HealthPage from './pages/health_test'
import BreathingPage from './pages/breath'


function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showMusicPage, setShowMusicPage] = useState(false);
  const [showHealthPage, setShowHealthPage] = useState(false);
  const [showBreathingPage, setShowBreathingPage] = useState(false);




  const openChat = () => setIsChatOpen(true);
  const toggleMusicPage = () => setShowMusicPage(!showMusicPage);
  const toggleHealthPage = () => setShowHealthPage(!showHealthPage);
  const toggleBreathingPage = () => setShowBreathingPage(!showBreathingPage);


  if (showMusicPage) {
    return <MusicPage />;
  }

  
  if (showHealthPage) {
    return <HealthPage />;
  }

  
  if (showBreathingPage) {
    return <BreathingPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight gradient-text animate-fade-in sm:text-6xl">
              Your AI-powered mental health companion.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 animate-slide-up">
              A safe space to talk, reflect, and heal — whenever you need it.
            </p>
            <div className="mt-10">
              <button
                onClick={openChat}
                className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Start Talking
              </button>
            </div>
          </div>
        </div>
      </section>

      
      {/* Healing Tools */}
      <section className="bg-gray-800/30 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight gradient-text">
            Personalized Healing Tools
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: Wind, title: 'Guided Breathing', onClick: toggleBreathingPage },
              { icon: PenLine, title: 'Gratitude Journal' },
              { icon: Music, title: 'Ambient Sounds', onClick: toggleMusicPage },
              { icon: Sparkles, title: 'Mental Health Test', onClick: toggleHealthPage},
              { icon: Timer, title: 'Mood History Graph' }
            ].map((tool, idx) => (
              <div
                key={tool.title}
                onClick={tool.onClick}
                className="group flex flex-col items-center rounded-xl bg-gray-800/30 p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/40 hover:scale-105 cursor-pointer"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <tool.icon className="h-8 w-8 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-4 text-sm font-medium text-gray-300">{tool.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talk to AI Section */}
      <section className="bg-gray-800/50 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight gradient-text">
                Open a conversation with an AI that listens without judgment
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                It's like texting a friend who always understands.
              </p>
              <div className="mt-8">
                <button
                  onClick={openChat}
                  className="inline-flex items-center rounded-full bg-blue-600/20 px-6 py-3 text-base font-semibold text-blue-400 transition-all duration-300 hover:bg-blue-600/30 hover:scale-105"
                >
                  Start Chat
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="rounded-2xl bg-gray-800/40 p-8 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-200">
                    I've been feeling overwhelmed lately...
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="rounded-lg bg-gray-700/50 px-4 py-2 text-sm text-gray-200 shadow backdrop-blur-sm">
                    I hear you, and it's completely normal to feel that way. Would you like to talk about what's been contributing to these feelings?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight gradient-text">
              Your Privacy is Our Priority
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Lock,
                  title: "End-to-End Security",
                  description: "All data is encrypted in transit and at rest."
                },
                {
                  icon: Shield,
                  title: "No Identity Needed",
                  description: "Use MindMesh anonymously. No email required."
                },
                {
                  icon: Lock,
                  title: "No Data Selling",
                  description: "We never sell or share your data with advertisers."
                }
              ].map((item, index) => (
                <div key={item.title} 
                  className="group rounded-xl bg-gray-800/30 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/40 hover:scale-105"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <item.icon className="mx-auto h-12 w-12 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="mt-6 text-lg font-semibold text-gray-100">{item.title}</h3>
                  <p className="mt-2 text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How MindMesh Helps */}
      <section className="bg-gray-800/30 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight gradient-text">
            How MindMesh Helps
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Brain,
                title: 'Check In',
                description: 'Daily mood check-ins to reflect on your emotions.'
              },
              {
                icon: PenLine,
                title: 'Journal',
                description: 'Write freely and track your mental patterns over time.'
              },
              {
                icon: MessageCircle,
                title: 'AI Support',
                description: '24/7 compassionate conversations with an emotionally intelligent AI.'
              },
              {
                icon: LineChart,
                title: 'Insights',
                description: 'Understand what triggers your moods and how to feel better.'
              },
              {
                icon: Heart,
                title: 'Crisis Response',
                description: "Get instant access to professional resources if you're in distress."
              }
            ].map((feature, index) => (
              <div 
                key={feature.title} 
                className="group rounded-xl bg-gray-800/30 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/40 hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <feature.icon className="h-12 w-12 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-6 text-lg font-semibold text-gray-100">{feature.title}</h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              "I opened up to MindMesh when I couldn't talk to anyone else. It made me feel understood.",
              "The check-ins helped me realize how much I was bottling up.",
              "It's the first time I've tracked how I actually feel each week."
            ].map((quote, idx) => (
              <blockquote
                key={idx}
                className="group rounded-2xl bg-gray-800/30 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/40 hover:scale-105"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <p className="text-lg text-gray-300">"{quote}"</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight gradient-text">
              Your mental health matters. Start the journey today.
            </h2>
            <div className="mt-10">
              <button
                onClick={openChat}
                className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Talk to MindMesh Now
              </button>
              <p className="mt-4 text-gray-400">No pressure. No sign-up. Just a conversation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-6">
            {['About', 'FAQ', 'Contact', 'Privacy Policy'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-400 transition-colors hover:text-gray-200"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-center text-xs text-gray-500">
              MindMesh is not a substitute for professional therapy or crisis care.
              If you're experiencing a mental health emergency, please contact your local emergency services
              or call the National Suicide Prevention Lifeline at 988.
            </p>
          </div>
        </div>
      </footer>

      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default Home;