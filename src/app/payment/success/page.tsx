import PaymentSuccessContent from "@/components/public/PaymentSuccessContent";
import { Suspense } from "react";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}