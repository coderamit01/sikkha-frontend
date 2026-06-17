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
  startTime: Date,
  endTime: Date,
}
