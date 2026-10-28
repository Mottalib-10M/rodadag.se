/**
 * Webbplatsens verktyg. Varje tal och datum kommer från räknekärnan (engine/helgdagar.ts, engine/klamdagar.ts,
 * engine/lov.ts); inget är avskrivet. En spec listar sina fält (synliga först, `adv` i "Fler val") och en
 * funktion `run` som ger resultatkortet. Kalendern och "nästa röda dag" är egna komponenter.
 */
import type { ToolSpec, V, ToolOut, Opt } from './tool-types';
import { resolve } from './tool-types';
import { formatNumber, formatDecimal, type Lang } from './format';
import { HELGDAGAR, AFTNAR, helgdagar, aftnar, paskdagen, midsommardagen, midsommarafton, allaHelgonsDag, nthWeekday, fromIso, toIso, isWeekend, dayNum, plusDays, arVardag, nastaVardag, type Optioner } from './engine/helgdagar';
import { optimera, broar, klamdagar, arbetsdagar, vardagarMaFr, semesterdagar, isoVecka, veckorIAret, mandagIVecka } from './engine/klamdagar';
import { KOMMUNER, kommun, lov, ledigtISvep, type LovTyp } from './engine/lov';
import P from '../data/params-2026.json';

export type Args = Record<string, number | string>;
const T = (l: Lang, sv: string, en: string) => (l === 'sv' ? sv : en);
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k] ?? '');
const num = (x: number, l: Lang) => formatNumber(x, 0, l);
const TAG = (l: Lang) => (l === 'sv' ? 'sv-SE' : 'en-GB');
const fmt = (iso: string, l: Lang, o: Intl.DateTimeFormatOptions) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(TAG(l), { ...o, timeZone: 'UTC' });
/** « 28 mars 2027 » / « 28 March 2027 » */
export const dLong = (iso: string, l: Lang) => fmt(iso, l, { day: 'numeric', month: 'long', year: 'numeric' });
/** « söndag 28 mars 2027 » */
export const dWeek = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
/** « fre 7 maj » / « Fri 7 May » */
export const dShort = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'short', day: 'numeric', month: 'long' });
export const wdLong = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'long' });
export const span = (a: string, b: string, l: Lang) => (a === b ? dShort(a, l) : `${dShort(a, l)} – ${dShort(b, l)}`);
const dagar = (x: number, l: Lang) => `${num(x, l)} ${x === 1 ? T(l, 'dag', 'day') : T(l, 'dagar', 'days')}`;
const ar = (x: number) => String(x);

/* ------------------------------------------------------------------ fält */
const AR = P.ar as number[];
const arOpts = (ys: number[]): Opt[] => ys.map((y) => ({ value: ar(y), label: ar(y) }));
const yearRange = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const fAr = (l: Lang, def: number, ys = AR) => ({ kind: 'select' as const, id: 'ar', label: T(l, 'År', 'Year'), def: ar(def), options: arOpts(ys) });
const fAftnar = (l: Lang, adv = true, def = 'ledig') => ({ kind: 'choice' as const, id: 'af', label: T(l, 'Midsommar-, jul- och nyårsafton', 'Midsummer, Christmas and New Year’s Eve'), def, adv, options: [{ value: 'ledig', label: T(l, 'Lediga', 'Days off') }, { value: 'arbete', label: T(l, 'Arbetsdagar', 'Working days') }], help: T(l, 'Räknas aldrig som semesterdagar (3 a § semesterlagen).', 'Never count as annual leave days (Annual Leave Act, s. 3a).') });
const ctx = (v: V) => { const o: Optioner = { aftnar: s(v, 'af') !== 'arbete' }; return { y: n(v, 'ar'), o }; };
const namn = (id: string, l: Lang) => HELGDAGAR.find((f) => f.id === id)?.name[l] ?? AFTNAR.find((a) => a.id === id)?.name[l] ?? id;
const sumA = (a: number[]) => a.reduce((x, z) => x + z, 0);
const MANADER = (l: Lang) => Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(2027, i, 15)).toLocaleDateString(TAG(l), { month: 'long', timeZone: 'UTC' }));
const fManad = (l: Lang, def: number) => ({ kind: 'select' as const, id: 'man', label: T(l, 'Månad', 'Month'), def: ar(def), options: MANADER(l).map((m, i) => ({ value: ar(i + 1), label: m })) });
const datumAv = (v: V) => { const y = n(v, 'ar'), m = n(v, 'man') || 1; const last = new Date(Date.UTC(y, m, 0)).getUTCDate(); return toIso(dayNum(y, m, Math.min(Math.max(1, Math.round(n(v, 'dag'))), last))); };

