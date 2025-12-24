
export interface User {
  id: string;
  name: string;
  avatar: string;
  keywords: string[]; 
  vibeDescription: string; // The "5 words" describing them
  distance: string;
  bio: string;
  status?: string; 
  lastActive?: string;
  companyCount: number;
  isGroup: boolean;
}

export interface MatchResult {
  vibeScore: number;
  commonVibe: string;
  shoutPhrase: string; // The funny word/phrase to shout
  instructions: string; // Specifically for the shouting/finding phase
}

export enum AppState {
  LANDING = 'LANDING',
  SETUP = 'SETUP',
  DISCOVERY = 'DISCOVERY'
}
