import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
export class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  @Min(0)
  price: number;
}

export class UpdateProductRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  price?: number;
}

export class UpdateProductQuery {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class GetProductsQuery {
  @IsNumber()
  @Min(0)
  limit: number;

  @IsNumber()
  offset: number;
}
