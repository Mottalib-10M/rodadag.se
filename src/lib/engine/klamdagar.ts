/**
 * Klämdagar och semesterplanering.
 *
 * Året delas i block som växlar: lediga block (lördag, söndag, röd dag och, om man vill, midsommar-, jul- och
 * nyårsafton) och arbetsblock (måndag–fredag som inte är lediga). Tar man ut semester för alla dagar i ett
 * arbetsblock smälter de lediga blocken på båda sidor ihop till ett långt.
 *
 * - `broar`: varje arbetsblock på högst fyra dagar som gränsar till en röd dag, med utbytet (lediga dagar i
 *   rad per semesterdag), bäst först. Ett block på en enda dag är en äkta klämdag.
 * - `optimera`: bästa valet för ett antal semesterdagar. Dynamisk programmering över årets ordnade
 *   arbetsblock (valt / inte valt, använda dagar): flest lediga dagar i de block som uppstår; vid lika
 *   antal vinner lösningen med färre semesterdagar. Exakt, ingen tumregel.
 */
import { helgdagar, fromIso, toIso, isWeekend, dayNum, type Optioner } from './helgdagar';
export type { Optioner };

interface Block { ledig: boolean; start: number; len: number; rod: boolean }

/** Lediga block och arbetsblock från början av december året före till slutet av januari året efter. */
export function block(y: number, o: Optioner = {}): Block[] {
  const hol = new Set<number>();
  for (const yy of [y - 1, y, y + 1]) for (const f of helgdagar(yy, o)) hol.add(fromIso(f.date));
  const a = dayNum(y - 1, 12, 1), b = dayNum(y + 1, 1, 31);
  const out: Block[] = [];
  for (let d = a; d <= b; d++) {
    const isHol = hol.has(d), ledig = isHol || isWeekend(d);
    // Bara en röd dag (eller afton) på en vardag gör ett block till en bro; nationaldagen på en söndag gör det inte.
    const verkar = isHol && !isWeekend(d);
    const last = out[out.length - 1];
    if (last && last.ledig === ledig) { last.len++; last.rod ||= verkar; }
    else out.push({ ledig, start: d, len: 1, rod: verkar });
  }
  return out;
}

export interface Bro {
  /** Semesterdagar: första och sista dagen (ISO). */
  semFran: string; semTill: string; sem: number;
  /** Ledigt block i rad som uppstår. */
  ledigFran: string; ledigTill: string; ledig: number;
  /** Röda dagar (och aftnar) i blocket (id). */
  dagar: string[];
}
const mk = (bl: Block[], i: number, j: number, y: number, o: Optioner): Bro => {
  const pre = bl[i - 1], post = bl[j + 1];
  const fran = pre ? pre.start : bl[i].start, till = post ? post.start + post.len - 1 : bl[j].start + bl[j].len - 1;
  let sem = 0; for (let k = i; k <= j; k++) if (!bl[k].ledig) sem += bl[k].len;
  const ids = new Set<string>();
  for (const yy of [y - 1, y, y + 1]) for (const f of helgdagar(yy, o)) { const n = fromIso(f.date); if (n >= fran && n <= till) ids.add(f.id); }
  return { semFran: toIso(bl[i].start), semTill: toIso(bl[j].start + bl[j].len - 1), sem, ledigFran: toIso(fran), ledigTill: toIso(till), ledig: till - fran + 1, dagar: [...ids] };
};
const iAret = (b: Block, y: number) => b.start >= dayNum(y, 1, 1) && b.start + b.len - 1 <= dayNum(y, 12, 31);

/** Alla broar ett år: arbetsblock på högst `max` dagar intill en röd dag, bäst först. */
export function broar(y: number, o: Optioner = {}, max = 4): Bro[] {
  const bl = block(y, o), out: Bro[] = [];
  for (let i = 1; i < bl.length - 1; i++) {
    const b = bl[i];
    if (b.ledig || b.len > max || !iAret(b, y)) continue;
    if (!bl[i - 1].rod && !bl[i + 1].rod) continue;
    out.push(mk(bl, i, i, y, o));
  }
  return out.sort((a, b) => b.ledig / b.sem - a.ledig / a.sem || b.ledig - a.ledig || a.semFran.localeCompare(b.semFran));
}

/** Äkta klämdagar: en enda arbetsdag mellan en röd dag och helgen (eller två röda dagar). */
export const klamdagar = (y: number, o: Optioner = {}) => broar(y, o, 1);

