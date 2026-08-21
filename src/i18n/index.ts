import type { Dict } from './types';
import type { Locale } from '../config';
import en from './en';
import es from './es';
import pt from './pt';
import fr from './fr';
import de from './de';

export const dictionaries: Record<Locale, Dict> = { en, es, pt, fr, de };
export const languageNames: Record<Locale, string> = {
  en: 'English', es: 'Español', pt: 'Português', fr: 'Français', de: 'Deutsch',
};
export type { Dict };
