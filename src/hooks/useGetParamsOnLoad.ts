import { useRef } from "react";

// This hook is intentional. useSearchParams causes unnecessary rerenders when the query params are only needed when loading the component initially.
export const useGetParamsOnLoad = <T extends string>(paramKeys: T[]) => {
  const params = useRef<Partial<Record<T, string>>>(
    (() => {
      const params = new URLSearchParams(window.location.search);
      const parsedParams: Partial<Record<T, string>> = {};
      paramKeys.forEach((paramKey) => {
        const value = params.get(paramKey);
        if (value) {
          parsedParams[paramKey] = value;
        }
      });

      return parsedParams;
    })(),
  );

  return params.current;
};

