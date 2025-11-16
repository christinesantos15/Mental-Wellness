
export enum Mood {
  Happy = 'Happy',
  Neutral = 'Neutral',
  Sad = 'Sad',
}

export type Screen = 'mood' | 'positivity' | 'cheerup';

export interface PositivityContent {
  spirit: {
    title: string;
    body: string;
  };
  brighten: {
    title: string;
    items: string[];
  };
  comfort: {
    title: string;
    body: string;
  };
}

export interface SelfCareTask {
    title: string;
    description: string;
}
