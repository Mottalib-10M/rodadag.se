/** Sportlov 2027 : quatre semaines (7 à 10) selon la kommun, et sportlov 2028 là où il est publié. Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, dLong, n, lista } from '../_lib';
import { grupper, namn, publ, ejPubl, vk, per, semFor } from './_lov';

const g27 = grupper('sportlov2027');
const vecka = (w: number) => g27.find((g) => vk(g.s) === w)!;
const veckor = g27.map((g) => vk(g.s));
const storst = g27.reduce((a, b) => (b.ks.length > a.ks.length ? b : a));
const p28 = publ('sportlov2028'), e28 = ejPubl('sportlov2028');
const g28 = grupper('sportlov2028').filter((g) => g.s);
const bytt = K.KOMMUNER.filter((k) => { const a = K.lov(k, 'sportlov2027'), b = K.lov(k, 'sportlov2028'); return a && b && vk(a) !== vk(b); });
const s7 = vecka(7).s!, svep7 = K.ledigtISvep(s7)!;

export default defineGuide({
  id: 'sportlov-2027', group: 'lov', order: 32, tool: 'lov', toolArg: { typ: 'sportlov2027', kommun: 'goteborg' },
  related: ['sportlov-2027-stockholm', 'pasklov-2027', 'skollov-2027', 'vecka'],
  sources: ['skolforordning', 'kommun-goteborg', 'kommun-malmo', 'kommun-umea', 'kommun-vaxjo'],
  sv: {
    slug: 'sportlov-2027', nav: 'Sportlov 2027', card: 'Vecka 7 till 10: vilken vecka din kommun har',
    title: 'Sportlov 2027: vecka 7, 8, 9 eller 10 i 24 kommuner',
    description: 'Sportlov 2027 ligger i vecka 7, 8, 9 eller 10 beroende på kommun. Se veckan och datumen för 24 kommuner, vilka som har beslutat 2028 och vad som ändras.',
    h1: 'Sportlov 2027 vecka för vecka',
    intro: `Sportlovet 2027 är utspritt över ${veckor.length} veckor, vecka ${lista(veckor.map(String), 'sv')}. Vecka ${vk(storst.s)} är vanligast bland de ${K.KOMMUNER.length} kommuner vi följer.`,
    resume: `Sportlovet är det lov som skiljer sig mest i tid mellan kommunerna. ${2027} börjar det i vecka 7 i ${namn(vecka(7).ks, 'sv')}, ${per(s7, 'sv')}. Vecka 8 har ${n(vecka(8).ks.length, 'sv')} av de ${K.KOMMUNER.length} kommunerna, bland dem Malmö, Uppsala och Linköping. Vecka 9 har ${n(vecka(9).ks.length, 'sv')}, med Stockholm och kranskommunerna, Västerås, Gävle, Karlstad och Luleå. Sist kommer ${namn(vecka(10).ks, 'sv')} i vecka 10, ${per(vecka(10).s, 'sv')}. Mönstret är grovt geografiskt: väst först, sedan syd och Östergötland, därefter Stockholmsregionen och sist Norrlandskusten, men undantagen är många, som Luleå i vecka 9. Varje sportlovsvecka är fem vardagar utan röda dagar, så en förälder behöver ${semFor(s7)} semesterdagar och får nio dagar ledigt med helgerna. För 2028 har ${n(p28.length, 'sv')} kommuner redan publicerat sportlovet; ${n(e28.length, 'sv')} har inte gjort det än.`,
    faqs: [
      { q: 'Vilken vecka är sportlovet 2027 i Göteborg och Malmö?', a: `Göteborg har sportlov i vecka 7, ${per(s7, 'sv')}, samma vecka som Borås och Jönköping. Malmö har vecka 8, ${per(vecka(8).s, 'sv')}, liksom bland andra Helsingborg, Lund, Uppsala och Örebro. Båda kommunerna har publicerat datumen i sina läsårstider, som tabellen ovan länkar till.` },
      { q: 'Varför har kommunerna sportlov olika veckor 2027?', a: 'Ingen lag bestämmer sportlovet. Skolförordningen kräver bara ett visst antal lovdagar och låter kommunen eller den fristående huvudmannen lägga ut dem. Kommunerna i samma region väljer ofta samma vecka, vilket ger ett ungefärligt mönster från väst och syd till norr, men varje beslut fattas lokalt och kan ändras från år till år.' },
      { q: 'Är sportlovet 2028 redan bestämt?', a: `I ${n(p28.length, 'sv')} av de ${K.KOMMUNER.length} kommunerna. Där ligger det i ${lista(g28.map((g) => `vecka ${vk(g.s)}`), 'sv')}. ${bytt.length ? `${namn(bytt, 'sv')} byter vecka jämfört med 2027, övriga behåller sin vecka.` : 'Ingen av dem byter vecka jämfört med 2027.'} För övriga kommuner skriver vi ”inte publicerat än” tills kommunen själv har beslutat.` },
      { q: 'Hur många semesterdagar tar sportlovet 2027?', a: `${semFor(s7)} dagar, måndag till fredag, oavsett vecka. Februari och början av mars saknar röda dagar, så sportlovet ger ingen gratis ledighet. Med helgerna före och efter blir det nio dagar i rad, för vecka 7 från ${dLong(svep7[0], 'sv')} till ${dLong(svep7[1], 'sv')}.` },
    ],
    body: (h) => `<h2>Kommunerna sorterade efter vecka</h2>
<p>${h.table(['Vecka', 'Datum', 'Kommuner'], g27.map((g) => [String(vk(g.s)), per(g.s, 'sv'), namn(g.ks, 'sv')]), 'Sportlov 2027 per vecka, enligt kommunernas läsårstider', ['r', 'l', 'l'])}</p>
<p>Uppgifterna kommer från kommunernas egna sidor, lästa den ${dLong(K.LOV_LASDATUM, 'sv')}. Jönköping och Södertälje publicerar bara veckonummer; datumen måndag till fredag är vår omräkning. Växjö kallar lovet sportlov eller februarilov. I ${h.src('kommun-malmo', 'Malmö')} och ${h.src('kommun-goteborg', 'Göteborg')} heter det sportlov som på de flesta andra håll.</p>
<h2>Varför veckorna skiljer</h2>
<p>${h.src('skolforordning', 'Skolförordningen')} kräver ${K.P.skola.skoldagar} skoldagar och ${K.P.skola.lovdagar} lovdagar per läsår, inget mer. Sportlovet är alltså kommunernas eget val. I praktiken samordnar grannkommuner sig, eftersom många föräldrar arbetar i en annan kommun än den där barnen går i skolan. Därför delar Stockholms län vecka 9 och de stora västsvenska kommunerna vecka 7. Norrlandskusten har ofta sent sportlov; i ${h.src('kommun-umea', 'Umeå')} är det vecka 10.</p>
${h.mini('sd', { p: ['man', 'dag'], d: { ar: 2027, man: 2, dag: 13, langd: 9 }, c: 'Räkna semesterdagar för sportlovet' })}
<h2>Sportlovet 2028</h2>
<p>${h.table(['Kommun', 'Sportlov 2027', 'Sportlov 2028'], K.KOMMUNER.map((k) => [k.name, `v. ${vk(K.lov(k, 'sportlov2027'))}`, K.lov(k, 'sportlov2028') ? `v. ${vk(K.lov(k, 'sportlov2028'))}` : 'inte publicerat än']), 'Sportlovsvecka 2027 och 2028', ['l', 'r', 'r'])}</p>
<p>${bytt.map((k) => `${k.name} flyttar sportlovet från vecka ${vk(K.lov(k, 'sportlov2027'))} till vecka ${vk(K.lov(k, 'sportlov2028'))}.`).join(' ')} Övriga kommuner som har beslutat behåller veckan. ${h.src('kommun-vaxjo', 'Växjö')} har dessutom publicerat påsklovet 2028. Har din kommun inte beslutat än, finns läsårstiderna ofta på kommunens webbplats under våren.</p>
<h2>Före och efter sportlovet</h2>
<p>Sportlovet kommer ungefär sju veckor efter jullovet. Nästa ledighet för eleverna är påsklovet, som ${2027} ligger tidigt eftersom påskdagen infaller den ${dLong(K.paskdagen(2027), 'sv')}; se ${h.a('pasklov-2027', 'påsklov 2027')}. Vill du veta vilket datum en viss vecka börjar, använd ${h.a('vecka', 'veckonummer')}. Stockholmsfamiljer hittar mer på ${h.a('sportlov-2027-stockholm', 'sportlov 2027 i Stockholm')}.</p>`,
  },
  en: {
    slug: 'sports-break-2027', nav: 'Sports break 2027', card: 'Week 7 to 10: which week your municipality has',
    title: 'Sports Break 2027: Week 7, 8, 9 or 10 by Municipality',
    description: 'The 2027 winter sports break (sportlov) falls in week 7, 8, 9 or 10 depending on the municipality. Week and dates for 24 municipalities, plus 2028 where set.',
    h1: 'Sports break 2027 week by week',
    intro: `The 2027 sports break is spread over ${veckor.length} weeks, week ${lista(veckor.map(String), 'en')}. Week ${vk(storst.s)} is the most common among the ${K.KOMMUNER.length} municipalities we follow.`,
    resume: `The winter sports break, sportlov, varies more in timing than any other school break. In ${2027} it starts in week 7 in ${namn(vecka(7).ks, 'en')}, ${per(s7, 'en')}. Week 8 is used by ${n(vecka(8).ks.length, 'en')} of the ${K.KOMMUNER.length} municipalities, among them Malmö, Uppsala and Linköping. Week 9 has ${n(vecka(9).ks.length, 'en')}, including Stockholm and its suburbs, Västerås, Gävle, Karlstad and Luleå. Last come ${namn(vecka(10).ks, 'en')} in week 10, ${per(vecka(10).s, 'en')}. The pattern is roughly geographical, the west first, then the south and Östergötland, then the Stockholm region and finally the northern coast, but there are many exceptions, such as Luleå in week 9. Each sports-break week is five weekdays without a public holiday, so a parent needs ${semFor(s7)} leave days and gets nine days off with the weekends. For 2028, ${n(p28.length, 'en')} municipalities have published the date; ${n(e28.length, 'en')} have not yet.`,
    faqs: [
      { q: 'Which week is the 2027 sports break in Gothenburg and Malmö?', a: `Gothenburg has the sports break in week 7, ${per(s7, 'en')}, the same week as Borås and Jönköping. Malmö has week 8, ${per(vecka(8).s, 'en')}, like Helsingborg, Lund, Uppsala and Örebro among others. Both municipalities publish the dates in their school-year calendars, linked from the table above.` },
      { q: 'Why do municipalities take the sports break in different weeks in 2027?', a: 'No statute fixes the sports break. The Education Ordinance only requires a certain number of holiday days and leaves the municipality or independent school organiser to place them. Neighbouring municipalities often choose the same week, which gives a rough pattern from west and south to north, but every decision is local and can change from one year to the next.' },
      { q: 'Has the 2028 sports break been decided?', a: `In ${n(p28.length, 'en')} of the ${K.KOMMUNER.length} municipalities. There it falls in ${lista(g28.map((g) => `week ${vk(g.s)}`), 'en')}. ${bytt.length ? `${namn(bytt, 'en')} changes week compared with 2027; the others keep theirs.` : 'None of them changes week compared with 2027.'} For the rest we show "not published yet" until the municipality itself decides.` },
      { q: 'How many leave days does the 2027 sports break take?', a: `${semFor(s7)} days, Monday to Friday, whatever the week. February and early March have no public holidays, so the sports break gives no free days. With the weekends before and after you get nine days in a row; for week 7 that is ${dLong(svep7[0], 'en')} to ${dLong(svep7[1], 'en')}.` },
    ],
    body: (h) => `<h2>Municipalities sorted by week</h2>
<p>${h.table(['Week', 'Dates', 'Municipalities'], g27.map((g) => [String(vk(g.s)), per(g.s, 'en'), namn(g.ks, 'en')]), 'Sports break 2027 by week, from municipal school-year calendars', ['r', 'l', 'l'])}</p>
<p>The data comes from each municipality's own pages, read on ${dLong(K.LOV_LASDATUM, 'en')}. Jönköping and Södertälje publish only week numbers; the Monday-to-Friday dates are our conversion. Växjö calls the break either sportlov or the February break. In ${h.src('kommun-malmo', 'Malmö')} and ${h.src('kommun-goteborg', 'Gothenburg')} it is simply the sports break, as almost everywhere else.</p>
<h2>Why the weeks differ</h2>
<p>The ${h.src('skolforordning', 'Education Ordinance')} requires ${K.P.skola.skoldagar} school days and ${K.P.skola.lovdagar} holiday days per school year, nothing more. The sports break is therefore each municipality's own choice. In practice neighbours coordinate, because many parents work in a different municipality from the one where their children go to school. That is why Stockholm County shares week 9 and the big western municipalities week 7. The northern coast tends to go late; in ${h.src('kommun-umea', 'Umeå')} it is week 10.</p>
${h.mini('sd', { p: ['man', 'dag'], d: { ar: 2027, man: 2, dag: 13, langd: 9 }, c: 'Count leave days for the sports break' })}
<h2>The 2028 sports break</h2>
<p>${h.table(['Municipality', 'Sports break 2027', 'Sports break 2028'], K.KOMMUNER.map((k) => [k.name, `wk ${vk(K.lov(k, 'sportlov2027'))}`, K.lov(k, 'sportlov2028') ? `wk ${vk(K.lov(k, 'sportlov2028'))}` : 'not published yet']), 'Sports-break week in 2027 and 2028', ['l', 'r', 'r'])}</p>
<p>${bytt.map((k) => `${k.name} moves the sports break from week ${vk(K.lov(k, 'sportlov2027'))} to week ${vk(K.lov(k, 'sportlov2028'))}.`).join(' ')} The other municipalities that have decided keep their week. ${h.src('kommun-vaxjo', 'Växjö')} has also published its 2028 Easter break. If your municipality has not decided yet, the school-year calendar usually appears on its website during the spring.</p>
<h2>Before and after the sports break</h2>
<p>The sports break comes roughly seven weeks after Christmas. The next break for pupils is Easter, which is early in ${2027} because Easter Sunday falls on ${dLong(K.paskdagen(2027), 'en')}; see ${h.a('pasklov-2027', 'Easter break 2027')}. To find the date a given week starts, use ${h.a('vecka', 'week numbers')}. Stockholm families will find more on ${h.a('sportlov-2027-stockholm', 'the Stockholm sports break')}.</p>`,
  },
});
