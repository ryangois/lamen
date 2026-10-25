// A shared 64-unit grid keeps the wheel and entry artwork consistent.
const paths = {
  aries: 'M32 54 C32 34 31 10 19 10 C5 10 7 29 17 30 M32 54 C32 34 33 10 45 10 C59 10 57 29 47 30',
  taurus: 'M12 9 C14 28 50 28 52 9 M47 39 A15 15 0 1 1 17 39 A15 15 0 1 1 47 39',
  gemini: 'M13 10 Q32 18 51 10 M13 54 Q32 46 51 54 M23 14 V50 M41 14 V50',
  cancer: 'M10 25 C19 9 46 12 51 25 M25 25 A8 8 0 1 1 9 25 A8 8 0 1 1 25 25 M54 39 C45 55 18 52 13 39 M55 39 A8 8 0 1 1 39 39 A8 8 0 1 1 55 39',
  leo: 'M24 40 A9 9 0 1 1 6 40 A9 9 0 1 1 24 40 M22 35 C36 25 17 10 32 9 C51 7 49 28 40 39 C29 56 49 59 55 47',
  virgo: 'M9 49 V16 M9 24 C9 12 23 12 23 24 V49 M23 24 C23 12 37 12 37 24 V43 C37 55 52 48 54 32 C56 17 44 18 44 31 C44 42 49 49 56 54',
  libra: 'M10 51 H54 M10 38 H23 A13 13 0 1 1 41 38 H54',
  scorpio: 'M8 47 V16 M8 24 C8 12 22 12 22 24 V47 M22 24 C22 12 36 12 36 24 V41 Q36 49 45 49 H56 M49 42 L56 49 L49 56',
  sagittarius: 'M12 52 L52 12 M34 12 H52 V30 M15 27 L37 49',
  capricorn: 'M7 19 L17 45 L28 17 V42 C28 59 55 57 55 41 C55 27 38 30 38 42 C38 48 45 52 53 54',
  aquarius: 'M8 26 L16 18 L24 26 L32 18 L40 26 L48 18 L56 26 M8 46 L16 38 L24 46 L32 38 L40 46 L48 38 L56 46',
  pisces: 'M16 10 C34 22 34 42 16 54 M48 10 C30 22 30 42 48 54 M10 32 H54',
  saturn: 'M23 9 V48 M13 20 H35 M23 34 C38 19 51 31 40 45 C32 58 44 58 49 51',
  jupiter: 'M15 16 C35 6 35 29 13 38 H51 M40 10 V55',
  mars: 'M39 39 A16 16 0 1 1 7 39 A16 16 0 1 1 39 39 M35 27 L55 7 M39 7 H55 V23',
  sun_p: 'M53 32 A21 21 0 1 1 11 32 A21 21 0 1 1 53 32 M33 32 A1 1 0 1 1 31 32 A1 1 0 1 1 33 32',
  venus: 'M47 24 A15 15 0 1 1 17 24 A15 15 0 1 1 47 24 M32 39 V57 M21 49 H43',
  mercury: 'M21 7 C21 22 43 22 43 7 M45 29 A13 13 0 1 1 19 29 A13 13 0 1 1 45 29 M32 42 V59 M22 51 H42',
  moon_p: 'M41 9 A24 24 0 1 0 41 55 A26 26 0 0 1 41 9',
};

export const celestialSymbolIds = Object.keys(paths);
export const celestialSymbolPath = (id) => paths[id] ? `/assets/celestial/${id}.svg` : null;
export function celestialSymbolSvg(id, color = '#fff') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[id]}"/></svg>`;
}
