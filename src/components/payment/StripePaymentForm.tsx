"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface StripePaymentFormProps {
  clientSecret: string;
  paymentId: string;
  bookingId: string;
  amount: number;
  tutorName: string;
  onSuccess?: (paymentIntentId: string) => void;
  onError?: (error: string) => void;
}

export const StripePaymentForm = ({
  clientSecret,
  paymentId,
  bookingId,
  amount,
  tutorName,
  onSuccess,
  onError,
}: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe not loaded. Please refresh the page.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();

      if (submitError) {
        setError(submitError.message || "Form validation failed");
        onError?.(submitError.message || "Form validation failed");
        toast.error(submitError.message || "Form validation failed");
        setLoading(false);
        return;
      }

      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success?bookingId=${bookingId}&paymentId=${paymentId}`,
        },
      });

      if (stripeError) {
        setError(stripeError.message || "Payment failed. Please try again.");
        onError?.(stripeError.message || "Payment failed");
        toast.error(stripeError.message || "Payment failed");
      }
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred during payment";
      setError(errorMessage);
      onError?.(errorMessage);
      toast.error(errorMessage, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
        <CardDescription>
          Booking with {tutorName} for ${amount}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Payment Details
            </label>
            <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
              {clientSecret ? (
                <PaymentElement
                  options={{
                    layout: "tabs",
                  }}
                />
              ) : (
                <p className="text-sm text-gray-500">Loading payment form...</p>
              )}
            </div>
          </div>

          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Booking ID</span>
              <code className="text-xs font-mono bg-white px-2 py-1 rounded">
                {bookingId.slice(0, 8)}...
              </code>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment ID</span>
              <code className="text-xs font-mono bg-white px-2 py-1 rounded">
                {paymentId.slice(0, 8)}...
              </code>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-lg text-brand">${amount}</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !stripe || !elements}
            className="w-full h-11 bg-brand hover:bg-brand/90 text-white font-semibold"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Processing Payment..." : `Pay $${amount}`}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Your payment information is encrypted and secure
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
