import { Chatbot } from 'supersimpledev';
import { CARS } from '../data/cars.js';

const inr = (p) => (p ? `₹${p} lakh` : 'a price yet to be announced');
const clean = (s) => s.toLowerCase().replace(/-/g, ' ');
const ALIAS = { 'S-Presso': ['spresso'], 'Wagon R': ['wagonr'], 'Alto K10': ['alto'], 'e Vitara': ['evitara'] };

const findCars = (t) => {
  const found = CARS.filter((c) => t.includes(clean(c.name)) || (ALIAS[c.name] || []).some((a) => t.includes(a)));
  return found.filter((c) => !(c.name === 'e Vitara' && !/\be vitara\b|evitara/.test(t)));
};

const line = (c) => `• ${c.name} – from ${inr(c.price)} · ${c.fuel}`;
const detail = (c) =>
  `${c.name} (${c.channel})\n• Price: from ${inr(c.price)} ex-showroom (indicative)\n• Fuel: ${c.fuel}\n• Mileage: ${c.mileage}\n• Engine: ${c.engine}\n• Seats: ${c.seats}\n${c.blurb}`;
const compare = (a, b) =>
  `${a.name} vs ${b.name}\n• Price: ${inr(a.price)} vs ${inr(b.price)}\n• Fuel: ${a.fuel} vs ${b.fuel}\n• Mileage: ${a.mileage} vs ${b.mileage}\n• Engine: ${a.engine} vs ${b.engine}\n• Seats: ${a.seats} vs ${b.seats}`;

const BODY = [
  ['suv', /\b(suv|crossover)\b/],
  ['sedan', /\bsedan\b/],
  ['hatch', /\b(hatch|hatchback)\b/],
  ['mpv', /\b(mpv|7 seater|seven seater|family car)\b/],
  ['van', /\bvan\b/],
];

export function getReply(raw) {
  const t = clean(raw).trim();
  const hit = findCars(t);

  if (/\b(hi|hello|hey|namaste)\b/.test(t) && !hit.length)
    return 'Namaste! Ask me about any Maruti Suzuki car in India: price, mileage, engine, CNG, hybrid, or “best SUV under 10 lakh”.';
  if (/thank/.test(t)) return 'Happy to help! Want to compare two models?';
  if (/diesel/.test(t)) return 'Maruti Suzuki stopped selling diesel cars in India in 2020. Today’s range is petrol, CNG, strong-hybrid and (upcoming) electric.';
  if (/ciaz/.test(t)) return 'The Ciaz sedan has been discontinued. The Dzire is the sedan in the current lineup.';

  if (hit.length >= 2 && /(vs|versus|compare|difference|\bor\b)/.test(t)) return compare(hit[0], hit[1]);

  if (hit.length === 1) {
    const c = hit[0];
    if (/price|cost|how much|ex showroom/.test(t)) return `${c.name} starts at ${inr(c.price)} (ex-showroom, indicative). On-road price depends on your city and variant.`;
    if (/mileage|average|efficien|kmpl|km\/l/.test(t)) return `${c.name} mileage: ${c.mileage}.`;
    if (/engine|\bcc\b|power/.test(t)) return `${c.name} engine: ${c.engine}.`;
    if (/seat|capacity|people/.test(t)) return `${c.name} seats ${c.seats}.`;
    return detail(c);
  }

  let pool = CARS;
  let filtered = false;
  const b = t.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lac|lakhs|l\b)/);
  if (b) { pool = pool.filter((c) => c.price && c.price <= parseFloat(b[1])); filtered = true; }
  for (const [body, re] of BODY) if (re.test(t)) { pool = pool.filter((c) => c.body === body); filtered = true; }
  if (/\bcng\b/.test(t)) { pool = pool.filter((c) => /cng/i.test(c.fuel)); filtered = true; }
  if (/hybrid/.test(t)) { pool = pool.filter((c) => /hybrid/i.test(c.fuel)); filtered = true; }
  if (/\b(ev|electric)\b/.test(t)) { pool = pool.filter((c) => /electric/i.test(c.fuel)); filtered = true; }
  if (/nexa/.test(t)) { pool = pool.filter((c) => c.channel === 'Nexa'); filtered = true; }
  if (/arena/.test(t)) { pool = pool.filter((c) => c.channel === 'Arena'); filtered = true; }

  if (filtered || /(\ball\b|list|lineup|every|models|how many)/.test(t)) {
    if (!pool.length) return 'No Maruti Suzuki model matches that. Try a higher budget or fewer filters.';
    const sorted = [...pool].sort((x, y) => (x.price ?? 99) - (y.price ?? 99));
    return `${sorted.length} match${sorted.length > 1 ? 'es' : ''}:\n${sorted.map(line).join('\n')}\n\nPrices are indicative ex-showroom figures.`;
  }

  return Chatbot.getResponse(raw);
}
