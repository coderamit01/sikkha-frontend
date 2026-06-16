"use client"
import { useBookingStore } from "@/store/booking.store";
import { IAvailability } from "@/types/availability.types";
import { localTime } from "@/utils/localTime";
import { Clock } from "lucide-react";

const AvailabilityButton = ({ available }: { available: IAvailability }) => {
 const {selectedAvailabilityId, setSelectedAvailabilityId} = useBookingStore();
 const isSelected = selectedAvailabilityId === available.id;
  const { startTime, endTime,isBooked } = available;
  const start = localTime(startTime);
  const end = localTime(endTime);
  return (
    <button
      key={available.id}
      disabled={isBooked}
      onClick={() => setSelectedAvailabilityId(available.id)}
      className={`w-full h-10 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-left flex items-center gap-2 bg-[#25a5a21c] text-brand cursor-pointer ${isSelected ? "bg-brand text-white" : ""} ${isBooked ? "bg-slate-200 text-slate-800" : "hover:bg-brand hover:text-white"}`}
    >
      <Clock size={16} />
      <span>
        {start} · {end}
      </span>
    </button>
  )
}

export default AvailabilityButton