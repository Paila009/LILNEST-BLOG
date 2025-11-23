import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DailyAffirmation = () => {
  const [category, setCategory] = useState('');
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [customAffirmation, setCustomAffirmation] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);

  const categories = [
    {
      id: 'focus',
      label: 'Focus',
      icon: 'Target',
      color: 'text-blue-500',
      affirmations: [
        "I am focused and productive in all my tasks",
        "I have the power to concentrate deeply",
        "I complete my work with clarity and purpose"
      ]
    },
    {
      id: 'confidence',
      label: 'Confidence',
      icon: 'Shield',
      color: 'text-yellow-500',
      affirmations: [
        "I am capable of achieving great things",
        "I trust in my abilities and judgment",
        "I face challenges with courage and strength"
      ]
    },
    {
      id: 'relaxation',
      label: 'Relaxation',
      icon: 'Cloud',
      color: 'text-green-500',
      affirmations: [
        "I am calm and at peace",
        "I release tension and embrace tranquility",
        "I deserve rest and relaxation"
      ]
    }
  ];

  const handleCategorySelect = (categoryId) => {
    setCategory(categoryId);
    const selectedCategory = categories.find(c => c.id === categoryId);
    const randomAffirmation = selectedCategory.affirmations[
      Math.floor(Math.random() * selectedCategory.affirmations.length)
    ];
    setCurrentAffirmation(randomAffirmation);
  };

  const handleNewAffirmation = () => {
    const selectedCategory = categories.find(c => c.id === category);
    let newAffirmation;
    do {
      newAffirmation = selectedCategory.affirmations[
        Math.floor(Math.random() * selectedCategory.affirmations.length)
      ];
    } while (newAffirmation === currentAffirmation);
    setCurrentAffirmation(newAffirmation);
  };

  const handleSaveCustom = () => {
    if (customAffirmation.trim()) {
      setCurrentAffirmation(customAffirmation);
      setShowCustomForm(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Daily Affirmation</h2>
        <p className="text-muted-foreground">Boost your mindset with positive statements</p>
      </div>

      {!category ? (
        <div className="space-y-6">
          <h3 className="text-lg font-medium mb-4">Choose a category</h3>
          <div className="grid grid-cols-1 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className="p-4 rounded-xl border-2 border-border hover:border-primary transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg bg-card ${cat.color}`}>
                    <Icon name={cat.icon} className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium">{cat.label}</h4>
                    <p className="text-sm text-muted-foreground">
                      {cat.affirmations.length} affirmations
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : showCustomForm ? (
        <div className="space-y-6">
          <div className="space-y-4">
            <textarea
              value={customAffirmation}
              onChange={(e) => setCustomAffirmation(e.target.value)}
              placeholder="Write your own affirmation..."
              className="w-full h-32 p-4 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            />
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCustomForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveCustom}
                className="flex-1"
                disabled={!customAffirmation.trim()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute -top-2 -left-2">
              <Icon
                name={categories.find(c => c.id === category).icon}
                className={`w-6 h-6 ${categories.find(c => c.id === category).color}`}
              />
            </div>
            <div className="p-6 rounded-xl bg-card border border-border text-center">
              <p className="text-xl font-medium leading-relaxed">
                "{currentAffirmation}"
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setCategory('')}
              className="flex-1"
            >
              <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNewAffirmation}
              className="flex-1"
            >
              <Icon name="Refresh" className="w-4 h-4 mr-2" />
              New Affirmation
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={() => setShowCustomForm(true)}
            className="w-full"
          >
            <Icon name="Edit" className="w-4 h-4 mr-2" />
            Write Your Own
          </Button>
        </div>
      )}
    </div>
  );
};

export default DailyAffirmation;