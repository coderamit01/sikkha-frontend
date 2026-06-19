"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { getPaymentByIdAction } from "@/actions/payment.action";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paymentIntentId = searchParams.get("payment_intent");
  const bookingId = searchParams.get("bookingId");
  const paymentId = searchParams.get("paymentId");

  const [paymentStatus, setPaymentStatus] = useState<
    "loading" | "succeeded" | "failed"
  >("loading");
  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState(0);

  const MAX_POLLS = 60; 

  useEffect(() => {
    if (!paymentIntentId || !paymentId) {
      setPaymentStatus("failed");
      setError("Invalid payment information");
      return;
    }

    if (pollCount > MAX_POLLS) {
      setPaymentStatus("failed");
      setError("Payment verification taking longer than expected. Your payment is likely processing. Please check your bank or dashboard, or contact support if needed.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const result = await getPaymentByIdAction(paymentId);

        if (result.success && result.data) {
          setPaymentData(result.data);

          if (result.data.status === "SUCCEEDED") {
            setPaymentStatus("succeeded");
          } else if (result.data.status === "FAILED") {
            setPaymentStatus("failed");
            setError("Payment was declined");
          } else {
            setPaymentStatus("loading");
            setPollCount(prev => prev + 1);
          }
        } else {
          setPaymentStatus("failed");
          setError(result.message || "Unable to verify payment");
        }
      } catch (err: any) {
        setPaymentStatus("failed");
        setError(err.message || "Error verifying payment");
      }
    };

    const timer = setTimeout(verifyPayment, 500);
    return () => clearTimeout(timer);
  }, [paymentIntentId, paymentId, pollCount]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Payment Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            {paymentStatus === "loading" && (
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
            )}
            {paymentStatus === "succeeded" && (
              <CheckCircle className="h-16 w-16 text-green-600" />
            )}
            {paymentStatus === "failed" && (
              <XCircle className="h-16 w-16 text-red-600" />
            )}
          </div>

          <div className="text-center">
            {paymentStatus === "loading" && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Verifying Payment
                </h2>
                <p className="text-sm text-gray-600">
                  Please wait while we confirm your payment...
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Checking ({pollCount + 1}/{MAX_POLLS})
                </p>
              </>
            )}
            {paymentStatus === "succeeded" && (
              <>
                <h2 className="text-xl font-bold text-green-600 mb-2">
                  Payment Successful!
                </h2>
                <p className="text-sm text-gray-600">
                  Your booking has been confirmed. You can now start your session.
                </p>
              </>
            )}
            {paymentStatus === "failed" && (
              <>
                <h2 className="text-xl font-bold text-red-600 mb-2">
                  Payment Failed
                </h2>
                <p className="text-sm text-gray-600">
                  {error || "Your payment could not be processed."}
                </p>
              </>
            )}
          </div>

          {paymentData && (
            <div className="space-y-2 p-3 bg-gray-50 rounded-lg text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID</span>
                <code className="font-mono">{bookingId?.slice(0, 8)}...</code>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold">
                  ${paymentData.amount} {paymentData.currency.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span
                  className={`font-semibold ${paymentData.status === "SUCCEEDED"
                    ? "text-green-600"
                    : paymentData.status === "FAILED"
                      ? "text-red-600"
                      : "text-yellow-600"
                    }`}
                >
                  {paymentData.status}
                </span>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {paymentStatus === "succeeded" && (
              <>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Go to Dashboard
                </Button>
                <Button
                  onClick={() => router.push("/tutors")}
                  variant="outline"
                  className="w-full"
                >
                  Browse More Tutors
                </Button>
              </>
            )}
            {paymentStatus === "failed" && (
              <>
                <Button
                  onClick={() => router.push("/tutors")}
                  className="w-full bg-brand hover:bg-brand/90"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => router.push("/dashboard")}
                  variant="outline"
                  className="w-full"
                >
                  Go to Dashboard
                </Button>
              </>
            )}
            {paymentStatus === "loading" && (
              <>
                <Button
                  onClick={() => setPollCount(prev => prev + 1)}
                  variant="outline"
                  className="w-full"
                >
                  Check Payment Status
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Waiting for payment confirmation from your bank...
                  <br />
                  Do not close this page.
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
