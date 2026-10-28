/** Veckonummer : semaine du jour (build), règle ISO 8601, années à 53 semaines, tableau des semaines 2027. Moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dShort, n, type Lang } from '../_lib';

const D = K.LASDATUM;
const nu = K.isoVecka(D);
const Y = 2027;
const lang53 = Array.from({ length: 15 }, (_, i) => 2026 + i).filter((y) => K.veckorIAret(y) === 53);
const nyar27 = K.isoVecka(`${Y}-01-01`), nyar28 = K.isoVecka(`${Y + 1}-01-01`);
const v1_27 = K.mandagIVecka(Y, 1), v1_28 = K.mandagIVecka(Y + 1, 1);
const hel = [...K.helgdagar(Y, { aftnar: true }), ...K.helgdagar(Y + 1, { aftnar: true })];
const rows = (l: Lang) => Array.from({ length: K.veckorIAret(Y) }, (_, i) => {
  const ma = K.mandagIVecka(Y, i + 1), so = K.plusDays(ma, 6);
  const r = hel.filter((f) => f.date >= ma && f.date <= so).map((f) => f.name[l]).join(', ');
  return [i + 1, `${dShort(ma, l)} – ${dShort(so, l)}`, r || '–'];
});
const vk = (iso: string) => K.isoVecka(iso).week;

export default defineGuide({
  id: 'vecka', group: 'verktyg', order: 7, tool: 'kw', toolArg: { ar: nu.year, v: nu.week },
  related: ['kalender-2027', 'arbetsdagar-2027', 'sportlov-2027', 'roda-dagar-2027'],
  sources: ['helgdagslag', 'skolforordning'],
  sv: {
    slug: 'vecka', nav: 'Veckonummer', card: 'Vilken vecka det är och alla veckor 2027',
    title: 'Veckonummer: vilken vecka det är och alla veckor 2027',
    description: `Veckonummer enligt ISO 8601: välj år och vecka och se datum, röda dagar och arbetsdagar. Med alla ${K.veckorIAret(Y)} veckor ${Y} och förklaringen till att ${nu.year} har ${K.veckorIAret(nu.year)} veckor.`,
    h1: 'Veckonummer',
    intro: `När sidan byggdes, den ${dLong(D, 'sv')}, var det vecka ${nu.week}. Välj ett annat år och en annan vecka för att se vilka datum den omfattar.`,
    resume: `I Sverige räknas veckor enligt den internationella standarden ISO 8601: veckan börjar på måndag, och vecka 1 är den vecka som innehåller årets första torsdag. Det betyder att de första dagarna i januari ibland hör till förra årets sista vecka. Nyårsdagen ${Y} ligger i vecka ${nyar27.week} ${nyar27.year}, och vecka 1 ${Y} börjar först måndagen den ${dLong(v1_27, 'sv')}. På samma sätt hör nyårsdagen ${Y + 1} till vecka ${nyar28.week} ${nyar28.year}. De flesta år har 52 veckor, men ett år som börjar på en torsdag, eller ett skottår som börjar på en onsdag, får 53. ${nu.year} är ett sådant år med ${K.veckorIAret(nu.year)} veckor, och nästa gång det händer är ${lang53.filter((y) => y > nu.year)[0]}. Veckonummer används flitigt i Sverige: sportlov, höstlov, leveranser och scheman anges ofta bara som en vecka, till exempel höstlov vecka 44.`,
    faqs: [
      { q: 'När börjar vecka 1 år 2027?', a: `Vecka 1 ${Y} börjar måndagen den ${dLong(v1_27, 'sv')}. Dagarna 1 till 3 januari hör till vecka ${nyar27.week} ${nyar27.year}, eftersom årets första torsdag är den 7 januari och vecka 1 är den vecka som innehåller den. Veckorna löper sedan till och med vecka ${K.veckorIAret(Y)}.` },
      { q: 'Varför har 2026 53 veckor?', a: `ISO 8601 ger ett år 53 veckor när det börjar på en torsdag, eller när ett skottår börjar på en onsdag. 2026 började på en torsdag, så vecka 53 löper från den ${dLong(K.mandagIVecka(2026, 53), 'sv')} till den 3 januari 2027. Bland åren fram till 2040 gäller det också ${lang53.filter((y) => y > 2026).join(' och ')}.` },
      { q: 'Vilken vecka är midsommar 2027?', a: `Midsommarafton, fredagen den ${dLong(K.midsommarafton(Y), 'sv')}, ligger i vecka ${vk(K.midsommarafton(Y))}. Midsommar hamnar alltid i vecka 25 eller 26, eftersom midsommardagen är lördagen mellan 20 och 26 juni. Julafton ${Y} ligger i vecka ${vk(`${Y}-12-24`)} och påskdagen i vecka ${vk(K.paskdagen(Y))}, samma vecka som långfredagen.` },
      { q: 'Börjar veckan på måndag eller söndag i Sverige?', a: 'På måndag. Både ISO 8601 och svensk praxis räknar måndag som veckans första dag och söndag som den sista. I amerikanska kalendrar börjar veckan ofta på söndag och veckonumren räknas på ett annat sätt, så en amerikansk app kan visa ett annat veckonummer än en svensk.' },
    ],
    body: (h) => `<h2>Alla veckor ${Y}</h2>
<p>Tabellen visar varje vecka ${Y} med måndag och söndag och de röda dagar och aftnar som infaller den veckan. Röda dagar räknas ut enligt ${h.src('helgdagslag', 'lagen om allmänna helgdagar')}.</p>
${h.table(['Vecka', 'Datum', 'Röda dagar och aftnar'], rows('sv'), `Veckor ${Y} enligt ISO 8601`, ['r', 'l', 'l'])}
<h2>Veckonummer och skollov</h2>
<p>Många kommuner anger loven som veckonummer. Höstlovet ligger nästan alltid i vecka 44, och sportlovet sprids ut över veckorna 7 till 10 så att inte hela landet åker till fjällen samtidigt. ${h.src('skolforordning', 'Skolförordningen')} reglerar inte vilken vecka loven ska ligga, så det är kommunens beslut. Se datumen på ${h.a('sportlov-2027', 'sportlov 2027')}.</p>
${h.mini('at', { p: ['ar'], d: { ar: Y }, c: 'Räkna arbetsdagar för ett år' })}
<h2>Så räknas vecka 1</h2>
<p>Regeln om första torsdagen är detsamma som att vecka 1 är den första vecka där minst fyra dagar ligger i det nya året. Ett annat sätt att se det: den 4 januari ligger alltid i vecka 1, och den 28 december alltid i årets sista vecka. Därför kan veckonumret för ett datum i början av januari eller slutet av december höra till grannåret, och veckoåret skiljer sig då från kalenderåret.</p>
<p>${Y + 1} börjar vecka 1 måndagen den ${dLong(v1_28, 'sv')}. Antalet arbetsdagar per vecka varierar med de röda dagarna; vecka ${vk(K.paskdagen(Y))} ${Y} har till exempel bara ${n([0, 1, 2, 3, 4].filter((i) => K.arVardag(K.plusDays(K.mandagIVecka(Y, vk(K.paskdagen(Y))), i))).length, 'sv')} arbetsdagar på grund av långfredagen.</p>`,
  },
  en: {
    slug: 'week-number', nav: 'Week number', card: 'What week it is and every week of 2027',
    title: 'Week Number in Sweden: Current Week and All Weeks 2027',
    description: `Week numbers in Sweden follow ISO 8601: pick a year and week to see its dates, holidays and working days. With all ${K.veckorIAret(Y)} weeks of ${Y} and why ${nu.year} has ${K.veckorIAret(nu.year)} weeks.`,
    h1: 'Week numbers in Sweden',
    intro: `When this page was built, on ${dLong(D, 'en')}, it was week ${nu.week}. Choose another year and week to see which dates it covers.`,
    resume: `Sweden numbers its weeks under the international standard ISO 8601: weeks start on Monday, and week 1 is the week containing the year's first Thursday. So the first days of January sometimes belong to the last week of the previous year. New Year's Day ${Y} falls in week ${nyar27.week} of ${nyar27.year}, and week 1 of ${Y} only starts on Monday ${dLong(v1_27, 'en')}. Likewise, New Year's Day ${Y + 1} belongs to week ${nyar28.week} of ${nyar28.year}. Most years have 52 weeks, but a year starting on a Thursday, or a leap year starting on a Wednesday, gets 53. ${nu.year} is such a year with ${K.veckorIAret(nu.year)} weeks, and the next one is ${lang53.filter((y) => y > nu.year)[0]}. Swedes use week numbers constantly: winter sports breaks, autumn breaks, deliveries and rotas are often given as a week only, as in autumn break week 44.`,
    faqs: [
      { q: 'When does week 1 of 2027 start?', a: `Week 1 of ${Y} starts on Monday ${dLong(v1_27, 'en')}. The days from 1 to 3 January belong to week ${nyar27.week} of ${nyar27.year}, because the year's first Thursday is 7 January and week 1 is the week that contains it. The weeks then run up to week ${K.veckorIAret(Y)}.` },
      { q: 'Why does 2026 have 53 weeks?', a: `ISO 8601 gives a year 53 weeks when it starts on a Thursday, or when a leap year starts on a Wednesday. 2026 started on a Thursday, so week 53 runs from ${dLong(K.mandagIVecka(2026, 53), 'en')} to 3 January 2027. Among the years up to 2040, the same applies to ${lang53.filter((y) => y > 2026).join(' and ')}.` },
      { q: 'Which week is Midsummer 2027 in Sweden?', a: `Midsummer Eve, Friday ${dLong(K.midsommarafton(Y), 'en')}, is in week ${vk(K.midsommarafton(Y))}. Midsummer always lands in week 25 or 26, since Midsummer Day is the Saturday between 20 and 26 June. Christmas Eve ${Y} is in week ${vk(`${Y}-12-24`)} and Easter Sunday in week ${vk(K.paskdagen(Y))}.` },
      { q: 'Does the week start on Monday or Sunday in Sweden?', a: 'On Monday. ISO 8601 and Swedish practice both treat Monday as the first day of the week and Sunday as the last. American calendars often start the week on Sunday and number weeks differently, so a US app can show a different week number from a Swedish one.' },
    ],
    body: (h) => `<h2>Every week of ${Y}</h2>
<p>The table lists each week of ${Y} with its Monday and Sunday and any holidays and eves that fall in it. Holidays are worked out under the ${h.src('helgdagslag', 'Public Holidays Act')}.</p>
${h.table(['Week', 'Dates', 'Holidays and eves'], rows('en'), `Weeks of ${Y} under ISO 8601`, ['r', 'l', 'l'])}
<h2>Week numbers and school breaks</h2>
<p>Many municipalities give their school breaks as week numbers. The autumn break is nearly always week 44, and the winter sports break is spread over weeks 7 to 10 so the whole country does not head for the mountains at once. The ${h.src('skolforordning', 'Education Ordinance')} does not say which week breaks fall in, so it is the municipality's decision. See the dates on ${h.a('sportlov-2027', 'sports break 2027')}.</p>
${h.mini('at', { p: ['ar'], d: { ar: Y }, c: 'Count the working days in a year' })}
<h2>How week 1 is counted</h2>
<p>The first-Thursday rule is the same as saying week 1 is the first week with at least four days in the new year. Put another way, 4 January is always in week 1 and 28 December always in the last week of the year. So the week of a date in early January or late December may belong to the neighbouring year, and the week year then differs from the calendar year.</p>
<p>In ${Y + 1}, week 1 starts on Monday ${dLong(v1_28, 'en')}. The number of working days per week varies with the holidays; week ${vk(K.paskdagen(Y))} of ${Y}, for instance, has only ${n([0, 1, 2, 3, 4].filter((i) => K.arVardag(K.plusDays(K.mandagIVecka(Y, vk(K.paskdagen(Y))), i))).length, 'en')} working days because of Good Friday.</p>`,
  },
});
