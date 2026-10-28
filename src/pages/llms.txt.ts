/** llms.txt (RECETTE §21), généré à partir du registre des pages. */
import { GUIDES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { KIT as K } from '../lib/kit';
export function GET() {
  const p = K.optimera(2027, 10, { aftnar: true });
  const lines = [
    `# ${SITE_NAMES.sv}`, '',
    `> Public holidays (röda dagar), bridge days (klämdagar), working days, week numbers and municipal school breaks in Sweden, 2026 to 2028, in Swedish (sv-SE) and English. Holidays from sections 1 and 2 of the Public Holidays Act (1989:253), read on riksdagen.se on ${K.P.retrieved_at}: 13 holidays besides Sundays; Whit Monday is not a holiday since 2005; Midsummer Day and All Saints' Day are always Saturdays; a holiday on a weekend is not moved. Midsummer Eve, Christmas Eve and New Year's Eve are not public holidays but count like Sundays under section 3a of the Annual Leave Act (1977:480), so they cost no leave days; that they are days off work is de facto practice and collective agreements. Easter by Gauss's formula, cross-checked against an independent algorithm for 1600-2600. Easter Sunday 2027: ${K.paskdagen(2027)}; Midsummer Eve 2027: ${K.midsommarafton(2027)}. Leave planner: exact dynamic programming over the year's working blocks; in 2027, ${p.sem} leave days give ${p.ledig} days off. School breaks only as published by 24 municipalities, with links. Everything runs in the browser; nothing entered is sent. Independent site by Radif Partners; no travel, booking or affiliate offers. Last updated ${LAST_UPDATED}.`, '',
    `## Leave planner`, `- [Klämdagar 2027](${SITE_URL}${route('home', 'sv')})`, `- [Bridge days 2027](${SITE_URL}${route('home', 'en')})`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en} / ${g.label.sv}`, ...GUIDES.filter((x) => x.group === g.id).flatMap((x) => [
      `- [${x.sv.nav}](${SITE_URL}${route(x.id, 'sv')}): ${x.sv.card}`,
      `- [${x.en.nav}](${SITE_URL}${route(x.id, 'en')}): ${x.en.card}`,
    ]), '']),
    '## About', `- [Metod](${SITE_URL}${route('method', 'sv')})`, `- [Method](${SITE_URL}${route('method', 'en')})`, `- [Om oss](${SITE_URL}${route('about', 'sv')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
