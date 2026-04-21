export interface ProductImage {
  url: string;
  public_id: string;
}
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  mrp: number;
  seller: string;
  images: ProductImage[];
}

export interface CategoryDetails {
  id: string;
  name: string;
}
export interface PaginatedData {
  page: number;
  limit: number;
  totalPages: number;
  totalProducts: number;
  products: Product[];
  categoryDetails: CategoryDetails;
}
export interface PaginatedProductPromise {
  data: PaginatedData;
  message: string;
  status: string;
}
export interface SearchProductData {
  page: number;
  limit: number;
  totalPages: number;
  totalProducts: number;
  products: Product[];
}
export interface SearchProductPromise {
  data: PaginatedData;
  message: string;
  status: string;
}

export interface category {
  _id: string;
  name: string;
  description: string;
}
export interface SingleProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: category;
  stock: number;
  mrp: number;
  seller: string;
  images: { url: string; public_id: string }[];
}
export interface ProductPromise {
  data: SingleProduct;
  message: string;
  status: string;
}
export interface CartItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  mrp: number;
  images: { url: string; public_id: string }[];
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
export interface CategoryPromise {
  data: Category[];
  message: string;
  status: string;
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
