/** Lagen (1989:253) om allmänna helgdagar : les 13 jours, les règles de date (2 §), la réforme SFS 2004:1320. Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, n, rd, rodaVardagar, type Lang } from '../_lib';

const Y = 2027;
// Spridning av röda vardagar över ett sekel, ur motorn.
const ar = Array.from({ length: 100 }, (_, i) => 2000 + i);
const per = ar.map((y) => rodaVardagar(y).length);
const min = Math.min(...per), max = Math.max(...per);
const snitt = per.reduce((a, b) => a + b, 0) / per.length;
const T = (l: Lang, sv: string, en: string) => (l === 'sv' ? sv : en);
const REGEL: Record<string, { sv: string; en: string }> = {
  'nyarsdagen': { sv: '1 januari', en: '1 January' },
  'trettondedag-jul': { sv: '6 januari', en: '6 January' },
  'langfredagen': { sv: 'fredagen före påskdagen', en: 'Friday before Easter Sunday' },
  'paskdagen': { sv: 'söndag efter vårens första fullmåne', en: 'Sunday after the first spring full moon' },
  'annandag-pask': { sv: 'måndagen efter påskdagen', en: 'Monday after Easter Sunday' },
  'forsta-maj': { sv: '1 maj', en: '1 May' },
  'kristi-himmelsfard': { sv: 'sjätte torsdagen efter påskdagen', en: 'sixth Thursday after Easter Sunday' },
  'pingstdagen': { sv: 'sjunde söndagen efter påskdagen', en: 'seventh Sunday after Easter Sunday' },
  'nationaldagen': { sv: '6 juni', en: '6 June' },
  'midsommardagen': { sv: 'lördagen 20–26 juni', en: 'Saturday 20–26 June' },
  'alla-helgons-dag': { sv: 'lördagen 31 oktober–6 november', en: 'Saturday 31 October–6 November' },
  'juldagen': { sv: '25 december', en: '25 December' },
  'annandag-jul': { sv: '26 december', en: '26 December' },
};
const tabell = (h: { table: (a: string[], r: Array<Array<string | number>>, c?: string) => string }, l: Lang) => h.table(
  [T(l, 'Helgdag', 'Holiday'), T(l, 'Regel i 2 §', 'Rule in section 2'), String(Y), String(Y + 1)],
  K.HELGDAGAR.map((d) => [d.name[l], REGEL[d.id][l], dLong(d.date(Y), l), dLong(d.date(Y + 1), l)]),
  T(l, 'De allmänna helgdagarna och hur datumet bestäms', 'The public holidays and how each date is set'),
);

export default defineGuide({
  id: 'helgdagar', group: 'roda', order: 13, tool: 'rd', toolArg: { ar: Y },
  related: ['helgaftnar', 'roda-dagar-2027', 'pask-2027', 'nationaldagen-2027'],
  sources: ['helgdagslag', 'semesterlag', 'lagstadgadtid', 'pask-ptb'],
  sv: {
    slug: 'helgdagslagen', nav: 'Lagen om allmänna helgdagar', card: 'De 13 helgdagarna och reglerna för datumen',
    title: 'Helgdagslagen: de 13 allmänna helgdagarna och deras regler',
    description: 'Lagen (1989:253) om allmänna helgdagar förklarad: vilka 13 dagar som är röda, hur påsk, midsommar och alla helgons dag räknas och vad lagen inte ger dig.',
    h1: 'Lagen om allmänna helgdagar',
    intro: 'En kort lag med två paragrafer bestämmer vilka dagar som är röda i hela Sverige. Här är vad den säger, och vad den inte säger.',
    resume: `Lagen (1989:253) om allmänna helgdagar räknar i 1 § upp söndagarna och ${K.HELGDAGAR.length} namngivna dagar: nyårsdagen, trettondedag jul, långfredagen, påskdagen, annandag påsk, första maj, Kristi himmelsfärdsdag, pingstdagen, nationaldagen, midsommardagen, alla helgons dag, juldagen och annandag jul. 2 § anger datumen. Sju dagar har fasta datum, fem följer påsken och två är alltid lördagar: midsommardagen mellan den 20 och 26 juni och alla helgons dag mellan den 31 oktober och 6 november. Lagen ändrades senast genom SFS 2004:1320, som gjorde nationaldagen till helgdag och strök annandag pingst från och med 2005. Lagen flyttar aldrig en helgdag som hamnar på en helg. Över åren ${ar[0]} till ${ar[ar.length - 1]} infaller mellan ${min} och ${max} helgdagar per år på en vardag, i snitt ${n(Math.round(snitt * 10) / 10, 'sv')}. Lagen ger i sig ingen rätt till ledighet; den bestämmer vilka dagar andra lagar och avtal syftar på.`,
    faqs: [
      { q: 'Vilka dagar räknar helgdagslagen upp?', a: `Utöver alla söndagar nämner 1 § ${K.HELGDAGAR.length} dagar: nyårsdagen, trettondedag jul, långfredagen, påskdagen, annandag påsk, första maj, Kristi himmelsfärdsdag, pingstdagen, Sveriges nationaldag, midsommardagen, alla helgons dag, juldagen och annandag jul. Midsommarafton, julafton och nyårsafton finns inte med i listan, trots att de flesta är lediga då.` },
      { q: 'Varför är annandag pingst inte längre röd dag?', a: 'När nationaldagen den 6 juni blev allmän helgdag ströks samtidigt annandag pingst, så antalet helgdagar blev detsamma. Ändringen gjordes genom SFS 2004:1320 och har gällt sedan 2005. Pingstdagen, som alltid är en söndag, finns kvar i lagen, och pingstafton räknas som en vanlig lördag.' },
      { q: 'Ger helgdagslagen rätt att vara ledig?', a: 'Nej. Lagen bestämmer bara vilka dagar som är allmänna helgdagar. Om du är ledig, och vilken ersättning du får om du arbetar, avgörs av kollektivavtal och anställningsavtal. Andra lagar använder begreppet: semesterlagen räknar inte helgdagar som semesterdagar, och en frist som slutar på en helgdag flyttas till nästa vardag.' },
      { q: 'Hur räknas påskdagen enligt lagen?', a: `Påskdagen är söndagen efter den första fullmånen på eller efter vårdagjämningen, räknad efter den kyrkliga tabellen och inte efter den astronomiska månen. I praktiken används Gauss påskformel. ${Y} blir påskdagen den ${dLong(K.paskdagen(Y), 'sv')}, och fem helgdagar följer med när påsken flyttar.` },
    ],
    body: (h) => `<h2>Tretton dagar, fyra regler</h2>
<p>Tabellen visar varje helgdag med regeln ur ${h.src('helgdagslag', '2 § lagen om allmänna helgdagar')} och datumen för de två kommande åren. Reglerna går att dela i fyra slag: fasta datum, dagar som räknas från påskdagen, de två lördagarna och söndagarna, som alla är helgdagar men inte namnges en och en.</p>
${tabell(h, 'sv')}
<h2>Rörliga dagar och påsken</h2>
<p>Långfredagen, annandag påsk, Kristi himmelsfärdsdag och pingstdagen ligger ett bestämt antal dagar från påskdagen: två dagar före, en dag efter, 39 och 49 dagar efter. Påskdagen kan infalla mellan den 22 mars och den 25 april, och med den flyttar hela vårens helgdagar. Kristi himmelsfärdsdag är därför alltid en torsdag, och fredagen efter blir varje år en klämdag.</p>
${h.mini('os', { p: ['ar'], d: { ar: Y }, c: 'Räkna ut påskdagen för valfritt år' })}
<h2>Därför ligger två dagar alltid på lördag</h2>
<p>Midsommardagen och alla helgons dag är enligt lagen knutna till en lördag inom en sjudagarsperiod. Det betyder att de aldrig ger en ledig vardag. Midsommarafton blir i stället alltid en fredag, och den är ingen helgdag. Det är kollektivavtalen och ${h.src('semesterlag', '3 a § semesterlagen')} som gör den ledig i praktiken.</p>
<h2>När helgdagarna spelar roll i andra lagar</h2>
<p>Begreppet allmän helgdag används i många författningar. ${h.src('lagstadgadtid', 'Lagen om beräkning av lagstadgad tid')} flyttar en frist som slutar på en helgdag till nästa vardag. Semesterlagen jämställer helgdagar med söndag, så de drar inga semesterdagar. Den som vill veta hur aftnarna behandlas hittar det på sidan ${h.a('helgaftnar', 'helgaftnar')}, och alla datum för ett år står under ${h.a('roda-dagar-2027', 'röda dagar 2027')}.</p>`,
  },
  en: {
    slug: 'public-holidays-act', nav: 'Public Holidays Act', card: 'The 13 holidays and the rules for their dates',
    title: 'Public Holidays Act: Sweden’s 13 Holidays and Their Rules',
    description: 'Sweden’s Public Holidays Act (1989:253): which 13 days are holidays, how Easter, Midsummer and All Saints’ Day are set, and what the law does not give.',
    h1: 'The Swedish Public Holidays Act',
    intro: 'A short act of two sections decides which days are public holidays across Sweden. Here is what it says, and what it does not.',
    resume: `Section 1 of the Public Holidays Act (1989:253) lists Sundays and ${K.HELGDAGAR.length} named days: New Year's Day, Epiphany, Good Friday, Easter Sunday, Easter Monday, May Day, Ascension Day, Whit Sunday, National Day, Midsummer Day, All Saints' Day, Christmas Day and Boxing Day. Section 2 sets the dates. Seven have fixed dates, five follow Easter and two are always Saturdays: Midsummer Day between 20 and 26 June and All Saints' Day between 31 October and 6 November. The act was last amended by SFS 2004:1320, which made National Day a holiday and removed Whit Monday from 2005. It never moves a holiday that falls at a weekend. Across the years ${ar[0]} to ${ar[ar.length - 1]}, between ${min} and ${max} holidays a year fall on a weekday, ${n(Math.round(snitt * 10) / 10, 'en')} on average. The act gives no right to time off by itself; it defines the days that other laws and agreements refer to.`,
    faqs: [
      { q: 'Which days does the Swedish Public Holidays Act list?', a: `Besides every Sunday, section 1 names ${K.HELGDAGAR.length} days: New Year's Day, Epiphany, Good Friday, Easter Sunday, Easter Monday, May Day, Ascension Day, Whit Sunday, National Day, Midsummer Day, All Saints' Day, Christmas Day and Boxing Day. Midsummer Eve, Christmas Eve and New Year's Eve are not on the list, though most people are off then.` },
      { q: 'Why is Whit Monday no longer a holiday in Sweden?', a: 'When National Day on 6 June became a public holiday, Whit Monday was removed at the same time, so the number of holidays stayed the same. The change was made by SFS 2004:1320 and has applied since 2005. Whit Sunday, always a Sunday, remains in the act.' },
      { q: 'Does the Public Holidays Act give a right to a day off?', a: 'No. The act only defines which days are public holidays. Whether you are off, and what you are paid if you work, depends on your collective agreement and employment contract. Other laws use the term: the Annual Leave Act does not count holidays as leave days, and a deadline ending on a holiday moves to the next weekday.' },
      { q: 'How does the act fix Easter Sunday?', a: `Easter Sunday is the Sunday after the first full moon on or after the spring equinox, using the church tables rather than the astronomical moon. In practice Gauss's Easter formula is used. In ${Y} Easter Sunday is ${dLong(K.paskdagen(Y), 'en')}, and five holidays move with it.` },
    ],
    body: (h) => `<h2>Thirteen days, four kinds of rule</h2>
<p>The table shows each holiday with its rule from ${h.src('helgdagslag', 'section 2 of the Public Holidays Act')} and its date in the next two years. The rules fall into four kinds: fixed dates, days counted from Easter Sunday, the two Saturdays, and Sundays, which are all holidays without being named one by one.</p>
${tabell(h, 'en')}
<h2>Movable days and Easter</h2>
<p>Good Friday, Easter Monday, Ascension Day and Whit Sunday sit a set number of days from Easter Sunday: two before, one after, 39 and 49 after. Easter Sunday can fall between 22 March and 25 April, and the whole run of spring holidays moves with it. Ascension Day is therefore always a Thursday, and the Friday after it is a bridge day every year.</p>
${h.mini('os', { p: ['ar'], d: { ar: Y }, c: 'Work out Easter Sunday for any year' })}
<h2>Why two days are always Saturdays</h2>
<p>Midsummer Day and All Saints' Day are tied by the act to a Saturday within a seven-day window. They therefore never give a weekday off. Midsummer Eve is always a Friday instead, and it is not a holiday. It is collective agreements and ${h.src('semesterlag', 'section 3a of the Annual Leave Act')} that make it a day off in practice.</p>
<h2>Where holidays matter in other laws</h2>
<p>The term public holiday appears in many statutes. The ${h.src('lagstadgadtid', 'Act on statutory time limits')} moves a deadline ending on a holiday to the next weekday. The Annual Leave Act treats holidays like Sundays, so they cost no leave. How the eves are handled is on ${h.a('helgaftnar', 'holiday eves')}, and every date for a year is on ${h.a('roda-dagar-2027', 'public holidays 2027')}.</p>`,
  },
});
