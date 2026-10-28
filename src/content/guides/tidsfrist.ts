/** Tidsfrist : lag (1930:173) om beräkning av lagstadgad tid, 1 § (mois/années) et 2 § (report au prochain vardag). Moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, type Lang } from '../_lib';

/** 1 § : en frist i månader slutar samma datum i sista månaden, eller månadens sista dag om datumet saknas. */
const plusManad = (iso: string, m: number) => {
  const [y, mo, d] = iso.split('-').map(Number);
  const t = new Date(Date.UTC(y, mo - 1 + m, 1));
  const last = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
  return K.toIso(K.dayNum(t.getUTCFullYear(), t.getUTCMonth() + 1, Math.min(d, last)));
};
const ex = (start: string, dagar: number) => { const sista = K.plusDays(start, dagar); return { start, dagar, sista, flyttad: K.nastaVardag(sista) }; };
const jul = ex('2026-12-03', 21), pask = ex('2027-03-05', 21), mid = ex('2027-06-04', 21), valb = ex('2027-04-09', 21);
const man = { start: '2027-01-31', sista: plusManad('2027-01-31', 1) };
const manFlytt = K.nastaVardag(man.sista);
const rows = (l: Lang) => [jul, pask, mid, valb].map((e) => [dLong(e.start, l), dWeek(e.sista, l), dWeek(e.flyttad, l)]);

