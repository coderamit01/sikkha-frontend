"use server"

import { paymentService } from "@/services/payment.service";
import { CreatePaymentRequest } from "@/types/payment.types";
import { revalidatePath } from "next/cache";

export const createPaymentAction = async (payload: CreatePaymentRequest) => {
  try {
    const data = await paymentService.createPayment(payload);
    revalidatePath("/dashboard");
    return {
      success: true,
      data,
      message: "Payment created successfully"
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create payment"
    };
  }
};

export const getPaymentsAction = async () => {
  try {
    const data = await paymentService.getPayments();
    return {
      success: true,
      data,
      message: "Payments retrieved successfully"
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to retrieve payments"
    };
  }
};

export const getPaymentByIdAction = async (paymentId: string) => {
  try {
    const data = await paymentService.getPaymentById(paymentId);
    return {
      success: true,
      data,
      message: "Payment retrieved successfully"
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to retrieve payment"
    };
  }
};
