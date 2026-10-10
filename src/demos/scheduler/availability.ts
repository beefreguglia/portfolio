/**
 * Motor de disponibilidade da demo de agendamento.
 * Regra de negócio pura (sem React), no espírito da Clean Architecture usada no projeto real.
 * Horários em minutos desde 00:00; dias da semana 0 (domingo) a 6 (sábado).
 */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Interval = readonly [start: number, end: number];

export interface Service {
  id: string;
  durationMin: number;
  roomTypes: readonly string[];
}

export interface Professional {
  id: string;
  name: string;
  serviceIds: readonly string[];
  shifts: Partial<Record<Weekday, readonly Interval[]>>;
}

export interface Room {
  id: string;
  name: string;
  type: string;
}

export interface Appointment {
  weekday: Weekday;
  start: number;
  end: number;
  professionalId: string;
  roomId: string;
}

export interface Slot {
  start: number;
  end: number;
  professionalId: string;
  roomId: string;
}

export interface FindSlotsInput {
  service: Service;
  weekday: Weekday;
  professionals: readonly Professional[];
  rooms: readonly Room[];
  clinicHours: Partial<Record<Weekday, Interval>>;
  appointments: readonly Appointment[];
  stepMin?: number;
}

export function overlaps(a: Interval, b: Interval) {
  return a[0] < b[1] && b[0] < a[1];
}

export function intersect(a: Interval, b: Interval): Interval | null {
  const start = Math.max(a[0], b[0]);
  const end = Math.min(a[1], b[1]);
  return start < end ? [start, end] : null;
}

export function findSlots({
  service,
  weekday,
  professionals,
  rooms,
  clinicHours,
  appointments,
  stepMin = 30,
}: FindSlotsInput): Slot[] {
  const clinic = clinicHours[weekday];
  if (!clinic) return [];

  const dayAppointments = appointments.filter((a) => a.weekday === weekday);
  const compatibleRooms = rooms.filter((r) =>
    service.roomTypes.includes(r.type)
  );
  const slots: Slot[] = [];

  const isFree = (
    key: 'professionalId' | 'roomId',
    id: string,
    window: Interval
  ) =>
    !dayAppointments.some(
      (a) => a[key] === id && overlaps([a.start, a.end], window)
    );

  for (const pro of professionals) {
    // Regra 1: só quem realiza o procedimento
    if (!pro.serviceIds.includes(service.id)) continue;

    for (const shift of pro.shifts[weekday] ?? []) {
      // Regra 2: expediente do profissional ∩ horário da clínica
      const window = intersect(shift, clinic);
      if (!window) continue;

      for (
        let start = window[0];
        start + service.durationMin <= window[1];
        start += stepMin
      ) {
        const session: Interval = [start, start + service.durationMin];
        // Regra 4: sem conflito com atendimentos do profissional
        if (!isFree('professionalId', pro.id, session)) continue;
        // Regra 3: sala compatível e livre durante toda a sessão
        const room = compatibleRooms.find((r) =>
          isFree('roomId', r.id, session)
        );
        if (!room) continue;
        slots.push({
          start: session[0],
          end: session[1],
          professionalId: pro.id,
          roomId: room.id,
        });
      }
    }
  }

  return slots.sort(
    (a, b) =>
      a.start - b.start || a.professionalId.localeCompare(b.professionalId)
  );
}

export function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
