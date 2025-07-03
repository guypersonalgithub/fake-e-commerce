import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Spinner } from "@/components/ui/Spinner";
import { GET_CATEGORIES, GET_PRODUCTS, type Product } from "@/utils/requests";
import { ProductCard } from "@/components/ui/productCard/ProductCard";
import { useGetParamsOnLoad } from "@/hooks/useGetParamsOnLoad";
import { useSilentQueryParams } from "@/hooks/useSilentQueryParams";
import { ProductCardDialog } from "@/components/ui/productCard/ProductCardDialog";
import { ProductsContextProvider } from "./ProductsContextProvider";

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
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        Something went wrong, please refresh and try again
      </div>
    );
  }

  return <ProductsView productsData={productsData} categoriesData={categoriesData} />;
};

type ProductsViewProps = {
  productsData: Product[];
  categoriesData: Awaited<ReturnType<(typeof GET_CATEGORIES)["queryFn"]>>;
};

const ProductsView = ({ productsData, categoriesData }: ProductsViewProps) => {
  const { category } = useGetParamsOnLoad(["category"]);
  const defaultCategory = categoriesData.find((categoryData) => categoryData.value === category);
  const { addQueryParamsSilently, removeQueryParamsSilently } = useSilentQueryParams();

  return (
    <ProductsContextProvider>
      <Tabs
        defaultValue={defaultCategory?.value ?? categoriesData[0].value}
        onValueChange={(value) => {
          if (value === "all") {
            return removeQueryParamsSilently(["category"]);
          }

          addQueryParamsSilently([{ key: "category", value }]);
        }}
        className="items-center justify-center"
      >
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
      <ProductCardDialog productsData={productsData} />
    </ProductsContextProvider>
  );
};

