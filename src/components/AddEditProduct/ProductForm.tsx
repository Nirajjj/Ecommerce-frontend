import type { Category, Product, ProductImage, SingleProduct } from "@/types";
import styles from "./ProductForm.module.css";
import { useEffect, useState } from "react";
import { addProduct, updateProduct } from "@/services/product.service";
import useAuthStore from "@/store/useAuthStore";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

type ImageSlot =
  | { kind: "existing"; url: string; public_id: string }
  | { kind: "new"; file: File; preview: string }
  | { kind: "empty" };

const TOTAL_SLOTS = 5;

const buildSlots = (images: ProductImage[] = []): ImageSlot[] => {
  const filled: ImageSlot[] = images.map((img) => ({
    kind: "existing",
    url: img.url,
    public_id: img.public_id,
  }));

  const empty: ImageSlot[] = Array.from(
    { length: TOTAL_SLOTS - filled.length },
    () => ({ kind: "empty" }),
  );

  return [...filled, ...empty];
};

const ProductForm = ({
  product,
  productId,
  categories,
  close,
}: {
  product: SingleProduct | null;
  productId?: string;
  categories: Category[];
  close: () => void;
}) => {
  console.log(product);
  const queryClient = useQueryClient();
  const [slots, setSlots] = useState<ImageSlot[]>(() =>
    buildSlots(product?.images),
  );
  const userId = useAuthStore((state) => state.user?._id);
  const [form, setForm] = useState<Product>({
    _id: product?._id ?? "",
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    mrp: product?.mrp ?? 0,
    seller: product?.seller ?? userId!,
    images: product?.images ?? [],
    category: product?.category._id ?? "",
  });

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      slots.forEach((slot) => {
        if (slot.kind === "new") URL.revokeObjectURL(slot.preview);
      });
    };
  }, []);

  const handleImageChange = (file: File, index: number) => {
    setSlots((prev) => {
      const updated = [...prev];
      const current = updated[index];

      // Revoke old preview if replacing a new image
      if (current.kind === "new") URL.revokeObjectURL(current.preview);

      updated[index] = {
        kind: "new",
        file,
        preview: URL.createObjectURL(file),
      };
      return updated;
    });
  };

  const handleRemove = (index: number) => {
    setSlots((prev) => {
      const updated = [...prev];
      const current = updated[index];

      if (current.kind === "new") URL.revokeObjectURL(current.preview);

      // Remove and push an empty slot to the end to keep 5 total
      updated.splice(index, 1);
      updated.push({ kind: "empty" });
      return updated;
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", String(form.price));
    formData.append("stock", String(form.stock));
    formData.append("mrp", String(form.mrp));
    formData.append("category", form.category);
    const existingImages: ProductImage[] = [];

    slots.forEach((slot) => {
      if (slot.kind === "new") {
        // New files go as multipart
        formData.append("images", slot.file);
      } else if (slot.kind === "existing") {
        // Existing images that weren't removed
        existingImages.push({ url: slot.url, public_id: slot.public_id });
      }
    });

    // Send existing images as JSON so backend knows which to keep
    formData.append("images", JSON.stringify(existingImages));

    try {
      if (productId) {
        await updateProduct(formData, productId);
        toast.success("Product updated successfully");
      } else {
        await addProduct(formData);
        toast.success("Product created successfully");
        console.log("Creating:", formData);
      }
      queryClient.invalidateQueries({ queryKey: ["sellerProducts"] });
      close();
    } catch (error) {
      toast.error("Failed to save product");
      console.log(error);
    }
  };

  const handleField =
    <K extends keyof Product>(key: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value =
        e.target.type === "number"
          ? (e.target as HTMLInputElement).valueAsNumber
          : e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {productId ? "Edit Product" : "Add Product"}
      </h2>

      <div className={styles.imageGrid}>
        {slots.map((slot, index) => (
          <div key={index} className={styles.imageBox}>
            {slot.kind === "empty" ? (
              <label className={styles.imageBox}>
                <span className={styles.plus}>+</span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageChange(file, index);
                  }}
                />
              </label>
            ) : (
              <div className={styles.imagePreviewWrapper}>
                <img
                  src={slot.kind === "new" ? slot.preview : slot.url}
                  alt={`Product image ${index + 1}`}
                  className={styles.preview}
                />
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(index)}
                  type="button"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.form}>
        <label htmlFor="name">Product name</label>
        <input
          type="text"
          placeholder="Product name"
          value={form.name}
          onChange={handleField("name")}
        />
        <label htmlFor="description">Description</label>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={handleField("description")}
        />
        <label htmlFor="mrp">MRP</label>
        <input
          type="number"
          placeholder="MRP"
          value={form.mrp}
          onChange={handleField("mrp")}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleField("price")}
        />
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleField("stock")}
        />

        <label htmlFor="category">Category</label>
        <select value={form.category} onChange={handleField("category")}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <button className={styles.submitBtn} onClick={handleSubmit}>
          {productId ? "Update Product" : "Add Product"}
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
