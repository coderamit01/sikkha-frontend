import { serverFetch } from "@/lib/fetchApi";
import { CreatePaymentRequest, CreatePaymentResponse, IPayment } from "@/types/payment.types";

export const createPayment = async (payload: CreatePaymentRequest): Promise<CreatePaymentResponse> => {
  try {
    const data = await serverFetch("/payments/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.data;
  } catch (error: any) {
    throw error;
  }
};

export const getPayments = async () => {
  try {
    const data = await serverFetch("/payments", {
      method: "GET",
      cache: "no-cache",
    });
    return data.data;
  } catch (error: any) {
    console.log("getPayments failed:", error.message);
    throw error;
  }
};

export const getPaymentById = async (paymentId: string): Promise<IPayment> => {
  try {
    const data = await serverFetch(`/payments/${paymentId}`, {
      method: "GET",
      cache: "no-cache",
    });
    return data.data;
  } catch (error: any) {
    console.log("getPaymentById failed:", error.message);
    throw error;
  }
};

export const paymentService = {
  createPayment,
  getPayments,
  getPaymentById,
};
