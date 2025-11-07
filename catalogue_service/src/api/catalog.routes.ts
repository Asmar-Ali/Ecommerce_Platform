import express, { NextFunction, Request, Response } from "express";
import { CatalogService } from "../service/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import {
  CreateProductRequest,
  UpdateProductRequest,
  UpdateProductQuery,
  GetProductsQuery,
} from "../dto/product.dto";

const router = express.Router();
export const catalogService = new CatalogService(new CatalogRepository());

router.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("We are in the request middleware.");
    try {
      const { errors, input } = await RequestValidator(
        CreateProductRequest,
        req.body
      );
      if (errors) {
        return res.status(400).send({ message: errors });
      }
      const data = await catalogService.createProduct(input);
      return res.status(201).send(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);

router.patch(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("We are in the update middleware");
    try {
      const { errors, input } = await RequestValidator(
        UpdateProductRequest,
        req.body
      );
      if (errors) {
        console.log("Error exists in request body", errors);
        return res.status(400).send({ message: errors });
      }
      const { errors: errorsInQuery, input: inputQuery } =
        await RequestValidator(UpdateProductQuery, req.params);
      if (errorsInQuery) {
        return res.status(400).send({ message: errorsInQuery });
      }
      const data = await catalogService.updateProduct(inputQuery.id, input);
      return res.status(200).send(data);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(error.message);
    }
  }
);

router.get(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("We are in the get middleware", req.query);
    try {
      let limit = Number(req.query.limit);
      let offset = Number(req.query.offset);
      if (limit === undefined || offset === undefined || limit < 0) {
        return res.status(400).send({ message: "Limit or offset undefined." });
      }
      const data = await catalogService.getProducts(limit, offset);
      return res.status(200).send(data);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(error.message);
    }
  }
);

router.get(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("We are in the get product by id middleware");
    try {
      const id = Number(req.params.id);
      console.log("Id in the parameters", id)
      if (!id || id !== 1) {
        return res.status(400).send({ message: "ID not provided." });
      }
      const data = await catalogService.getProductById(id);
      return res.status(200).send(data);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(error.message);
    }
  }
);
router.delete(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("We are in the delete product by id middleware");
    try {
      const id = Number(req.params.id);
      console.log("Id in the parameters", id)
      if (!id || id !== 1) {
        return res.status(400).send({ message: "ID not provided." });
      }
      const data = await catalogService.deleteProduct(id);
      return res.status(200).send(data);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(error.message);
    }
  }
);

export default router;
