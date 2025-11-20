type Create = (input:any ) => Promise<{}>;
type Update = (id:string, input:any) => Promise<{}>;
type Delete = (id:string) => Promise<{}>;
type Find = (limit:number, offset:number) => Promise<{}>;
type FindOne = (id:string) => Promise<{}>;


export type CartRepositoryType = {
    create : Create;
    update : Update;
    delete : Delete;
    find : Find;
    findOne : FindOne;
}