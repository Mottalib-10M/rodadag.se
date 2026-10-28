/** Arbetsdagar 2027 : par mois, trimestre, semestre ; heures à 8 h ; comparaison 2026/2028. Chiffres : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, n, arbets, lista, type Lang } from '../_lib';

const Y = 2027;
const m = K.arbetsdagar(Y, { aftnar: true });
const mNo = K.arbetsdagar(Y, {});
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
const at = sum(m), atNo = sum(mNo), brutto = K.vardagarMaFr(Y);
const at26 = arbets(Y - 1), at28 = arbets(Y + 1);
const h1 = sum(m.slice(0, 6)), h2 = sum(m.slice(6));
const kv = [0, 3, 6, 9].map((i) => sum(m.slice(i, i + 3)));
const MAN = (l: Lang) => Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(Y, i, 15)).toLocaleDateString(l === 'sv' ? 'sv-SE' : 'en-GB', { month: 'long', timeZone: 'UTC' }));
const minI = m.indexOf(Math.min(...m)), maxV = Math.max(...m);
const maxI = m.map((x, i) => (x === maxV ? i : -1)).filter((i) => i >= 0);
const rows = (l: Lang) => MAN(l).map((mn, i) => [mn, m[i], mNo[i], m[i] * 8]);

export default defineGuide({
  id: 'arbetsdagar-2027', group: 'verktyg', order: 4, tool: 'at', toolArg: { ar: Y },
  related: ['home', 'roda-dagar-2027', 'vecka', 'kalender-2027'],
  sources: ['helgdagslag', 'semesterlag', 'arbetstidslag'],
  sv: {
    slug: 'arbetsdagar-2027', nav: 'Arbetsdagar 2027', card: 'Arbetsdagar och arbetstimmar per månad',
    title: 'Arbetsdagar 2027: antal per månad, kvartal och halvår',
    description: `Arbetsdagar 2027: ${at} dagar när röda dagar och de tre stora aftnarna är lediga. Se fördelningen per månad, kvartal och halvår med arbetstimmar à åtta timmar.`,
    h1: 'Arbetsdagar 2027',
    intro: `${Y} har ${n(brutto, 'sv')} vardagar från måndag till fredag. När röda dagar och aftnar dras av återstår ${n(at, 'sv')} arbetsdagar.`,
    resume: `Ett arbetsår består av årets måndagar till fredagar minus de röda dagar som infaller på dem. ${Y} har ${n(brutto, 'sv')} sådana vardagar, och fem röda dagar plus midsommarafton, julafton och nyårsafton, som alla är fredagar, faller bort. Kvar blir ${n(at, 'sv')} arbetsdagar, eller ${n(atNo, 'sv')} för den som arbetar på aftnarna. Det är fler än ${Y - 1} (${n(at26, 'sv')}) och ${Y + 1} (${n(at28, 'sv')}), eftersom första maj, nationaldagen och juldagarna hamnar på helger. Första halvåret har ${n(h1, 'sv')} arbetsdagar och andra halvåret ${n(h2, 'sv')}. Kortast är ${MAN('sv')[minI]} med ${m[minI]} dagar, längst är ${lista(maxI.map((i) => MAN('sv')[i]), 'sv')} med ${maxV} dagar vardera. Räknat med åtta timmar per dag blir ${Y} ${n(at * 8, 'sv')} arbetstimmar, före semester. Semester, sjukdom och kompledighet ingår inte; dra av dem för att få din egen arbetstid.`,
    faqs: [
      { q: 'Hur många arbetsdagar har 2027?', a: `${n(at, 'sv')} om midsommarafton, julafton och nyårsafton är lediga, annars ${n(atNo, 'sv')}. Siffran bygger på en femdagarsvecka måndag till fredag och drar bara av de röda dagarna och aftnarna. Din semester, normalt minst ${K.P.semester.dagar} dagar, tillkommer som avdrag, liksom eventuella klämdagar som arbetsgivaren ger ledigt.` },
      { q: 'Hur många arbetstimmar blir det 2027?', a: `Med åtta timmar per arbetsdag blir det ${n(at * 8, 'sv')} timmar. Arbetstidslagen tillåter högst 40 timmars ordinarie arbetstid i veckan i genomsnitt, men många kollektivavtal har kortare arbetstid, till exempel 38,25 eller 37 timmar. Multiplicera då arbetsdagarna med din dagliga arbetstid.` },
      { q: 'Vilken månad 2027 har minst arbetsdagar?', a: `${MAN('sv')[minI][0].toUpperCase() + MAN('sv')[minI].slice(1)}, med ${m[minI]} arbetsdagar. Nyårsdagen och trettondedag jul är röda dagar på fredag och onsdag. Februari och maj följer med ${m[1]} dagar vardera: februari för att månaden bara har fyra veckor, maj för att Kristi himmelsfärdsdag tar en torsdag. Helger och röda dagar räknas som noll.` },
      { q: 'Räknas aftnarna som arbetsdagar 2027?', a: `Enligt lagen är midsommarafton, julafton och nyårsafton vanliga vardagar, men de flesta kollektivavtal och arbetsplatser ger ledigt. Därför visar sidan båda talen. Semesterlagen jämställer aftnarna med söndag, så de kostar aldrig någon semesterdag.  är alla tre fredagar, vilket gör skillnaden till tre dagar.` },
    ],
    body: (h) => `<h2>Arbetsdagar per månad ${Y}</h2>
<p>Tabellen visar arbetsdagarna i varje månad med aftnarna lediga och med aftnarna som arbetsdagar, samt arbetstimmar räknat på åtta timmar per dag. Röda dagar räknas ut enligt ${h.src('helgdagslag', 'lagen om allmänna helgdagar')}.</p>
${h.table(['Månad', 'Arbetsdagar', 'Om aftnarna arbetas', 'Timmar à 8 tim'], rows('sv'), `Arbetsdagar ${Y}`, ['l', 'r', 'r', 'r'])}
<h2>Kvartal och halvår</h2>
<p>Första kvartalet har ${kv[0]} arbetsdagar, andra ${kv[1]}, tredje ${kv[2]} och fjärde ${kv[3]}. Tredje kvartalet är längst eftersom sommaren saknar röda dagar på vardagar ${Y}: nationaldagen är en söndag och midsommarafton är den enda lediga dagen i juni. Den som räknar ut lön, fakturerbar tid eller produktionsplaner per kvartal har nytta av den fördelningen.</p>
${h.mini('kw', { p: ['v'], d: { ar: Y, v: 26 }, c: 'Se vilka datum en vecka 2027 omfattar' })}
<h2>Arbetstid och lagen</h2>
<p>${h.src('arbetstidslag', 'Arbetstidslagen')} sätter taket för ordinarie arbetstid till 40 timmar i veckan, i genomsnitt över en period på högst fyra veckor. Lagen säger däremot inget om att röda dagar ska vara lediga; det följer av kollektivavtal och anställningsavtal. I praktiken är röda dagar lediga för de flesta med kontorstider, medan vård, handel och transport arbetar enligt schema med OB-tillägg.</p>
<p>Vill du veta hur många dagar du själv arbetar ${Y}, dra av din semester från talet ovan. Med lagens ${K.P.semester.dagar} semesterdagar blir det ${n(at - K.P.semester.dagar, 'sv')} dagar. Hur semesterdagar räknas när ledigheten går över röda dagar står under ${h.a('semesterdagar', 'semesterdagar')}, enligt ${h.src('semesterlag', 'semesterlagen')}.</p>
<p>Jämförelse: ${Y - 1} har ${n(at26, 'sv')} arbetsdagar och ${Y + 1} har ${n(at28, 'sv')}. Skillnaden beror helt på vilka veckodagar de röda dagarna hamnar på, eftersom alla tre åren har samma tretton helgdagar.</p>`,
  },
  en: {
    slug: 'working-days-2027', nav: 'Working days 2027', card: 'Working days and hours per month',
    title: 'Working Days 2027 in Sweden: per Month, Quarter, Half',
    description: `Working days 2027 in Sweden: ${at} when public holidays and the three main eves are off. See the split by month, quarter and half year, with hours at eight a day.`,
    h1: 'Working days in Sweden 2027',
    intro: `${Y} has ${n(brutto, 'en')} weekdays from Monday to Friday. Take away holidays and eves and ${n(at, 'en')} working days remain.`,
    resume: `A working year is the year's Mondays to Fridays minus the public holidays that fall on them. ${Y} has ${n(brutto, 'en')} such weekdays, and five holidays plus Midsummer Eve, Christmas Eve and New Year's Eve, all Fridays, drop out. That leaves ${n(at, 'en')} working days, or ${n(atNo, 'en')} if you work on the eves. That is more than ${Y - 1} (${n(at26, 'en')}) and ${Y + 1} (${n(at28, 'en')}), because May Day, National Day and the Christmas holidays fall at weekends. The first half of the year has ${n(h1, 'en')} working days and the second ${n(h2, 'en')}. The shortest month is ${MAN('en')[minI]} with ${m[minI]} days, the longest are ${lista(maxI.map((i) => MAN('en')[i]), 'en')} with ${maxV} each. At eight hours a day, ${Y} comes to ${n(at * 8, 'en')} working hours before leave. Annual leave, sickness and time off in lieu are not included; subtract them to get your own working time.`,
    faqs: [
      { q: 'How many working days are there in Sweden in 2027?', a: `${n(at, 'en')} if Midsummer Eve, Christmas Eve and New Year's Eve are off, otherwise ${n(atNo, 'en')}. The figure assumes a Monday to Friday week and only removes holidays and eves. Your own annual leave, normally at least ${K.P.semester.dagar} days, comes off on top.` },
      { q: 'How many working hours does 2027 have?', a: `At eight hours per working day, ${n(at * 8, 'en')} hours. The Working Hours Act allows at most 40 hours of ordinary working time a week on average, but many collective agreements set shorter hours, such as 38.25 or 37 a week. Multiply the working days by your own daily hours in that case.` },
      { q: 'Which month of 2027 has the fewest working days?', a: `${MAN('en')[minI]}, with ${m[minI]} working days. New Year's Day and Epiphany are holidays on a Friday and a Wednesday. February and May follow with ${m[1]} days each: February because the month has only four weeks, May because Ascension Day takes a Thursday. Weekends and holidays count as zero.` },
      { q: 'Do the eves count as working days in 2027?', a: 'In law, Midsummer Eve, Christmas Eve and New Year\'s Eve are ordinary weekdays, but most collective agreements and workplaces give them off. That is why this page shows both figures. The Annual Leave Act treats the eves like Sundays, so they never cost a leave day.' },
    ],
    body: (h) => `<h2>Working days per month in ${Y}</h2>
<p>The table shows the working days in each month with the eves off and with the eves worked, plus working hours at eight hours a day. Holidays are worked out under the ${h.src('helgdagslag', 'Public Holidays Act')}.</p>
${h.table(['Month', 'Working days', 'If eves are worked', 'Hours at 8 h'], rows('en'), `Working days ${Y}`, ['l', 'r', 'r', 'r'])}
<h2>Quarters and halves</h2>
<p>The first quarter has ${kv[0]} working days, the second ${kv[1]}, the third ${kv[2]} and the fourth ${kv[3]}. The third quarter is the longest because summer ${Y} has no weekday holidays: National Day is a Sunday and Midsummer Eve is the only day off in June. Anyone working out pay, billable time or production plans by quarter can use this split.</p>
${h.mini('kw', { p: ['v'], d: { ar: Y, v: 26 }, c: 'See the dates of any week in 2027' })}
<h2>Working time and the law</h2>
<p>The ${h.src('arbetstidslag', 'Working Hours Act')} caps ordinary working time at 40 hours a week, averaged over a period of up to four weeks. It says nothing about holidays being days off; that comes from collective agreements and employment contracts. In practice holidays are off for most office workers, while healthcare, retail and transport work rotas with unsocial-hours pay.</p>
<p>To find how many days you will actually work in ${Y}, subtract your leave from the figure above. With the legal ${K.P.semester.dagar} leave days that gives ${n(at - K.P.semester.dagar, 'en')} days. How leave is counted when it spans holidays is explained on ${h.a('semesterdagar', 'annual leave days')}, under the ${h.src('semesterlag', 'Annual Leave Act')}.</p>
<p>For comparison, ${Y - 1} has ${n(at26, 'en')} working days and ${Y + 1} has ${n(at28, 'en')}. The difference comes entirely from the weekdays the holidays land on, since all three years have the same thirteen holidays.</p>`,
  },
});
