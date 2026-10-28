/** Semesterdagar : combien de jours de congé coûte une absence (3 a § semesterlagen). Exemples : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, n, type Lang } from '../_lib';

const ex = (fran: string, till: string) => ({ fran, till, ...K.semesterdagar(fran, till) });
const midsommar = ex('2027-06-21', '2027-07-18');
const juli = ex('2027-06-28', '2027-07-25');
const jul = ex('2027-12-20', '2028-01-09');
const pask = ex('2027-03-22', '2027-04-04');
const sommar28 = ex('2028-06-19', '2028-07-16');
const S = K.P.semester;
const rows = (l: Lang) => [
  [l === 'sv' ? 'Fyra veckor från midsommarveckan 2027' : 'Four weeks from Midsummer week 2027', `${dLong(midsommar.fran, l)} – ${dLong(midsommar.till, l)}`, midsommar.kalender, midsommar.sem],
  [l === 'sv' ? 'Fyra veckor i juli 2027' : 'Four weeks in July 2027', `${dLong(juli.fran, l)} – ${dLong(juli.till, l)}`, juli.kalender, juli.sem],
  [l === 'sv' ? 'Två veckor kring påsk 2027' : 'Two weeks around Easter 2027', `${dLong(pask.fran, l)} – ${dLong(pask.till, l)}`, pask.kalender, pask.sem],
  [l === 'sv' ? 'Tre veckor över jul och nyår' : 'Three weeks over Christmas and New Year', `${dLong(jul.fran, l)} – ${dLong(jul.till, l)}`, jul.kalender, jul.sem],
  [l === 'sv' ? 'Fyra veckor från midsommarveckan 2028' : 'Four weeks from Midsummer week 2028', `${dLong(sommar28.fran, l)} – ${dLong(sommar28.till, l)}`, sommar28.kalender, sommar28.sem],
];

export default defineGuide({
  id: 'semesterdagar', group: 'verktyg', order: 5, tool: 'sd', toolArg: { ar: 2027, man: 6, dag: 21, langd: 28 },
  related: ['home', 'helgaftnar', 'arbetsdagar-2027', 'klamdagar-2028'],
  sources: ['semesterlag', 'helgdagslag'],
  sv: {
    slug: 'semesterdagar', nav: 'Semesterdagar', card: 'Hur många semesterdagar en ledighet kostar',
    title: 'Semesterdagar: så många går åt för din ledighet 2027',
    description: 'Semesterdagar: räkna hur många dagar en ledighet kostar när röda dagar, helger och aftnar inte räknas. Med lagens regler om 25 dagar och sparade dagar.',
    h1: 'Semesterdagar för en ledighet',
    intro: 'Ange första lediga dag och hur länge du är borta. Verktyget räknar hur många semesterdagar som går åt och hur många av dagarna som är gratis.',
    resume: `En semesterdag är en dag då du annars skulle ha arbetat. För den som arbetar måndag till fredag räknas därför varken lördagar, söndagar eller röda dagar, och semesterlagen lägger till midsommarafton, julafton och nyårsafton bland de dagar som inte kostar något. Fyra veckor från måndagen före midsommar ${2027} kostar därför ${midsommar.sem} semesterdagar i stället för 20, eftersom midsommarafton faller inom perioden. Tre veckor över jul och nyår, ${dLong(jul.fran, 'sv')} till ${dLong(jul.till, 'sv')}, kostar bara ${jul.sem} dagar av ${jul.kalender} kalenderdagar. Lagen ger minst ${S.dagar} semesterdagar per semesterår, och du har rätt till fyra sammanhängande veckor under juni till augusti. Har du fler än ${S.sparaOver} betalda dagar får överskottet sparas och ska tas ut inom ${S.sparaAr} år. Semesteråret löper normalt från 1 april till 31 mars.`,
    faqs: [
      { q: 'Räknas en röd dag mitt i semestern som semesterdag?', a: 'Nej. En allmän helgdag som infaller under ledigheten räknas inte som semesterdag, och detsamma gäller midsommarafton, julafton och nyårsafton enligt 3 a § semesterlagen. Ledigheten blir alltså lika lång, men den kostar färre dagar. Lördagar och söndagar räknas inte heller för den som arbetar vardagar.' },
      { q: 'Hur många semesterdagar har man rätt till enligt lagen?', a: `Minst ${S.dagar} dagar per semesterår, oavsett ålder och anställningsform. Många kollektivavtal ger fler, till exempel i kommuner och regioner, där antalet dagar ökar med åldern. Betald semester tjänas in under intjänandeåret, så den som är nyanställd kan ha färre betalda dagar första året.` },
      { q: 'Hur länge kan man spara semesterdagar?', a: `Har du fler än ${S.sparaOver} betalda semesterdagar under ett semesterår får du spara de överskjutande dagarna. De sparade dagarna ska tas ut inom ${S.sparaAr} år, vid en tidpunkt som du och arbetsgivaren kommer överens om. Har du sparade dagar som snart blir för gamla, ta upp dem i god tid före semesterplaneringen.` },
      { q: 'Får arbetsgivaren bestämma när semesterdagarna tas ut?', a: 'Ja, efter förhandling med facket eller samråd med dig. Huvudregeln är fyra veckor i följd under juni, juli och augusti, om inget annat har avtalats. Arbetsgivaren ska ge besked om semesterns förläggning senast två månader innan den börjar, så det lönar sig att ansöka tidigt.' },
    ],
    body: (h) => `<h2>Exempel: vad en ledighet kostar</h2>
<p>Tabellen visar vanliga ledigheter och hur många semesterdagar de kräver för den som arbetar måndag till fredag. Röda dagar räknas ut enligt ${h.src('helgdagslag', 'lagen om allmänna helgdagar')} och aftnarna enligt ${h.src('semesterlag', '3 a § semesterlagen')}.</p>
${h.table(['Ledighet', 'Period', 'Kalenderdagar', 'Semesterdagar'], rows('sv'), 'Semesterdagar för några ledigheter', ['l', 'l', 'r', 'r'])}
<p>Skillnaden mellan första och andra raden är midsommarafton. Startar sommarsemestern veckan då midsommar infaller sparar du en dag. Påskexemplet är ännu tydligare: två veckor runt påsk kostar bara ${pask.sem} dagar, eftersom långfredagen och annandag påsk ligger inne i perioden.</p>
<h2>Semesterår, intjänande och sparade dagar</h2>
<p>Semesterlagen skiljer mellan intjänandeår och semesterår. Om inget annat avtalas är semesteråret 1 april till 31 mars, och betald semester tjänas in under året före. Rätten till ledighet, ${S.dagar} dagar, finns redan från början, men den som är nyanställd kan få en del av dagarna obetalda. Dagar utöver ${S.sparaOver} får sparas i högst ${S.sparaAr} år, och arbetsgivaren och du bestämmer tillsammans när de tas ut.</p>
${h.mini('bt', { p: ['sem'], d: { ar: 2027, sem: 6 }, c: 'Lägg semesterdagarna på klämdagar' })}
<h2>Deltid och schemalagda helger</h2>
<p>Verktyget räknar med en vanlig femdagarsvecka. Arbetar du deltid, skift eller helger fungerar lagen likadant i princip, men vilka dagar som räknas beror på ditt schema och ibland på en särskild omräkning i kollektivavtalet. Arbetar du till exempel på lördagar kan en lördag kosta en semesterdag, medan en ledig vardag inte gör det. Fråga lönekontoret eller facket om ditt avtal.</p>
<p>Vill du få ut mest ledighet per semesterdag, lägg dagarna där röda dagar redan ligger nära varandra. Planeraren på ${h.a('home', 'klämdagar 2027')} gör det åt dig, och ${h.a('helgaftnar', 'helgaftnar')} förklarar vilka aftnar som är lediga enligt lag och vilka som bara är det av tradition.</p>`,
  },
  en: {
    slug: 'annual-leave-days', nav: 'Annual leave days', card: 'How many leave days a trip costs',
    title: 'Annual Leave Days in Sweden: What a Break Costs in 2027',
    description: 'Annual leave days in Sweden: count how many days a break costs when holidays, weekends and the main eves are free. Covers the 25-day minimum and carry-over.',
    h1: 'Annual leave days for a break',
    intro: 'Enter your first day off and how long you will be away. The tool counts the leave days used and how many of the days come free.',
    resume: `A leave day is a day you would otherwise have worked. For someone working Monday to Friday, Saturdays, Sundays and public holidays never count, and the Annual Leave Act adds Midsummer Eve, Christmas Eve and New Year's Eve to the days that cost nothing. Four weeks from the Monday before Midsummer 2027 therefore cost ${midsommar.sem} leave days instead of 20, because Midsummer Eve falls inside the period. Three weeks over Christmas and New Year, ${dLong(jul.fran, 'en')} to ${dLong(jul.till, 'en')}, cost only ${jul.sem} days out of ${jul.kalender} calendar days. The law gives at least ${S.dagar} leave days per leave year, and you are entitled to four consecutive weeks between June and August. If you have more than ${S.sparaOver} paid days, the surplus may be saved and must be used within ${S.sparaAr} years. The leave year normally runs from 1 April to 31 March.`,
    faqs: [
      { q: 'Does a public holiday during my leave count as a leave day?', a: 'No. A public holiday inside your leave does not count as a leave day, and neither do Midsummer Eve, Christmas Eve and New Year\'s Eve under section 3a of the Annual Leave Act. The break is just as long, but it costs fewer days. Saturdays and Sundays do not count either for someone who works weekdays.' },
      { q: 'How many days of annual leave does Swedish law give?', a: `At least ${S.dagar} days per leave year, whatever your age or type of contract. Many collective agreements give more, for example in municipalities and regions, where the number grows with age. Paid leave is earned in the qualifying year, so a new employee may have fewer paid days in the first year.` },
      { q: 'How long can I save leave days in Sweden?', a: `If you have more than ${S.sparaOver} paid leave days in a leave year, you may save the extra days. Saved days must be used within ${S.sparaAr} years, at a time you and your employer agree on. If some saved days are about to become too old, raise it well before leave is planned.` },
      { q: 'Can my employer decide when I take my leave?', a: 'Yes, after negotiating with the union or consulting you. The main rule is four consecutive weeks in June, July and August unless otherwise agreed. The employer must tell you when your leave is scheduled at least two months before it starts, so it pays to ask early.' },
    ],
    body: (h) => `<h2>Examples: what a break costs</h2>
<p>The table shows common breaks and the leave days they need for someone working Monday to Friday. Holidays are worked out under the ${h.src('helgdagslag', 'Public Holidays Act')} and the eves under ${h.src('semesterlag', 'section 3a of the Annual Leave Act')}.</p>
${h.table(['Break', 'Period', 'Calendar days', 'Leave days'], rows('en'), 'Leave days for a few breaks', ['l', 'l', 'r', 'r'])}
<p>The difference between the first two rows is Midsummer Eve. Starting your summer leave in Midsummer week saves a day. The Easter example is starker still: two weeks around Easter cost only ${pask.sem} days, because Good Friday and Easter Monday fall inside the period.</p>
<h2>Leave year, qualifying year and saved days</h2>
<p>The Annual Leave Act distinguishes the qualifying year from the leave year. Unless otherwise agreed, the leave year runs from 1 April to 31 March, and paid leave is earned in the year before. The right to time off, ${S.dagar} days, exists from the start, but a new employee may get some of those days unpaid. Days above ${S.sparaOver} may be saved for up to ${S.sparaAr} years, and you and your employer agree when they are taken.</p>
${h.mini('bt', { p: ['sem'], d: { ar: 2027, sem: 6 }, c: 'Put your leave days on bridges' })}
<h2>Part-time work and weekend rotas</h2>
<p>The tool assumes an ordinary five-day week. If you work part-time, shifts or weekends, the law works the same way in principle, but which days count depends on your rota and sometimes on a conversion rule in the collective agreement. If you work Saturdays, say, a Saturday may cost a leave day while a weekday off does not. Ask payroll or your union about your agreement.</p>
<p>To get the most time off per leave day, place your days where holidays already cluster. The planner on ${h.a('home', 'bridge days 2027')} does that for you, and ${h.a('helgaftnar', 'holiday eves')} explains which eves are free by law and which only by custom.</p>`,
  },
});
