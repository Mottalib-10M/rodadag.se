/** Jullov 2026/27 : du lendemain de la fin du HT à la veille du VT, par kommun. Dates : lov.json via le moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, rd } from '../_lib';
import { namn, per, semFor, kort } from './_lov';

const rows = K.KOMMUNER.map((k) => ({ k, s: K.lov(k, 'jullov2026')! }));
const dagar = rows.map((r) => K.kalenderdagar(r.s));
const kort1 = Math.min(...dagar), lang1 = Math.max(...dagar);
const kortaste = rows.filter((r) => K.kalenderdagar(r.s) === kort1).map((r) => r.k);
const langsta = rows.filter((r) => K.kalenderdagar(r.s) === lang1).map((r) => r.k);
const forst = rows.reduce((a, b) => (b.s[0] < a.s[0] ? b : a));
const sistStart = rows.map((r) => r.s[1]).sort().pop()!;
const sistaKs = rows.filter((r) => r.s[1] === sistStart).map((r) => r.k);
const sthlm = K.lov(K.kommun('stockholm'), 'jullov2026')!;
const mellan = K.semesterdagar('2026-12-28', '2027-01-06');
const ja = '2026-12-24', na = '2026-12-31', tj = rd('trettondedag-jul', 2027);

export default defineGuide({
  id: 'jullov-2026', group: 'lov', order: 31, tool: 'lov', toolArg: { typ: 'jullov2026', kommun: 'stockholm' },
  related: ['jul-2026', 'klamdagar-2026', 'hostlov-2026', 'sportlov-2027'],
  sources: ['skolforordning', 'semesterlag', 'kommun-norrkoping', 'kommun-jonkoping'],
  sv: {
    slug: 'jullov-2026', nav: 'Jullov 2026/27', card: 'Sista skoldag före jul och skolstart i januari',
    title: 'Jullov 2026/2027: första och sista lovdag i 24 kommuner',
    description: 'Jullov 2026/2027: när höstterminen slutar och vårterminen börjar i 24 kommuner, hur långt lovet blir och hur många semesterdagar som täcker hela lovet.',
    h1: 'Jullov 2026/2027',
    intro: `Jullovet är mellan ${n(kort1, 'sv')} och ${n(lang1, 'sv')} dagar långt, beroende på kommun. I Stockholm varar det ${span2(sthlm, 'sv')}.`,
    resume: `Jullovet har inget eget beslut i de flesta kommuner: det är tiden mellan höstterminens sista dag och vårterminens första. Därför skiljer det sig mer än något annat lov. Bland de ${K.KOMMUNER.length} kommuner vi följer börjar det tidigast i ${forst.k.name}, ${dWeek(forst.s[0], 'sv')}, och slutar senast i ${namn(sistaKs, 'sv')}, där barnen är lediga till och med ${dWeek(sistStart, 'sv')}. Det kortaste lovet, ${n(kort1, 'sv')} dagar inklusive helger, har ${namn(kortaste, 'sv')}; det längsta, ${n(lang1, 'sv')} dagar, har ${namn(langsta, 'sv')}. Julafton och nyårsafton är torsdagar och juldagen och nyårsdagen fredagar, så två långhelger följer på varandra. Trettondedag jul är en onsdag. För att täcka hela lovet i Stockholm behövs ${semFor(sthlm)} semesterdagar; bara mellandagarna och veckan efter nyår, ${dLong('2026-12-28', 'sv')} till trettondagen, kostar ${mellan.sem}.`,
    faqs: [
      { q: 'När slutar höstterminen 2026 före jullovet?', a: `De flesta av de ${K.KOMMUNER.length} kommunerna avslutar höstterminen fredagen den 18 december eller tisdagen den 22 december. ${forst.k.name} slutar redan torsdagen den 17 december. Den exakta dagen för ditt barn står i kommunens läsårstider, som vi länkar till i tabellen överst på sidan.` },
      { q: 'När börjar skolan igen efter jullovet 2027?', a: `Vanligast är måndagen den 11 januari 2027. Gävle, Linköping, Lund och Norrköping börjar redan torsdagen den 7 januari, medan ${namn(sistaKs, 'sv')} börjar onsdagen den 13 januari. Tänk på att vissa kommuner lägger studiedagar i början av terminen, så att undervisningen startar ett par dagar senare.` },
      { q: 'Hur många semesterdagar behövs för jullovet 2026?', a: `Det beror på kommunen. I Stockholm, där lovet varar ${span2(sthlm, 'sv')}, går det åt ${semFor(sthlm)} semesterdagar, eftersom juldagen, nyårsdagen och trettondedag jul är röda dagar och julafton och nyårsafton enligt semesterlagen inte räknas. Tabellen nedan visar antalet för varje kommun.` },
      { q: 'Är julafton 2026 en lovdag eller en röd dag?', a: `Julafton, ${dWeek(ja, 'sv')}, ligger mitt i jullovet i alla kommuner, så ingen elev har skoldag då. Den är ingen allmän helgdag, men semesterlagen jämställer den med söndag, så en förälder som är ledig drar ingen semesterdag. Detsamma gäller nyårsafton, ${dWeek(na, 'sv')}.` },
    ],
    body: (h) => `<h2>Längden på jullovet i varje kommun</h2>
<p>${h.table(['Kommun', 'Jullov', 'Dagar', 'Semesterdagar'], rows.map((r) => [r.k.name, per(r.s, 'sv'), K.kalenderdagar(r.s), semFor(r.s)]), 'Jullov 2026/27: kalenderdagar och semesterdagar för att täcka hela lovet', ['l', 'l', 'r', 'r'])}</p>
<p>Lovet räknas här från dagen efter höstterminens sista skoldag till dagen före vårterminens första, med helgerna. Semesterdagarna är räknade enligt ${h.src('semesterlag', '3 a § semesterlagen')}: lördagar, söndagar, röda dagar samt jul- och nyårsafton drar ingen dag.</p>
<h2>Studiedagar i början av januari</h2>
<p>Vårterminens första dag är inte alltid en skoldag för eleverna. I ${h.src('kommun-norrkoping', 'Norrköping')} är den 7 och 8 januari studiedagar, så undervisningen börjar måndagen den 11. I ${h.src('kommun-jonkoping', 'Jönköping')} är måndagen den 11 januari en gemensam studiedag och eleverna börjar den 12. Borås har kompetensutvecklingsdagar den 7 och 8 januari innan terminen startar. Fritids är ofta öppet på studiedagar, men inte alltid; kontrollera med skolan.</p>
${h.mini('sd', { p: ['dag', 'langd'], d: { ar: 2026, man: 12, dag: 19, langd: K.kalenderdagar(sthlm) }, c: 'Räkna semesterdagar för jullovet' })}
<h2>Röda dagar och aftnar under lovet</h2>
<p>Lovet rymmer fem dagar som inte kostar semester. Julafton och juldagen ligger torsdag och fredag, annandag jul är en lördag och ger därför ingen extra ledighet. Nyårsafton och nyårsdagen följer veckan efter på samma veckodagar, och trettondedag jul, ${kort(tj, 'sv')}, delar den första veckan i januari. Den som bara vill vara ledig mellan helgerna klarar sig med tre semesterdagar, ${kort('2026-12-28', 'sv')} till ${kort('2026-12-30', 'sv')}, och får då elva dagar i rad. Fler sådana broar finns på ${h.a('klamdagar-2026', 'klämdagar 2026')}.</p>
<h2>Ingen nationell regel</h2>
<p>${h.src('skolforordning', 'Skolförordningen')} kräver att läsåret har minst ${K.P.skola.skoldagar} skoldagar och ${K.P.skola.lovdagar} lovdagar och att det börjar i augusti och slutar i juni. Var terminsgränserna hamnar bestämmer huvudmannen, och det är därför jullovet kan skilja tio dagar mellan grannkommuner. För fristående skolor gäller skolans eget beslut. Nästa lov efter jul är ${h.a('sportlov-2027', 'sportlovet')}; om själva helgerna, se ${h.a('jul-2026', 'jul 2026')}.</p>`,
  },
  en: {
    slug: 'christmas-break-2026', nav: 'Christmas break 2026/27', card: 'Last school day before Christmas, first in January',
    title: 'Christmas Break 2026/27: School Dates in 24 Municipalities',
    description: 'Christmas school break 2026/27 in Sweden: when the autumn term ends and the spring term starts in 24 municipalities, how long it lasts and the leave it takes.',
    h1: 'Christmas school break 2026/27',
    intro: `The Christmas break lasts between ${n(kort1, 'en')} and ${n(lang1, 'en')} days depending on the municipality. In Stockholm it runs ${span2(sthlm, 'en')}.`,
    resume: `Most municipalities take no separate decision on the Christmas break, jullov: it is simply the gap between the last day of the autumn term and the first day of the spring term. That is why it varies more than any other break. Among the ${K.KOMMUNER.length} municipalities we follow, it starts earliest in ${forst.k.name}, on ${dWeek(forst.s[0], 'en')}, and ends latest in ${namn(sistaKs, 'en')}, where children are off up to ${dWeek(sistStart, 'en')}. The shortest break, ${n(kort1, 'en')} days including weekends, is in ${namn(kortaste, 'en')}; the longest, ${n(lang1, 'en')} days, in ${namn(langsta, 'en')}. Christmas Eve and New Year's Eve are Thursdays and Christmas Day and New Year's Day Fridays, so two long weekends follow each other. Epiphany is a Wednesday. Covering the whole Stockholm break takes ${semFor(sthlm)} leave days; just the days between Christmas and Epiphany, from ${dLong('2026-12-28', 'en')}, cost ${mellan.sem}.`,
    faqs: [
      { q: 'When does the autumn term end before Christmas 2026?', a: `Most of the ${K.KOMMUNER.length} municipalities end the autumn term on Friday 18 December or Tuesday 22 December. ${forst.k.name} finishes on Thursday 17 December. The exact day for your child is in the municipality's school-year calendar, linked from the table at the top of this page.` },
      { q: 'When does school restart after the Christmas break in 2027?', a: `Most often on Monday 11 January 2027. Gävle, Linköping, Lund and Norrköping start as early as Thursday 7 January, while ${namn(sistaKs, 'en')} start on Wednesday 13 January. Some municipalities put study days at the start of term, so lessons begin a couple of days later.` },
      { q: 'How many leave days cover the 2026 Christmas break?', a: `It depends on where you live. In Stockholm, where the break runs ${span2(sthlm, 'en')}, it takes ${semFor(sthlm)} leave days, because Christmas Day, New Year's Day and Epiphany are public holidays and the Annual Leave Act does not count Christmas Eve and New Year's Eve. The table below gives the figure for each municipality.` },
      { q: 'Is Christmas Eve 2026 a school day or a holiday?', a: `Christmas Eve, ${dWeek(ja, 'en')}, falls inside the break everywhere, so no pupil has school that day. It is not a public holiday, but the Annual Leave Act treats it like a Sunday, so a parent who takes it off uses no leave day. The same applies to New Year's Eve, ${dWeek(na, 'en')}.` },
    ],
    body: (h) => `<h2>Length of the Christmas break in each municipality</h2>
<p>${h.table(['Municipality', 'Christmas break', 'Days', 'Leave days'], rows.map((r) => [r.k.name, per(r.s, 'en'), K.kalenderdagar(r.s), semFor(r.s)]), 'Christmas break 2026/27: calendar days and leave days to cover all of it', ['l', 'l', 'r', 'r'])}</p>
<p>The break is counted from the day after the last autumn-term school day to the day before the first spring-term day, weekends included. Leave days follow ${h.src('semesterlag', 'section 3a of the Annual Leave Act')}: Saturdays, Sundays, public holidays and Christmas and New Year's Eve cost nothing.</p>
<h2>Study days in early January</h2>
<p>The first day of the spring term is not always a school day for pupils. In ${h.src('kommun-norrkoping', 'Norrköping')} 7 and 8 January are study days, so lessons start on Monday 11 January. In ${h.src('kommun-jonkoping', 'Jönköping')} Monday 11 January is a shared study day and pupils return on the 12th. Borås holds professional development days on 7 and 8 January before term begins. After-school care is often open on study days, though not always; check with the school.</p>
${h.mini('sd', { p: ['dag', 'langd'], d: { ar: 2026, man: 12, dag: 19, langd: K.kalenderdagar(sthlm) }, c: 'Count leave days for the Christmas break' })}
<h2>Holidays and eves inside the break</h2>
<p>The break contains five days that cost no leave. Christmas Eve and Christmas Day are Thursday and Friday; Boxing Day is a Saturday, so it adds nothing. New Year's Eve and New Year's Day follow a week later on the same weekdays, and Epiphany, ${kort(tj, 'en')}, splits the first week of January. If you only want the days between the holidays, three leave days, ${kort('2026-12-28', 'en')} to ${kort('2026-12-30', 'en')}, give you eleven days in a row. More bridges like this are on ${h.a('klamdagar-2026', 'bridge days 2026')}.</p>
<h2>No national rule</h2>
<p>The ${h.src('skolforordning', 'Education Ordinance')} requires at least ${K.P.skola.skoldagar} school days and ${K.P.skola.lovdagar} holiday days in a school year running from August to June. Where the term boundaries fall is up to the organiser, which is why the Christmas break can differ by ten days between neighbouring municipalities. Independent schools set their own dates. The next break after Christmas is the ${h.a('sportlov-2027', 'sports break')}; for the holidays themselves, see ${h.a('jul-2026', 'Christmas 2026')}.</p>`,
  },
});

function span2(s: [string, string], l: 'sv' | 'en') { return l === 'sv' ? `från ${dLong(s[0], 'sv')} till ${dLong(s[1], 'sv')}` : `from ${dLong(s[0], 'en')} to ${dLong(s[1], 'en')}`; }
