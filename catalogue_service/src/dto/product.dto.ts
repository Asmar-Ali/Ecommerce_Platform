import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
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
    @IsString()
    name?: string;
    
    @IsString()
    description?: string;
    
    @IsNumber()
    stock?: number;
    
    @IsNumber()
    @Min(1)
    price?: number;
}

export class UpdateProductQuery {

    @IsString()
    @IsNotEmpty()
    id : string; 
}