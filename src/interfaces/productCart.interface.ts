import { Product } from "./product.interface"

export interface ProductCart extends Product {
  quantity: number
}
