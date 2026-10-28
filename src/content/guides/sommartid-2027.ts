/** Sommartid 2027 : 28 mars (nuit de Pâques) au 31 octobre, förordning (2001:127). Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, n, plus, vecka } from '../_lib';
import { sommartid } from '../../lib/tool-specs';

const Y = 2027;
const z = sommartid(Y), z26 = sommartid(Y - 1), z28 = sommartid(Y + 1);
const dagar = K.fromIso(z.slut) - K.fromIso(z.start);
const paskSamma = z.start === K.paskdagen(Y);
const hostlovStart = K.KOMMUNER.find((k) => k.hostlov2027)?.hostlov2027?.[0];

export default defineGuide({
  id: 'sommartid-2027', group: 'hogtider', order: 24, tool: 'zu', toolArg: { ar: Y },
  related: ['pask-2027', 'vecka', 'alla-helgons-dag-2026', 'kalender-2027'],
  sources: ['sommartid', 'helgdagslag'],
  sv: {
    slug: 'sommartid-2027', nav: 'Sommartid 2027', card: 'När klockan ställs fram och tillbaka 2027',
    title: 'Sommartid 2027: klockan fram 28 mars och tillbaka 31 oktober',
    description: 'Sommartid 2027 börjar natten till söndagen den 28 mars, som är påskdagen, och slutar söndagen den 31 oktober. Klockslag, regeln i förordningen och kommande år.',
    h1: 'Sommartid 2027',
    intro: `Sommartiden ${Y} börjar söndagen den ${dLong(z.start, 'sv')} och slutar söndagen den ${dLong(z.slut, 'sv')}.`,
    resume: `I Sverige ställs klockan fram en timme natten till söndagen den ${dLong(z.start, 'sv')}: klockan 02:00 blir den 03:00. ${paskSamma ? 'Det sammanfaller med påskdagen, så natten mellan påskafton och påskdagen blir en timme kortare. ' : ''}Sommartiden slutar söndagen den ${dLong(z.slut, 'sv')}, när klockan 03:00 ställs tillbaka till 02:00 och natten blir en timme längre. Det ger ${n(dagar, 'sv')} dagar med sommartid ${Y}. Reglerna står i förordningen (2001:127) om sommartid: sommartiden börjar sista söndagen i mars och slutar sista söndagen i oktober. Under sommartid ligger svensk tid två timmar före UTC, annars en timme. ${Y - 1} slutade sommartiden den ${dLong(z26.slut, 'sv')}, och ${Y + 1} börjar den den ${dLong(z28.start, 'sv')}. Datorer och telefoner ställer om automatiskt, men äldre klockor, ugnar och bilar behöver ofta ställas om för hand.`,
    faqs: [
      { q: 'När börjar sommartiden 2027?', a: `Natten till söndagen den ${dLong(z.start, 'sv')}. Klockan 02:00 ställs fram till 03:00, så du förlorar en timmes sömn. Förordningen om sommartid säger att sommartiden börjar sista söndagen i mars, och omställningen sker samtidigt i hela landet. Telefoner och datorer ställer om sig själva. ${paskSamma ? `${Y} är det också påskdagen.` : ''}` },
      { q: 'När ställs klockan tillbaka hösten 2027?', a: `Natten till söndagen den ${dLong(z.slut, 'sv')}. Klockan 03:00 sommartid ställs tillbaka till 02:00, och natten blir en timme längre. Det är sista söndagen i oktober, ${Y} i vecka ${vecka(z.slut)}. Därefter gäller normaltid, en timme före UTC, fram till sista söndagen i mars ${Y + 1}.` },
      { q: 'Hur kommer man ihåg åt vilket håll klockan ställs?', a: 'På våren ställs klockan fram och på hösten tillbaka. Ett vanligt minnesstöd är att man ställer ut trädgårdsmöblerna på våren, alltså fram, och tar tillbaka in dem på hösten. Vår omställning innebär en timme mindre sömn, höstens en timme mer.' },
    ],
    body: (h) => `<h2>Regeln i förordningen</h2>
<p>${h.src('sommartid', 'Förordningen (2001:127) om sommartid')} anger att sommartid gäller från klockan 02:00 normaltid sista söndagen i mars till klockan 03:00 sommartid sista söndagen i oktober. Under den perioden ligger svensk tid två timmar före koordinerad universell tid, UTC. Resten av året gäller normaltid, en timme före UTC. Verktyget ovan räknar datumen för valfritt år, och tabellen visar de kommande åren.</p>
<p>Eftersom regeln bygger på sista söndagen i månaden flyttar sig datumen mellan 25 och 31 mars respektive 25 och 31 oktober. ${Y} hamnar höstens omställning på den sista möjliga dagen, den ${dLong(z.slut, 'sv')}, och sommartiden blir därför ${n(dagar, 'sv')} dagar lång${dagar > K.fromIso(z26.slut) - K.fromIso(z26.start) ? `, en vecka längre än ${Y - 1}` : ''}.</p>
<h2>Påsk och sommartid samma natt</h2>
<p>${paskSamma ? `${Y} sammanfaller vårens omställning med påskdagen enligt ${h.src('helgdagslag', 'lagen om allmänna helgdagar')}. Natten mellan påskafton och påskdagen blir därför en timme kortare. För den som arbetar natt kan det spela roll: ett nattpass den natten är en timme kortare än vanligt.` : `${Y} sammanfaller inte omställningen med påsken.`} Påskens övriga datum finns under ${h.a('pask-2027', 'påsk 2027')}.</p>
<p>På hösten ställs klockan tillbaka natten till ${dLong(z.slut, 'sv')}${hostlovStart ? `, dagen innan höstlovet börjar i de kommuner som har publicerat det, den ${dLong(hostlovStart, 'sv')}` : ''}. Nattpass som pågår över omställningen blir då en timme längre.</p>
${h.mini('kw', { p: ['v'], d: { ar: Y, v: vecka(z.start) }, c: 'Se vilka datum en vecka omfattar' })}
<h2>Praktiskt vid omställningen</h2>
<p>Mobiltelefoner, datorer och de flesta uppkopplade klockor ställer om sig själva. Klockor i bilar, ugnar, mikrovågsugnar och äldre väckarklockor behöver ofta ställas om för hand. Tidtabeller i kollektivtrafiken följer den nya tiden från omställningen. Kontrollera gärna tider för nattliga avgångar den natten. Veckonumren påverkas inte, eftersom omställningen alltid sker en söndag; vecka ${vecka(z.start)} och vecka ${vecka(z.slut)} är vanliga veckor i kalendern för ${h.a('kalender-2027', 'år 2027')}.</p>`,
  },
  en: {
    slug: 'summer-time-2027', nav: 'Summer time 2027', card: 'When the clocks go forward and back in 2027',
    title: 'Summer Time 2027 in Sweden: Clocks Change 28 March, 31 Oct',
    description: 'Summer time 2027 in Sweden starts in the night to Sunday 28 March, which is Easter Sunday, and ends on Sunday 31 October. Times, the legal rule, next years.',
    h1: 'Summer time 2027 in Sweden',
    intro: `Summer time ${Y} in Sweden starts on Sunday ${dLong(z.start, 'en')} and ends on Sunday ${dLong(z.slut, 'en')}.`,
    resume: `In Sweden the clocks go forward one hour in the night to Sunday ${dLong(z.start, 'en')}: 02:00 becomes 03:00. ${paskSamma ? 'That is Easter Sunday, so the night between Holy Saturday and Easter Sunday is an hour shorter. ' : ''}Summer time ends on Sunday ${dLong(z.slut, 'en')}, when 03:00 goes back to 02:00 and the night is an hour longer. That gives ${n(dagar, 'en')} days of summer time in ${Y}. The rules are in the Summer Time Ordinance (2001:127): summer time starts on the last Sunday in March and ends on the last Sunday in October. During summer time Swedish time is two hours ahead of UTC, otherwise one hour. In ${Y - 1} summer time ended on ${dLong(z26.slut, 'en')}, and in ${Y + 1} it starts on ${dLong(z28.start, 'en')}. Computers and phones change automatically, but older clocks, ovens and cars often need changing by hand.`,
    faqs: [
      { q: 'When does summer time start in Sweden in 2027?', a: `In the night to Sunday ${dLong(z.start, 'en')}. At 02:00 the clocks go forward to 03:00, so you lose an hour of sleep. The Summer Time Ordinance says summer time starts on the last Sunday in March, and the change happens at the same moment across the country. Phones and computers adjust by themselves. ${paskSamma ? `In ${Y} that is also Easter Sunday.` : ''}` },
      { q: 'When do the clocks go back in Sweden in autumn 2027?', a: `In the night to Sunday ${dLong(z.slut, 'en')}. At 03:00 summer time the clocks go back to 02:00, and the night is an hour longer. It is the last Sunday in October, in week ${vecka(z.slut)} of ${Y}. Standard time, one hour ahead of UTC, then applies until the last Sunday in March ${Y + 1}.` },
      { q: 'How do you remember which way the clocks go?', a: 'In spring the clocks go forward and in autumn they go back. The English saying is spring forward, fall back. The spring change means an hour less sleep, the autumn change an hour more, and in both cases the change happens in the small hours of a Sunday morning.' },
    ],
    body: (h) => `<h2>The rule in the ordinance</h2>
<p>The ${h.src('sommartid', 'Summer Time Ordinance (2001:127)')} says summer time runs from 02:00 standard time on the last Sunday in March to 03:00 summer time on the last Sunday in October. During that period Swedish time is two hours ahead of Coordinated Universal Time, UTC. The rest of the year standard time applies, one hour ahead of UTC. The tool above works out the dates for any year, and the table shows the coming years.</p>
<p>Because the rule uses the last Sunday of the month, the dates move between 25 and 31 March and between 25 and 31 October. In ${Y} the autumn change falls on the latest possible day, ${dLong(z.slut, 'en')}, so summer time lasts ${n(dagar, 'en')} days${dagar > K.fromIso(z26.slut) - K.fromIso(z26.start) ? `, a week longer than in ${Y - 1}` : ''}.</p>
<h2>Easter and summer time on the same night</h2>
<p>${paskSamma ? `In ${Y} the spring change coincides with Easter Sunday under the ${h.src('helgdagslag', 'Public Holidays Act')}. The night between Holy Saturday and Easter Sunday is therefore an hour shorter. For night workers that matters: a night shift that night is an hour shorter than usual.` : `In ${Y} the change does not coincide with Easter.`} The other Easter dates are on ${h.a('pask-2027', 'Easter 2027')}.</p>
<p>In autumn the clocks go back in the night to ${dLong(z.slut, 'en')}${hostlovStart ? `, the day before the autumn school break starts on ${dLong(hostlovStart, 'en')} in the municipalities that have published it` : ''}. Night shifts spanning the change are then an hour longer.</p>
${h.mini('kw', { p: ['v'], d: { ar: Y, v: vecka(z.start) }, c: 'See the dates a week covers' })}
<h2>Practical points</h2>
<p>Mobile phones, computers and most connected clocks change by themselves. Clocks in cars, ovens, microwaves and older alarm clocks often need changing by hand. Public transport timetables follow the new time from the change. Week numbers are unaffected, since the change always happens on a Sunday; weeks ${vecka(z.start)} and ${vecka(z.slut)} are ordinary weeks in the ${h.a('kalender-2027', '2027 calendar')}.</p>`,
  },
});
