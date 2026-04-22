export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name?: string;
  description?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
export interface OrderItem {
  product: string;
  quantity: number;
  priceAtPurchase: number;
  seller: string;
  productStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";
}
export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: string;
  paymentStatus: "pending" | "paid" | "failed";
  status: "pending" | "shipped" | "delivered" | "cancelled" | "processing";
  razorpayOrderId: string;
  razorpayPaymentId: string;
}
export interface RazorpayBackendResponse {
  order: Order;
  razorpay_order_id: string;
  amount: number;
  currency: string;
}
export interface RazorpayResponsePromise {
  data: RazorpayBackendResponse;
  status: string;
  message: string;
}
export interface RazorpayPayLoad {
  shippingAddress: string;
  productId: string;
  quantity: number;
}
export interface RazorpayErrorResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
}
export interface RazorpayInstance {
  open: () => void;
  on: (
    event: "payment.failed",
    callback: (response: RazorpayErrorResponse) => void,
  ) => void;
}

export interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}
