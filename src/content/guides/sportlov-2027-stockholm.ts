/** Sportlov 2027 dans la kommun de Stockholm et les autres kommuner du län suivies ; 2028 et l'année scolaire entière. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, rd } from '../_lib';
import { namn, vk, per, semFor, ko } from './_lov';

const S = ko('stockholm');
const s27 = K.lov(S, 'sportlov2027')!, svep = K.ledigtISvep(s27)!;
const s28 = K.lov(S, 'sportlov2028')!;
const lan = K.KOMMUNER.filter((k) => k.lan === S.lan);
const lanSamma = lan.filter((k) => vk(K.lov(k, 'sportlov2027')) === vk(s27));
const lan28 = lan.filter((k) => K.lov(k, 'sportlov2028')), lanEj28 = lan.filter((k) => !K.lov(k, 'sportlov2028'));
const upp = ko('uppsala'), uppS = K.lov(upp, 'sportlov2027')!;
const kh = rd('kristi-himmelsfard', 2027);
const ar = (l: 'sv' | 'en') => [
  [l === 'sv' ? 'Höstlov 2026' : 'Autumn break 2026', per(K.lov(S, 'hostlov2026'), l)],
  [l === 'sv' ? 'Jullov' : 'Christmas break', per(K.lov(S, 'jullov2026'), l)],
  [l === 'sv' ? 'Sportlov 2027' : 'Sports break 2027', per(s27, l)],
  [l === 'sv' ? 'Påsklov 2027' : 'Easter break 2027', per(K.lov(S, 'pasklov2027'), l)],
  [l === 'sv' ? 'Sista skoldag' : 'Last school day', dLong(S.vartermin_slut, l)],
  [l === 'sv' ? 'Höstlov 2027' : 'Autumn break 2027', per(K.lov(S, 'hostlov2027'), l)],
  [l === 'sv' ? 'Sportlov 2028' : 'Sports break 2028', per(s28, l)],
];

export default defineGuide({
  id: 'sportlov-2027-stockholm', group: 'lov', order: 33, tool: 'lov', toolArg: { typ: 'sportlov2027', kommun: 'stockholm' },
  related: ['sportlov-2027', 'pasklov-2027', 'sommarlov-2027', 'home'],
  sources: ['kommun-stockholm', 'kommun-huddinge', 'kommun-nacka', 'kommun-sodertalje', 'kommun-taby', 'skolforordning'],
  sv: {
    slug: 'sportlov-2027-stockholm', nav: 'Sportlov 2027 Stockholm', card: 'Vecka 9 i Stockholm och grannkommunerna',
    title: 'Sportlov 2027 Stockholm: vecka 9, datum och sportlov 2028',
    description: 'Sportlov 2027 i Stockholm är vecka 9, 1 till 5 mars. Se grannkommunerna Huddinge, Nacka, Södertälje och Täby, sportlovet 2028 och hela läsåret i staden.',
    h1: 'Sportlov 2027 i Stockholm',
    intro: `Stockholms stad har sportlov i vecka ${vk(s27)}, ${per(s27, 'sv')}. Med helgerna är eleverna lediga i nio dagar.`,
    resume: `I Stockholms kommun är sportlovet 2027 vecka ${vk(s27)}, från måndagen den ${dLong(s27[0], 'sv')} till fredagen den ${dLong(s27[1], 'sv')}. Räknar man in helgerna blir det ledigt från ${dWeek(svep[0], 'sv')} till ${dWeek(svep[1], 'sv')}. ${lanSamma.length === lan.length ? `Alla ${n(lan.length, 'sv')} kommuner i Stockholms län som vi följer, ${namn(lan, 'sv')}, har samma vecka` : `${namn(lanSamma, 'sv')} har samma vecka`}, vilket underlättar för familjer där föräldrarna pendlar mellan kommunerna. Uppsala, en vanlig pendlingsort, har däremot sportlov redan i vecka ${vk(uppS)}. Utbildningsnämnden i Stockholm har beslutat läsårstiderna flera år framåt, så sportlovet 2028 är också klart: vecka ${vk(s28)}, ${per(s28, 'sv')}. För en förälder kostar veckan ${semFor(s27)} semesterdagar, eftersom det inte finns några röda dagar i februari eller mars. Längre fram under våren ligger påsklovet och en lovdag i maj.`,
    faqs: [
      { q: 'Vilka datum har sportlovet 2027 i Stockholms stad?', a: `Måndag ${dLong(s27[0], 'sv')} till fredag ${dLong(s27[1], 'sv')}, vecka ${vk(s27)}. Datumen gäller de kommunala grundskolorna och står i stadens läsårstider. Fristående skolor i Stockholm bestämmer själva men följer ofta samma vecka; kontrollera med skolan om barnet går i en friskola.` },
      { q: 'Har Nacka, Huddinge och Täby också sportlov vecka 9 2027?', a: `Ja. ${namn(lanSamma, 'sv')} har alla sportlov ${per(s27, 'sv')}, enligt respektive kommuns publicerade läsårstider. Södertälje anger bara veckonumret, vecka 9, så där är datumen vår egen omräkning till måndag till fredag i den veckan.` },
      { q: 'När är sportlovet 2028 i Stockholm?', a: `Vecka ${vk(s28)}, ${per(s28, 'sv')}. Stockholms stad har redan publicerat läsåret 2027/28. ${namn(lan28.filter((k) => k.id !== 'stockholm'), 'sv')} har också beslutat om samma vecka, medan ${namn(lanEj28, 'sv')} inte har publicerat sportlovet 2028 än. Även det lovet ger nio lediga dagar i rad med helgerna.` },
    ],
    body: (h) => `<h2>Hela läsåret 2026/27 i Stockholms stad</h2>
<p>${h.table(['Lov', 'Datum'], ar('sv'), 'Lov och terminsgränser enligt Stockholms stads läsårstider')}</p>
<p>Uppgifterna kommer från ${h.src('kommun-stockholm', 'Stockholms stads sida om terminer och lov')}, läst den ${dLong(K.LOV_LASDATUM, 'sv')}. Läsåret började den 17 augusti 2026. Utöver loven i tabellen är fredagen den 7 maj 2027, dagen efter Kristi himmelsfärdsdag, en lovdag. Den som tar semester samma dag får en långhelg på fyra dagar, från ${dWeek(kh, 'sv')}.</p>
<h2>Grannkommunerna i länet</h2>
<p>${h.table(['Kommun', 'Sportlov 2027', 'Sportlov 2028'], lan.map((k) => [k.name, per(K.lov(k, 'sportlov2027'), 'sv'), per(K.lov(k, 'sportlov2028'), 'sv')]), 'Sportlov i de kommuner i Stockholms län som vi följer')}</p>
<p>${h.src('kommun-huddinge', 'Huddinge')} och ${h.src('kommun-nacka', 'Nacka')} har publicerat både 2027 och 2028, ${h.src('kommun-taby', 'Täby')} och ${h.src('kommun-sodertalje', 'Södertälje')} hittills bara läsåret 2026/27. Övriga kommuner i länet, som Solna, Sundbyberg eller Järfälla, finns inte i vår sammanställning; där gäller kommunens egen sida. Att kommunerna i länet brukar välja samma vecka är praxis, inte en regel: ${h.src('skolforordning', 'skolförordningen')} låter varje huvudman lägga ut lovdagarna själv.</p>
${h.mini('bt', { p: ['sem'], d: { ar: 2027, sem: 6 }, c: 'Planera semestern runt loven 2027' })}
<h2>Pendlare mellan Stockholm och Uppsala</h2>
<p>En familj där barnen går i skola i Uppsala och föräldrarna arbetar i Stockholm, eller tvärtom, får två olika sportlovsveckor att förhålla sig till. Uppsala har vecka ${vk(uppS)}, ${per(uppS, 'sv')}, alltså veckan före Stockholm. Det påverkar inte barnens lov, som alltid följer skolans kommun, men det kan påverka hur lätt det är att få semester samma vecka som kollegorna. Mer om alla veckor finns på ${h.a('sportlov-2027', 'sportlov 2027')}.</p>
<h2>Efter sportlovet</h2>
<p>Påsklovet följer drygt tre veckor senare, ${per(K.lov(S, 'pasklov2027'), 'sv')}, direkt efter annandag påsk; se ${h.a('pasklov-2027', 'påsklov 2027')}. Sista skoldagen före sommaren är ${dWeek(S.vartermin_slut, 'sv')}, och sommarlovet beskrivs under ${h.a('sommarlov-2027', 'sommarlov 2027')}.</p>`,
  },
  en: {
    slug: 'sports-break-2027-stockholm', nav: 'Sports break 2027 Stockholm', card: 'Week 9 in Stockholm and nearby municipalities',
    title: 'Sports Break 2027 Stockholm: Week 9 Dates and 2028 Outlook',
    description: 'The 2027 sports break in Stockholm is week 9, 1 to 5 March. Nearby Huddinge, Nacka, Södertälje and Täby, the 2028 dates and the whole Stockholm school year.',
    h1: 'Sports break 2027 in Stockholm',
    intro: `The City of Stockholm has its sports break in week ${vk(s27)}, ${per(s27, 'en')}. With the weekends, pupils are off for nine days.`,
    resume: `In the municipality of Stockholm the 2027 sports break, sportlov, is week ${vk(s27)}: Monday ${dLong(s27[0], 'en')} to Friday ${dLong(s27[1], 'en')}. Counting the weekends, children are off from ${dWeek(svep[0], 'en')} to ${dWeek(svep[1], 'en')}. ${lanSamma.length === lan.length ? `All ${n(lan.length, 'en')} municipalities in Stockholm County that we follow, ${namn(lan, 'en')}, use the same week` : `${namn(lanSamma, 'en')} use the same week`}, which helps families whose parents commute between them. Uppsala, a common commuter town, has its sports break a week earlier, in week ${vk(uppS)}. Stockholm's education committee has fixed school dates several years ahead, so the 2028 sports break is known too: week ${vk(s28)}, ${per(s28, 'en')}. For a parent the week costs ${semFor(s27)} leave days, since February and March have no public holidays. Later in the spring come the Easter break and a free day in May.`,
    faqs: [
      { q: 'What are the dates of the 2027 sports break in the City of Stockholm?', a: `Monday ${dLong(s27[0], 'en')} to Friday ${dLong(s27[1], 'en')}, week ${vk(s27)}. The dates apply to the municipal compulsory schools and are in the city's school-year calendar. Independent schools in Stockholm decide for themselves but often follow the same week; check with the school if your child attends one.` },
      { q: 'Do Nacka, Huddinge and Täby also have the sports break in week 9 of 2027?', a: `Yes. ${namn(lanSamma, 'en')} all have the sports break ${per(s27, 'en')}, according to each municipality's published school calendar. Södertälje gives only the week number, week 9, so the Monday-to-Friday dates there are our conversion.` },
      { q: 'When is the 2028 sports break in Stockholm?', a: `Week ${vk(s28)}, ${per(s28, 'en')}. The City of Stockholm has already published the 2027/28 school year. ${namn(lan28.filter((k) => k.id !== 'stockholm'), 'en')} have chosen the same week, while ${namn(lanEj28, 'en')} have not published their 2028 sports break yet.` },
    ],
    body: (h) => `<h2>The whole 2026/27 school year in Stockholm</h2>
<p>${h.table(['Break', 'Dates'], ar('en'), 'Breaks and term dates from the City of Stockholm school calendar')}</p>
<p>The figures come from ${h.src('kommun-stockholm', "the City of Stockholm's page on terms and breaks")}, read on ${dLong(K.LOV_LASDATUM, 'en')}. The school year began on 17 August 2026. Besides the breaks in the table, Friday 7 May 2027, the day after Ascension Day, is a day off school. A parent who takes leave that day gets a four-day weekend starting ${dWeek(kh, 'en')}.</p>
<h2>Neighbouring municipalities in the county</h2>
<p>${h.table(['Municipality', 'Sports break 2027', 'Sports break 2028'], lan.map((k) => [k.name, per(K.lov(k, 'sportlov2027'), 'en'), per(K.lov(k, 'sportlov2028'), 'en')]), 'Sports break in the Stockholm County municipalities we follow')}</p>
<p>${h.src('kommun-huddinge', 'Huddinge')} and ${h.src('kommun-nacka', 'Nacka')} have published both 2027 and 2028; ${h.src('kommun-taby', 'Täby')} and ${h.src('kommun-sodertalje', 'Södertälje')} so far only 2026/27. Other municipalities in the county, such as Solna, Sundbyberg or Järfälla, are not in our list; check their own pages. That the county tends to share a week is custom, not law: the ${h.src('skolforordning', 'Education Ordinance')} lets every organiser place its own holiday days.</p>
${h.mini('bt', { p: ['sem'], d: { ar: 2027, sem: 6 }, c: 'Plan your leave around the 2027 breaks' })}
<h2>Commuting between Stockholm and Uppsala</h2>
<p>A family whose children attend school in Uppsala while the parents work in Stockholm, or the other way round, has two sports-break weeks to deal with. Uppsala has week ${vk(uppS)}, ${per(uppS, 'en')}, the week before Stockholm. The children's break always follows the school's municipality, but colleagues in another municipality may be competing for leave in a different week. All the weeks are on ${h.a('sportlov-2027', 'sports break 2027')}.</p>
<h2>After the sports break</h2>
<p>The Easter break follows just over three weeks later, ${per(K.lov(S, 'pasklov2027'), 'en')}, right after Easter Monday; see ${h.a('pasklov-2027', 'Easter break 2027')}. The last school day before summer is ${dWeek(S.vartermin_slut, 'en')}, and the summer break is covered on ${h.a('sommarlov-2027', 'summer holidays 2027')}.</p>`,
  },
});
