export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  seller: string;
  images: { url: string; public_id: string }[];
}
export interface PaginatedData {
  page: number;
  limit: number;
  totalPages: number;
  totalProducts: number;
  products: Product[];
  categoryDetails: Record<string, string>;
}
export interface ProductPromise {
  data: PaginatedData;
  message: string;
  status: string;
}
export interface CartItem {
  _id: string;
  product: string;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
}

export interface OrderItem {
  _id: string;
  product: string;
  quantity: number;
  priceAtPurchase: number;
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

export interface UserDocument {
  // change the name of the interface to avoid confusion with the model change to IUser or
  _id: string;
  name: string;
  gender: "male" | "female" | "other";
  phoneNumber: string;
  email: string;
  role: string;
  isActive: string;
}
