import { calculateDiscount } from "./calculateDiscount"

describe("calculateDiscount - calculates the discounted price correctly", () => {
  test("applies a 10% discount correctly", () => {
    expect(calculateDiscount({ price: 100, discountPercentage: 10 })).toBe(90)
  })

  test("applies a 20% discount correctly", () => {
    expect(calculateDiscount({ price: 50, discountPercentage: 20 })).toBe(40)
  })

  test("applies a discount with decimal values correctly", () => {
    expect(
      calculateDiscount({ price: 99.99, discountPercentage: 15.5 })
    ).toBeCloseTo(84.49, 2)
  })

  test("returns the original price when discount is 0%", () => {
    expect(calculateDiscount({ price: 200, discountPercentage: 0 })).toBe(200)
  })

  test("returns 0 when discount is 100%", () => {
    expect(calculateDiscount({ price: 100, discountPercentage: 100 })).toBe(0)
  })
})