export interface Plan { block: Bro[]; sem: number; ledig: number; /** Semesterdagar som inte längre förlänger någon bro: fria att lägga. */ rest: number }
/** Bästa fördelningen av `budget` semesterdagar år y (bara dagar i år y räknas). */
export function optimera(y: number, budget: number, o: Optioner = {}): Plan {
  const B = Math.max(0, Math.min(60, Math.floor(budget)));
  const bl = block(y, o);
  const runs: number[] = []; for (let i = 0; i < bl.length; i++) if (!bl[i].ledig) runs.push(i);
  const n = runs.length, NEG = -1e9;
  const ok = (r: number) => { const i = runs[r]; return i > 0 && i < bl.length - 1 && iAret(bl[i], y) && bl[i].len <= 10; };
  const fr = (i: number) => (bl[i] && bl[i].ledig ? bl[i].len : 0);
  // dp[r][s][c]: bästa värdet efter block r med c använda dagar. s = 0: block r inte valt; 1: valt och kedjan
  // rör redan en röd dag; 2: valt men ännu utan röd dag (får inte sluta så: en semestervecka utan röd dag är
  // ingen bro och blir kvar som fri att lägga). Värde = 100 · lediga − semesterdagar.
  const dp: Float64Array[][] = [], from: Int32Array[][] = [];
  for (let r = 0; r <= n; r++) { dp.push([0, 1, 2].map(() => new Float64Array(B + 1).fill(NEG))); from.push([0, 1, 2].map(() => new Int32Array(B + 1).fill(-1))); }
  dp[0][0][0] = 0;
  const rod = (i: number) => !!(bl[i] && bl[i].ledig && bl[i].rod);
  for (let r = 0; r < n; r++) {
    const i = runs[r], cost = bl[i].len;
    for (let c = 0; c <= B; c++) for (let s = 0; s < 3; s++) {
      const v = dp[r][s][c]; if (v <= NEG / 2) continue;
      if (s !== 2 && v > dp[r + 1][0][c]) { dp[r + 1][0][c] = v; from[r + 1][0][c] = s; }
      if (ok(r) && c + cost <= B) {
        const gain = s ? cost + fr(i + 1) : fr(i - 1) + cost + fr(i + 1);
        const har = (s === 1) || (s === 0 && rod(i - 1)) || rod(i + 1);
        const t = har ? 1 : 2, nv = v + 100 * gain - cost;
        if (nv > dp[r + 1][t][c + cost]) { dp[r + 1][t][c + cost] = nv; from[r + 1][t][c + cost] = s; }
      }
    }
  }
  let best = 0, bc = 0, bs = 0;
  for (let c = 0; c <= B; c++) for (let s = 0; s < 2; s++) if (dp[n][s][c] > best) { best = dp[n][s][c]; bc = c; bs = s; }
  const chosen: boolean[] = new Array(n).fill(false);
  for (let r = n, c = bc, s = bs; r > 0; r--) { const p = from[r][s][c]; if (s) { chosen[r - 1] = true; c -= bl[runs[r - 1]].len; } s = p < 0 ? 0 : p; }
  const plan: Bro[] = [];
  for (let r = 0; r < n; r++) {
    if (!chosen[r]) continue;
    let e = r; while (e + 1 < n && chosen[e + 1]) e++;
    plan.push(mk(bl, runs[r], runs[e], y, o)); r = e;
  }
  const sem = plan.reduce((a, b) => a + b.sem, 0);
  return { block: plan, sem, ledig: plan.reduce((a, b) => a + b.ledig, 0), rest: B - sem };
}

/* ------------------------------------------------------------------ arbetsdagar, semesterdagar, veckor */
/** Arbetsdagar (måndag–fredag utan röda dagar) per månad; aftnarna som lediga om `o.aftnar`. */
export function arbetsdagar(y: number, o: Optioner = {}): number[] {
  const hol = new Set(helgdagar(y, o).map((f) => fromIso(f.date)));
  const out: number[] = [];
  for (let m = 1; m <= 12; m++) {
    let c = 0; for (let d = dayNum(y, m, 1); d < dayNum(y, m + 1, 1); d++) if (!isWeekend(d) && !hol.has(d)) c++;
    out.push(c);
  }
  return out;
}
/** Måndagar–fredagar under ett år, före avdrag för röda dagar. */
export const vardagarMaFr = (y: number) => { let c = 0; for (let d = dayNum(y, 1, 1); d <= dayNum(y, 12, 31); d++) if (!isWeekend(d)) c++; return c; };
/** Semesterdagar som går åt mellan två datum (båda medräknade), enligt 3 a § semesterlagen: lördag, söndag,
 *  allmän helgdag, midsommarafton, julafton och nyårsafton räknas inte. */
export function semesterdagar(fran: string, till: string): { sem: number; kalender: number; fria: number } {
  const a = fromIso(fran), b = fromIso(till);
  if (b < a) return { sem: 0, kalender: 0, fria: 0 };
  const hol = new Set<number>();
  for (let y = Number(fran.slice(0, 4)); y <= Number(till.slice(0, 4)); y++) for (const f of helgdagar(y, { aftnar: true })) hol.add(fromIso(f.date));
  let sem = 0; for (let d = a; d <= b; d++) if (!isWeekend(d) && !hol.has(d)) sem++;
  return { sem, kalender: b - a + 1, fria: b - a + 1 - sem };
}
/** Veckonummer enligt ISO 8601 (i Sverige SS-ISO 8601): vecka 1 är veckan med årets första torsdag. */
export function isoVecka(iso: string): { year: number; week: number } {
  const n = fromIso(iso), wd = (new Date(n * 86400000).getUTCDay() + 6) % 7; // 0 = måndag
  const thu = n - wd + 3, ty = new Date(thu * 86400000).getUTCFullYear();
  return { year: ty, week: Math.floor((thu - dayNum(ty, 1, 1)) / 7) + 1 };
}
export const veckorIAret = (y: number) => isoVecka(`${y}-12-28`).week;
/** Måndagen i vecka w år y. */
export const mandagIVecka = (y: number, w: number) => { const j4 = dayNum(y, 1, 4); return toIso(j4 - ((new Date(j4 * 86400000).getUTCDay() + 6) % 7) + 7 * (w - 1)); };
