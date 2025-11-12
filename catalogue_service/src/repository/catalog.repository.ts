import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";
import { PrismaClient } from "@prisma/client";

export class CatalogRepository implements ICatalogRepository {

  _prisma : PrismaClient
  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: Product): Promise<Product> {
    const created = await this._prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      },
    });
    return created;
  }
  async update(id: string, data: Product): Promise<Product> {
   const updatedProduct = await this._prisma.product.update({
    where: { id : Number(id) },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
    },
   });
   console.log("Updated Product", updatedProduct);
   return updatedProduct;
  }
  async delete(id: number): Promise<{}> {
    const deletedProduct = await this._prisma.product.delete({
      where: { id : Number(id) },
    });
    console.log("Deleted Product", deletedProduct);
    return deletedProduct;
  }
  async find(limit: number, offset: number): Promise<Product[]> {
   const allProducts = await this._prisma.product.findMany({
    skip: offset,
    take: limit,
   });
   console.log("All Products", allProducts);
   return allProducts as Product[];
  }
  async findOne(id: number): Promise<Product> {
    const product = await this._prisma.product.findFirst({
      where: { id : Number(id) },
    });
    console.log("Product", product);
    if (!product) {
      throw new Error("Product not found");
    }
    console.log("Product", product);
    return product as unknown as Product;
  }
}
