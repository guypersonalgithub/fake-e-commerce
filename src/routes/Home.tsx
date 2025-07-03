import { Card, CardContent } from "@/components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import { Spinner } from "@/components/ui/Spinner";
import { GET_PRODUCTS, type Product } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const Home = () => {
  const { data = [], isLoading, isError } = useQuery(GET_PRODUCTS);

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

  return <HomeView data={data} />;
};

type HomeViewProps = {
  data: Product[];
};

const HomeView = ({ data }: HomeViewProps) => {
  const navigate = useNavigate();

  return (
    <div
      style={{ maxWidth: "calc(100% - 100px)" }}
      className="flex flex-col gap-10 justify-center items-center mx-auto"
    >
      <h1 className="font-bold text-2xl">
        Check some of the products we are selling by clicking on a specific product image.
      </h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {data.map((product, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <Card
                className="p-1 cursor-pointer"
                onClick={() => navigate(`/products?modal=${product.id}`)}
              >
                <CardContent className="flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

