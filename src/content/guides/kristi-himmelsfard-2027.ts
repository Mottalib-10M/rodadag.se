/** Kristi himmelsfärd 2027 : jeudi 6 mai, seule klämdag de l'année (vendredi 7 mai) ; pingst 16 mai. Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, rd, plus, vecka } from '../_lib';

const Y = 2027;
const kh = rd('kristi-himmelsfard', Y), kl = plus(kh, 1), pd = rd('pingstdagen', Y), os = K.paskdagen(Y);
const fm = rd('forsta-maj', Y);
const vecka18 = K.semesterdagar(plus(kh, -3), kl);
const kh26 = rd('kristi-himmelsfard', Y - 1), kh28 = rd('kristi-himmelsfard', Y + 1);
const klamAr = K.klamdagar(Y, { aftnar: true }).length;

export default defineGuide({
  id: 'kristi-himmelsfard-2027', group: 'hogtider', order: 21, tool: 'kh', toolArg: { ar: Y },
  related: ['pask-2027', 'nationaldagen-2027', 'home', 'roda-dagar-2027'],
  sources: ['helgdagslag', 'semesterlag', 'pask-ptb'],
  sv: {
    slug: 'kristi-himmelsfard-2027', nav: 'Kristi himmelsfärd 2027', card: 'Kristi himmelsfärdsdag, klämdagen och pingst 2027',
    title: 'Kristi himmelsfärd 2027: torsdag 6 maj och årets klämdag',
    description: 'Kristi himmelsfärdsdag 2027 är torsdagen den 6 maj. Fredagen efter blir årets enda äkta klämdag. Se även pingstdagen, varför annandag pingst inte är röd dag.',
    h1: 'Kristi himmelsfärd 2027',
    intro: `Kristi himmelsfärdsdag ${Y} infaller torsdagen den ${dLong(kh, 'sv')}, och fredagen efter är årets mest eftertraktade klämdag.`,
    resume: `Kristi himmelsfärdsdag är alltid en torsdag, eftersom den infaller 39 dagar efter påskdagen. ${Y} är påskdagen tidig, den ${dLong(os, 'sv')}, och därför kommer Kristi himmelsfärd redan den ${dLong(kh, 'sv')}, i vecka ${vecka(kh)}. Fredagen den ${dLong(kl, 'sv')} blir då en klämdag: en semesterdag ger fyra lediga dagar från torsdag till söndag. ${Y} är den dessutom årets ${klamAr === 1 ? 'enda' : 'första'} äkta klämdag, eftersom första maj infaller på en lördag och nationaldagen på en söndag. Pingstdagen följer tio dagar senare, söndagen den ${dLong(pd, 'sv')}. Annandag pingst är en vanlig arbetsdag sedan 2005, då den ersattes av nationaldagen som röd dag. Vill du vara ledig hela vecka ${vecka(kh)} kostar det ${n(vecka18.sem, 'sv')} semesterdagar och ger nio dagar ledigt från lördagen den ${dLong(fm, 'sv')}.`,
    faqs: [
      { q: 'Vilket datum är Kristi himmelsfärdsdag 2027?', a: `Torsdagen den ${dLong(kh, 'sv')}. Lagen om allmänna helgdagar anger att Kristi himmelsfärdsdag är sjätte torsdagen efter påskdagen, alltså 39 dagar efter den. Eftersom påskdagen ${Y} är den ${dLong(os, 'sv')} hamnar himmelsfärden ovanligt tidigt i maj, året före var den ${dLong(kh26, 'sv')}.` },
      { q: 'Är fredagen efter Kristi himmelsfärd 2027 ledig?', a: `Inte enligt lag. Fredagen den ${dLong(kl, 'sv')} är en vanlig arbetsdag, en så kallad klämdag. Många arbetsgivare och kollektivavtal ger ledigt eller kortare dag, och andra låter personalen ta en semesterdag. Med en semesterdag blir du ledig fyra dagar i rad.` },
      { q: 'Varför är annandag pingst inte röd dag längre?', a: 'När Sveriges nationaldag den 6 juni blev allmän helgdag ändrades lagen om allmänna helgdagar genom SFS 2004:1320. Samtidigt ströks annandag pingst, så att antalet helgdagar blev detsamma. Ändringen gäller sedan 2005. Pingstdagen är fortfarande helgdag men infaller alltid på en söndag.' },
      { q: 'När är Kristi himmelsfärd 2028?', a: `${Y + 1} infaller Kristi himmelsfärdsdag torsdagen den ${dLong(kh28, 'sv')}, eftersom påskdagen det året är sent, den ${dLong(K.paskdagen(Y + 1), 'sv')}. Klämdagen blir då fredagen den ${dLong(plus(kh28, 1), 'sv')}. Samma år blir även måndagen före nationaldagen en klämdag, eftersom den 6 juni är en tisdag. Tabellen i verktyget visar datumen flera år framåt.` },
    ],
    body: (h) => `<h2>Hur datumet räknas</h2>
<p>${h.src('helgdagslag', '2 § lagen om allmänna helgdagar')} bestämmer att Kristi himmelsfärdsdag är sjätte torsdagen efter påskdagen och pingstdagen sjunde söndagen efter påskdagen. I dagar räknat blir det 39 respektive 49 dagar. Påskdagen räknar vi med ${h.src('pask-ptb', 'Gauss påskformel')}, så alla tre datumen hänger ihop. Verktyget ovan visar datumen för ${Y} och sju år framåt.</p>
<p>Eftersom påskdagen kan infalla mellan 22 mars och 25 april kan Kristi himmelsfärdsdag ligga mellan 30 april och 3 juni. ${Y} ligger den tidigt, den ${dLong(kh, 'sv')}, bara fem dagar efter första maj.</p>
<h2>Klämdagen och veckan</h2>
<p>Fredagen efter Kristi himmelsfärd är den klassiska svenska klämdagen. Den är en vanlig vardag enligt lagen, och vill du vara ledig behövs en semesterdag, en kompledighet eller ett avtal. ${Y} blir den extra värdefull, eftersom de flesta andra röda dagar under våren och sommaren hamnar på helger.</p>
<p>Första maj infaller på en lördag, så hela vecka ${vecka(kh)} från måndag till fredag innehåller bara en röd dag. Tar du semester de fyra arbetsdagarna, ${dLong(plus(kh, -3), 'sv')} till ${dLong(plus(kh, -1), 'sv')} och fredagen, kostar det ${n(vecka18.sem, 'sv')} semesterdagar enligt ${h.src('semesterlag', 'semesterlagen')} och du får nio dagar ledigt. Planeraren för ${h.a('home', 'klämdagar 2027')} väger den bron mot årets övriga.</p>
${h.mini('os', { d: { ar: Y }, c: 'Se påskens datum och Gauss formel' })}
<h2>Pingst ${Y}</h2>
<p>Pingstdagen infaller söndagen den ${dLong(pd, 'sv')} och pingstafton dagen före. Ingen av dem påverkar arbetsveckan. Annandag pingst, måndagen den ${dLong(plus(pd, 1), 'sv')}, är en vanlig arbetsdag sedan nationaldagen blev röd dag. Nationaldagen själv infaller på en söndag ${Y}; mer om det under ${h.a('nationaldagen-2027', 'nationaldagen 2027')}.</p>
<p>För skolan är Kristi himmelsfärdsdag en lovdag som alla andra röda dagar, och fredagen efter kan vara en lovdag eller en studiedag. Det beslutar varje huvudman själv inom skolförordningens ramar, så kontrollera din kommuns läsårstider innan du planerar en långhelg med barnen.</p>`,
  },
  en: {
    slug: 'ascension-day-2027', nav: 'Ascension Day 2027', card: 'Ascension Day, the bridge day and Whitsun 2027',
    title: 'Ascension Day 2027 in Sweden: Thursday 6 May, Bridge Day',
    description: 'Ascension Day 2027 in Sweden is Thursday 6 May, so the Friday after it is the only bridge day of the year. Also Whit Sunday and why Whit Monday is a workday.',
    h1: 'Ascension Day 2027 in Sweden',
    intro: `Ascension Day ${Y} falls on Thursday ${dLong(kh, 'en')}, and the Friday after it is the most sought-after bridge day of the year.`,
    resume: `Ascension Day is always a Thursday, because it falls 39 days after Easter Sunday. In ${Y} Easter is early, on ${dLong(os, 'en')}, so Ascension Day arrives on ${dLong(kh, 'en')}, in week ${vecka(kh)}. Friday ${dLong(kl, 'en')} then becomes a bridge day: one leave day gives four days off from Thursday to Sunday. It is also the ${klamAr === 1 ? 'only' : 'first'} true bridge day of ${Y}, since May Day falls on a Saturday and National Day on a Sunday. Whit Sunday follows ten days later, on ${dLong(pd, 'en')}. Whit Monday has been an ordinary working day in Sweden since 2005, when National Day replaced it as a public holiday. Taking the whole of week ${vecka(kh)} off costs ${n(vecka18.sem, 'en')} leave days and gives nine days off from Saturday ${dLong(fm, 'en')}.`,
    faqs: [
      { q: 'What date is Ascension Day 2027 in Sweden?', a: `Thursday ${dLong(kh, 'en')}. The Public Holidays Act makes Ascension Day the sixth Thursday after Easter Sunday, which is 39 days after it. With Easter Sunday ${Y} on ${dLong(os, 'en')}, Ascension falls unusually early in May; the year before it was ${dLong(kh26, 'en')}.` },
      { q: 'Is the Friday after Ascension Day 2027 a day off?', a: `Not by law. Friday ${dLong(kl, 'en')} is an ordinary working day, what Swedes call a klämdag. Many employers and collective agreements give the day off or a shorter day, while others expect staff to use a leave day. With one leave day you get four days off in a row.` },
      { q: 'Why is Whit Monday no longer a public holiday in Sweden?', a: 'When National Day on 6 June became a public holiday, the Public Holidays Act was amended by SFS 2004:1320. Whit Monday was removed at the same time, so the number of holidays stayed the same. The change has applied since 2005. Whit Sunday is still a holiday but always falls on a Sunday.' },
      { q: 'When is Ascension Day 2028 in Sweden?', a: `In ${Y + 1} Ascension Day falls on Thursday ${dLong(kh28, 'en')}, because Easter Sunday that year is late, on ${dLong(K.paskdagen(Y + 1), 'en')}. The bridge day is then Friday ${dLong(plus(kh28, 1), 'en')}. The table in the tool shows the dates several years ahead.` },
    ],
    body: (h) => `<h2>How the date is worked out</h2>
<p>${h.src('helgdagslag', 'Section 2 of the Public Holidays Act')} makes Ascension Day the sixth Thursday after Easter Sunday and Whit Sunday the seventh Sunday after it. Counted in days that is 39 and 49. We compute Easter Sunday with ${h.src('pask-ptb', "Gauss's Easter formula")}, so all three dates hang together. The tool above shows the dates for ${Y} and seven years ahead.</p>
<p>Since Easter Sunday can fall between 22 March and 25 April, Ascension Day can fall between 30 April and 3 June. In ${Y} it is early, on ${dLong(kh, 'en')}, only five days after May Day.</p>
<h2>The bridge day and the week</h2>
<p>The Friday after Ascension is the classic Swedish bridge day. In law it is an ordinary weekday, so a day off needs a leave day, time off in lieu or an agreement. In ${Y} it is especially valuable, because most other spring and summer holidays land at weekends.</p>
<p>May Day falls on a Saturday, so the whole of week ${vecka(kh)}, Monday to Friday, holds only one public holiday. Taking leave on the four working days, ${dLong(plus(kh, -3), 'en')} to ${dLong(plus(kh, -1), 'en')}, plus the Friday costs ${n(vecka18.sem, 'en')} leave days under the ${h.src('semesterlag', 'Annual Leave Act')} and gives nine days off. The planner for ${h.a('home', 'bridge days 2027')} weighs that bridge against the rest of the year.</p>
${h.mini('os', { d: { ar: Y }, c: "See Easter and Gauss's formula" })}
<h2>Whitsun ${Y}</h2>
<p>Whit Sunday falls on ${dLong(pd, 'en')} and Whitsun Eve the day before. Neither affects the working week. Whit Monday, ${dLong(plus(pd, 1), 'en')}, has been a normal working day since National Day became a holiday. National Day itself falls on a Sunday in ${Y}; more on that under ${h.a('nationaldagen-2027', 'National Day 2027')}.</p>`,
  },
});
