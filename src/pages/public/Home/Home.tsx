import CategorySection from "@/components/categorySection/CategorySection";
import Hero from "@/components/hero/Hero";
import ErrorState from "@/components/states/ErrorState";
import { useHomeCategories } from "@/hooks/useProductByCategory";
import toast from "react-hot-toast";

const Home = () => {
  const { data: products, isLoading, isError, errors } = useHomeCategories();

  if (isLoading) return <div>Loading categories...</div>;

  if (isError || errors.length) {
    toast.error("Failed to load products");

    return (
      <ErrorState
        title="Failed to load products"
        message="Please check your connection and try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  // const Electronics = products.Electronics?.data ?? {
  //   page: 1,
  //   limit: 0,
  //   totalPages: 0,
  //   totalProducts: 0,
  //   products: [],
  //   categoryName: "Electronics",
  // };

  return (
    <div>
      <Hero />
      {Object.keys(products).map((category) => {
        const product = products[category];
        if (!product) return null;
        return <CategorySection key={category} product={products[category]!} />;
      })}
    </div>
  );
};

export default Home;
