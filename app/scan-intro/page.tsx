"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ScanIntroPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 py-3 border-b flex items-center">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-medium ml-2">3D Foot Scan</h1>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Image preview */}
        <div className="relative aspect-square bg-gray-100">
          <img
            src="/placeholder.svg?height=400&width=400"
            alt="3D scanning illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
            <div className="text-white p-6">
              <h2 className="text-xl font-bold">3D Photogrammetry</h2>
              <p className="text-sm opacity-90">Capture your foot from multiple angles</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 flex-1">
          <h2 className="text-lg font-semibold mb-4">Scanning Instructions</h2>

          <div className="space-y-4 mb-8">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-800 font-medium text-sm">
                1
              </div>
              <p className="text-sm text-gray-700">Find a well-lit area and remove your socks and shoes</p>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-800 font-medium text-sm">
                2
              </div>
              <p className="text-sm text-gray-700">Position your foot within the frame when prompted</p>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-800 font-medium text-sm">
                3
              </div>
              <p className="text-sm text-gray-700">Slowly rotate your foot to capture all angles</p>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-800 font-medium text-sm">
                4
              </div>
              <p className="text-sm text-gray-700">Remain still during the thermal imaging process</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <h3 className="font-medium text-amber-800 text-sm">Important Note</h3>
            <p className="text-xs text-amber-700 mt-1">
              This screening is not a substitute for professional medical diagnosis. Always consult with a healthcare
              provider for proper evaluation.
            </p>
          </div>

          <Link href="/scan">
            <Button className="w-full bg-blue-800 hover:bg-blue-900 text-white h-12">
              Begin Scanning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

