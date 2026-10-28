/** Accueil, suédois et anglais. Dates et chiffres : moteur (src/lib/engine) via la trousse, jamais tapés à la main. */
import type { FAQ, Helpers } from '../lib/page-types';
import { K, n, rd, lista, plus, rodaVardagar, arbets, opt, vecka, dLong, dWeek, wdLong, type Lang } from './_lib';

interface HomeLang {
  title: string; description: string; h1: string; intro: string; resume: string;
  facts: Array<{ k: string; v: string }>; toolsTitle: string; foldTitle: string; faqs: FAQ[];
  why: (h: Helpers) => string; sections: (h: Helpers) => Array<{ title: string; html: string }>;
}
const Y = 2027;
const kl = K.klamdagar(Y, { aftnar: true });
const p5 = opt(Y, 5), p10 = opt(Y, 10), p15 = opt(Y, 15), p25 = opt(Y, 25);
const p10_26 = opt(Y - 1, 10), p10_28 = opt(Y + 1, 10);
const at = arbets(Y), vard = rodaVardagar(Y);
const kl28 = K.klamdagar(Y + 1, { aftnar: true });
const b = (i: number) => p10.block[i];
const vNamn = (l: Lang) => lista(vard.map((f) => f.name[l].toLowerCase()), l);

const sv: HomeLang = {
  title: 'Klämdagar 2027: semesterplanerare och alla röda dagar',
  description: 'Klämdagar 2027: planeraren lägger dina semesterdagar där de ger flest lediga dagar i rad och visar också alla röda dagar, aftnar och arbetsdagar med datum.',
  h1: 'Klämdagar 2027: flest lediga dagar för minst semester',
  intro: 'Välj år och antal semesterdagar. Planeraren lägger din ledighet på årets bästa klämdagar och visar varje bro med datum, veckodag och vecka.',
  resume: `Sverige har ${K.HELGDAGAR.length} allmänna helgdagar utöver söndagarna, och de gäller i hela landet. ${Y} infaller bara ${vard.length} av dem på en vardag: ${vNamn('sv')}. Därför finns det bara en äkta klämdag ${Y}, ${dWeek(kl[0].semFran, 'sv')}, där en enda semesterdag ger fyra lediga dagar i rad. Bättre utdelning ger längre broar. Fyra semesterdagar veckan före påsk ger ledigt från ${dLong(b(1).ledigFran, 'sv')} till ${dLong(b(1).ledigTill, 'sv')}, och fyra dagar i mellandagarna ger ledigt från julafton till ${dLong(b(2).ledigTill, 'sv')}. Med tio semesterdagar rätt placerade får du ${p10.ledig} lediga dagar ${Y}, med fem dagar ${p5.ledig}. Midsommarafton, julafton och nyårsafton räknas inte som semesterdagar enligt semesterlagen, och planeraren räknar dem som lediga. Ingen helgdag flyttas när den hamnar på en helg, så ${Y} blir ett år med ${n(at, 'sv')} arbetsdagar.`,
  facts: [
    { k: 'Röda dagar på vardag 2027', v: n(vard.length, 'sv') },
    { k: '10 semesterdagar ger', v: `${p10.ledig} dagar ledigt` },
    { k: 'Arbetsdagar 2027', v: n(at, 'sv') },
    { k: 'Midsommarafton 2027', v: dLong(K.midsommarafton(Y), 'sv') },
  ],
  toolsTitle: 'Fler verktyg för röda dagar, semester och skollov',
  foldTitle: 'Förstå klämdagarna och ansök om semester',
  faqs: [
    { q: 'Vad är en klämdag?', a: 'En klämdag är en enda arbetsdag som kläms in mellan en röd dag och helgen, eller mellan två röda dagar. Det klassiska exemplet är fredagen efter Kristi himmelsfärdsdag, som alltid infaller en torsdag. Tar du semester den dagen blir du ledig fyra dagar i rad. Planeraren räknar också med kortare broar på två till fyra arbetsdagar som binder ihop två ledigheter.' },
    { q: 'Hur många klämdagar finns det 2027?', a: `Bara en äkta: ${dWeek(kl[0].semFran, 'sv')}, dagen efter Kristi himmelsfärd. Det beror på att första maj, nationaldagen och juldagarna hamnar på helger ${Y}. Längre broar finns ändå, runt trettondedag jul, påsk, midsommar och jul. ${Y + 1} blir bättre, med ${kl28.length} äkta klämdagar.` },
    { q: 'Räknas midsommarafton som semesterdag?', a: 'Nej. Midsommarafton, julafton och nyårsafton är inga allmänna helgdagar, men 3 a § semesterlagen jämställer dem med söndag. Är du ledig de dagarna drar arbetsgivaren alltså ingen semesterdag. Att de flesta är lediga på aftnarna beror på kollektivavtal och praxis, inte på lagen om allmänna helgdagar.' },
    { q: 'Flyttas en röd dag som infaller på en helg?', a: `Nej. Lagen om allmänna helgdagar har ingen regel om ersättningsdag, till skillnad från till exempel Storbritannien. Infaller nationaldagen på en söndag, som ${Y}, blir det ingen ledig måndag. Enstaka kollektivavtal ger kompensation, men det är avtalets sak och inte lagens.` },
    { q: 'Hur många semesterdagar har jag rätt till?', a: `Semesterlagen ger minst ${K.P.semester.dagar} semesterdagar per semesterår, och du har rätt att ta ut fyra veckor i följd under juni, juli eller augusti. Många kollektivavtal ger fler dagar, till exempel efter en viss ålder. Dagar över ${K.P.semester.sparaOver} får du spara i högst ${K.P.semester.sparaAr} år.` },
    { q: 'Sparas eller skickas det jag fyller i?', a: 'Nej. År, antal semesterdagar och val om aftnarna bearbetas bara i din webbläsare. Det finns inget konto och inget formulär. När du ändrar något skriver sidan ditt val i adressfältet så att du kan dela länken, och även det stannar på din enhet.' },
  ],
  why: (h) => `<h2>Vilka broar som ger mest ${Y}</h2>
<p>Värdet av en bro mäts i lediga dagar per semesterdag. En äkta klämdag ger fyra lediga dagar för en semesterdag. En vanlig semestervecka från måndag till fredag ger nio lediga dagar för fem semesterdagar, alltså mindre än det dubbla. Allt som ligger klart över det värdet lönar sig, och planeraren sorterar broarna just så.</p>
<p>${Y} ligger de bästa veckorna kring påsk och jul. Långfredagen är den ${dLong(rd('langfredagen', Y), 'sv')} och annandag påsk den ${dLong(rd('annandag-pask', Y), 'sv')}, så fyra semesterdagar före eller efter påsk ger tio dagar ledigt. Julafton och nyårsafton är fredagar, och fyra dagar i mellandagarna räcker för att vara ledig från ${dLong(b(2).ledigFran, 'sv')} till ${dLong(b(2).ledigTill, 'sv')}. Sommaren saknar däremot röda dagar på vardagar, eftersom nationaldagen infaller på en söndag.</p>
${h.mini('sd', { p: ['langd'], d: { ar: Y, man: 7, dag: 5, langd: 21 }, c: 'Räkna semesterdagar för en period' })}
<p>Hur många dagar du har att fördela styrs av ${h.src('semesterlag', 'semesterlagen')}: minst ${K.P.semester.dagar} dagar per år, oftast fler i kollektivavtal. Hur dagarna räknas när en ledighet går över röda dagar och aftnar står på sidan ${h.a('semesterdagar', 'semesterdagar')}.</p>`,
  sections: (h) => [
    { title: `Broarna ${Y} i årets ordning`, html: `<p><strong>Januari.</strong> Nyårsdagen är en fredag och trettondedag jul en onsdag. Två semesterdagar på måndag och tisdag ger sju lediga dagar från nyårsafton till trettondagen. Tar du också torsdag och fredag är du ledig till och med söndagen den 10 januari, elva dagar för fyra semesterdagar.</p>
<p><strong>Påsk.</strong> Påskdagen är den ${dLong(K.paskdagen(Y), 'sv')}, en av de tidigaste påskarna på länge. Skärtorsdagen den ${dLong(plus(K.paskdagen(Y), -3), 'sv')} är en vanlig arbetsdag enligt lagen, men många arbetsplatser slutar tidigare. Fyra semesterdagar måndag till torsdag före påsk ger ledigt från lördagen den ${dLong(b(1).ledigFran, 'sv')} till annandag påsk. Lika mycket ger fyra dagar efter påsk, och många kommuner har påsklov just den veckan.</p>
<p><strong>Maj.</strong> Första maj infaller på en lördag ${Y} och ger ingen ledig vardag. Kristi himmelsfärdsdag är torsdagen den ${dLong(rd('kristi-himmelsfard', Y), 'sv')}, och fredagen efter är årets enda äkta klämdag. Pingstdagen är alltid en söndag och annandag pingst är inte längre röd dag sedan 2005.</p>
<p><strong>Juni.</strong> Nationaldagen är en söndag. Midsommarafton är fredagen den ${dLong(K.midsommarafton(Y), 'sv')}, och fyra semesterdagar före den ger nio lediga dagar. Det är en bra start på sommarsemestern, som du enligt lagen har rätt att lägga i fyra veckor i följd under juni till augusti.</p>
<p><strong>Hösten.</strong> Alla helgons dag är alltid en lördag, ${Y} den ${dLong(K.allaHelgonsDag(Y), 'sv')}, och ger ingen ledig vardag. Höstlovet i de flesta kommuner ligger i vecka 44, men det gäller skolan och inte arbetslivet.</p>
<p><strong>December.</strong> Julafton och nyårsafton är fredagar, juldagen en lördag och annandag jul en söndag. Fyra semesterdagar, ${dLong(b(2).semFran, 'sv')} till ${dLong(b(2).semTill, 'sv')}, ger tio dagar ledigt till den ${dLong(b(2).ledigTill, 'sv')}.</p>` },
    { title: 'Så använder du planeraren', html: `<p>Välj år och hur många semesterdagar du vill lägga på broar. Sällan är det hela semestern, eftersom en stor del går till sommaren. Fem till tolv dagar är en bra början. Överst står antalet lediga dagar, därunder varje ledighet med datum och längst ner alla broar under året sorterade efter utdelning.</p>
<p>Under ”Fler val” kan du ange om du arbetar på midsommarafton, julafton och nyårsafton, till exempel inom handel, vård eller kollektivtrafik. Då räknar planeraren aftnarna som arbetsdagar och broarna kring jul blir längre och dyrare. Valborgsmässoafton och skärtorsdagen är alltid arbetsdagar i beräkningen, eftersom lagen inte nämner dem.</p>
<p>Semesterdagar som inte längre förlänger någon bro visas som fria att lägga. De ger ingen extra utdelning, och en hel semestervecka ger då nio lediga dagar. Med ${K.P.semester.dagar} semesterdagar, lagens miniminivå, når du ${p25.ledig} lediga dagar ${Y} om alla dagar ligger på broar, och med femton dagar ${p15.ledig}.</p>` },
    { title: 'Ansöka om semester: vad lagen säger', html: `<p>Semesterlagen säger att arbetsgivaren bestämmer när semestern ska läggas ut, efter förhandling med facket eller samråd med dig. Huvudregeln i ${h.src('semesterlag', '12 § semesterlagen')} är att du får fyra veckor i följd under juni, juli och augusti, om inte annat avtalats. Övriga dagar, som klämdagar och broar, beviljas efter överenskommelse. Därför lönar det sig att ansöka tidigt: arbetsgivaren ska enligt lagen meddela beslutet senast två månader före semesterns början.</p>
<p>Röda dagar och de tre aftnarna inom en semesterperiod drar inga semesterdagar, enligt 3 a §. Har du fler än ${K.P.semester.sparaOver} betalda semesterdagar under ett år får du spara överskottet, och de sparade dagarna ska tas ut inom ${K.P.semester.sparaAr} år.</p>
<p>Datumen här räknas ur ${h.src('helgdagslag', 'lagen om allmänna helgdagar')}. En frist som slutar på en röd dag eller en afton flyttas till nästa vardag enligt ${h.src('lagstadgadtid', 'lagen om beräkning av lagstadgad tid')}; räkna själv på sidan ${h.a('tidsfrist', 'tidsfrister')}.</p>` },
    { title: `Klämdagar ${Y - 1} och ${Y + 1} i jämförelse`, html: `<p>Av ${Y - 1} återstår julen. Julafton och nyårsafton är torsdagar och juldagen en fredag, så tre semesterdagar mellan jul och nyår ger elva dagar ledigt till och med söndagen den 3 januari. Över hela året ${Y - 1} ger tio semesterdagar ${p10_26.ledig} lediga dagar; allt står under ${h.a('klamdagar-2026', 'klämdagar 2026')}.</p>
<p>${Y + 1} blir betydligt bättre. Första maj infaller på en måndag, nationaldagen på en tisdag och juldagen och annandag jul på måndag och tisdag. Det ger ${kl28.length} äkta klämdagar, och tio semesterdagar ger ${p10_28.ledig} lediga dagar. Översikten finns under ${h.a('klamdagar-2028', 'klämdagar 2028')}.</p>` },
    { title: 'Skollov och semester', html: `<p>Höstlov, sportlov och påsklov bestäms inte nationellt. ${h.src('skolforordning', 'Skolförordningen')} säger bara att läsåret ska ha minst ${K.P.skola.skoldagar} skoldagar och ${K.P.skola.lovdagar} lovdagar och låter kommunen eller den fristående huvudmannen bestämma terminerna. Sportlovet ${Y} ligger därför i vecka 7 till 10 beroende på var du bor.</p>
<p>På sidan ${h.a('skollov-2027', 'skollov 2027')} finns datumen för 24 stora kommuner, var och en med länk till kommunens eget beslut. Har kommunen inte publicerat ett lov ännu står det så, i stället för en gissning.</p>` },
  ],
};

