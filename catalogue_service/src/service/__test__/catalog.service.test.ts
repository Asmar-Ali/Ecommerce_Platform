import type { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { Factory } from "rosie";

const productFactory = new Factory<Product>()
  .attr("id", 3)
  .attr("name", "Test Product")
  .attr("description", "Test Description")
  .attr("stock", 10);

const mockProduct = (rest: any) => {
  return {
    name: "Test Product",
    description: "Test Description",
    stock: 10,
    ...rest,
  };
};

describe("catalogService", () => {
  let repository: ICatalogRepository;

  // beforeEach

  // Runs before every test in the suite.
  // Here you’re creating a fresh MockCatalogRepository before each test.
  // This avoids test cases interfering with each other (no shared state).
  beforeEach(() => {
    repository = new MockCatalogRepository();
  });

  afterEach(() => {
    // cleanup purposes
    repository = {} as MockCatalogRepository;
  });

  describe("createProduct", () => {
    test("should create Product", async () => {
      const service = new CatalogService(repository);

      const reqBody = mockProduct({ price: 99.99 });
      const result = await service.createProduct(reqBody);

      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        stock: expect.any(Number),
        description: expect.any(String),
        price: expect.any(Number),
      });
    });

    test("Should return error with unable to create product", async () => {
      const service = new CatalogService(repository);

      const reqBody = mockProduct({ price: 232 });

      // Jest replaces the first call to repository.create with your custom implementation.

      jest.spyOn(repository, "create").mockImplementationOnce(() => {
        throw new Error("Unable to create product");
      });

      // After this line, anytime service calls repository.create(...), instead of running the real DB logic, it will run your mocked function that returns Promise.reject()
      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "Unable to create product"
      );
    });
    test("Should return error product already exists", async () => {
      const service = new CatalogService(repository);

      const reqBody = mockProduct({ price: 232 });

      // Jest replaces the first call to repository.create with your custom implementation.

      jest.spyOn(repository, "create").mockImplementationOnce(() => {
        return Promise.reject(new Error("Product already exists"));
      });

      // After this line, anytime service calls repository.create(...), instead of running the real DB logic, it will run your mocked function that returns Promise.reject()
      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "Product already exists"
      );
    });
  });

  describe("updateProduct", () => {
    test("should create Product", async () => {
      const service = new CatalogService(repository);

      const reqBody = mockProduct({ id: 22 });
      const result = await service.updateProduct(reqBody);

      expect(result).toMatchObject(reqBody);
    });

    test("Should throw error with product does not exist", async () => {
      const service = new CatalogService(repository);

      // Jest replaces the first call to repository.create with your custom implementation.

      jest.spyOn(repository, "update").mockImplementationOnce(() => {
        return Promise.reject(new Error("Product does not exist"));
      });

      // After this line, anytime service calls repository.create(...), instead of running the real DB logic, it will run your mocked function that returns Promise.reject()
      await expect(service.updateProduct({})).rejects.toThrow(
        "Product does not exist"
      );
    });
  });

  describe("getProducts", () => {
    test("should get products by offset and limit", async () => {
      const service = new CatalogService(repository);
      const randomLimit = 10;
      const offset = 1;
      const products = productFactory.buildList(randomLimit);

      jest.spyOn(repository, "find").mockImplementationOnce(() => {
        return Promise.resolve(products);
      });

      const result = await service.getProducts(randomLimit, offset);

      expect(result.length).toBe(randomLimit);
      expect(result).toMatchObject(products);
    });

    test("should return products don't exist", async () => {
      const service = new CatalogService(repository);

      jest.spyOn(repository, "find").mockImplementationOnce(() => {
        return Promise.reject(new Error("Product does not exist"));
      });

      // After this line, anytime service calls repository.create(...), instead of running the real DB logic, it will run your mocked function that returns Promise.reject()
      await expect(service.getProducts(10, 1)).rejects.toThrow(
        "Product does not exist"  
      );
    });
  });

  describe("getProductById", () => {
    test("should get product by id", async () => {
      const service = new CatalogService(repository);
      const product = productFactory.build();

      jest.spyOn(repository, "findOne").mockImplementationOnce(() => {
        return Promise.resolve(product);
      });

      const result = await service.getProductById(34);
      
      expect(result).toMatchObject(product);
    });

    test("should return products don't exist", async () => {
      const service = new CatalogService(repository);

      jest.spyOn(repository, "findOne").mockImplementationOnce(() => {
        return Promise.reject(new Error("Product does not exist"));
      });

      // After this line, anytime service calls repository.create(...), instead of running the real DB logic, it will run your mocked function that returns Promise.reject()
      await expect(service.getProductById(34)).rejects.toThrow(
        "Product does not exist"  
      );
    });
  });

  describe("deleteProduct", () => {

    test("should return product deleted", async () => {
      const service = new CatalogService(repository);

      const result = await service.deleteProduct(34);

      jest.spyOn(repository, "delete").mockImplementationOnce(() => {
        return Promise.resolve({});
      });

      expect(result).toMatchObject({});
    });
   })


});
