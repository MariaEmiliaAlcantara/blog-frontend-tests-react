import { ComponentPropsWithoutRef, forwardRef } from "react"
import { Button } from "./ui/button"
import { ShoppingCart } from "lucide-react"

interface CartButtonProps extends ComponentPropsWithoutRef<"button"> {
  totalItems: number
}

const CartButton = forwardRef<HTMLButtonElement, CartButtonProps>(
  ({ totalItems, ...props }, ref) => {
    return (
      <Button ref={ref} variant="ghost" className="relative" {...props}>
        <ShoppingCart />
        {totalItems > 0 && (
          <div className="flex items-center justify-center size-[1.125rem] absolute -top-1 -right-1 bg-rose rounded-full">
            <p className="text-white text-xs font-bold">{totalItems}</p>
          </div>
        )}
      </Button>
    )
  }
)

CartButton.displayName = "CartButton"

export default CartButton
