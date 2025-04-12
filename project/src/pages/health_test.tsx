import React, { useState } from 'react';
import { Brain, Sun, Cloud, CloudLightning, Moon, Rainbow } from 'lucide-react';

type Answer = {
  feeling?: number;
  overwhelmed?: string;
  enjoyment?: string;
  sleep?: string;
  socializing?: string;
  concentration?: string;
  appetite?: string;
  tired?: string;
  moodChanges?: string;
  hopeless?: string;
  reflection?: string;
};

function Health() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'feeling',
      question: 'On a scale of 1 to 10, how have you been feeling mentally in the past week?',
      type: 'scale',
    },
    {
      id: 'overwhelmed',
      question: 'How often have you felt overwhelmed or anxious in the last 7 days?',
      type: 'choice',
      options: ['Never', 'Occasionally', 'Frequently', 'Almost all the time'],
    },
    {
      id: 'enjoyment',
      question: 'Do you find it hard to enjoy things you once loved?',
      type: 'choice',
      options: ['Yes', 'No', 'Not sure'],
    },
    {
      id: 'sleep',
      question: 'How well are you sleeping these days?',
      type: 'choice',
      options: ['Great', 'Okay', 'Poor', 'Very disturbed or inconsistent'],
    },
    {
      id: 'socializing',
      question: 'Have you been socializing with friends/family or isolating more lately?',
      type: 'choice',
      options: ['Socializing actively', 'Somewhat social', 'Mostly isolated'],
    },
    {
      id: 'concentration',
      question: 'Do you find it hard to concentrate or stay focused on tasks?',
      type: 'choice',
      options: ['Not at all', 'Sometimes', 'Often', 'Very frequently'],
    },
    {
      id: 'appetite',
      question: 'How is your appetite these days?',
      type: 'choice',
      options: ['Normal', 'Increased', 'Decreased', 'Not eating properly at all'],
    },
    {
      id: 'tired',
      question: 'Have you been feeling physically tired or low on energy lately, even without much activity?',
      type: 'choice',
      options: ['Yes', 'No', 'Not sure'],
    },
    {
      id: 'moodChanges',
      question: 'Have you experienced sudden mood changes or emotional outbursts recently?',
      type: 'choice',
      options: ['Yes', 'No'],
    },
    {
      id: 'hopeless',
      question: 'Have you had thoughts of giving up or feeling hopeless?',
      type: 'choice',
      options: ['Never', 'Sometimes', 'Frequently', 'Prefer not to say'],
    },
    {
      id: 'reflection',
      question: "If you'd like to share, describe in a few words what's been on your mind most these days.",
      type: 'text',
    },
  ];

  const calculateResult = () => {
    const score = {
      feeling: answers.feeling || 5,
      overwhelmed: ['Never', 'Occasionally', 'Frequently', 'Almost all the time'].indexOf(answers.overwhelmed || ''),
      enjoyment: ['No', 'Not sure', 'Yes'].indexOf(answers.enjoyment || ''),
      sleep: ['Great', 'Okay', 'Poor', 'Very disturbed or inconsistent'].indexOf(answers.sleep || ''),
      socializing: ['Socializing actively', 'Somewhat social', 'Mostly isolated'].indexOf(answers.socializing || ''),
      concentration: ['Not at all', 'Sometimes', 'Often', 'Very frequently'].indexOf(answers.concentration || ''),
      hopeless: ['Never', 'Sometimes', 'Frequently', 'Prefer not to say'].indexOf(answers.hopeless || ''),
    };

    const totalScore = 
      (10 - score.feeling) + 
      score.overwhelmed * 2 + 
      score.enjoyment * 2 + 
      score.sleep * 2 + 
      score.socializing * 2 + 
      score.concentration * 2 + 
      score.hopeless * 3;

    if (totalScore < 10) return {
      icon: Rainbow,
      title: 'Mentally Balanced',
      description: "You're doing relatively well mentally. Keep doing what works for you, and always check in with yourself regularly.",
    };
    if (totalScore < 20) return {
      icon: Sun,
      title: 'Mildly Stressed',
      description: "You're experiencing normal stress that many go through. Try some deep breaths, a break, or a walk outside.",
    };
    if (totalScore < 30) return {
      icon: Cloud,
      title: 'Mentally Fatigued',
      description: "You're likely tired emotionally. Consider journaling, sleeping well, and talking to someone close.",
    };
    if (totalScore < 40) return {
      icon: CloudLightning,
      title: 'Highly Anxious',
      description: "You may be dealing with strong anxiety. Try grounding exercises and, if needed, talk to a professional.",
    };
    return {
      icon: Moon,
      title: 'At Risk of Burnout/Depression',
      description: "Your responses suggest signs of burnout or depression. You're not alone—seeking support is a strong step.",
    };
  };

  const handleAnswer = (answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer,
    }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const result = calculateResult();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full bg-gray-800 rounded-2xl shadow-2xl p-8 border border-blue-500/10">
        <div className="absolute inset-0 bg-blue-400/5 rounded-2xl backdrop-blur-3xl pointer-events-none" />
        {!started ? (
          <div className="text-center relative z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
            <Brain className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h1 className="text-3xl font-bold text-white mb-4">Mental Health Check-in</h1>
            <p className="text-blue-200/80 mb-8">
              Hi there, this is a quick and private mental health check-in. These questions are designed to help you reflect on how you're doing emotionally and mentally. Ready to begin?
            </p>
            <button
              onClick={() => setStarted(true)}
              className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Start Check-in
            </button>
          </div>
        ) : showResults ? (
          <div className="text-center relative z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
            <result.icon className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white mb-4">{result.title}</h2>
            <p className="text-blue-200/80 mb-8">{result.description}</p>
            <button
              onClick={() => {
                setStarted(false);
                setCurrentQuestion(0);
                setAnswers({});
                setShowResults(false);
              }}
              className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Start New Check-in
            </button>
          </div>
        ) : (
          <div className="relative z-10">
            <div className="mb-8">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white mb-6">
              {questions[currentQuestion].question}
            </h2>
            {questions[currentQuestion].type === 'scale' ? (
              <div className="grid grid-cols-10 gap-2">
                {[...Array(10)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i + 1)}
                    className="p-4 bg-gray-700 rounded hover:bg-blue-500/20 transition-all duration-300 font-semibold text-blue-200 hover:text-white border border-blue-500/20 hover:border-blue-500/40"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            ) : questions[currentQuestion].type === 'choice' ? (
              <div className="space-y-3">
                {questions[currentQuestion].options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-4 text-left bg-gray-700 rounded hover:bg-blue-500/20 transition-all duration-300 font-semibold text-blue-200 hover:text-white border border-blue-500/20 hover:border-blue-500/40"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <textarea
                  className="w-full p-4 bg-gray-700 border-2 border-blue-500/20 rounded-lg focus:border-blue-500/40 focus:outline-none text-blue-200 placeholder-blue-200/50"
                  rows={4}
                  placeholder="Share your thoughts..."
                  onChange={(e) => handleAnswer(e.target.value)}
                />
                <button
                  onClick={() => handleAnswer(answers.reflection || '')}
                  className="mt-4 bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Health;