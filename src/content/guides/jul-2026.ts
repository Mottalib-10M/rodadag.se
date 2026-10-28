/** Jul 2026 : julafton jeudi, juldagen vendredi ; 3 jours de congé = 11 jours. Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, plus, wdLong, vecka } from '../_lib';

const Y = 2026;
const ja = `${Y}-12-24`, jd = `${Y}-12-25`, aj = `${Y}-12-26`, na = `${Y}-12-31`, nd = `${Y + 1}-01-01`, tj = `${Y + 1}-01-06`;
const mellan = K.semesterdagar(`${Y}-12-28`, `${Y}-12-30`);
const tillTretton = K.semesterdagar(`${Y}-12-28`, `${Y + 1}-01-05`);
const fore = K.semesterdagar(`${Y}-12-21`, `${Y}-12-23`);
const hela = K.semesterdagar(`${Y}-12-23`, tj);
const fristSlut = K.nastaVardag(ja);
const ja27 = `${Y + 1}-12-24`;

export default defineGuide({
  id: 'jul-2026', group: 'hogtider', order: 26, tool: 'jul', toolArg: { ar: Y },
  countdown: { date: ja, label: { sv: `Julafton ${Y}`, en: `Christmas Eve ${Y}` } },
  related: ['jullov-2026', 'klamdagar-2026', 'helgaftnar', 'tidsfrist'],
  sources: ['helgdagslag', 'semesterlag', 'lagstadgadtid'],
  sv: {
    slug: 'jul-2026', nav: 'Jul 2026', card: 'Julafton, juldagen och mellandagarna 2026',
    title: 'Jul 2026: julafton på torsdag och elva dagar ledigt i rad',
    description: 'Jul 2026: julafton är en torsdag, juldagen en fredag och nyårsafton en torsdag. Nedräkning till julafton och hur tre semesterdagar ger elva lediga dagar i rad.',
    h1: 'Jul och nyår 2026',
    intro: `Julafton ${Y} infaller på en ${wdLong(ja, 'sv')}. Nedräkningen ovan visar dagar och timmar kvar.`,
    resume: `Julafton ${Y} är en ${wdLong(ja, 'sv')}, juldagen en ${wdLong(jd, 'sv')} och annandag jul en ${wdLong(aj, 'sv')}. Nyårsafton blir också en ${wdLong(na, 'sv')} och nyårsdagen ${Y + 1} en ${wdLong(nd, 'sv')}. Det gör ${Y} till ett gynnsamt år för den som vill vara ledig länge med få semesterdagar. Julafton och nyårsafton är inga allmänna helgdagar, men semesterlagen räknar dem som söndagar, så de kostar aldrig semester. Mellan jul och nyår återstår bara ${n(mellan.sem, 'sv')} arbetsdagar, måndag till onsdag. Tar du dem som semester är du ledig från julafton till och med söndagen den ${dLong(`${Y + 1}-01-03`, 'sv')}, elva dagar i rad. Lägger du till måndag och tisdag före trettondedag jul, som är en ${wdLong(tj, 'sv')}, räcker ledigheten till den ${dLong(tj, 'sv')}. Hela perioden 23 december till trettondagen kostar ${n(hela.sem, 'sv')} semesterdagar.`,
    faqs: [
      { q: 'Vilken veckodag är julafton 2026?', a: `Julafton ${Y} infaller på en ${wdLong(ja, 'sv')}, i vecka ${vecka(ja)}. Juldagen är fredagen den ${dLong(jd, 'sv')} och annandag jul lördagen den ${dLong(aj, 'sv')}. Annandag jul ger alltså ingen extra ledig vardag ${Y}, men eftersom julafton är en torsdag blir julhelgen ändå fyra dagar lång för de flesta.` },
      { q: 'Kostar julafton och nyårsafton semesterdagar?', a: 'Nej. Enligt 3 a § semesterlagen jämställs julafton och nyårsafton med söndag när semesterdagar räknas. Har du semester över jul drar arbetsgivaren därför inga dagar för aftnarna. Det är dock ingen allmän helgdag, och om du har ledigt på aftnarna styrs av ditt kollektivavtal eller din arbetsgivare.' },
      { q: 'Hur många semesterdagar behövs mellan jul och nyår 2026?', a: `${n(mellan.sem, 'sv')}, nämligen måndag ${dLong(`${Y}-12-28`, 'sv')} till onsdag ${dLong(`${Y}-12-30`, 'sv')}. Nyårsafton på torsdagen räknas inte och nyårsdagen på fredagen är röd dag. Med de tre dagarna blir du ledig elva dagar i följd. Vill du stanna hemma till trettondagen kostar det ytterligare ${n(tillTretton.sem - mellan.sem, 'sv')} dagar.` },
      { q: 'Vad händer med en frist som går ut på julafton 2026?', a: `Enligt lagen om beräkning av lagstadgad tid får åtgärden göras nästa vardag när sista dagen är en lördag, söndag, helgdag, midsommarafton, julafton eller nyårsafton. En frist som slutar på julafton ${Y} flyttas därför över juldagen och helgen till ${dWeek(fristSlut, 'sv')}.` },
    ],
    body: (h) => `<h2>Julens och nyårets dagar ${Y}</h2>
<p>Verktyget ovan visar veckodagarna för jul och nyår och räknar semesterdagarna mellan 23 december och trettondedag jul. Röda dagar enligt ${h.src('helgdagslag', 'lagen om allmänna helgdagar')} är juldagen, annandag jul, nyårsdagen och trettondedag jul. Julafton och nyårsafton är aftnar: de saknas i lagen men har en särskild ställning i semesterlagen och i lagen om frister.</p>
<p>${Y} faller juldagen på en fredag och annandag jul på en lördag. Den som hoppas på en ledig måndag efter jul blir besviken, eftersom Sverige inte flyttar helgdagar som hamnar på en helg. I gengäld ligger både julafton och nyårsafton på torsdagar, och veckan mellan dem har bara tre arbetsdagar.</p>
<h2>Så får du flest lediga dagar</h2>
<p>Det billigaste är de tre dagarna i mellandagarna, som ger elva dagar ledigt. Vill du börja tidigare kostar måndag till onsdag veckan före jul ${n(fore.sem, 'sv')} semesterdagar och ger nio dagar från lördagen den ${dLong(`${Y}-12-19`, 'sv')}. Kombinerar du båda och lägger till dagarna före trettondagen blir det en sammanhängande ledighet på nästan tre veckor. ${h.src('semesterlag', 'Semesterlagen')} gör att aftnarna inte räknas, vilket du kan kontrollera själv i verktyget.</p>
<p>Jullovet för skolbarn beslutas av varje kommun och börjar ${Y} i de flesta kommuner vi följer den ${dLong(`${Y}-12-19`, 'sv')} eller några dagar senare. Datumen per kommun finns under ${h.a('jullov-2026', 'jullov 2026')}, och resten av årets broar under ${h.a('klamdagar-2026', 'klämdagar 2026')}.</p>
<h2>Frister över jul och nyår</h2>
<p>Under jul och nyår finns många dagar som inte är vardagar i lagens mening. ${h.src('lagstadgadtid', '2 § lagen om beräkning av lagstadgad tid')} säger att en åtgärd som ska göras senast en viss dag får göras nästa vardag om den dagen är en lördag, söndag, helgdag, midsommarafton, julafton eller nyårsafton. Räkna ut en egen frist nedan.</p>
${h.mini('tf', { p: ['dag', 'frist'], d: { ar: Y, man: 12, dag: 1, frist: 23 }, c: 'Räkna ut en frist över jul' })}
<p>Mer om aftnarna och vilka regler som gäller för dem finns under ${h.a('helgaftnar', 'helgaftnar')}. Nästa år blir mindre gynnsamt: julafton ${Y + 1} är en ${wdLong(ja27, 'sv')} och juldagen en lördag.</p>`,
  },
  en: {
    slug: 'christmas-2026', nav: 'Christmas 2026', card: 'Christmas Eve, Christmas Day and the days between, 2026',
    title: 'Christmas 2026 in Sweden: Eve on Thursday, 11 Days Off',
    description: 'Christmas 2026 in Sweden: Christmas Eve is a Thursday, Christmas Day a Friday, New Year\'s Eve a Thursday. Countdown, and three leave days for eleven days off.',
    h1: 'Christmas and New Year 2026 in Sweden',
    intro: `Christmas Eve ${Y} falls on a ${wdLong(ja, 'en')}. The countdown above shows the days and hours left.`,
    resume: `In Sweden Christmas Eve ${Y} is a ${wdLong(ja, 'en')}, Christmas Day a ${wdLong(jd, 'en')} and Boxing Day a ${wdLong(aj, 'en')}. New Year's Eve is also a ${wdLong(na, 'en')} and New Year's Day ${Y + 1} a ${wdLong(nd, 'en')}. That makes ${Y} a good year for a long break on few leave days. Christmas Eve and New Year's Eve are not public holidays, but the Annual Leave Act treats them as Sundays, so they never cost leave. Between Christmas and New Year only ${n(mellan.sem, 'en')} working days remain, Monday to Wednesday. Take them as leave and you are off from Christmas Eve through Sunday ${dLong(`${Y + 1}-01-03`, 'en')}, eleven days in a row. Add the Monday and Tuesday before Epiphany, a ${wdLong(tj, 'en')}, and the break lasts until ${dLong(tj, 'en')}. The whole stretch from 23 December to Epiphany costs ${n(hela.sem, 'en')} leave days.`,
    faqs: [
      { q: 'What day of the week is Christmas Eve 2026 in Sweden?', a: `Christmas Eve ${Y} falls on a ${wdLong(ja, 'en')}, in week ${vecka(ja)}. Christmas Day is Friday ${dLong(jd, 'en')} and Boxing Day Saturday ${dLong(aj, 'en')}. Boxing Day therefore gives no extra weekday off in ${Y}, but with Christmas Eve on a Thursday most people still get a four-day Christmas weekend.` },
      { q: 'Do Christmas Eve and New Year\'s Eve use up leave days?', a: 'No. Under section 3a of the Annual Leave Act, Christmas Eve and New Year\'s Eve count like Sundays when leave days are reckoned. If you are on leave over Christmas, your employer deducts nothing for the eves. They are still not public holidays, and whether you have them off depends on your collective agreement or employer.' },
      { q: 'How many leave days between Christmas and New Year 2026?', a: `${n(mellan.sem, 'en')}: Monday ${dLong(`${Y}-12-28`, 'en')} to Wednesday ${dLong(`${Y}-12-30`, 'en')}. New Year's Eve on the Thursday does not count and New Year's Day on the Friday is a public holiday. Those three days give eleven days off in a row. Staying off until Epiphany costs another ${n(tillTretton.sem - mellan.sem, 'en')} days.` },
      { q: 'What happens to a deadline that falls on Christmas Eve 2026?', a: `Under the Act on statutory time limits, when the last day is a Saturday, Sunday, public holiday, Midsummer Eve, Christmas Eve or New Year's Eve, the step may be taken on the next weekday. A deadline ending on Christmas Eve ${Y} therefore moves past Christmas Day and the weekend to ${dWeek(fristSlut, 'en')}.` },
    ],
    body: (h) => `<h2>The Christmas and New Year days of ${Y}</h2>
<p>The tool above shows the weekdays for Christmas and New Year and counts leave days between 23 December and Epiphany. The public holidays under the ${h.src('helgdagslag', 'Public Holidays Act')} are Christmas Day, Boxing Day, New Year's Day and Epiphany. Christmas Eve and New Year's Eve are eves: they are not in the Act but have a special place in the Annual Leave Act and in the rules on deadlines.</p>
<p>In ${Y} Christmas Day falls on a Friday and Boxing Day on a Saturday. Anyone hoping for a Monday off after Christmas will be disappointed, because Sweden does not move holidays that land at a weekend. On the other hand, Christmas Eve and New Year's Eve are both Thursdays, and the week between them has only three working days.</p>
<h2>Getting the most days off</h2>
<p>The cheapest option is the three days between Christmas and New Year, which give eleven days off. To start earlier, Monday to Wednesday of the week before Christmas costs ${n(fore.sem, 'en')} leave days and gives nine days from Saturday ${dLong(`${Y}-12-19`, 'en')}. Combine both and add the days before Epiphany for an unbroken break of almost three weeks. Under the ${h.src('semesterlag', 'Annual Leave Act')} the eves are not counted, which you can check yourself in the tool.</p>
<p>The Christmas school break is set by each municipality and in ${Y} starts on ${dLong(`${Y}-12-19`, 'en')} or a few days later in most of the municipalities we follow. Dates per municipality are on ${h.a('jullov-2026', 'Christmas break 2026')}, and the rest of the year's bridges on ${h.a('klamdagar-2026', 'bridge days 2026')}.</p>
<h2>Deadlines over Christmas and New Year</h2>
<p>Christmas and New Year contain many days that are not weekdays in the legal sense. ${h.src('lagstadgadtid', 'Section 2 of the Act on statutory time limits')} says that a step due by a certain day may be taken on the next weekday if that day is a Saturday, Sunday, public holiday, Midsummer Eve, Christmas Eve or New Year's Eve. Work out your own deadline below.</p>
${h.mini('tf', { p: ['dag', 'frist'], d: { ar: Y, man: 12, dag: 1, frist: 23 }, c: 'Work out a deadline over Christmas' })}
<p>More on the eves and the rules that apply to them is on ${h.a('helgaftnar', 'holiday eves')}. Next year is less kind: Christmas Eve ${Y + 1} is a ${wdLong(ja27, 'en')} and Christmas Day a Saturday.</p>`,
  },
});
