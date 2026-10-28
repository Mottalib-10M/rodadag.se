/** Röda dagar 2026 : bilan de l'année et ce qui reste après la mi-octobre (julen). Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, n, rd, lista, rodaVardagar, arbets, wdLong, vecka, type Lang } from '../_lib';

const Y = 2026;
const vard = rodaVardagar(Y);
const kl = K.klamdagar(Y, { aftnar: true });
const at = arbets(Y);
const veckor = K.veckorIAret(Y);
const pa = (l: Lang) => lista(vard.map((f) => `${f.name[l].toLowerCase()} (${wdLong(f.date, l)})`), l);
// Mellandagarna : de vardagar mellan annandag jul och nyårsafton.
const mellan = ['2026-12-28', '2026-12-29', '2026-12-30'];
const jul = K.broar(Y, { aftnar: true }).find((b) => b.semFran === mellan[0])!;

export default defineGuide({
  id: 'roda-dagar-2026', group: 'roda', order: 10, tool: 'rd', toolArg: { ar: Y },
  related: ['roda-dagar-2027', 'jul-2026', 'klamdagar-2026', 'kalender-2027'],
  sources: ['helgdagslag', 'semesterlag', 'lagstadgadtid'],
  sv: {
    slug: 'roda-dagar-2026', nav: 'Röda dagar 2026', card: 'Årets helgdagar och vad som återstår till nyår',
    title: 'Röda dagar 2026: helgdagar, aftnar och vad som återstår',
    description: `Röda dagar 2026 med datum, veckodag och vecka. ${vard.length} helgdagar föll på vardagar, och kvar av året är julen, med juldagen på fredag och nyårsafton på torsdag.`,
    h1: 'Röda dagar 2026',
    intro: `${Y} är ett generöst år: ${vard.length} av de ${K.HELGDAGAR.length} helgdagarna infaller måndag till fredag, och julen ger en lång ledighet på slutet.`,
    resume: `Av årets ${K.HELGDAGAR.length} allmänna helgdagar hamnar ${vard.length} på en vardag ${Y}: ${pa('sv')}. Nationaldagen, midsommardagen och alla helgons dag ligger på lördagar och annandag jul också, så de ger ingen extra ledighet. Alla helgons dag infaller den ${dLong(K.allaHelgonsDag(Y), 'sv')}, och sedan återstår bara julen. Julafton och nyårsafton är torsdagar och juldagen en fredag. Den som tar ut ${jul.sem} semesterdagar, ${dLong(mellan[0], 'sv')} till ${dLong(mellan[2], 'sv')}, är ledig ${jul.ledig} dagar i rad från julafton till ${wdLong(jul.ledigTill, 'sv')}en den ${dLong(jul.ledigTill, 'sv')}. Året har ${n(at, 'sv')} arbetsdagar när röda dagar och de tre aftnarna räknas bort, och ${veckor} veckor enligt ISO, eftersom det börjar på en torsdag. Klämdagarna var ${kl.length}: den 2 januari, den 5 januari och fredagen efter Kristi himmelsfärd.`,
    faqs: [
      { q: 'Vilka röda dagar återstår 2026?', a: `Efter alla helgons dag den ${dLong(K.allaHelgonsDag(Y), 'sv')}, som är en lördag, återstår juldagen och annandag jul. Juldagen är en fredag och annandag jul en lördag. Julafton den 24 december och nyårsafton den 31 december är torsdagar; de är inga helgdagar men kostar ingen semesterdag. Nyårsdagen ${Y + 1} infaller på en fredag.` },
      { q: 'Hur många arbetsdagar har 2026?', a: `${n(at, 'sv')} dagar, om man räknar måndag till fredag och drar av både de röda dagarna och midsommar-, jul- och nyårsafton. Räknar man aftnarna som arbetsdagar blir det ${n(K.arbetsdagar(Y).reduce((a, b) => a + b, 0), 'sv')}. Antalet per månad finns i kalendern för respektive år och i arbetsdagsräknaren.` },
      { q: 'Varför har 2026 vecka 53?', a: `Enligt ISO 8601, som Sverige använder, är vecka 1 den vecka som innehåller årets första torsdag. ${Y} börjar på en torsdag, och då får året ${veckor} veckor. Vecka 53 löper från måndagen den 28 december ${Y} till söndagen den 3 januari ${Y + 1}, alltså över nyårshelgen.` },
      { q: 'Är annandag jul 2026 en ledig dag?', a: `Annandag jul är en allmän helgdag, men ${Y} infaller den på en lördag. Svensk lag flyttar inte en helgdag som hamnar på en helg, så det blir ingen ledig måndag efter jul. Juldagen på fredagen ger däremot en långhelg från julafton till söndag för den som är ledig på julafton.` },
    ],
    body: (h) => `<h2>Året som gått: ${vard.length} röda vardagar</h2>
<p>Med ${vard.length} röda dagar på vardagar hör ${Y} till de bättre åren. Nyårsdagen på en torsdag gjorde fredagen den 2 januari till klämdag, och trettondedag jul på en tisdag gjorde detsamma med måndagen den 5 januari. Påskdagen föll den ${dLong(K.paskdagen(Y), 'sv')}, och första maj blev en fredag med långhelg. Kristi himmelsfärdsdag den ${dLong(rd('kristi-himmelsfard', Y), 'sv')} gav årets tredje klämdag. Sommaren saknade däremot röda vardagar: nationaldagen och midsommardagen var båda lördagar.</p>
${h.mini('jul', { p: ['ar'], d: { ar: Y }, c: 'Se julhelgen för ett annat år' })}
<h2>Julen ${Y} vecka för vecka</h2>
<p>Julafton infaller i vecka ${vecka(`${Y}-12-24`)}, och veckan efter är vecka ${vecka(`${Y}-12-28`)}, den sällsynta 53:e veckan. Mellandagarna måndag till onsdag är de enda arbetsdagarna mellan julafton och nyårsdagen. Enligt ${h.src('semesterlag', '3 a § semesterlagen')} kostar julafton och nyårsafton ingen semesterdag, så tre semesterdagar räcker för elva dagar borta. Den som också arbetar på aftnarna får räkna med fem. Vården, handeln och kollektivtrafiken har ofta egna scheman, och där avgör kollektivavtalet om aftnarna ger ersättning eller ledighet.</p>
<p>Myndighetsfrister påverkas också. En frist som löper ut på julafton, juldagen, annandag jul eller nyårsafton får enligt ${h.src('lagstadgadtid', 'lagen om beräkning av lagstadgad tid')} hanteras nästa vardag. Fristen som slutar den 24 december ${Y} flyttas därför till måndagen den 28 december. Räkna ut din egen frist på sidan ${h.a('tidsfrist', 'tidsfrister')}.</p>
<h2>Från ${Y} till ${Y + 1}</h2>
<p>Nästa år blir snålare med ledighet: bara ${rodaVardagar(Y + 1).length} röda dagar infaller på vardagar ${Y + 1}, och första maj, nationaldagen och juldagarna hamnar på helger. Hela listan med veckodagar finns på sidan ${h.a('roda-dagar-2027', 'röda dagar 2027')}, och planeraren på ${h.a('home', 'klämdagar 2027')} visar var semesterdagarna gör mest nytta. Helgdagarna räknas ur ${h.src('helgdagslag', 'lagen om allmänna helgdagar')}; inget datum är inskrivet för hand.</p>`,
  },
  en: {
    slug: 'public-holidays-2026', nav: 'Public holidays 2026', card: 'This year’s holidays and what is left until New Year',
    title: 'Public Holidays 2026 in Sweden: Dates and What Is Left',
    description: `Swedish public holidays 2026: date, weekday and week. ${vard.length} fell on weekdays; still to come: Christmas, with Christmas Day on Friday and New Year's Eve on Thursday.`,
    h1: 'Swedish public holidays 2026',
    intro: `${Y} is a generous year: ${vard.length} of the ${K.HELGDAGAR.length} public holidays fall Monday to Friday, and Christmas brings a long break at the end.`,
    resume: `Of the ${K.HELGDAGAR.length} statutory holidays, ${vard.length} land on a weekday in ${Y}: ${pa('en')}. National Day, Midsummer Day, All Saints' Day and Boxing Day all fall on Saturdays and give no extra time off. All Saints' Day is ${dLong(K.allaHelgonsDag(Y), 'en')}, and after that only Christmas remains. Christmas Eve and New Year's Eve are Thursdays and Christmas Day is a Friday. Taking ${jul.sem} leave days, ${dLong(mellan[0], 'en')} to ${dLong(mellan[2], 'en')}, gives ${jul.ledig} days off in a row from Christmas Eve to ${wdLong(jul.ledigTill, 'en')} ${dLong(jul.ledigTill, 'en')}. The year has ${n(at, 'en')} working days once holidays and the three eves are taken out, and ${veckor} ISO weeks because it starts on a Thursday. There were ${kl.length} bridge days: 2 January, 5 January and the Friday after Ascension Day.`,
    faqs: [
      { q: 'Which Swedish public holidays are left in 2026?', a: `After All Saints' Day on Saturday ${dLong(K.allaHelgonsDag(Y), 'en')}, only Christmas Day and Boxing Day remain. Christmas Day is a Friday and Boxing Day a Saturday. Christmas Eve on 24 December and New Year's Eve on 31 December are Thursdays; they are not public holidays but cost no leave day. New Year's Day ${Y + 1} is a Friday.` },
      { q: 'How many working days are there in Sweden in 2026?', a: `${n(at, 'en')}, counting Monday to Friday and removing both the public holidays and Midsummer, Christmas and New Year's Eve. If the eves count as working days the total is ${n(K.arbetsdagar(Y).reduce((a, b) => a + b, 0), 'en')}. Month-by-month figures are in the yearly calendar and the working-day counter.` },
      { q: 'Why does 2026 have a week 53?', a: `Under ISO 8601, the standard Sweden uses, week 1 is the week containing the year's first Thursday. ${Y} starts on a Thursday, which gives it ${veckor} weeks. Week 53 runs from Monday 28 December ${Y} to Sunday 3 January ${Y + 1}, right across the New Year break.` },
      { q: 'Is Boxing Day 2026 a day off in Sweden?', a: `Boxing Day is a public holiday, but in ${Y} it falls on a Saturday. Swedish law does not move a holiday that lands at a weekend, so there is no Monday off after Christmas. Christmas Day on the Friday still gives a long weekend from Christmas Eve for anyone off that day.` },
    ],
    body: (h) => `<h2>The year so far: ${vard.length} weekday holidays</h2>
<p>With ${vard.length} holidays on weekdays, ${Y} is one of the better years. New Year's Day on a Thursday made Friday 2 January a bridge day, and Epiphany on a Tuesday did the same for Monday 5 January. Easter Sunday fell on ${dLong(K.paskdagen(Y), 'en')}, and May Day was a Friday with a long weekend. Ascension Day on ${dLong(rd('kristi-himmelsfard', Y), 'en')} gave the third bridge day. Summer had no weekday holiday, since National Day and Midsummer Day were both Saturdays.</p>
${h.mini('jul', { p: ['ar'], d: { ar: Y }, c: 'See Christmas for another year' })}
<h2>Christmas ${Y} week by week</h2>
<p>Christmas Eve is in week ${vecka(`${Y}-12-24`)}, and the following week is week ${vecka(`${Y}-12-28`)}, the rare 53rd week. Monday to Wednesday between the holidays are the only working days from Christmas Eve to New Year's Day. Under ${h.src('semesterlag', 'section 3a of the Annual Leave Act')} Christmas Eve and New Year's Eve cost no leave, so three leave days buy eleven days away. Anyone who works the eves needs five. Healthcare, retail and public transport often run their own rotas, and there the collective agreement decides whether the eves bring extra pay or time off.</p>
<p>Official deadlines move too. A time limit that expires on Christmas Eve, Christmas Day, Boxing Day or New Year's Eve may be met on the next weekday under the ${h.src('lagstadgadtid', 'Act on statutory time limits')}. A deadline of 24 December ${Y} therefore moves to Monday 28 December. Work out your own on ${h.a('tidsfrist', 'statutory deadlines')}.</p>
<h2>From ${Y} to ${Y + 1}</h2>
<p>Next year is meaner: only ${rodaVardagar(Y + 1).length} holidays fall on weekdays in ${Y + 1}, with May Day, National Day and both Christmas holidays at weekends. The full list with weekdays is on ${h.a('roda-dagar-2027', 'public holidays 2027')}, and the planner on ${h.a('home', 'bridge days 2027')} shows where leave goes furthest. The holidays are derived from the ${h.src('helgdagslag', 'Public Holidays Act')}; no date is typed in by hand.</p>`,
  },
});
