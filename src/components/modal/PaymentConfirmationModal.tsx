"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { createBookingWithPayment } from "@/actions/booking-with-payment.action";

const STRIPE_MINIMUM_USD = 0.5;

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorId: string;
  availabilityId: string;
  tutorName: string;
  hourlyRate: number;
  sessionTime: string;
  onPaymentInitiated?: (paymentData: {
    bookingId: string;
    paymentId: string;
    clientSecret: string;
  }) => void;
}

export const PaymentConfirmationModal = ({
  isOpen,
  onClose,
  tutorId,
  availabilityId,
  tutorName,
  hourlyRate,
  sessionTime,
  onPaymentInitiated,
}: PaymentConfirmationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isBelowMinimum = hourlyRate < STRIPE_MINIMUM_USD;

  const handleConfirm = async () => {
    if (isBelowMinimum) {
      setError(
        `Minimum booking amount is $${STRIPE_MINIMUM_USD.toFixed(2)} USD for payment processing.`
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await createBookingWithPayment(tutorId, availabilityId);

      if (result.success && result.booking && result.payment) {
        onPaymentInitiated?.({
          bookingId: result.booking.id,
          paymentId: result.payment.paymentId as string,
          clientSecret: result.payment.clientSecret as string,
        });
        onClose();
      } else {
        setError(result.message || "Failed to create booking and payment");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      console.error("Payment confirmation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Confirm Your Booking</DialogTitle>
          <DialogDescription>
            Review your session details before proceeding to payment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Card className="border border-gray-200">
            <CardContent className="pt-6 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Tutor</span>
                <span className="text-sm font-semibold text-gray-900">
                  {tutorName}
                </span>
              </div>
              <div className="border-t border-gray-100" />
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">
                  Session Time
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {sessionTime}
                </span>
              </div>
              <div className="border-t border-gray-100" />
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">
                  Hourly Rate
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  ${hourlyRate}
                </span>
              </div>
              <div className="border-t border-gray-100" />
              <div className="flex justify-between items-start bg-blue-50 p-3 rounded-lg">
                <span className="text-sm font-semibold text-gray-900">
                  Total Amount
                </span>
                <span className="text-lg font-bold text-brand">
                  ${hourlyRate}
                </span>
              </div>
            </CardContent>
          </Card>

          {isBelowMinimum && (
            <div className="flex gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-semibold mb-1">Amount Too Low</p>
                <p className="text-xs">
                  Minimum is ${STRIPE_MINIMUM_USD.toFixed(2)} USD for Stripe processing.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-gray-700">
              You will be redirected to our secure payment page to complete your payment.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading || isBelowMinimum}
            className="bg-brand hover:bg-brand/90"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
