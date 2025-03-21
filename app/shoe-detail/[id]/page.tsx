"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Heart, ShoppingCart, Share2, Check } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock shoe data - in a real app, this would come from an API
const mockShoes = [
  {
    id: "1",
    name: "Orthotic Support Walker",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.7,
    features: ["Extra depth design", "Removable insoles", "Structured heel counter", "Wide toe box"],
    description:
      "Designed specifically for individuals with foot deformities and high arches. The Orthotic Support Walker provides exceptional stability and cushioning to reduce pressure points and prevent further complications.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["Black", "Gray", "Navy"],
    benefits: [
      "Reduces pressure on deformities",
      "Provides arch support",
      "Accommodates custom orthotics",
      "Helps prevent ulceration",
    ],
  },
  {
    id: "2",
    name: "Diabetic Comfort Plus",
    price: 149.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.5,
    features: ["Seamless interior", "Pressure-distributing insoles", "Cushioned midsole", "Adjustable closures"],
    description:
      "The Diabetic Comfort Plus is specially designed for individuals with diabetes and neuropathy. Its seamless interior and pressure-distributing insoles help prevent irritation and reduce the risk of ulceration.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["Black", "Brown", "White"],
    benefits: [
      "Prevents friction and irritation",
      "Distributes pressure evenly",
      "Accommodates foot swelling",
      "Reduces risk of skin breakdown",
    ],
  },
]

export default function ShoeDetailPage() {
  const params = useParams()
  const id = params.id as string

  // Find the shoe data based on the ID
  const shoe = mockShoes.find((s) => s.id === id) || mockShoes[0]

  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 py-3 border-b flex items-center justify-between">
        <Link href="/recommendations">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Product image */}
        <div className="aspect-square bg-gray-50 relative">
          <img src={shoe.image || "/placeholder.svg"} alt={shoe.name} className="w-full h-full object-contain p-6" />
        </div>

        {/* Product info */}
        <div className="p-4">
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <h1 className="text-xl font-semibold">{shoe.name}</h1>
              <span className="font-bold text-lg">${shoe.price}</span>
            </div>

            <div className="flex items-center mt-1">
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
              <span className="text-sm text-gray-500 ml-1">{shoe.rating} (124 reviews)</span>
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <p className="text-sm text-gray-700">{shoe.description}</p>

              <div>
                <h3 className="font-medium text-sm mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {shoe.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-md flex items-center justify-center border ${
                        selectedSize === size
                          ? "border-blue-800 bg-blue-800 text-white"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-2">Color</h3>
                <div className="flex gap-3">
                  {shoe.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 rounded-md border ${
                        selectedColor === color
                          ? "border-blue-800 bg-blue-50 text-blue-800"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <ul className="space-y-2">
                {shoe.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-blue-800" />
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-medium text-blue-800 text-sm mb-1">Why These Features Matter</h3>
                <p className="text-xs text-gray-700">
                  These specialized features are specifically designed to address the foot issues identified in your
                  scan, providing optimal support and reducing the risk of complications.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-4">
              <div className="bg-green-50 p-3 rounded-lg mb-4">
                <h3 className="font-medium text-green-800 text-sm mb-1">Personalized Benefits</h3>
                <p className="text-xs text-gray-700">
                  Based on your foot scan analysis, this footwear provides specific benefits to address your unique foot
                  conditions.
                </p>
              </div>

              <ul className="space-y-2">
                {shoe.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-green-800" />
                    </div>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="p-4 border-t">
        <Button className="w-full bg-blue-800 hover:bg-blue-900 h-12">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart - ${shoe.price}
        </Button>
      </footer>
    </div>
  )
}

