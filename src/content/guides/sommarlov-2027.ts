/** Sommarlov 2027 : seul le premier jour est connu (lendemain de la fin du VT) ; fin = rentrée HT 2027, propre à chaque kommun. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, plus } from '../_lib';
import { namn, kort } from './_lov';

const Y = 2027;
const slut = new Map<string, typeof K.KOMMUNER>();
for (const k of K.KOMMUNER) slut.set(k.vartermin_slut, [...(slut.get(k.vartermin_slut) ?? []), k]);
const dagar = [...slut.entries()].sort((a, b) => a[0].localeCompare(b[0]));
const tidig = dagar[0], sen = dagar[dagar.length - 1];
const vanl = dagar.reduce((a, b) => (b[1].length > a[1].length ? b : a));
const ma = K.midsommarafton(Y), nd = `${Y}-06-06`;
const fyra = K.semesterdagar(plus(ma, 3), plus(ma, 30));
const S = K.kommun('stockholm');

export default defineGuide({
  id: 'sommarlov-2027', group: 'lov', order: 35, tool: 'lov', toolArg: { typ: 'sommarlov2027', kommun: 'stockholm' },
  related: ['midsommar-2027', 'semesterdagar', 'pasklov-2027', 'skollov-2027'],
  sources: ['skolforordning', 'semesterlag', 'kommun-gavle', 'kommun-halmstad'],
  sv: {
    slug: 'sommarlov-2027', nav: 'Sommarlov 2027', card: 'Sista skoldagen före sommaren i 24 kommuner',
    title: 'Sommarlov 2027: sista skoldagen före sommaren i 24 kommuner',
    description: 'Sommarlov 2027: när vårterminen slutar i 24 kommuner, från tisdag 8 juni till tisdag 15 juni, och hur semesterlagens fyra sommarveckor kan läggas runt lovet.',
    h1: 'Sommarlov 2027',
    intro: `Sommarlovet ${Y} börjar dagen efter vårterminens sista skoldag. Den infaller mellan ${dWeek(tidig[0], 'sv')} och ${dWeek(sen[0], 'sv')}.`,
    resume: `Sommarlovet har inget eget datum: det börjar när vårterminen slutar och varar tills höstterminen börjar i augusti. ${Y} är vårterminens sista dag vanligast ${dWeek(vanl[0], 'sv')}, i ${n(vanl[1].length, 'sv')} av de ${K.KOMMUNER.length} kommuner vi följer, bland dem Göteborg och Uppsala. Stockholm, Malmö och sju andra kommuner slutar fredagen den ${dLong(S.vartermin_slut, 'sv')}. Tidigast är ${namn(tidig[1], 'sv')}, där sista skoldagen är ${dWeek(tidig[0], 'sv')}, och senast ${namn(sen[1], 'sv')}, ${dWeek(sen[0], 'sv')}. Nationaldagen den ${dLong(nd, 'sv')} är en söndag och ger ingen ledig skoldag. Midsommarafton är fredagen den ${dLong(ma, 'sv')}, två veckor in i lovet. Hur långt sommarlovet blir beror på när höstterminen 2027 börjar, och det har inte alla kommuner publicerat; därför visar vi bara första lovdagen. Semesterlagen ger en förälder rätt till fyra veckors sammanhängande semester under juni till augusti, vilket täcker knappt halva lovet.`,
    faqs: [
      { q: 'Vilken dag slutar skolan före sommarlovet 2027?', a: `Det beror på kommunen. Vanligast är ${dWeek(vanl[0], 'sv')}, därefter fredagen den ${dLong(S.vartermin_slut, 'sv')}, som i Stockholm och Malmö. ${namn(tidig[1], 'sv')} slutar redan ${dWeek(tidig[0], 'sv')} och ${namn(sen[1], 'sv')} ${dWeek(sen[0], 'sv')}. Tabellen nedan visar alla ${K.KOMMUNER.length} kommuner med respektive dag.` },
      { q: 'När börjar höstterminen 2027 efter sommarlovet?', a: 'Det har varje kommun eller huvudman bestämt eller bestämmer separat, oftast till mitten av augusti. Eftersom inte alla kommuner i vår sammanställning har publicerat höstterminen 2027 visar vi inte sommarlovets sista dag. Kommunernas läsårstider, som tabellen överst länkar till, har uppgiften när den finns.' },
      { q: 'Hur mycket semester behövs för att täcka sommarlovet 2027?', a: `Mer än de flesta har. Lovet är omkring tio veckor, medan semesterlagen ger minst ${K.P.semester.dagar} dagar, fem veckor, per år. Fyra veckor efter midsommar, ${kort(plus(ma, 3), 'sv')} till ${kort(plus(ma, 30), 'sv')}, kostar ${fyra.sem} semesterdagar. Två föräldrar som tar semester vid olika tider täcker mer av lovet.` },
    ],
    body: (h) => `<h2>Sista skoldagen i varje kommun</h2>
<p>${h.table(['Sista skoldag', 'Första lovdag', 'Kommuner'], dagar.map(([d, ks]) => [dWeek(d, 'sv'), kort(plus(d, 1), 'sv'), namn(ks, 'sv')]), 'Vårterminens slut 2027 enligt kommunernas läsårstider')}</p>
<p>${h.src('kommun-halmstad', 'Halmstad')} sticker ut med sista skoldag en tisdag, den ${dLong(sen[0], 'sv')}, och ${h.src('kommun-gavle', 'Gävle')} slutar också en tisdag men en vecka tidigare. De flesta andra kommuner slutar på en torsdag eller fredag. Datumen är lästa på kommunernas egna sidor den ${dLong(K.LOV_LASDATUM, 'sv')}. Enligt ${h.src('skolforordning', 'skolförordningen')} ska läsåret sluta i juni, men exakt vilken dag bestämmer huvudmannen.</p>
<h2>Juni före midsommar</h2>
<p>De första veckorna av lovet rymmer inga röda dagar på vardagar. Nationaldagen infaller på en söndag ${Y}, och midsommarafton, ${dWeek(ma, 'sv')}, är ingen helgdag men räknas enligt semesterlagen inte som semesterdag. Den som tar semester måndag till torsdag veckan före midsommar får nio dagar ledigt för fyra semesterdagar. För många föräldrar blir midsommarveckan därför starten på sommarsemestern; mer om helgen på ${h.a('midsommar-2027', 'midsommar 2027')}.</p>
${h.mini('sd', { p: ['dag', 'langd'], d: { ar: Y, man: 6, dag: 28, langd: 28 }, c: 'Räkna semesterdagar för sommaren' })}
<h2>Semesterlagens fyra sommarveckor</h2>
<p>${h.src('semesterlag', 'Semesterlagen')} ger dig rätt till minst fyra veckors sammanhängande semester under juni, juli och augusti, om inte annat har avtalats. Arbetsgivaren bestämmer förläggningen efter förhandling eller samråd och ska meddela beslutet senast två månader i förväg. För sommaren ${Y} betyder det att du bör ha besked i april. Lovet är betydligt längre än fyra veckor, så de flesta familjer kombinerar två föräldrars semester, fritidshem och annan omsorg. Fritidshemmet har ofta öppet en del av sommaren men med andra tider; fråga skolan.</p>
<h2>Varför vi inte visar sommarlovets slut</h2>
<p>Sista lovdagen är dagen före höstterminens start ${Y}. Några kommuner har publicerat läsåret 2027/28, andra inte. Hellre än att gissa visar verktyget ovan bara den första lovdagen och vårterminens slut. Hela läsåret med alla lov finns på ${h.a('skollov-2027', 'skollov 2027')}, och semesterdagar för valfri period räknar du på ${h.a('semesterdagar', 'semesterdagar')}.</p>`,
  },
  en: {
    slug: 'summer-holidays-2027', nav: 'Summer holidays 2027', card: 'Last school day before summer in 24 municipalities',
    title: 'Summer Holidays 2027: Last School Day in 24 Municipalities',
    description: 'School summer holidays 2027: when the spring term ends in 24 municipalities, from Tuesday 8 to Tuesday 15 June, and how four weeks of summer leave fit.',
    h1: 'School summer holidays 2027',
    intro: `The ${Y} summer holidays start the day after the last day of the spring term, which falls between ${dWeek(tidig[0], 'en')} and ${dWeek(sen[0], 'en')}.`,
    resume: `The summer holidays, sommarlov, have no date of their own: they start when the spring term ends and last until the autumn term begins in August. In ${Y} the spring term most often ends on ${dWeek(vanl[0], 'en')}, in ${n(vanl[1].length, 'en')} of the ${K.KOMMUNER.length} municipalities we follow, Gothenburg and Uppsala among them. Stockholm, Malmö and seven others finish on Friday ${dLong(S.vartermin_slut, 'en')}. Earliest is ${namn(tidig[1], 'en')}, with the last school day on ${dWeek(tidig[0], 'en')}, and latest ${namn(sen[1], 'en')}, on ${dWeek(sen[0], 'en')}. National Day on ${dLong(nd, 'en')} is a Sunday and gives no day off school. Midsummer Eve is Friday ${dLong(ma, 'en')}, two weeks into the holidays. How long the summer lasts depends on when the 2027 autumn term starts, which not every municipality has published, so we show only the first day off. The Annual Leave Act entitles a parent to four consecutive weeks of leave between June and August, covering less than half of the break.`,
    faqs: [
      { q: 'What is the last school day before the 2027 summer holidays?', a: `It depends on the municipality. Most common is ${dWeek(vanl[0], 'en')}, then Friday ${dLong(S.vartermin_slut, 'en')}, as in Stockholm and Malmö. ${namn(tidig[1], 'en')} finishes on ${dWeek(tidig[0], 'en')} and ${namn(sen[1], 'en')} on ${dWeek(sen[0], 'en')}. The table lists all ${K.KOMMUNER.length} municipalities.` },
      { q: 'When does the autumn term start after the 2027 summer holidays?', a: 'Each municipality or school organiser decides that separately, usually for mid-August. Because not every municipality in our list has published its 2027 autumn term, we do not show the last day of the summer holidays. The municipal school calendars linked from the table at the top carry the date once it exists.' },
      { q: 'How much leave covers the 2027 summer holidays?', a: `More than most people have. The break is around ten weeks, while the Annual Leave Act gives at least ${K.P.semester.dagar} days, five weeks, a year. Four weeks after Midsummer, ${kort(plus(ma, 3), 'en')} to ${kort(plus(ma, 30), 'en')}, cost ${fyra.sem} leave days. Two parents taking leave at different times cover more of the break.` },
    ],
    body: (h) => `<h2>Last school day in each municipality</h2>
<p>${h.table(['Last school day', 'First day off', 'Municipalities'], dagar.map(([d, ks]) => [dWeek(d, 'en'), kort(plus(d, 1), 'en'), namn(ks, 'en')]), 'End of the 2027 spring term from municipal school calendars')}</p>
<p>${h.src('kommun-halmstad', 'Halmstad')} stands out with a last school day on a Tuesday, ${dLong(sen[0], 'en')}, and ${h.src('kommun-gavle', 'Gävle')} also ends on a Tuesday, a week earlier. Most others finish on a Thursday or Friday. The dates were read on each municipality's own pages on ${dLong(K.LOV_LASDATUM, 'en')}. Under the ${h.src('skolforordning', 'Education Ordinance')} the school year must end in June, but the exact day is up to the organiser.</p>
<h2>June before Midsummer</h2>
<p>The first weeks of the break contain no weekday public holiday. National Day falls on a Sunday in ${Y}, and Midsummer Eve, ${dWeek(ma, 'en')}, is not a public holiday but does not count as a leave day under the Annual Leave Act. Taking Monday to Thursday off in Midsummer week gives nine days off for four leave days. For many parents that week becomes the start of the summer holiday; more on ${h.a('midsommar-2027', 'Midsummer 2027')}.</p>
${h.mini('sd', { p: ['dag', 'langd'], d: { ar: Y, man: 6, dag: 28, langd: 28 }, c: 'Count leave days for the summer' })}
<h2>The four summer weeks in the Annual Leave Act</h2>
<p>The ${h.src('semesterlag', 'Annual Leave Act')} entitles you to at least four consecutive weeks of leave in June, July and August unless otherwise agreed. Your employer decides the timing after negotiation or consultation and must tell you at least two months ahead. For summer ${Y} that means you should know by April. The school break is much longer than four weeks, so most families combine two parents' leave, after-school care and other childcare. After-school care is often open for part of the summer with different hours; ask the school.</p>
<h2>Why we do not show the end of the summer break</h2>
<p>The last day off is the day before the ${Y} autumn term starts. Some municipalities have published the 2027/28 school year, others have not. Rather than guess, the tool above shows only the first day off and the end of the spring term. The whole school year with every break is on ${h.a('skollov-2027', 'school holidays 2027')}, and you can count leave days for any period on ${h.a('semesterdagar', 'annual leave days')}.</p>`,
  },
});
