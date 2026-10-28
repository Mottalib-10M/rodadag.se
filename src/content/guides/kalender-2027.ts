/** Kalender 2027 : veckonummer, arbetsdagar per månad, röda dagar. Composant Kalender + mini kw. Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, wdLong, n, arbets, lista, type Lang } from '../_lib';

const Y = 2027;
const T = (l: Lang, sv: string, en: string) => (l === 'sv' ? sv : en);
const man = (m: number, l: Lang) => new Date(Date.UTC(Y, m, 15)).toLocaleDateString(l === 'sv' ? 'sv-SE' : 'en-GB', { month: 'long', timeZone: 'UTC' });
const ad = K.arbetsdagar(Y, { aftnar: true });
const at = arbets(Y);
const veckor = K.veckorIAret(Y);
const v1 = K.mandagIVecka(Y, 1);
const nyar = K.isoVecka(`${Y}-01-01`);
const rodaI = (m: number) => K.helgdagar(Y).filter((f) => Number(f.date.slice(5, 7)) === m + 1).length;
const farst = ad.indexOf(Math.min(...ad));
const flestM = (l: Lang) => ad.map((x, m) => (x === Math.max(...ad) ? man(m, l) : '')).filter(Boolean);
const utan = K.arbetsdagar(Y);
const extra = (m: number) => utan[m] - ad[m];
const tabell = (h: { table: (a: string[], r: Array<Array<string | number>>, c?: string, al?: Array<'l' | 'r'>) => string }, l: Lang) => h.table(
  [T(l, 'Månad', 'Month'), T(l, 'Arbetsdagar', 'Working days'), T(l, 'Röda dagar', 'Holidays'), T(l, 'Veckor', 'Weeks')],
  ad.map((x, m) => {
    const a = K.isoVecka(`${Y}-${String(m + 1).padStart(2, '0')}-01`).week;
    const last = new Date(Date.UTC(Y, m + 1, 0)).toISOString().slice(0, 10);
    return [man(m, l), x, rodaI(m), `${a}–${K.isoVecka(last).week}`];
  }),
  T(l, `Arbetsdagar och veckor per månad ${Y}`, `Working days and weeks per month ${Y}`), ['l', 'r', 'r', 'l'],
);

export default defineGuide({
  id: 'kalender-2027', group: 'roda', order: 15, tool: 'kalender', toolArg: { ar: Y },
  related: ['roda-dagar-2027', 'vecka', 'arbetsdagar-2027', 'kalender-2028'],
  sources: ['helgdagslag', 'semesterlag'],
  sv: {
    slug: 'kalender-2027', nav: 'Kalender 2027', card: 'Hela året med veckonummer och röda dagar',
    title: 'Kalender 2027 med veckonummer, röda dagar och arbetsdagar',
    description: `Kalender 2027 med veckonummer enligt ISO 8601, alla röda dagar och aftnar markerade och antalet arbetsdagar per månad. Året har ${veckor} veckor och ${at} arbetsdagar.`,
    h1: 'Kalender 2027 med veckonummer',
    intro: `Hela ${Y} på en sida: tolv månader med veckonummer, röda dagar och aftnar. Välj om midsommar-, jul- och nyårsafton ska markeras.`,
    resume: `${Y} börjar på en ${wdLong(`${Y}-01-01`, 'sv')} och slutar på en ${wdLong(`${Y}-12-31`, 'sv')}. Nyårsdagen hör ännu till vecka ${nyar.week} år ${nyar.year}, så vecka 1 börjar först måndagen den ${dLong(v1, 'sv')}. Året har ${veckor} veckor enligt ISO 8601, den standard som svenska kalendrar följer, och 365 dagar. Av dem är ${n(K.vardagarMaFr(Y), 'sv')} måndagar till fredagar. När de röda dagarna och midsommar-, jul- och nyårsafton dras bort återstår ${n(at, 'sv')} arbetsdagar, fördelade från ${Math.min(...ad)} i ${man(farst, 'sv')} till ${Math.max(...ad)} i de bästa månaderna. De röda dagarna är tretton, men bara fem infaller på en vardag. Mars förlorar två dagar på den tidiga påsken, och i december hamnar julafton, juldagen, annandag jul och nyårsafton alla på fredag, lördag eller söndag. Kalendern ovan visar varje vecka med nummer och färgmarkerar helgdagar och aftnar.`,
    faqs: [
      { q: 'Vilken vecka börjar 2027?', a: `Den 1 januari ${Y} är en fredag och tillhör vecka ${nyar.week} år ${nyar.year}. Vecka 1 är den vecka som innehåller årets första torsdag, och ${Y} börjar den måndagen den ${dLong(v1, 'sv')}. Därför står nyårshelgen i två olika år i kalendern, vilket ofta förvirrar vid planering av januari.` },
      { q: 'Hur många veckor har kalenderåret 2027?', a: `${veckor} veckor. Ett år får 53 veckor bara när det börjar på en torsdag, eller på en onsdag eller torsdag under ett skottår. ${Y} börjar på en fredag och är inget skottår. Sista veckan, vecka ${K.isoVecka(`${Y}-12-31`).week}, slutar söndagen den ${dLong(K.plusDays(K.mandagIVecka(Y, veckor), 6), 'sv')}.` },
      { q: 'Vilken månad 2027 har flest arbetsdagar?', a: `Flest, ${Math.max(...ad)} arbetsdagar, har ${lista(flestM('sv'), 'sv')}. Färst har ${man(farst, 'sv')}, med ${Math.min(...ad)}, eftersom nyårsdagen och trettondedag jul båda infaller på vardagar. Siffrorna räknar midsommar-, jul- och nyårsafton som lediga; arbetar du på dem får juni ${extra(5)} och december ${extra(11)} arbetsdagar till.` },
    ],
    body: (h) => `<h2>Månad för månad</h2>
<p>Tabellen visar arbetsdagar, röda dagar och vilka veckonummer som berör varje månad. Arbetsdagarna är vardagar utan röda dagar och utan de tre aftnar som ${h.src('semesterlag', 'semesterlagen')} jämställer med söndag. Röda dagar räknas här enligt ${h.src('helgdagslag', 'lagen om allmänna helgdagar')}, inklusive de som infaller på en helg.</p>
${tabell(h, 'sv')}
<h2>Veckonummer i Sverige</h2>
<p>I Sverige anger man ofta tid med veckonummer: semestern tas vecka 28 till 31, sportlovet är vecka 9 och leveransen kommer vecka 14. Veckan börjar på måndag och vecka 1 är den som innehåller januaris första torsdag. Det innebär att de första dagarna i januari ibland hör till föregående år, som ${Y}, och att de sista dagarna i december ibland hör till nästa. Skolor, byggprojekt och leverantörer räknar nästan alltid i veckor, så det lönar sig att ha numren framför sig när ${Y} planeras. Ta reda på datumen för valfri vecka här:</p>
${h.mini('kw', { p: ['v'], d: { ar: Y, v: 28 }, c: 'Visa datum för en vecka' })}
<h2>Att skriva ut eller dela</h2>
<p>Kalendern ovan fungerar på mobilen och går att skriva ut från webbläsaren. Valet om aftnarna sparas i adressen, så en delad länk visar samma läge. Vill du se vilka dagar som lönar sig att ta ledigt finns planeraren för ${h.a('home', 'klämdagar 2027')}, och listan över röda dagar med veckodagar står under ${h.a('roda-dagar-2027', 'röda dagar 2027')}. Nästa år, med skottdag och fler lediga vardagar, finns i ${h.a('kalender-2028', 'kalender 2028')}.</p>`,
  },
  en: {
    slug: 'calendar-2027', nav: 'Calendar 2027', card: 'The whole year with week numbers and holidays',
    title: 'Calendar 2027 for Sweden With Week Numbers and Holidays',
    description: `Swedish calendar 2027 with ISO 8601 week numbers, every public holiday and eve marked and the number of working days in each month. The year has ${veckor} weeks.`,
    h1: 'Swedish calendar 2027 with week numbers',
    intro: `All of ${Y} on one page: twelve months with week numbers, public holidays and eves. Choose whether Midsummer, Christmas and New Year's Eve are marked.`,
    resume: `${Y} starts on a ${wdLong(`${Y}-01-01`, 'en')} and ends on a ${wdLong(`${Y}-12-31`, 'en')}. New Year's Day still belongs to week ${nyar.week} of ${nyar.year}, so week 1 only begins on Monday ${dLong(v1, 'en')}. The year has ${veckor} weeks under ISO 8601, the standard Swedish calendars follow, and 365 days. Of those, ${n(K.vardagarMaFr(Y), 'en')} are Mondays to Fridays. Take out the public holidays and Midsummer, Christmas and New Year's Eve and ${n(at, 'en')} working days remain, ranging from ${Math.min(...ad)} in ${man(farst, 'en')} to ${Math.max(...ad)} in the longest months. There are thirteen public holidays, but only five fall on a weekday. March loses two days to the early Easter, and in December Christmas Eve, Christmas Day, Boxing Day and New Year's Eve all fall on a Friday, Saturday or Sunday. The calendar above shows every week with its number and colours holidays and eves.`,
    faqs: [
      { q: 'Which week does 2027 start in?', a: `1 January ${Y} is a Friday and belongs to week ${nyar.week} of ${nyar.year}. Week 1 is the week containing the year's first Thursday, and in ${Y} it starts on Monday ${dLong(v1, 'en')}. The New Year weekend is therefore split across two years in the calendar, which often confuses January planning.` },
      { q: 'How many weeks are there in 2027?', a: `${veckor} weeks. A year only has 53 weeks when it starts on a Thursday, or on a Wednesday or Thursday in a leap year. ${Y} starts on a Friday and is not a leap year. The last week, week ${K.isoVecka(`${Y}-12-31`).week}, ends on Sunday ${dLong(K.plusDays(K.mandagIVecka(Y, veckor), 6), 'en')}.` },
      { q: 'Which month of 2027 has the most working days in Sweden?', a: `${lista(flestM('en'), 'en')} share the top spot with ${Math.max(...ad)} working days each. ${man(farst, 'en')} has the fewest, ${Math.min(...ad)}, because New Year's Day and Epiphany both fall on weekdays. The figures treat Midsummer, Christmas and New Year's Eve as days off; if you work them, June gains ${extra(5)} and December ${extra(11)}.` },
    ],
    body: (h) => `<h2>Month by month</h2>
<p>The table shows working days, public holidays and the week numbers that touch each month. Working days are weekdays that are neither holidays nor one of the three eves the ${h.src('semesterlag', 'Annual Leave Act')} treats like Sundays. Holidays are counted under the ${h.src('helgdagslag', 'Public Holidays Act')}, including those that fall at a weekend.</p>
${tabell(h, 'en')}
<h2>Week numbers in Sweden</h2>
<p>Swedes often give dates as week numbers: summer leave in weeks 28 to 31, the sports break in week 9, delivery in week 14. The week starts on Monday and week 1 is the one containing January's first Thursday. So the first days of January sometimes belong to the previous year, as in ${Y}, and the last days of December sometimes to the next. Schools, building projects and suppliers nearly always count in weeks, so it pays to have the numbers in front of you when planning ${Y}. Look up the dates of any week here:</p>
${h.mini('kw', { p: ['v'], d: { ar: Y, v: 28 }, c: 'Show the dates of a week' })}
<h2>Printing or sharing</h2>
<p>The calendar above works on a phone and prints from the browser. Your choice about the eves is kept in the address, so a shared link opens the same view. To see which days are worth taking off, use the planner for ${h.a('home', 'bridge days 2027')}; the holiday list with weekdays is on ${h.a('roda-dagar-2027', 'public holidays 2027')}. Next year, with a leap day and more weekday holidays, is in ${h.a('kalender-2028', 'calendar 2028')}.</p>`,
  },
});
