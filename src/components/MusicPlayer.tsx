import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music as MusicIcon } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "CORRUPT_WAVE",
    artist: "NULL_PTR",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "#00ffff"
  },
  {
    id: 2,
    title: "VOID_SIGNAL",
    artist: "VOID_EXE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "#ff00ff"
  },
  {
    id: 3,
    title: "STATIC_NOISE",
    artist: "ERR_404",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "#ffff00"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const onEnded = () => {
    handleNext();
  };

  return (
    <div className="w-full max-w-[400px] bg-black border-4 border-glitch-yellow p-6 shadow-[8px_8px_0px_#00ffff]">
      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
      
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="w-12 h-12 flex items-center justify-center border-2 border-glitch-cyan"
          style={{ backgroundColor: currentTrack.color + '20' }}
        >
          <MusicIcon size={24} style={{ color: currentTrack.color }} />
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-pixel text-[10px] truncate glitch-text text-glitch-cyan" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="text-glitch-magenta text-[8px] mt-1">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 bg-zinc-900 border-2 border-glitch-yellow mb-6 overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: currentTrack.color }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button onClick={handlePrev} className="text-glitch-cyan hover:text-glitch-yellow transition-colors">
          <SkipBack size={20} />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-12 h-12 border-4 border-glitch-magenta flex items-center justify-center bg-black text-glitch-magenta hover:bg-glitch-magenta hover:text-black transition-all"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>

        <button onClick={handleNext} className="text-glitch-cyan hover:text-glitch-yellow transition-colors">
          <SkipForward size={20} />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-2 text-glitch-yellow text-[6px] justify-center uppercase tracking-widest">
        <Volume2 size={10} />
        <span>SIGNAL_STRENGTH: HIGH</span>
      </div>
    </div>
  );
};
