type roles = "customer" | "admin" | "seller";
export interface UserDocument {
  _id: string;
  name: string;
  gender: "male" | "female" | "other";
  phoneNumber: string;
  email: string;
  avatar: { url: string; public_id: string };
  roles: roles[];
  isActive: string;
}

export interface UserDocumentPromise {
  data: UserDocument;
  message: string;
  status: string;
}
