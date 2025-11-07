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



  describe.only("PATCH /products/:id", () => {
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
});

