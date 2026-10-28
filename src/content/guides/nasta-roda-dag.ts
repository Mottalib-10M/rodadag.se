/** Nästa röda dag : compte à rebours (composant Nasta), liste depuis le jour du build, écarts entre röda dagar. Moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, rd, type Lang } from '../_lib';

const D = K.LASDATUM;
const Y = Number(D.slice(0, 4)) + 1;
const fram = K.nasta(D, {}, 6);
const framAf = K.nasta(D, { aftnar: true }, 1)[0];
const dagarTill = (iso: string) => K.fromIso(iso) - K.fromIso(D);
// Längsta uppehåll mellan två röda dagar år Y (alla 13 helgdagar, söndagar oräknade).
const lista13 = K.helgdagar(Y);
const gap = lista13.slice(1).map((f, i) => ({ fran: lista13[i], till: f, d: K.fromIso(f.date) - K.fromIso(lista13[i].date) })).sort((a, b) => b.d - a.d)[0];
// Längsta period utan röd dag på en vardag (över årsskiftet till nästa års första).
const vard = [...K.paVardag(lista13), K.paVardag(K.helgdagar(Y + 1))[0]];
const gapV = vard.slice(1).map((f, i) => ({ fran: vard[i], till: f, d: K.fromIso(f.date) - K.fromIso(vard[i].date) })).sort((a, b) => b.d - a.d)[0];
const rows = (l: Lang) => fram.map((f) => [f.name[l], dWeek(f.date, l), dagarTill(f.date)]);

export default defineGuide({
  id: 'nasta-roda-dag', group: 'verktyg', order: 6, tool: 'nasta',
  related: ['roda-dagar-2027', 'jul-2026', 'helgaftnar', 'kalender-2027'],
  sources: ['helgdagslag', 'semesterlag'],
  sv: {
    slug: 'nasta-roda-dag', nav: 'Nästa röda dag', card: 'Nedräkning till nästa helgdag',
    title: 'Nästa röda dag: nedräkning och de kommande helgdagarna',
    description: 'Nästa röda dag i Sverige med nedräkning i dagar, timmar och minuter, och listan över de kommande helgdagarna och aftnarna med veckodag. Uppdateras av sig själv.',
    h1: 'Nästa röda dag',
    intro: 'Nedräkningen går med din enhets klocka och slår om vid midnatt svensk tid. Välj om midsommar-, jul- och nyårsafton ska räknas med.',
    resume: `Räknat från den ${dLong(D, 'sv')}, då sidan senast byggdes, är nästa röda dag ${fram[0].name.sv.toLowerCase()} ${dWeek(fram[0].date, 'sv')}, om ${dagarTill(fram[0].date)} dagar. Räknar du aftnarna är det ${framAf.name.sv.toLowerCase()}. Därefter följer ${fram.slice(1, 4).map((f) => `${f.name.sv.toLowerCase()} den ${dLong(f.date, 'sv')}`).join(', ')}. Nedräkningen ovan uppdateras med din klocka, så den stämmer även när den här texten har några veckor på nacken. Röda dagar är de ${K.HELGDAGAR.length} allmänna helgdagarna i lagen om allmänna helgdagar, plus alla söndagar. Midsommarafton, julafton och nyårsafton är inga röda dagar enligt lagen, men räknas inte som semesterdagar och är lediga för de flesta. Det längsta uppehållet mellan två röda dagar ${Y} är ${gap.d} dagar, från ${gap.fran.name.sv.toLowerCase()} till ${gap.till.name.sv.toLowerCase()}.`,
    faqs: [
      { q: 'Vilken är nästa röda dag efter alla helgons dag?', a: `Efter alla helgons dag kommer inga röda dagar förrän i julhelgen. Juldagen den 25 december och annandag jul den 26 december är de nästa, och julafton före dem är ledig för de flesta men ingen helgdag. Perioden mellan midsommar och alla helgons dag har inga röda dagar alls utöver söndagarna.` },
      { q: 'Räknas söndagar som röda dagar?', a: 'Ja. Lagen om allmänna helgdagar räknar alla söndagar som allmänna helgdagar, och i kalendern är de tryckta i rött. Nedräkningen här visar ändå bara de namngivna helgdagarna och aftnarna, eftersom en vanlig söndag kommer varje vecka och inte ger någon extra ledighet.' },
      { q: 'När slår nedräkningen till nästa helgdag om?', a: 'Vid midnatt svensk tid, oavsett var du befinner dig. Sidan räknar med tidszonen Europe/Stockholm, inklusive sommartid, och din enhet räknar om resten. Är din klocka fel visas också nedräkningen fel, eftersom ingenting hämtas från en server och inget skickas någonstans.' },
      { q: 'Hur långt är det längsta uppehållet utan röd dag?', a: `${Y} går det ${gap.d} dagar mellan ${gap.fran.name.sv.toLowerCase()} den ${dLong(gap.fran.date, 'sv')} och ${gap.till.name.sv.toLowerCase()} den ${dLong(gap.till.date, 'sv')}. Räknar man bara röda dagar på vardagar är uppehållet ännu längre: ${gapV.d} dagar mellan ${dLong(gapV.fran.date, 'sv')} och ${dLong(gapV.till.date, 'sv')}.` },
    ],
    body: (h) => `<h2>De kommande röda dagarna</h2>
<p>Listan räknas från den dag sidan byggdes, ${dLong(D, 'sv')}. Nedräkningen ovan följer i stället din klocka och visar alltid rätt dag.</p>
${h.table(['Röd dag', 'Datum', 'Dagar kvar'], rows('sv'), `Kommande röda dagar från ${dLong(D, 'sv')}`, ['l', 'l', 'r'])}
<h2>Hur röda dagar sprider sig över året</h2>
<p>De röda dagarna klumpar ihop sig. Från nyår till trettondedagen, kring påsk och i maj och juni ligger de tätt, medan sommaren och hösten är nästan tomma. Det beror på att de flesta helgdagarna är kyrkliga högtider som följer påsken, och på att ${h.src('helgdagslag', 'lagen om allmänna helgdagar')} placerar midsommardagen och alla helgons dag på lördagar. Ingen röd dag flyttas när den hamnar på en helg.</p>
<p>${Y} är det längsta glappet mellan två röda dagar på vardagar ${gapV.d} dagar, från ${gapV.fran.name.sv.toLowerCase()} den ${dLong(gapV.fran.date, 'sv')} till ${gapV.till.name.sv.toLowerCase()} den ${dLong(gapV.till.date, 'sv')}. Under den tiden är semestern och höstlovet det enda som bryter arbetsveckorna.</p>
${h.mini('rd', { p: ['ar'], d: { ar: Y }, c: 'Se alla röda dagar för ett år' })}
<h2>Aftnarna i nedräkningen</h2>
<p>Midsommarafton, julafton och nyårsafton räknas inte som semesterdagar enligt ${h.src('semesterlag', '3 a § semesterlagen')}, och de flesta har dem lediga genom kollektivavtal. Därför är de med som standard. Arbetar du dem, stäng av valet så hoppar nedräkningen över dem. Andra aftnar, som valborgsmässoafton och påskafton, är vanliga dagar och finns beskrivna på sidan om ${h.a('helgaftnar', 'helgaftnar')}.</p>
<h2>Varför firandet ligger på aftonen</h2>
<p>I Sverige firas de stora högtiderna ofta dagen före den röda dagen. Julklapparna delas ut på julafton, midsommarstången reses på midsommarafton och nyåret firas på nyårsafton. Själva helgdagen blir då en vilodag. Därför räknar många nedräkningen till aftonen snarare än till helgdagen, och därför finns valet ovan. Till ${h.a('jul-2026', 'julafton')} och midsommarafton finns också egna sidor med nedräkning.</p>`,
  },
  en: {
    slug: 'next-public-holiday', nav: 'Next public holiday', card: 'Countdown to the next holiday',
    title: 'Next Public Holiday in Sweden: Countdown and Coming Days',
    description: 'The next Swedish public holiday with a countdown in days, hours and minutes, plus a list of upcoming holidays and eves with their weekdays. It updates itself.',
    h1: 'Next public holiday in Sweden',
    intro: 'The countdown runs on your device clock and turns over at midnight Swedish time. Choose whether Midsummer, Christmas and New Year\'s Eve count.',
    resume: `Counted from ${dLong(D, 'en')}, when this page was last built, the next public holiday is ${fram[0].name.en} on ${dWeek(fram[0].date, 'en')}, ${dagarTill(fram[0].date)} days away. Counting the eves, it is ${framAf.name.en}. After that come ${fram.slice(1, 4).map((f) => `${f.name.en} on ${dLong(f.date, 'en')}`).join(', ')}. The countdown above updates with your clock, so it stays right even when this text is a few weeks old. Swedish public holidays, röda dagar, are the ${K.HELGDAGAR.length} named holidays in the Public Holidays Act plus every Sunday. Midsummer Eve, Christmas Eve and New Year's Eve are not holidays in law, but they never count as leave days and most people have them off. The longest gap between two holidays in ${Y} is ${gap.d} days, from ${gap.fran.name.en} to ${gap.till.name.en}.`,
    faqs: [
      { q: 'What is the next holiday after All Saints\' Day in Sweden?', a: 'After All Saints\' Day there are no public holidays until Christmas. Christmas Day on 25 December and Boxing Day on 26 December come next, and Christmas Eve before them is a day off for most people but not a holiday. The months between Midsummer and All Saints\' Day have no holidays at all apart from Sundays.' },
      { q: 'Are Sundays public holidays in Sweden?', a: 'Yes. The Public Holidays Act counts every Sunday as a public holiday, and calendars print them in red. The countdown here still shows only the named holidays and eves, because an ordinary Sunday comes every week and brings no extra time off.' },
      { q: 'When does the holiday countdown turn over?', a: 'At midnight Swedish time, wherever you are. The page uses the Europe/Stockholm time zone, summer time included, and your device converts the rest. If your clock is wrong the countdown will be too, since nothing is fetched from a server and nothing is sent anywhere.' },
      { q: 'How long is the longest stretch without a Swedish holiday?', a: `In ${Y} there are ${gap.d} days between ${gap.fran.name.en} on ${dLong(gap.fran.date, 'en')} and ${gap.till.name.en} on ${dLong(gap.till.date, 'en')}. Counting only holidays on weekdays, the gap is longer still: ${gapV.d} days between ${dLong(gapV.fran.date, 'en')} and ${dLong(gapV.till.date, 'en')}.` },
    ],
    body: (h) => `<h2>The coming public holidays</h2>
<p>The list counts from the day the page was built, ${dLong(D, 'en')}. The countdown above follows your clock instead and always shows the right day.</p>
${h.table(['Holiday', 'Date', 'Days to go'], rows('en'), `Upcoming holidays from ${dLong(D, 'en')}`, ['l', 'l', 'r'])}
<h2>How holidays spread across the year</h2>
<p>Swedish holidays cluster. They are packed from New Year to Epiphany, around Easter and in May and June, while summer and autumn are almost empty. Most holidays are church feasts tied to Easter, and the ${h.src('helgdagslag', 'Public Holidays Act')} puts Midsummer Day and All Saints' Day on Saturdays. No holiday moves when it falls at a weekend.</p>
<p>In ${Y} the longest gap between two weekday holidays is ${gapV.d} days, from ${gapV.fran.name.en} on ${dLong(gapV.fran.date, 'en')} to ${gapV.till.name.en} on ${dLong(gapV.till.date, 'en')}. In that time only summer leave and the autumn school break interrupt the working weeks.</p>
${h.mini('rd', { p: ['ar'], d: { ar: Y }, c: 'See every holiday of a year' })}
<h2>The eves in the countdown</h2>
<p>Midsummer Eve, Christmas Eve and New Year's Eve do not count as leave days under ${h.src('semesterlag', 'section 3a of the Annual Leave Act')}, and most people have them off through collective agreements. So they are included by default. If you work them, switch the option off and the countdown skips them. Other eves, such as Walpurgis Night and Holy Saturday, are ordinary days and are described on ${h.a('helgaftnar', 'holiday eves')}.</p>
<h2>Why Swedes celebrate on the eve</h2>
<p>In Sweden the big feasts are often celebrated the day before the holiday itself. Presents are opened on Christmas Eve, the maypole goes up on Midsummer Eve and the New Year is seen in on New Year's Eve. The holiday proper then becomes a day of rest. That is why many people count down to the eve rather than the holiday, and why the option above exists. ${h.a('jul-2026', 'Christmas Eve')} and Midsummer Eve also have their own countdown pages.</p>`,
  },
});
