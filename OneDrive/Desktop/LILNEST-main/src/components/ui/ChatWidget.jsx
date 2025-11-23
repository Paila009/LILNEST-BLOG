import React, { useState } from 'react';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! I am the LILNEST assistant. How can I help?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || '';
      const endpoint = apiUrl ? `${apiUrl}/api/chat` : '/api/chat';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: text }].slice(-12), model: 'llama-3.1-8b-instant' }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || 'Sorry, no reply.' }]);
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'There was an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button aria-label="Chat" onClick={() => setOpen(true)} className="fixed bottom-5 right-5 bg-primary text-primary-foreground rounded-full w-14 h-14 shadow-soft hover-lift">
        💬
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-card border border-border rounded-xl shadow-soft flex flex-col overflow-hidden">
      <div className="px-3 py-2 flex items-center justify-between bg-primary text-primary-foreground">
        <div className="font-semibold text-sm">LILNEST Assistant</div>
        <button onClick={() => setOpen(false)} className="text-primary-foreground/90">✕</button>
      </div>
      <div className="p-3 space-y-2 max-h-80 overflow-auto">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block px-3 py-2 rounded-lg ${m.role === 'user' ? 'bg-secondary text-foreground' : 'bg-muted text-foreground'}`}>{m.content}</div>
          </div>
        ))}
        {loading && <div className="text-sm text-muted-foreground">Thinking…</div>}
      </div>
      <div className="p-2 border-t border-border flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && send()} placeholder="Ask about fitness, diet, medicine…" className="flex-1 bg-input px-3 py-2 rounded-lg outline-none" />
        <button onClick={send} className="bg-primary text-primary-foreground px-3 rounded-lg">Send</button>
      </div>
    </div>
  );
};

export default ChatWidget;
