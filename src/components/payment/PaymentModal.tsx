"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StripePaymentForm } from "@/components/payment/StripePaymentForm";
import { StripeProvider } from "@/providers/StripeProvider";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientSecret: string | null;
  paymentId: string | null;
  bookingId: string | null;
  amount: number;
  tutorName: string;
  onSuccess?: (paymentIntentId: string) => void;
  onError?: (error: string) => void;
}

export const PaymentModal = ({
  isOpen,
  onClose,
  clientSecret,
  paymentId,
  bookingId,
  amount,
  tutorName,
  onSuccess,
  onError,
}: PaymentModalProps) => {
  const isReady = clientSecret && paymentId && bookingId;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Secure Payment</DialogTitle>
          <DialogDescription>
            Enter your payment details to complete your booking
          </DialogDescription>
        </DialogHeader>

        <div>
          {isReady ? (
            <StripeProvider clientSecret={clientSecret}>
              <StripePaymentForm
                clientSecret={clientSecret}
                paymentId={paymentId}
                bookingId={bookingId}
                amount={amount}
                tutorName={tutorName}
                onSuccess={onSuccess}
                onError={onError}
              />
            </StripeProvider>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <p className="text-sm text-gray-600">Unable to load payment form</p>
              <button onClick={onClose} className="text-sm text-brand hover:underline">
                Close
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
