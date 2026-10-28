/**
 * Trousse de rédaction : tout chiffre et toute date écrits dans une page viennent d'ici, jamais tapés à la main.
 *   K.P                         paramètres datés (params-2026.json)
 *   K.helgdagar, K.paskdagen, K.midsommardagen, K.aftnar, K.nastaVardag …   röda dagar (engine/helgdagar.ts)
 *   K.optimera, K.broar, K.klamdagar, K.arbetsdagar, K.semesterdagar, K.isoVecka …   (engine/klamdagar.ts)
 *   K.LOV, K.kommun …           skollov par kommun (engine/lov.ts, data/lov.json)
 *   K.tool(kind, lang, args, valeurs)  lance un simulateur de tool-specs.ts et rend sa carte de résultat
 */
import P from '../data/params-2026.json';
import * as H from './engine/helgdagar';
import * as B from './engine/klamdagar';
import * as L from './engine/lov';
import { runTool } from './tool-specs';
import { LAST_UPDATED } from '../data/site-config';

export const KIT = { P, ...H, ...B, ...L, tool: runTool, LASDATUM: LAST_UPDATED };
export type Kit = typeof KIT;
