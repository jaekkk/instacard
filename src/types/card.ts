export type CardLayout =
  | 'cover'
  | 'quote'
  | 'tip'
  | 'list'
  | 'stat'
  | 'closing';

export type ColorScheme =
  | 'white'
  | 'black'
  | 'cream'
  | 'sage'
  | 'blush'
  | 'slate';

export interface CardSlide {
  id: string;
  layout: CardLayout;
  colorScheme: ColorScheme;
  title: string;
  subtitle?: string;
  body?: string;
  items?: string[];
  tag?: string;
  number?: string;
  accent?: string;
}

export interface CardTemplate {
  id: string;
  name: string;
  description: string;
  slides: CardSlide[];
}

export const COLOR_SCHEMES: Record<ColorScheme, { bg: string; text: string; muted: string; border: string; accent: string }> = {
  white: {
    bg: '#ffffff',
    text: '#111111',
    muted: '#737373',
    border: '#e5e5e5',
    accent: '#111111',
  },
  black: {
    bg: '#111111',
    text: '#ffffff',
    muted: '#a3a3a3',
    border: '#262626',
    accent: '#ffffff',
  },
  cream: {
    bg: '#faf7f2',
    text: '#2d2418',
    muted: '#8c7a60',
    border: '#e8dfc8',
    accent: '#c8853a',
  },
  sage: {
    bg: '#f0f4f0',
    text: '#1a2b1a',
    muted: '#5a7a5a',
    border: '#c8dcc8',
    accent: '#3a6b3a',
  },
  blush: {
    bg: '#fdf4f4',
    text: '#2b1a1a',
    muted: '#9a6b6b',
    border: '#f0d4d4',
    accent: '#c43a3a',
  },
  slate: {
    bg: '#f0f2f4',
    text: '#1a1e2b',
    muted: '#5a6a7a',
    border: '#c8d0dc',
    accent: '#2a4a6b',
  },
};
