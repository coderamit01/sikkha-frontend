"use client";

import { useState } from "react";
import { createPaymentAction } from "@/actions/payment.action";

export interface UsePaymentResult {
  clientSecret: string | null;
  paymentId: string | null;
  loading: boolean;
  error: string | null;
  initiatePayment: (bookingId: string) => Promise<boolean>;
  reset: () => void;
}

export const usePayment = (): UsePaymentResult => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async (bookingId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const result = await createPaymentAction({ bookingId });

      if (result.success && result.data) {
        setClientSecret(result.data.clientSecret);
        setPaymentId(result.data.paymentId);
        return true;
      } else {
        setError(result.message || "Failed to initiate payment");
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred while initiating payment";
      setError(errorMessage);
      console.error("Payment initiation error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setClientSecret(null);
    setPaymentId(null);
    setLoading(false);
    setError(null);
  };

  return {
    clientSecret,
    paymentId,
    loading,
    error,
    initiatePayment,
    reset,
  };
};
