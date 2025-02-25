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

const calculateTotalItems = (products: ProductCart[]) => {
  return products.reduce((total, product) => total + product.quantity, 0)
}

const calculateTotalPrice = (products: ProductCart[]) => {
  return products.reduce(
    (total, product) =>
      total +
      product.quantity *
        calculateDiscount({
          price: product.price,
          discountPercentage: product.discountPercentage,
        }),
    0
  )
}

const updateCart = (state: CartState) => {
  state.totalItems = calculateTotalItems(state.products)
  state.totalPrice = calculateTotalPrice(state.products)
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      )

      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.products.push({ ...action.payload, quantity: 1 })
      }

      updateCart(state)
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      )
      updateCart(state)
    },
    clearCart(state) {
      state.products = []
      updateCart(state)
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
