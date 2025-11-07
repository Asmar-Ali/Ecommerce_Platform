import { Product } from "../models/product.model";

export interface ICatalogRepository { 
    create(data : Product) : Promise<Product>;
    update(id: string, data : Product) : Promise<Product>;
    delete(id : number) : Promise<{}>;
    find(limit : number, offset : number) : Promise<Product[]>;
    findOne(id : number) : Promise<Product>;

}