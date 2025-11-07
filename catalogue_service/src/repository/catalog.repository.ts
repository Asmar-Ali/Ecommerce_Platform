import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {
  async create(data: Product): Promise<Product> {
    console.log("reached in repo");
    
    const mockProduct = {
      ...data,
      id: 23434,
    };

    Promise.resolve(mockProduct);
    throw new Error("Method not implemented.");
  }
  async update(id:string, data: Product): Promise<Product> {
    const mockProduct = {
      id,
      ...data
    }

    return Promise.resolve(mockProduct as Product)
  }
  async delete(id: number): Promise<{}> {
    throw new Error("Method not implemented.");
  }
  async find(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  async findOne(id: number): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
