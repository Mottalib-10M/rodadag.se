/** Röda dagar 2028 : année riche (8 röda dagar en semaine), trois klämdagar, jul lundi-mardi, année bissextile. Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, rd, lista, rodaVardagar, arbets, opt, wdLong, vecka, type Lang } from '../_lib';

const Y = 2028;
const vard = rodaVardagar(Y);
const kl = K.klamdagar(Y, { aftnar: true });
const at = arbets(Y), at27 = arbets(Y - 1);
const p10 = opt(Y, 10);
const fler = vard.length - rodaVardagar(Y - 1).length;
const majJuni = (y: number) => rodaVardagar(y).filter((f) => f.date.slice(5, 7) === '05' || f.date.slice(5, 7) === '06').length;
const jul = K.broar(Y, { aftnar: true }).find((b) => b.semFran.startsWith(`${Y}-12`))!;
const klList = (l: Lang) => lista(kl.map((b) => dWeek(b.semFran, l)), l);
const helg = (l: Lang) => lista(K.helgdagar(Y).filter((f) => K.isWeekend(K.fromIso(f.date)) && !['paskdagen', 'pingstdagen', 'midsommardagen', 'alla-helgons-dag'].includes(f.id)).map((f) => f.name[l].toLowerCase()), l);

export default defineGuide({
  id: 'roda-dagar-2028', group: 'roda', order: 12, tool: 'rd', toolArg: { ar: Y },
  related: ['klamdagar-2028', 'kalender-2028', 'roda-dagar-2027', 'helgdagar'],
  sources: ['helgdagslag', 'semesterlag', 'pask-ptb'],
  sv: {
    slug: 'roda-dagar-2028', nav: 'Röda dagar 2028', card: 'Åtta röda vardagar och tre klämdagar',
    title: 'Röda dagar 2028: åtta lediga vardagar och tre klämdagar',
    description: `Röda dagar 2028: alla helgdagar med datum, veckodag och vecka. ${vard.length} infaller på vardagar, nationaldagen blir en tisdag och juldagarna en måndag och tisdag.`,
    h1: 'Röda dagar 2028',
    intro: `Efter ett magert ${Y - 1} blir ${Y} ett av decenniets bästa år: ${vard.length} röda dagar infaller måndag till fredag.`,
    resume: `${Y} har ${vard.length} röda dagar på vardagar, ${fler} fler än året innan. Trettondedag jul är en torsdag, påskdagen infaller den ${dLong(K.paskdagen(Y), 'sv')}, första maj är en måndag, Kristi himmelsfärdsdag den ${dLong(rd('kristi-himmelsfard', Y), 'sv')} och nationaldagen en tisdag. I december faller juldagen på en måndag och annandag jul på en tisdag, medan julafton och nyårsafton blir söndagar. Det ger tre äkta klämdagar, där en semesterdag ger fyra lediga dagar i rad: ${klList('sv')}. Med tio semesterdagar väl placerade blir det ${p10.ledig} lediga dagar. ${Y} är också ett skottår med 366 dagar, och den 29 februari är en ${wdLong(`${Y}-02-29`, 'sv')}. Antalet arbetsdagar blir ${n(at, 'sv')}, ${at27 - at} färre än ${Y - 1}. Av de fasta helgdagarna är det bara nyårsdagen som hamnar på en helg.`,
    faqs: [
      { q: 'Vilka klämdagar finns 2028?', a: `Tre: ${klList('sv')}. Den första följer på trettondedag jul, den andra på Kristi himmelsfärdsdag och den tredje ligger mellan pingstdagen och nationaldagen. Varje klämdag ger fyra lediga dagar för en semesterdag. Planeraren för ${Y} visar också längre broar kring påsk och jul.` },
      { q: 'Hur blir julen 2028?', a: `Julafton infaller på en söndag, juldagen på måndagen och annandag jul på tisdagen. Från lördagen den 23 december blir det fyra lediga dagar utan semester. Tre semesterdagar, ${dLong(jul.semFran, 'sv')} till ${dLong(jul.semTill, 'sv')}, förlänger ledigheten till ${jul.ledig} dagar, eftersom nyårsafton blir en söndag och nyårsdagen ${Y + 1} en måndag.` },
      { q: 'Vilka röda dagar 2028 hamnar på en helg?', a: `Förutom de fyra dagar som alltid infaller på lördag eller söndag är det bara ${helg('sv')} som hamnar på en helg ${Y}. Det är ovanligt få, och därför har året så många lediga vardagar. Julafton och nyårsafton på söndagar ger däremot ingen extra ledighet.` },
      { q: 'Är 2028 ett skottår?', a: `Ja. Årtal som är delbara med fyra är skottår i den gregorianska kalendern, utom sekelskiften som inte är delbara med 400. Februari ${Y} har 29 dagar och året 366. Skottdagen är en ${wdLong(`${Y}-02-29`, 'sv')} i vecka ${vecka(`${Y}-02-29`)} och räknas som en vanlig arbetsdag.` },
    ],
    body: (h) => `<h2>Våren ${Y}: tre långhelger på sex veckor</h2>
<p>Påsken ligger mitt i april. Långfredagen den ${dLong(rd('langfredagen', Y), 'sv')} och annandag påsk tre dagar senare ger en fyradagarshelg, och första maj på måndagen två veckor senare ger nästa. Kristi himmelsfärdsdag följer den ${dLong(rd('kristi-himmelsfard', Y), 'sv')} med klämdag på fredagen. Pingstdagen den ${dLong(rd('pingstdagen', Y), 'sv')} är en söndag, men eftersom nationaldagen är tisdagen efter blir måndagen den 5 juni en klämdag mellan två lediga dagar.</p>
${h.mini('nd', { p: ['ar'], d: { ar: Y }, c: 'Nationaldagen andra år' })}
<h2>Sommar och höst</h2>
<p>Midsommarafton är fredagen den ${dLong(K.midsommarafton(Y), 'sv')}, och veckan före ger nio lediga dagar för fyra semesterdagar. Alla helgons dag är som alltid en lördag, ${Y} den ${dLong(K.allaHelgonsDag(Y), 'sv')}. Mellan midsommar och jul finns inga röda vardagar alls, vilket är normalt i Sverige: höstens enda helgdag, alla helgons dag, ligger enligt lagen alltid på en lördag. Den som vill sprida ledigheten över hösten får därför använda vanliga semesterdagar, och skolornas höstlov i vecka 44 ger ingen ledighet för vuxna.</p>
<h2>Jämfört med ${Y - 1}</h2>
<p>${Y - 1} hade bara fem röda vardagar och ${n(at27, 'sv')} arbetsdagar. ${Y} har ${vard.length} och ${n(at, 'sv')}. Skillnaden syns tydligast i maj och juni, som ${Y} innehåller ${majJuni(Y)} röda vardagar mot ${majJuni(Y - 1)} året innan. Det gör ${Y} till ett bra år för att sprida ut korta ledigheter under våren i stället för att spara allt till sommaren. Se ${h.a('roda-dagar-2027', 'röda dagar 2027')} och planeraren för ${h.a('klamdagar-2028', 'klämdagar 2028')}.</p>
<p>Datumen räknas ur ${h.src('helgdagslag', 'lagen om allmänna helgdagar')}, och påsken med ${h.src('pask-ptb', 'Gauss påskformel')}. Att julafton och nyårsafton på söndagar inte ger någon ersättningsdag följer av att lagen saknar regler om att flytta helgdagar. Kollektivavtal kan ge annat, men det är i så fall avtalets regel och inget som gäller alla anställda.</p>`,
  },
  en: {
    slug: 'public-holidays-2028', nav: 'Public holidays 2028', card: 'Eight weekday holidays and three bridge days',
    title: 'Public Holidays 2028 in Sweden: Eight Weekday Days Off',
    description: `Swedish public holidays 2028 with date and weekday. ${vard.length} fall on weekdays, National Day is a Tuesday and Christmas Day and Boxing Day fall on Monday and Tuesday.`,
    h1: 'Swedish public holidays 2028',
    intro: `After a lean ${Y - 1}, ${Y} is one of the decade's best years: ${vard.length} holidays fall Monday to Friday.`,
    resume: `${Y} has ${vard.length} public holidays on weekdays, ${fler} more than the year before. Epiphany is a Thursday, Easter Sunday falls on ${dLong(K.paskdagen(Y), 'en')}, May Day is a Monday, Ascension Day is ${dLong(rd('kristi-himmelsfard', Y), 'en')} and National Day a Tuesday. In December Christmas Day is a Monday and Boxing Day a Tuesday, while Christmas Eve and New Year's Eve are Sundays. That makes three true bridge days, where one leave day gives four days off in a row: ${klList('en')}. Ten leave days in the right places give ${p10.ledig} days off. ${Y} is also a leap year with 366 days, and 29 February is a ${wdLong(`${Y}-02-29`, 'en')}. The year has ${n(at, 'en')} working days, ${at27 - at} fewer than ${Y - 1}. Of the fixed-date holidays only New Year's Day falls on a Saturday.`,
    faqs: [
      { q: 'What are the bridge days in Sweden in 2028?', a: `Three: ${klList('en')}. The first follows Epiphany, the second Ascension Day, and the third sits between Whit Sunday and National Day. Each gives four days off for one leave day. The ${Y} planner also shows longer bridges around Easter and Christmas.` },
      { q: 'How does Christmas 2028 fall in Sweden?', a: `Christmas Eve is a Sunday, Christmas Day a Monday and Boxing Day a Tuesday. From Saturday 23 December you get four days off without leave. Three leave days, ${dLong(jul.semFran, 'en')} to ${dLong(jul.semTill, 'en')}, stretch that to ${jul.ledig} days, since New Year's Eve is a Sunday and New Year's Day ${Y + 1} a Monday.` },
      { q: 'Which 2028 holidays fall at a weekend?', a: `Apart from the four that are always on a Saturday or Sunday, only ${helg('en')} lands at a weekend in ${Y}. That is unusually few, which is why the year has so many weekday holidays. Christmas Eve and New Year's Eve on Sundays bring no extra time off.` },
      { q: 'Is 2028 a leap year?', a: `Yes. Years divisible by four are leap years in the Gregorian calendar, except century years not divisible by 400. February ${Y} has 29 days and the year 366. The leap day is a ${wdLong(`${Y}-02-29`, 'en')} in week ${vecka(`${Y}-02-29`)} and is an ordinary working day.` },
    ],
    body: (h) => `<h2>Spring ${Y}: three long weekends in six weeks</h2>
<p>Easter falls in mid-April. Good Friday on ${dLong(rd('langfredagen', Y), 'en')} and Easter Monday three days later make a four-day weekend, and May Day on the Monday two weeks after brings the next. Ascension Day follows on ${dLong(rd('kristi-himmelsfard', Y), 'en')} with a bridge day on the Friday. Whit Sunday, ${dLong(rd('pingstdagen', Y), 'en')}, is a Sunday, but because National Day is the Tuesday after, Monday 5 June becomes a bridge day between two days off.</p>
${h.mini('nd', { p: ['ar'], d: { ar: Y }, c: 'National Day in other years' })}
<h2>Summer and autumn</h2>
<p>Midsummer Eve is Friday ${dLong(K.midsommarafton(Y), 'en')}, and the week before it gives nine days off for four leave days. All Saints' Day is a Saturday as always, in ${Y} ${dLong(K.allaHelgonsDag(Y), 'en')}. Between Midsummer and Christmas there is no weekday holiday at all, which is normal in Sweden: autumn's only holiday, All Saints' Day, always falls on a Saturday by law. Anyone who wants time off in autumn has to use ordinary leave, and the school autumn break in week 44 gives adults nothing.</p>
<h2>Compared with ${Y - 1}</h2>
<p>${Y - 1} had only five weekday holidays and ${n(at27, 'en')} working days. ${Y} has ${vard.length} and ${n(at, 'en')}. The difference is clearest in May and June, which in ${Y} hold ${majJuni(Y)} weekday holidays against ${majJuni(Y - 1)} the year before. That makes ${Y} a good year for spreading short breaks over the spring instead of saving everything for summer. See ${h.a('roda-dagar-2027', 'public holidays 2027')} and the planner for ${h.a('klamdagar-2028', 'bridge days 2028')}.</p>
<p>The dates come from the ${h.src('helgdagslag', 'Public Holidays Act')}, and Easter from ${h.src('pask-ptb', "Gauss's Easter formula")}. That Christmas Eve and New Year's Eve on Sundays bring no substitute day follows from the law having no rule for moving holidays. A collective agreement may say otherwise, but that is the agreement's rule and does not apply to every employee.</p>`,
  },
});
