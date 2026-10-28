/** Alla helgons dag 2026 : samedi 31 octobre ; allhelgonaafton = jour ouvré ; höstlov v44. Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, plus, vecka } from '../_lib';

const Y = 2026;
const ah = K.allaHelgonsDag(Y), afton = plus(ah, -1), ah27 = K.allaHelgonsDag(Y + 1), ah28 = K.allaHelgonsDag(Y + 2);
const hostlov = K.KOMMUNER.filter((k) => k.hostlov2026);
const sammaHostlov = hostlov.every((k) => k.hostlov2026![0] === hostlov[0].hostlov2026![0] && k.hostlov2026![1] === hostlov[0].hostlov2026![1]);
const hl = hostlov[0].hostlov2026!;
const fristAfton = K.nastaVardag(afton);

export default defineGuide({
  id: 'alla-helgons-dag-2026', group: 'hogtider', order: 25, tool: 'ah', toolArg: { ar: Y },
  related: ['hostlov-2026', 'helgaftnar', 'jul-2026', 'roda-dagar-2026'],
  sources: ['helgdagslag', 'lagstadgadtid', 'semesterlag'],
  sv: {
    slug: 'alla-helgons-dag-2026', nav: 'Alla helgons dag 2026', card: 'Alla helgons dag och allhelgonaafton 2026',
    title: 'Alla helgons dag 2026: lördag 31 oktober och allhelgonaafton',
    description: 'Alla helgons dag 2026 infaller lördagen den 31 oktober. Allhelgonaafton är en vanlig arbetsdag, och höstlovet ligger samma vecka. Datum, regel och kommande år.',
    h1: 'Alla helgons dag 2026',
    intro: `Alla helgons dag ${Y} är lördagen den ${dLong(ah, 'sv')}, sista dagen i höstlovsveckan.`,
    resume: `Alla helgons dag ${Y} infaller lördagen den ${dLong(ah, 'sv')}, i vecka ${vecka(ah)}. Lagen om allmänna helgdagar säger att dagen är den lördag som infaller mellan 31 oktober och 6 november, så den hamnar alltid på en helg och ger aldrig en extra ledig vardag. ${Y} ligger den på den tidigaste möjliga dagen. Allhelgonaafton, fredagen den ${dLong(afton, 'sv')}, är ingen helgdag och har inte heller den särställning som midsommar-, jul- och nyårsafton har i semesterlagen: den räknas som en vanlig arbetsdag och kostar en semesterdag om du är ledig. ${sammaHostlov ? `Alla ${hostlov.length} kommuner vi följer har höstlov ${dLong(hl[0], 'sv')} till ${dLong(hl[1], 'sv')}` : `De flesta kommuner vi följer har höstlov i vecka ${vecka(hl[0])}`}, så lovet slutar dagen före alla helgons dag. Nästa år infaller dagen den ${dLong(ah27, 'sv')} och ${Y + 2} den ${dLong(ah28, 'sv')}.`,
    faqs: [
      { q: 'Vilket datum är alla helgons dag 2026?', a: `Lördagen den ${dLong(ah, 'sv')}. Enligt 2 § lagen om allmänna helgdagar är alla helgons dag den lördag som infaller under tiden 31 oktober till 6 november. ${Y} är 31 oktober själv en lördag, så dagen hamnar på periodens första datum. ${Y + 1} hamnar den i stället på den sista, ${dLong(ah27, 'sv')}.` },
      { q: 'Är allhelgonaafton 2026 en arbetsdag?', a: `Ja. Allhelgonaafton, fredagen den ${dLong(afton, 'sv')}, är varken allmän helgdag eller jämställd med söndag i semesterlagen. Den är en vanlig arbetsdag, kostar en semesterdag om du tar ledigt och flyttar inte en frist. Vissa arbetsplatser slutar tidigare, men det är en fråga om avtal eller praxis.` },
      { q: 'Ger alla helgons dag 2026 en ledig dag från jobbet?', a: 'Nej, eftersom den alltid infaller på en lördag. Sverige har ingen regel om ersättningsdag när en helgdag hamnar på en helg. För den som arbetar på lördagar, till exempel i handeln, kan dagen däremot påverka ersättning och schema enligt kollektivavtalet.' },
    ],
    body: (h) => `<h2>Regeln och datumen</h2>
<p>Alla helgons dag är en av två helgdagar som lagen själv lägger på en lördag. Den andra är midsommardagen. ${h.src('helgdagslag', '2 § lagen om allmänna helgdagar')} anger perioden 31 oktober till 6 november, och tabellen i verktyget visar datumen för ${Y} och de kommande åren. Dagen före kallas allhelgonaafton; varken den eller söndagen efter är helgdag i lagens mening.</p>
<p>Eftersom dagen alltid är en lördag påverkar den inte antalet arbetsdagar. Den som arbetar måndag till fredag märker alla helgons dag främst genom att höstlovet och allhelgonahelgen ofta ligger i samma vecka.</p>
<h2>Allhelgonaafton är en vanlig fredag</h2>
<p>Många tror att alla aftnar behandlas lika, men så är det inte. ${h.src('semesterlag', '3 a § semesterlagen')} nämner bara midsommarafton, julafton och nyårsafton. Allhelgonaafton, liksom valborgsmässoafton och trettondagsafton, räknas därför som en vanlig vardag: en semesterdag dras om du är ledig. Samma gäller frister. ${h.src('lagstadgadtid', 'Lagen om beräkning av lagstadgad tid')} flyttar bara en frist som slutar på en lördag, söndag, helgdag eller någon av de tre stora aftnarna. En frist som slutar på allhelgonaafton ${Y} ska alltså hållas samma dag, ${dWeek(fristAfton, 'sv')}.</p>
<h2>Höstlovet ${Y}</h2>
<p>${sammaHostlov ? `Höstlovet ${Y} ligger i alla ${hostlov.length} kommuner vi följer från ${dLong(hl[0], 'sv')} till ${dLong(hl[1], 'sv')}` : `Höstlovet ${Y} ligger i de flesta kommuner vi följer i vecka ${vecka(hl[0])}`}, med några skillnader i hur dagarna kallas. Kontrollera din kommun nedan eller under ${h.a('hostlov-2026', 'höstlov 2026')}.</p>
${h.mini('lov', { p: ['kommun'], d: { typ: 'hostlov2026' }, c: 'Se höstlovet i din kommun' })}
<p>Alla helgons dag är en dag för att minnas de döda, och många besöker gravar och tänder ljus under helgen. Det är en tradition och ingen lagregel. Nästa röda dag efter alla helgons dag är juldagen; jul och nyår ${Y} beskrivs under ${h.a('jul-2026', 'jul 2026')}. Mellan dem finns ${n(K.arbetsdagar(Y, { aftnar: true })[10], 'sv')} arbetsdagar i november.</p>`,
  },
  en: {
    slug: 'all-saints-day-2026', nav: "All Saints' Day 2026", card: "All Saints' Day and All Saints' Eve 2026",
    title: "All Saints' Day 2026 in Sweden: Saturday 31 October",
    description: "All Saints' Day 2026 in Sweden falls on Saturday 31 October. All Saints' Eve is an ordinary working day, and the autumn school break is the same week.",
    h1: "All Saints' Day 2026 in Sweden",
    intro: `All Saints' Day ${Y} is Saturday ${dLong(ah, 'en')}, the last day of the autumn break week.`,
    resume: `All Saints' Day ${Y} falls on Saturday ${dLong(ah, 'en')}, in week ${vecka(ah)}. Sweden's Public Holidays Act makes it the Saturday between 31 October and 6 November, so it always falls at a weekend and never gives an extra weekday off. In ${Y} it lands on the earliest possible date. All Saints' Eve, Friday ${dLong(afton, 'en')}, is not a public holiday, nor does it share the special status that Midsummer Eve, Christmas Eve and New Year's Eve have under the Annual Leave Act: it is an ordinary working day and costs a leave day if you take it off. ${sammaHostlov ? `All ${hostlov.length} municipalities we follow hold the autumn school break from ${dLong(hl[0], 'en')} to ${dLong(hl[1], 'en')}` : `Most municipalities we follow hold the autumn break in week ${vecka(hl[0])}`}, so the break ends the day before All Saints' Day. Next year the day falls on ${dLong(ah27, 'en')} and in ${Y + 2} on ${dLong(ah28, 'en')}.`,
    faqs: [
      { q: "What date is All Saints' Day 2026 in Sweden?", a: `Saturday ${dLong(ah, 'en')}. Under section 2 of the Public Holidays Act, All Saints' Day is the Saturday that falls between 31 October and 6 November. In ${Y} 31 October is itself a Saturday, so the day lands on the first date of the window. In ${Y + 1} it falls on the last, ${dLong(ah27, 'en')}.` },
      { q: "Is All Saints' Eve 2026 a working day in Sweden?", a: `Yes. All Saints' Eve, Friday ${dLong(afton, 'en')}, is neither a public holiday nor treated as a Sunday under the Annual Leave Act. It is an ordinary working day, costs a leave day if you take it off and does not move a deadline. Some workplaces close early, but that is down to agreement or custom.` },
      { q: "Does All Saints' Day 2026 give a day off work?", a: 'No, because it always falls on a Saturday. Sweden has no substitute-day rule when a holiday lands at a weekend. For people who work Saturdays, in retail for example, the day can still affect pay and rotas under the collective agreement.' },
    ],
    body: (h) => `<h2>The rule and the dates</h2>
<p>All Saints' Day is one of two holidays that the law itself places on a Saturday, the other being Midsummer Day. ${h.src('helgdagslag', 'Section 2 of the Public Holidays Act')} gives the window 31 October to 6 November, and the table in the tool shows the dates for ${Y} and the coming years. The day before is called All Saints' Eve; neither it nor the Sunday after is a public holiday in law.</p>
<p>Because the day is always a Saturday it does not change the number of working days. People who work Monday to Friday notice All Saints' Day mainly because the autumn school break and the All Saints' weekend tend to fall in the same week.</p>
<h2>All Saints' Eve is an ordinary Friday</h2>
<p>It is easy to assume that all eves are treated alike, but they are not. ${h.src('semesterlag', 'Section 3a of the Annual Leave Act')} names only Midsummer Eve, Christmas Eve and New Year's Eve. All Saints' Eve, like Walpurgis Night and Twelfth Night, is therefore an ordinary weekday: a leave day is deducted if you take it off. The same goes for deadlines. The ${h.src('lagstadgadtid', 'Act on statutory time limits')} only moves a deadline ending on a Saturday, Sunday, public holiday or one of the three main eves. A deadline ending on All Saints' Eve ${Y} must be met that day, ${dWeek(fristAfton, 'en')}.</p>
<h2>The autumn school break ${Y}</h2>
<p>${sammaHostlov ? `In all ${hostlov.length} municipalities we follow, the ${Y} autumn break runs from ${dLong(hl[0], 'en')} to ${dLong(hl[1], 'en')}` : `In most municipalities we follow, the ${Y} autumn break falls in week ${vecka(hl[0])}`}, with some differences in what the days are called. Check your municipality below or on ${h.a('hostlov-2026', 'autumn break 2026')}.</p>
${h.mini('lov', { p: ['kommun'], d: { typ: 'hostlov2026' }, c: 'See the autumn break in your municipality' })}
<p>All Saints' Day is a day to remember the dead, and many people visit graves and light candles over the weekend. That is a tradition, not a legal rule. The next public holiday after All Saints' Day is Christmas Day; Christmas and New Year ${Y} are covered on ${h.a('jul-2026', 'Christmas 2026')}. November ${Y} has ${n(K.arbetsdagar(Y, { aftnar: true })[10], 'en')} working days between them.</p>`,
  },
});
