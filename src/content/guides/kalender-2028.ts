/** Kalender 2028 : skottår, kvartal, veckonummer. Composant Kalender + mini at. Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, wdLong, n, arbets, rodaVardagar, lista, type Lang } from '../_lib';

const Y = 2028;
const T = (l: Lang, sv: string, en: string) => (l === 'sv' ? sv : en);
const man = (m: number, l: Lang) => new Date(Date.UTC(Y, m, 15)).toLocaleDateString(l === 'sv' ? 'sv-SE' : 'en-GB', { month: 'long', timeZone: 'UTC' });
const ad = K.arbetsdagar(Y, { aftnar: true });
const at = arbets(Y), at27 = arbets(Y - 1);
const veckor = K.veckorIAret(Y);
const nyar = K.isoVecka(`${Y}-01-01`);
const v1 = K.mandagIVecka(Y, 1);
const kv = [0, 1, 2, 3].map((q) => ad.slice(q * 3, q * 3 + 3).reduce((a, b) => a + b, 0));
const kvRoda = (q: number) => rodaVardagar(Y).filter((f) => Math.floor((Number(f.date.slice(5, 7)) - 1) / 3) === q).length;
const kalDagar = (q: number) => (Date.UTC(Y, q * 3 + 3, 1) - Date.UTC(Y, q * 3, 1)) / 864e5;
const minM = (l: Lang) => man(ad.indexOf(Math.min(...ad)), l);
const maxM = (l: Lang) => lista(ad.map((x, m) => (x === Math.max(...ad) ? man(m, l) : '')).filter(Boolean), l);
const tabell = (h: { table: (a: string[], r: Array<Array<string | number>>, c?: string, al?: Array<'l' | 'r'>) => string }, l: Lang) => h.table(
  [T(l, 'Kvartal', 'Quarter'), T(l, 'Kalenderdagar', 'Calendar days'), T(l, 'Arbetsdagar', 'Working days'), T(l, 'Röda vardagar', 'Weekday holidays')],
  kv.map((x, q) => [`Q${q + 1}`, kalDagar(q), x, kvRoda(q)]),
  T(l, `Kvartalen ${Y}`, `The quarters of ${Y}`), ['l', 'r', 'r', 'r'],
);

export default defineGuide({
  id: 'kalender-2028', group: 'roda', order: 16, tool: 'kalender', toolArg: { ar: Y },
  related: ['roda-dagar-2028', 'klamdagar-2028', 'kalender-2027', 'vecka'],
  sources: ['helgdagslag', 'semesterlag'],
  sv: {
    slug: 'kalender-2028', nav: 'Kalender 2028', card: 'Skottåret med veckor, röda dagar och kvartal',
    title: 'Kalender 2028: skottår med veckonummer och röda dagar',
    description: `Kalender 2028 med veckonummer, röda dagar och aftnar. Skottåret har 366 dagar, ${veckor} veckor och ${at} arbetsdagar, fördelade på kvartal och månader i tabellen.`,
    h1: 'Kalender 2028',
    intro: `${Y} är ett skottår som börjar på en lördag. Kalendern visar alla veckor med nummer, de röda dagarna och, om du vill, aftnarna.`,
    resume: `${Y} har 366 dagar eftersom februari får sin 29:e dag, en ${wdLong(`${Y}-02-29`, 'sv')}. Året börjar på en lördag som räknas till vecka ${nyar.week} år ${nyar.year}, och vecka 1 inleds måndagen den ${dLong(v1, 'sv')}. Sista dagen, söndagen den 31 december, ligger i vecka ${K.isoVecka(`${Y}-12-31`).week}, så året har ${veckor} hela veckor. Arbetsdagarna blir ${n(at, 'sv')} när röda dagar och midsommar-, jul- och nyårsafton dras av, ${at27 - at} färre än ${Y - 1} trots skottdagen. Orsaken är att ${rodaVardagar(Y).length} röda dagar infaller på vardagar. Kortast blir ${minM('sv')} med ${Math.min(...ad)} arbetsdagar, eftersom både långfredagen och annandag påsk ligger där. Längst blir ${maxM('sv')} med ${Math.max(...ad)}. Andra kvartalet har ${kv[1]} arbetsdagar och är årets kortaste; tredje kvartalet, med ${kv[2]}, är det längsta eftersom det helt saknar röda dagar.`,
    faqs: [
      { q: 'Vilken veckodag är skottdagen 2028?', a: `Den 29 februari ${Y} är en ${wdLong(`${Y}-02-29`, 'sv')} i vecka ${K.isoVecka(`${Y}-02-29`).week}. Den är en vanlig arbetsdag och ger februari ${ad[1]} arbetsdagar. För den som har månadslön ändrar skottdagen inget, men för timanställda blir det en arbetsdag mer än ett vanligt år med samma veckodagar.` },
      { q: 'I vilken vecka börjar kalendern för 2028?', a: `Nyårsdagen ${Y} är en lördag och hör till vecka ${nyar.week} år ${nyar.year}. Den första veckan som räknas till ${Y} börjar måndagen den ${dLong(v1, 'sv')}. Året slutar på en söndag, så nästa år börjar prydligt med vecka 1 på måndagen den 1 januari ${Y + 1}.` },
      { q: 'Vilket kvartal 2028 har flest arbetsdagar?', a: `Tredje kvartalet, juli till september, med ${kv[2]} arbetsdagar, eftersom det saknar röda dagar helt. Andra kvartalet har bara ${kv[1]}, då påsken, första maj, Kristi himmelsfärdsdag, nationaldagen och midsommarafton alla infaller på vardagar. Det spelar roll för budgetar, fakturering per dag och kvartalsmål.` },
    ],
    body: (h) => `<h2>Kvartal för kvartal</h2>
<p>Den som planerar arbete, budget eller fakturering per dag har nytta av att se året i kvartal. Tabellen räknar arbetsdagar som måndag till fredag utan röda dagar och utan de tre aftnar som ${h.src('semesterlag', 'semesterlagen')} jämställer med söndag.</p>
${tabell(h, 'sv')}
<p>Skillnaden mellan kvartalen är ${Math.max(...kv) - Math.min(...kv)} arbetsdagar, drygt en arbetsvecka. Det beror nästan helt på de rörliga helgdagarna i ${h.src('helgdagslag', 'lagen om allmänna helgdagar')}, som samlas till våren. Påsken infaller i mitten av april, och sedan följer första maj, Kristi himmelsfärdsdag och nationaldagen tätt. Sommaren och hösten saknar röda vardagar, så den som har mål per kvartal får mest tid efter midsommar. Fjärde kvartalet tappar två dagar på juldagen och annandag jul, som ${Y} infaller på måndag och tisdag.</p>
<h2>Räkna arbetsdagar för ${Y}</h2>
<p>Arbetar du fyra dagar i veckan, eller vill du räkna aftnarna som arbetsdagar, ger räknaren nedan antalet för just ditt schema, månad för månad. Med deltid eller fyradagarsvecka spelar det stor roll vilka veckodagar de röda dagarna faller på: ${Y} drabbar de måndagar och tisdagar oftare än fredagar, vilket den som är ledig på fredagar märker.</p>
${h.mini('at', { p: ['vecka', 'af'], d: { ar: Y }, c: 'Räkna arbetsdagar per månad' })}
<h2>Lediga vardagar och skollov</h2>
<p>${Y} är ett bra år för den som vill ta korta ledigheter, med tre äkta klämdagar. Var de ligger och hur mycket ledighet tio semesterdagar ger visar ${h.a('klamdagar-2028', 'klämdagar 2028')}, och alla röda dagar med veckodag finns under ${h.a('roda-dagar-2028', 'röda dagar 2028')}. Skolornas lov beslutas av varje kommun; de datum som redan är publicerade, bland annat sportlovet ${Y} i flera kommuner, finns under ${h.a('skollov-2027', 'skollov')}. Föregående år står i ${h.a('kalender-2027', 'kalender 2027')}.</p>`,
  },
  en: {
    slug: 'calendar-2028', nav: 'Calendar 2028', card: 'The leap year with weeks, holidays and quarters',
    title: 'Calendar 2028: Leap Year With Week Numbers and Holidays',
    description: `Swedish calendar 2028 with week numbers, public holidays and eves. The leap year has 366 days, ${veckor} weeks and ${at} working days, split by quarter and month.`,
    h1: 'Swedish calendar 2028',
    intro: `${Y} is a leap year that starts on a Saturday. The calendar shows every week with its number, the public holidays and, if you like, the eves.`,
    resume: `${Y} has 366 days because February gets its 29th day, a ${wdLong(`${Y}-02-29`, 'en')}. The year opens on a Saturday that counts as week ${nyar.week} of ${nyar.year}, and week 1 begins on Monday ${dLong(v1, 'en')}. The last day, Sunday 31 December, is in week ${K.isoVecka(`${Y}-12-31`).week}, so the year has ${veckor} full weeks. Working days come to ${n(at, 'en')} once holidays and Midsummer, Christmas and New Year's Eve are removed, ${at27 - at} fewer than ${Y - 1} despite the leap day. The reason is that ${rodaVardagar(Y).length} public holidays fall on weekdays. The shortest month is ${minM('en')}, with ${Math.min(...ad)} working days, since Good Friday and Easter Monday both fall in it. The longest are ${maxM('en')}, with ${Math.max(...ad)}. The second quarter has ${kv[1]} working days and is the year's shortest; the third, with ${kv[2]}, is the longest because it has no public holidays at all.`,
    faqs: [
      { q: 'What weekday is the 2028 leap day?', a: `29 February ${Y} is a ${wdLong(`${Y}-02-29`, 'en')} in week ${K.isoVecka(`${Y}-02-29`).week}. It is an ordinary working day and gives February ${ad[1]} working days. On a monthly salary the leap day changes nothing, but hourly workers get one more working day than in a normal year with the same weekdays.` },
      { q: 'In which week does the 2028 calendar start?', a: `New Year's Day ${Y} is a Saturday and belongs to week ${nyar.week} of ${nyar.year}. The first week counted as ${Y} starts on Monday ${dLong(v1, 'en')}. The year ends on a Sunday, so the next one starts neatly with week 1 on Monday 1 January ${Y + 1}.` },
      { q: 'Which quarter of 2028 has the most working days?', a: `The third quarter, July to September, with ${kv[2]} working days, because it has no public holidays at all. The second quarter has only ${kv[1]}, as Easter, May Day, Ascension Day, National Day and Midsummer Eve all fall on weekdays. That matters for budgets, day-rate invoicing and quarterly targets.` },
    ],
    body: (h) => `<h2>Quarter by quarter</h2>
<p>Anyone planning work, budgets or day-rate invoicing benefits from seeing the year in quarters. The table counts working days as Monday to Friday without public holidays and without the three eves the ${h.src('semesterlag', 'Annual Leave Act')} treats like Sundays.</p>
${tabell(h, 'en')}
<p>The gap between quarters is ${Math.max(...kv) - Math.min(...kv)} working days, a little over a working week. It comes almost entirely from the movable holidays in the ${h.src('helgdagslag', 'Public Holidays Act')}, which cluster in spring. Easter falls in mid-April, followed closely by May Day, Ascension Day and National Day. Summer and autumn have no weekday holidays, so anyone with quarterly targets gets most time after Midsummer. The fourth quarter loses two days to Christmas Day and Boxing Day, which in ${Y} fall on Monday and Tuesday.</p>
<h2>Count working days for ${Y}</h2>
<p>If you work four days a week, or want the eves counted as working days, the counter below gives the figure for your own schedule, month by month. On part time or a four-day week it matters which weekdays the holidays land on: in ${Y} they hit Mondays and Tuesdays more often than Fridays, which anyone off on Fridays will notice.</p>
${h.mini('at', { p: ['vecka', 'af'], d: { ar: Y }, c: 'Count working days per month' })}
<h2>Weekday holidays and school breaks</h2>
<p>${Y} suits anyone who likes short breaks, with three true bridge days. Where they fall and how much time off ten leave days buy is on ${h.a('klamdagar-2028', 'bridge days 2028')}, and every holiday with its weekday is on ${h.a('roda-dagar-2028', 'public holidays 2028')}. School breaks are set by each municipality; dates already published, including the ${Y} sports break in several of them, are on ${h.a('skollov-2027', 'school holidays')}. The previous year is in ${h.a('kalender-2027', 'calendar 2027')}.</p>`,
  },
});
