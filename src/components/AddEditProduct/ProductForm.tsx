import type { Category, ProductImage, SingleProduct } from "@/types";
import styles from "./ProductForm.module.css";
import { useEffect, useState } from "react";
import { addProduct, updateProduct } from "@/services/product.service";
// import useAuthStore from "@/store/useAuthStore";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import ButtonSpinner from "../global/Loader/ButtonSpinner";
import { useForm } from "react-hook-form";
import { productSchema, type ProductFormValues } from "@/schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../global/FormError/FormError"; // Ensure path is correct

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
  const queryClient = useQueryClient();
  // const userId = useAuthStore((state) => state.user?._id);
  const [slots, setSlots] = useState<ImageSlot[]>(() =>
    buildSlots(product?.images),
  );

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    values: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      mrp: product?.mrp ?? 0,
      category: product?.category?._id ?? "",
    },
  });

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      slots.forEach((slot) => {
        if (slot.kind === "new") URL.revokeObjectURL(slot.preview);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleImageChange = (file: File, index: number) => {
    setSlots((prev) => {
      const updated = [...prev];
      const current = updated[index];

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

      updated.splice(index, 1);
      updated.push({ kind: "empty" });
      return updated;
    });
  };

  // Renamed to onSubmit to avoid conflict with RHF's handleSubmit
  const onSubmit = async (data: ProductFormValues) => {
    const formData = new FormData();

    // Use validated data from RHF
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("stock", String(data.stock));
    formData.append("mrp", String(data.mrp));
    formData.append("category", data.category);

    const existingImages: ProductImage[] = [];

    slots.forEach((slot) => {
      if (slot.kind === "new") {
        formData.append("images", slot.file);
      } else if (slot.kind === "existing") {
        existingImages.push({ url: slot.url, public_id: slot.public_id });
      }
    });

    formData.append("images", JSON.stringify(existingImages));

    try {
      if (productId) {
        const response = await updateProduct(formData, productId);
        if (response.status === "success") {
          toast.success("Product updated successfully");
          queryClient.invalidateQueries({ queryKey: ["sellerProducts"] });
          queryClient.invalidateQueries({ queryKey: ["product", productId] });
        }
      } else {
        const response = await addProduct(formData);
        if (response.status === "success") {
          toast.success("Product created successfully");
          queryClient.invalidateQueries({
            queryKey: ["sellerProducts", product, productId],
          });
        }
      }
      close();
    } catch (error) {
      toast.error("Failed to save product");
      console.log(error);
    }
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

      {/* Replaced generic div with a form element */}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Product name</label>
          <input
            id="name"
            type="text"
            placeholder="Product name"
            {...register("name")}
          />
          <FormError message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            {...register("description")}
          />
          <FormError message={errors.description?.message} />
        </div>

        <div>
          <label htmlFor="mrp">MRP</label>
          <input
            id="mrp"
            type="number"
            placeholder="MRP"
            {...register("mrp", { valueAsNumber: true })}
          />
          <FormError message={errors.mrp?.message} />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
          />
          <FormError message={errors.price?.message} />
        </div>

        <div>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            placeholder="Stock"
            {...register("stock", { valueAsNumber: true })}
          />
          <FormError message={errors.stock?.message} />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select id="category" {...register("category")}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <FormError message={errors.category?.message} />
        </div>

        <button
          className={styles.submitBtn}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ButtonSpinner />
          ) : productId ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
