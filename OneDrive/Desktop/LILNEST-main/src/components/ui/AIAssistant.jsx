import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [placeholder, setPlaceholder] = useState('Ask about fitness, diet, milestones…');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Rotating placeholders
  const placeholders = [
    'Ask about fitness, diet, milestones…',
    'How can I support you today?',
    'Need help with baby development?',
    'Questions about your pregnancy week?',
    'Looking for emotional support?'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(prev => {
        const currentIndex = placeholders.indexOf(prev);
        const nextIndex = (currentIndex + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          type: 'ai',
          content: "Hi there! 👋 I'm your LILNEST Assistant. I'm here to guide you through every step of your pregnancy and parenting journey. How can I support you today?",
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen]);

  const quickActionChips = [
    { label: 'Fitness Plan', icon: 'Dumbbell', action: 'fitness' },
    { label: 'Diet Tips', icon: 'Utensils', action: 'diet' },
    { label: 'Baby Milestones', icon: 'Baby', action: 'milestones' },
    { label: 'Pregnancy Week', icon: 'Calendar', action: 'week' },
    { label: 'Medicine', icon: 'Pill', action: 'medicine' },
    { label: 'Sleep Help', icon: 'Moon', action: 'sleep' },
    { label: 'Emotional Support', icon: 'Heart', action: 'emotional' },
    { label: 'Time Capsule', icon: 'Gift', action: 'capsule' },
    { label: 'Find Expert', icon: 'UserCheck', action: 'expert' }
  ];

  const handleChipClick = (action) => {
    const responses = {
      fitness: {
        question: 'Show me fitness plans',
        answer: "Great! I have personalized fitness plans for you. Based on your pregnancy stage, here's what I recommend:\n\n✨ **Week 22 Safe Exercises:**\n• Prenatal yoga (20 mins)\n• Light walking (30 mins)\n• Pelvic floor exercises\n• Gentle stretching\n\nWould you like me to create a weekly fitness schedule for you?",
        actions: [
          { label: 'Create Schedule', icon: 'Calendar', link: '/fitness' },
          { label: 'View Exercises', icon: 'Play', link: '/fitness' }
        ]
      },
      diet: {
        question: 'Give me diet recommendations',
        answer: "Absolutely! Here are personalized nutrition tips for Week 22:\n\n🥗 **Essential Nutrients:**\n• Iron-rich foods (spinach, lentils)\n• Calcium (dairy, fortified milk)\n• Omega-3 (salmon, walnuts)\n• Folate (leafy greens)\n\n💧 **Hydration:** 8-10 glasses of water daily\n\nWould you like a detailed meal plan?",
        actions: [
          { label: 'Get Meal Plan', icon: 'Utensils', link: '/diet' },
          { label: 'Food Scanner', icon: 'Camera', link: '/diet/food-safety-scanner' }
        ]
      },
      milestones: {
        question: 'Tell me about baby milestones',
        answer: "Your baby is growing beautifully! Here's what's happening:\n\n👶 **Week 22 Development:**\n• Baby can hear your voice now!\n• Developing taste buds\n• Growing eyebrows and hair\n• About 11 inches long\n\nWould you like to see the 3D visualization?",
        actions: [
          { label: 'View 3D Baby', icon: 'Cube', link: '/visualizer' },
          { label: 'Track Growth', icon: 'BarChart3', link: '/growth' }
        ]
      },
      week: {
        question: 'What\'s happening this week?',
        answer: "You're in **Week 22** of your pregnancy journey! 🌟\n\n**Your Body:**\n• Your baby bump is really showing now\n• You might feel increased appetite\n• Possible leg cramps at night\n\n**Your Baby:**\n• Can hear sounds from outside\n• Practicing breathing movements\n• Developing unique fingerprints\n\n**This Week's Tips:**\n• Start thinking about baby names\n• Consider prenatal classes\n• Stay active with safe exercises",
        actions: [
          { label: 'View Visualizer', icon: 'Cube', link: '/visualizer' },
          { label: 'Save to Capsule', icon: 'Gift', link: '/time-capsule' }
        ]
      },
      medicine: {
        question: 'Help with medicine reminders',
        answer: "I can help you manage your medications! 💊\n\n**Current Reminders:**\n• Prenatal vitamins (Daily, 9 AM)\n• Iron supplement (Daily, 2 PM)\n• Calcium (Daily, 8 PM)\n\nWould you like to add a new medication or adjust timing?",
        actions: [
          { label: 'Add Medicine', icon: 'Plus', link: '/medicine' },
          { label: 'View Schedule', icon: 'Calendar', link: '/medicine' }
        ]
      },
      sleep: {
        question: 'I need help with sleep',
        answer: "Sleep challenges are common during pregnancy. Here's how I can help:\n\n😴 **Sleep Tips for Week 22:**\n• Sleep on your left side\n• Use pregnancy pillow\n• Avoid caffeine after 2 PM\n• Establish bedtime routine\n• Light snack before bed\n\nWould you like to connect with a sleep specialist?",
        actions: [
          { label: 'Find Sleep Expert', icon: 'UserCheck', link: '/marketplace' },
          { label: 'Relaxation Guide', icon: 'Moon', action: 'relaxation' }
        ]
      },
      emotional: {
        question: 'I need emotional support',
        answer: "You're doing an amazing job. 💗 Pregnancy can be overwhelming, and it's completely normal to need support.\n\n**I'm here to help:**\n• Talk through your feelings\n• Connect with other moms\n• Find professional support\n• Practice mindfulness\n\nWould you like to join our supportive community or speak with a counselor?",
        actions: [
          { label: 'Join Community', icon: 'Users', link: '/community' },
          { label: 'Find Counselor', icon: 'Heart', link: '/marketplace' }
        ]
      },
      capsule: {
        question: 'Tell me about Time Capsule',
        answer: "Time Capsule is a beautiful way to preserve memories for your child! 🎁\n\n**Create special messages:**\n• First day home letter\n• Birthday messages\n• Milestone moments\n• Pregnancy reflections\n\nThese memories will unlock on special dates in your child's future. Would you like to create your first capsule?",
        actions: [
          { label: 'Create Capsule', icon: 'Plus', link: '/time-capsule' },
          { label: 'View Templates', icon: 'FileText', link: '/time-capsule' }
        ]
      },
      expert: {
        question: 'I need to find an expert',
        answer: "I can connect you with trusted professionals! 👩‍⚕️\n\n**Available Experts:**\n• Obstetricians\n• Nutritionists\n• Sleep trainers\n• Lactation consultants\n• Mental health counselors\n• Fitness coaches\n\nWhat type of expert would you like to connect with?",
        actions: [
          { label: 'Browse Experts', icon: 'Store', link: '/marketplace' },
          { label: 'Book Consultation', icon: 'Calendar', link: '/marketplace' }
        ]
      }
    };

    const response = responses[action];
    if (response) {
      handleSendMessage(response.question, response.answer, response.actions);
    }
  };

  const handleSendMessage = async (userMsg = inputValue, aiResponse = null, actions = null) => {
    if (!userMsg.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: userMsg,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Show typing indicator
    setIsTyping(true);

    try {
      // If aiResponse is provided (from quick chips), use it
      if (aiResponse) {
        setTimeout(() => {
          setIsTyping(false);
          const aiMessage = {
            type: 'ai',
            content: aiResponse,
            timestamp: new Date(),
            actions: actions || null
          };
          setMessages(prev => [...prev, aiMessage]);
        }, 1000);
        return;
      }

      // Otherwise, call real Groq API
      const apiUrl = import.meta.env.VITE_API_BASE_URL || '';
      const endpoint = apiUrl ? `${apiUrl}/api/chat` : '/api/chat';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are LILNEST Assistant, a warm, caring, and intelligent AI companion for mothers and expecting parents. You provide guidance on:
- Pregnancy stages and baby development
- Fitness and exercise during pregnancy
- Nutrition and diet recommendations
- Medicine reminders and health tracking
- Baby milestones and growth
- Emotional support and mental wellness
- Sleep advice for mothers and babies

Always be:
- Warm, empathetic, and encouraging
- Medically safe (include disclaimers when appropriate)
- Supportive and positive
- Brief but helpful (2-4 sentences)
- Contextually aware (the user is in Week 22 of pregnancy)

Important: Always end relevant responses by suggesting app features like:
- "Would you like to see the 3D visualizer?"
- "I can connect you with an expert."
- "Would you like to save this to your Time Capsule?"
- "Join our community to connect with other moms."

Keep responses concise, warm, and actionable.`
            },
            {
              role: 'user',
              content: userMsg
            }
          ],
          model: 'llama-3.1-70b-versatile',
          temperature: 0.7
        }),
      });

      const data = await response.json();
      setIsTyping(false);

      const aiMessage = {
        type: 'ai',
        content: data.reply || "I'm here to help! Could you tell me more about what you need?",
        timestamp: new Date(),
        actions: generateContextualActions(userMsg)
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setIsTyping(false);
      console.error('AI Error:', error);
      
      // Fallback to local responses if API fails
      const aiMessage = {
        type: 'ai',
        content: generateAIResponse(userMsg),
        timestamp: new Date(),
        actions: generateContextualActions(userMsg)
      };
      setMessages(prev => [...prev, aiMessage]);
    }
  };

  const generateAIResponse = (question) => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('week') || lowerQ.includes('pregnancy')) {
      return "You're in Week 22! Your baby can now hear your voice and is developing rapidly. Would you like to see what's happening this week in the 3D visualizer?";
    }
    if (lowerQ.includes('tired') || lowerQ.includes('sleep') || lowerQ.includes('rest')) {
      return "Fatigue is very common during pregnancy. Try to rest when you can, stay hydrated, and consider gentle prenatal yoga. Would you like me to connect you with a sleep specialist?";
    }
    if (lowerQ.includes('eat') || lowerQ.includes('food') || lowerQ.includes('diet')) {
      return "Great question! At this stage, focus on iron-rich foods, calcium, and plenty of water. I can create a personalized meal plan for you. Would you like that?";
    }
    if (lowerQ.includes('exercise') || lowerQ.includes('fitness') || lowerQ.includes('workout')) {
      return "Safe exercises for Week 22 include prenatal yoga, walking, and swimming. Avoid high-impact activities. Would you like me to create a weekly fitness schedule?";
    }
    if (lowerQ.includes('baby') || lowerQ.includes('development') || lowerQ.includes('growing')) {
      return "Your baby is developing beautifully! At Week 22, your baby can hear sounds and is practicing breathing. Want to see the 3D visualization?";
    }
    if (lowerQ.includes('worried') || lowerQ.includes('anxious') || lowerQ.includes('scared')) {
      return "It's completely normal to feel this way. You're doing wonderfully. Would you like to connect with our supportive community or speak with a counselor?";
    }
    
    return "I'm here to help! I can assist with fitness plans, diet advice, baby development, medicine reminders, emotional support, and more. What would you like to know more about?";
  };

  const generateContextualActions = (question) => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('week') || lowerQ.includes('pregnancy')) {
      return [
        { label: 'View 3D Baby', icon: 'Cube', link: '/visualizer' },
        { label: 'Track Growth', icon: 'BarChart3', link: '/growth' }
      ];
    }
    if (lowerQ.includes('sleep') || lowerQ.includes('tired')) {
      return [
        { label: 'Find Expert', icon: 'UserCheck', link: '/marketplace' },
        { label: 'Relaxation Tips', icon: 'Moon', action: 'relaxation' }
      ];
    }
    if (lowerQ.includes('diet') || lowerQ.includes('food')) {
      return [
        { label: 'Meal Planner', icon: 'Utensils', link: '/diet' },
        { label: 'Food Scanner', icon: 'Camera', link: '/diet/food-safety-scanner' }
      ];
    }
    if (lowerQ.includes('exercise') || lowerQ.includes('fitness')) {
      return [
        { label: 'Fitness Plans', icon: 'Dumbbell', link: '/fitness' },
        { label: 'Create Schedule', icon: 'Calendar', link: '/fitness' }
      ];
    }
    if (lowerQ.includes('community') || lowerQ.includes('moms')) {
      return [
        { label: 'Join Community', icon: 'Users', link: '/community' }
      ];
    }
    
    return null;
  };

  const handleActionClick = (action) => {
    if (action.link) {
      navigate(action.link);
      setIsOpen(false);
    } else if (action.action === 'relaxation') {
      handleChipClick('sleep');
    }
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative w-16 h-16 bg-gradient-to-br from-primary to-pink-500 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            {/* Pulsing ring animation */}
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/50 to-pink-500/50 blur-xl"></div>
            
            {/* Icon */}
            <div className="relative">
              <Icon name="MessageCircle" className="w-7 h-7 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Need help? I'm here! 💗
            </div>
          </button>
        ) : null}
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[420px] h-[650px] bg-card rounded-3xl shadow-2xl border-2 border-primary/20 z-50 flex flex-col overflow-hidden animate-slide-up">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-pink-500/10 rounded-3xl blur-2xl -z-10"></div>

          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary to-pink-500 p-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="Sparkles" className="w-6 h-6 text-primary" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                
                <div>
                  <h3 className="text-white font-bold text-lg">LILNEST Assistant</h3>
                  <p className="text-white/80 text-xs">Here to help 24/7</p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <Icon name="X" className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Quick Action Chips */}
          <div className="p-4 border-b border-border">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20">
              {quickActionChips.map((chip, index) => (
                <button
                  key={index}
                  onClick={() => handleChipClick(chip.action)}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-full text-sm font-medium text-foreground transition-all hover:scale-105"
                >
                  <Icon name={chip.icon} className="w-4 h-4 text-primary" />
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl p-4 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-br from-primary to-pink-500 text-white'
                        : 'bg-muted border border-border'
                    } animate-fade-in`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                  </div>
                  
                  {/* Action buttons for AI messages */}
                  {message.type === 'ai' && message.actions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleActionClick(action)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-card hover:bg-primary/10 border border-primary/30 rounded-full text-xs font-medium transition-all hover:scale-105"
                        >
                          <Icon name={action.icon} className="w-3.5 h-3.5 text-primary" />
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mt-2 px-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted border border-border rounded-2xl px-5 py-3 animate-fade-in">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Safety Disclaimer */}
          <div className="px-4 py-2 bg-amber-500/10 border-t border-amber-500/20">
            <div className="flex items-start gap-2">
              <Icon name="AlertCircle" className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                AI guidance only. Not a substitute for professional medical advice.
              </p>
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 bg-muted border-2 border-border focus:border-primary rounded-2xl outline-none transition-all text-sm"
                />
              </div>
              
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="w-12 h-12 bg-gradient-to-br from-primary to-pink-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-pink-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Icon name="Send" className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(244, 63, 94, 0.3);
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(244, 63, 94, 0.5);
        }
      `}</style>
    </>
  );
};

export default AIAssistant;