/* ------------------------------------------------------------------ semesterplaneraren */
function btSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fAr(l, Number(a.ar ?? 2027)), { id: 'sem', label: T(l, 'Semesterdagar du vill lägga', 'Leave days you want to use'), def: Number(a.sem ?? 10), unit: T(l, 'dagar', 'days'), max: 60 }, fAftnar(l)],
    run: (v) => {
      const { y, o } = ctx(v);
      const p = optimera(y, Math.round(n(v, 'sem')), o);
      const alla = broar(y, o);
      const faktor = p.sem ? p.ledig / p.sem : 0;
      const out: ToolOut = {
        label: T(l, `${y}: med ${num(p.sem, l)} semesterdagar`, `${y}: using ${num(p.sem, l)} leave days`),
        value: T(l, `${num(p.ledig, l)} dagar ledigt`, `${num(p.ledig, l)} days off`),
        sub: p.sem ? T(l, `En semesterdag ger i snitt ${formatDecimal(faktor, 1, l)} lediga dagar i rad.`, `On average one leave day buys ${formatDecimal(faktor, 1, l)} consecutive days off.`) : T(l, 'Skriv minst en semesterdag.', 'Enter at least one leave day.'),
        rows: p.block.slice(0, 6).map((b) => [span(b.ledigFran, b.ledigTill, l), T(l, `${num(b.sem, l)} → ${num(b.ledig, l)} dagar`, `${num(b.sem, l)} → ${num(b.ledig, l)} days`), b.ledig] as [string, string, number]),
        table: p.block.length ? {
          caption: T(l, `Din semesterplan ${y}: ansök om de här dagarna`, `Your leave plan for ${y}: book these days`),
          headers: [T(l, 'Ta semester', 'Take leave'), T(l, 'Semesterdagar', 'Leave days'), T(l, 'Ledigt i rad', 'Off in a row'), T(l, 'Lediga dagar', 'Days off'), T(l, 'Tack vare', 'Thanks to')],
          rows: p.block.map((b) => [span(b.semFran, b.semTill, l), num(b.sem, l), span(b.ledigFran, b.ledigTill, l), num(b.ledig, l), b.dagar.map((id) => namn(id, l)).join(', ')]),
          align: ['l', 'r', 'l', 'r', 'l'],
        } : undefined,
        tables: alla.length ? [{
          caption: T(l, `Alla klämdagar och korta broar ${y}, den som ger mest först`, `Every bridge day and short bridge in ${y}, best first`),
          headers: [T(l, 'Ta semester', 'Take leave'), T(l, 'Semesterdagar', 'Leave days'), T(l, 'Ledigt i rad', 'Off in a row'), T(l, 'Lediga dagar', 'Days off'), T(l, 'Röd dag', 'Holiday')],
          rows: alla.map((b) => [span(b.semFran, b.semTill, l), num(b.sem, l), span(b.ledigFran, b.ledigTill, l), num(b.ledig, l), b.dagar.map((id) => namn(id, l)).join(', ')]),
          align: ['l', 'r', 'l', 'r', 'l'],
        }] : undefined,
        note: p.rest > 0 ? T(l, `${dagar(p.rest, l)} förlänger ingen bro längre och är fria att lägga, till exempel på sommaren.`, `${dagar(p.rest, l)} no longer lengthen a bridge and stay free to plan, for the summer for instance.`) : undefined,
      };
      return out;
    },
  };
}

/* ------------------------------------------------------------------ röda dagar ett år */
function rdSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fAr(l, Number(a.ar ?? 2027), yearRange(2025, 2030)), { kind: 'choice', id: 'af', label: T(l, 'Visa aftnarna', 'Show the eves'), def: String(a.af ?? 'ledig'), options: [{ value: 'ledig', label: T(l, 'Ja', 'Yes') }, { value: 'arbete', label: T(l, 'Nej', 'No') }], help: T(l, 'Midsommar-, jul- och nyårsafton: inga helgdagar.', 'Midsummer, Christmas and New Year’s Eve: not public holidays.') }],
    run: (v) => {
      const { y, o } = ctx(v);
      const list = helgdagar(y, o);
      const rod = list.filter((f) => f.typ === 'helgdag');
      const vard = rod.filter((f) => !isWeekend(fromIso(f.date)));
      const kd = klamdagar(y, { aftnar: true });
      const at = sumA(arbetsdagar(y, { aftnar: true }));
      return {
        label: T(l, `Röda dagar ${y} i Sverige`, `Public holidays ${y} in Sweden`),
        value: T(l, `${num(vard.length, l)} röda vardagar`, `${num(vard.length, l)} on weekdays`),
        sub: T(l, `${num(rod.length, l)} helgdagar enligt lagen utöver vanliga söndagar; ${num(kd.length, l)} klämdagar.`, `${num(rod.length, l)} statutory holidays besides ordinary Sundays; ${num(kd.length, l)} bridge days.`),
        rows: [
          [T(l, 'Röda dagar måndag–fredag', 'Holidays Monday to Friday'), num(vard.length, l)],
          [T(l, 'Röda dagar på lördag eller söndag', 'Holidays on a Saturday or Sunday'), num(rod.length - vard.length, l)],
          [T(l, 'Klämdagar (1 semesterdag → 4 lediga)', 'Bridge days (1 leave day → 4 off)'), num(kd.length, l)],
          [T(l, 'Arbetsdagar måndag–fredag', 'Working days Monday to Friday'), num(at, l)],
        ],
        table: {
          caption: T(l, `Röda dagar ${y} med veckodag och vecka`, `Public holidays ${y} with weekday and week`),
          headers: [T(l, 'Datum', 'Date'), T(l, 'Veckodag', 'Weekday'), T(l, 'Vecka', 'Week'), T(l, 'Dag', 'Day'), T(l, 'Status', 'Status')],
          rows: list.map((f) => [dLong(f.date, l), wdLong(f.date, l), String(isoVecka(f.date).week), f.name[l], f.typ === 'helgdag' ? T(l, 'allmän helgdag', 'public holiday') : T(l, 'afton, ingen helgdag', 'eve, not a holiday')]),
          align: ['l', 'l', 'r', 'l', 'l'],
        },
      };
    },
  };
}

