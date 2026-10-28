/** Svensk tid → UTC-tidpunkt. Normaltid är UTC + 1 timme; sommartid enligt förordningen (2001:127) om sommartid:
 *  från kl. 02.00 normaltid sista söndagen i mars till kl. 03.00 sommartid sista söndagen i oktober (båda = 01.00 UTC).
 *  Används av nedräkningarna. */
import { nthWeekday, fromIso } from './engine/helgdagar';
export function stockholmInstant(dateIso: string, time = '00:00'): string {
  const y = Number(dateIso.slice(0, 4)), [hh, mm] = time.split(':').map(Number);
  const local = Date.UTC(y, Number(dateIso.slice(5, 7)) - 1, Number(dateIso.slice(8, 10)), hh, mm);
  const b = fromIso(nthWeekday(y, 3, 0, -1)) * 864e5 + 1 * 3600e3;
  const e = fromIso(nthWeekday(y, 10, 0, -1)) * 864e5 + 1 * 3600e3;
  const guessUtc = local - 3600e3;
  const off = guessUtc > b && local - 7200e3 <= e ? 2 : 1;
  return new Date(local - off * 3600e3).toISOString();
}
