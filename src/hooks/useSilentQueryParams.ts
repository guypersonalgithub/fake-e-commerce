import { useLocation } from "react-router";

const applyParams = (params: URLSearchParams) => {
  const newSearch = params.size > 0 ? `?${params.toString()}` : "";
  const newUrl = `${window.location.pathname}${newSearch}`;
  window.history.pushState({}, "", newUrl);
};

// This hook is intentional. useNavigate causes unnecessary rerenders when the query params are only needed when loading the component initially.
export const useSilentQueryParams = () => {
  const location = useLocation();

  const addQueryParamsSilently = (queryParams: { key: string; value: string }[]) => {
    if (queryParams.length === 0) {
      return;
    }

    const params = new URLSearchParams(location.search);
    queryParams.forEach((queryParam) => {
      const { key, value } = queryParam;
      params.delete(key);
      params.set(key, value);
    });

    applyParams(params);
  };

  const removeQueryParamsSilently = (queryParams: string[]) => {
    const params = new URLSearchParams(location.search);
    queryParams.forEach((queryParam) => {
      params.delete(queryParam);
    });

    applyParams(params);
  };

  return { addQueryParamsSilently, removeQueryParamsSilently };
};

