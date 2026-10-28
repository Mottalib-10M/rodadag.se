/** Contrôle du contenu des guides avant le build : longueurs (RECETTE §11), FAQ (§21), mini-simulateur (§9.3). */
import { describe, expect, test } from 'vitest';
import { GUIDES } from '../src/lib/pages';
import { HOME } from '../src/content/home';
import { helpers } from '../src/lib/helpers';
import { PLANNED_IDS } from '../src/lib/planned';

const words = (s: string) => s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const LANGS = ['sv', 'en'] as const;

describe('guides', () => {
  const qs = new Map<string, string>();
  for (const l of LANGS) for (const f of HOME[l].faqs) qs.set(f.q.toLowerCase(), 'home');
  for (const g of GUIDES) for (const l of LANGS) {
    const p = g[l];
    test(`${g.id} ${l}`, () => {
      expect(p.title.length, `title « ${p.title} »`).toBeGreaterThanOrEqual(50);
      expect(p.title.length, `title « ${p.title} »`).toBeLessThanOrEqual(60);
      expect(p.description.length, `description « ${p.description} »`).toBeGreaterThanOrEqual(150);
      expect(p.description.length, `description « ${p.description} »`).toBeLessThanOrEqual(160);
      expect(/^(sverige|sweden|swedish|svenska)/i.test(p.title), 'title opens with the country').toBe(false);
      expect(/—/.test(p.title + p.description + p.resume), 'em dash').toBe(false);
      expect(words(p.resume), 'resume words').toBeGreaterThanOrEqual(120);
      expect(p.faqs.length).toBeGreaterThanOrEqual(3);
      expect(p.faqs.length).toBeLessThanOrEqual(5);
      for (const f of p.faqs) {
        const w = words(f.a);
        expect(w >= 40 && w <= 90, `FAQ « ${f.q} » ${w} words`).toBe(true);
        const k = f.q.toLowerCase();
        expect(qs.has(k) && qs.get(k) !== `${g.id}:${l}`, `FAQ question repeated: « ${f.q} » (${qs.get(k)})`).toBe(false);
        qs.set(k, `${g.id}:${l}`);
      }
      const body = p.body(helpers(l));
      expect(body.includes('<!--mini:'), 'mini-simulator').toBe(true);
      expect(words(body), 'body words').toBeGreaterThanOrEqual(260);
      for (const r of g.related) expect(PLANNED_IDS.has(r), `related ${r}`).toBe(true);
      expect(/^[a-z0-9-]+$/.test(p.slug)).toBe(true);
    });
  }
  test('slugs unique', () => {
    for (const l of LANGS) { const s = GUIDES.map((g) => g[l].slug); expect(new Set(s).size).toBe(s.length); }
  });
});
