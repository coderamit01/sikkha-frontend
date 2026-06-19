"use client";

import { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import { StripeElementsOptions } from "@stripe/stripe-js";

const stripePromise = getStripe();

interface StripeProviderProps {
  children: ReactNode;
  clientSecret: string;
}

export const StripeProvider = ({ children, clientSecret }: StripeProviderProps) => {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#0066CC",
        colorBackground: "#ffffff",
        colorText: "#30313d",
        colorDanger: "#fa755a",
        fontFamily: "Ideal Sans, system-ui, sans-serif",
        spacingUnit: "2px",
        borderRadius: "4px",
      },
      rules: {
        ".Label": {
          fontWeight: "500",
        },
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};