/** Påsklov 2027 : semaine 12, 13 ou à cheval, selon la kommun. Påsk 2027 tombe le 28 mars. Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, rd, plus } from '../_lib';
import { grupper, namn, per, semFor, kort } from './_lov';
import type { Span } from '../../lib/engine/lov';

const Y = 2027, pd = K.paskdagen(Y);
const lf = rd('langfredagen', Y), ap = rd('annandag-pask', Y), st = plus(pd, -3);
const g = grupper('pasklov2027');
/** Ledigt i ett svep : étend sur weekends, röda dagar et aftnar. */
const iRad = (s: Span): [string, string] => { let a = s![0], b = s![1]; while (!K.arVardag(plus(a, -1))) a = plus(a, -1); while (!K.arVardag(plus(b, 1))) b = plus(b, 1); return [a, b]; };
const fore = g.filter((x) => x.s![1] <= ap && x.s![0] < lf);
const efter = g.filter((x) => x.s![0] >= ap);
const over = g.filter((x) => !fore.includes(x) && !efter.includes(x));
const ks = (xs: typeof g) => xs.flatMap((x) => x.ks);
const vanl = g.reduce((a, b) => (b.ks.length > a.ks.length ? b : a));
const vr = iRad(vanl.s);

export default defineGuide({
  id: 'pasklov-2027', group: 'lov', order: 34, tool: 'lov', toolArg: { typ: 'pasklov2027', kommun: 'malmo' },
  related: ['pask-2027', 'sportlov-2027', 'sommarlov-2027', 'roda-dagar-2027'],
  sources: ['skolforordning', 'semesterlag', 'helgdagslag', 'kommun-malmo', 'kommun-orebro', 'kommun-taby', 'kommun-eskilstuna'],
  sv: {
    slug: 'pasklov-2027', nav: 'Påsklov 2027', card: 'Före, efter eller runt påsk: veckan i din kommun',
    title: 'Påsklov 2027: vecka 12 eller 13, datum för 24 kommuner',
    description: 'Påsklov 2027: påskdagen är 28 mars, och kommunerna lägger lovet före, efter eller runt påsk. Se datumen i 24 kommuner och hur många semesterdagar som räcker.',
    h1: 'Påsklov 2027',
    intro: `Påskdagen ${Y} är den ${dLong(pd, 'sv')}. Därför delar sig kommunerna: några har lov veckan före påsk, de flesta veckan efter.`,
    resume: `Påsklovet är det lov där kommunerna skiljer sig mest i upplägg. ${Y} infaller påskdagen tidigt, den ${dLong(pd, 'sv')}, med långfredagen den ${dLong(lf, 'sv')} och annandag påsk den ${dLong(ap, 'sv')}. ${n(ks(efter).length, 'sv')} av de ${K.KOMMUNER.length} kommuner vi följer lägger lovet efter påsk, i vecka 13; vanligast är ${per(vanl.s, 'sv')}, som i Stockholm, Uppsala och Västerås. Med påskhelgen blir barnen där lediga från långfredagen till söndagen den ${dLong(vr[1], 'sv')}, tio dagar i rad. ${namn(ks(fore), 'sv')} har i stället lov veckan före påsk, i vecka 12, och ${namn(ks(over), 'sv')} lägger lovet runt påsken. I alla kommuner utom Eskilstuna räcker fyra semesterdagar för att täcka lovet, eftersom långfredagen och annandag påsk är röda dagar. Skärtorsdagen den ${dLong(st, 'sv')} är däremot en vanlig arbetsdag.`,
    faqs: [
      { q: 'Varför har Malmö och Stockholm påsklov olika veckor 2027?', a: `För att varje kommun bestämmer själv. Malmö har lov ${per(K.lov(K.kommun('malmo'), 'pasklov2027'), 'sv')}, veckan före påsk, och publicerade det som 22 till 28 mars. Stockholm har lov ${per(K.lov(K.kommun('stockholm'), 'pasklov2027'), 'sv')}, direkt efter annandag påsk. Båda varianterna ger ungefär lika lång ledighet tillsammans med påskhelgen.` },
      { q: 'Hur många semesterdagar behövs för påsklovet 2027?', a: `Fyra i nästan alla kommuner. Lovet är fyra vardagar plus en eller två röda dagar, och långfredagen och annandag påsk kostar ingen semester. I Eskilstuna, där lovet börjar redan på skärtorsdagen, går det åt ${semFor(K.lov(K.kommun('eskilstuna'), 'pasklov2027'))}. Tabellen nedan visar antalet för varje kommun.` },
      { q: 'Är skärtorsdagen 2027 ledig för skolbarnen?', a: `Bara där lovet börjar då. Skärtorsdagen, ${dWeek(st, 'sv')}, är ingen röd dag. I Eskilstuna ingår den i påsklovet, i Helsingborg och Lund är den sista lovdagen, och i Malmö och Örebro ligger den mitt i lovet. I kommuner med lov efter påsk är det en vanlig skoldag.` },
      { q: 'Stämmer Täbys påsklov 2027?', a: 'Täbys egen webbsida anger påsklov 29 mars till 2 april. I ett tidigare nämndunderlag stod 26 mars till 2 april, vilket i praktiken är samma ledighet eftersom 26 mars är långfredag och 29 mars annandag påsk. Vi visar kommunens sida, som är den aktuella uppgiften.' },
    ],
    body: (h) => `<h2>Påsklovet kommun för kommun</h2>
<p>${h.table(['Kommun', 'Påsklov', 'Ledigt i rad', 'Semesterdagar'], K.KOMMUNER.map((k) => { const s = K.lov(k, 'pasklov2027'); const r = iRad(s); return [k.name, per(s, 'sv'), `${kort(r[0], 'sv')} – ${kort(r[1], 'sv')}`, semFor(s)]; }), 'Påsklov 2027 med påskhelgen och semesterdagar enligt 3 a § semesterlagen', ['l', 'l', 'l', 'r'])}</p>
<p>Kolumnen ”Ledigt i rad” räknar in helger, långfredagen, påskafton, påskdagen och annandag påsk. Semesterdagarna följer ${h.src('semesterlag', 'semesterlagen')}, där röda dagar inte räknas. Datumen kommer från kommunernas läsårstider, lästa den ${dLong(K.LOV_LASDATUM, 'sv')}.</p>
<h2>Tre sätt att lägga lovet</h2>
<p><strong>Efter påsk.</strong> De flesta kommuner börjar lovet på tisdagen efter annandag påsk eller räknar annandagen som första lovdag. Södertälje och Jönköping anger bara vecka 13. <strong>Före påsk.</strong> Helsingborg och Lund har lov måndag till torsdag i vecka 12, och ${h.src('kommun-malmo', 'Malmö')} hela vecka 12 till och med långfredagen. ${h.src('kommun-orebro', 'Örebro')} har vecka 12 och annandag påsk, och dessutom en studiedag tisdagen den 30 mars. <strong>Runt påsk.</strong> Borås och Göteborg räknar från långfredagen till fredagen efter, ${h.src('kommun-eskilstuna', 'Eskilstuna')} från skärtorsdagen.</p>
${h.mini('bt', { p: ['sem'], d: { ar: Y, sem: 4 }, c: 'Se vad fyra semesterdagar ger 2027' })}
<h2>Därför är påsklovet så tidigt ${Y}</h2>
<p>Enligt lagen om allmänna helgdagar är påskdagen söndagen närmast efter den fullmåne som infaller på eller närmast efter den 21 mars, och ${Y} kommer den fullmånen tidigt. Påskdagen den ${dLong(pd, 'sv')} gör att påsklovet hamnar bara tre till fyra veckor efter sportlovet i många kommuner. ${Y + 1} infaller påskdagen den ${dLong(K.paskdagen(Y + 1), 'sv')}, och påsklovet flyttar med. Hur påsken räknas förklaras på ${h.a('pask-2027', 'påsk 2027')}.</p>
<h2>Fristående skolor och lokala avvikelser</h2>
<p>${h.src('skolforordning', 'Skolförordningen')} lämnar läsårets disposition åt huvudmannen. För en fristående skola är det skolan själv som bestämmer, och enskilda kommunala skolor kan lägga studiedagar i anslutning till lovet. Täby är ett exempel på hur uppgifterna kan skilja: ${h.src('kommun-taby', 'kommunens sida')} anger 29 mars till 2 april medan ett äldre nämndunderlag angav 26 mars. Lita på skolans eget besked om något skiljer sig från tabellen. Nästa lov är sommarlovet; se ${h.a('sommarlov-2027', 'sommarlov 2027')}.</p>`,
  },
  en: {
    slug: 'easter-break-2027', nav: 'Easter break 2027', card: 'Before, after or around Easter: your week',
    title: 'Easter Break 2027: Week 12 or 13 in 24 Municipalities',
    description: 'Easter school break 2027 in Sweden: Easter Sunday is 28 March, and municipalities place the break before, after or around it. Dates for 24 and the leave needed.',
    h1: 'Easter school break 2027',
    intro: `Easter Sunday ${Y} is ${dLong(pd, 'en')}. That splits the municipalities: some take the week before Easter, most the week after.`,
    resume: `The Easter break, påsklov, is where municipalities differ most in approach. In ${Y} Easter is early, on ${dLong(pd, 'en')}, with Good Friday on ${dLong(lf, 'en')} and Easter Monday on ${dLong(ap, 'en')}. ${n(ks(efter).length, 'en')} of the ${K.KOMMUNER.length} municipalities we follow place the break after Easter, in week 13; the most common dates are ${per(vanl.s, 'en')}, as in Stockholm, Uppsala and Västerås. Including the Easter weekend, children there are off from Good Friday to Sunday ${dLong(vr[1], 'en')}, ten days in a row. ${namn(ks(fore), 'en')} take the week before Easter instead, week 12, and ${namn(ks(over), 'en')} place the break around Easter. Everywhere except Eskilstuna, four leave days cover the break, since Good Friday and Easter Monday are public holidays. Maundy Thursday, ${dLong(st, 'en')}, is an ordinary working day, though.`,
    faqs: [
      { q: 'Why do Malmö and Stockholm have the Easter break in different weeks in 2027?', a: `Because each municipality decides for itself. Malmö's break is ${per(K.lov(K.kommun('malmo'), 'pasklov2027'), 'en')}, the week before Easter, published as 22 to 28 March. Stockholm's is ${per(K.lov(K.kommun('stockholm'), 'pasklov2027'), 'en')}, right after Easter Monday. Together with the Easter weekend both give roughly the same length of time off.` },
      { q: 'How many leave days does the 2027 Easter break take?', a: `Four in almost every municipality. The break is four weekdays plus one or two public holidays, and Good Friday and Easter Monday cost no leave. In Eskilstuna, where the break starts on Maundy Thursday, it takes ${semFor(K.lov(K.kommun('eskilstuna'), 'pasklov2027'))}. The table below gives the number for each municipality.` },
      { q: 'Is Maundy Thursday 2027 a day off school?', a: `Only where the break starts then. Maundy Thursday, ${dWeek(st, 'en')}, is not a public holiday. In Eskilstuna it is part of the Easter break, in Helsingborg and Lund it is the last day of the break, and in Malmö and Örebro it falls mid-break. Where the break is after Easter it is a normal school day.` },
      { q: 'Are the Täby Easter break dates for 2027 correct?', a: "Täby's own website gives the Easter break as 29 March to 2 April. An earlier committee paper said 26 March to 2 April, which in practice is the same time off, since 26 March is Good Friday and 29 March Easter Monday. We show the municipality's website, which is the current information." },
    ],
    body: (h) => `<h2>The Easter break, municipality by municipality</h2>
<p>${h.table(['Municipality', 'Easter break', 'Off in a row', 'Leave days'], K.KOMMUNER.map((k) => { const s = K.lov(k, 'pasklov2027'); const r = iRad(s); return [k.name, per(s, 'en'), `${kort(r[0], 'en')} – ${kort(r[1], 'en')}`, semFor(s)]; }), 'Easter break 2027 with the Easter weekend and leave days under section 3a of the Annual Leave Act', ['l', 'l', 'l', 'r'])}</p>
<p>"Off in a row" includes weekends, Good Friday, Holy Saturday, Easter Sunday and Easter Monday. Leave days follow the ${h.src('semesterlag', 'Annual Leave Act')}, under which public holidays do not count. Dates come from municipal school calendars read on ${dLong(K.LOV_LASDATUM, 'en')}.</p>
<h2>Three ways to place the break</h2>
<p><strong>After Easter.</strong> Most municipalities start the break on the Tuesday after Easter Monday, or count Easter Monday as its first day. Södertälje and Jönköping give only week 13. <strong>Before Easter.</strong> Helsingborg and Lund are off Monday to Thursday of week 12, and ${h.src('kommun-malmo', 'Malmö')} all of week 12 up to Good Friday. ${h.src('kommun-orebro', 'Örebro')} takes week 12 plus Easter Monday, with a study day on Tuesday 30 March as well. <strong>Around Easter.</strong> Borås and Gothenburg count from Good Friday to the following Friday, ${h.src('kommun-eskilstuna', 'Eskilstuna')} from Maundy Thursday.</p>
${h.mini('bt', { p: ['sem'], d: { ar: Y, sem: 4 }, c: 'See what four leave days give in 2027' })}
<h2>Why the break is so early in ${Y}</h2>
<p>Under the Public Holidays Act, Easter Sunday is the Sunday after the full moon falling on or next after 21 March, and in ${Y} that full moon comes early. With Easter Sunday on ${dLong(pd, 'en')}, the Easter break comes only three to four weeks after the sports break in many municipalities. In ${Y + 1} Easter Sunday is ${dLong(K.paskdagen(Y + 1), 'en')}, and the break moves with it. How Easter is calculated is explained on ${h.a('pask-2027', 'Easter 2027')}.</p>
<h2>Independent schools and local differences</h2>
<p>The ${h.src('skolforordning', 'Education Ordinance')} leaves the shape of the school year to the organiser. For an independent school the school itself decides, and individual municipal schools may add study days next to the break. Täby shows how sources can differ: ${h.src('kommun-taby', "the municipality's page")} gives 29 March to 2 April while an older committee paper said 26 March. Trust the school's own notice if anything differs from the table. The next break is summer; see ${h.a('sommarlov-2027', 'summer holidays 2027')}.</p>`,
  },
});
