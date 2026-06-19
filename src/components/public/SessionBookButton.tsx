"use client"

import { useState } from "react";
import { createBooking } from "@/actions/booking.action";
import { Button } from "@/components/ui/button"
import { useBookingStore } from "@/store/booking.store";
import { IUser, Role } from "@/types/user.types";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PaymentConfirmationModal } from "@/components/modal/PaymentConfirmationModal";
import { PaymentModal } from "@/components/payment/PaymentModal";

interface SessionBookButtonProps {
  tutorId: string;
  user: IUser;
  tutorName?: string;
  hourlyRate?: number;
  enablePayment?: boolean;
  onBookingSuccess?: (bookingData: any) => void;
}

const SessionBookButton = ({
  tutorId,
  user,
  tutorName = "Tutor",
  hourlyRate = 0,
  enablePayment = false,
  onBookingSuccess,
}: SessionBookButtonProps) => {
  const router = useRouter();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<{
    clientSecret: string | null;
    paymentId: string | null;
    bookingId: string | null;
  }>({
    clientSecret: null,
    paymentId: null,
    bookingId: null,
  });

  const { selectedAvailabilityId } = useBookingStore();

  const handleBookClick = () => {
    if (!user) {
      toast.error("Please login to book a session.", { position: "top-right" });
      router.push('/login');
      return;
    }
    if (user.role !== Role.STUDENT) {
      toast.error("Only student can book a session.", { position: "top-right" });
      router.push('/login');
      return;
    }

    if (!selectedAvailabilityId) {
      toast.error("Please select a time slot first.", { position: "top-right" });
      return;
    }

    if (enablePayment) {
      setIsConfirmationOpen(true);
    } else {
      handleCreateBooking();
    }
  };

  const handleCreateBooking = async () => {
    setIsLoading(true);
    try {
      const result = await createBooking(tutorId, selectedAvailabilityId as string);

      if (result?.success) {
        toast.success("Session booked Successfully", { position: "top-right" });
        onBookingSuccess?.(result.data);
      } else {
        toast.error(result?.message || "Booking failed.", { position: "top-right" });
      }
    } catch (error) {
      toast.error("An error occurred", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentInitiated = (paymentDataFromModal: any) => {

    setPaymentData({
      clientSecret: paymentDataFromModal.clientSecret,
      paymentId: paymentDataFromModal.paymentId,
      bookingId: paymentDataFromModal.bookingId,
    });

    setIsConfirmationOpen(false);
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <Button
        variant="default"
        onClick={handleBookClick}
        disabled={!selectedAvailabilityId || isLoading}
        size="lg"
        className={`w-full h-12 py-4 rounded-xl font-bold text-base border border-brand
                        transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer
                        ${selectedAvailabilityId && !isLoading
            ? "bg-brand text-white hover:opacity-90 hover:bg-brand"
            : "bg-white text-brand opacity-60 cursor-not-allowed hover:bg-white"
          }`}
      >
        <BookOpen size={20} />
        {isLoading ? "Processing..." : "Book Session"}
      </Button>

      {enablePayment && (
        <>
          <PaymentConfirmationModal
            isOpen={isConfirmationOpen}
            onClose={() => setIsConfirmationOpen(false)}
            tutorId={tutorId}
            availabilityId={selectedAvailabilityId || ""}
            tutorName={tutorName}
            hourlyRate={hourlyRate}
            sessionTime={`${new Date().toLocaleDateString()} - Selected slot`}
            onPaymentInitiated={handlePaymentInitiated}
          />

          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => {
              setIsPaymentModalOpen(false);
              setPaymentData({ clientSecret: null, paymentId: null, bookingId: null });
            }}
            clientSecret={paymentData.clientSecret}
            paymentId={paymentData.paymentId}
            bookingId={paymentData.bookingId}
            amount={hourlyRate}
            tutorName={tutorName}
            onSuccess={(paymentIntentId) => {
              onBookingSuccess?.({
                bookingId: paymentData.bookingId,
                paymentId: paymentData.paymentId,
                paymentIntentId,
              });
            }}
          />
        </>
      )}
    </>
  );
};

export default SessionBookButton