import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface Song {
  title: string;
  url: string;
  color: string;
}

const Music: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songs: Song[] = [
    {
      title: "Peaceful Rain",
      url: "/src/pages/music_files/1.mp3", // Replace with your local file path
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Ocean Waves",
      url: "/src/pages/music_files/2.mp3",
      color: "from-teal-400 to-teal-600"
    },
    {
      title: "Forest Birds",
      url: "/src/pages/music_files/3.mp3",
      color: "from-green-400 to-green-600"
    },
    {
      title: "Gentle Stream",
      url: "/src/pages/music_files/4.mp3",
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "Night Crickets",
      url: "/src/pages/music_files/5.mp3",
      color: "from-indigo-400 to-indigo-600"
    }
  ];

  const handleTimeUpdate = (): void => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const togglePlay = (): void => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = (): void => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 0);
  };

  const playPrev = (): void => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 gradient-text">Ambient Sounds</h1>
        
        <div className="relative aspect-square max-w-lg mx-auto mb-8">
          {/* Animated Circles */}
          {isPlaying && (
            <>
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${songs[currentSong].color} opacity-20 animate-ping`} />
              <div className={`absolute inset-4 rounded-full bg-gradient-to-r ${songs[currentSong].color} opacity-20 animate-ping animation-delay-200`} />
              <div className={`absolute inset-8 rounded-full bg-gradient-to-r ${songs[currentSong].color} opacity-20 animate-ping animation-delay-400`} />
            </>
          )}
          
          {/* Center Circle */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${songs[currentSong].color} shadow-lg flex items-center justify-center`}>
            <h2 className="text-2xl font-bold text-white text-center p-4">
              {songs[currentSong].title}
            </h2>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${songs[currentSong].color}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-8">
          <button
            onClick={playPrev}
            className="p-4 hover:bg-gray-800 rounded-full transition-colors"
          >
            <SkipBack className="w-8 h-8" />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-12 h-12" />
            ) : (
              <Play className="w-12 h-12" />
            )}
          </button>
          
          <button
            onClick={playNext}
            className="p-4 hover:bg-gray-800 rounded-full transition-colors"
          >
            <SkipForward className="w-8 h-8" />
          </button>
        </div>

        {/* Song List */}
        <div className="mt-12 space-y-4">
          {songs.map((song, index) => (
            <button
              key={song.title}
              onClick={() => {
                setCurrentSong(index);
                setIsPlaying(true);
                setTimeout(() => audioRef.current?.play(), 0);
              }}
              className={`w-full p-4 rounded-lg flex items-center justify-between transition-all ${
                currentSong === index
                  ? `bg-gradient-to-r ${song.color}`
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <span className="font-medium">{song.title}</span>
              {currentSong === index && isPlaying && (
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-4 bg-white rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        <audio
          ref={audioRef}
          src={songs[currentSong].url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={playNext}
        />
      </div>
    </div>
  );
};

export default Music;