import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "@/interfaces/product.interface"
import { ProductCart } from "@/interfaces/productCart.interface"
import { calculateDiscount } from "@/utils/calculateDiscount"

export interface CartState {
  products: ProductCart[]
  totalItems: number
  totalPrice: number
}

const initialState: CartState = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
}

const updateCart = (cartState: CartState) => {
  cartState.totalItems = calculateCartTotalItems(cartState.products)
  cartState.totalPrice = calculateCartTotalPrice(cartState.products)
}

const calculateCartTotalItems = (products: ProductCart[]) => {
  return products.reduce((total, product) => total + product.quantity, 0)
}

const calculateCartTotalPrice = (products: ProductCart[]): number => {
  return products.reduce((total, product) => {
    const productTotalPrice = calculateProductTotalPrice(product)
    return total + productTotalPrice
  }, 0)
}

const calculateProductTotalPrice = (product: ProductCart): number => {
  const { price, discountPercentage } = product

  const productPriceWithDiscount = calculateDiscount({
    price: price,
    discountPercentage: discountPercentage,
  })

  return product.quantity * productPriceWithDiscount
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(cartState, action: PayloadAction<Product>) {
      const existingProduct = cartState.products.find(
        (product) => product.id === action.payload.id
      )

      if (existingProduct) {
        existingProduct.quantity = existingProduct.quantity + 1
      } else {
        cartState.products.push({ ...action.payload, quantity: 1 })
      }

      updateCart(cartState)
    },
    removeFromCart(cartState, action: PayloadAction<number>) {
      cartState.products = cartState.products.filter(
        (product) => product.id !== action.payload
      )
      updateCart(cartState)
    },
    clearCart(cartState) {
      cartState.products = []
      updateCart(cartState)
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
