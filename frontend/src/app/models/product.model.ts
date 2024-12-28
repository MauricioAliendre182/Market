import { Category } from "./category.model";

export interface Product {
  productId: number;
  name: string;
  categoryId: number;
  price: number;
  stock: number;
  active: boolean;
  imgUrl: string;
  category: Category;
  taxes?: number;
}

export interface CreateProductDTO extends Omit<Product, 'productId' | "category">{
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
}
