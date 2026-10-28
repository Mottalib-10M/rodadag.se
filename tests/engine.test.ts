import { describe, it, expect } from 'vitest';
import { paskdagen, paskdagenMeeus, helgdagar, midsommardagen, midsommarafton, allaHelgonsDag, nasta, nastaVardag, arVardag, paVardag } from '../src/lib/engine/helgdagar';
import { optimera, klamdagar, broar, arbetsdagar, semesterdagar, isoVecka, veckorIAret, mandagIVecka } from '../src/lib/engine/klamdagar';
import { KOMMUNER, lov, sportlovVeckor } from '../src/lib/engine/lov';
import { stockholmInstant } from '../src/lib/zeit';
import { sommartid } from '../src/lib/tool-specs';

describe('påsk', () => {
  it('stämmer med kyrkans påsktabell', () => {
    expect(paskdagen(2025)).toBe('2025-04-20');
    expect(paskdagen(2026)).toBe('2026-04-05');
    expect(paskdagen(2027)).toBe('2027-03-28');
    expect(paskdagen(2028)).toBe('2028-04-16');
    expect(paskdagen(2029)).toBe('2029-04-01');
  });
  it('Gauss och Meeus ger samma datum 1600–2600', () => {
    for (let y = 1600; y <= 2600; y++) expect(paskdagen(y)).toBe(paskdagenMeeus(y));
  });
});

describe('allmänna helgdagar (lag 1989:253)', () => {
  it('13 helgdagar utöver vanliga söndagar, 16 med de tre aftnarna', () => {
    for (const y of [2026, 2027, 2028]) { expect(helgdagar(y).length).toBe(13); expect(helgdagar(y, { aftnar: true }).length).toBe(16); }
  });
  it('rörliga helgdagar 2027', () => {
    const d = Object.fromEntries(helgdagar(2027).map((f) => [f.id, f.date]));
    expect(d).toMatchObject({ langfredagen: '2027-03-26', 'annandag-pask': '2027-03-29', 'kristi-himmelsfard': '2027-05-06', pingstdagen: '2027-05-16', midsommardagen: '2027-06-26', 'alla-helgons-dag': '2027-11-06' });
  });
  it('midsommardagen och alla helgons dag är alltid lördagar inom lagens perioder', () => {
    for (let y = 2000; y <= 2100; y++) {
      const m = midsommardagen(y), a = allaHelgonsDag(y);
      expect(new Date(`${m}T12:00:00Z`).getUTCDay()).toBe(6);
      expect(new Date(`${a}T12:00:00Z`).getUTCDay()).toBe(6);
      expect(m >= `${y}-06-20` && m <= `${y}-06-26`).toBe(true);
      expect(a >= `${y}-10-31` && a <= `${y}-11-06`).toBe(true);
      expect(midsommarafton(y) < m).toBe(true);
    }
  });
  it('annandag pingst är ingen helgdag', () => {
    expect(helgdagar(2027).some((f) => f.date === '2027-05-17')).toBe(false);
  });
  it('röda dagar på vardagar', () => {
    expect(paVardag(helgdagar(2026)).length).toBe(7);
    expect(paVardag(helgdagar(2027)).length).toBe(5);
    expect(paVardag(helgdagar(2028)).length).toBe(8);
  });
  it('nästa röda dag över årsskiftet', () => {
    expect(nasta('2026-12-27', {}, 3).map((f) => f.date)).toEqual(['2027-01-01', '2027-01-06', '2027-03-26']);
    expect(nasta('2026-10-28')[0].id).toBe('alla-helgons-dag');
  });
});

describe('frister (lag 1930:173)', () => {
  it('lördag, söndag, helgdag och de tre aftnarna är inga vardagar', () => {
    expect(arVardag('2026-12-24')).toBe(false);
    expect(arVardag('2027-06-25')).toBe(false);
    expect(arVardag('2027-04-30')).toBe(true); // valborgsmässoafton är vardag
    expect(nastaVardag('2026-12-24')).toBe('2026-12-28');
    expect(nastaVardag('2027-12-31')).toBe('2028-01-03');
  });
});

