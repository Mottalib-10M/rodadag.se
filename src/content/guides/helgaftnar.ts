/** Helgaftnar : les 9 aftnar ; seules midsommar-, jul- et nyårsafton sont assimilées au dimanche (3 a § semesterlagen, 2 § lag 1930:173). Le reste : pratique. Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, wdLong, n, lista, type Lang } from '../_lib';

const Y = 2027;
const T = (l: Lang, sv: string, en: string) => (l === 'sv' ? sv : en);
const af = (y: number) => K.aftnar(y);
const tre = (l: Lang) => lista(K.AFTNAR.filter((a) => a.semL).map((a) => a.name[l].toLowerCase()), l);
const ovriga = (l: Lang) => lista(K.AFTNAR.filter((a) => !a.semL).map((a) => a.name[l].toLowerCase()), l);
const vardag = (y: number) => af(y).filter((a) => a.semL && !K.isWeekend(K.fromIso(a.date))).length;
const jul26 = K.semesterdagar('2026-12-21', '2027-01-03');
const tabell = (h: { table: (a: string[], r: Array<Array<string | number>>, c?: string) => string }, l: Lang) => h.table(
  [T(l, 'Afton', 'Eve'), String(Y), String(Y + 1), T(l, 'Jämställd med söndag i lag', 'Treated as Sunday in law')],
  af(Y).map((a, i) => [a.name[l], `${wdLong(a.date, l)} ${dLong(a.date, l)}`, `${wdLong(af(Y + 1)[i].date, l)} ${dLong(af(Y + 1)[i].date, l)}`, a.semL ? T(l, 'ja', 'yes') : T(l, 'nej', 'no')]),
  T(l, 'Helgaftnarna med veckodag och ställning i lagen', 'The holiday eves with weekday and legal status'),
);

export default defineGuide({
  id: 'helgaftnar', group: 'roda', order: 14, tool: 'rd', toolArg: { ar: Y, af: 'ledig' },
  related: ['helgdagar', 'semesterdagar', 'midsommar-2027', 'jul-2026'],
  sources: ['semesterlag', 'lagstadgadtid', 'helgdagslag'],
  sv: {
    slug: 'helgaftnar', nav: 'Helgaftnar', card: 'Vilka aftnar som räknas som söndag och vilka som inte gör det',
    title: 'Helgaftnar: midsommar-, jul- och nyårsafton i lag och praxis',
    description: 'Helgaftnar i Sverige: varför midsommar-, jul- och nyårsafton inte är röda dagar men ändå kostar noll semesterdagar, och hur de sex övriga aftnarna räknas.',
    h1: 'Helgaftnar: röda i praktiken, inte i lagen',
    intro: 'Aftnarna är de dagar då flest svenskar firar, men ingen av dem står i lagen om allmänna helgdagar. Tre av dem har ändå en särskild ställning.',
    resume: `Sverige har nio aftnar före helgdagar: ${lista(K.AFTNAR.map((a) => a.name.sv.toLowerCase()), 'sv')}. Ingen av dem är allmän helgdag. Tre, ${tre('sv')}, jämställs ändå med söndag i två lagar. Enligt 3 a § semesterlagen räknas de aldrig som semesterdagar, och enligt 2 § lagen om beräkning av lagstadgad tid flyttas en frist som slutar på dem till nästa vardag. Att man är ledig på dem följer däremot av kollektivavtal och sedvana, inte av lagen. De sex övriga, ${ovriga('sv')}, är vanliga dagar i lagens mening; påskafton och pingstafton är alltid lördagar och skärtorsdagen alltid en torsdag. ${Y} infaller ${vardag(Y)} av de tre stora aftnarna på en vardag, ${Y + 1} ${vardag(Y + 1)}. Semester från måndagen den 21 december 2026 till och med söndagen den 3 januari 2027 kostar ${jul26.sem} semesterdagar för ${jul26.kalender} kalenderdagar.`,
    faqs: [
      { q: 'Är julafton en röd dag enligt lagen?', a: 'Nej. Julafton saknas i lagen om allmänna helgdagar. Men 3 a § semesterlagen jämställer julafton med söndag, liksom midsommarafton och nyårsafton, så dagen drar ingen semester. De flesta kollektivavtal ger ledigt eller extra ersättning, och därför uppfattas julafton som röd även om den inte är det i lagens mening.' },
      { q: 'Kostar valborgsmässoafton en semesterdag?', a: 'Ja, om den infaller på en vardag och du tar ledigt. Valborgsmässoafton nämns varken i semesterlagen eller i helgdagslagen och räknas som en vanlig arbetsdag. Vissa arbetsgivare och avtal ger kortare arbetstid den dagen, men det är ingen rättighet som följer av lag. Samma sak gäller skärtorsdagen och trettondagsafton.' },
      { q: 'Vad händer med en frist som slutar på midsommarafton?', a: 'Enligt 2 § lagen om beräkning av lagstadgad tid får du vänta till nästa vardag när sista dagen är en lördag, söndag, helgdag eller midsommar-, jul- eller nyårsafton. Eftersom midsommarafton alltid är en fredag och följs av midsommardagen och söndagen, flyttas fristen till måndagen efter.' },
      { q: 'Vilka aftnar infaller alltid på samma veckodag?', a: 'Fem av de nio. Midsommarafton är alltid en fredag, allhelgonaafton också, eftersom dagen efter alltid är en lördag. Påskafton och pingstafton är alltid lördagar, och skärtorsdagen är alltid en torsdag. Trettondagsafton, valborgsmässoafton, julafton och nyårsafton har fasta datum och vandrar därför mellan veckodagarna.' },
    ],
    body: (h) => `<h2>Alla nio aftnar på ett år</h2>
<p>Tabellen visar varje afton med datum ${Y} och ${Y + 1}. Bara tre av dem har en ställning i lag, och den ställningen gäller två saker: semesterdagar och frister. Resten är kulturella högtider utan rättslig betydelse.</p>
${tabell(h, 'sv')}
<h2>Semesterlagen: aftnarna kostar inga dagar</h2>
<p>${h.src('semesterlag', '3 a § semesterlagen')} säger att söndag, allmän helgdag och midsommarafton, julafton och nyårsafton inte räknas som semesterdagar. Tar du semester över julen räknas alltså bara de vanliga vardagarna. Räkna själv nedan: välj första dagen och hur länge du är borta, så visar räknaren hur många semesterdagar perioden drar.</p>
${h.mini('sd', { p: ['dag', 'langd'], d: { ar: 2026, man: 12, dag: 21, langd: 14 }, c: 'Räkna semesterdagar över jul och nyår' })}
<h2>Frister: aftnarna flyttar sista dagen</h2>
<p>${h.src('lagstadgadtid', 'Lagen om beräkning av lagstadgad tid')} gäller när en lag anger en tid för att göra något, till exempel lämna in en överklagan. Slutar tiden på midsommarafton, julafton eller nyårsafton får du göra det nästa vardag. Valborgsmässoafton och skärtorsdagen har ingen sådan verkan. Prova på sidan ${h.a('tidsfrist', 'tidsfrister')}.</p>
<h2>Om du arbetar på en afton</h2>
<p>Inom handel, vård, omsorg och kollektivtrafik är aftnarna ofta vanliga arbetsdagar. Om du får ob-tillägg, ledighet en annan dag eller inget alls avgörs av kollektivavtalet. I verktygen på den här webbplatsen kan du därför välja om aftnarna ska räknas som lediga eller som arbetsdagar. Läs mer om de egentliga helgdagarna i ${h.a('helgdagar', 'lagen om allmänna helgdagar')}; själva lagen nämner inga aftnar alls (${h.src('helgdagslag', 'lag 1989:253')}). Med ${n(K.P.semester.dagar, 'sv')} semesterdagar om året gör aftnarna stor skillnad: julen och midsommar kostar ett par dagar mindre än antalet kalenderdagar antyder.</p>`,
  },
  en: {
    slug: 'holiday-eves', nav: 'Holiday eves', card: 'Which eves count as Sundays and which do not',
    title: 'Holiday Eves in Sweden: Midsummer, Christmas and New Year',
    description: 'Why Midsummer Eve, Christmas Eve and New Year’s Eve are not Swedish public holidays yet cost no leave days, and how the six other eves are treated at work.',
    h1: 'Holiday eves: days off in practice, not in law',
    intro: 'The eves are when most Swedes celebrate, yet none of them is in the Public Holidays Act. Three still have a special status.',
    resume: `Sweden has nine eves before holidays: ${lista(K.AFTNAR.map((a) => a.name.en), 'en')}. None of them is a public holiday. Three, ${tre('en')}, are nevertheless treated like Sundays by two laws. Under section 3a of the Annual Leave Act they never count as leave days, and under section 2 of the Act on statutory time limits a deadline ending on one moves to the next weekday. Being off on them, though, comes from collective agreements and custom, not from law. The other six, ${ovriga('en')}, are ordinary days in law; Holy Saturday and Whitsun Eve are always Saturdays and Maundy Thursday always a Thursday. In ${Y}, ${vardag(Y)} of the three big eves fall on a weekday, in ${Y + 1} ${vardag(Y + 1)}. Leave from Monday 21 December 2026 to Sunday 3 January 2027 costs ${jul26.sem} leave days for ${jul26.kalender} calendar days.`,
    faqs: [
      { q: 'Is Christmas Eve a public holiday in Sweden?', a: 'No. Christmas Eve is missing from the Public Holidays Act. But section 3a of the Annual Leave Act treats it like a Sunday, together with Midsummer Eve and New Year\'s Eve, so it costs no leave. Most collective agreements give the day off or extra pay, which is why Christmas Eve feels like a holiday even though in law it is not.' },
      { q: 'Does Walpurgis Night cost a leave day?', a: 'Yes, if it falls on a weekday and you take it off. Walpurgis Night on 30 April is named neither in the Annual Leave Act nor in the Public Holidays Act and counts as an ordinary working day. Some employers and agreements give shorter hours that day, but no law grants it. The same goes for Maundy Thursday and Twelfth Night.' },
      { q: 'What happens to a deadline ending on Midsummer Eve?', a: 'Under section 2 of the Act on statutory time limits you may act on the next weekday when the last day is a Saturday, Sunday, public holiday or Midsummer, Christmas or New Year\'s Eve. Since Midsummer Eve is always a Friday, followed by Midsummer Day and a Sunday, the deadline moves to the Monday after.' },
      { q: 'Which Swedish eves always fall on the same weekday?', a: 'Five of the nine. Midsummer Eve is always a Friday, and so is All Saints\' Eve, since the day after is always a Saturday. Holy Saturday and Whitsun Eve are always Saturdays, and Maundy Thursday is always a Thursday. Twelfth Night, Walpurgis Night, Christmas Eve and New Year\'s Eve have fixed dates and move through the week.' },
    ],
    body: (h) => `<h2>All nine eves in a year</h2>
<p>The table shows each eve with its date in ${Y} and ${Y + 1}. Only three have any standing in law, and that standing covers two things: leave days and deadlines. The rest are cultural occasions with no legal effect.</p>
${tabell(h, 'en')}
<h2>Annual Leave Act: the eves cost no days</h2>
<p>${h.src('semesterlag', 'Section 3a of the Annual Leave Act')} says that Sundays, public holidays and Midsummer, Christmas and New Year's Eve do not count as leave days. Leave over Christmas therefore only uses up the ordinary weekdays. Try it below: pick the first day and how long you are away, and the counter shows how many leave days the period costs.</p>
${h.mini('sd', { p: ['dag', 'langd'], d: { ar: 2026, man: 12, dag: 21, langd: 14 }, c: 'Count leave days over Christmas and New Year' })}
<h2>Deadlines: the eves move the last day</h2>
<p>The ${h.src('lagstadgadtid', 'Act on statutory time limits')} applies when a law sets a period for doing something, such as lodging an appeal. If the period ends on Midsummer, Christmas or New Year's Eve, you may act on the next weekday. Walpurgis Night and Maundy Thursday have no such effect. Try it on ${h.a('tidsfrist', 'statutory deadlines')}.</p>
<h2>If you work on an eve</h2>
<p>In retail, healthcare, care services and public transport the eves are often ordinary working days. Whether you get unsocial-hours pay, a day off later or nothing at all depends on your collective agreement. The tools on this site therefore let you choose whether the eves count as days off or working days. The real holidays are explained under ${h.a('helgdagar', 'the Public Holidays Act')}; the act itself mentions no eves at all (${h.src('helgdagslag', 'Act 1989:253')}). With ${n(K.P.semester.dagar, 'en')} leave days a year the eves matter: Christmas and Midsummer cost a couple of days less than the calendar suggests.</p>`,
  },
});
