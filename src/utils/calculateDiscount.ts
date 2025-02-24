export function calculateDiscount({
  price,
  discountPercentage,
}: {
  price: number
  discountPercentage: number
}): number {
  return (price * (100 - discountPercentage)) / 100
}
