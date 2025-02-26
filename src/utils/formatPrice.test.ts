import { formatPrice } from "./formatPrice"

describe("formatPrice - formats numbers into USD currency strings", () => {
  test("formats a positive price with two decimals correctly", () => {
    expect(formatPrice(29.99)).toBe("$29.99")
  })

  test("formats a price with one decimal places correctly", () => {
    expect(formatPrice(49.9)).toBe("$49.90")
  })

  test("formats a positive price without decimals correctly", () => {
    expect(formatPrice(1000)).toBe("$1,000.00")
  })

  test("formats a positive price with rounding up correctly", () => {
    expect(formatPrice(123.455)).toBe("$123.46")
  })

  test("formats a positive price with rounding down correctly", () => {
    expect(formatPrice(123.454)).toBe("$123.45")
  })

  test("formats a negative price correctly", () => {
    expect(formatPrice(-19.99)).toBe("-$19.99")
  })

  test("formats a price of zero correctly", () => {
    expect(formatPrice(0)).toBe("$0.00")
  })

  test("formats a very large price correctly", () => {
    expect(formatPrice(1000000)).toBe("$1,000,000.00")
  })

  test("formats a price with many decimal places correctly", () => {
    expect(formatPrice(123.456789)).toBe("$123.46")
  })
})
