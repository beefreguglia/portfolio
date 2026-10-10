export type Channel = 'airbnb' | 'booking' | 'direct';

export interface StayEvent {
  id: string;
  kind: 'reservation' | 'block';
  start: number;
  nights: number;
  guest?: string;
  channel?: Channel;
  reason?: 'maintenance' | 'ownerUse';
}

export interface Property {
  id: string;
  code: string;
  city: string;
  ownerId: string;
  events: StayEvent[];
}

/** PRNG determinístico para os dados fictícios não mudarem a cada render. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const cities = ['FLN', 'GRM', 'SAO', 'RIO', 'BCN', 'UBA'];
const guests = [
  'Marina S.',
  'João P.',
  'Lucas M.',
  'Beatriz R.',
  'Ana C.',
  'Pedro H.',
  'Camila T.',
  'Rafael G.',
  'Julia F.',
  'Thiago L.',
];
const channels: Channel[] = ['airbnb', 'booking', 'direct'];

export function generateProperties(count: number, days: number): Property[] {
  const rand = mulberry32(42);
  const pick = <T>(list: T[]) => list[Math.floor(rand() * list.length)];

  return Array.from({ length: count }, (_, i) => {
    const city = pick(cities);
    const events: StayEvent[] = [];
    let day = Math.floor(rand() * 4);
    while (day < days) {
      const isBlock = rand() < 0.15;
      const nights = isBlock
        ? 1 + Math.floor(rand() * 3)
        : 2 + Math.floor(rand() * 6);
      events.push(
        isBlock
          ? {
              id: `${i}-${day}`,
              kind: 'block',
              start: day,
              nights,
              reason: rand() < 0.5 ? 'maintenance' : 'ownerUse',
            }
          : {
              id: `${i}-${day}`,
              kind: 'reservation',
              start: day,
              nights,
              guest: pick(guests),
              channel: pick(channels),
            }
      );
      day += nights + Math.floor(rand() * 4);
    }
    return {
      id: `p${i}`,
      code: `${city}${String(i + 1).padStart(3, '0')}`,
      city,
      ownerId: i % 7 === 0 ? 'owner-1' : `owner-${(i % 5) + 2}`,
      events,
    };
  });
}
