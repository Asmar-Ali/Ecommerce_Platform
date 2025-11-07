import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
  async create(data: Product): Promise<Product> {
    const mockProduct = {
      ...data,
      id: 23434,
    };

    return Promise.resolve(mockProduct);
  }
  async update(id:string, data: Product): Promise<Product> {
    return Promise.resolve(data as Product);
  }
  async delete(id: number): Promise<{}> {
    return Promise.resolve({});
  }
  async find(limit: number, offset: number): Promise<Product[]> {
    return Promise.resolve([]);
  }
    async findOne(id: number): Promise<Product> {
      return Promise.resolve({} as unknown as Product);
  }
}
