// These utility functions are intentional.
// react-router's url based utility hooks cause unnecessary rerenders when the query params are only needed when loading the component initially.

const applyParams = (params: URLSearchParams) => {
  const newSearch = params.size > 0 ? `?${params.toString()}` : "";
  const newUrl = `${window.location.pathname}${newSearch}`;
  window.history.replaceState({}, "", newUrl);
};

export const addQueryParamsSilently = (queryParams: { key: string; value: string }[]) => {
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

export const removeQueryParamsSilently = (queryParams: string[]) => {
  const params = new URLSearchParams(location.search);
  queryParams.forEach((queryParam) => {
    params.delete(queryParam);
  });

  applyParams(params);
};

