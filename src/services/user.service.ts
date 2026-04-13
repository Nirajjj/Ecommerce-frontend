import api from "@/api/axios";
import type { UserDocumentPromise } from "@/types/userTypes";

const updateProfileImage = async (file: File): Promise<UserDocumentPromise> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.patch("/users/avatar", formData);
  return response.data;
};

export default {
  updateProfileImage,
};
