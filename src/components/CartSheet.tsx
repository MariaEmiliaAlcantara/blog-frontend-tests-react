import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/utils/formatPrice"
import React from "react"
import CartButton from "./CartButton"
import { ProductItemCart } from "./ProductItemCart"

export const CartSheet: React.FC = () => {
  const { cart, totalPrice, totalItems, clearCart } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <CartButton totalItems={totalItems} />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-8">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {cart.products.length
            ? cart.products.map((productCart) => (
                <ProductItemCart
                  key={productCart.id}
                  productCart={productCart}
                />
              ))
            : "There are no products in the cart"}
        </div>

        <SheetFooter className="flex-col sm:flex-col gap-2 sm:space-x-0">
          {cart.products.length > 0 && (
            <Button
              onClick={clearCart}
              variant="ghost"
              className="text-sm text-gray-500 underline self-end mb-4"
            >
              CLEAN CART
            </Button>
          )}
          <p className="text-lg font-bold">Total: {formatPrice(totalPrice)}</p>
          <Button className="w-full bg-green500 hover:bg-green900">
            Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
