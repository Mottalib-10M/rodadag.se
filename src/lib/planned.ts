/** Toutes les pages prévues (id = nom du fichier de src/content/guides, ou id d'une entrée d'un fichier à plusieurs pages).
 *  Les tests acceptent un lien vers ces ids pendant la rédaction. */
export const PLANNED_GUIDES = [
  'klamdagar-2026', 'klamdagar-2028', 'arbetsdagar-2027', 'semesterdagar', 'nasta-roda-dag', 'vecka', 'tidsfrist',
  'roda-dagar-2026', 'roda-dagar-2027', 'roda-dagar-2028', 'helgdagar', 'helgaftnar', 'kalender-2027', 'kalender-2028',
  'pask-2027', 'midsommar-2027', 'jul-2026', 'kristi-himmelsfard-2027', 'alla-helgons-dag-2026', 'nationaldagen-2027', 'sommartid-2027',
  'hostlov-2026', 'jullov-2026', 'sportlov-2027', 'sportlov-2027-stockholm', 'pasklov-2027', 'sommarlov-2027', 'skollov-2027',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, 'home', 'method', 'about', 'widget', 'contact', 'editorial', 'privacy', 'terms', 'cookies']);
