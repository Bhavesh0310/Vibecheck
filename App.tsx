
import React, { useState, useMemo } from 'react';
import { AppState, User } from './types';
import { MOCK_USERS } from './constants';
import { generateNearbyPeeps } from './services/geminiService';
import Button from './components/Button';
import VibeCard from './components/VibeCard';
import IcebreakerModal from './components/IcebreakerModal';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.LANDING);
  const [currentSpot, setCurrentSpot] = useState("");
  const [vibeWords, setVibeWords] = useState("");
  const [userName, setUserName] = useState("");
  const [userCompanyCount, setUserCompanyCount] = useState(1);
  const [nearbyPeople, setNearbyPeople] = useState<User[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<User | null>(null);

  const startSetup = () => setState(AppState.SETUP);
  
  const handleVibeCheck = async () => {
    const wordCount = vibeWords.trim().split(/\s+/).length;
    if (!currentSpot || !userName) {
      alert("Names and spots, bestie. Fill 'em in.");
      return;
    }
    if (wordCount !== 5) {
      alert(`EXACTLY 5 words. You gave me ${wordCount}. No more, no less. Fix the vibe.`);
      return;
    }
    
    setState(AppState.DISCOVERY);
    setIsScanning(true);
    
    try {
      const peeps = await generateNearbyPeeps(vibeWords, currentSpot);
      setNearbyPeople(peeps.length > 0 ? peeps : MOCK_USERS);
    } catch (e) {
      setNearbyPeople(MOCK_USERS);
    } finally {
      setTimeout(() => setIsScanning(false), 3000);
    }
  };

  const renderContent = () => {
    if (isScanning) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[75vh] space-y-12 animate-in fade-in zoom-in duration-700">
          <div className="relative h-64 w-64 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-dashed border-indigo-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-8 border-2 border-pink-500/20 rounded-full animate-[ping_2s_linear_infinite]"></div>
            <div className="h-40 w-40 vibe-gradient rounded-[3rem] flex items-center justify-center shadow-2xl rotate-12">
              <i className="fas fa-radar text-5xl text-white animate-pulse"></i>
            </div>
          </div>
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Locating the <span className="text-indigo-400">fam...</span></h2>
            <p className="text-slate-500 text-sm font-black uppercase tracking-widest opacity-60">Scanning {currentSpot} for matches</p>
          </div>
        </div>
      );
    }

    switch (state) {
      case AppState.LANDING:
        return (
          <div className="flex flex-col items-center justify-center min-h-[85vh] text-center space-y-12 px-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-white/10 text-xs font-black uppercase tracking-widest text-indigo-400">
                <i className="fas fa-volume-up"></i> Meet IRL or nothing
              </div>
              <h1 className="text-8xl font-black tracking-tighter leading-[0.85] uppercase italic">
                VIBE <br/> CHECK
              </h1>
              <p className="text-slate-400 max-w-sm mx-auto text-xl font-bold">
                Find your match with 5 words. Shout their name to meet. Deadass simple.
              </p>
            </div>
            <Button onClick={startSetup} className="h-24 px-16 text-2xl rounded-[2.5rem] shadow-2xl">
              GO FORTH FR <i className="fas fa-arrow-right ml-4"></i>
            </Button>
          </div>
        );

      case AppState.SETUP:
        return (
          <div className="flex flex-col items-center justify-center min-h-[85vh] px-8 max-w-2xl mx-auto space-y-12 py-10">
            <div className="w-full space-y-10 animate-in fade-in duration-500">
              <div className="text-center">
                <h2 className="text-5xl font-black uppercase italic tracking-tighter">WHO ARE <span className="text-indigo-400">YOU?</span></h2>
              </div>

              <div className="space-y-6">
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your Name (Real ones only)"
                  className="w-full bg-slate-900 border-4 border-slate-800 rounded-3xl px-8 py-6 focus:outline-none focus:border-indigo-500 text-2xl font-black placeholder:text-slate-700"
                />
                <input 
                  type="text" 
                  value={currentSpot}
                  onChange={(e) => setCurrentSpot(e.target.value)}
                  placeholder="Where are you? (e.g. Starbucks)"
                  className="w-full bg-slate-900 border-4 border-slate-800 rounded-3xl px-8 py-6 focus:outline-none focus:border-pink-500 text-2xl font-black placeholder:text-slate-700"
                />
                <div className="space-y-3">
                  <div className="flex justify-between px-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">5 Words to describe your vibe</label>
                    <span className={`text-xs font-black ${vibeWords.trim().split(/\s+/).filter(Boolean).length === 5 ? 'text-green-500' : 'text-pink-500'}`}>
                      {vibeWords.trim().split(/\s+/).filter(Boolean).length}/5
                    </span>
                  </div>
                  <input 
                    type="text" 
                    value={vibeWords}
                    onChange={(e) => setVibeWords(e.target.value)}
                    placeholder="e.g. Coding hard and drinking matcha"
                    className="w-full bg-slate-950 border-4 border-slate-800 rounded-3xl px-8 py-6 focus:outline-none focus:border-indigo-500 text-xl font-bold placeholder:text-slate-800 italic"
                  />
                </div>
              </div>

              <Button fullWidth onClick={handleVibeCheck} className="h-24 text-2xl rounded-[3rem]">
                CHECK THE ROOM FR FR
              </Button>
            </div>
          </div>
        );

      case AppState.DISCOVERY:
        return (
          <div className="space-y-16 px-8 py-20 max-w-7xl mx-auto">
            <header className="flex flex-col gap-4">
               <h2 className="text-6xl font-black tracking-tighter uppercase italic">{currentSpot}</h2>
               <div className="flex items-center gap-4">
                 <span className="text-indigo-400 font-black uppercase tracking-widest text-xs">Your vibe:</span>
                 <p className="px-6 py-2 bg-white text-indigo-900 rounded-2xl text-sm font-black italic">"{vibeWords}"</p>
               </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {nearbyPeople.map(user => (
                <VibeCard 
                  key={user.id} 
                  user={user} 
                  currentUserKeywords={vibeWords.split(' ')}
                  onMatch={(u) => setSelectedMatch(u)} 
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden">
      <nav className="p-8 flex items-center justify-between border-b border-white/5 glass sticky top-0 z-50">
        <div onClick={() => setState(AppState.LANDING)} className="flex items-center gap-4 cursor-pointer">
          <div className="h-10 w-10 vibe-gradient rounded-xl flex items-center justify-center rotate-12">
            <i className="fas fa-bolt text-white"></i>
          </div>
          <span className="font-black text-2xl uppercase italic tracking-tighter">VibeCheck</span>
        </div>
      </nav>

      <main>{renderContent()}</main>

      {selectedMatch && (
        <IcebreakerModal 
          currentUserVibe={vibeWords}
          targetUser={selectedMatch} 
          onClose={() => setSelectedMatch(null)} 
        />
      )}
    </div>
  );
};

export default App;
