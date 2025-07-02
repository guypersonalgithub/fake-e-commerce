import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Spinner } from "@/components/ui/Spinner";
import { GET_CATEGORIES, GET_PRODUCTS } from "@/utils/requests";
import { ProductCard } from "@/components/ui/productCard/ProductCard";

export const Products = () => {
  const {
    data: productsData = [],
    isLoading: isLoadingProducts,
    isError: isProductsError,
  } = useQuery(GET_PRODUCTS);
  const {
    data: categoriesData = [],
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
  } = useQuery(GET_CATEGORIES);

  const isLoading = isLoadingProducts || isLoadingCategories;
  const isError = isProductsError || isCategoriesError;

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        Something went wrong, please refresh and try again
      </div>
    );
  }

  return (
    <div>
      <Tabs defaultValue={categoriesData[0].value} className="items-center justify-center">
        <TabsList className="border">
          {categoriesData.map((category) => {
            const { value, label } = category;
            return (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {categoriesData.map((category) => {
          const { value, filter } = category;

          return (
            <TabsContent key={value} value={value} className="flex gap-4 flex-wrap justify-center">
              {filter(productsData).map((product) => {
                return <ProductCard key={product.id} product={product} isOrderable />;
              })}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

