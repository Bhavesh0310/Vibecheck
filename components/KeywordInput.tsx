
import React, { useState } from 'react';
import Button from './Button';

interface KeywordInputProps {
  onComplete: (keywords: string[]) => void;
}

const MOOD_SUGGESTIONS = ['lonely af', 'bored to tears', 'certified yapper', 'delusional', 'starving', 'lowkey cooked'];

const KeywordInput: React.FC<KeywordInputProps> = ({ onComplete }) => {
  const [current, setCurrent] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  const addKeyword = (word: string) => {
    const trimmed = word.trim().toLowerCase();
    if (trimmed && !keywords.includes(trimmed) && keywords.length < 5) {
      setKeywords([...keywords, trimmed]);
      setCurrent('');
    }
  };

  const removeKeyword = (word: string) => {
    setKeywords(keywords.filter(k => k !== word));
  };

  const handleFinalSearch = () => {
    let finalKeywords = [...keywords];
    // Auto-add the currently typed word if user forgot to hit plus
    if (current.trim() && !finalKeywords.includes(current.trim().toLowerCase()) && finalKeywords.length < 5) {
      finalKeywords.push(current.trim().toLowerCase());
    }
    
    if (finalKeywords.length === 0) {
      alert("Bestie, you gotta add at least one vibe tag before we search!");
      return;
    }
    onComplete(finalKeywords);
  };

  return (
    <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="glass p-8 rounded-[3rem] space-y-8 border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
        <div className="flex flex-wrap gap-2.5 min-h-[60px] items-center justify-center">
          {keywords.map(k => (
            <span 
              key={k} 
              className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 animate-in zoom-in duration-300 ${
                MOOD_SUGGESTIONS.includes(k) 
                ? 'bg-white text-indigo-600 shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                : 'vibe-gradient text-white shadow-lg'
              }`}
            >
              #{k}
              <button onClick={() => removeKeyword(k)} className="hover:rotate-90 transition-transform">
                <i className="fas fa-times-circle"></i>
              </button>
            </span>
          ))}
          {keywords.length === 0 && <span className="text-slate-600 font-black uppercase tracking-tighter text-xs">Add some vibe tags below...</span>}
        </div>

        <div className="relative group">
          <input 
            type="text"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addKeyword(current)}
            placeholder="Type a vibe (e.g. delulu)..."
            className="w-full bg-slate-950/80 border-2 border-slate-800 rounded-3xl px-6 py-5 focus:outline-none focus:border-indigo-500 transition-all text-xl font-black placeholder:font-normal placeholder:text-slate-700 shadow-inner"
          />
          <button 
            onClick={() => addKeyword(current)}
            className="absolute right-3 top-3 h-12 w-12 rounded-2xl vibe-gradient flex items-center justify-center shadow-xl active:scale-90 transition-transform group-hover:scale-110"
            title="Add tag"
          >
            <i className="fas fa-plus text-xl"></i>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 text-center">Suggested Mindsets</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {MOOD_SUGGESTIONS.filter(s => !keywords.includes(s)).map(s => (
            <button 
              key={s}
              onClick={() => addKeyword(s)}
              className="px-5 py-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white hover:text-black hover:scale-110 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Button 
        fullWidth 
        onClick={handleFinalSearch}
        className="h-24 text-2xl rounded-[2.5rem] border-b-8 border-indigo-900 active:border-b-0 active:translate-y-2 shadow-[0_15px_40px_-10px_rgba(99,102,241,0.5)] flex flex-col leading-none"
      >
        <span className="mb-1 uppercase tracking-tighter italic">VIBE CHECK THE ROOM</span>
        <span className="text-[10px] font-black opacity-60 uppercase tracking-[0.3em]">Start the Search fr fr</span>
      </Button>
    </div>
  );
};

export default KeywordInput;
