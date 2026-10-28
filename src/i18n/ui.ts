import type { Locale } from './routes';
const sv = {
  updatedOn: 'Uppdaterad', editorialPolicy: 'Redaktionella principer', contactLabel: 'Kontakt', reviewedBy: 'Sammanställt av',
  skipToContent: 'Hoppa till innehållet', mainNav: 'Huvudmeny', breadcrumbLabel: 'Brödsmulor', breadcrumbHome: 'Start', menuOpen: 'Öppna menyn',
  faqTitle: 'Vanliga frågor', relatedCalculators: 'Gå vidare', sourcesTitle: 'Officiella källor för sidan', writtenBy: 'Sammanställt av',
  asOf: 'Läget', lastUpdated: 'lagtexter och kommunernas läsårstider kontrollerade', footerValidated: 'Källor: lagen (1989:253) om allmänna helgdagar, semesterlagen (1977:480), lagen (1930:173) om beräkning av lagstadgad tid, förordningen (2001:127) om sommartid, skolförordningen (2011:185) och kommunernas beslut om läsårstider',
  footerBrowser: 'Allt räknas i din webbläsare · inget du skriver skickas eller sparas · inget konto',
  footerDisclaimer: 'Oberoende webbplats från Radif Partners, utan koppling till regeringen, Riksdagen, någon myndighet, kommun eller fackförbund. Ditt kollektivavtal och ditt anställningsavtal kan ge mer ledighet; sidan ersätter inte juridisk rådgivning.',
  footerPopular: 'Verktyg',
  notFound: 'Det finns ingen sida på den här adressen. På startsidan hittar du semesterplaneraren, årets röda dagar och skollov per kommun.',
  readMore: 'Läs mer',
  moreOptions: 'Fler val', copyLink: 'Kopiera länken', copied: 'Länken kopierad', print: 'Skriv ut', howComputed: 'Så räknar vi', openFull: 'Till hela verktyget',
  countdownTo: 'Tid kvar till', days: 'dagar', hours: 'tim', minutes: 'min', seconds: 'sek', tzNote: 'Räknar med klockan i din enhet, tidszon', passed: 'Det datumet har passerat.',
};
const en: typeof sv = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Keep going', sourcesTitle: 'Official sources for this page', writtenBy: 'Prepared by',
  asOf: 'As of', lastUpdated: 'Swedish statutes and municipal school calendars checked on', footerValidated: 'Sources: Public Holidays Act (1989:253), Annual Leave Act (1977:480), Act on Computing Statutory Time Limits (1930:173), Summer Time Ordinance (2001:127), Education Ordinance (2011:185) and municipal school-year decisions',
  footerBrowser: 'Everything runs in your browser · nothing you type is sent or stored · no account',
  footerDisclaimer: 'Independent site published by Radif Partners, not affiliated with the Swedish government, the Riksdag, any agency, municipality or trade union. Collective agreements and employment contracts may give you more time off; this site does not replace legal advice.',
  footerPopular: 'Tools',
  notFound: 'Nothing lives at this address. The home page has the leave planner, this year\'s Swedish public holidays and school holidays by municipality.',
  readMore: 'Read more',
  moreOptions: 'More options', copyLink: 'Copy share link', copied: 'Link copied', print: 'Print', howComputed: 'How this is calculated', openFull: 'Open the full tool',
  countdownTo: 'Time left until', days: 'days', hours: 'hrs', minutes: 'min', seconds: 'sec', tzNote: 'Uses your device clock, time zone', passed: 'This date has passed.',
};
const ALL = { sv, en };
export function t(lang: Locale) { return ALL[lang] ?? sv; }
