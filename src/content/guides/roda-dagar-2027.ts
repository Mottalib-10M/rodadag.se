/** Röda dagar 2027 : l'année la plus pauvre de la décennie (5 röda dagar en semaine). Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, dWeek, n, rd, lista, plus, rodaVardagar, arbets, opt, vecka, wdLong, type Lang } from '../_lib';

const Y = 2027;
const vard = rodaVardagar(Y);
const helg = K.helgdagar(Y).filter((f) => K.isWeekend(K.fromIso(f.date)));
const p10 = opt(Y, 10);
const at = arbets(Y), at26 = arbets(2026), at28 = arbets(2028);
const namn = (l: Lang) => lista(vard.map((f) => `${f.name[l].toLowerCase().replace(/^sveriges/, 'Sveriges')} (${wdLong(f.date, l)})`), l);
const helgNamn = (l: Lang) => lista(helg.filter((f) => !['paskdagen', 'pingstdagen', 'midsommardagen', 'alla-helgons-dag'].includes(f.id)).map((f) => f.name[l].toLowerCase().replace(/^sveriges/, 'Sveriges')), l);

export default defineGuide({
  id: 'roda-dagar-2027', group: 'roda', order: 11, tool: 'rd', toolArg: { ar: Y },
  related: ['klamdagar-2026', 'arbetsdagar-2027', 'kalender-2027', 'roda-dagar-2028'],
  sources: ['helgdagslag', 'semesterlag', 'pask-ptb'],
  sv: {
    slug: 'roda-dagar-2027', nav: 'Röda dagar 2027', card: 'Alla helgdagar 2027 med veckodag och vecka',
    title: 'Röda dagar 2027: alla helgdagar med datum och veckodag',
    description: 'Röda dagar 2027 i Sverige: alla 13 helgdagar och aftnarna med datum, veckodag och veckonummer. Bara fem infaller på en vardag, så klämdagarna blir få.',
    h1: 'Röda dagar 2027',
    intro: `${Y} har ${K.HELGDAGAR.length} allmänna helgdagar utöver söndagarna, men bara ${vard.length} av dem infaller måndag till fredag.`,
    resume: `Lagen om allmänna helgdagar ger Sverige samma ${K.HELGDAGAR.length} helgdagar varje år, men veckodagarna flyttar sig. ${Y} har otur med kalendern: bara ${vard.length} röda dagar hamnar på en vardag, nämligen ${namn('sv')}. Första maj, nationaldagen, juldagen och annandag jul ligger på lördag eller söndag, och lagen flyttar aldrig en helgdag som infaller på en helg. Påskdagen är den ${dLong(K.paskdagen(Y), 'sv')}, ovanligt tidigt, så påskhelgen hamnar redan i slutet av mars. Midsommarafton är fredagen den ${dLong(K.midsommarafton(Y), 'sv')}, julafton och nyårsafton är fredagar. De tre aftnarna är inga helgdagar, men semesterlagen räknar dem inte som semesterdagar. Med alla röda dagar och aftnar avdragna har ${Y} ${n(at, 'sv')} arbetsdagar, fler än både ${Y - 1} (${n(at26, 'sv')}) och ${Y + 1} (${n(at28, 'sv')}). Den enda äkta klämdagen är fredagen efter Kristi himmelsfärd.`,
    faqs: [
      { q: 'Hur många röda dagar finns det 2027?', a: `Lagen räknar upp ${K.HELGDAGAR.length} helgdagar utöver de vanliga söndagarna, och alla finns med ${Y}. Men bara ${vard.length} av dem infaller måndag till fredag och ger alltså en ledig arbetsdag. Fyra helgdagar, påskdagen, pingstdagen, midsommardagen och alla helgons dag, ligger alltid på en helg enligt lagens egna regler.` },
      { q: 'Vilka röda dagar 2027 hamnar på en helg?', a: `Utöver de fyra som alltid ligger på lördag eller söndag hamnar ${helgNamn('sv')} på en helg ${Y}. Sverige har ingen regel om ersättningsdag, så de dagarna ger ingen extra ledighet. Det är skälet till att ${Y} blir ett år med många arbetsdagar.` },
      { q: 'Är julafton 2027 en röd dag?', a: `Nej. Julafton, fredagen den ${dLong(`${Y}-12-24`, 'sv')}, är ingen allmän helgdag, men semesterlagen jämställer den med söndag. Den kostar därför ingen semesterdag, och de flesta kollektivavtal ger ledigt. Juldagen och annandag jul faller på lördag och söndag ${Y}, så julhelgen blir bara tre dagar lång utan semester.` },
      { q: 'När är påsk 2027?', a: `Påskdagen är söndagen den ${dLong(K.paskdagen(Y), 'sv')}. Långfredagen den ${dLong(rd('langfredagen', Y), 'sv')} och annandag påsk den ${dLong(rd('annandag-pask', Y), 'sv')} är röda dagar, så påskhelgen blir fyra dagar. Påsken är tidig ${Y} eftersom vårens första fullmåne kommer redan i slutet av mars.` },
    ],
    body: (h) => `<h2>Röda dagar ${Y} i datumordning</h2>
<p>Tabellen ovan visar varje röd dag med veckodag och veckonummer. Datumen är inte inskrivna för hand: de räknas fram ur ${h.src('helgdagslag', '2 § lagen om allmänna helgdagar')}, som anger fasta datum för till exempel nyårsdagen och nationaldagen och regler för de rörliga dagarna. Påskdagen räknas med Gauss påskformel, Kristi himmelsfärdsdag ligger 39 dagar efter påskdagen och pingstdagen 49 dagar efter.</p>
<h2>Varför ${Y} känns som ett långt arbetsår</h2>
<p>Ett vanligt år har sju eller åtta röda dagar på vardagar. ${Y} har ${vard.length}. Första maj blir en lördag, nationaldagen och annandag jul söndagar, juldagen en lördag. Den som räknar med långhelger i maj och juni får tänka om: maj har bara Kristi himmelsfärd den ${dLong(rd('kristi-himmelsfard', Y), 'sv')}, och juni har bara midsommarafton. Jämför med ${h.a('roda-dagar-2028', 'röda dagar 2028')}, när nationaldagen blir en tisdag och första maj en måndag.</p>
<p>Det finns ändå ljuspunkter. Trettondedag jul är en onsdag, och vecka ${vecka(rd('trettondedag-jul', Y))} blir en kort arbetsvecka efter nyår. Påsken ligger tidigt, så påsklovet i många kommuner hamnar i vecka ${vecka(plus(K.paskdagen(Y), 1))}. Och jul- och nyårsafton på fredagar ger två långhelger i rad i slutet av december.</p>
${h.mini('bt', { p: ['sem'], d: { ar: Y, sem: 5 }, c: 'Planera semestern 2027' })}
<h2>Så får du ut mest av ${Y}</h2>
<p>Med tio semesterdagar placerade rätt blir det ${p10.ledig} lediga dagar ${Y}. Planeraren på sidan ${h.a('home', 'klämdagar 2027')} visar exakt vilka dagar du ska ansöka om. Störst utdelning ger veckan före påsk, eftersom långfredagen och annandag påsk ramar in en tiodagarsledighet med fyra semesterdagar, och mellandagarna mellan jul och nyår.</p>
<p>Aftnarna räknas som lediga i alla beräkningar på sidan. Det stämmer för semesterdagarna, eftersom ${h.src('semesterlag', '3 a § semesterlagen')} säger att de jämställs med söndag, men om du faktiskt är ledig avgörs av ditt kollektivavtal eller din arbetsgivare. Valborgsmässoafton, skärtorsdagen och trettondagsafton är vanliga arbetsdagar enligt lagen.</p>`,
  },
  en: {
    slug: 'public-holidays-2027', nav: 'Public holidays 2027', card: 'All 2027 holidays with weekday and week',
    title: 'Public Holidays Sweden 2027: Röda Dagar With Dates',
    description: 'All Swedish public holidays in 2027 with date, weekday and week number. Only five fall on a weekday, so 2027 has few bridge days and many working days.',
    h1: 'Swedish public holidays 2027',
    intro: `${Y} has ${K.HELGDAGAR.length} public holidays besides Sundays, but only ${vard.length} of them fall Monday to Friday.`,
    resume: `Sweden's Public Holidays Act sets the same ${K.HELGDAGAR.length} holidays every year, but their weekdays move. ${Y} is an unlucky year: only ${vard.length} holidays land on a weekday, namely ${namn('en')}. May Day, National Day, Christmas Day and Boxing Day fall on a Saturday or Sunday, and Swedish law never moves a holiday that falls at a weekend. Easter Sunday is ${dLong(K.paskdagen(Y), 'en')}, unusually early, so the Easter weekend arrives at the end of March. Midsummer Eve is Friday ${dLong(K.midsommarafton(Y), 'en')}, and Christmas Eve and New Year's Eve are Fridays too. The three eves are not public holidays, but the Annual Leave Act does not count them as leave days. With all holidays and eves taken out, ${Y} has ${n(at, 'en')} working days, more than ${Y - 1} (${n(at26, 'en')}) or ${Y + 1} (${n(at28, 'en')}). The only true bridge day is the Friday after Ascension Day.`,
    faqs: [
      { q: 'How many public holidays does Sweden have in 2027?', a: `The law lists ${K.HELGDAGAR.length} holidays besides ordinary Sundays, and all of them occur in ${Y}. Only ${vard.length} fall on a weekday and so give you a working day off. Four of them, Easter Sunday, Whit Sunday, Midsummer Day and All Saints' Day, always land at a weekend under the law's own rules.` },
      { q: 'Which 2027 holidays fall at a weekend?', a: `Besides the four that are always on a Saturday or Sunday, ${helgNamn('en')} fall at a weekend in ${Y}. Sweden has no substitute-day rule, so those days give no extra time off. That is why ${Y} ends up with so many working days.` },
      { q: 'Is Christmas Eve 2027 a public holiday?', a: `No. Christmas Eve, Friday ${dLong(`${Y}-12-24`, 'en')}, is not a public holiday, but the Annual Leave Act treats it like a Sunday. It never uses up a leave day, and most collective agreements give the day off. Christmas Day and Boxing Day fall on Saturday and Sunday in ${Y}.` },
      { q: 'When is Easter 2027 in Sweden?', a: `Easter Sunday is ${dLong(K.paskdagen(Y), 'en')}. Good Friday, ${dLong(rd('langfredagen', Y), 'en')}, and Easter Monday, ${dLong(rd('annandag-pask', Y), 'en')}, are public holidays, giving a four-day weekend. Easter is early in ${Y} because the first spring full moon comes at the end of March.` },
    ],
    body: (h) => `<h2>Swedish holidays ${Y} in date order</h2>
<p>The table above shows every holiday with its weekday and ISO week number. None of the dates is typed in by hand: they are worked out from ${h.src('helgdagslag', 'section 2 of the Public Holidays Act')}, which fixes dates such as New Year's Day and National Day and gives rules for the movable feasts. Easter Sunday comes from Gauss's Easter formula, Ascension Day is 39 days later and Whit Sunday 49 days later.</p>
<h2>Why ${Y} feels like a long working year</h2>
<p>A typical year has seven or eight holidays on weekdays. ${Y} has ${vard.length}. May Day is a Saturday, National Day and Boxing Day are Sundays and Christmas Day is a Saturday. If you count on long weekends in May and June, think again: May only has Ascension Day on ${dLong(rd('kristi-himmelsfard', Y), 'en')} and June only Midsummer Eve. Compare ${h.a('roda-dagar-2028', 'public holidays 2028')}, when National Day is a Tuesday and May Day a Monday.</p>
<p>There are bright spots. Epiphany is a Wednesday, which makes week ${vecka(rd('trettondedag-jul', Y))} a short week after New Year. Easter is early, so many municipalities hold the Easter school break in week ${vecka(plus(K.paskdagen(Y), 1))}. And with Christmas Eve and New Year's Eve on Fridays, late December brings two long weekends in a row.</p>
${h.mini('bt', { p: ['sem'], d: { ar: Y, sem: 5 }, c: 'Plan your 2027 leave' })}
<h2>Getting the most out of ${Y}</h2>
<p>Ten leave days in the right places give ${p10.ledig} days off in ${Y}. The planner on ${h.a('home', 'bridge days 2027')} shows exactly which days to book. The best value is the week before Easter, where Good Friday and Easter Monday frame a ten-day break for four leave days, and the days between Christmas and New Year.</p>
<p>The eves count as days off in every calculation on this site. That is right for leave days, because ${h.src('semesterlag', 'section 3a of the Annual Leave Act')} treats them like Sundays, but whether you are actually off depends on your collective agreement or employer. Walpurgis Night, Maundy Thursday and Twelfth Night are ordinary working days in law.</p>`,
  },
});
