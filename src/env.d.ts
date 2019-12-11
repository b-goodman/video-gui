declare namespace NodeJS {
    export interface ProcessEnv {
        REACT_APP_API_ROOT: string;
        REACT_APP_SERVE_THUMBNAIL: string;
        REACT_APP_SERVE_VIDEO: string;
        REACT_APP_QUERY_VIDEO: string;
        REACT_APP_SEARCH_VIDEO: string;
        REACT_APP_ROUTES_SEARCH: string;
        REACT_APP_LOGIN: string;
        REACT_APP_IS_AUTH: string;
        REACT_APP_ROUTE_SEARCH_VIDEO: string;
    }
}