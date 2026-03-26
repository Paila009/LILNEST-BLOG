import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AmbientSoundControls = ({ 
  isSessionActive, 
  onSoundChange,
  className = "" 
}) => {
  const [selectedSound, setSelectedSound] = useState(null);
  const [volume, setVolume] = useState(0.3);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const ambientSounds = [
    {
      id: 'rain',
      name: 'Rain',
      icon: 'CloudRain',
      description: 'Gentle rainfall',
      color: 'text-blue-500'
    },
    {
      id: 'forest',
      name: 'Forest',
      icon: 'Trees',
      description: 'Birds & nature',
      color: 'text-green-500'
    },
    {
      id: 'ocean',
      name: 'Ocean',
      icon: 'Waves',
      description: 'Ocean waves',
      color: 'text-cyan-500'
    },
    {
      id: 'white-noise',
      name: 'White Noise',
      icon: 'Radio',
      description: 'Steady background',
      color: 'text-gray-500'
    },
    {
      id: 'cafe',
      name: 'Café',
      icon: 'Coffee',
      description: 'Coffee shop ambiance',
      color: 'text-amber-600'
    },
    {
      id: 'silence',
      name: 'Silence',
      icon: 'VolumeX',
      description: 'No background sound',
      color: 'text-muted-foreground'
    }
  ];

  useEffect(() => {
    if (selectedSound && selectedSound !== 'silence' && isSessionActive) {
      // In a real app, this would load and play the actual audio file
      setIsPlaying(true);
      onSoundChange?.(selectedSound);
    } else {
      setIsPlaying(false);
      onSoundChange?.(null);
    }
  }, [selectedSound, isSessionActive]);

  const handleSoundSelect = (soundId) => {
    setSelectedSound(soundId);
  };

  const togglePlayPause = () => {
    if (selectedSound === 'silence' || !selectedSound) return;
    
    setIsPlaying(!isPlaying);
    // In a real app, this would control actual audio playback
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    
    if (audioRef?.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className={`bg-card/30 backdrop-blur-sm border border-border rounded-xl p-4 space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="font-body font-medium text-foreground flex items-center space-x-2">
          <Icon name="Volume2" size={18} />
          <span>Ambient Sounds</span>
        </h4>
        
        {selectedSound && selectedSound !== 'silence' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlayPause}
            iconName={isPlaying ? "Pause" : "Play"}
            iconSize={16}
            className="organic-hover"
          />
        )}
      </div>
      {/* Sound Selection Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {ambientSounds?.map((sound) => (
          <button
            key={sound?.id}
            onClick={() => handleSoundSelect(sound?.id)}
            className={`p-3 rounded-lg border transition-all duration-200 text-center space-y-1 ${
              selectedSound === sound?.id
                ? 'bg-primary/10 border-primary/30 shadow-organic'
                : 'bg-muted/20 border-border hover:border-muted-foreground/30'
            }`}
          >
            <Icon 
              name={sound?.icon} 
              size={20} 
              className={selectedSound === sound?.id ? 'text-primary' : sound?.color}
            />
            <div className="text-xs font-caption text-foreground">
              {sound?.name}
            </div>
          </button>
        ))}
      </div>
      {/* Volume Control */}
      {selectedSound && selectedSound !== 'silence' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Volume</span>
            <span className="text-foreground font-mono">{Math.round(volume * 100)}%</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="VolumeX" size={16} className="text-muted-foreground" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <Icon name="Volume2" size={16} className="text-muted-foreground" />
          </div>
        </div>
      )}
      {/* Current Sound Info */}
      {selectedSound && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground pt-2 border-t border-border">
          <Icon name="Music" size={14} />
          <span>
            Playing: {ambientSounds?.find(s => s?.id === selectedSound)?.description || 'None'}
          </span>
          {isPlaying && selectedSound !== 'silence' && (
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-success rounded-full animate-gentle-pulse"></div>
              <span className="text-success text-xs">Live</span>
            </div>
          )}
        </div>
      )}
      {/* Hidden audio element for future implementation */}
      <audio ref={audioRef} loop />
    </div>
  );
};

export default AmbientSoundControls;