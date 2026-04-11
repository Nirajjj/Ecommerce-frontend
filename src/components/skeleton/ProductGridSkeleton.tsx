import ProductSkeleton from "./Skeleton";
import "./productGridSkeleton.css";

const ProductGridSkeleton = () => {
  return (
    <div className="grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
