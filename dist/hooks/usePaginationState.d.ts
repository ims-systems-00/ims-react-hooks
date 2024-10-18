declare function usePagination(): {
    pagination: {
        currentPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        nextPage: any;
        prevPage: any;
        size: number;
        totalPages: number;
        totalResults: number;
    };
    updatePaginaion: (pagination?: {
        currentPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        nextPage: any;
        prevPage: any;
        size: number;
        totalPages: number;
        totalResults: number;
    }) => void;
};
export default usePagination;
