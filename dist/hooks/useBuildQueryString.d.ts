export interface InitialProps {
    required?: {
        [key: string]: any;
    };
    filter?: {
        [key: string]: any;
    };
    search?: {
        [key: string]: any;
    };
    pagination?: {
        [key: string]: any;
    };
}
type GetQueryFn = () => string;
export interface QueryHandlers {
    query: object;
    toolState: {
        required?: {
            [key: string]: any;
        };
        filter?: {
            [key: string]: any;
        };
        search?: {
            [key: string]: any;
        };
        pagination?: {
            [key: string]: any;
        };
    };
    fullReset: Function;
    getQuery: GetQueryFn;
    getQueryString: GetQueryFn;
    handleFilter: Function;
    handlePagination: Function;
    handleSearch: Function;
    handleRequired: Function;
}
declare function useBuildQueryString(initial: InitialProps): QueryHandlers;
export default useBuildQueryString;
