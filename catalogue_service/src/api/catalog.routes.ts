import express, { NextFunction, Request, Response } from "express";
import { CatalogService } from "../service/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import {
  CreateProductRequest,
  UpdateProductRequest,
  UpdateProductQuery,
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
        console.log("Error exists in request body", errors)
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

export default router;
