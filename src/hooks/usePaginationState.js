import { useState } from "react";
/**
 * CAUTION: Changing the object strucuture will break the UI if not handled properly.
 * Consult with seniors before making changes.
 */
const defaultPaginationState = {
  currentPage: 1,
  hasNextPage: false,
  hasPrevPage: false,
  nextPage: null,
  prevPage: null,
  size: 10,
  totalPages: 0,
  totalResults: 0,
};
const usePagination = () => {
  const [pagination, setPagination] = useState(defaultPaginationState);
  function updatePaginaion(pagination = defaultPaginationState) {
    if (typeof pagination.currentPage !== "number")
      throw new Error("currentPage must be a number");
    if (typeof pagination.hasNextPage !== "boolean")
      throw new Error("currentPage must be a number");
    if (typeof pagination.hasPrevPage !== "boolean")
      throw new Error("hasPrevPage must be a boolean");
    if (typeof pagination.nextPage !== "number" && pagination.nextPage !== null)
      throw new Error("nextPage must be a number or null");
    if (typeof pagination.prevPage !== "number" && pagination.prevPage !== null)
      throw new Error("prevPage must be a number or null");
    if (typeof pagination.size !== "number")
      throw new Error("size must be a number");
    if (typeof pagination.totalPages !== "number")
      throw new Error("totalPages must be a number");
    if (typeof pagination.totalResults !== "number")
      throw new Error("totalResults must be a number");
    setPagination(pagination);
  }
  return {
    pagination,
    updatePaginaion,
  };
};

export default usePagination;