/* ------------------------------------------------------------------ arbetsdagar */
function atSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fAr(l, Number(a.ar ?? 2027)), { kind: 'choice', id: 'vecka', label: T(l, 'Arbetsdagar per vecka', 'Working days per week'), def: '5', options: [{ value: '5', label: '5' }, { value: '4', label: '4' }, { value: '3', label: '3' }] }, fAftnar(l)],
    run: (v) => {
      const { y, o } = ctx(v);
      const m = arbetsdagar(y, o), sum = sumA(m);
      const w = Number(s(v, 'vecka')) || 5;
      const brutto = vardagarMaFr(y);
      const andel = Math.round((sum * w) / 5);
      return {
        label: T(l, `Arbetsdagar ${y}`, `Working days ${y}`),
        value: w === 5 ? num(sum, l) : `≈ ${num(andel, l)}`,
        sub: w === 5 ? T(l, 'Måndag–fredag, utan röda dagar.', 'Monday to Friday, public holidays excluded.') : T(l, `Med ${w} dagar i veckan, i proportion till ${num(sum, l)} dagar i en femdagarsvecka.`, `For ${w} days a week, pro rata from ${num(sum, l)} days in a five-day week.`),
        rows: [
          [T(l, 'Måndagar–fredagar under året', 'Mondays to Fridays in the year'), num(brutto, l)],
          [T(l, 'varav lediga (röda dagar och valda aftnar)', 'of which off (holidays and chosen eves)'), num(brutto - sum, l)],
          [T(l, 'Första halvåret', 'First half'), num(sumA(m.slice(0, 6)), l)],
          [T(l, 'Andra halvåret', 'Second half'), num(sumA(m.slice(6)), l)],
        ],
        table: { caption: T(l, `Arbetsdagar per månad ${y}`, `Working days per month, ${y}`), headers: [T(l, 'Månad', 'Month'), T(l, 'Arbetsdagar', 'Working days'), T(l, 'Arbetstimmar à 8 tim', 'Hours at 8 h a day')], rows: MANADER(l).map((mn, i) => [mn, num(m[i], l), num(m[i] * 8, l)]), align: ['l', 'r', 'r'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ påsk (Gauss påskformel) */
export function gaussSteg(x: number) {
  const K = Math.floor(x / 100), M = 15 + Math.floor((3 * K + 3) / 4) - Math.floor((8 * K + 13) / 25), S = 2 - Math.floor((3 * K + 3) / 4);
  const A = x % 19, D = (19 * A + M) % 30, R = Math.floor((D + Math.floor(A / 11)) / 29), OG = 21 + D - R;
  const SZ = 7 - ((x + Math.floor(x / 4) + S) % 7), OE = 7 - ((((OG - SZ) % 7) + 7) % 7);
  return { K, M, S, A, D, R, OG, SZ, OE, OS: OG + OE };
}
function osSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fAr(l, Number(a.ar ?? 2027), yearRange(2000, 2060))],
    run: (v) => {
      const y = n(v, 'ar'), os = paskdagen(y), g = gaussSteg(y);
      const sem = semesterdagar(plusDays(os, -6), plusDays(os, 1)).sem;
      return {
        label: T(l, `Påskdagen ${y}`, `Easter Sunday ${y}`),
        value: dLong(os, l),
        sub: T(l, `Långfredagen ${dLong(plusDays(os, -2), l)} och annandag påsk ${dLong(plusDays(os, 1), l)} är röda dagar: fyra dagar ledigt i rad.`, `Good Friday, ${dLong(plusDays(os, -2), l)}, and Easter Monday, ${dLong(plusDays(os, 1), l)}, are public holidays: four days off in a row.`),
        rows: [
          [T(l, 'Palmsöndagen', 'Palm Sunday'), dShort(plusDays(os, -7), l)],
          [T(l, 'Skärtorsdagen (ingen röd dag)', 'Maundy Thursday (not a holiday)'), dShort(plusDays(os, -3), l)],
          [T(l, 'Långfredagen', 'Good Friday'), dShort(plusDays(os, -2), l)],
          [T(l, 'Påskafton (ingen röd dag)', 'Holy Saturday (not a holiday)'), dShort(plusDays(os, -1), l)],
          [T(l, 'Annandag påsk', 'Easter Monday'), dShort(plusDays(os, 1), l)],
          [T(l, 'Semesterdagar för hela påskveckan', 'Leave days for the whole Easter week'), num(sem, l)],
          [T(l, 'Kristi himmelsfärdsdag', 'Ascension Day'), dShort(plusDays(os, 39), l)],
          [T(l, 'Pingstdagen', 'Whit Sunday'), dShort(plusDays(os, 49), l)],
        ],
        table: {
          caption: T(l, `Gauss påskformel för ${y}, steg för steg`, `Gauss's Easter formula for ${y}, step by step`),
          headers: [T(l, 'Storhet', 'Quantity'), T(l, 'Betydelse', 'Meaning'), T(l, 'Värde', 'Value')],
          rows: [
            ['K', T(l, 'sekeltal', 'Century number'), String(g.K)], ['M', T(l, 'sekulär månkorrektion', 'Lunar correction'), String(g.M)], ['S', T(l, 'sekulär solkorrektion', 'Solar correction'), String(g.S)],
            ['A', T(l, 'månparameter (årets plats i 19-årscykeln)', 'Lunar parameter (place in the 19-year cycle)'), String(g.A)], ['D', T(l, 'grund för vårens första fullmåne', 'Seed for the first spring full moon'), String(g.D)], ['R', T(l, 'kalendarisk korrektion', 'Calendar correction'), String(g.R)],
            ['OG', T(l, 'påskgräns (dag i mars)', 'Paschal full moon (day of March)'), String(g.OG)], ['SZ', T(l, 'första söndagen i mars', 'First Sunday in March'), String(g.SZ)], ['OE', T(l, 'avstånd till påskdagen', 'Days to Easter Sunday'), String(g.OE)],
            ['OS', T(l, 'påskdagen som dag i mars (32 = 1 april)', 'Easter Sunday as a day of March (32 = 1 April)'), String(g.OS)],
          ],
          align: ['l', 'l', 'r'],
        },
      };
    },
  };
}

/* ------------------------------------------------------------------ midsommar */
function msSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fAr(l, Number(a.ar ?? 2027), yearRange(2024, 2040))],
    run: (v) => {
      const y = n(v, 'ar'), md = midsommardagen(y), ma = midsommarafton(y);
      const vecka = isoVecka(ma).week;
      return {
        label: T(l, `Midsommarafton ${y}`, `Midsummer Eve ${y}`),
        value: dLong(ma, l),
        sub: T(l, `Midsommardagen, lördagen ${dLong(md, l)}, är röd dag; aftonen är en fredag i vecka ${vecka}.`, `Midsummer Day, Saturday ${dLong(md, l)}, is the public holiday; the eve is a Friday in week ${vecka}.`),
        rows: [
          [T(l, 'Midsommarafton', 'Midsummer Eve'), dShort(ma, l)],
          [T(l, 'Midsommardagen (röd dag)', 'Midsummer Day (public holiday)'), dShort(md, l)],
          [T(l, 'Vecka', 'Week'), String(vecka)],
          [T(l, 'Semesterdagar för veckan före (mån–tor)', 'Leave days for the week before (Mon–Thu)'), num(semesterdagar(plusDays(ma, -4), ma).sem, l)],
        ],
        table: { caption: T(l, 'Midsommar de kommande åren', 'Midsummer in the coming years'), headers: [T(l, 'År', 'Year'), T(l, 'Midsommarafton', 'Midsummer Eve'), T(l, 'Midsommardagen', 'Midsummer Day'), T(l, 'Vecka', 'Week')], rows: yearRange(y, y + 7).map((z) => [String(z), dLong(midsommarafton(z), l), dLong(midsommardagen(z), l), String(isoVecka(midsommarafton(z)).week)]), align: ['l', 'l', 'l', 'r'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Kristi himmelsfärd och pingst */
function khSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fAr(l, Number(a.ar ?? 2027), yearRange(2024, 2040))],
    run: (v) => {
      const y = n(v, 'ar'), os = paskdagen(y), kh = plusDays(os, 39), pd = plusDays(os, 49);
      return {
        label: T(l, `Kristi himmelsfärdsdag ${y}`, `Ascension Day ${y}`),
        value: dLong(kh, l),
        sub: T(l, `Alltid en torsdag, 39 dagar efter påskdagen: fredagen ${dShort(plusDays(kh, 1), l)} är en klämdag.`, `Always a Thursday, 39 days after Easter Sunday: Friday ${dShort(plusDays(kh, 1), l)} is a bridge day.`),
        rows: [
          [T(l, 'Klämdag', 'Bridge day'), dShort(plusDays(kh, 1), l)],
          [T(l, 'Ledigt torsdag–söndag med 1 semesterdag', 'Off Thursday to Sunday with 1 leave day'), T(l, '4 dagar', '4 days')],
          [T(l, 'Pingstdagen (söndag)', 'Whit Sunday'), dShort(pd, l)],
          [T(l, 'Annandag pingst', 'Whit Monday'), T(l, 'vardag sedan 2005', 'working day since 2005')],
        ],
        table: { caption: T(l, 'Kristi himmelsfärd och pingst de kommande åren', 'Ascension and Whitsun in the coming years'), headers: [T(l, 'År', 'Year'), T(l, 'Kristi himmelsfärdsdag', 'Ascension Day'), T(l, 'Klämdag', 'Bridge day'), T(l, 'Pingstdagen', 'Whit Sunday')], rows: yearRange(y, y + 7).map((z) => { const o2 = paskdagen(z); return [String(z), dLong(plusDays(o2, 39), l), dLong(plusDays(o2, 40), l), dLong(plusDays(o2, 49), l)]; }), align: ['l', 'l', 'l', 'l'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ alla helgons dag */
function ahSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fAr(l, Number(a.ar ?? 2026), yearRange(2024, 2040))],
    run: (v) => {
      const y = n(v, 'ar'), d = allaHelgonsDag(y);
      return {
        label: T(l, `Alla helgons dag ${y}`, `All Saints' Day ${y}`),
        value: dLong(d, l),
        sub: T(l, 'Lördagen mellan 31 oktober och 6 november. Den ger ingen extra ledig dag, men allhelgonaafton dagen före är en fredag.', 'The Saturday between 31 October and 6 November. It brings no extra day off, but All Saints’ Eve the day before is a Friday.'),
        rows: [
          [T(l, 'Allhelgonaafton (fredag, vardag)', "All Saints' Eve (Friday, working day)"), dShort(plusDays(d, -1), l)],
          [T(l, 'Alla helgons dag (röd dag)', "All Saints' Day (public holiday)"), dShort(d, l)],
          [T(l, 'Vecka', 'Week'), String(isoVecka(d).week)],
          [T(l, 'Höstlovet i de flesta kommuner', 'Autumn school break in most municipalities'), T(l, 'vecka 44', 'week 44')],
        ],
        table: { caption: T(l, 'Alla helgons dag de kommande åren', "All Saints' Day in the coming years"), headers: [T(l, 'År', 'Year'), T(l, 'Allhelgonaafton', "All Saints' Eve"), T(l, 'Alla helgons dag', "All Saints' Day"), T(l, 'Vecka', 'Week')], rows: yearRange(y, y + 7).map((z) => [String(z), dLong(plusDays(allaHelgonsDag(z), -1), l), dLong(allaHelgonsDag(z), l), String(isoVecka(allaHelgonsDag(z)).week)]), align: ['l', 'l', 'l', 'r'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ jul och nyår */
function julSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fAr(l, Number(a.ar ?? 2026), yearRange(2024, 2035))],
    run: (v) => {
      const y = n(v, 'ar');
      const fran = toIso(dayNum(y, 12, 19)), till = toIso(dayNum(y + 1, 1, 6));
      const sd = semesterdagar(plusDays(toIso(dayNum(y, 12, 23)), 0), toIso(dayNum(y + 1, 1, 6)));
      const sdHela = semesterdagar(fran, till);
      return {
        label: T(l, `Julafton ${y}`, `Christmas Eve ${y}`),
        value: wdLong(`${y}-12-24`, l),
        sub: T(l, `Julafton faller på en ${wdLong(`${y}-12-24`, l)}, nyårsafton på en ${wdLong(`${y}-12-31`, l)}. Ingen av dem räknas som semesterdag.`, `Christmas Eve falls on a ${wdLong(`${y}-12-24`, l)}, New Year's Eve on a ${wdLong(`${y}-12-31`, l)}. Neither counts as a leave day.`),
        rows: [
          [T(l, 'Juldagen', 'Christmas Day'), dShort(`${y}-12-25`, l)],
          [T(l, 'Annandag jul', 'Boxing Day'), dShort(`${y}-12-26`, l)],
          [T(l, 'Nyårsdagen', "New Year's Day"), dShort(`${y + 1}-01-01`, l)],
          [T(l, 'Trettondedag jul', 'Epiphany'), dShort(`${y + 1}-01-06`, l)],
          [T(l, `Semesterdagar 23 dec–6 jan`, 'Leave days 23 Dec to 6 Jan'), num(sd.sem, l)],
          [T(l, `Semesterdagar 19 dec–6 jan (${num(sdHela.kalender, l)} dagar)`, `Leave days 19 Dec to 6 Jan (${num(sdHela.kalender, l)} days)`), num(sdHela.sem, l)],
        ],
        table: { caption: T(l, 'Jul och nyår de kommande åren: veckodag och semesterdagar 23 december–6 januari', 'Christmas and New Year in the coming years: weekday and leave days 23 December to 6 January'), headers: [T(l, 'År', 'Year'), T(l, 'Julafton', 'Christmas Eve'), T(l, 'Nyårsafton', "New Year's Eve"), T(l, 'Semesterdagar', 'Leave days')], rows: yearRange(y, y + 6).map((z) => [String(z), wdLong(`${z}-12-24`, l), wdLong(`${z}-12-31`, l), num(semesterdagar(`${z}-12-23`, `${z + 1}-01-06`).sem, l)]), align: ['l', 'l', 'l', 'r'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ nationaldagen */
function ndSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fAr(l, Number(a.ar ?? 2027), yearRange(2024, 2040))],
    run: (v) => {
      const y = n(v, 'ar'), d = `${y}-06-06`, w = new Date(fromIso(d) * 864e5).getUTCDay();
      const effekt = w === 0 || w === 6 ? T(l, 'faller på en helg: ingen extra ledig dag', 'falls at a weekend: no extra day off') : w === 2 ? T(l, 'tisdag: måndagen blir klämdag', 'Tuesday: the Monday becomes a bridge day') : w === 4 ? T(l, 'torsdag: fredagen blir klämdag', 'Thursday: the Friday becomes a bridge day') : T(l, 'ger en långhelg eller en ledig dag mitt i veckan', 'gives a long weekend or a midweek day off');
      return {
        label: T(l, `Sveriges nationaldag ${y}`, `National Day of Sweden ${y}`),
        value: wdLong(d, l),
        sub: T(l, `6 juni ${y} ${effekt}.`, `6 June ${y} ${effekt}.`),
        rows: [[T(l, 'Datum', 'Date'), dLong(d, l)], [T(l, 'Vecka', 'Week'), String(isoVecka(d).week)], [T(l, 'Röd dag sedan', 'Public holiday since'), '2005']],
        table: { caption: T(l, 'Nationaldagen de kommande åren', 'National Day in the coming years'), headers: [T(l, 'År', 'Year'), T(l, 'Veckodag', 'Weekday'), T(l, 'Vecka', 'Week')], rows: yearRange(y, y + 7).map((z) => [String(z), wdLong(`${z}-06-06`, l), String(isoVecka(`${z}-06-06`).week)]), align: ['l', 'l', 'r'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ sommartid */
export const sommartid = (y: number) => ({ start: nthWeekday(y, 3, 0, -1), slut: nthWeekday(y, 10, 0, -1) });
function zuSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fAr(l, Number(a.ar ?? 2027), yearRange(2022, 2035)), { kind: 'choice', id: 'vad', label: T(l, 'Omställning', 'Change'), def: String(a.vad ?? 'var'), options: [{ value: 'var', label: T(l, 'Våren', 'Spring') }, { value: 'host', label: T(l, 'Hösten', 'Autumn') }] }],
    run: (v) => {
      const y = n(v, 'ar'), z = sommartid(y), host = s(v, 'vad') === 'host';
      return {
        label: host ? T(l, `Sommartiden slutar ${y}`, `Summer time ends ${y}`) : T(l, `Sommartiden börjar ${y}`, `Summer time starts ${y}`),
        value: dLong(host ? z.slut : z.start, l),
        sub: host ? T(l, 'Kl. 03:00 ställs klockan tillbaka till 02:00: en timme längre natt.', 'At 03:00 clocks go back to 02:00: one extra hour of sleep.') : T(l, 'Kl. 02:00 ställs klockan fram till 03:00: en timme kortare natt.', 'At 02:00 clocks go forward to 03:00: one hour less sleep.'),
        rows: [
          [T(l, 'Klockan fram (vår)', 'Clocks forward (spring)'), dShort(z.start, l)],
          [T(l, 'Klockan tillbaka (höst)', 'Clocks back (autumn)'), dShort(z.slut, l)],
          [T(l, 'Dagar med sommartid', 'Days on summer time'), num(fromIso(z.slut) - fromIso(z.start), l)],
          [T(l, 'Regel', 'Rule'), T(l, 'förordning (2001:127)', 'Ordinance (2001:127)')],
        ],
        table: { caption: T(l, 'Sommartid i Sverige de kommande åren', 'Summer time in Sweden in the coming years'), headers: [T(l, 'År', 'Year'), T(l, 'Fram (02 → 03)', 'Forward (02:00 → 03:00)'), T(l, 'Tillbaka (03 → 02)', 'Back (03:00 → 02:00)')], rows: yearRange(y, y + 5).map((x) => { const w = sommartid(x); return [String(x), dLong(w.start, l), dLong(w.slut, l)]; }), align: ['l', 'l', 'l'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ vecka */
function kwSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fAr(l, Number(a.ar ?? 2027), yearRange(2025, 2030)), { kind: 'select', id: 'v', label: T(l, 'Vecka', 'Week'), def: String(a.v ?? 1), options: (v: V) => yearRange(1, veckorIAret(n(v, 'ar'))).map((w) => ({ value: String(w), label: T(l, `Vecka ${w}`, `Week ${w}`) })) }],
    run: (v) => {
      const y = n(v, 'ar'), w = n(v, 'v');
      const ma = mandagIVecka(y, w), so = plusDays(ma, 6);
      const hol = [...helgdagar(y - 1, { aftnar: true }), ...helgdagar(y, { aftnar: true }), ...helgdagar(y + 1, { aftnar: true })].filter((f) => f.date >= ma && f.date <= so);
      return {
        label: T(l, `Vecka ${w} ${y}`, `Week ${w}, ${y}`),
        value: `${dShort(ma, l)} – ${dShort(so, l)}`,
        sub: T(l, `${y} har ${veckorIAret(y)} veckor enligt ISO 8601.`, `${y} has ${veckorIAret(y)} ISO 8601 weeks.`),
        rows: [[T(l, 'Måndag', 'Monday'), dLong(ma, l)], [T(l, 'Söndag', 'Sunday'), dLong(so, l)], [T(l, 'Röda dagar och aftnar', 'Holidays and eves'), hol.length ? hol.map((f) => f.name[l]).join(', ') : T(l, 'inga', 'none')], [T(l, 'Arbetsdagar i veckan', 'Working days that week'), num([0, 1, 2, 3, 4].filter((i) => arVardag(plusDays(ma, i))).length, l)]],
      };
    },
  };
}

/* ------------------------------------------------------------------ semesterdagar för en ledighet */
function sdSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fAr(l, Number(a.ar ?? 2027)), fManad(l, Number(a.man ?? 7)), { id: 'dag', label: T(l, 'Första lediga dagen (datum)', 'First day off (date)'), def: Number(a.dag ?? 1), max: 31 }, { id: 'langd', label: T(l, 'Antal kalenderdagar borta', 'Calendar days away'), def: Number(a.langd ?? 28), unit: T(l, 'dagar', 'days'), max: 120 }, { id: 'ratt', label: T(l, 'Dina semesterdagar per år', 'Your leave days per year'), def: Number(a.ratt ?? P.semester.dagar), unit: T(l, 'dagar', 'days'), max: 60, adv: true }],
    run: (v) => {
      const fran = datumAv(v), len = Math.max(1, Math.round(n(v, 'langd'))), till = plusDays(fran, len - 1);
      const r = semesterdagar(fran, till), ratt = Math.round(n(v, 'ratt'));
      const huvud = r.kalender >= 28 && fran.slice(5, 7) >= '06' && till.slice(5, 7) <= '08';
      return {
        label: T(l, `Ledigt ${dShort(fran, l)} – ${dShort(till, l)}`, `Off ${dShort(fran, l)} to ${dShort(till, l)}`),
        value: T(l, `${num(r.sem, l)} semesterdagar`, `${num(r.sem, l)} leave days`),
        sub: T(l, 'Lördagar, söndagar, röda dagar och midsommar-, jul- och nyårsafton räknas inte (3 a § semesterlagen).', 'Saturdays, Sundays, public holidays and Midsummer, Christmas and New Year’s Eve are not counted (Annual Leave Act, s. 3a).'),
        rows: [
          [T(l, 'Kalenderdagar', 'Calendar days'), num(r.kalender, l)],
          [T(l, 'Dagar som inte kostar semester', 'Days that cost no leave'), num(r.fria, l)],
          [T(l, 'Kvar av dina semesterdagar', 'Left of your leave days'), num(Math.max(0, ratt - r.sem), l)],
          [T(l, 'Fyra veckor juni–augusti (12 §)', 'Four weeks June to August (s. 12)'), huvud ? T(l, 'ja', 'yes') : T(l, 'nej', 'no')],
        ],
        note: r.sem > ratt ? T(l, `Ledigheten kräver ${num(r.sem - ratt, l)} dagar mer än du har; sparade dagar (18 §) eller tjänstledighet kan täcka mellanskillnaden.`, `The trip needs ${num(r.sem - ratt, l)} more days than you have; saved days (s. 18) or unpaid leave can cover the gap.`) : undefined,
      };
    },
  };
}

/* ------------------------------------------------------------------ frist enligt lagen (1930:173) */
function tfSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fAr(l, Number(a.ar ?? 2026), yearRange(2026, 2028)), fManad(l, Number(a.man ?? 12)), { id: 'dag', label: T(l, 'Startdatum (dag)', 'Start date (day)'), def: Number(a.dag ?? 1), max: 31 }, { id: 'frist', label: T(l, 'Fristens längd', 'Length of the time limit'), def: Number(a.frist ?? 23), unit: T(l, 'dagar', 'days'), max: 365 }],
    run: (v) => {
      const start = datumAv(v), f = Math.max(0, Math.round(n(v, 'frist'))), sista = plusDays(start, f), flyttad = nastaVardag(sista);
      const ar2 = flyttad !== sista;
      return {
        label: T(l, `Frist på ${dagar(f, l)} från ${dLong(start, l)}`, `${dagar(f, l)} from ${dLong(start, l)}`),
        value: dLong(flyttad, l),
        sub: ar2 ? T(l, `Sista dagen blir ${dWeek(sista, l)}, som inte är en vardag: enligt 2 § lagen (1930:173) räcker det att agera nästa vardag.`, `The last day would be ${dWeek(sista, l)}, which is not a weekday: under section 2 of the 1930 Act you may act on the next weekday.`) : T(l, `${dWeek(sista, l)} är en vardag: fristen flyttas inte.`, `${dWeek(sista, l)} is a weekday: the time limit does not move.`),
        rows: [[T(l, 'Räknad sista dag', 'Computed last day'), dWeek(sista, l)], [T(l, 'Sista dag att agera', 'Last day to act'), dWeek(flyttad, l)], [T(l, 'Flyttad', 'Moved'), ar2 ? dagar(fromIso(flyttad) - fromIso(sista), l) : T(l, 'nej', 'no')]],
        note: T(l, 'Gäller frister i lag eller annan författning; vissa frister i rättegångsbalken är undantagna, och ett avtal kan ha egna regler.', 'Applies to time limits set by statute; some court deadlines are excluded, and a contract may have its own rules.'),
      };
    },
  };
}

/* ------------------------------------------------------------------ skollov per kommun */
const LOVTYP = (l: Lang): Array<{ value: LovTyp; label: string }> => [
  { value: 'hostlov2026', label: T(l, 'Höstlov 2026', 'Autumn break 2026') },
  { value: 'jullov2026', label: T(l, 'Jullov 2026/27', 'Christmas break 2026/27') },
  { value: 'sportlov2027', label: T(l, 'Sportlov 2027', 'Winter sports break 2027') },
  { value: 'pasklov2027', label: T(l, 'Påsklov 2027', 'Easter break 2027') },
  { value: 'sommarlov2027', label: T(l, 'Sommarlov 2027', 'Summer holidays 2027') },
  { value: 'hostlov2027', label: T(l, 'Höstlov 2027', 'Autumn break 2027') },
  { value: 'sportlov2028', label: T(l, 'Sportlov 2028', 'Winter sports break 2028') },
];
const ejPubl = (l: Lang) => T(l, 'inte publicerat än', 'not published yet');
function lovSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [
      { kind: 'select', id: 'kommun', label: T(l, 'Kommun', 'Municipality'), def: String(a.kommun ?? 'stockholm'), options: KOMMUNER.map((k) => ({ value: k.id, label: k.name })) },
      { kind: 'select', id: 'typ', label: T(l, 'Lov', 'Break'), def: String(a.typ ?? 'sportlov2027'), options: LOVTYP(l) },
    ],
    run: (v) => {
      const k = kommun(s(v, 'kommun')), typ = s(v, 'typ') as LovTyp;
      const typNamn = LOVTYP(l).find((x) => x.value === typ)!.label;
      const sp = lov(k, typ), som = typ === 'sommarlov2027';
      const svep = som ? null : ledigtISvep(sp);
      const visa = (x: LovTyp) => { const z = lov(k, x); return z ? (x === 'sommarlov2027' ? T(l, `från ${dShort(z[0], l)}`, `from ${dShort(z[0], l)}`) : span(z[0], z[1], l)) : ejPubl(l); };
      return {
        label: `${typNamn}, ${k.name}`,
        value: sp ? (som ? T(l, `från ${dLong(sp[0], l)}`, `from ${dLong(sp[0], l)}`) : span(sp[0], sp[1], l)) : ejPubl(l),
        sub: sp ? (som ? T(l, `Vårterminen slutar ${dWeek(k.vartermin_slut, l)}.`, `The spring term ends ${dWeek(k.vartermin_slut, l)}.`) : T(l, `Vecka ${isoVecka(sp[0]).week}${svep ? `; ledigt i ett svep ${span(svep[0], svep[1], l)}` : ''}.`, `Week ${isoVecka(sp[0]).week}${svep ? `; off in one go ${span(svep[0], svep[1], l)}` : ''}.`)) : T(l, 'Kommunen har inte beslutat eller publicerat datumet ännu.', 'The municipality has not decided or published the date yet.'),
        rows: [
          [T(l, 'Län', 'County'), k.lan],
          [T(l, 'Höstlov 2026', 'Autumn break 2026'), visa('hostlov2026')],
          [T(l, 'Sportlov 2027', 'Sports break 2027'), visa('sportlov2027')],
          [T(l, 'Påsklov 2027', 'Easter break 2027'), visa('pasklov2027')],
          [T(l, 'Sista skoldag före sommaren', 'Last day before summer'), dShort(k.vartermin_slut, l)],
        ],
        table: {
          caption: T(l, `${typNamn} i 24 kommuner, från kommunernas egna beslut (lästa ${dLong(P.retrieved_at, l)})`, `${typNamn} in 24 municipalities, from their own decisions (read ${dLong(P.retrieved_at, l)})`),
          headers: [T(l, 'Kommun', 'Municipality'), T(l, 'Län', 'County'), T(l, 'Datum', 'Dates'), T(l, 'Vecka', 'Week')],
          rows: KOMMUNER.map((x) => { const z = lov(x, typ); return [`<a href="${x.url}" target="_blank" rel="nofollow noopener noreferrer">${x.name}</a>`, x.lan, z ? (som ? T(l, `från ${dShort(z[0], l)}`, `from ${dShort(z[0], l)}`) : span(z[0], z[1], l)) : ejPubl(l), z ? String(isoVecka(z[0]).week) : '–']; }),
          align: ['l', 'l', 'l', 'r'],
        },
      };
    },
  };
}

export const SPECS: Record<string, (l: Lang, arg?: Args) => ToolSpec> = { bt: btSpec, rd: rdSpec, at: atSpec, os: osSpec, ms: msSpec, kh: khSpec, ah: ahSpec, jul: julSpec, nd: ndSpec, zu: zuSpec, kw: kwSpec, sd: sdSpec, tf: tfSpec, lov: lovSpec };
export const TOOL_KINDS = [...Object.keys(SPECS), 'kalender', 'nasta'];
export function getTool(kind: string, l: Lang, arg?: Args): ToolSpec {
  const f = SPECS[kind]; if (!f) throw new Error(`simulateur inconnu : ${kind}`);
  return f(l, arg);
}
/** Lance un simulateur avec ses valeurs par défaut (ou celles données) : sert aux pages et aux tests. */
export function runTool(kind: string, l: Lang, arg?: Args, values?: V): ToolOut {
  const spec = getTool(kind, l, arg);
  const v = Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])) as V;
  return spec.run(resolve(spec.inputs, { ...v, ...(values ?? {}) }));
}
export { formatNumber, aftnar };
