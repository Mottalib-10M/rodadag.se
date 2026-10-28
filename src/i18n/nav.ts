import { route, hasRoute, type Locale } from './routes';
import { GUIDES, guideById } from '../lib/pages';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  sv: { home: 'Semesterplanerare 2027', method: 'Metod', about: 'Om oss', widget: 'Bädda in verktygen', contact: 'Kontakt', editorial: 'Redaktionella principer', privacy: 'Integritet', terms: 'Utgivare och villkor', cookies: 'Cookies' },
  en: { home: 'Leave planner 2027', method: 'Method', about: 'About', widget: 'Embed the tools', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
};
/** `short` : intitulé du menu du haut (un ou deux mots, RECETTE §10.3) ; `label` : intitulé complet. */
export const GROUPS: Array<{ id: Group; label: Record<Locale, string>; short: Record<Locale, string> }> = [
  { id: 'verktyg', label: { sv: 'Klämdagar, semester och arbetsdagar', en: 'Bridge days, leave and working days' }, short: { sv: 'Klämdagar', en: 'Bridge days' } },
  { id: 'roda', label: { sv: 'Röda dagar och kalender', en: 'Public holidays and calendars' }, short: { sv: 'Röda dagar', en: 'Holidays' } },
  { id: 'hogtider', label: { sv: 'Högtider och datum', en: 'Festivals and dates' }, short: { sv: 'Högtider', en: 'Dates' } },
  { id: 'lov', label: { sv: 'Skollov per kommun', en: 'School holidays by municipality' }, short: { sv: 'Skollov', en: 'School' } },
];
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? guideById(id)?.[lang]?.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale, short = true): NavCategory[] {
  return GROUPS.map((g) => ({ label: (short ? g.short : g.label)[lang], links: g.id === 'verktyg' ? [link('home', lang), ...inGroup(g.id, lang)] : inGroup(g.id, lang) })).filter((c) => c.links.length);
}
/** La Méthode n'est pas dans le menu du haut (RECETTE §10.3) : sous le titre et en bas de page. */
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => {
  const site = { label: { sv: 'Om webbplatsen', en: 'This site' }[lang], links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) };
  return [
    { label: GROUPS[1].label[lang], links: [...inGroup('roda', lang), ...inGroup('hogtider', lang)] },
    { label: GROUPS[3].label[lang], links: inGroup('lov', lang) },
    { label: GROUPS[0].label[lang], links: inGroup('verktyg', lang) },
    site,
  ];
};
/** Les outils, à un clic de toute page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => [link('home', lang), ...inGroup('verktyg', lang)];
