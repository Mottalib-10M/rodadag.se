/** Nationaldagen 2027 : dimanche 6 juin, aucun jour libre ; férié depuis 2005 (SFS 2004:1320). Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, n, wdLong, vecka, lista } from '../_lib';

const Y = 2027;
const nd = `${Y}-06-06`;
const ar = Array.from({ length: 8 }, (_, i) => Y + i);
const wd = (y: number) => K.weekday(K.fromIso(`${y}-06-06`));
const helgAr = ar.filter((y) => wd(y) === 0 || wd(y) === 6);
const klamAr = ar.filter((y) => wd(y) === 2 || wd(y) === 4);
const nasta = ar.find((y) => y > Y && wd(y) !== 0 && wd(y) !== 6)!;
const juniArb = K.arbetsdagar(Y, { aftnar: true })[5];

export default defineGuide({
  id: 'nationaldagen-2027', group: 'hogtider', order: 22, tool: 'nd', toolArg: { ar: Y },
  related: ['kristi-himmelsfard-2027', 'midsommar-2027', 'roda-dagar-2028', 'helgdagar'],
  sources: ['helgdagslag', 'semesterlag', 'arbetstidslag'],
  sv: {
    slug: 'nationaldagen-2027', nav: 'Nationaldagen 2027', card: 'Sveriges nationaldag 6 juni 2027 och kommande år',
    title: 'Nationaldagen 2027: 6 juni på en söndag, ingen ledig vardag',
    description: 'Nationaldagen 2027 infaller söndagen den 6 juni och ger ingen ledig vardag. Se vilka år den 6 juni ger en klämdag och varför dagen blev en röd dag 2005.',
    h1: 'Nationaldagen 2027',
    intro: `Sveriges nationaldag, den 6 juni, infaller ${Y} på en ${wdLong(nd, 'sv')}.`,
    resume: `Sveriges nationaldag den ${dLong(nd, 'sv')} är en ${wdLong(nd, 'sv')} och ligger i vecka ${vecka(nd)}. Eftersom svensk lag inte flyttar en helgdag som hamnar på en helg, ger nationaldagen ${Y} ingen ledig arbetsdag. Det bidrar till att juni ${Y} får ${n(juniArb, 'sv')} arbetsdagar och att våren och försommaren blir fattiga på långhelger. Nationaldagen har varit allmän helgdag sedan 2005, då lagen om allmänna helgdagar ändrades och annandag pingst ströks i stället. Av de åtta åren från ${Y} till ${Y + 7} infaller dagen på en helg ${helgAr.length} gånger, ${lista(helgAr.map(String), 'sv')}. Närmast efter ${Y} ger den en ledig vardag ${nasta}, när den 6 juni är en ${wdLong(`${nasta}-06-06`, 'sv')}. En klämdag uppstår bara när nationaldagen är en tisdag eller torsdag, vilket sker ${lista(klamAr.map(String), 'sv')} under samma period.`,
    faqs: [
      { q: 'Vilken veckodag är nationaldagen 2027?', a: `Söndag. Den ${dLong(nd, 'sv')} infaller i vecka ${vecka(nd)}, och eftersom svensk lag saknar regel om ersättningsdag blir det ingen ledig måndag. Den som har schema över helgen, till exempel inom vård eller handel, kan däremot ha rätt till helgersättning enligt sitt kollektivavtal.` },
      { q: 'Sedan när är nationaldagen röd dag?', a: 'Sedan 2005. Lagen om allmänna helgdagar ändrades genom SFS 2004:1320 så att Sveriges nationaldag den 6 juni blev allmän helgdag. Samtidigt togs annandag pingst bort, så att antalet helgdagar i lagen blev oförändrat. Dagen hade firats som nationaldag redan tidigare, men utan att vara helgdag.' },
      { q: 'Vilka år ger nationaldagen en klämdag?', a: `En klämdag uppstår när den 6 juni är en tisdag eller torsdag: då blir måndagen respektive fredagen en ensam arbetsdag mellan helgen och den röda dagen. Mellan ${Y} och ${Y + 7} gäller det ${lista(klamAr.map(String), 'sv')}. ${Y + 1} är måndagen den 5 juni en klämdag.` },
    ],
    body: (h) => `<h2>Datum och veckodag</h2>
<p>Nationaldagen är en av de fasta röda dagarna i ${h.src('helgdagslag', 'lagen om allmänna helgdagar')}: den infaller alltid den 6 juni, oavsett veckodag. Verktyget ovan visar veckodagen för ${Y} och sju år framåt. ${Y} blir den en söndag, och då påverkar den inte arbetsveckan alls.</p>
<p>Datumet knyts traditionellt till att Gustav Vasa valdes till kung den 6 juni 1523 och till att en ny regeringsform antogs samma datum 1809. Som allmän helgdag är dagen dock ny: den kom in i lagen först 2005.</p>
<h2>Vad det betyder på jobbet</h2>
<p>När nationaldagen infaller på en vardag är den ledig för den som arbetar måndag till fredag, och den räknas inte som semesterdag om den ligger i en semesterperiod enligt ${h.src('semesterlag', 'semesterlagen')}. Infaller den på en lördag eller söndag, som ${Y}, får man ingen kompensation enligt lag. Vissa kollektivavtal ger ändå en extra ledig dag eller ersättning, så det kan löna sig att läsa sitt avtal.</p>
<p>Den som arbetar på helgen omfattas av ${h.src('arbetstidslag', 'arbetstidslagens')} regler om veckovila, men ersättningen för arbete på röda dagar bestäms av avtal och inte av lag. Lagen om allmänna helgdagar säger bara vilka dagar som är helgdagar, inte vad en arbetsgivare ska betala eller vem som får vara ledig.</p>
${h.mini('kh', { d: { ar: Y }, c: 'Se Kristi himmelsfärd och pingst' })}
<h2>Juni ${Y} utan röd vardag</h2>
<p>Med nationaldagen på en söndag och midsommardagen som alltid på en lördag finns ingen röd dag på en vardag i juni ${Y}. Den enda aftonen som inte kostar semester är midsommarafton, fredagen den ${dLong(K.midsommarafton(Y), 'sv')}; se ${h.a('midsommar-2027', 'midsommar 2027')}. Nästa år blir bättre: ${Y + 1} är nationaldagen en tisdag, och mer om det året finns under ${h.a('roda-dagar-2028', 'röda dagar 2028')}.</p>`,
  },
  en: {
    slug: 'national-day-2027', nav: 'National Day 2027', card: 'National Day of Sweden, 6 June 2027 and the years ahead',
    title: 'National Day 2027 in Sweden: 6 June Falls on a Sunday',
    description: 'National Day 2027 in Sweden falls on Sunday 6 June and gives no weekday off. See which years 6 June makes a bridge day, why it became a holiday in 2005.',
    h1: 'National Day of Sweden 2027',
    intro: `Sweden's National Day, 6 June, falls on a ${wdLong(nd, 'en')} in ${Y}.`,
    resume: `Sweden's National Day on ${dLong(nd, 'en')} is a ${wdLong(nd, 'en')}, in week ${vecka(nd)}. Because Swedish law does not move a holiday that lands at a weekend, National Day ${Y} gives no working day off. That helps make June ${Y} a month of ${n(juniArb, 'en')} working days and leaves late spring short of long weekends. National Day has been a public holiday since 2005, when the Public Holidays Act was amended and Whit Monday removed instead. Of the eight years from ${Y} to ${Y + 7}, the day falls at a weekend ${helgAr.length} times, in ${lista(helgAr.map(String), 'en')}. The first year after ${Y} when it gives a weekday off is ${nasta}, when 6 June is a ${wdLong(`${nasta}-06-06`, 'en')}. A bridge day only appears when National Day is a Tuesday or Thursday, which happens in ${lista(klamAr.map(String), 'en')} over the same period.`,
    faqs: [
      { q: 'What day of the week is National Day 2027 in Sweden?', a: `Sunday. ${dLong(nd, 'en')} falls in week ${vecka(nd)}, and since Swedish law has no substitute-day rule there is no Monday off. People who work weekends, in healthcare or retail for instance, may still be entitled to holiday pay under their collective agreement.` },
      { q: 'Since when has National Day been a public holiday in Sweden?', a: 'Since 2005. The Public Holidays Act was amended by SFS 2004:1320 so that the National Day of Sweden on 6 June became a public holiday. Whit Monday was removed at the same time, so the number of holidays in the Act stayed the same. The day had been marked as National Day earlier, but without being a holiday.' },
      { q: 'Which years does Swedish National Day create a bridge day?', a: `A bridge day appears when 6 June is a Tuesday or a Thursday: the Monday or the Friday is then a lone working day between the weekend and the holiday. Between ${Y} and ${Y + 7} that happens in ${lista(klamAr.map(String), 'en')}. In ${Y + 1}, Monday 5 June is a bridge day.` },
    ],
    body: (h) => `<h2>Date and weekday</h2>
<p>National Day is one of the fixed holidays in the ${h.src('helgdagslag', 'Public Holidays Act')}: it is always 6 June, whatever the weekday. The tool above shows the weekday for ${Y} and seven years ahead. In ${Y} it is a Sunday, so it does not touch the working week at all.</p>
<p>The date is traditionally linked to Gustav Vasa's election as king on 6 June 1523 and to a new Instrument of Government adopted on the same date in 1809. As a public holiday, though, the day is recent: it only entered the Act in 2005.</p>
<h2>What it means at work</h2>
<p>When National Day falls on a weekday it is a day off for people working Monday to Friday, and it does not count as a leave day inside a period of leave under the ${h.src('semesterlag', 'Annual Leave Act')}. When it falls on a Saturday or Sunday, as in ${Y}, the law gives no compensation. Some collective agreements still give an extra day off or extra pay, so it can be worth reading yours.</p>
<p>Weekend workers are covered by the weekly rest rules of the ${h.src('arbetstidslag', 'Working Hours Act')}, but pay for work on public holidays is set by agreement, not by law. The Public Holidays Act only says which days are holidays.</p>
${h.mini('kh', { d: { ar: Y }, c: 'See Ascension Day and Whitsun' })}
<h2>June ${Y} without a weekday holiday</h2>
<p>With National Day on a Sunday and Midsummer Day always on a Saturday, June ${Y} has no public holiday on a weekday. The only eve that costs no leave is Midsummer Eve, Friday ${dLong(K.midsommarafton(Y), 'en')}; see ${h.a('midsommar-2027', 'Midsummer 2027')}. Next year is better: in ${Y + 1} National Day is a Tuesday, and more on that year is under ${h.a('roda-dagar-2028', 'public holidays 2028')}.</p>`,
  },
});
