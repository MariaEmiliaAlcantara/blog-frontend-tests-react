import { formatPrice } from "./formatPrice"

test("formats the price correctly in USD", () => {
  expect(formatPrice(29.99)).toBe("$29.99")
  expect(formatPrice(1000)).toBe("$1,000.00")
  expect(formatPrice(49.95)).toBe("$49.95")
  expect(formatPrice(123.456)).toBe("$123.46")
  expect(formatPrice(-19.99)).toBe("-$19.99")
})
