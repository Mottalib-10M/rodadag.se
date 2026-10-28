/** Petits outils de rédaction partagés par les fichiers de contenu (le préfixe _ les exclut du registre des pages). */
import { KIT as K } from '../lib/kit';
import { formatNumber, type Lang } from '../lib/format';
import { dLong, dWeek, dShort, wdLong, span } from '../lib/tool-specs';
export { K, dLong, dWeek, dShort, wdLong, span };
export type { Lang };
export const n = (x: number, l: Lang) => formatNumber(x, 0, l);
/** Date d'une röd dag (id) une année donnée. */
export const rd = (id: string, y: number) => K.helgdagar(y, { aftnar: true }).find((f) => f.id === id)!.date;
/** Liste « a, b och c » / « a, b and c ». */
export const lista = (xs: string[], l: Lang) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} ${l === 'sv' ? 'och' : 'and'} ${xs[xs.length - 1]}`);
export const plus = (iso: string, d: number) => K.plusDays(iso, d);
/** Röda dagar sur un jour ouvré une année donnée. */
export const rodaVardagar = (y: number) => K.paVardag(K.helgdagar(y));
export const arbets = (y: number) => K.arbetsdagar(y, { aftnar: true }).reduce((a, b) => a + b, 0);
export const opt = (y: number, b: number) => K.optimera(y, b, { aftnar: true });
export const vecka = (iso: string) => K.isoVecka(iso).week;
