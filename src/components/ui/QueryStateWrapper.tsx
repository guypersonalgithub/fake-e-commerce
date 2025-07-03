import { Spinner } from "./Spinner";

type QueryStateWrapperProps = {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
};

export const QueryStateWrapper = ({ isLoading, isError, children }: QueryStateWrapperProps) => {
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

  return <>{children}</>;
};

