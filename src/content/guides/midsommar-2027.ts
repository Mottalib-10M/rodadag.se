/** Midsommar 2027 : midsommarafton vendredi 25 juin, pas un jour férié mais assimilé au dimanche (3 a § semesterlagen). Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, plus, vecka } from '../_lib';

const Y = 2027;
const ma = K.midsommarafton(Y), md = K.midsommardagen(Y);
const fore = K.semesterdagar(plus(ma, -4), plus(ma, -1));
const tre = K.semesterdagar(plus(md, 2), plus(md, 22));
const ma26 = K.midsommarafton(Y - 1), ma28 = K.midsommarafton(Y + 1);
// Tidigaste och senaste midsommarafton de kommande 30 åren.
const ar = Array.from({ length: 30 }, (_, i) => K.midsommarafton(Y + i));
const tidig = ar.reduce((a, b) => (b.slice(5) < a.slice(5) ? b : a)), sen = ar.reduce((a, b) => (b.slice(5) > a.slice(5) ? b : a));

export default defineGuide({
  id: 'midsommar-2027', group: 'hogtider', order: 23, tool: 'ms', toolArg: { ar: Y },
  countdown: { date: ma, label: { sv: `Midsommarafton ${Y}`, en: `Midsummer Eve ${Y}` } },
  related: ['helgaftnar', 'sommarlov-2027', 'semesterdagar', 'home'],
  sources: ['helgdagslag', 'semesterlag', 'lagstadgadtid'],
  sv: {
    slug: 'midsommar-2027', nav: 'Midsommar 2027', card: 'Midsommarafton och midsommardagen 2027',
    title: 'Midsommar 2027: midsommarafton fredag 25 juni och nedräkning',
    description: 'Midsommar 2027: midsommarafton är fredagen den 25 juni och midsommardagen lördagen den 26 juni. Nedräkning, vecka 25, semesterdagar och regeln bakom datumet.',
    h1: 'Midsommar 2027',
    intro: `Midsommarafton ${Y} är fredagen den ${dLong(ma, 'sv')}. Nedräkningen ovan visar hur lång tid det är kvar.`,
    resume: `Midsommarafton ${Y} infaller fredagen den ${dLong(ma, 'sv')} och midsommardagen lördagen den ${dLong(md, 'sv')}. Det är midsommardagen som är allmän helgdag: lagen säger att den är lördagen mellan 20 och 26 juni, och därför är aftonen alltid en fredag mellan 19 och 25 juni. ${Y} hamnar den på den senaste möjliga dagen, i vecka ${vecka(ma)}. Midsommarafton är ingen röd dag i lagens mening, men semesterlagen jämställer den med söndag, så den kostar aldrig en semesterdag, inte ens mitt i en semestervecka. De flesta har ändå ledigt, genom kollektivavtal eller lång praxis. Fyra semesterdagar måndag till torsdag före ger nio dagar ledigt från lördagen den ${dLong(plus(ma, -6), 'sv')}. Året före, ${Y - 1}, var midsommarafton den ${dLong(ma26, 'sv')}, och ${Y + 1} blir den den ${dLong(ma28, 'sv')}.`,
    faqs: [
      { q: 'Vilket datum är midsommarafton 2027?', a: `Fredagen den ${dLong(ma, 'sv')}. Lagen bestämmer att midsommardagen är lördagen under perioden 20 till 26 juni, och aftonen är dagen före. ${Y} faller lördagen på den 26 juni, den sista dagen i perioden, så midsommar blir ovanligt sen. Nedräkningen överst räknar till midnatt svensk tid den dagen.` },
      { q: 'Är midsommarafton 2027 en röd dag?', a: 'Nej, det är midsommardagen på lördagen som är allmän helgdag. Midsommarafton saknas i lagen om allmänna helgdagar. Men 3 a § semesterlagen jämställer den med söndag, och en frist som slutar den dagen flyttas till nästa vardag. Att nästan alla är lediga beror på kollektivavtal och praxis.' },
      { q: 'Hur blir man ledig nio dagar runt midsommar 2027?', a: `Ta ut semester måndag till torsdag veckan före, ${dLong(plus(ma, -4), 'sv')} till ${dLong(plus(ma, -1), 'sv')}. Det kostar ${n(fore.sem, 'sv')} semesterdagar, och eftersom aftonen inte räknas blir du ledig från lördagen den ${dLong(plus(ma, -6), 'sv')} till söndagen den ${dLong(plus(md, 1), 'sv')}. Arbetar du på aftonen, som många inom handel och vård, ändras räkningen.` },
      { q: 'Kan midsommar ligga i juli?', a: `Nej. Midsommardagen ligger alltid mellan 20 och 26 juni, så aftonen ligger mellan 19 och 25 juni. Under de kommande 30 åren är den tidigaste midsommaraftonen den ${dLong(tidig, 'sv')} och den senaste den ${dLong(sen, 'sv')}. Regeln ändrades inte när nationaldagen blev röd dag 2005.` },
    ],
    body: (h) => `<h2>Datumet och regeln</h2>
<p>Enligt ${h.src('helgdagslag', '2 § lagen om allmänna helgdagar')} är midsommardagen den lördag som infaller under tiden 20 till 26 juni. Aftonen, fredagen före, nämns inte i lagen. Tabellen i verktyget visar midsommar för de kommande åren, och nedräkningen överst räknar ner till midnatt svensk tid den ${dLong(ma, 'sv')}.</p>
<p>${Y} är ett år med sen midsommar. Skolavslutningen ligger i alla de 24 kommuner vi följer redan i början av juni, så barnen har hunnit vara lediga en tid när midsommar kommer. Kommunernas datum för sista skoldagen finns under ${h.a('sommarlov-2027', 'sommarlov 2027')}.</p>
<h2>Midsommarafton och semestern</h2>
<p>Midsommarafton, julafton och nyårsafton har en särskild ställning. ${h.src('semesterlag', '3 a § semesterlagen')} säger att de jämställs med söndag när semesterdagar räknas. Tar du en semestervecka från måndag till fredag midsommarveckan kostar den alltså bara fyra semesterdagar. Detsamma gäller frister: enligt ${h.src('lagstadgadtid', 'lagen om beräkning av lagstadgad tid')} får en åtgärd vars sista dag är midsommarafton göras nästa vardag.</p>
<p>Själva ledigheten på aftonen är däremot ingen lagregel. Den kommer från kollektivavtal och från att arbetsgivare traditionellt håller stängt. Den som arbetar i butik, vård, omsorg eller transport kan ha arbetspass, ofta med ob-tillägg enligt avtalet. I våra verktyg kan du därför välja om aftnarna ska räknas som lediga eller som arbetsdagar.</p>
${h.mini('sd', { p: ['dag', 'langd'], d: { ar: Y, man: 6, dag: 19, langd: 23 }, c: 'Räkna semesterdagar över midsommar' })}
<h2>Sommarsemester med start vid midsommar</h2>
<p>Många börjar sommarsemestern vid midsommar. Tre veckor från måndagen efter midsommardagen kostar ${n(tre.sem, 'sv')} semesterdagar, eftersom inga röda dagar finns i juli. Lagen ger rätt till fyra veckor i följd under juni till augusti, om inget annat har avtalats. Hur hela årets semester kan fördelas visar planeraren för ${h.a('home', 'klämdagar 2027')}, och alla aftnar och deras ställning finns samlade under ${h.a('helgaftnar', 'helgaftnar')}.</p>
<p>Midsommar firas på olika sätt i olika delar av landet, ofta med midsommarstång, sill och dans på aftonen. Det är traditioner och inget som lagen reglerar; för kalenderns del är det bara datumen som räknas.</p>`,
  },
  en: {
    slug: 'midsummer-2027', nav: 'Midsummer 2027', card: 'Midsummer Eve and Midsummer Day 2027',
    title: 'Midsummer 2027 in Sweden: Friday 25 June and Countdown',
    description: 'Midsummer 2027 in Sweden: Midsummer Eve is Friday 25 June and Midsummer Day Saturday 26 June. Live countdown, week 25, leave days and the rule behind the date.',
    h1: 'Midsummer 2027 in Sweden',
    intro: `Midsummer Eve ${Y} is Friday ${dLong(ma, 'en')}. The countdown above shows how long is left.`,
    resume: `Midsummer Eve ${Y} falls on Friday ${dLong(ma, 'en')} and Midsummer Day on Saturday ${dLong(md, 'en')}. The public holiday is Midsummer Day: the law makes it the Saturday between 20 and 26 June, so the eve is always a Friday between 19 and 25 June. In ${Y} it lands on the latest possible date, in week ${vecka(ma)}. Midsummer Eve is not a public holiday in law, but the Annual Leave Act treats it like a Sunday, so it never uses a leave day. Most people are off anyway, through collective agreements or long custom. Four leave days Monday to Thursday before it give nine days off from Saturday ${dLong(plus(ma, -6), 'en')}. In ${Y - 1} Midsummer Eve was ${dLong(ma26, 'en')}, and in ${Y + 1} it will be ${dLong(ma28, 'en')}.`,
    faqs: [
      { q: 'What date is Midsummer Eve 2027?', a: `Friday ${dLong(ma, 'en')}. The law makes Midsummer Day the Saturday between 20 and 26 June, and the eve is the day before. In ${Y} that Saturday is 26 June, the last day of the window, so Midsummer is unusually late. The countdown at the top runs to midnight Swedish time on that day.` },
      { q: 'Is Midsummer Eve 2027 a public holiday in Sweden?', a: 'No, the public holiday is Midsummer Day on the Saturday. Midsummer Eve is not in the Public Holidays Act. But section 3a of the Annual Leave Act treats it like a Sunday, and a deadline ending that day moves to the next weekday. That nearly everyone is off comes from collective agreements and custom.' },
      { q: 'How do I get nine days off around Midsummer 2027?', a: `Take leave Monday to Thursday the week before, ${dLong(plus(ma, -4), 'en')} to ${dLong(plus(ma, -1), 'en')}. That costs ${n(fore.sem, 'en')} leave days, and since the eve does not count you are off from Saturday ${dLong(plus(ma, -6), 'en')} to Sunday ${dLong(plus(md, 1), 'en')}. If you work on the eve, as many in retail and care do, the count changes.` },
      { q: 'Can Swedish Midsummer fall in July?', a: `No. Midsummer Day is always between 20 and 26 June, so the eve falls between 19 and 25 June. Over the next 30 years the earliest Midsummer Eve is ${dLong(tidig, 'en')} and the latest ${dLong(sen, 'en')}. The rule was left unchanged when National Day became a public holiday in 2005.` },
    ],
    body: (h) => `<h2>The date and the rule</h2>
<p>Under ${h.src('helgdagslag', 'section 2 of the Public Holidays Act')}, Midsummer Day is the Saturday that falls between 20 and 26 June. The eve, the Friday before, is not mentioned in the Act. The table in the tool shows Midsummer for the coming years, and the countdown at the top runs to midnight Swedish time on ${dLong(ma, 'en')}.</p>
<p>${Y} is a late Midsummer. In all 24 municipalities we follow, the school year ends in early June, so children have already been on holiday for a while when Midsummer arrives. Each municipality's last school day is on ${h.a('sommarlov-2027', 'summer holidays 2027')}.</p>
<h2>Midsummer Eve and annual leave</h2>
<p>Midsummer Eve, Christmas Eve and New Year's Eve have a special status. ${h.src('semesterlag', 'Section 3a of the Annual Leave Act')} says they count like Sundays when leave days are reckoned. A week of leave from Monday to Friday in Midsummer week therefore costs only four leave days. Deadlines work the same way: under the ${h.src('lagstadgadtid', 'Act on statutory time limits')}, something due on Midsummer Eve may be done on the next weekday.</p>
<p>Having the eve off is not itself a legal rule. It comes from collective agreements and from employers traditionally closing. People in shops, healthcare, care homes or transport may well have a shift, often with unsocial-hours pay under their agreement. Our tools therefore let you count the eves as days off or as working days.</p>
${h.mini('sd', { p: ['dag', 'langd'], d: { ar: Y, man: 6, dag: 19, langd: 23 }, c: 'Count leave days over Midsummer' })}
<h2>Starting the summer holiday at Midsummer</h2>
<p>Many Swedes start their summer leave at Midsummer. Three weeks from the Monday after Midsummer Day cost ${n(tre.sem, 'en')} leave days, as July has no public holidays. The law gives a right to four consecutive weeks between June and August unless otherwise agreed. How to spread the year's leave is shown by the planner for ${h.a('home', 'bridge days 2027')}, and all the eves and their status are gathered on ${h.a('helgaftnar', 'holiday eves')}.</p>
<p>Midsummer is celebrated differently around the country, often with a maypole, pickled herring and dancing on the eve. These are traditions, not law; for the calendar only the dates matter.</p>`,
  },
});
