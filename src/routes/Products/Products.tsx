import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Spinner } from "@/components/ui/Spinner";
import { GET_CATEGORIES, GET_PRODUCTS, type Product } from "@/utils/requests";
import { ProductCard } from "@/components/ui/productCard/ProductCard";
import { useGetParamsOnLoad } from "@/hooks/useGetParamsOnLoad";
import { addQueryParamsSilently, removeQueryParamsSilently } from "@/utils/silentQueryParams";
import { ProductCardDialog } from "@/components/ui/productCard/ProductCardDialog";
import { ProductsContextProvider } from "./ProductsContextProvider";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMeasureItemsPerRow } from "@/hooks/useMeasureItemsPerRow";
import { useEffect, useRef, useState, type RefObject } from "react";

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

export const ProductsView = ({ productsData, categoriesData }: ProductsViewProps) => {
  const { category } = useGetParamsOnLoad(["category"]);
  const defaultCategory = categoriesData.find((categoryData) => categoryData.value === category);

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
        <CategoriesContent productsData={productsData} categoriesData={categoriesData} />
      </Tabs>
      <ProductCardDialog productsData={productsData} />
    </ProductsContextProvider>
  );
};

type CategoriesContentProps = {
  productsData: Product[];
  categoriesData: Awaited<ReturnType<(typeof GET_CATEGORIES)["queryFn"]>>;
};

const CategoriesContent = ({ productsData, categoriesData }: CategoriesContentProps) => {
  const [parentRef, itemsPerRow] = useMeasureItemsPerRow<HTMLDivElement>(CARD_WIDTH + ROW_GAP);

  return (
    <div
      ref={parentRef}
      className="overflow-auto w-screen"
      style={{ maxHeight: "calc(100vh - 120px)" }}
    >
      {categoriesData.map((category) => {
        const { value } = category;

        return (
          <TabsContent key={value} value={value}>
            <CategoryContent
              category={category}
              productsData={productsData}
              parentRef={parentRef}
              itemsPerRow={itemsPerRow}
            />
          </TabsContent>
        );
      })}
    </div>
  );
};

type CategoryContentProps = Pick<CategoriesContentProps, "productsData"> & {
  category: CategoriesContentProps["categoriesData"][number];
  parentRef: RefObject<HTMLDivElement | null>;
  itemsPerRow: number;
};

const CategoryContent = ({
  productsData,
  category,
  parentRef,
  itemsPerRow,
}: CategoryContentProps) => {
  const { value, filter } = category;
  const baseProducts = filter(productsData);
  const [products, setProducts] = useState(baseProducts);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // This is just a simulated infinite scroll, as the API only provides 20 products and there is no query support for pagination, limits, etc
        setProducts((prev) => [...prev, ...baseProducts]);
      }
    });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [baseProducts]);

  return (
    <TabsContent value={value}>
      <CategoryTabContent productsData={products} parentRef={parentRef} itemsPerRow={itemsPerRow} />
      <div ref={loaderRef} className="h-[100px]" />
    </TabsContent>
  );
};

const ROW_GAP = 16;
const BASE_ROW_HEIGHT = 884;
const CARD_WIDTH = 384;

type CategoryTabContentProps = {
  productsData: Product[];
  parentRef: RefObject<HTMLDivElement | null>;
  itemsPerRow: number;
};

const CategoryTabContent = ({ productsData, parentRef, itemsPerRow }: CategoryTabContentProps) => {
  const rowCount = itemsPerRow === 0 ? 0 : Math.ceil(productsData.length / itemsPerRow);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => BASE_ROW_HEIGHT + ROW_GAP,
    overscan: 5,
  });

  const totalHeight = rowVirtualizer.getTotalSize() + (rowCount - 1) * ROW_GAP;

  return (
    <div
      className="flex gap-4 flex-wrap justify-center relative"
      style={{
        height: `${totalHeight}px`,
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const items = productsData.slice(
          virtualRow.index * itemsPerRow,
          (virtualRow.index + 1) * itemsPerRow,
        );

        const topWithGap = virtualRow.start + virtualRow.index * ROW_GAP;

        return (
          <div
            data-index={virtualRow.index}
            key={virtualRow.key}
            className="w-full top-0 left-0 absolute flex gap-4 justify-center"
            style={{
              height: `${virtualRow.size}px`,
              transform: `translateY(${topWithGap}px)`,
            }}
          >
            {items.map((product) => (
              <ProductCard key={`${product.id}-${virtualRow.key}`} product={product} isOrderable />
            ))}
          </div>
        );
      })}
    </div>
  );
};

