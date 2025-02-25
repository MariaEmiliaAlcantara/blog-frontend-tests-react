import React from "react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { CartSheet } from "./CartSheet"

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-center w-full bg-cream100">
      <div className="flex items-center justify-between wide-container !py-4 flex-wrap w-full">
        <Link to="/">
          <img src="/vite.svg" alt="Ecommerce" width={40} height={40} />
        </Link>

        <div className="lg:hidden flex align-items gap-4">
          <CartSheet />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="[&_svg]:w-auto [&_svg]:h-auto"
              >
                <Menu color={"var(--green900)"} size={28} />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="fixed w-64 sm:w-72">
              <SheetTitle className="hidden">Menu</SheetTitle>
              <nav className="grid gap-4 pt-10 text-lg font-medium">
                <NavbarLink title="Products" href="/products" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden lg:flex items-center leading-5 lg:gap-4">
          <NavbarLink title="Products" href="/products" />
          <CartSheet />
        </nav>
      </div>
    </header>
  )
}

interface NavbarLinkProps {
  href: string
  title: string
}

export const NavbarLink = ({ href, title }: NavbarLinkProps) => {
  return (
    <Link to={href}>
      <span className="font-sans text-base text-green900 text-lg md:text-base hover:text-green500">
        {title}
      </span>
    </Link>
  )
}
