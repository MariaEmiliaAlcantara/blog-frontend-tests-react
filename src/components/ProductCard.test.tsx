import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { ProductCard } from "./ProductCard"
import { Product } from "@/interfaces/product.interface"
import { formatPrice } from "@/utils/formatPrice"
import { calculateDiscount } from "@/utils/calculateDiscount"

describe("ProductCard", () => {
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
    price: 59.99,
    image: "https://example.com/image.jpg",
    highlight: true,
    discountPercentage: 20,
  }

  const getPriceWithDiscount = (product: Product) => {
    return calculateDiscount({
      price: product.price,
      discountPercentage: product.discountPercentage,
    })
  }

  describe("when the product has no discount", () => {
    beforeEach(() => {
      render(<ProductCard product={productWithoutDiscount} />)
    })

    test("renders the product price, which should be the same as the price with discount (0%)", () => {
      const priceWithDiscount = getPriceWithDiscount(productWithoutDiscount)
      expect(
        screen.getByText(formatPrice(productWithoutDiscount.price))
      ).toBeInTheDocument()
      expect(
        screen.getByText(formatPrice(priceWithDiscount))
      ).toBeInTheDocument()
    })

    test("does not render the Special Price badge", () => {
      expect(screen.queryByText("Special Price")).not.toBeInTheDocument()
    })
  })

  describe("when the product has a discount", () => {
    beforeEach(() => {
      render(<ProductCard product={productWithDiscount} />)
    })

    test("renders the price with discount", () => {
      const priceWithDiscount = getPriceWithDiscount(productWithDiscount)
      expect(
        screen.getByText(formatPrice(priceWithDiscount))
      ).toBeInTheDocument()
    })

    test("renders the original price with a strikethrough", () => {
      const originalPriceElement = screen.getByText(
        formatPrice(productWithDiscount.price)
      )
      expect(originalPriceElement).toBeInTheDocument()
      expect(originalPriceElement.classList.contains("line-through")).toBe(true)
    })

    test("renders the Special Price badge", () => {
      expect(screen.getByText("Special Price")).toBeInTheDocument()
    })
  })
})
