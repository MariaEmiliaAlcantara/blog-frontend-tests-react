import { ProductCart } from "@/interfaces/productCart.interface"
import { formatPrice } from "@/utils/formatPrice"
import React from "react"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/useCart"
import { Trash } from "lucide-react"
import { calculateDiscount } from "@/utils/calculateDiscount"

interface ProductItemCartProps {
  productCart: ProductCart
}

export const ProductItemCart: React.FC<ProductItemCartProps> = ({
  productCart,
}) => {
  const { removeFromCart } = useCart()

  const priceWithDiscount = calculateDiscount({
    price: productCart.price,
    discountPercentage: productCart.discountPercentage,
  })

  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-medium">{productCart.name}</h3>
        <p className="text-sm text-gray-500">
          Each: {formatPrice(priceWithDiscount)}
        </p>
        <p className="text-sm text-gray-500">
          Quantity: {productCart.quantity}
        </p>
      </div>
      <Button
        size="icon"
        variant="destructive"
        onClick={() => removeFromCart(productCart.id)}
      >
        <Trash />
      </Button>
    </div>
  )
}
