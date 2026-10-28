/**
 * Årskalender med veckonummer (ISO 8601), de röda dagarna och, om man vill, midsommar-, jul- och nyårsafton.
 * Premier rendu = valeurs par défaut du build ; l'adresse partagée est lue après le montage (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import { Choice, ResultCard, Rows, ShareRow } from '../calc/parts';
import { readParams, updateURL } from '../../lib/url-state';
import { helgdagar, fromIso, dayNum } from '../../lib/engine/helgdagar';
import { arbetsdagar, isoVecka, veckorIAret } from '../../lib/engine/klamdagar';
import { dLong } from '../../lib/tool-specs';
import { t } from '../../i18n/ui';
import type { Lang } from '../../lib/format';

interface Props { lang: Lang; year: number; methodHref?: string; idPrefix?: string }
const TAG = (l: Lang) => (l === 'sv' ? 'sv-SE' : 'en-GB');

export default function Kalender({ lang, year, methodHref, idPrefix = 'k' }: Props) {
  const ui = t(lang), T = (sv: string, en: string) => (lang === 'sv' ? sv : en);
  const [af, setAf] = useState<'ja' | 'nej'>('ja');
  useEffect(() => {
    const u = readParams(window.location.search);
    const p = u.get('af'); if (p === 'ja' || p === 'nej') setAf(p);
  }, []);
  useEffect(() => updateURL({ af }), [af]);
  const list = useMemo(() => helgdagar(year, { aftnar: af === 'ja' }), [year, af]);
  const hol = useMemo(() => new Map(list.map((f) => [f.date, f])), [list]);
  const at = useMemo(() => arbetsdagar(year, { aftnar: af === 'ja' }).reduce((a, b) => a + b, 0), [year, af]);
  const ges = list.filter((f) => f.typ === 'helgdag');
  const wk = ges.filter((f) => { const w = new Date(fromIso(f.date) * 864e5).getUTCDay(); return w !== 0 && w !== 6; }).length;
  const wdHead = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2027, 1, 1 + i)).toLocaleDateString(TAG(lang), { weekday: 'short', timeZone: 'UTC' }).replace('.', ''));
  const months = Array.from({ length: 12 }, (_, m) => {
    const first = dayNum(year, m + 1, 1), last = dayNum(year, m + 2, 1) - 1;
    const lead = (new Date(first * 864e5).getUTCDay() + 6) % 7;
    const cells: Array<number | null> = [...Array(lead).fill(null)];
    for (let d = first; d <= last; d++) cells.push(d);
    while (cells.length % 7) cells.push(null);
    const weeks: Array<Array<number | null>> = []; for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return { name: new Date(first * 864e5).toLocaleDateString(TAG(lang), { month: 'long', timeZone: 'UTC' }), weeks };
  });
  const iso = (d: number) => new Date(d * 864e5).toISOString().slice(0, 10);
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
        <form className="grid content-start grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-rows-subgrid row-span-3"><Choice id={`${idPrefix}-af`} label={T('Markera midsommar-, jul- och nyårsafton', 'Mark Midsummer, Christmas and New Year’s Eve')} value={af} options={[{ value: 'ja', label: T('Ja', 'Yes') }, { value: 'nej', label: T('Nej', 'No') }]} onChange={(v) => setAf(v)} /></div>
        </form>
        <ResultCard label={T(`Kalender ${year}`, `Calendar ${year}`)} value={T(`${ges.length} röda dagar`, `${ges.length} public holidays`)} sub={T(`${at} arbetsdagar, ${veckorIAret(year)} veckor`, `${at} working days, ${veckorIAret(year)} weeks`)}>
          <Rows rows={[[T('Röda dagar på vardagar', 'Holidays on weekdays'), String(wk)], [T('Vecka 1 börjar', 'Week 1 starts on'), dLong(iso(dayNum(year, 1, 4) - ((new Date(dayNum(year, 1, 4) * 864e5).getUTCDay() + 6) % 7)), lang)]]} />
          <ShareRow methodHref={methodHref} labels={ui} />
        </ResultCard>
      </div>
      <div className="kal-grid mt-6">
        {months.map((mo) => (
          <table key={mo.name}>
            <caption className="mb-1 text-left text-sm font-semibold text-navy-900">{mo.name} {year}</caption>
            <thead><tr><th scope="col" className="text-[0.7rem] font-medium text-navy-600">{T('V', 'Wk')}</th>{wdHead.map((h) => <th key={h} scope="col" className="font-medium text-navy-700">{h}</th>)}</tr></thead>
            <tbody>{mo.weeks.map((w, i) => {
              const firstDay = w.find((x) => x !== null)!;
              return (
                <tr key={i}><td className="kw">{isoVecka(iso(firstDay)).week}</td>
                  {w.map((d, j) => {
                    if (d === null) return <td key={j} />;
                    const f = hol.get(iso(d));
                    const cls = f ? (f.typ === 'helgdag' ? 'ft' : 'tf') : j >= 5 ? 'we' : '';
                    return <td key={j} className={cls} title={f ? f.name[lang] : undefined}>{new Date(d * 864e5).getUTCDate()}</td>;
                  })}
                </tr>
              );
            })}</tbody>
          </table>
        ))}
      </div>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-700"><span><span className="mr-1 inline-block h-3 w-3 rounded bg-accent-100 align-middle" aria-hidden="true" />{T('röd dag', 'public holiday')}</span><span><span className="mr-1 inline-block h-3 w-3 rounded bg-navy-100 align-middle" aria-hidden="true" />{T('afton: ingen helgdag, kostar ingen semesterdag', 'eve: not a holiday, costs no leave day')}</span></p>
      <ul className="mt-4 grid gap-x-6 gap-y-1 text-sm text-navy-800 sm:grid-cols-2">
        {list.map((f) => <li key={f.id + f.date}><span className="tabular-nums">{dLong(f.date, lang)}</span> · {f.name[lang]}</li>)}
      </ul>
    </div>
  );
}