describe('klämdagar och semesterplanering', () => {
  it('klämdagen efter Kristi himmelsfärd varje år', () => {
    for (const y of [2026, 2027, 2028]) expect(klamdagar(y, { aftnar: true }).some((b) => b.semFran === helgdagar(y).find((f) => f.id === 'kristi-himmelsfard')!.date.replace(/\d\d$/, (d) => String(Number(d) + 1).padStart(2, '0')))).toBe(true);
  });
  it('2028: nationaldagen på tisdag ger klämdag måndag 5 juni', () => {
    expect(klamdagar(2028, { aftnar: true }).map((b) => b.semFran)).toContain('2028-06-05');
  });
  it('optimeraren använder aldrig mer än budgeten och slår varje enskild bro', () => {
    for (const y of [2026, 2027, 2028]) for (const b of [1, 3, 5, 10, 15, 25]) {
      const p = optimera(y, b, { aftnar: true });
      expect(p.sem).toBeLessThanOrEqual(b);
      expect(p.sem + p.rest).toBe(b);
      const best = broar(y, { aftnar: true }).filter((x) => x.sem <= b).reduce((m, x) => Math.max(m, x.ledig), 0);
      expect(p.ledig).toBeGreaterThanOrEqual(best);
    }
  });
  it('2027 med 10 dagar ger 27 lediga dagar', () => {
    expect(optimera(2027, 10, { aftnar: true }).ledig).toBe(27);
  });
});

describe('arbetsdagar och semesterdagar', () => {
  it('arbetsdagar per år', () => {
    expect(arbetsdagar(2027, { aftnar: true }).reduce((a, b) => a + b, 0)).toBe(253);
    expect(arbetsdagar(2026, { aftnar: true }).reduce((a, b) => a + b, 0)).toBe(251);
    expect(arbetsdagar(2028, { aftnar: true }).reduce((a, b) => a + b, 0)).toBe(251);
  });
  it('3 a § semesterlagen: helg, helgdag och aftnar kostar ingen semesterdag', () => {
    expect(semesterdagar('2027-06-21', '2027-07-18').sem).toBe(19); // midsommarafton fri
    expect(semesterdagar('2026-12-21', '2027-01-06').sem).toBe(8);
    expect(semesterdagar('2027-07-05', '2027-07-30').sem).toBe(20);
  });
});

describe('veckor (ISO 8601)', () => {
  it('veckonummer', () => {
    expect(isoVecka('2026-10-28').week).toBe(44);
    expect(isoVecka('2027-01-01')).toEqual({ year: 2026, week: 53 });
    expect(veckorIAret(2026)).toBe(53);
    expect(veckorIAret(2027)).toBe(52);
    expect(mandagIVecka(2027, 1)).toBe('2027-01-04');
  });
});

describe('sommartid (förordning 2001:127)', () => {
  it('sista söndagen i mars och oktober', () => {
    expect(sommartid(2027)).toEqual({ start: '2027-03-28', slut: '2027-10-31' });
    expect(sommartid(2026)).toEqual({ start: '2026-03-29', slut: '2026-10-25' });
  });
  it('midnatt svensk tid i UTC', () => {
    expect(stockholmInstant('2027-06-25')).toBe('2027-06-24T22:00:00.000Z');
    expect(stockholmInstant('2026-12-24')).toBe('2026-12-23T23:00:00.000Z');
  });
});

describe('skollov från kommunerna', () => {
  it('24 kommuner, alla datum är vardagar och i ordning', () => {
    expect(KOMMUNER.length).toBe(24);
    for (const k of KOMMUNER) for (const t of ['hostlov2026', 'sportlov2027', 'pasklov2027'] as const) {
      const s = lov(k, t); if (!s) continue;
      expect(s[0] <= s[1]).toBe(true);
      for (const d of s) expect([1, 2, 3, 4, 5]).toContain(new Date(`${d}T12:00:00Z`).getUTCDay());
    }
  });
  it('sportlovsveckor 7 till 10', () => {
    expect(sportlovVeckor().map((x) => x.vecka)).toEqual([7, 8, 9, 10]);
  });
});
