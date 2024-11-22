import React from "react";
const DEFAULT_PAGE_SIZE = 100;
export interface InitialProps {
  required?: object;
  filter?: object;
  search?: object;
  pagination?: {
    [key: string]: any;
  };
}
type GetQueryFn = () => string;
export interface QueryHandlers {
  query: object;
  toolState: {
    required?: object;
    filter?: object;
    search?: object;
    pagination?: object;
  };
  fullReset: Function;
  getQuery: GetQueryFn;
  getQueryString: GetQueryFn;
  handleFilter: Function;
  handlePagination: Function;
  handleSearch: Function;
  handleRequired: Function;
}

function useBuildQueryString(initial: InitialProps): QueryHandlers {
  let pageKey = "page";
  let pageSizeKey = "size";
  if (initial && initial.pagination && isObject(initial.pagination)) {
    let keys = Object.keys(initial.pagination);
    if (keys[0]) pageKey = keys[0];
    if (keys[1]) pageSizeKey = keys[1];
  }
  const initialQueryState = {
    required: _buildDefault(initial).required,
    filter: _buildDefault(initial).filter,
    search: _buildDefault(initial).search,
    pagination: _buildDefault(initial).pagination,
  };

  const initialToolState = {
    filter: (initial && initial.filter) || {},
    required: (initial && initial.required) || {},
    search: (initial && initial.search) || {},
    pagination: {
      [pageKey]:
        (initial && initial.pagination && initial.pagination[pageKey]) || 1,
      [pageSizeKey]:
        (initial && initial.pagination && initial.pagination[pageSizeKey]) ||
        DEFAULT_PAGE_SIZE,
    },
  };

  let [query, setQuery] = React.useState(initialQueryState);
  let [toolState, setToolState] = React.useState(initialToolState);

  function fullReset() {
    setQuery(initialQueryState);
    setToolState(initialToolState);
  }

  function _buildDefault(initial) {
    return {
      required:
        initial && initial.required
          ? objectToQuery(initial.required.value)
          : "",
      filter:
        initial && initial.filter ? objectToQuery(initial.filter.value) : "",
      search:
        initial && initial.search ? objectToQuery(initial.search.value) : "",
      pagination: objectToQuery({
        [pageKey]:
          (initial && initial.pagination && initial.pagination[pageKey]) || 1,
        [pageSizeKey]:
          (initial && initial.pagination && initial.pagination[pageSizeKey]) ||
          DEFAULT_PAGE_SIZE,
      }),
    };
  }

  function isObject(object) {
    return object !== null && typeof object === "object";
  }
  function objectToQuery(object) {
    if (!object) return "";
    const queryBucket: string[] = [];
    function dig(obj, build = "") {
      if (!isObject(obj))
        return queryBucket.push(build + `=${encodeURIComponent(obj)}`);
      const keys = Object.keys(obj);
      for (let key of keys) {
        if (isObject(obj)) {
          let attach = !build
            ? `${key}`
            : !Array.isArray(obj)
            ? `[${key}]`
            : `[]`;
          dig(obj[key], build + attach);
        }
      }
      return obj;
    }
    dig(object);
    return queryBucket.join("&");
  }
  let formatString = (str) => (str ? "&" + str : str);
  // getQuery function will soon be deprecated. it's renamed to getQueryString
  function getQuery() {
    let processedString = "";
    let keys = Object.keys(query);
    for (let key of keys) {
      processedString = processedString
        ? processedString + formatString(query[key])
        : query[key];
    }
    return processedString;
  }
  function getQueryString() {
    return getQuery();
  }
  function handleRequired(requiredQuery: { value: object }) {
    setQuery((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        required: objectToQuery(requiredQuery.value),
        pagination: objectToQuery({
          [pageKey]: 1,
          [pageSizeKey]: toolState?.pagination[pageSizeKey],
        }),
      };
    });
    _updateRequired(requiredQuery);
    _updatePagination({ [pageKey]: 1, [pageSizeKey]: DEFAULT_PAGE_SIZE });
  }
  function handleFilter(filterQuery: { value: object }) {
    setQuery((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        filter: objectToQuery(filterQuery.value),
        pagination: objectToQuery({
          [pageKey]: 1,
          [pageSizeKey]: toolState?.pagination[pageSizeKey],
        }),
      };
    });
    _updateFilter(filterQuery);
    _updatePagination({
      [pageKey]: 1,
      [pageSizeKey]: toolState?.pagination[pageSizeKey],
    });
  }
  function handlePagination(page: number = 1, size: number) {
    size = size || toolState?.pagination[pageSizeKey] || DEFAULT_PAGE_SIZE;
    setQuery((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        pagination: objectToQuery({
          [pageKey]: page,
          [pageSizeKey]: size,
        }),
      };
    });
    _updatePagination({
      [pageKey]: page,
      [pageSizeKey]: size,
    });
  }
  function handleSearch(searchQuery) {
    setQuery((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        search: objectToQuery(searchQuery.value),
        pagination: objectToQuery({
          [pageKey]: 1,
          [pageSizeKey]: toolState?.pagination[pageSizeKey],
        }),
      };
    });
    _updateSearch(searchQuery);
    _updatePagination({
      [pageKey]: 1,
      [pageSizeKey]: toolState?.pagination[pageSizeKey],
    });
  }
  function _updatePagination(pagination) {
    setToolState((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        pagination,
      };
    });
  }
  function _updateFilter(filter) {
    setToolState((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        filter,
      };
    });
  }
  function _updateRequired(required) {
    setToolState((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        required,
      };
    });
  }
  function _updateSearch(search) {
    setToolState((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        search,
      };
    });
  }
  return {
    query,
    toolState,
    fullReset,
    getQuery,
    getQueryString,
    handleFilter,
    handlePagination,
    handleSearch,
    handleRequired,
  };
}

export default useBuildQueryString;
