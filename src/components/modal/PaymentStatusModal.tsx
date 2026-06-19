"use client";

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
import { CheckCircle, XCircle, Clock, AlertCircle, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export enum PaymentStatusType {
  PENDING = "pending",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

interface PaymentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: PaymentStatusType;
  bookingId: string;
  paymentId: string;
  message?: string;
  onComplete?: () => void;
}

export const PaymentStatusModal = ({
  isOpen,
  onClose,
  status,
  bookingId,
  paymentId,
  message,
  onComplete,
}: PaymentStatusModalProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const statusConfig = {
    [PaymentStatusType.PENDING]: {
      icon: <Clock className="h-12 w-12 text-yellow-600" />,
      title: "Payment Processing",
      description: "Your payment is being processed. Please wait...",
    },
    [PaymentStatusType.SUCCEEDED]: {
      icon: <CheckCircle className="h-12 w-12 text-green-600" />,
      title: "Payment Successful",
      description: "Your session has been confirmed and paid!",
    },
    [PaymentStatusType.FAILED]: {
      icon: <XCircle className="h-12 w-12 text-red-600" />,
      title: "Payment Failed",
      description: message || "Your payment could not be processed. Please try again.",
    },
  };

  const config = statusConfig[status];

  const handleClose = () => {
    if (status === PaymentStatusType.SUCCEEDED) {
      onComplete?.();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <div className="flex justify-center mb-4">{config.icon}</div>
          <DialogTitle className="text-center text-xl">{config.title}</DialogTitle>
          <DialogDescription className="text-center">{config.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-6">
          <Card className="border border-gray-200">
            <CardContent className="pt-6 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Booking ID</span>
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono bg-gray-50 px-2 py-1 rounded text-gray-900">
                    {bookingId.slice(0, 8)}...
                  </code>
                  <button onClick={() => copyToClipboard(bookingId)} className="p-1 hover:bg-gray-100 rounded">
                    <Copy className="h-3 w-3 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-100" />
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Payment ID</span>
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono bg-gray-50 px-2 py-1 rounded text-gray-900">
                    {paymentId.slice(0, 8)}...
                  </code>
                  <button onClick={() => copyToClipboard(paymentId)} className="p-1 hover:bg-gray-100 rounded">
                    <Copy className="h-3 w-3 text-gray-600" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {status === PaymentStatusType.PENDING && (
            <div className="flex gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-semibold mb-1">Processing...</p>
                <p className="text-xs">Do not close this window or refresh the page</p>
              </div>
            </div>
          )}

          {status === PaymentStatusType.SUCCEEDED && (
            <div className="flex gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div className="text-sm text-green-700">
                <p className="font-semibold mb-1">All set!</p>
                <p className="text-xs">You can now start your session. Check your dashboard for details.</p>
              </div>
            </div>
          )}

          {status === PaymentStatusType.FAILED && (
            <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-sm text-red-700">
                <p className="font-semibold mb-1">Payment unsuccessful</p>
                <p className="text-xs">Please check your payment details and try again</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {status === PaymentStatusType.FAILED ? (
            <>
              <Button variant="outline" onClick={handleClose}>Close</Button>
              <Button className="bg-brand hover:bg-brand/90">Try Again</Button>
            </>
          ) : (
            <Button
              onClick={handleClose}
              disabled={status === PaymentStatusType.PENDING}
              className={status === PaymentStatusType.SUCCEEDED ? "bg-green-600 hover:bg-green-700 w-full" : ""}
            >
              {status === PaymentStatusType.SUCCEEDED ? "Go to Dashboard" : "Close"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};