export interface InitialProps {
    required?: object;
    filter?: object;
    search?: object;
    pagination?: object;
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
declare function useBuildQueryString(initial: InitialProps): QueryHandlers;
export default useBuildQueryString;
