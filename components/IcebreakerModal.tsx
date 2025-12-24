
import React, { useEffect, useState } from 'react';
import { User, MatchResult } from '../types';
import { getVibeAnalysis } from '../services/geminiService';
import Button from './Button';

interface IcebreakerModalProps {
  currentUserVibe: string;
  targetUser: User;
  onClose: () => void;
}

const IcebreakerModal: React.FC<IcebreakerModalProps> = ({ currentUserVibe, targetUser, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<MatchResult | null>(null);

  useEffect(() => {
    const analyze = async () => {
      setLoading(true);
      const data = await getVibeAnalysis(currentUserVibe, targetUser.vibeDescription);
      setResult(data);
      setLoading(false);
    };
    analyze();
  }, [currentUserVibe, targetUser]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="w-full max-w-xl glass border-8 border-indigo-500/40 rounded-[5rem] overflow-hidden shadow-[0_0_150px_rgba(99,102,241,0.4)]">
        <div className="p-10 sm:p-14 space-y-12 text-center">
          {loading ? (
            <div className="py-24 space-y-8 flex flex-col items-center">
              <div className="h-24 w-24 border-8 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-indigo-400 font-black uppercase tracking-[0.5em] text-sm animate-pulse">Scanning the chaos...</p>
            </div>
          ) : result ? (
            <div className="space-y-12 animate-in zoom-in duration-500">
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-8xl font-black text-transparent bg-clip-text vibe-gradient italic leading-none">{result.vibeScore}%</div>
                  <h2 className="text-xl font-black uppercase tracking-[0.4em] text-white/80">{result.commonVibe}</h2>
                </div>
                
                <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 shadow-2xl">
                  <div className="h-2 w-2 rounded-full bg-pink-500 animate-ping"></div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-pink-400">Target is {targetUser.distance} away</span>
                </div>
              </div>

              <div className="vibe-gradient p-1.5 rounded-[4rem] shadow-[0_0_80px_rgba(99,102,241,0.5)]">
                <div className="bg-[#020617] rounded-[3.8rem] p-10 space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/5 pointer-events-none"></div>
                  
                  <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="h-20 w-20 bg-indigo-500 rounded-3xl flex items-center justify-center animate-bounce shadow-[0_0_40px_rgba(99,102,241,0.8)]">
                      <i className="fas fa-bullhorn text-white text-4xl"></i>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-indigo-400 italic">FUNNY SHOUT WORD:</h3>
                  </div>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="p-8 bg-white/5 rounded-[2.5rem] border-2 border-dashed border-indigo-500/30 scale-105">
                      <p className="text-5xl sm:text-6xl font-black text-white uppercase tracking-tighter italic leading-none drop-shadow-2xl">
                        "{result.shoutPhrase.toUpperCase()}"
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Execution Manual:</p>
                      <p className="text-lg font-bold text-indigo-100 italic px-4 leading-snug">
                        "{result.instructions}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">
                    Find {targetUser.name.split(' ')[0]} by the sound of chaos.
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">No appearance clues allowed. Trust the vibe.</p>
                  <Button fullWidth onClick={onClose} className="h-24 text-2xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(99,102,241,0.6)]">
                    LETS GET LOUD FR <i className="fas fa-bolt-lightning ml-3 animate-pulse"></i>
                  </Button>
                </div>
                <button onClick={onClose} className="text-slate-600 font-black uppercase tracking-widest text-xs hover:text-white transition-colors underline decoration-slate-800 underline-offset-8">
                  I'm actually a coward (Cancel)
                </button>
              </div>
            </div>
          ) : (
            <div className="py-20">
              <p className="text-pink-500 font-black">AI fumbled the bag. Try again.</p>
              <Button onClick={onClose} className="mt-8">Back</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IcebreakerModal;
