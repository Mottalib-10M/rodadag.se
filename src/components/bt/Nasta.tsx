/**
 * Nästa röda dag: namn, datum, nedräkning med enhetens klocka, de följande dagarna.
 * Premier rendu = jour du build (__BUILD_DAY__), identique serveur/navigateur (RECETTE §17.5) ; l'horloge de
 * l'appareil prend le relais après le montage. Rien n'est envoyé.
 */
import { useEffect, useMemo, useState } from 'react';
import { Choice, ResultCard, Rows, ShareRow } from '../calc/parts';
import { readParams, updateURL } from '../../lib/url-state';
import { nasta, fromIso, isWeekend } from '../../lib/engine/helgdagar';
import { stockholmInstant } from '../../lib/zeit';
import { dWeek, dShort } from '../../lib/tool-specs';
import { t } from '../../i18n/ui';
import type { Lang } from '../../lib/format';

interface Props { lang: Lang; methodHref?: string; idPrefix?: string }
const isoOf = (ms: number) => { const d = new Date(ms); const p = (x: number) => String(x).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`; };

export default function Nasta({ lang, methodHref, idPrefix = 'n' }: Props) {
  const ui = t(lang), T = (sv: string, en: string) => (lang === 'sv' ? sv : en);
  const [af, setAf] = useState<'ja' | 'nej'>('ja');
  const [now, setNow] = useState<number>(() => Date.parse(`${__BUILD_DAY__}T00:00:00Z`));
  const [live, setLive] = useState(false);
  useEffect(() => {
    const u = readParams(window.location.search);
    const p = u.get('af'); if (p === 'ja' || p === 'nej') setAf(p);
    setNow(Date.now()); setLive(true);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => updateURL({ af }), [af]);
  const today = live ? isoOf(now) : __BUILD_DAY__;
  const list = useMemo(() => nasta(today, { aftnar: af === 'ja' }, 7), [today, af]);
  const next = list[0];
  const left = Math.max(0, Date.parse(stockholmInstant(next.date)) - now);
  const d = Math.floor(left / 864e5), h = Math.floor((left % 864e5) / 36e5), m = Math.floor((left % 36e5) / 6e4), s = Math.floor((left % 6e4) / 1e3);
  const nf = new Intl.NumberFormat(lang === 'sv' ? 'sv-SE' : 'en-GB');
  const idag = next.date === today;
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
        <form className="grid content-start grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-rows-subgrid row-span-3"><Choice id={`${idPrefix}-af`} label={T('Räkna med midsommar-, jul- och nyårsafton', 'Include Midsummer, Christmas and New Year’s Eve')} value={af} options={[{ value: 'ja', label: T('Ja', 'Yes') }, { value: 'nej', label: T('Nej', 'No') }]} onChange={(v) => setAf(v)} /></div>
          <div className="sm:col-span-2 rounded-lg border border-accent-200 bg-accent-50 px-4 py-3" data-chrome>
            <p className="text-sm font-medium text-navy-700">{idag ? T('I dag är det', 'Today is') : T('Tid kvar till', 'Time left until')} {next.name[lang]}</p>
            {!idag && <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1" aria-live="off">
              {[[d, ui.days], [h, ui.hours], [m, ui.minutes], [s, ui.seconds]].map(([v, u]) => <span key={String(u)} className="inline-flex items-baseline gap-1"><span className="tabular-nums text-2xl font-bold text-navy-900">{nf.format(Number(v))}</span><span className="text-sm text-navy-600">{u}</span></span>)}
            </p>}
            <p className="mt-1 text-xs text-navy-600">{T('Räknat till midnatt svensk tid, med klockan i din enhet.', 'Counted to midnight Swedish time, using your device clock.')}</p>
          </div>
        </form>
        <ResultCard label={T('Nästa röda dag', 'Next public holiday')} value={next.name[lang]} sub={dWeek(next.date, lang)}>
          <Rows rows={list.slice(1).map((f) => [f.name[lang] + (f.typ === 'helgdag' ? '' : '*'), dShort(f.date, lang) + (isWeekend(fromIso(f.date)) ? T(' (helg)', ' (weekend)') : '')] as [string, string])} />
          {list.some((f) => f.typ !== 'helgdag') && <p className="mt-2 text-xs text-navy-600">{T('* afton: ingen helgdag, men räknas inte som semesterdag', '* eve: not a public holiday, but never counts as a leave day')}</p>}
          <ShareRow methodHref={methodHref} labels={ui} />
        </ResultCard>
      </div>
    </div>
  );
}
