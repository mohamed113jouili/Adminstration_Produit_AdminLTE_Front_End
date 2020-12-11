import { ProductCategory } from './productcategory';

export interface Product {
    id?:number,
    name?: string,
    description?: string,
    price?: number,
    availableStock?: number,
    categoryProduct?: ProductCategory
}
