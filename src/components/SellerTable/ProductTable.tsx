import type { Product, ProductImage } from "@/types";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import styles from "./ProductTable.module.css";
import type { CellContext } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { useDeleteProduct } from "@/services/product.service";
import ButtonSpinner from "../global/Loader/ButtonSpinner";
import AddEditProduct from "../AddEditProduct/AddEditProduct";
import Modal from "../Modal/Modal";
export default function ProductTable({ data }: { data: Product[] }) {
  const { mutate: deleteProduct, isPending, isError } = useDeleteProduct();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  console.log(isPending, isError);

  const handleDelete = (id: string) => {
    const confirm: boolean = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (confirm) {
      setDeletingId(id);
      deleteProduct(id);
    }
  };
  const columns = useMemo(
    () => [
      {
        header: "Image",
        accessorKey: "images",
        cell: ({ row }: CellContext<Product, unknown>) => {
          const images = row.original.images;

          return (
            <div className={styles.imageContainer}>
              {images?.slice(0, 3).map((img: ProductImage) => (
                <img
                  key={img.url}
                  src={img.url}
                  alt="product"
                  className={styles.image}
                />
              ))}
            </div>
          );
        },
      },
      { header: "Product", accessorKey: "name" },
      { header: "Price", accessorKey: "price" },
      { header: "Stock", accessorKey: "stock" },

      {
        header: "Actions",
        cell: ({ row }: CellContext<Product, unknown>) => (
          <div className={styles.actions}>
            <button
              className={styles.editBtn}
              onClick={() => {
                setSelectedProductId(row.original._id);
                setShowAddEditModal(true);
              }}
            >
              Edit
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(row.original._id)}
            >
              {deletingId === row.original._id ? <ButtonSpinner /> : "Delete"}
            </button>
          </div>
        ),
      },
    ],
    [isPending],
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {showAddEditModal && (
        <Modal close={() => setShowAddEditModal(false)}>
          <AddEditProduct
            productId={selectedProductId ?? undefined}
            close={() => setShowAddEditModal(false)}
          />
        </Modal>
      )}
      <div className={styles.container}>
        <button
          className={styles.addBtn}
          onClick={() => {
            setSelectedProductId(null);
            setShowAddEditModal(true);
          }}
        >
          + Add Product
        </button>

        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.th}>
                    {header.column.columnDef.header as string}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={styles.row}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.td}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
