/** Klämdagar 2026 : l'année est presque finie au moment de la mise en ligne ; il reste la semaine de Noël. Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, rd, opt, span, vecka, type Lang } from '../_lib';

const Y = 2026;
const O = { aftnar: true };
const kl = K.klamdagar(Y, O);
const br = K.broar(Y, O);
const jul = br.find((b) => b.semFran.startsWith(`${Y}-12-28`))!;
const forJul = br.find((b) => b.semFran.startsWith(`${Y}-12-21`))!;
const pask = br.find((b) => b.semFran === K.plusDays(rd('langfredagen', Y), -4))!;
const p10 = opt(Y, 10), p5 = opt(Y, 5), p10a = K.optimera(Y, 10, {});
const julUtanAftnar = K.broar(Y, {}).find((b) => b.semTill === `${Y}-12-31`);
const ht = K.KOMMUNER.map((k) => k.hosttermin_slut).sort(), vt = K.KOMMUNER.map((k) => k.vartermin_start).sort();
const rows = (l: Lang) => br.slice().sort((a, b) => a.semFran.localeCompare(b.semFran)).map((b) => [span(b.semFran, b.semTill, l), b.sem, span(b.ledigFran, b.ledigTill, l), b.ledig]);

export default defineGuide({
  id: 'klamdagar-2026', group: 'verktyg', order: 2, tool: 'bt', toolArg: { ar: Y, sem: 3 },
  related: ['home', 'klamdagar-2028', 'jul-2026', 'semesterdagar'],
  sources: ['helgdagslag', 'semesterlag'],
  sv: {
    slug: 'klamdagar-2026', nav: 'Klämdagar 2026', card: 'Årets broar och mellandagarna i jul',
    title: 'Klämdagar 2026: mellandagarna och årets bästa broar',
    description: 'Klämdagar 2026: tre semesterdagar mellan jul och nyår ger elva dagar ledigt. Se alla broar under året, vad de kostade och vad som återstår i december.',
    h1: 'Klämdagar 2026',
    intro: `Det mesta av ${Y} har passerat, men den bästa bron återstår: mellandagarna, där ${jul.sem} semesterdagar ger ${jul.ledig} dagar ledigt i rad.`,
    resume: `${Y} hade ${kl.length} äkta klämdagar, alla under första halvåret: ${kl.map((b) => dWeek(b.semFran, 'sv')).join(', ').replace(/, ([^,]*)$/, ' och $1')}. Kvar under hösten finns bara julen, men den är ovanligt förmånlig. Julafton och nyårsafton infaller på torsdagar och juldagen på en fredag, så ${jul.sem} semesterdagar, ${dLong(jul.semFran, 'sv')} till ${dLong(jul.semTill, 'sv')}, ger ledigt från julafton till söndagen den ${dLong(jul.ledigTill, 'sv')}: ${jul.ledig} dagar. Annandag jul blir en lördag och ger ingen extra dag. Den som arbetar på julafton och nyårsafton behöver i stället ${julUtanAftnar ? julUtanAftnar.sem : 4} semesterdagar för en kortare ledighet. Sett över hela året gav tio väl placerade semesterdagar ${p10.ledig} lediga dagar ${Y}, mot ${p10a.ledig} för den som räknar aftnarna som arbetsdagar. Midsommarafton, julafton och nyårsafton kostar aldrig någon semesterdag enligt semesterlagen, även om lagen inte gör dem till röda dagar.`,
    faqs: [
      { q: 'Vilka klämdagar fanns det 2026?', a: `Tre äkta klämdagar: ${kl.map((b) => dLong(b.semFran, 'sv')).join(', ').replace(/, ([^,]*)$/, ' och $1')}. De två första låg kring nyår och trettondedag jul, den sista var fredagen efter Kristi himmelsfärdsdag. Första maj på en fredag gav en långhelg utan klämdag, och nationaldagen föll på en lördag.` },
      { q: 'Hur många semesterdagar behövs till julen 2026?', a: `Med julafton och nyårsafton lediga räcker ${jul.sem} dagar, ${dLong(jul.semFran, 'sv')} till ${dLong(jul.semTill, 'sv')}, för ${jul.ledig} lediga dagar i rad. Vill du dessutom vara ledig veckan före jul kostar det ${forJul.sem} dagar till. Aftnarna drar ingen semester enligt 3 a § semesterlagen.` },
      { q: 'När börjar jullovet för skolbarnen 2026?', a: `Det bestämmer varje kommun, inte staten. I de 24 största kommunerna slutar höstterminen mellan ${dLong(ht[0], 'sv')} och ${dLong(ht[ht.length - 1], 'sv')}, och vårterminen börjar mellan ${dLong(vt[0], 'sv')} och ${dLong(vt[vt.length - 1], 'sv')}. Datumen för varje kommun, med länk till kommunens eget beslut, finns på sidan om jullovet.` },
      { q: 'Kan semesterdagar från 2026 sparas till nästa år?', a: `Ja, om du har fler än ${K.P.semester.sparaOver} betalda semesterdagar under semesteråret får överskottet sparas. De sparade dagarna ska tas ut inom ${K.P.semester.sparaAr} år. Semesteråret löper som huvudregel från 1 april till 31 mars, så det är inte kalenderåret som avgör.` },
    ],
    body: (h) => `<h2>Mellandagarna ${Y}: årets sista bro</h2>
<p>Julhelgen ${Y} ser ut så här: julafton torsdag, juldagen fredag, annandag jul lördag, och veckan efter har fyra vanliga arbetsdagar före nyårsafton. Lägger du semester måndag till onsdag sammanfaller ledigheten med nyårsafton och nyårsdagen, och du börjar arbeta först måndagen den ${dLong(K.plusDays(jul.ledigTill, 1), 'sv')}. Den veckan är vecka ${vecka(jul.semFran)}, den sista i ett år som ovanligt nog har ${K.veckorIAret(Y)} veckor.</p>
<p>Vill du vara ledig ännu längre lägger du till veckan före jul. ${forJul.sem} dagar till, ${dLong(forJul.semFran, 'sv')} till ${dLong(forJul.semTill, 'sv')}, ger sammanlagt ledigt från lördagen den ${dLong(forJul.ledigFran, 'sv')}. Det är två och en halv vecka för sex semesterdagar.</p>
${h.mini('sd', { p: ['dag', 'langd'], d: { ar: Y, man: 12, dag: 21, langd: 17 }, c: 'Räkna semesterdagar över julen' })}
<h2>Alla broar ${Y} i efterhand</h2>
<p>Tabellen visar varje bro som året bjöd på, med de semesterdagar den krävde och den ledighet den gav. Den kan vara användbar för att jämföra med ${h.a('home', 'klämdagarna 2027')}, som blir betydligt färre.</p>
${h.table(['Semester', 'Dagar', 'Ledigt', 'Dagar i rad'], rows('sv'), `Broar ${Y}, aftnarna lediga`, ['l', 'r', 'l', 'r'])}
<p>Påskveckan var årets mest givande längre bro: ${pask.sem} dagar före påsk gav ${pask.ledig} dagar ledigt. Kristi himmelsfärd den ${dLong(rd('kristi-himmelsfard', Y), 'sv')} med klämdag på fredagen var den klassiska långhelgen i maj.</p>
<h2>Varför julen ${Y} är så bra</h2>
<p>Röda dagar flyttas inte i Sverige. ${h.src('helgdagslag', 'Lagen om allmänna helgdagar')} saknar regler om ersättningsdagar, så det är veckodagarna som avgör. När julafton är en torsdag hamnar både juldagen och nyårsdagen på fredagar, och mellandagarna blir bara tre. Aftnarna räknas som söndagar i ${h.src('semesterlag', '3 a § semesterlagen')} och kostar ingen semesterdag. Att de flesta faktiskt är lediga på julafton och nyårsafton bygger på kollektivavtal och praxis, så kontrollera vad som gäller på din arbetsplats.</p>`,
  },
  en: {
    slug: 'bridge-days-2026', nav: 'Bridge days 2026', card: 'The year’s bridges and the Christmas gap',
    title: 'Bridge Days 2026 in Sweden: Christmas and Past Bridges',
    description: 'Bridge days 2026 in Sweden: three leave days between Christmas and New Year give eleven days off. See every bridge of the year and what is still ahead.',
    h1: 'Bridge days in Sweden 2026',
    intro: `Most of ${Y} is behind us, but the best bridge is still ahead: the days between Christmas and New Year, where ${jul.sem} leave days give ${jul.ledig} days off in a row.`,
    resume: `${Y} had ${kl.length} true bridge days, all in the first half of the year: ${kl.map((b) => dWeek(b.semFran, 'en')).join(', ').replace(/, ([^,]*)$/, ' and $1')}. Only Christmas is left in the autumn, and it is unusually generous. Christmas Eve and New Year's Eve fall on Thursdays and Christmas Day on a Friday, so ${jul.sem} leave days, ${dLong(jul.semFran, 'en')} to ${dLong(jul.semTill, 'en')}, keep you off from Christmas Eve to Sunday ${dLong(jul.ledigTill, 'en')}: ${jul.ledig} days. Boxing Day falls on a Saturday and adds nothing. If you work on Christmas Eve and New Year's Eve, you need ${julUtanAftnar ? julUtanAftnar.sem : 4} leave days for a shorter break instead. Over the whole year, ten well-placed leave days gave ${p10.ledig} days off in ${Y}, against ${p10a.ledig} for someone who works on the eves. Midsummer Eve, Christmas Eve and New Year's Eve never cost a leave day under the Annual Leave Act, even though the law does not make them public holidays.`,
    faqs: [
      { q: 'Which bridge days did Sweden have in 2026?', a: `Three true bridge days: ${kl.map((b) => dLong(b.semFran, 'en')).join(', ').replace(/, ([^,]*)$/, ' and $1')}. The first two were around New Year and Epiphany, the last was the Friday after Ascension Day. May Day on a Friday gave a long weekend without a bridge, and National Day fell on a Saturday.` },
      { q: 'How many leave days do I need at Christmas 2026?', a: `With Christmas Eve and New Year's Eve off, ${jul.sem} days, ${dLong(jul.semFran, 'en')} to ${dLong(jul.semTill, 'en')}, give ${jul.ledig} consecutive days off. Taking the week before Christmas as well costs ${forJul.sem} more days. The eves never use up leave under section 3a of the Annual Leave Act.` },
      { q: 'When does the 2026 Christmas school break start?', a: `Each municipality decides, not the state. In the 24 largest municipalities the autumn term ends between ${dLong(ht[0], 'en')} and ${dLong(ht[ht.length - 1], 'en')}, and the spring term starts between ${dLong(vt[0], 'en')} and ${dLong(vt[vt.length - 1], 'en')}. The dates for each one, linked to the municipal decision, are on the Christmas break page.` },
      { q: 'Can I carry 2026 leave days over to next year?', a: `Yes, if you have more than ${K.P.semester.sparaOver} paid leave days in the leave year, you may save the surplus. Saved days must be taken within ${K.P.semester.sparaAr} years. The leave year normally runs from 1 April to 31 March, so the calendar year is not what counts.` },
    ],
    body: (h) => `<h2>The Christmas gap in ${Y}: the last bridge of the year</h2>
<p>Christmas ${Y} falls like this: Christmas Eve on Thursday, Christmas Day on Friday, Boxing Day on Saturday, and the next week has four ordinary working days before New Year's Eve. Take Monday to Wednesday off and your break runs into New Year's Eve and New Year's Day, so you are back at work on Monday ${dLong(K.plusDays(jul.ledigTill, 1), 'en')}. That is week ${vecka(jul.semFran)}, the last of a year that unusually has ${K.veckorIAret(Y)} weeks.</p>
<p>For an even longer break, add the week before Christmas. ${forJul.sem} more days, ${dLong(forJul.semFran, 'en')} to ${dLong(forJul.semTill, 'en')}, put you off work from Saturday ${dLong(forJul.ledigFran, 'en')}. That is two and a half weeks for six leave days.</p>
${h.mini('sd', { p: ['dag', 'langd'], d: { ar: Y, man: 12, dag: 21, langd: 17 }, c: 'Count leave days over Christmas' })}
<h2>Every bridge of ${Y} in hindsight</h2>
<p>The table lists every bridge the year offered, with the leave it needed and the break it gave. It is handy for comparison with ${h.a('home', 'bridge days 2027')}, which are far fewer.</p>
${h.table(['Leave', 'Days', 'Off', 'Days in a row'], rows('en'), `Bridges in ${Y}, eves off`, ['l', 'r', 'l', 'r'])}
<p>Easter week was the best long bridge of the year: ${pask.sem} days before Easter gave ${pask.ledig} days off. Ascension Day on ${dLong(rd('kristi-himmelsfard', Y), 'en')}, with a bridge day on the Friday, was the classic long weekend in May.</p>
<h2>Why Christmas ${Y} works so well</h2>
<p>Swedish holidays never move. The ${h.src('helgdagslag', 'Public Holidays Act')} has no substitute-day rule, so the weekdays decide everything. With Christmas Eve on a Thursday, Christmas Day and New Year's Day both land on Fridays and only three working days remain in between. The eves count as Sundays under ${h.src('semesterlag', 'section 3a of the Annual Leave Act')} and cost no leave. That most people are actually off on Christmas Eve and New Year's Eve rests on collective agreements and custom, so check what applies at your workplace.</p>`,
  },
});
