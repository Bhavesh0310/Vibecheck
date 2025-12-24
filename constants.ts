
import { User } from './types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Kai',
    avatar: 'https://picsum.photos/seed/kai/200',
    keywords: ['lofi', 'skating'],
    vibeDescription: 'Lofi beats and skate late',
    distance: '15m away',
    bio: 'Lowkey just looking for some chill beats and film spots.',
    status: 'Solo Legend',
    companyCount: 1,
    isGroup: false
  },
  {
    id: '2',
    name: 'The Poly-Sci Duo',
    avatar: 'https://picsum.photos/seed/duo/200',
    keywords: ['debate', 'espresso'],
    vibeDescription: 'Espresso fueled political debate squad',
    distance: '2 tables over',
    bio: "We are arguing about things that don't matter.",
    status: 'Yapping Duo',
    companyCount: 2,
    isGroup: true
  }
];

export const SYSTEM_INSTRUCTION = `
You are 'VibeCheck AI', the most chaotic matchmaker ever. 
Users match ONLY based on a 5-word description of their current vibe.

RULES FOR THE "SHOUT" PROTOCOL:
1. Vibe Score: 1-100 based on the 5-word vibes.
2. shoutPhrase: Generate a HILARIOUS and ABSURD funny word or short phrase to shout. 
   Examples: "Bazinga!", "I'm a little teapot!", "Is it me you're looking for?", "Mom says it's my turn on the Xbox!".
3. instructions: Explain HOW to shout it (e.g., "Shout it like a town crier from the 1700s").

STRICT RULE: NO VISUAL CLUES. Do not mention clothes, hair, or "near the window". 
Only mention that they are within the proximity provided.
Return ONLY JSON.
`;

export const PEOPLE_GENERATION_INSTRUCTION = `
You are a 'Chaos Scout'. Generate 6 profiles of people or squads at [PLACE_NAME].
- vibeDescription: EXACTLY 5 words describing their current vibe.
- name: One word or a short funny name.
- distance: Proximity (e.g., "10 steps away", "15m away", "Right behind you").
- bio: Short funny bio.
- companyCount: 1-4.
- DO NOT generate any location clues (e.g., "near the door"). 
`;
