/** Skollov 2027 : vue d'ensemble de l'année scolaire 2026/27 dans les 24 kommuner, cadre de la skolförordning, 2027/28. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, n } from '../_lib';
import { namn, publ, ejPubl, vk, per, semFor } from './_lov';
import type { LovTyp } from '../../lib/engine/lov';

const KORTA: LovTyp[] = ['hostlov2026', 'sportlov2027', 'pasklov2027'];
const summa = (k: (typeof K.KOMMUNER)[number], jul: boolean) => [...KORTA, ...(jul ? (['jullov2026'] as LovTyp[]) : [])].reduce((a, t) => a + semFor(K.lov(k, t)), 0);
const korta = K.KOMMUNER.map((k) => summa(k, false)), allt = K.KOMMUNER.map((k) => summa(k, true));
const minK = Math.min(...korta), maxK = Math.max(...korta), minA = Math.min(...allt), maxA = Math.max(...allt);
const over = allt.filter((x) => x > K.P.semester.dagar).length;
const fyra = (l: 'sv' | 'en') => `${e27.slice(0, 4).map((k) => k.name).join(', ')} ${l === 'sv' ? 'och' : 'and'} ${n(e27.length - 4, l)} ${l === 'sv' ? 'till' : 'more'}`;
const maxAks = K.KOMMUNER.filter((k) => summa(k, true) === maxA);
const p27 = publ('hostlov2027'), e27 = ejPubl('hostlov2027');
const S = K.kommun('stockholm');

export default defineGuide({
  id: 'skollov-2027', group: 'lov', order: 36, tool: 'lov', toolArg: { typ: 'hostlov2027', kommun: 'uppsala' },
  related: ['hostlov-2026', 'jullov-2026', 'sportlov-2027', 'pasklov-2027', 'sommarlov-2027'],
  sources: ['skolforordning', 'semesterlag', 'kommun-nacka', 'kommun-umea', 'kommun-lulea'],
  sv: {
    slug: 'skollov-2027', nav: 'Skollov 2027', card: 'Alla lov läsåret 2026/27 och vad som är klart för 2027/28',
    title: 'Skollov 2027: alla lov under läsåret 2026/27 i 24 kommuner',
    description: 'Skollov 2027: höstlov, jullov, sportlov, påsklov och sommarlov i 24 kommuner, med veckor, semesterdagar för att täcka loven och vad som är beslutat för 2027/28.',
    h1: 'Skollov 2027: läsåret i överblick',
    intro: `Här är alla lov under läsåret 2026/27 i ${K.KOMMUNER.length} kommuner på ett ställe, med länk till varje kommuns eget beslut.`,
    resume: `Läsåret 2026/27 har fem lov: höstlovet i vecka 44, jullovet, sportlovet i vecka 7 till 10, påsklovet runt påsken den ${dLong(K.paskdagen(2027), 'sv')} och sommarlovet från mitten av juni. Ingen central myndighet bestämmer datumen. Skolförordningen kräver bara minst ${K.P.skola.skoldagar} skoldagar och ${K.P.skola.lovdagar} lovdagar, att läsåret börjar i augusti och slutar i juni, och låter huvudmannen bestämma resten. Därför skiljer sig loven mellan kommunerna, mest jullovet och påsklovet. För en förälder som vill vara ledig under alla korta lov, alltså höst-, sport- och påsklovet, går det åt ${minK === maxK ? n(minK, 'sv') : `${n(minK, 'sv')} till ${n(maxK, 'sv')}`} semesterdagar. Räknar man in hela jullovet blir det ${n(minA, 'sv')} till ${n(maxA, 'sv')} dagar, i ${n(over, 'sv')} kommuner mer än lagens ${K.P.semester.dagar} semesterdagar, innan sommaren ens har börjat. Inför läsåret 2027/28 har ${n(p27.length, 'sv')} av kommunerna publicerat höstlovet; ${n(e27.length, 'sv')} har inte gjort det än.`,
    faqs: [
      { q: 'Vem bestämmer skolloven i Sverige 2027?', a: 'Huvudmannen. För kommunala skolor är det kommunen, oftast en nämnd för utbildning eller grundskola, och för fristående skolor skolans huvudman. Skolförordningen sätter bara ramarna: minst 178 skoldagar, minst 12 lovdagar och ett läsår från augusti till juni. Därför kan två grannkommuner ha lov olika veckor.' },
      { q: 'Hur många semesterdagar behövs för alla skollov läsåret 2026/27?', a: `För höst-, sport- och påsklovet ${minK === maxK ? n(minK, 'sv') : `${n(minK, 'sv')} till ${n(maxK, 'sv')}`} dagar beroende på kommun. Med hela jullovet ${n(minA, 'sv')} till ${n(maxA, 'sv')} dagar; mest i ${namn(maxAks, 'sv')}. Röda dagar och jul- och nyårsafton är redan avdragna enligt semesterlagen. Sommarlovet och eventuella studiedagar kommer utöver det.` },
      { q: 'Vilka kommuner har publicerat skolloven för läsåret 2027/28?', a: `${n(p27.length, 'sv')} av de ${K.KOMMUNER.length} vi följer, bland dem ${namn(p27.slice(0, 5), 'sv')}. Där är höstlovet 2027 vecka ${vk(K.lov(p27[0], 'hostlov2027'))}. ${fyra('sv')} har inte publicerat än. Verktyget ovan visar ”inte publicerat än” tills kommunen har beslutat.` },
      { q: 'Finns det fler lediga skoldagar än loven 2027?', a: 'Ja. Många kommuner har en lovdag fredagen den 7 maj 2027, dagen efter Kristi himmelsfärdsdag, och de flesta har studiedagar som varierar mellan skolor. Studiedagarna står sällan i kommunens gemensamma läsårstider. Fråga skolan, och kontrollera om fritidshemmet har öppet de dagarna.' },
    ],
    body: (h) => `<h2>Alla korta lov i en tabell</h2>
<p>${h.table(['Kommun', 'Höstlov v.', 'Jullov', 'Sportlov v.', 'Påsklov', 'Semesterdagar*'], K.KOMMUNER.map((k) => [k.name, String(vk(K.lov(k, 'hostlov2026'))), per(K.lov(k, 'jullov2026'), 'sv'), String(vk(K.lov(k, 'sportlov2027'))), per(K.lov(k, 'pasklov2027'), 'sv'), summa(k, true)]), '* Semesterdagar som täcker höst-, jul-, sport- och påsklovet, enligt 3 a § semesterlagen', ['l', 'r', 'l', 'r', 'l', 'r'])}</p>
<p>Alla uppgifter är lästa på kommunernas egna sidor den ${dLong(K.LOV_LASDATUM, 'sv')}. Semesterdagarna räknar bort helger, röda dagar och de aftnar som ${h.src('semesterlag', 'semesterlagen')} jämställer med söndag. Stockholm hamnar på ${summa(S, true)} dagar. Det visar varför få familjer kan täcka alla lov med en förälders semester: lagens ${K.P.semester.dagar} dagar räcker knappt till loven under hösten, vintern och våren.</p>
<h2>Ramarna i skolförordningen</h2>
<p>${h.src('skolforordning', 'Skolförordningen')} 3 kap. säger att läsåret ska ha minst ${K.P.skola.skoldagar} skoldagar och minst ${K.P.skola.lovdagar} lovdagar som ska förläggas till vardagar, och att läsåret börjar i augusti och slutar i juni. Resten bestämmer huvudmannen. Lovens namn är inte heller reglerade: flera kommuner kallar höstlovet läslov, och Växjö kallar sportlovet februarilov.</p>
${h.mini('kw', { p: ['v'], d: { ar: 2027, v: 9 }, c: 'Vilka datum har en viss vecka?' })}
<h2>Så läser du kommunens läsårstider</h2>
<p>Kommunerna publicerar oftast en tabell med terminsstart, lov och terminsslut. Några, som Jönköping och Södertälje, anger bara veckonummer; då är loven måndag till fredag i den veckan. Andra skiljer på lovdagar och studiedagar, som Borås under höstlovet. Ibland publiceras flera år i taget, som i ${h.src('kommun-nacka', 'Nacka')}, där sidan sträcker sig till läsåret 2029/30, ibland ett år åt gången: ${h.src('kommun-umea', 'Umeå')} beslutar läsåret 2027/28 i slutet av 2026, och ${h.src('kommun-lulea', 'Luleå')} har redan lagt sportlovet 2028 i vecka 10.</p>
<h2>Läsåret 2027/28</h2>
<p>${h.table(['Kommun', 'Höstlov 2027', 'Sportlov 2028'], K.KOMMUNER.map((k) => [k.name, per(K.lov(k, 'hostlov2027'), 'sv'), per(K.lov(k, 'sportlov2028'), 'sv')]), 'Beslutade lov för läsåret 2027/28')}</p>
<p>Detaljer per lov finns på ${h.a('hostlov-2026', 'höstlov')}, ${h.a('jullov-2026', 'jullov')}, ${h.a('sportlov-2027', 'sportlov')}, ${h.a('pasklov-2027', 'påsklov')} och ${h.a('sommarlov-2027', 'sommarlov')}. För att planera semestern kring loven, använd ${h.a('home', 'klämdagsplaneraren')}.</p>`,
  },
  en: {
    slug: 'school-holidays-2027', nav: 'School holidays 2027', card: 'Every break of 2026/27 and what is set for 2027/28',
    title: 'School Holidays 2027: 2026/27 Breaks in 24 Municipalities',
    description: 'School holidays 2027: autumn, Christmas, sports, Easter and summer breaks in 24 municipalities, with weeks, the leave they take and what is set for 2027/28.',
    h1: 'School holidays 2027: the school year at a glance',
    intro: `Every break of the 2026/27 school year in ${K.KOMMUNER.length} municipalities in one place, each linked to the municipality's own decision.`,
    resume: `The 2026/27 school year has five breaks: autumn in week 44, Christmas, the sports break in weeks 7 to 10, Easter around Easter Sunday on ${dLong(K.paskdagen(2027), 'en')}, and summer from mid-June. No national authority sets the dates. The Education Ordinance only requires at least ${K.P.skola.skoldagar} school days and ${K.P.skola.lovdagar} holiday days and a school year running from August to June, and leaves the rest to the organiser. That is why breaks differ between municipalities, Christmas and Easter most of all. A parent who wants to be off for all the short breaks, autumn, sports and Easter, needs ${minK === maxK ? n(minK, 'en') : `${n(minK, 'en')} to ${n(maxK, 'en')}`} leave days. Add the whole Christmas break and it comes to ${n(minA, 'en')} to ${n(maxA, 'en')} days, in ${n(over, 'en')} municipalities more than the statutory ${K.P.semester.dagar}, before summer has even begun. For 2027/28, ${n(p27.length, 'en')} of the municipalities have published the autumn break; ${n(e27.length, 'en')} have not yet.`,
    faqs: [
      { q: 'Who decides school holidays in Sweden in 2027?', a: 'The school organiser. For municipal schools that is the municipality, usually its education or compulsory-school committee, and for independent schools the school\'s own organiser. The Education Ordinance only sets the frame: at least 178 school days, at least 12 holiday days and a school year from August to June. So two neighbouring municipalities can have breaks in different weeks.' },
      { q: 'How many leave days cover every school break in 2026/27?', a: `For the autumn, sports and Easter breaks ${minK === maxK ? n(minK, 'en') : `${n(minK, 'en')} to ${n(maxK, 'en')}`} days depending on the municipality. With the whole Christmas break ${n(minA, 'en')} to ${n(maxA, 'en')} days, most in ${namn(maxAks, 'en')}. Public holidays and Christmas and New Year's Eve are already left out under the Annual Leave Act. The summer comes on top.` },
      { q: 'Which municipalities have published the 2027/28 school holidays?', a: `${n(p27.length, 'en')} of the ${K.KOMMUNER.length} we follow, including ${namn(p27.slice(0, 5), 'en')}. There the 2027 autumn break is week ${vk(K.lov(p27[0], 'hostlov2027'))}. ${fyra('en')} have not published yet. The tool above shows "not published yet" until the municipality decides.` },
      { q: 'Are there days off school in 2027 besides the breaks?', a: 'Yes. Many municipalities give Friday 7 May 2027, the day after Ascension Day, as a day off, and most have study days that vary from school to school. Study days rarely appear in the municipality\'s shared calendar. Ask the school, and check whether after-school care is open on those days.' },
    ],
    body: (h) => `<h2>All short breaks in one table</h2>
<p>${h.table(['Municipality', 'Autumn wk', 'Christmas', 'Sports wk', 'Easter', 'Leave days*'], K.KOMMUNER.map((k) => [k.name, String(vk(K.lov(k, 'hostlov2026'))), per(K.lov(k, 'jullov2026'), 'en'), String(vk(K.lov(k, 'sportlov2027'))), per(K.lov(k, 'pasklov2027'), 'en'), summa(k, true)]), '* Leave days covering the autumn, Christmas, sports and Easter breaks, under section 3a of the Annual Leave Act', ['l', 'r', 'l', 'r', 'l', 'r'])}</p>
<p>All data was read on the municipalities' own pages on ${dLong(K.LOV_LASDATUM, 'en')}. Leave days exclude weekends, public holidays and the eves the ${h.src('semesterlag', 'Annual Leave Act')} treats like Sundays. Stockholm comes to ${summa(S, true)} days. That shows why few families can cover every break with one parent's leave: the statutory ${K.P.semester.dagar} days barely stretch to the autumn, winter and spring breaks.</p>
<h2>The frame set by the Education Ordinance</h2>
<p>Chapter 3 of the ${h.src('skolforordning', 'Education Ordinance')} says the school year must have at least ${K.P.skola.skoldagar} school days and at least ${K.P.skola.lovdagar} holiday days on weekdays, starting in August and ending in June. The organiser decides the rest. Even the names are not regulated: several municipalities call the autumn break a reading break, and Växjö calls the sports break the February break.</p>
${h.mini('kw', { p: ['v'], d: { ar: 2027, v: 9 }, c: 'Which dates does a week cover?' })}
<h2>Reading a municipal school calendar</h2>
<p>Municipalities usually publish a table of term starts, breaks and term ends. Some, like Jönköping and Södertälje, give only week numbers; the break is then Monday to Friday of that week. Others separate holiday days from study days, as Borås does for the autumn break. Some publish several years at once, like ${h.src('kommun-nacka', 'Nacka')}, whose page runs to 2029/30, others one year at a time: ${h.src('kommun-umea', 'Umeå')} decides 2027/28 at the end of 2026, while ${h.src('kommun-lulea', 'Luleå')} has already put its 2028 sports break in week 10.</p>
<h2>The 2027/28 school year</h2>
<p>${h.table(['Municipality', 'Autumn break 2027', 'Sports break 2028'], K.KOMMUNER.map((k) => [k.name, per(K.lov(k, 'hostlov2027'), 'en'), per(K.lov(k, 'sportlov2028'), 'en')]), 'Breaks already decided for 2027/28')}</p>
<p>Details for each break are on ${h.a('hostlov-2026', 'autumn')}, ${h.a('jullov-2026', 'Christmas')}, ${h.a('sportlov-2027', 'sports')}, ${h.a('pasklov-2027', 'Easter')} and ${h.a('sommarlov-2027', 'summer')}. To plan your leave around the breaks, use the ${h.a('home', 'bridge-day planner')}.</p>`,
  },
});
