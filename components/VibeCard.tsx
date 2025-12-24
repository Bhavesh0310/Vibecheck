
import React from 'react';
import { User } from '../types';

interface VibeCardProps {
  user: User;
  currentUserKeywords: string[];
  onMatch: (user: User) => void;
}

const VibeCard: React.FC<VibeCardProps> = ({ user, currentUserKeywords, onMatch }) => {
  return (
    <div className="glass rounded-[4rem] overflow-hidden border border-white/10 group hover:border-indigo-500/50 transition-all duration-500 shadow-2xl">
      <div className="relative h-64">
        <img src={user.avatar} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" />
        <div className="absolute top-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-white border border-white/5">
          {user.distance}
        </div>
        <div className="absolute bottom-6 left-6 right-6">
           <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-[2rem]">
              <p className="text-white text-lg font-black italic text-center leading-tight uppercase">"{user.vibeDescription}"</p>
           </div>
        </div>
      </div>
      <div className="p-10 space-y-6">
        <div className="space-y-2">
          <h3 className="text-4xl font-black uppercase italic tracking-tighter">{user.name}</h3>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Signal Strength: <span className="text-indigo-400">Stable</span></p>
        </div>
        <button 
          onClick={() => onMatch(user)}
          className="w-full py-6 vibe-gradient rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          Check Compatibility
        </button>
      </div>
    </div>
  );
};

export default VibeCard;
