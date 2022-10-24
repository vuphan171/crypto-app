export default interface IPagination<T> {
    data: T[];
    limit: number;
    page: number;
    total: number;
};