import { calculateDiscount } from "./calculateDiscount"

test("calculates the discount price correctly", () => {
  expect(calculateDiscount({ price: 100, discountPercentage: 10 })).toBe(90)
  expect(calculateDiscount({ price: 50, discountPercentage: 20 })).toBe(40)
  expect(calculateDiscount({ price: 200, discountPercentage: 0 })).toBe(200)
  expect(calculateDiscount({ price: 100, discountPercentage: 100 })).toBe(0)
})
