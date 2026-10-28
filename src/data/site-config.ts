/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://rodadag.se";
export const SITE_NAMES: Record<string, string> = {"sv": "Rödadag", "en": "Rödadag"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "Röda";
/** Locale des nombres et des dates : suédois de Suède et anglais britannique. */
export const NUM_TAGS: Record<string, string> = {"sv": "sv-SE", "en": "en-GB"};
export const LANG_TAGS: Record<string, string> = {"sv": "sv-SE", "en": "en-SE"};
export const OG_LOCALES: Record<string, string> = {"sv": "sv_SE", "en": "en_GB"};
export const LOCALE_TAG = 'sv-SE';
export const CURRENCY = 'SEK';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-28';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"sv": "Utgivare av en oberoende planerare för röda dagar och klämdagar som räknar fram datumen ur lagen om allmänna helgdagar och semesterlagen", "en": "Publisher of an independent Swedish public-holiday and bridge-day planner that works the dates out from the Public Holidays Act and the Annual Leave Act"};
export const AUTHOR_DESC: Record<string, string> = {"sv": "Radif Partners läser lagen (1989:253) om allmänna helgdagar, semesterlagen (1977:480), lagen (1930:173) om beräkning av lagstadgad tid och förordningen (2001:127) om sommartid hos Riksdagen, räknar ut påsk med Gauss formel och tar fram röda dagar, klämdagar, arbetsdagar, veckonummer och kalendrar för 2026 till 2028. Skollov hämtas från kommunernas egna beslut. Allt räknas i din webbläsare. Vi säljer inga resor, hotell eller almanackor.", "en": "Radif Partners reads Sweden's Public Holidays Act (1989:253), the Annual Leave Act (1977:480), the Act on Computing Statutory Time Limits (1930:173) and the Summer Time Ordinance (2001:127) on the Riksdag website, computes Easter with Gauss's formula and derives public holidays, bridge days, working days, week numbers and calendars for 2026 to 2028. School holidays come from each municipality's own decisions. The arithmetic runs in your browser. We sell no trips, hotels or diaries."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"sv": ["Allmänna helgdagar i Sverige (lag 1989:253)", "Klämdagar och semesterplanering", "Semesterdagar enligt semesterlagen", "Skollov i svenska kommuner", "Sommartid och veckonummer enligt ISO 8601"], "en": ["Public holidays in Sweden", "Bridge days and leave planning", "Annual leave days under the Swedish Annual Leave Act", "School holidays in Swedish municipalities", "Summer time and ISO 8601 week numbers"]};
export const CONTACT_EMAIL = "contact@rodadag.se";
export const THEME_COLOR = '#006AA7';
export const LOGO_SYMBOL = 'RD';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = 'G-602Y5QZ7SC';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = 'z4zqpymqi3';
export const INDEXNOW_KEY = 'f987f9bb4c8ad1e0a669887c75bf8ccb';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "Frankrike / France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "Momsregistreringsnummer",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein, comme les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
