import React from "react";

function useQuery(initial) {
  const initialQueryState = {
    required: _buildDefault(initial).required,
    filter: _buildDefault(initial).filter,
    search: _buildDefault(initial).search,
    pagination: _buildDefault(initial).pagination,
  };

  const initialToolState = {
    filter: (initial && initial.filter) || {},
    required: (initial && initial.required) || {},
    search: "",
    pagination: (initial && initial.pagination) || {
      page: 1,
      size: 10,
    },
  };

  let [query, setQuery] = React.useState(initialQueryState);
  let [toolState, setToolState] = React.useState(initialQueryState);

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
      pagination:
        initial && initial.pagination
          ? objectToQuery(initial.pagination.value)
          : "page=1&size=10",
    };
  }

  function isObject(object) {
    return object !== null && typeof object === "object";
  }
  function objectToQuery(object) {
    if (!object) return "";
    const queryBucket = [];
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
  function handleRequired(requiredQuery) {
    setQuery((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        required: objectToQuery(requiredQuery.value),
        pagination: "page=1",
      };
    });
    _updateRequired(requiredQuery);
    _updatePagination({ page: 1, size: 10 });
  }
  function handleFilter(filterQuery) {
    setQuery((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        filter: objectToQuery(filterQuery.value),
        pagination: "page=1",
      };
    });
    _updateFilter(filterQuery);
    _updatePagination({ page: 1, size: 10 });
  }
  function handlePagination(page = 1, size = 10) {
    setQuery((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        pagination: objectToQuery({ page, size }),
      };
    });
    _updatePagination({
      page,
      size,
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
        pagination: "page=1",
      };
    });
    _updatePagination({ page: 1, size: 10 });
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
  function _updateSearch() {}
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

export default useQuery;
