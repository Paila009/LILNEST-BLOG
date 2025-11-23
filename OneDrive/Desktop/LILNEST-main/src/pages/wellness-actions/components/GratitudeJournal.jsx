import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GratitudeJournal = () => {
  const [entries, setEntries] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [currentEntry, setCurrentEntry] = useState('');

  const prompts = [
    {
      question: "What made you smile today?",
      icon: "Smile",
      placeholder: "Share something that brought joy to your day..."
    },
    {
      question: "What's one positive thing that happened in the last 24 hours?",
      icon: "Sun",
      placeholder: "Reflect on a recent positive experience..."
    },
    {
      question: "Who or what are you thankful for right now?",
      icon: "Heart",
      placeholder: "Express gratitude for someone or something..."
    }
  ];

  const handleSubmitEntry = () => {
    if (currentEntry.trim()) {
      setEntries([
        ...entries,
        {
          prompt: prompts[currentPrompt].question,
          response: currentEntry,
          timestamp: new Date().toISOString()
        }
      ]);
      setCurrentEntry('');
      setCurrentPrompt((prev) => (prev + 1) % prompts.length);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Gratitude Journal</h2>
        <p className="text-muted-foreground">Reflect on the positives in your life</p>
      </div>

      <div className="space-y-6">
        {/* Current Prompt */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name={prompts[currentPrompt].icon} className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">{prompts[currentPrompt].question}</h3>
          </div>
          <textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder={prompts[currentPrompt].placeholder}
            className="w-full h-32 p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
          />
          <Button onClick={handleSubmitEntry} className="w-full mt-4">
            Save Entry
          </Button>
        </div>

        {/* Previous Entries */}
        {entries.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Recent Entries</h3>
            <div className="space-y-3">
              {entries.map((entry, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-4 space-y-2"
                >
                  <p className="text-sm text-muted-foreground">{entry.prompt}</p>
                  <p className="text-foreground">{entry.response}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(entry.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GratitudeJournal;