/** Höstlov 2026 (v44, alla 24 kommuner) och höstlov 2027 (publicerat av en del). Dates : lov.json via le moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n } from '../_lib';
import { grupper, namn, publ, ejPubl, vk, per, semFor, ko } from './_lov';

const g26 = grupper('hostlov2026'), s26 = g26[0].s!;
const svep26 = K.ledigtISvep(s26)!;
const p27 = publ('hostlov2027'), e27 = ejPubl('hostlov2027');
const s27 = K.lov(p27[0], 'hostlov2027')!, svep27 = K.ledigtISvep(s27)!;
const alla = g26.length === 1;
const ah26 = K.allaHelgonsDag(2026), ah27 = K.allaHelgonsDag(2027);

export default defineGuide({
  id: 'hostlov-2026', group: 'lov', order: 30, tool: 'lov', toolArg: { typ: 'hostlov2026', kommun: 'stockholm' },
  related: ['jullov-2026', 'sportlov-2027', 'skollov-2027', 'alla-helgons-dag-2026'],
  sources: ['skolforordning', 'kommun-goteborg', 'kommun-boras', 'kommun-stockholm'],
  sv: {
    slug: 'hostlov-2026', nav: 'Höstlov 2026', card: 'Höstlovet vecka 44 i 24 kommuner, och 2027',
    title: 'Höstlov 2026 och 2027: datum och vecka i 24 kommuner',
    description: 'Höstlov 2026 är vecka 44 i alla 24 kommuner vi följer. Se datumen per kommun, vilka som redan beslutat om höstlovet 2027 och vad ett läslov betyder för er.',
    h1: 'Höstlov 2026 och 2027',
    intro: `Höstlovet ${alla ? 'ligger i samma vecka i alla' : 'skiljer sig mellan'} de ${K.KOMMUNER.length} kommuner vi följer: vecka ${vk(s26)}, ${per(s26, 'sv')}.`,
    resume: `Höstlovet 2026 är vecka ${vk(s26)}, från måndagen den ${dLong(s26[0], 'sv')} till fredagen den ${dLong(s26[1], 'sv')}, i ${alla ? `alla ${K.KOMMUNER.length}` : n(g26[0].ks.length, 'sv')} kommuner som vi har kontrollerat, från Malmö till Luleå. Med helgerna runt omkring blir barnen lediga i nio dagar, ${dLong(svep26[0], 'sv')} till ${dLong(svep26[1], 'sv')}, och alla helgons dag den ${dLong(ah26, 'sv')} infaller mitt i den perioden. Ingen lag bestämmer lovet: skolförordningen kräver bara lovdagar under läsåret och låter kommunen lägga ut dem. Flera kommuner kallar veckan läslov, och några räknar en del av dagarna som studiedagar för personalen, men för eleverna är hela veckan ledig. Den som vill vara hemma behöver ${semFor(s26)} semesterdagar. Höstlovet 2027 har ${n(p27.length, 'sv')} av kommunerna redan beslutat, alla till vecka ${vk(s27)}; för ${n(e27.length, 'sv')} är det inte publicerat än.`,
    faqs: [
      { q: 'Vilken vecka är höstlovet 2026?', a: `Vecka ${vk(s26)}, ${per(s26, 'sv')}, i ${alla ? 'samtliga' : 'de flesta av'} de ${K.KOMMUNER.length} kommuner vi följer. Veckan är praxis i nästan hela landet, men det är varje kommun som beslutar. Bor du i en annan kommun eller går barnet i en fristående skola gäller huvudmannens eget läsårsbeslut.` },
      { q: 'Vad är skillnaden mellan läslov och höstlov 2026?', a: 'Ingen för eleverna. Göteborg, Malmö, Umeå, Huddinge och Västerås kallar höstlovet läslov för att uppmuntra läsning under ledigheten. I Göteborg är måndagen den 26 oktober formellt en stängningsdag då både skola och fritids har stängt, och läslovet är tisdag till fredag. Barnen är alltså lediga hela veckan.' },
      { q: 'Är höstlovet 2027 redan bestämt?', a: `I ${n(p27.length, 'sv')} av de ${K.KOMMUNER.length} kommunerna, däribland ${namn(p27.slice(0, 4), 'sv')}: där ligger det ${per(s27, 'sv')}, vecka ${vk(s27)}. ${namn(e27, 'sv')} har inte publicerat läsåret 2027/28 ännu. Vi lägger in datumen först när kommunen själv har publicerat dem.` },
      { q: 'Hur många semesterdagar går åt för att vara ledig under höstlovet 2026?', a: `${semFor(s26)} dagar, måndag till fredag. Höstlovsveckan har inga röda dagar, eftersom alla helgons dag alltid är en lördag. Två föräldrar kan också dela på veckan. Med helgerna före och efter blir det nio dagar i rad, från ${dWeek(svep26[0], 'sv')} till ${dWeek(svep26[1], 'sv')}.` },
    ],
    body: (h) => `<h2>Datumen kommun för kommun</h2>
<p>Tabellen överst listar de ${K.KOMMUNER.length} kommunerna med länk till respektive läsårsbeslut. Vi har läst varje kommuns egen sida den ${dLong(K.LOV_LASDATUM, 'sv')}. För höstlovet 2026 är bilden ovanligt enkel: alla ligger i vecka ${vk(s26)}. Det beror inte på någon nationell regel. ${h.src('skolforordning', 'Skolförordningen')} säger bara att läsåret ska ha minst ${K.P.skola.skoldagar} skoldagar och ${K.P.skola.lovdagar} lovdagar och att huvudmannen bestämmer när terminerna börjar och slutar. Att vecka 44 har blivit standard är en tradition som går tillbaka till det gamla potatislovet, när barnen behövdes vid skörden.</p>
<h2>Ord som skiljer sig, en ledighet som är densamma</h2>
<p>Kommunerna beskriver veckan på olika sätt. I ${h.src('kommun-goteborg', 'Göteborg')} heter det läslov, och måndagen räknas som stängningsdag. I ${h.src('kommun-boras', 'Borås')} är måndag till onsdag kompetensutvecklingsdagar för lärarna och bara torsdag och fredag formella lovdagar. Gävle lägger två studiedagar i början av veckan, och Örebro har en jourdag på måndagen för den som behöver omsorg. Jönköping och Södertälje anger bara veckonumret; måndag till fredag är vår tolkning. För familjen spelar det sällan roll, men fritidshemmet kan vara stängt på stängnings- och studiedagar, så kontrollera med förskolan eller fritids om du behöver omsorg.</p>
${h.mini('sd', { p: ['dag', 'langd'], d: { ar: 2027, man: 10, dag: 30, langd: 9 }, c: 'Räkna semesterdagar för höstlovet 2027' })}
<h2>Höstlovet 2027: vecka ${vk(s27)} där det är beslutat</h2>
<p>${h.table(['Kommun', 'Höstlov 2027'], K.KOMMUNER.map((k) => [k.name, per(K.lov(k, 'hostlov2027'), 'sv')]), 'Höstlov 2027 enligt kommunernas publicerade läsårstider')}</p>
<p>Där beslutet finns ligger lovet ${per(s27, 'sv')}. Med helgerna blir det ledigt från ${dLong(svep27[0], 'sv')} till ${dLong(svep27[1], 'sv')}, och alla helgons dag den ${dLong(ah27, 'sv')} hamnar på den sista lördagen. Göteborg har även här en stängningsdag på måndagen. För övriga kommuner skriver vi inte in något förrän läsåret 2027/28 är publicerat; Halmstad och Umeå har aviserat sina beslut till slutet av 2026.</p>
<h2>Planera jobbet runt lovet</h2>
<p>Semesterlagen ger dig rätt till minst ${K.P.semester.dagar} dagar, men inte rätt att välja vilka: ${h.src('semesterlag', 'semesterlagen')} låter arbetsgivaren lägga ut semestern efter samråd. En höstlovsvecka kostar fem dagar och ger nio dagar ledigt. Det är samma utdelning som vilken vanlig vecka som helst, så klämdagar gör den inte billigare. Två föräldrar kan dela veckan, två och en halv dag var, eller använda kompledighet. Vill du jämföra med ledigheter som ger mer per semesterdag, se ${h.a('home', 'klämdagar 2027')}. Nästa lov är ${h.a('jullov-2026', 'jullovet')}, och hela läsåret finns under ${h.a('skollov-2027', 'skollov 2027')}.</p>`,
  },
  en: {
    slug: 'autumn-break-2026', nav: 'Autumn break 2026', card: 'The week-44 school break in 24 municipalities',
    title: 'Autumn Break 2026 and 2027: Week 44 in 24 Municipalities',
    description: 'The 2026 autumn school break (höstlov) is week 44 in all 24 municipalities we follow. Dates per municipality, which have set 2027, and what "läslov" means.',
    h1: 'Autumn school break 2026 and 2027',
    intro: `The autumn break ${alla ? 'falls in the same week in all' : 'differs between'} the ${K.KOMMUNER.length} municipalities we follow: week ${vk(s26)}, ${per(s26, 'en')}.`,
    resume: `The 2026 autumn break, höstlov, is week ${vk(s26)}: Monday ${dLong(s26[0], 'en')} to Friday ${dLong(s26[1], 'en')}, in ${alla ? `all ${K.KOMMUNER.length}` : n(g26[0].ks.length, 'en')} municipalities we checked, from Malmö in the south to Luleå in the north. Counting the weekends, children are off for nine days, ${dLong(svep26[0], 'en')} to ${dLong(svep26[1], 'en')}, and All Saints' Day on ${dLong(ah26, 'en')} falls in the middle. No statute fixes the date: the Education Ordinance only requires holiday days in the school year and leaves their placing to the municipality. Several municipalities call the week a reading break, läslov, and some count a few days as staff training days, yet pupils have the whole week off. A parent who wants to stay at home needs ${semFor(s26)} leave days. For 2027, ${n(p27.length, 'en')} of the municipalities have already decided, all on week ${vk(s27)}; ${n(e27.length, 'en')} have not published yet.`,
    faqs: [
      { q: 'Which week is the autumn school break in 2026?', a: `Week ${vk(s26)}, ${per(s26, 'en')}, in ${alla ? 'every one' : 'most'} of the ${K.KOMMUNER.length} municipalities we follow. The week is customary across almost the whole country, but each municipality decides. If you live elsewhere, or your child attends an independent school, the organiser's own school-year decision applies.` },
      { q: 'What is the difference between läslov and höstlov in 2026?', a: 'None for pupils. Gothenburg, Malmö, Umeå, Huddinge and Västerås call the autumn break läslov, a reading break, to encourage reading. In Gothenburg, Monday 26 October is formally a closure day when both school and after-school care are shut, and the reading break runs Tuesday to Friday. Children are off all week.' },
      { q: 'Has the 2027 autumn break been set yet?', a: `In ${n(p27.length, 'en')} of the ${K.KOMMUNER.length} municipalities, including ${namn(p27.slice(0, 4), 'en')}: there it runs ${per(s27, 'en')}, week ${vk(s27)}. ${namn(e27, 'en')} have not published the 2027/28 school year yet. We add dates only once the municipality itself has published them.` },
      { q: 'How many leave days cover the 2026 autumn break?', a: `${semFor(s26)} days, Monday to Friday. The week has no public holiday, because All Saints' Day is always a Saturday. Two parents can also split the week. With the weekends before and after you get nine days in a row, from ${dWeek(svep26[0], 'en')} to ${dWeek(svep26[1], 'en')}.` },
    ],
    body: (h) => `<h2>The dates, municipality by municipality</h2>
<p>The table at the top lists the ${K.KOMMUNER.length} municipalities with a link to each school-year decision. We read every municipality's own page on ${dLong(K.LOV_LASDATUM, 'en')}. For the 2026 autumn break the picture is unusually simple: all of them use week ${vk(s26)}. That is not a national rule. The ${h.src('skolforordning', 'Education Ordinance')} only says the school year must contain at least ${K.P.skola.skoldagar} school days and ${K.P.skola.lovdagar} holiday days and that the organiser decides when terms begin and end. Week 44 became the norm through tradition, going back to the old potato break when children were needed for the harvest.</p>
<h2>Different words, the same week off</h2>
<p>Municipalities describe the week in different ways. In ${h.src('kommun-goteborg', 'Gothenburg')} it is a reading break, and the Monday counts as a closure day. In ${h.src('kommun-boras', 'Borås')} Monday to Wednesday are professional development days for teachers and only Thursday and Friday are formal holiday days. Gävle places two study days at the start of the week, and Örebro keeps a duty day on the Monday for families who need care. Jönköping and Södertälje give only the week number; Monday to Friday is our reading of it. For families this rarely matters, but after-school care may be closed on closure and study days, so check with the school if you need childcare.</p>
${h.mini('sd', { p: ['dag', 'langd'], d: { ar: 2027, man: 10, dag: 30, langd: 9 }, c: 'Count leave days for the 2027 autumn break' })}
<h2>The 2027 autumn break: week ${vk(s27)} where decided</h2>
<p>${h.table(['Municipality', 'Autumn break 2027'], K.KOMMUNER.map((k) => [k.name, per(K.lov(k, 'hostlov2027'), 'en')]), 'Autumn break 2027 as published by each municipality')}</p>
<p>Where a decision exists, the break runs ${per(s27, 'en')}. With the weekends you are off from ${dLong(svep27[0], 'en')} to ${dLong(svep27[1], 'en')}, and All Saints' Day on ${dLong(ah27, 'en')} lands on the final Saturday. Gothenburg again has a closure day on the Monday. For the other municipalities we enter nothing until the 2027/28 school year is published; Halmstad and Umeå have announced their decisions for late 2026.</p>
<h2>Planning work around the break</h2>
<p>The ${h.src('semesterlag', 'Annual Leave Act')} gives you at least ${K.P.semester.dagar} days but not the right to choose them: your employer places leave after consulting you. An autumn-break week costs five days and gives nine days off, the same ratio as any ordinary week, so there is no bridge-day bonus here. Two parents can split it, two and a half days each, or use time off in lieu. To compare with breaks that give more per leave day, see ${h.a('home', 'bridge days 2027')}. The next break is ${h.a('jullov-2026', 'Christmas')}, and the whole school year is on ${h.a('skollov-2027', 'school holidays 2027')}.</p>`,
  },
});
