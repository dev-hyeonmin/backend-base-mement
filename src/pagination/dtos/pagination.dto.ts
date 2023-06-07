export class GetListOutput<T> {
    list: T[];
    total: number;
    currentPage: number;
    lastPage: number;
}