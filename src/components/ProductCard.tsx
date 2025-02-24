import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card"
import { Product } from "@/interfaces/product.interface"
import { formatPrice } from "@/utils/formatPrice"
import { calculateDiscount } from "@/utils/calculateDiscount"
import { Badge } from "./ui/badge"
import { AddToCartButton } from "./AddToCartButton"

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, description, image, price, discountPercentage } = product

  const hasDiscount = discountPercentage > 0

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {hasDiscount && (
          <Badge className="absolute top-2 left-2 text-cream100 bg-rose hover:bg-rose">
            Special Price
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="font-sans text-lg text-green900 font-semibold">
          {name}
        </CardTitle>
        <CardDescription className="font-sans text-sm text-green900">
          {description}
        </CardDescription>
        <ProductPrice
          hasDiscount={hasDiscount}
          price={price}
          discountPercentage={discountPercentage}
        />
      </CardContent>
      <CardFooter className="p-4">
        <AddToCartButton />
      </CardFooter>
    </Card>
  )
}

interface ProductPriceProps {
  hasDiscount: boolean
  price: number
  discountPercentage: number
}

const ProductPrice = ({
  hasDiscount,
  price,
  discountPercentage,
}: ProductPriceProps) => {
  const priceWithDiscount = calculateDiscount({
    price: price,
    discountPercentage: discountPercentage,
  })

  const containerClassName = "flex items-center gap-2 mt-2"
  const realPriceClassName = "font-mono text-lg text-rose font-bold"

  if (hasDiscount) {
    return (
      <div className={containerClassName}>
        <p className={realPriceClassName}>{formatPrice(priceWithDiscount)}</p>
        <p className="font-mono text-sm text-green900 line-through">
          {formatPrice(price)}
        </p>
      </div>
    )
  }

  return (
    <div className={containerClassName}>
      <p className={realPriceClassName}>{formatPrice(price)}</p>
    </div>
  )
}
