import type { IProductsResponse } from "@/products/interfaces/products-response";

export interface ICart {
    product: IProductsResponse;
    quantity: number;
}