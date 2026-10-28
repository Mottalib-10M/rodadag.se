/** Påsk 2027 : påskdagen 28 mars, une des plus précoces ; Gauss pas à pas ; ponts avant et après. Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, rd, plus, vecka } from '../_lib';
import { gaussSteg } from '../../lib/tool-specs';

const Y = 2027;
const g = gaussSteg(Y);
const os = K.paskdagen(Y);
const lf = rd('langfredagen', Y), ap = rd('annandag-pask', Y), st = plus(os, -3), pa = plus(os, -1);
const fore = K.semesterdagar(plus(os, -6), plus(os, -3)), efter = K.semesterdagar(plus(os, 2), plus(os, 5));
const p26 = K.paskdagen(Y - 1), p28 = K.paskdagen(Y + 1);
const kh = rd('kristi-himmelsfard', Y), pd = rd('pingstdagen', Y);
// Nästa år med samma påskdatum (inom 50 år).
const samma = Array.from({ length: 50 }, (_, i) => Y + 1 + i).find((y) => K.paskdagen(y).slice(5) === os.slice(5))!;

export default defineGuide({
  id: 'pask-2027', group: 'hogtider', order: 20, tool: 'os', toolArg: { ar: Y },
  related: ['pasklov-2027', 'kristi-himmelsfard-2027', 'roda-dagar-2027', 'home'],
  sources: ['helgdagslag', 'pask-ptb', 'semesterlag'],
  sv: {
    slug: 'pask-2027', nav: 'Påsk 2027', card: 'Påskdagen, långfredagen och annandag påsk 2027',
    title: 'Påsk 2027: datum för långfredag, påskdagen och annandag',
    description: 'Påsk 2027 infaller tidigt: påskdagen är söndagen den 28 mars. Se långfredagen, annandag påsk, skärtorsdagen och hur få semesterdagar som ger tio dagar ledigt.',
    h1: 'Påsk 2027',
    intro: `Påskdagen ${Y} är söndagen den ${dLong(os, 'sv')}, nästan en månad tidigare än ${Y + 1}.`,
    resume: `Påskdagen ${Y} infaller den ${dLong(os, 'sv')}. Det gör påskhelgen ovanligt tidig: ${Y - 1} var påskdagen den ${dLong(p26, 'sv')} och ${Y + 1} blir den ${dLong(p28, 'sv')}. Två av påskens dagar är röda dagar på vardagar, långfredagen den ${dLong(lf, 'sv')} och annandag påsk den ${dLong(ap, 'sv')}, så alla som arbetar måndag till fredag får fyra dagar ledigt i rad. Skärtorsdagen den ${dLong(st, 'sv')} och påskafton är däremot inga helgdagar enligt lagen. Tar du ut de ${n(fore.sem, 'sv')} arbetsdagarna före påsk som semester blir du ledig i tio dagar, från lördagen den ${dLong(plus(os, -8), 'sv')} till annandag påsk. Lika mycket ger de ${n(efter.sem, 'sv')} dagarna efter påsk, fram till söndagen den ${dLong(plus(os, 7), 'sv')}. Datumet räknas fram ur fullmånen efter vårdagjämningen, och samma datum återkommer först ${samma}.`,
    faqs: [
      { q: 'Vilket datum är påskdagen 2027?', a: `Påskdagen är söndagen den ${dLong(os, 'sv')}. Lagen om allmänna helgdagar säger att den infaller på söndagen efter den första fullmånen på eller efter den 21 mars, räknat med kyrkans tabeller. ${Y} kommer den fullmånen tidigt, så påsken hamnar redan i slutet av mars, i vecka ${vecka(os)}.` },
      { q: 'Är skärtorsdagen 2027 en röd dag?', a: `Nej. Skärtorsdagen, den ${dLong(st, 'sv')}, är en vanlig arbetsdag enligt lagen om allmänna helgdagar. Många arbetsplatser slutar tidigare den dagen, och vissa kollektivavtal ger förkortad arbetstid, men det följer av avtal och inte av lag. Påskafton på lördagen är heller ingen helgdag, men den infaller ändå på en helg.` },
      { q: 'Hur många semesterdagar behövs för tio dagar ledigt i påsk 2027?', a: `Fyra. Långfredagen och annandag påsk är röda dagar, så det återstår fyra arbetsdagar i veckan före påsk, måndag till torsdag. Med dem som semester blir du ledig från lördagen den ${dLong(plus(os, -8), 'sv')} till och med annandag påsk. Alternativet är tisdag till fredag veckan efter påsk, som också kostar fyra dagar.` },
      { q: 'Varför flyttar sig påsken från år till år?', a: `Påsken följer månen och inte almanackan. Påskdagen är söndagen efter den kyrkliga fullmånen på eller efter den 21 mars, och fullmånen hamnar på olika datum varje år. Därför kan påskdagen infalla från 22 mars till 25 april. Kristi himmelsfärdsdag och pingstdagen följer med, eftersom de räknas från påskdagen.` },
    ],
    body: (h) => `<h2>Påskens dagar ${Y}</h2>
<p>Verktyget ovan visar hela påskveckan med veckodagar. Palmsöndagen är den ${dLong(plus(os, -7), 'sv')}, skärtorsdagen den ${dLong(st, 'sv')}, långfredagen den ${dLong(lf, 'sv')}, påskafton den ${dLong(pa, 'sv')}, påskdagen den ${dLong(os, 'sv')} och annandag påsk den ${dLong(ap, 'sv')}. Av dem är bara långfredagen, påskdagen och annandag påsk allmänna helgdagar enligt ${h.src('helgdagslag', '1 § lagen om allmänna helgdagar')}.</p>
<p>Skärtorsdagen och påskafton nämns inte i lagen. Påskafton infaller alltid på en lördag och påverkar därför inte arbetsveckan. Skärtorsdagen är en vardag i lagens mening, och en frist som går ut då flyttas inte. Den kostar också en semesterdag om du är ledig.</p>
<h2>Så räknas påskdatumet</h2>
<p>Vi räknar påskdagen med ${h.src('pask-ptb', 'Gauss påskformel')}, som ger samma resultat som de kyrkliga tabellerna i den gregorianska kalendern. Tabellen i verktyget visar varje steg för ${Y}. Påskgränsen, den kyrkliga fullmånen, hamnar på dag ${g.OG} i mars räknat med formelns korrektioner, och nästa söndag efter den blir påskdagen. Formeln kontrolleras i våra tester mot en andra, oberoende algoritm för varje år mellan 1600 och 2600.</p>
<p>Påskdagen styr flera andra röda dagar. Kristi himmelsfärdsdag kommer 39 dagar senare, ${dWeek(kh, 'sv')}, och pingstdagen 49 dagar senare, den ${dLong(pd, 'sv')}. Den tidiga påsken gör att även de dagarna hamnar tidigt ${Y}. Mer om dem finns under ${h.a('kristi-himmelsfard-2027', 'Kristi himmelsfärd 2027')}.</p>
${h.mini('kh', { d: { ar: Y }, c: 'Se Kristi himmelsfärd och pingst' })}
<h2>Påsklov och semester</h2>
<p>Skolornas påsklov bestäms av varje kommun. ${Y} lägger de flesta större kommuner lovet i veckan efter påsk, vecka ${vecka(ap)}, men några har det veckan före. Datumen för 24 kommuner med länk till kommunens beslut finns under ${h.a('pasklov-2027', 'påsklov 2027')}.</p>
<p>För den som vill förlänga påsken ger både veckan före och veckan efter tio lediga dagar för fyra semesterdagar. Väljer du båda veckorna blir det sexton dagar i följd för åtta semesterdagar. Hur dagarna passar ihop med resten av året visar planeraren för ${h.a('home', 'klämdagar 2027')}. Röda dagar i en semesterperiod drar inga semesterdagar enligt ${h.src('semesterlag', 'semesterlagen')}.</p>`,
  },
  en: {
    slug: 'easter-2027', nav: 'Easter 2027', card: 'Easter Sunday, Good Friday and Easter Monday 2027',
    title: 'Easter 2027 in Sweden: Good Friday to Easter Monday Dates',
    description: 'Easter 2027 in Sweden comes early: Easter Sunday is 28 March. See Good Friday, Easter Monday, Maundy Thursday and how four leave days give a ten-day break.',
    h1: 'Easter 2027 in Sweden',
    intro: `Easter Sunday ${Y} is ${dLong(os, 'en')}, almost a month earlier than in ${Y + 1}.`,
    resume: `Easter Sunday ${Y} falls on ${dLong(os, 'en')}, which makes it an early Easter: in ${Y - 1} it was ${dLong(p26, 'en')} and in ${Y + 1} it will be ${dLong(p28, 'en')}. Two Easter days are weekday public holidays in Sweden, Good Friday on ${dLong(lf, 'en')} and Easter Monday on ${dLong(ap, 'en')}, so anyone working Monday to Friday gets four days off in a row. Maundy Thursday, ${dLong(st, 'en')}, and Holy Saturday are not public holidays under Swedish law. Take the ${n(fore.sem, 'en')} working days before Easter as leave and you are off for ten days, from Saturday ${dLong(plus(os, -8), 'en')} to Easter Monday. The ${n(efter.sem, 'en')} days after Easter give the same, up to Sunday ${dLong(plus(os, 7), 'en')}. The date follows the first full moon after the spring equinox, and the same date does not return until ${samma}.`,
    faqs: [
      { q: 'What date is Easter Sunday 2027 in Sweden?', a: `Easter Sunday is ${dLong(os, 'en')}. The Public Holidays Act puts it on the Sunday after the first full moon on or after 21 March, as set by the church tables. In ${Y} that full moon comes early, so Easter lands at the end of March, in ISO week ${vecka(os)}.` },
      { q: 'Is Maundy Thursday 2027 a day off in Sweden?', a: `No. Maundy Thursday, ${dLong(st, 'en')}, is an ordinary working day under the Public Holidays Act. Many workplaces close early and some collective agreements shorten the day, but that comes from the agreement, not the law. Holy Saturday is not a public holiday either, though it falls at the weekend anyway.` },
      { q: 'How many leave days give ten days off at Easter 2027?', a: `Four. Good Friday and Easter Monday are public holidays, which leaves four working days in the week before Easter, Monday to Thursday. Book them and you are off from Saturday ${dLong(plus(os, -8), 'en')} through Easter Monday. The other option is Tuesday to Friday after Easter, which also costs four days.` },
      { q: 'Why does the date of Easter change every year?', a: `Easter follows the moon, not the calendar. Easter Sunday is the Sunday after the church full moon on or after 21 March, and that full moon falls on a different date each year. Easter Sunday can therefore be anywhere from 22 March to 25 April. Ascension Day and Whit Sunday move with it, as they are counted from Easter.` },
    ],
    body: (h) => `<h2>The Easter days of ${Y}</h2>
<p>The tool above lists the whole Easter week with weekdays. Palm Sunday is ${dLong(plus(os, -7), 'en')}, Maundy Thursday ${dLong(st, 'en')}, Good Friday ${dLong(lf, 'en')}, Holy Saturday ${dLong(pa, 'en')}, Easter Sunday ${dLong(os, 'en')} and Easter Monday ${dLong(ap, 'en')}. Only Good Friday, Easter Sunday and Easter Monday are public holidays under ${h.src('helgdagslag', 'section 1 of the Public Holidays Act')}.</p>
<p>Maundy Thursday and Holy Saturday are not in the Act. Holy Saturday is always a Saturday, so it never touches the working week. Maundy Thursday is a weekday in the legal sense: a deadline ending that day does not move, and it costs a leave day if you take it off.</p>
<h2>How the Easter date is worked out</h2>
<p>We compute Easter Sunday with ${h.src('pask-ptb', "Gauss's Easter formula")}, which matches the church tables of the Gregorian calendar. The table in the tool shows every step for ${Y}. The paschal full moon falls on day ${g.OG} of March once the formula's corrections are applied, and the next Sunday is Easter Sunday. Our tests check the formula against a second, independent algorithm for every year from 1600 to 2600.</p>
<p>Easter Sunday drives other holidays too. Ascension Day comes 39 days later, ${dWeek(kh, 'en')}, and Whit Sunday 49 days later, ${dLong(pd, 'en')}. With an early Easter, both arrive early in ${Y}. More on them under ${h.a('kristi-himmelsfard-2027', 'Ascension Day 2027')}.</p>
${h.mini('kh', { d: { ar: Y }, c: 'See Ascension Day and Whitsun' })}
<h2>Easter school break and leave</h2>
<p>Each municipality sets its own Easter school break. In ${Y} most large municipalities hold it in the week after Easter, week ${vecka(ap)}, while a few take the week before. Dates for 24 municipalities, each linked to its decision, are on ${h.a('pasklov-2027', 'Easter break 2027')}.</p>
<p>If you want a longer Easter, either the week before or the week after gives ten days off for four leave days. Take both and you get sixteen days in a row for eight leave days. How that fits with the rest of the year is shown by the planner for ${h.a('home', 'bridge days 2027')}. Public holidays inside a period of leave cost no leave days under the ${h.src('semesterlag', 'Annual Leave Act')}.</p>`,
  },
});
