import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { addToCart, removeFromCart, clearCart } from "@/redux/slices/cartSlice"
import { Product } from "@/interfaces/product.interface"
import { UseCart } from "@/interfaces/useCart.interface"

export const useCart = (): UseCart => {
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.cart)

  return {
    cart,
    addToCart: (product: Product) => dispatch(addToCart(product)),
    removeFromCart: (productId: number) => dispatch(removeFromCart(productId)),
    clearCart: () => dispatch(clearCart()),
    totalItems: cart.totalItems,
    totalPrice: cart.totalPrice,
  }
}
