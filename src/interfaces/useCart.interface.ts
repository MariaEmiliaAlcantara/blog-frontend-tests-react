import { CartState } from "@/redux/slices/cartSlice"
import { Product } from "./product.interface"

export interface UseCart {
  cart: CartState
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}
