import type {
  Appointment,
  Interval,
  Professional,
  Room,
  Service,
  Weekday,
} from './availability';

const h = (hours: number) => Math.round(hours * 60);
const range = (a: number, b: number): Interval => [h(a), h(b)];

export const services: Service[] = [
  { id: 'cleansing', durationMin: 60, roomTypes: ['cabin'] },
  { id: 'massage', durationMin: 60, roomTypes: ['zen'] },
  { id: 'laser', durationMin: 30, roomTypes: ['laser'] },
  { id: 'brows', durationMin: 30, roomTypes: ['cabin', 'chair'] },
];

export const rooms: Room[] = [
  { id: 'cabin-1', name: 'Cabine 1', type: 'cabin' },
  { id: 'cabin-2', name: 'Cabine 2', type: 'cabin' },
  { id: 'zen', name: 'Sala Zen', type: 'zen' },
  { id: 'laser', name: 'Laser', type: 'laser' },
  { id: 'chair', name: 'Bancada', type: 'chair' },
];

const weekdays = (days: Weekday[], intervals: Interval[]) =>
  Object.fromEntries(days.map((d) => [d, intervals]));

export const professionals: Professional[] = [
  {
    id: 'ana',
    name: 'Ana',
    serviceIds: ['cleansing', 'brows'],
    shifts: weekdays([1, 2, 3, 4, 5], [range(9, 13), range(14, 18)]),
  },
  {
    id: 'bruno',
    name: 'Bruno',
    serviceIds: ['massage'],
    shifts: weekdays([2, 3, 4, 5, 6], [range(10, 19)]),
  },
  {
    id: 'carla',
    name: 'Carla',
    serviceIds: ['laser', 'cleansing'],
    shifts: weekdays([1, 3, 5], [range(13, 20)]),
  },
  {
    id: 'diego',
    name: 'Diego',
    serviceIds: ['brows', 'massage'],
    shifts: { 4: [range(9, 17)], 6: [range(8, 14)] },
  },
];

export const clinicHours: Partial<Record<Weekday, Interval>> = {
  1: range(9, 19),
  2: range(9, 19),
  3: range(9, 19),
  4: range(9, 19),
  5: range(9, 19),
  6: range(9, 14),
};

export const initialAppointments: Appointment[] = [
  {
    weekday: 1,
    start: h(10),
    end: h(11),
    professionalId: 'ana',
    roomId: 'cabin-1',
  },
  {
    weekday: 1,
    start: h(14),
    end: h(15),
    professionalId: 'carla',
    roomId: 'cabin-1',
  },
  {
    weekday: 1,
    start: h(14),
    end: h(15),
    professionalId: 'x',
    roomId: 'cabin-2',
  },
  {
    weekday: 3,
    start: h(15),
    end: h(16.5),
    professionalId: 'bruno',
    roomId: 'zen',
  },
  {
    weekday: 4,
    start: h(11),
    end: h(12),
    professionalId: 'diego',
    roomId: 'zen',
  },
  {
    weekday: 5,
    start: h(9),
    end: h(12),
    professionalId: 'ana',
    roomId: 'cabin-2',
  },
];
