"use client";

import { useState } from "react";
import { PaymentConfirmationModal } from "@/components/modal/PaymentConfirmationModal";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { PaymentStatusModal, PaymentStatusType } from "@/components/modal/PaymentStatusModal";
import { usePaymentFlow } from "@/hooks/usePaymentFlow";
import { toast } from "sonner";

interface PaymentFlowManagerProps {
  tutorId: string;
  availabilityId: string;
  tutorName: string;
  hourlyRate: number;
  sessionTime: string;
  onComplete?: () => void;
}

export const PaymentFlowManager = ({
  tutorId,
  availabilityId,
  tutorName,
  hourlyRate,
  sessionTime,
  onComplete,
}: PaymentFlowManagerProps) => {
  const {
    isConfirmationOpen,
    openConfirmation,
    closeConfirmation,
    isPaymentOpen,
    closePayment,
    clientSecret,
    paymentId,
    bookingId,
    error,
    handlePaymentInitiated,
    handlePaymentSuccess,
    reset,
  } = usePaymentFlow();

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusType | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const handlePaymentSuccess_Internal = (paymentIntentId: string) => {
    setPaymentStatus(PaymentStatusType.SUCCEEDED);
    setShowStatusModal(true);
    handlePaymentSuccess(paymentIntentId);
    toast.success("Payment completed successfully!");
  };

  const handlePaymentError_Internal = (error: string) => {
    setPaymentStatus(PaymentStatusType.FAILED);
    setShowStatusModal(true);
    toast.error(error);
  };

  const handleStatusModalComplete = () => {
    setShowStatusModal(false);
    reset();
    onComplete?.();
  };

  return (
    <>
      <PaymentConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={closeConfirmation}
        tutorId={tutorId}
        availabilityId={availabilityId}
        tutorName={tutorName}
        hourlyRate={hourlyRate}
        sessionTime={sessionTime}
        onPaymentInitiated={handlePaymentInitiated}
      />
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={closePayment}
        clientSecret={clientSecret}
        paymentId={paymentId}
        bookingId={bookingId}
        amount={hourlyRate}
        tutorName={tutorName}
        onSuccess={handlePaymentSuccess_Internal}
        onError={handlePaymentError_Internal}
      />

      {paymentStatus && (
        <PaymentStatusModal
          isOpen={showStatusModal}
          onClose={() => {
            if (paymentStatus === PaymentStatusType.SUCCEEDED) {
              handleStatusModalComplete();
            } else {
              setShowStatusModal(false);
            }
          }}
          status={paymentStatus}
          bookingId={bookingId || ""}
          paymentId={paymentId || ""}
          message={error || undefined}
          onComplete={handleStatusModalComplete}
        />
      )}

      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.__openPaymentFlow = ${openConfirmation.toString()};
          `,
        }}
      />
    </>
  );
};
