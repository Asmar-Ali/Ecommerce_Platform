import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {
  // the service class is business logic layer,
  // and it only cares about the contract of repository
  private _repository: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
    this._repository = repository;
  }
  
  async createProduct(input: any) {
    try {
      console.log("Create Product Service was called.")
      const result = await this._repository.create(input)
      return result;

    } catch (err) {
      const error = err as Error;
      console.log("Error in create product service", error.message)
    }
  }
  async updateProduct(id: string, data: any) {
    const result = await this._repository.update(id, data)
    //emit event to update in elasticsearch
    return result;
  }
  async deleteProduct(input: any) {
    const result = await this._repository.delete(input)
    return result;
  }
  async getProducts(limit: number, offset: number) {
    const result = await this._repository.find(limit, offset)
    return result;
  }
  async getProductById(id: number) {
    const result = await this._repository.findOne(id)
    return result;
  }
}
