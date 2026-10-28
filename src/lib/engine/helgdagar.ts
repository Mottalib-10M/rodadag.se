/**
 * Allmänna helgdagar i Sverige, uträknade och inte avskrivna.
 *
 * - Lag (1989:253) om allmänna helgdagar, 1 §: söndagar, nyårsdagen, trettondedag jul, första maj, juldagen,
 *   annandag jul, långfredagen, påskdagen, annandag påsk, Kristi himmelsfärdsdag, pingstdagen, Sveriges
 *   nationaldag, midsommardagen och alla helgons dag. Annandag pingst är inte helgdag sedan 2005.
 * - 2 §: påskdagen är söndagen närmast efter den fullmåne som infaller på eller närmast efter den 21 mars;
 *   Kristi himmelsfärdsdag är sjätte torsdagen efter påskdagen (påskdagen + 39), pingstdagen sjunde
 *   söndagen efter påskdagen (+ 49), midsommardagen lördagen 20–26 juni, alla helgons dag lördagen
 *   31 oktober–6 november.
 * - Påsken räknas med Gauss påskformel (kyrklig fullmåne), kontrollerad mot en andra, oberoende algoritm.
 * - En helgdag som infaller på en lördag eller söndag flyttas inte (lagen har ingen sådan regel).
 * - Helgaftnar: midsommarafton, julafton och nyårsafton är inga allmänna helgdagar, men 3 a § semesterlagen
 *   (1977:480) jämställer dem med söndag, så de räknas inte som semesterdagar, och 2 § lagen (1930:173) om
 *   beräkning av lagstadgad tid flyttar en frist som slutar på dem till nästa vardag.
 */

export type Lang = 'sv' | 'en';
export interface Namn { sv: string; en: string }

/* ------------------------------------------------------------------ dagar som heltal (UTC) */
const MS = 86400000;
export const dayNum = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d) / MS;
export const fromIso = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return dayNum(y, m, d); };
export const toIso = (n: number) => new Date(n * MS).toISOString().slice(0, 10);
/** 0 = söndag … 6 = lördag */
export const weekday = (n: number) => new Date(n * MS).getUTCDay();
export const isWeekend = (n: number) => { const w = weekday(n); return w === 0 || w === 6; };
export const plusDays = (iso: string, d: number) => toIso(fromIso(iso) + d);

/* ------------------------------------------------------------------ påsk */
/** Påskdagen enligt Gauss påskformel (Lichtenbergs form, gregoriansk kalender). ISO-datum. */
export function paskdagen(x: number): string {
  const K = Math.floor(x / 100);
  const M = 15 + Math.floor((3 * K + 3) / 4) - Math.floor((8 * K + 13) / 25);
  const S = 2 - Math.floor((3 * K + 3) / 4);
  const A = x % 19;
  const D = (19 * A + M) % 30;
  const R = Math.floor((D + Math.floor(A / 11)) / 29);
  const OG = 21 + D - R;
  const SZ = 7 - ((x + Math.floor(x / 4) + S) % 7);
  const OE = 7 - ((((OG - SZ) % 7) + 7) % 7);
  return toIso(dayNum(x, 3, 1) + OG + OE - 1);
}
/** Andra, oberoende uträkning (Meeus/Jones/Butcher), bara för testerna. */
export function paskdagenMeeus(y: number): string {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return toIso(dayNum(y, month, day));
}
/** n:te veckodagen i en månad (n = −1: sista). wd 0 = söndag. */
export function nthWeekday(y: number, m: number, wd: number, n: number): string {
  if (n > 0) { const first = dayNum(y, m, 1); return toIso(first + ((wd - weekday(first) + 7) % 7) + 7 * (n - 1)); }
  const last = dayNum(y, m + 1, 1) - 1; return toIso(last - ((weekday(last) - wd + 7) % 7));
}
/** Den lördag som infaller under perioden d1..d1+6 i månad m (midsommardagen, alla helgons dag). */
export function lordagMellan(y: number, m: number, d1: number): string {
  const a = dayNum(y, m, d1); return toIso(a + ((6 - weekday(a) + 7) % 7));
}
export const midsommardagen = (y: number) => lordagMellan(y, 6, 20);
export const midsommarafton = (y: number) => plusDays(midsommardagen(y), -1);
export const allaHelgonsDag = (y: number) => lordagMellan(y, 10, 31);

/* ------------------------------------------------------------------ de allmänna helgdagarna (utom vanliga söndagar) */
export interface HelgdagDef { id: string; name: Namn; date: (y: number) => string }
const fix = (m: number, d: number) => (y: number) => toIso(dayNum(y, m, d));
const pask = (off: number) => (y: number) => plusDays(paskdagen(y), off);

