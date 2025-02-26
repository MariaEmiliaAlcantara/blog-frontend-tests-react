interface CalculateDiscountProps {
  price: number
  discountPercentage: number
}

export function calculateDiscount({
  price,
  discountPercentage,
}: CalculateDiscountProps): number {
  return (price * (100 - discountPercentage)) / 100
}
