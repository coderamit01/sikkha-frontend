import { create } from "zustand";

interface BookingStore {
  selectedAvailabilityId: string | null ,
  setSelectedAvailabilityId: (id: string) => void
}

export const useBookingStore = create<BookingStore>((set) => ({
  selectedAvailabilityId: null,
  setSelectedAvailabilityId: (id) => set({selectedAvailabilityId: id}),
}));