export const HELGDAGAR: HelgdagDef[] = [
  { id: 'nyarsdagen', name: { sv: 'Nyårsdagen', en: "New Year's Day" }, date: fix(1, 1) },
  { id: 'trettondedag-jul', name: { sv: 'Trettondedag jul', en: 'Epiphany' }, date: fix(1, 6) },
  { id: 'langfredagen', name: { sv: 'Långfredagen', en: 'Good Friday' }, date: pask(-2) },
  { id: 'paskdagen', name: { sv: 'Påskdagen', en: 'Easter Sunday' }, date: pask(0) },
  { id: 'annandag-pask', name: { sv: 'Annandag påsk', en: 'Easter Monday' }, date: pask(1) },
  { id: 'forsta-maj', name: { sv: 'Första maj', en: 'May Day' }, date: fix(5, 1) },
  { id: 'kristi-himmelsfard', name: { sv: 'Kristi himmelsfärdsdag', en: 'Ascension Day' }, date: pask(39) },
  { id: 'pingstdagen', name: { sv: 'Pingstdagen', en: 'Whit Sunday' }, date: pask(49) },
  { id: 'nationaldagen', name: { sv: 'Sveriges nationaldag', en: 'National Day of Sweden' }, date: fix(6, 6) },
  { id: 'midsommardagen', name: { sv: 'Midsommardagen', en: 'Midsummer Day' }, date: midsommardagen },
  { id: 'alla-helgons-dag', name: { sv: 'Alla helgons dag', en: "All Saints' Day" }, date: allaHelgonsDag },
  { id: 'juldagen', name: { sv: 'Juldagen', en: 'Christmas Day' }, date: fix(12, 25) },
  { id: 'annandag-jul', name: { sv: 'Annandag jul', en: 'Boxing Day' }, date: fix(12, 26) },
];

/** Helgaftnar. `semL`: jämställd med söndag i 3 a § semesterlagen (räknas inte som semesterdag). */
export interface AftonDef { id: string; name: Namn; date: (y: number) => string; semL: boolean }
export const AFTNAR: AftonDef[] = [
  { id: 'trettondagsafton', name: { sv: 'Trettondagsafton', en: 'Twelfth Night' }, date: fix(1, 5), semL: false },
  { id: 'skartorsdagen', name: { sv: 'Skärtorsdagen', en: 'Maundy Thursday' }, date: pask(-3), semL: false },
  { id: 'paskafton', name: { sv: 'Påskafton', en: 'Holy Saturday' }, date: pask(-1), semL: false },
  { id: 'valborgsmassoafton', name: { sv: 'Valborgsmässoafton', en: 'Walpurgis Night' }, date: fix(4, 30), semL: false },
  { id: 'pingstafton', name: { sv: 'Pingstafton', en: 'Whitsun Eve' }, date: pask(48), semL: false },
  { id: 'midsommarafton', name: { sv: 'Midsommarafton', en: 'Midsummer Eve' }, date: midsommarafton, semL: true },
  { id: 'allhelgonaafton', name: { sv: 'Allhelgonaafton', en: "All Saints' Eve" }, date: (y) => plusDays(allaHelgonsDag(y), -1), semL: false },
  { id: 'julafton', name: { sv: 'Julafton', en: 'Christmas Eve' }, date: fix(12, 24), semL: true },
  { id: 'nyarsafton', name: { sv: 'Nyårsafton', en: "New Year's Eve" }, date: fix(12, 31), semL: true },
];

export interface Optioner {
  /** Midsommar-, jul- och nyårsafton som lediga dagar (de kostar inga semesterdagar, 3 a § semesterlagen). */
  aftnar?: boolean;
}

export interface Dag { id: string; date: string; name: Namn; typ: 'helgdag' | 'afton' }
/** Årets röda dagar (de 13 helgdagarna), och på begäran de tre aftnarna. Sorterade efter datum. */
export function helgdagar(y: number, o: Optioner = {}): Dag[] {
  const out: Dag[] = HELGDAGAR.map((f) => ({ id: f.id, date: f.date(y), name: f.name, typ: 'helgdag' as const }));
  if (o.aftnar) for (const a of AFTNAR.filter((x) => x.semL)) out.push({ id: a.id, date: a.date(y), name: a.name, typ: 'afton' });
  return out.sort((a, b) => a.date.localeCompare(b.date));
}
/** Alla aftnar ett år, med datum. */
export const aftnar = (y: number) => AFTNAR.map((a) => ({ id: a.id, date: a.date(y), name: a.name, semL: a.semL }));
/** Helgdagar som infaller måndag–fredag. */
export const paVardag = (list: Dag[]) => list.filter((f) => !isWeekend(fromIso(f.date)));
/** Nästa lediga dagar från och med en dag, över årsskiftet. */
export function nasta(iso: string, o: Optioner = {}, n = 5): Dag[] {
  const y = Number(iso.slice(0, 4));
  return [...helgdagar(y, o), ...helgdagar(y + 1, o)].filter((f) => f.date >= iso).slice(0, n);
}
/** Är dagen en vardag i lagens mening (inte lördag, söndag, helgdag, midsommar-, jul- eller nyårsafton)? */
export function arVardag(iso: string): boolean {
  const n = fromIso(iso), y = Number(iso.slice(0, 4));
  if (isWeekend(n)) return false;
  return !helgdagar(y, { aftnar: true }).some((f) => f.date === iso);
}
/** 2 § lagen (1930:173): slutar en frist på en dag som inte är vardag, får åtgärden göras nästa vardag. */
export function nastaVardag(iso: string): string {
  let d = iso; while (!arVardag(d)) d = plusDays(d, 1); return d;
}
