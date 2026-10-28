/** Klämdagar 2028 : année riche (8 röda dagar en semaine, 3 klämdagar). Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, rd, opt, arbets, rodaVardagar, span, wdLong, lista, type Lang } from '../_lib';

const Y = 2028;
const O = { aftnar: true };
const kl = K.klamdagar(Y, O);
const br = K.broar(Y, O);
const vard = rodaVardagar(Y);
const p5 = opt(Y, 5), p10 = opt(Y, 10), p15 = opt(Y, 15), p10_27 = opt(Y - 1, 10);
const at = arbets(Y), at27 = arbets(Y - 1);
const jul = br.find((b) => b.semFran.startsWith(`${Y}-12-2`))!;
const paskFore = br.find((b) => b.semTill === K.plusDays(rd('langfredagen', Y), -1))!;
const paskEfter = br.find((b) => b.semFran === K.plusDays(rd('annandag-pask', Y), 1))!;
const mid = br.find((b) => b.semTill === K.plusDays(K.midsommarafton(Y), -1))!;
const klList = (l: Lang) => lista(kl.map((b) => dWeek(b.semFran, l)), l);
const vRows = (l: Lang) => vard.map((f) => [f.name[l], dLong(f.date, l), wdLong(f.date, l)]);
const blockRows = (l: Lang) => p10.block.map((b) => [span(b.semFran, b.semTill, l), b.sem, span(b.ledigFran, b.ledigTill, l), b.ledig]);

export default defineGuide({
  id: 'klamdagar-2028', group: 'verktyg', order: 3, tool: 'bt', toolArg: { ar: Y, sem: 10 },
  related: ['home', 'roda-dagar-2028', 'kalender-2028', 'semesterdagar'],
  sources: ['helgdagslag', 'semesterlag'],
  sv: {
    slug: 'klamdagar-2028', nav: 'Klämdagar 2028', card: 'Tre klämdagar och långa broar 2028',
    title: 'Klämdagar 2028: tre äkta klämdagar och tio dagar påsk',
    description: 'Klämdagar 2028: åtta röda dagar på vardagar ger tre äkta klämdagar och långa broar kring påsk och jul. Planera semestern redan nu med datum och veckodagar.',
    h1: 'Klämdagar 2028',
    intro: `${Y} är ett generöst år: ${vard.length} röda dagar infaller på en vardag, och tio semesterdagar kan ge ${p10.ledig} dagar ledigt.`,
    resume: `Efter ett snålt ${Y - 1} vänder kalendern. ${Y} har ${vard.length} röda dagar på vardagar, och ${kl.length} av dem skapar äkta klämdagar där en enda semesterdag ger fyra lediga dagar: ${klList('sv')}. Första maj infaller på en måndag och ger en långhelg utan semester, och nationaldagen på en tisdag gör måndagen före till klämdag. Juldagen och annandag jul är måndag och tisdag, medan julafton och nyårsafton hamnar på söndagar. Fem semesterdagar rätt placerade ger ${p5.ledig} lediga dagar, tio dagar ger ${p10.ledig} och femton ger ${p15.ledig}. Det kan jämföras med ${p10_27.ledig} dagar för tio semesterdagar ${Y - 1}. ${Y} är dessutom skottår med 366 dagar, men antalet arbetsdagar blir ${n(at, 'sv')}, två färre än året innan, eftersom fler röda dagar hamnar mitt i veckan.`,
    faqs: [
      { q: 'Vilka är klämdagarna 2028?', a: `Det finns ${kl.length} äkta klämdagar ${Y}: ${klList('sv')}. Den första följer på trettondedag jul en torsdag, den andra på Kristi himmelsfärdsdag och den tredje ligger mellan helgen och nationaldagen på tisdagen. Var och en ger fyra lediga dagar i rad för en semesterdag.` },
      { q: 'Hur lång blir påskledigheten 2028?', a: `Långfredagen är den ${dLong(rd('langfredagen', Y), 'sv')} och annandag påsk den ${dLong(rd('annandag-pask', Y), 'sv')}. Fyra semesterdagar före påsk ger ledigt från ${dLong(paskFore.ledigFran, 'sv')} till annandagen, ${paskFore.ledig} dagar. Lägger du fyra dagar till efter påsk blir det sexton dagar i följd för åtta semesterdagar.` },
      { q: 'Vad händer med julen 2028?', a: `Julafton och nyårsafton är söndagar, så aftnarna ger ingen extra ledighet. Juldagen och annandag jul är måndag och tisdag. ${jul.sem} semesterdagar, ${dLong(jul.semFran, 'sv')} till ${dLong(jul.semTill, 'sv')}, ger ledigt från lördagen den ${dLong(jul.ledigFran, 'sv')} till nyårsdagen, ${jul.ledig} dagar.` },
      { q: 'Är det lönt att planera semestern för 2028 redan nu?', a: 'Ja, särskilt för klämdagarna i maj och juni, som många vill ha. Arbetsgivaren bestämmer när semestern läggs ut, men den som frågar tidigt har lättare att få sina önskemål. Enligt semesterlagen ska beslutet meddelas senast två månader före ledigheten, om inget annat har avtalats.' },
    ],
    body: (h) => `<h2>Röda dagar på vardagar ${Y}</h2>
<p>Klämdagar uppstår bara när en röd dag hamnar på tisdag eller torsdag, och långhelger när den hamnar på måndag eller fredag. ${Y} har ovanligt många sådana dagar. Datumen följer av ${h.src('helgdagslag', 'lagen om allmänna helgdagar')}; ingen av dem flyttas om den skulle falla på en helg.</p>
${h.table(['Röd dag', 'Datum', 'Veckodag'], vRows('sv'), `Röda dagar måndag till fredag ${Y}`)}
<p>Fyra helgdagar ligger alltid på helgen enligt lagen: påskdagen och pingstdagen på söndagar, midsommardagen och alla helgons dag på lördagar. ${Y} hamnar dessutom nyårsdagen på en lördag.</p>
<h2>Tio semesterdagar ${Y}: den bästa planen</h2>
<p>Planeraren väljer den fördelning som ger flest lediga dagar. Med tio dagar ser den ut så här:</p>
${h.table(['Semester', 'Dagar', 'Ledigt', 'Dagar i rad'], blockRows('sv'), `Tio semesterdagar ${Y}`, ['l', 'r', 'l', 'r'])}
<p>Påsken, som infaller i mitten av april, är årets bästa vecka. Midsommarafton är fredagen den ${dLong(K.midsommarafton(Y), 'sv')}, och ${mid.sem} semesterdagar före den ger ${mid.ledig} lediga dagar som start på sommaren. Sommarsemestern i övrigt följer ${h.src('semesterlag', 'semesterlagens')} huvudregel om fyra veckor i följd under juni till augusti.</p>
${h.mini('sd', { p: ['man', 'dag', 'langd'], d: { ar: Y, man: 6, dag: 17, langd: 30 }, c: 'Räkna semesterdagarna för sommaren 2028' })}
<h2>${Y} jämfört med ${Y - 1}</h2>
<p>${Y - 1} har bara en klämdag och ${n(at27, 'sv')} arbetsdagar, så skillnaden märks redan i januari. Den som har sparade semesterdagar kan vinna på att vänta: samma tio dagar ger ${p10.ledig - p10_27.ledig} lediga dagar mer ${Y}. Se planen för det kommande året under ${h.a('home', 'klämdagar 2027')} och alla datum under ${h.a('roda-dagar-2028', 'röda dagar 2028')}.</p>`,
  },
  en: {
    slug: 'bridge-days-2028', nav: 'Bridge days 2028', card: 'Three bridge days and long breaks in 2028',
    title: 'Bridge Days 2028 in Sweden: Three Klämdagar and Easter',
    description: 'Bridge days 2028 in Sweden: eight weekday holidays create three true bridge days and long breaks around Easter and Christmas. Plan your leave with exact dates.',
    h1: 'Bridge days in Sweden 2028',
    intro: `${Y} is a generous year: ${vard.length} public holidays fall on a weekday, and ten leave days can give ${p10.ledig} days off.`,
    resume: `After a meagre ${Y - 1}, the calendar turns in your favour. ${Y} has ${vard.length} public holidays on weekdays, and ${kl.length} of them create true bridge days where a single leave day gives four days off: ${klList('en')}. May Day falls on a Monday, giving a long weekend at no cost, and National Day on a Tuesday turns the Monday before it into a bridge day. Christmas Day and Boxing Day are a Monday and Tuesday, while Christmas Eve and New Year's Eve land on Sundays. Five well-placed leave days give ${p5.ledig} days off, ten give ${p10.ledig} and fifteen give ${p15.ledig}, against ${p10_27.ledig} days for ten leave days in ${Y - 1}. ${Y} is also a leap year with 366 days, yet it has ${n(at, 'en')} working days, two fewer than the year before, because more holidays fall midweek.`,
    faqs: [
      { q: 'What are the Swedish bridge days in 2028?', a: `There are ${kl.length} true bridge days in ${Y}: ${klList('en')}. The first follows Epiphany on a Thursday, the second follows Ascension Day, and the third sits between the weekend and National Day on the Tuesday. Each one gives four consecutive days off for one leave day.` },
      { q: 'How long can the Easter break be in 2028?', a: `Good Friday is ${dLong(rd('langfredagen', Y), 'en')} and Easter Monday ${dLong(rd('annandag-pask', Y), 'en')}. Four leave days before Easter give you ${dLong(paskFore.ledigFran, 'en')} to Easter Monday off, ${paskFore.ledig} days. Add four days after Easter and you get sixteen days in a row for eight leave days.` },
      { q: 'Which leave days bridge Christmas 2028?', a: `Christmas Eve and New Year's Eve are Sundays, so the eves add nothing. Christmas Day and Boxing Day are Monday and Tuesday. ${jul.sem} leave days, ${dLong(jul.semFran, 'en')} to ${dLong(jul.semTill, 'en')}, give you Saturday ${dLong(jul.ledigFran, 'en')} to New Year's Day off, ${jul.ledig} days.` },
      { q: 'Is it worth planning leave for 2028 already?', a: 'Yes, especially for the bridge days in May and June, which many colleagues will want. The employer decides when leave is taken, but early requests are easier to grant. Under the Annual Leave Act the decision must be given at least two months before the leave starts.' },
    ],
    body: (h) => `<h2>Weekday holidays in ${Y}</h2>
<p>Bridge days only appear when a holiday falls on a Tuesday or Thursday, and long weekends when it falls on a Monday or Friday. ${Y} has an unusual number of these. The dates follow from the ${h.src('helgdagslag', 'Public Holidays Act')}, and none of them moves if it lands at a weekend.</p>
${h.table(['Holiday', 'Date', 'Weekday'], vRows('en'), `Public holidays Monday to Friday, ${Y}`)}
<p>Four holidays always fall at the weekend under the law: Easter Sunday and Whit Sunday on Sundays, Midsummer Day and All Saints' Day on Saturdays. In ${Y}, New Year's Day lands on a Saturday too.</p>
<h2>Ten leave days in ${Y}: the best plan</h2>
<p>The planner picks the split that gives the most days off. With ten days it looks like this:</p>
${h.table(['Leave', 'Days', 'Off', 'Days in a row'], blockRows('en'), `Ten leave days, ${Y}`, ['l', 'r', 'l', 'r'])}
<p>Easter, in mid-April, is the best week of the year. Midsummer Eve is Friday ${dLong(K.midsommarafton(Y), 'en')}, and ${mid.sem} leave days before it give ${mid.ledig} days off to start the summer. The rest of the summer holiday follows the ${h.src('semesterlag', 'Annual Leave Act')} rule of four consecutive weeks between June and August.</p>
${h.mini('sd', { p: ['man', 'dag', 'langd'], d: { ar: Y, man: 6, dag: 17, langd: 30 }, c: 'Count leave days for summer 2028' })}
<h2>${Y} compared with ${Y - 1}</h2>
<p>${Y - 1} has a single bridge day and ${n(at27, 'en')} working days, so the difference shows from January. If you have saved leave, waiting pays: the same ten days give ${p10.ledig - p10_27.ledig} more days off in ${Y}. See the plan for the coming year on ${h.a('home', 'bridge days 2027')} and every date on ${h.a('roda-dagar-2028', 'public holidays 2028')}.</p>`,
  },
});
