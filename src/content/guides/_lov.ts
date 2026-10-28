/** Outils de rédaction des pages de skollov (le préfixe _ exclut ce fichier du registre des pages). */
import { K, lista, dShort, span, type Lang } from '../_lib';
import type { Kommun, LovTyp, Span } from '../../lib/engine/lov';

export interface Grupp { s: Span; ks: Kommun[] }
/** Kommuner groupées par dates identiques, triées par date de début ; les non publiées à la fin. */
export function grupper(typ: LovTyp): Grupp[] {
  const m = new Map<string, Grupp>();
  for (const k of K.KOMMUNER) { const s = K.lov(k, typ); const key = s ? s.join() : '-'; if (!m.has(key)) m.set(key, { s, ks: [] }); m.get(key)!.ks.push(k); }
  return [...m.values()].sort((a, b) => (a.s ? a.s[0] + a.s[1] : 'z').localeCompare(b.s ? b.s[0] + b.s[1] : 'z'));
}
export const namn = (ks: Kommun[], l: Lang) => lista(ks.map((k) => k.name), l);
export const publ = (typ: LovTyp) => K.KOMMUNER.filter((k) => K.lov(k, typ));
export const ejPubl = (typ: LovTyp) => K.KOMMUNER.filter((k) => !K.lov(k, typ));
export const vk = (s: Span) => (s ? K.isoVecka(s[0]).week : 0);
export const per = (s: Span, l: Lang) => (s ? span(s[0], s[1], l) : l === 'sv' ? 'inte publicerat än' : 'not published yet');
export const kort = (iso: string, l: Lang) => dShort(iso, l);
/** Semesterdagar (3 a § semesterlagen) qu'il faut pour couvrir un lov. */
export const semFor = (s: Span) => (s ? K.semesterdagar(s[0], s[1]).sem : 0);
export const ko = (id: string) => K.kommun(id);