const en: HomeLang = {
  title: 'Bridge Days 2027 in Sweden: Leave Planner and Holidays',
  description: 'Bridge days 2027 in Sweden (klämdagar): the planner puts your leave where it gives the longest breaks and lists every public holiday, eve and working day.',
  h1: 'Swedish bridge days 2027: the most time off for the fewest leave days',
  intro: 'Choose the year and the number of leave days. The planner places your leave on the best bridges of the year and lists each one with date, weekday and week.',
  resume: `Sweden has ${K.HELGDAGAR.length} public holidays besides Sundays, the same across the whole country. In ${Y} only ${vard.length} of them fall on a weekday: ${vNamn('en')}. So there is just one true bridge day, or klämdag, in ${Y}: ${dWeek(kl[0].semFran, 'en')}, where a single leave day gives four days off in a row. Longer bridges pay more. Four leave days in the week before Easter keep you off work from ${dLong(b(1).ledigFran, 'en')} to ${dLong(b(1).ledigTill, 'en')}, and four between Christmas and New Year give you Christmas Eve to ${dLong(b(2).ledigTill, 'en')}. Ten leave days in the right places give ${p10.ledig} days off in ${Y}; five give ${p5.ledig}. Midsummer Eve, Christmas Eve and New Year's Eve do not count as leave days under the Annual Leave Act, and the planner treats them as days off. No holiday is moved when it falls at a weekend, so ${Y} has ${n(at, 'en')} working days.`,
  facts: [
    { k: 'Weekday holidays 2027', v: n(vard.length, 'en') },
    { k: '10 leave days give', v: `${p10.ledig} days off` },
    { k: 'Working days 2027', v: n(at, 'en') },
    { k: 'Midsummer Eve 2027', v: dLong(K.midsommarafton(Y), 'en') },
  ],
  toolsTitle: 'More tools for holidays, leave and school breaks',
  foldTitle: 'Understanding bridge days and booking leave',
  faqs: [
    { q: 'What is a bridge day in Sweden?', a: 'Swedes call it a klämdag, a squeezed day: a single working day caught between a public holiday and the weekend, or between two holidays. The classic case is the Friday after Ascension Day, which always falls on a Thursday. Take that one day off and you get four days in a row. The planner also counts short gaps of two to four working days that join two breaks.' },
    { q: 'How many bridge days are there in 2027?', a: `Only one true bridge day: ${dWeek(kl[0].semFran, 'en')}, the day after Ascension Day. May Day, National Day and both Christmas holidays fall at weekends in ${Y}. There are still longer bridges around Epiphany, Easter, Midsummer and Christmas. ${Y + 1} is better, with ${kl28.length} true bridge days.` },
    { q: 'Does Midsummer Eve use up a leave day?', a: 'No. Midsummer Eve, Christmas Eve and New Year\'s Eve are not public holidays, but section 3a of the Annual Leave Act treats them like Sundays. If you are off on those days, your employer deducts no leave. That most people do not work on the eves comes from collective agreements and custom, not from the Public Holidays Act.' },
    { q: 'Is a holiday that falls on a weekend moved?', a: `No. The Public Holidays Act has no substitute-day rule, unlike the United Kingdom. When National Day falls on a Sunday, as in ${Y}, there is no Monday off. A few collective agreements give compensation, but that is a matter for the agreement, not for the law.` },
    { q: 'How many days of annual leave do I get in Sweden?', a: `The Annual Leave Act gives at least ${K.P.semester.dagar} leave days per leave year, and you are entitled to four consecutive weeks in June, July or August. Many collective agreements give more, for instance from a certain age. Days above ${K.P.semester.sparaOver} may be saved for up to ${K.P.semester.sparaAr} years.` },
    { q: 'Is anything I enter stored or sent?', a: 'No. The year, the number of leave days and your choice about the eves are processed only in your browser. There is no account and no form. When you change something the page writes your choice into the address bar so you can share the link, and that too stays on your device.' },
  ],
  why: (h) => `<h2>Which bridges pay most in ${Y}</h2>
<p>A bridge is worth the days off it brings per leave day. A true bridge day gives four days off for one leave day. An ordinary week of leave from Monday to Friday gives nine days off for five leave days, less than double. Anything well above that ratio is worth booking, and the planner ranks bridges exactly that way.</p>
<p>In ${Y} the best weeks are around Easter and Christmas. Good Friday is ${dLong(rd('langfredagen', Y), 'en')} and Easter Monday ${dLong(rd('annandag-pask', Y), 'en')}, so four leave days before or after Easter give ten days off. Christmas Eve and New Year's Eve are Fridays, and four days between them keep you off from ${dLong(b(2).ledigFran, 'en')} to ${dLong(b(2).ledigTill, 'en')}. Summer has no weekday holiday at all, because National Day falls on a Sunday.</p>
${h.mini('sd', { p: ['langd'], d: { ar: Y, man: 7, dag: 5, langd: 21 }, c: 'Count leave days for a period' })}
<p>How many days you have to spend is set by the ${h.src('semesterlag', 'Annual Leave Act')}: at least ${K.P.semester.dagar} a year, often more under a collective agreement. How the days are counted when your leave spans holidays and eves is on ${h.a('semesterdagar', 'annual leave days')}.</p>`,
  sections: (h) => [
    { title: `The ${Y} bridges in calendar order`, html: `<p><strong>January.</strong> New Year's Day is a Friday and Epiphany a Wednesday. Two leave days on the Monday and Tuesday give seven days off from New Year's Eve to Epiphany. Add the Thursday and Friday and you are off until Sunday 10 January, eleven days for four leave days.</p>
<p><strong>Easter.</strong> Easter Sunday is ${dLong(K.paskdagen(Y), 'en')}, one of the earliest in years. Maundy Thursday, ${dLong(plus(K.paskdagen(Y), -3), 'en')}, is an ordinary working day in law, though many workplaces close early. Four leave days Monday to Thursday before Easter give you Saturday ${dLong(b(1).ledigFran, 'en')} to Easter Monday off. Four days after Easter give as much, and many municipalities hold the Easter school break that week.</p>
<p><strong>May.</strong> May Day falls on a Saturday in ${Y} and gives no weekday off. Ascension Day is Thursday ${dLong(rd('kristi-himmelsfard', Y), 'en')}, and the Friday after it is the year's only true bridge day. Whit Sunday is always a Sunday, and Whit Monday has not been a holiday since 2005.</p>
<p><strong>June.</strong> National Day is a Sunday. Midsummer Eve is Friday ${dLong(K.midsommarafton(Y), 'en')}, and four leave days before it give nine days off. That is a good start to the summer holiday, which the law lets you take as four consecutive weeks between June and August.</p>
<p><strong>Autumn.</strong> All Saints' Day is always a Saturday, in ${Y} ${dLong(K.allaHelgonsDag(Y), 'en')}, and gives no weekday off. The autumn school break in most municipalities falls in week 44, but that concerns schools, not working life.</p>
<p><strong>December.</strong> Christmas Eve and New Year's Eve are Fridays, Christmas Day a Saturday and Boxing Day a Sunday. Four leave days, ${dLong(b(2).semFran, 'en')} to ${dLong(b(2).semTill, 'en')}, give ten days off up to ${dLong(b(2).ledigTill, 'en')}.</p>` },
    { title: 'How to use the planner', html: `<p>Choose the year and how many leave days you want to spend on bridges. It is rarely your whole allowance, as much of it goes on the summer. Five to twelve days is a good start. The top line shows the days off, then each break with its dates, and at the bottom every bridge of the year ranked by yield.</p>
<p>Under "More options" you can say whether you work on Midsummer Eve, Christmas Eve and New Year's Eve, as many do in retail, healthcare or public transport. The planner then counts the eves as working days, and the Christmas bridges become longer and dearer. Walpurgis Night and Maundy Thursday always count as working days, since the law does not mention them.</p>
<p>Leave that no longer lengthens a bridge is shown as free to plan. It brings no extra yield, and a full week of leave then gives nine days off. With ${K.P.semester.dagar} leave days, the legal minimum, you reach ${p25.ledig} days off in ${Y} if every day goes on a bridge, and ${p15.ledig} with fifteen.</p>` },
    { title: 'Booking leave: what the law says', html: `<p>Under the Annual Leave Act the employer decides when leave is taken, after negotiating with the union or consulting you. The main rule in ${h.src('semesterlag', 'section 12 of the Annual Leave Act')} is four consecutive weeks in June, July and August unless otherwise agreed. Other days, such as bridge days, are granted by agreement. It pays to ask early: the law says the employer must give its decision no later than two months before the leave starts.</p>
<p>Holidays and the three eves inside a period of leave cost no leave days, under section 3a. If you have more than ${K.P.semester.sparaOver} paid leave days in a year you may save the surplus, and saved days must be taken within ${K.P.semester.sparaAr} years.</p>
<p>The dates here are worked out from the ${h.src('helgdagslag', 'Public Holidays Act')}. A deadline ending on a holiday or an eve moves to the next weekday under the ${h.src('lagstadgadtid', 'Act on statutory time limits')}; work it out on ${h.a('tidsfrist', 'statutory deadlines')}.</p>` },
    { title: `Bridge days ${Y - 1} and ${Y + 1} compared`, html: `<p>Of ${Y - 1}, Christmas is still ahead. Christmas Eve and New Year's Eve are Thursdays and Christmas Day a Friday, so three leave days between Christmas and New Year give eleven days off up to Sunday 3 January. Over the whole of ${Y - 1}, ten leave days give ${p10_26.ledig} days off; it is all on ${h.a('klamdagar-2026', 'bridge days 2026')}.</p>
<p>${Y + 1} is much better. May Day falls on a Monday, National Day on a Tuesday, and Christmas Day and Boxing Day on Monday and Tuesday. That makes ${kl28.length} true bridge days, and ten leave days give ${p10_28.ledig} days off. The overview is on ${h.a('klamdagar-2028', 'bridge days 2028')}.</p>` },
    { title: 'School breaks and leave', html: `<p>Autumn, winter sports and Easter breaks are not set nationally. The ${h.src('skolforordning', 'Education Ordinance')} only says the school year must have at least ${K.P.skola.skoldagar} school days and ${K.P.skola.lovdagar} holiday days and leaves the municipality or independent school organiser to fix the terms. The ${Y} sports break therefore falls in week 7 to 10 depending on where you live.</p>
<p>On ${h.a('skollov-2027', 'school holidays 2027')} you will find the dates for 24 large municipalities, each linked to the municipality's own decision. Where a municipality has not published a break yet, the page says so instead of guessing.</p>` },
  ],
};

export const HOME = { sv, en, sources: ['helgdagslag', 'semesterlag', 'lagstadgadtid', 'skolforordning', 'pask-ptb'] };
// Variables gardées pour d'éventuels usages ; évite l'avertissement d'import inutilisé.
void vecka; void wdLong;
