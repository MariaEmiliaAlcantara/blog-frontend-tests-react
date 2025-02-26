import { act, renderHook } from "@testing-library/react"
import { useCart } from "./useCart"
import { Product } from "@/interfaces/product.interface"
import { ReduxProvider } from "@/redux/ReduxProvider"
import { UseCart } from "@/interfaces/useCart.interface"

describe("useCart", () => {
  const productWithoutDiscount: Product = {
    id: 1,
    name: "Basic T-shirt",
    description: "Comfortable and durable cotton t-shirt.",
    price: 29.99,
    image: "https://example.com/image.jpg",
    highlight: true,
    discountPercentage: 0,
  }

  const productWithDiscount: Product = {
    id: 2,
    name: "Jeans",
    description: "Modern and stylish jeans.",
    price: 60,
    image: "https://example.com/image.jpg",
    highlight: true,
    discountPercentage: 20,
  }

  let result: { current: UseCart }

  beforeEach(() => {
    const { result: resultHook } = renderHook(() => useCart(), {
      wrapper: ReduxProvider,
    })

    result = resultHook
  })

  afterEach(() => {
    act(() => {
      result.current.clearCart()
    })
  })

  test("add a product to the cart", () => {
    act(() => {
      result.current.addToCart(productWithoutDiscount)
      result.current.addToCart(productWithoutDiscount)
    })

    expect(result.current.totalItems).toEqual(2)
    expect(result.current.cart.products[0]).toEqual({
      ...productWithoutDiscount,
      quantity: 2,
    })
  })

  test("remove a product from the cart", () => {
    act(() => {
      result.current.addToCart(productWithoutDiscount)
      result.current.addToCart(productWithDiscount)
      result.current.removeFromCart(productWithoutDiscount.id)
    })

    expect(result.current.totalItems).toEqual(1)
  })

  test("calculate the total price correctly", () => {
    act(() => {
      result.current.addToCart(productWithoutDiscount)
      result.current.addToCart(productWithoutDiscount)
      result.current.addToCart(productWithDiscount)
    })

    expect(result.current.totalPrice).toBeCloseTo(107.98, 2)
  })

  test("calculate the price correctly with no products in the cart", () => {
    expect(result.current.totalPrice).toEqual(0)
  })

  test("remove all products on clean cart", () => {
    act(() => {
      result.current.addToCart(productWithoutDiscount)
      result.current.addToCart(productWithoutDiscount)
      result.current.clearCart()
    })

    expect(result.current.totalItems).toEqual(0)
  })
})
