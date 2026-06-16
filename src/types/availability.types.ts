export interface IAvailability {
  id: string,
  tutorId: string,
  startTime: Date,
  endTime: Date,
  isBooked: boolean,
  createdAt: Date,
  updatedAt: Date
}

export interface IAvailabilityPayload {
  startTime: Date,
  endTime: Date,
}
