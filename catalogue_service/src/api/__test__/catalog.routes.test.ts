import express from "express";
import request from "supertest";
import catalogRoutes, { catalogService } from "../catalog.routes";

const app = express();
app.use(express.json());
app.use(catalogRoutes);
const reqBody = {
  name: "test",
  description: "test",
  stock: 34,
  price: 1,
};

describe("Catalog Routes", () => {
  describe("POST /products", () => {
    test("should create product", async () => {
      // Super test acts like a fake client that can send HTTP requests to your app
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(reqBody));
      // when the app will receive request from mock client, the service will run (therefore mocking its implementation)
      const response = await request(app)
        .post("/products")
        .send(reqBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual(reqBody);
    });

    test("should throw a validation error with 400 code", async () => {
      const response = await request(app)
        .post("/products")
        .send({ ...reqBody, name: "" })
        .set("Accept", "application/json");
      console.log("Response body: ", response.body);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "name should not be empty" });
    });

    test("should respond with an internal error", async () => {
      jest.spyOn(catalogService, "createProduct").mockImplementationOnce(() => {
        return Promise.reject(new Error("error occured on create product"));
      });
      const response = await request(app)
        .post("/products")
        .send(reqBody)
        .set("Accept", "application/json");
      console.log("Response body: ", response.body);
      expect(response.status).toBe(500);
      expect(response.body).toEqual("error occured on create product");
    });
  });

  describe("PATCH /products/:id", () => {
    test("should update product succesfully", async () => {
      // Super test acts like a fake client that can send HTTP requests to your app
      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementationOnce(() => Promise.resolve(reqBody));
      // when the app will receive request from mock client, the service will run (therefore mocking its implementation)
      const response = await request(app)
        .patch(`/products/1`)
        .send(reqBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(reqBody);
    });

    test("should throw a validation error with 400 code", async () => {
      const response = await request(app)
        .patch("/products/1")
        .send({ ...reqBody, price: 0 })
        .set("Accept", "application/json");
      console.log("Response body: ", response.body);
      expect(response.status).toBe(400);
      // expect(response.body).toEqual({ message: "name should not be empty" });
    });

    test("should respond with an internal error", async () => {
      jest.spyOn(catalogService, "updateProduct").mockImplementationOnce(() => {
        return Promise.reject(new Error("error occured on update product"));
      });
      const response = await request(app)
        .patch("/products/1")
        .send(reqBody)
        .set("Accept", "application/json");
      console.log("Response body: ", response.body);
      expect(response.status).toBe(500);
      expect(response.body).toEqual("error occured on update product");
    });
  });
  describe("GET /products?limit=10&offset=0", () => {
    test("should get products succesfully", async () => {
      // Super test acts like a fake client that can send HTTP requests to your app
      jest
        .spyOn(catalogService, "getProducts")
        .mockImplementationOnce(() => Promise.resolve([reqBody]));
      // when the app will receive request from mock client, the service will run (therefore mocking its implementation)
      const response = await request(app)
        .get(`/products?limit=10&offset=0`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([reqBody]);
    });

    test("should throw a validation error with 400 code", async () => {
      const response = await request(app)
        .get("/products?offset=0&limit=-9")
        .set("Accept", "application/json");
      console.log("Response body: ", response.body);
      expect(response.status).toBe(400);
    });

    test("should respond with an internal error", async () => {
      jest.spyOn(catalogService, "getProducts").mockImplementationOnce(() => {
        return Promise.reject(new Error("error occured on get product"));
      });
      const response = await request(app)
        .get("/products?offset=0&limit=10")
        .set("Accept", "application/json");
      console.log("Response body: ", response.body);
      expect(response.status).toBe(500);
      expect(response.body).toEqual("error occured on get product");
    });
  });
  describe("GET /products/:id", () => {
    test("should get a product by ID succesfully", async () => {
      // Super test acts like a fake client that can send HTTP requests to your app
      jest
        .spyOn(catalogService, "getProductById")
        .mockImplementationOnce(() => Promise.resolve(reqBody));
      // when the app will receive request from mock client, the service will run (therefore mocking its implementation)
      const response = await request(app)
        .get(`/products/1`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(reqBody);
    });

    test("should throw a validation error with 400 code", async () => {
      const response = await request(app)
        .get("/products/7")
        .set("Accept", "application/json");
      console.log("Response body: ", response.body);
      expect(response.status).toBe(400);
    });

    test("should respond with an internal error", async () => {
      jest.spyOn(catalogService, "getProductById").mockImplementationOnce(() => {
        return Promise.reject(new Error("error occured on get product by ID."));
      });
      const response = await request(app)
        .get("/products/1")
        .set("Accept", "application/json");
      console.log("Response body: ", response.body);
      expect(response.status).toBe(500);
      expect(response.body).toEqual("error occured on get product by ID.");
    });
  });
  describe("DELETE /products/:id", () => {
    test("should delete a product by ID succesfully", async () => {
      // Super test acts like a fake client that can send HTTP requests to your app
      jest
        .spyOn(catalogService, "deleteProduct")
        .mockImplementationOnce(() => Promise.resolve({message : "Product Deleted."}));
      // when the app will receive request from mock client, the service will run (therefore mocking its implementation)
      const response = await request(app)
        .delete(`/products/1`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({message : "Product Deleted."});
    });

    test("should throw a validation error with 400 code", async () => {
      const response = await request(app)
        .get("/products/7")
        .set("Accept", "application/json");
      console.log("Response body: ", response.body);
      expect(response.status).toBe(400);
    });

    test("should respond with an internal error", async () => {
      jest.spyOn(catalogService, "deleteProduct").mockImplementationOnce(() => {
        return Promise.reject(new Error("error occured on delete product by ID."));
      });
      const response = await request(app)
        .delete("/products/1")
        .set("Accept", "application/json");
      console.log("Response body: ", response.body);
      expect(response.status).toBe(500);
      expect(response.body).toEqual("error occured on delete product by ID.");
    });
  });
});
