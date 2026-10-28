/**
 * Skollov läsåret 2026/27 i de 24 största kommunerna, från varje kommuns egen sida (data/lov.json, lästa
 * 2026-10-28). Ingen nationell regel bestämmer loven: skolförordningen (2011:185) 3 kap. 2–3 §§ kräver minst
 * 178 skoldagar och 12 lovdagar, läsår från augusti till juni, och huvudmannen (kommunen) beslutar om
 * terminernas början och slut. Därför visar vi bara datum som en kommun har publicerat.
 */
import DATA from '../../data/lov.json';
import { fromIso, toIso, plusDays } from './helgdagar';
import { isoVecka } from './klamdagar';

export type Span = [string, string] | null;
export interface Kommun {
  id: string; name: string; lan: string; url: string; status: string;
  hostlov2026: Span; hosttermin_slut: string; vartermin_start: string;
  sportlov2027: Span; sportlov_vecka: number; pasklov2027: Span; vartermin_slut: string;
  sportlov2028: Span; hostlov2027: Span;
}
export const LOV_LASDATUM: string = DATA.retrieved_at;
export const KOMMUNER: Kommun[] = (DATA.kommuner as unknown as Kommun[]).slice().sort((a, b) => a.name.localeCompare(b.name, 'sv'));
export const kommun = (id: string) => KOMMUNER.find((k) => k.id === id) ?? KOMMUNER[0];

export type LovTyp = 'hostlov2026' | 'jullov2026' | 'sportlov2027' | 'pasklov2027' | 'sommarlov2027' | 'hostlov2027' | 'sportlov2028';
/** Första och sista lediga vardag för ett lov i en kommun, eller null om kommunen inte har publicerat det. */
export function lov(k: Kommun, typ: LovTyp): Span {
  switch (typ) {
    case 'jullov2026': return [plusDays(k.hosttermin_slut, 1), plusDays(k.vartermin_start, -1)];
    // Sommarlovet: bara första dagen är känd (dagen efter vårterminens slut); höstterminen 2027 är inte med i datan.
    case 'sommarlov2027': { const d = plusDays(k.vartermin_slut, 1); return [d, d]; }
    default: return k[typ];
  }
}
/** Antal kalenderdagar från fredagen före (eller dagen före) till sista dagen: hur länge barnen är lediga i ett svep. */
export const kalenderdagar = (s: Span) => (s ? fromIso(s[1]) - fromIso(s[0]) + 1 : 0);
/** Sammanhängande ledighet inklusive helgerna runt lovet (lördag före till söndag efter när lovet är mån–fre). */
export function ledigtISvep(s: Span): Span {
  if (!s) return null;
  let a = fromIso(s[0]), b = fromIso(s[1]);
  const wd = (n: number) => new Date(n * 864e5).getUTCDay();
  while (wd(a - 1) === 6 || wd(a - 1) === 0) a--;
  while (wd(b + 1) === 6 || wd(b + 1) === 0) b++;
  return [toIso(a), toIso(b)];
}
/** Sportlovsveckor 2027: veckonummer → kommuner. */
export function sportlovVeckor(): Array<{ vecka: number; kommuner: Kommun[] }> {
  const m = new Map<number, Kommun[]>();
  for (const k of KOMMUNER) if (k.sportlov2027) { const w = isoVecka(k.sportlov2027[0]).week; m.set(w, [...(m.get(w) ?? []), k]); }
  return [...m.entries()].sort((a, b) => a[0] - b[0]).map(([vecka, kommuner]) => ({ vecka, kommuner }));
}
