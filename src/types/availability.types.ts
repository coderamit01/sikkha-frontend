export enum DayOfWeek {
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
}

export interface IAvailability {
  id: string,
  tutorId: string,
  day: string,
  startTime: string,
  endTime: string,
  isBooked: boolean,
  createdAt: Date,
  updatedAt: Date
}

export interface IAvailabilityPayload {
  day: DayOfWeek,
  startTime: string,
  endTime: string,
}
