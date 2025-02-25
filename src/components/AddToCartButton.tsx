import React from "react"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/useCart"
import { Product } from "@/interfaces/product.interface"

interface AddToCartButtonProps {
  product: Product
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
}) => {
  const { addToCart } = useCart()

  return (
    <Button
      className="w-full bg-green900"
      onClick={() => {
        addToCart(product)
      }}
    >
      Add to Cart
    </Button>
  )
}
