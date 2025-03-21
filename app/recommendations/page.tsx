"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Heart, ShoppingCart, Filter } from "lucide-react"
import Link from "next/link"

// Mock footwear recommendations based on analysis
const mockRecommendations = [
  {
    id: 1,
    name: "Orthotic Support Walker",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    features: ["Extra depth design", "Removable insoles", "Structured heel counter", "Wide toe box"],
    category: "athletic",
  },
  {
    id: 2,
    name: "Diabetic Comfort Plus",
    price: 149.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    features: ["Seamless interior", "Pressure-distributing insoles", "Cushioned midsole", "Adjustable closures"],
    category: "casual",
  },
  {
    id: 3,
    name: "Therapeutic Walker Pro",
    price: 159.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    features: ["Motion control technology", "Arch support system", "Shock-absorbing heel", "Breathable upper"],
    category: "athletic",
  },
  {
    id: 4,
    name: "Stability Dress Shoe",
    price: 139.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.3,
    features: ["Professional appearance", "Hidden depth design", "Supportive footbed", "Slip-resistant outsole"],
    category: "dress",
  },
]

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const filteredRecommendations =
    activeTab === "all" ? mockRecommendations : mockRecommendations.filter((item) => item.category === activeTab)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/analysis">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-medium ml-2">Recommended Footwear</h1>
        </div>

        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="p-4 bg-blue-50">
          <h2 className="text-sm font-medium text-blue-800 mb-2">Personalized Recommendations</h2>
          <p className="text-xs text-gray-700">
            Based on your foot analysis, we've selected footwear options that address your specific needs, including
            support for high arches, extra width, and cushioning for pressure points.
          </p>
        </div>

        <Tabs defaultValue="all" className="flex-1" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid grid-cols-3 mx-4 my-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="athletic">Athletic</TabsTrigger>
            <TabsTrigger value="casual">Casual</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="flex-1">
            <div className="p-4 space-y-4">
              {filteredRecommendations.map((shoe) => (
                <div key={shoe.id} className="border rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={shoe.image || "/placeholder.svg"}
                      alt={shoe.name}
                      className="w-full h-full object-contain p-4"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full"
                      onClick={() => toggleFavorite(shoe.id)}
                    >
                      <Heart
                        className={`h-5 w-5 ${favorites.includes(shoe.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      />
                    </Button>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{shoe.name}</h3>
                      <span className="font-semibold">${shoe.price}</span>
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(shoe.rating) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">{shoe.rating}</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h4 className="text-xs font-medium text-gray-700">Key Features:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {shoe.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-1">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full bg-blue-800 hover:bg-blue-900">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="athletic" className="flex-1">
            <div className="p-4 space-y-4">
              {filteredRecommendations.map((shoe) => (
                <div key={shoe.id} className="border rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={shoe.image || "/placeholder.svg"}
                      alt={shoe.name}
                      className="w-full h-full object-contain p-4"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full"
                      onClick={() => toggleFavorite(shoe.id)}
                    >
                      <Heart
                        className={`h-5 w-5 ${favorites.includes(shoe.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      />
                    </Button>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{shoe.name}</h3>
                      <span className="font-semibold">${shoe.price}</span>
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(shoe.rating) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">{shoe.rating}</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h4 className="text-xs font-medium text-gray-700">Key Features:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {shoe.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-1">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full bg-blue-800 hover:bg-blue-900">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="casual" className="flex-1">
            <div className="p-4 space-y-4">
              {filteredRecommendations.map((shoe) => (
                <div key={shoe.id} className="border rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={shoe.image || "/placeholder.svg"}
                      alt={shoe.name}
                      className="w-full h-full object-contain p-4"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full"
                      onClick={() => toggleFavorite(shoe.id)}
                    >
                      <Heart
                        className={`h-5 w-5 ${favorites.includes(shoe.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      />
                    </Button>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{shoe.name}</h3>
                      <span className="font-semibold">${shoe.price}</span>
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(shoe.rating) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">{shoe.rating}</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h4 className="text-xs font-medium text-gray-700">Key Features:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {shoe.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-1">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full bg-blue-800 hover:bg-blue-900">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="p-4 border-t">
        <div className="text-center text-xs text-gray-500">
          <p>These recommendations are based on your foot scan analysis.</p>
          <p className="mt-1">Consult with a healthcare professional before making a purchase.</p>
        </div>
      </footer>
    </div>
  )
}

