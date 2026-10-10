import { describe, expect, it } from 'vitest';
import {
  type Appointment,
  findSlots,
  formatTime,
  intersect,
  type Professional,
  type Room,
  type Service,
} from './availability';

const h = (hours: number) => hours * 60;

const facial: Service = { id: 'facial', durationMin: 60, roomTypes: ['cabin'] };
const rooms: Room[] = [{ id: 'r1', name: 'Cabine 1', type: 'cabin' }];
const clinicHours = { 1: [h(9), h(18)] as const };

const ana: Professional = {
  id: 'ana',
  name: 'Ana',
  serviceIds: ['facial'],
  shifts: { 1: [[h(8), h(12)]] },
};

describe('intersect', () => {
  it('returns the overlapping window', () => {
    expect(intersect([0, 10], [5, 20])).toEqual([5, 10]);
  });

  it('returns null when windows only touch', () => {
    expect(intersect([0, 10], [10, 20])).toBeNull();
  });
});

describe('findSlots', () => {
  const base = {
    service: facial,
    weekday: 1 as const,
    professionals: [ana],
    rooms,
    clinicHours,
    appointments: [] as Appointment[],
  };

  it('clips the professional shift to clinic hours', () => {
    const slots = findSlots(base);
    // Ana entra às 8h, mas a clínica só abre às 9h
    expect(slots.map((s) => formatTime(s.start))).toEqual([
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
    ]);
  });

  it('returns nothing when the clinic is closed', () => {
    expect(findSlots({ ...base, weekday: 0 })).toEqual([]);
  });

  it('skips professionals who do not perform the service', () => {
    const bia: Professional = { ...ana, id: 'bia', serviceIds: ['massage'] };
    expect(findSlots({ ...base, professionals: [bia] })).toEqual([]);
  });

  it('skips slots that conflict with the professional agenda', () => {
    const slots = findSlots({
      ...base,
      appointments: [
        {
          weekday: 1,
          start: h(10),
          end: h(11),
          professionalId: 'ana',
          roomId: 'other',
        },
      ],
    });
    expect(slots.map((s) => formatTime(s.start))).toEqual(['09:00', '11:00']);
  });

  it('requires a compatible room free for the whole session', () => {
    const slots = findSlots({
      ...base,
      appointments: [
        {
          weekday: 1,
          start: h(9) + 30,
          end: h(10) + 30,
          professionalId: 'someone-else',
          roomId: 'r1',
        },
      ],
    });
    expect(slots.map((s) => formatTime(s.start))).toEqual(['10:30', '11:00']);
  });

  it('ignores rooms of the wrong type', () => {
    const laserOnly: Room[] = [{ id: 'l1', name: 'Laser', type: 'laser' }];
    expect(findSlots({ ...base, rooms: laserOnly })).toEqual([]);
  });

  it('falls back to another free room', () => {
    const twoRooms: Room[] = [
      ...rooms,
      { id: 'r2', name: 'Cabine 2', type: 'cabin' },
    ];
    const slots = findSlots({
      ...base,
      rooms: twoRooms,
      appointments: [
        {
          weekday: 1,
          start: h(9),
          end: h(10),
          professionalId: 'x',
          roomId: 'r1',
        },
      ],
    });
    expect(slots[0]).toMatchObject({ start: h(9), roomId: 'r2' });
  });

  it('allows a session that ends exactly at closing time', () => {
    const late: Professional = { ...ana, shifts: { 1: [[h(17), h(20)]] } };
    const slots = findSlots({ ...base, professionals: [late] });
    expect(slots.map((s) => formatTime(s.start))).toEqual(['17:00']);
  });
});
