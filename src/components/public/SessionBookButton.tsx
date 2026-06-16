"use client"

import { createBooking } from "@/actions/booking.action";
import { Button } from "@/components/ui/button"
import { useBookingStore } from "@/store/booking.store";
import { IUser } from "@/types/user.types";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const SessionBookButton = ({ tutorId, user }: { tutorId: string, user: IUser }) => {
  const router = useRouter();

  const { selectedAvailabilityId } = useBookingStore();

  const handleCreateBooking = async () => {

    if (!user) {
      toast.error("Please login to book a session.", { position: "top-right" });
      router.push('/login');
      return;
    }

    if (!selectedAvailabilityId) {
      toast.error("Please select a time slot first.", { position: "top-right" });
      return;
    }
    const result = await createBooking(tutorId, selectedAvailabilityId);

    if (result?.success) {
      toast.success("Session booked!", { position: "top-right" });
    } else {
      toast.error(result?.message || "Booking failed.", { position: "top-right" });
    }
  }


  return (
    <Button variant="default"
      onClick={handleCreateBooking}
      size="lg"
      className={`w-full h-12 py-4 rounded-xl font-bold text-base border border-brand
                      transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer
                      ${selectedAvailabilityId
          ? "bg-brand text-white hover:opacity-90 hover:bg-brand"
          : "bg-white text-brand opacity-60 cursor-not-allowed hover:bg-white"
        }`}
    >
      <BookOpen size={20} />
      Book Session
    </Button>
  )
}

export default SessionBookButton