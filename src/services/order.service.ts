import api from "@/api/axios";
import type {
  RazorpayPayLoad,
  RazorpayResponse,
  RazorpayResponsePromise,
} from "@/types/razorpay";

export async function createOrder(
  data: RazorpayPayLoad,
): Promise<RazorpayResponsePromise> {
  const response = await api.post("/orders/create-order", data);
  return response.data;
}

export async function verifyPayment(data: RazorpayResponse) {
  const response = await api.post("/orders/verify-payment", data);
  return response.data;
}
export async function getOrders() {
  const response = await api.get("/orders");
  return response.data;
}
