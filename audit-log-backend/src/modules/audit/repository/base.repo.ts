
export  interface IRepository<T> {
    exists(t: T): Promise<boolean>;
    delete(t: T): Promise<any>;
    save(t: T): Promise<any>;
}