import useSWR, { Fetcher } from "swr"
import { Product } from "../interfaces/product.interface"

const fetcher: Fetcher<Product[], string> = async () => {
  const response = await fetch("http://localhost:3000/products")
  if (!response.ok) {
    throw new Error("Error fetching highlighted products")
  }
  const data = await response.json()

  const highlightedProducts = data.filter(
    (product: Product) => product.highlight
  )
  return highlightedProducts
}

export const useHighlightedProducts = () => {
  const { data, error, isLoading } = useSWR<Product[]>(
    "highlightedProducts",
    fetcher
  )

  return {
    highlightedProducts: data,
    isLoading,
    isError: error,
  }
}
