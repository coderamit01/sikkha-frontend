"use client";

import { useState } from "react";

interface PaymentData {
  bookingId: string;
  paymentId: string;
  clientSecret: string;
}

export const usePaymentFlow = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openConfirmation = () => setIsConfirmationOpen(true);
  const closeConfirmation = () => setIsConfirmationOpen(false);
  const closePayment = () => setIsPaymentOpen(false);

  const handlePaymentInitiated = (data: PaymentData) => {
    setPaymentData(data);  
    setIsConfirmationOpen(false);
    setTimeout(() => setIsPaymentOpen(true), 300);
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    console.log("Payment succeeded:", paymentIntentId);
    setIsPaymentOpen(false);
  };

  const handlePaymentError = (errorMsg: string) => {
    setError(errorMsg);
    setIsPaymentOpen(false);
  };

  const reset = () => {
    setIsConfirmationOpen(false);
    setIsPaymentOpen(false);
    setPaymentData(null);
    setError(null);
  };

  return {
    isConfirmationOpen,
    openConfirmation,
    closeConfirmation,

    isPaymentOpen,
    closePayment,

    clientSecret: paymentData?.clientSecret ?? null,
    paymentId: paymentData?.paymentId ?? null,
    bookingId: paymentData?.bookingId ?? null,

    error,

    handlePaymentInitiated,
    handlePaymentSuccess,
    handlePaymentError,
    reset,
  };
};