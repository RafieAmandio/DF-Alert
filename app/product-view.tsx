"use client"

import { useState } from "react"
import { ChevronLeft, ShoppingCart, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProductView() {
  const [selectedSize, setSelectedSize] = useState("M")

  const sizes = ["S", "M", "L", "XL"]

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0f172a]">
      {/* Header */}
      <header className="px-4 py-3 border-b border-[#e2e8f0]">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-[#1e293b]">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="text-sm font-medium">Custom Orthotics</div>
          <Button variant="ghost" size="icon" className="text-[#1e293b]">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Product image */}
        <div className="aspect-square bg-[#f1f5f9] relative">
          <img
            src="/placeholder.svg?height=400&width=400"
            alt="Custom orthotics"
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product details */}
        <div className="p-5 space-y-4">
          <div>
            <h1 className="text-xl font-semibold">Premium Custom Orthotics</h1>
            <div className="flex items-center justify-between mt-1">
              <p className="text-[#64748b]">Based on your foot scan</p>
              <p className="font-semibold">$129.99</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium mb-2">Size</h2>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                    selectedSize === size
                      ? "border-[#0f172a] bg-[#0f172a] text-white"
                      : "border-[#e2e8f0] text-[#64748b]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium mb-2">Description</h2>
            <p className="text-sm text-[#64748b]">
              Custom-made orthotics designed specifically for your foot structure. Provides optimal support and comfort
              based on your unique scan data.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-[#e2e8f0]">
        <Button className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white py-6">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
      </footer>

      {/* Device frame for mobile preview */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-black rounded-[40px] z-10"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20"></div>
    </div>
  )
}