export default defineGuide({
  id: 'tidsfrist', group: 'verktyg', order: 8, tool: 'tf', toolArg: { ar: 2026, man: 12, dag: 3, frist: 21 },
  related: ['helgaftnar', 'helgdagar', 'nasta-roda-dag', 'roda-dagar-2027'],
  sources: ['lagstadgadtid', 'helgdagslag'],
  sv: {
    slug: 'tidsfrist', nav: 'Tidsfrist', card: 'Sista dag för en frist enligt lag',
    title: 'Tidsfrist: sista dagen när fristen slutar på en röd dag',
    description: 'Tidsfrist enligt lagen om beräkning av lagstadgad tid: slutar fristen på en helg, röd dag eller afton flyttas den till nästa vardag. Räkna ut sista dagen här.',
    h1: 'Tidsfrist och röda dagar',
    intro: 'Ange startdatum och fristens längd i dagar. Verktyget visar den räknade sista dagen och, om den inte är en vardag, den dag då det räcker att agera.',
    resume: `Många frister i svensk lag räknas i dagar, veckor eller månader, till exempel tre veckor för att överklaga ett myndighetsbeslut. När den sista dagen infaller på en lördag, söndag eller annan allmän helgdag, eller på midsommarafton, julafton eller nyårsafton, räcker det enligt 2 § lagen (1930:173) om beräkning av lagstadgad tid att åtgärden görs nästa vardag. En frist på tre veckor från den ${dLong(jul.start, 'sv')} slutar på julafton, och sista dag att agera blir då ${dWeek(jul.flyttad, 'sv')}. En frist som slutar på långfredagen ${2027} flyttas förbi hela påskhelgen till ${dWeek(pask.flyttad, 'sv')}. Valborgsmässoafton och skärtorsdagen flyttar däremot ingenting, eftersom lagen inte nämner dem. För frister i månader säger 1 § att tiden går ut samma datum i sista månaden, eller månadens sista dag om datumet saknas. Avtal och vissa processuella frister kan ha egna regler.`,
    faqs: [
      { q: 'Flyttas en tidsfrist som slutar på julafton?', a: `Ja. Julafton nämns uttryckligen i 2 § lagen om beräkning av lagstadgad tid, liksom midsommarafton och nyårsafton. Slutar en lagstadgad frist på julafton räcker det att agera nästa vardag. ${2026} blir det ${dWeek(jul.flyttad, 'sv')}, eftersom juldagen, annandag jul och söndagen ligger emellan.` },
      { q: 'Gäller förlängningen även på valborgsmässoafton?', a: `Nej. Lagen räknar bara upp lördag, söndag, allmänna helgdagar och de tre aftnarna midsommar-, jul- och nyårsafton. Valborgsmässoafton, skärtorsdagen och trettondagsafton är vanliga vardagar i lagens mening, även om många arbetsplatser stänger tidigare. En frist som slutar den ${dLong(valb.sista, 'sv')} slutar alltså den dagen.` },
      { q: 'Hur räknas en tidsfrist på en månad?', a: `Enligt 1 § går en frist på en eller flera månader ut den dag i sista månaden som har samma nummer som startdagen. Saknas den dagen, som den 31 februari, blir det månadens sista dag. En månad från den ${dLong(man.start, 'sv')} slutar därför den ${dLong(man.sista, 'sv')}${manFlytt !== man.sista ? `, som är en söndag, så det räcker att agera ${dWeek(manFlytt, 'sv')}` : ''}.` },
      { q: 'Gäller samma regel för avtal och fakturor?', a: 'Inte automatiskt. Lagen om beräkning av lagstadgad tid gäller frister som står i lag eller annan författning. En förfallodag i ett avtal eller på en faktura följer avtalet, men många avtal och branschvillkor har en liknande regel om nästa bankdag. Läs villkoren eller fråga motparten om du är osäker.' },
    ],
    body: (h) => `<h2>Exempel på flyttade frister</h2>
<p>Tabellen visar frister på tre veckor som slutar kring röda dagar och aftnar, och vilken dag det räcker att agera enligt ${h.src('lagstadgadtid', '2 § lagen om beräkning av lagstadgad tid')}. Röda dagar räknas ut enligt ${h.src('helgdagslag', 'lagen om allmänna helgdagar')}.</p>
${h.table(['Start', 'Räknad sista dag', 'Sista dag att agera'], rows('sv'), 'Tre veckors frist kring helger', ['l', 'l', 'l'])}
<p>Påskexemplet visar hur långt en frist kan förskjutas: från långfredagen över påskafton, påskdagen och annandag påsk till tisdagen. Midsommarexemplet flyttas från fredagen till måndagen, eftersom midsommarafton och midsommardagen följs av söndagen.</p>
<h2>Hur dagarna räknas</h2>
<p>En frist i dagar räknas normalt från dagen efter den händelse som startar den, till exempel dagen då du fick del av ett beslut. Tre veckor från en torsdag slutar därför en torsdag tre veckor senare. Verktyget lägger helt enkelt till antalet dagar och tillämpar sedan regeln om nästa vardag. Står det i lagen att något ska göras senast en viss dag, eller inom en viss tid, gäller samma regel.</p>
${h.mini('kw', { p: ['ar', 'v'], d: { ar: 2027, v: 12 }, c: 'Se vilka dagar en vecka innehåller' })}
<h2>Var försiktig med undantagen</h2>
<p>Regeln gäller bara när inget annat är föreskrivet. Vissa processuella frister har egna bestämmelser, och avtal, fakturor och hyreskontrakt följer sina egna villkor. Lämna helst in i god tid. Myndigheter tar ofta emot handlingar digitalt även på helgdagar, men det som räknas är när handlingen kom in, inte när du skickade den. En överblick över vilka aftnar som är lediga enligt lag finns på ${h.a('helgaftnar', 'helgaftnar')}.</p>`,
  },
  en: {
    slug: 'statutory-deadlines', nav: 'Statutory deadlines', card: 'Last day of a legal time limit',
    title: 'Statutory Deadlines in Sweden: When the Last Day Moves',
    description: 'Statutory deadlines in Sweden: a legal time limit ending on a weekend, holiday or one of the three main eves moves to the next weekday. Find the last day.',
    h1: 'Statutory deadlines and holidays',
    intro: 'Enter the start date and the length of the time limit in days. The tool shows the computed last day and, if it is not a weekday, the day by which acting is enough.',
    resume: `Many time limits in Swedish law run for days, weeks or months, for instance three weeks to appeal a decision by a public authority. When the last day falls on a Saturday, Sunday or other public holiday, or on Midsummer Eve, Christmas Eve or New Year's Eve, section 2 of the 1930 Act on the computation of statutory time limits lets you act on the next weekday. A three-week limit from ${dLong(jul.start, 'en')} ends on Christmas Eve, so the last day to act becomes ${dWeek(jul.flyttad, 'en')}. A limit ending on Good Friday 2027 moves past the whole Easter weekend to ${dWeek(pask.flyttad, 'en')}. Walpurgis Night and Maundy Thursday move nothing, because the Act does not mention them. For limits counted in months, section 1 says time runs out on the same date in the final month, or on the last day of that month if the date does not exist. Contracts and some procedural limits may have their own rules.`,
    faqs: [
      { q: 'Does a Swedish deadline ending on Christmas Eve move?', a: `Yes. Christmas Eve is named in section 2 of the Act on statutory time limits, alongside Midsummer Eve and New Year's Eve. If a statutory limit ends on Christmas Eve, acting on the next weekday is enough. In 2026 that is ${dWeek(jul.flyttad, 'en')}, because Christmas Day, Boxing Day and a Sunday come in between.` },
      { q: 'Does the extension apply on Walpurgis Night?', a: `No. The Act lists only Saturday, Sunday, public holidays and the three eves of Midsummer, Christmas and New Year. Walpurgis Night, Maundy Thursday and Twelfth Night are ordinary weekdays in the Act's sense, even if many workplaces close early. A limit ending on ${dLong(valb.sista, 'en')} ends that day.` },
      { q: 'How is a one-month time limit counted?', a: `Under section 1, a limit of one or more months runs out on the day in the final month with the same number as the start date. If that day does not exist, as with 31 February, it is the last day of the month. One month from ${dLong(man.start, 'en')} therefore ends on ${dLong(man.sista, 'en')}${manFlytt !== man.sista ? `, a Sunday, so acting on ${dWeek(manFlytt, 'en')} is enough` : ''}.` },
      { q: 'Does the same rule apply to contracts and invoices?', a: 'Not automatically. The Act covers time limits set in statutes and other regulations. A due date in a contract or on an invoice follows the contract, though many contracts and trade terms have a similar next-banking-day rule. Read the terms or ask the other party if you are unsure.' },
    ],
    body: (h) => `<h2>Examples of moved deadlines</h2>
<p>The table shows three-week limits ending around holidays and eves, and the day by which acting is enough under ${h.src('lagstadgadtid', 'section 2 of the Act on statutory time limits')}. Holidays are worked out under the ${h.src('helgdagslag', 'Public Holidays Act')}.</p>
${h.table(['Start', 'Computed last day', 'Last day to act'], rows('en'), 'Three-week limits around holidays', ['l', 'l', 'l'])}
<p>The Easter example shows how far a limit can shift: from Good Friday over Holy Saturday, Easter Sunday and Easter Monday to the Tuesday. The Midsummer example moves from Friday to Monday, since Midsummer Eve and Midsummer Day are followed by a Sunday.</p>
<h2>How the days are counted</h2>
<p>A limit in days normally runs from the day after the event that starts it, such as the day you were notified of a decision. Three weeks from a Thursday therefore end on a Thursday three weeks later. The tool simply adds the number of days and then applies the next-weekday rule. Where the law says something must be done by a certain day, or within a certain time, the same rule applies.</p>
${h.mini('kw', { p: ['ar', 'v'], d: { ar: 2027, v: 12 }, c: 'See the days in any week' })}
<h2>Mind the exceptions</h2>
<p>The rule applies only where nothing else is prescribed. Some procedural limits have their own provisions, and contracts, invoices and leases follow their own terms. File in good time if you can. Authorities often accept documents online even on holidays, but what counts is when the document arrived, not when you sent it. An overview of which eves are free by law is on ${h.a('helgaftnar', 'holiday eves')}.</p>`,
  },
});
