import { ProductCard } from "@/components/ProductCard"
import { useHighlightedProducts } from "@/hooks/useHighlightedProducts"

export const Home = () => {
  const { highlightedProducts, isError, isLoading } = useHighlightedProducts()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{isError.message}</div>

  return (
    <div className="container mx-auto py-16 px-12 flex flex-col gap-8 items-center">
      <h1 className="font-sans text-gray-800 text-4xl font-bold mb-6">
        Featured Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {highlightedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
