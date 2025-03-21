"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero section with gradient background */}
      <div className="relative h-[40vh] bg-gradient-to-r from-blue-900 to-indigo-800 flex items-center justify-center px-6">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-2">Diabetic Foot Screening</h1>
          <p className="text-sm opacity-90 max-w-xs mx-auto">
            Early detection of foot complications using advanced 3D imaging technology
          </p>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 px-6 py-8 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">How It Works</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-800 font-semibold">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Capture 3D Images</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Take RGB and thermal images of your feet using 3D photogrammetry
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-800 font-semibold">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900">AI Analysis</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Our machine learning algorithm analyzes your images for risk factors
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-800 font-semibold">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Get Recommendations</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Receive footwear recommendations based on your specific foot condition
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">What We Detect</h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-medium text-sm text-gray-900">LOPS</h3>
              <p className="text-xs text-gray-600 mt-1">Loss of Protective Sensation</p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-medium text-sm text-gray-900">PAD</h3>
              <p className="text-xs text-gray-600 mt-1">Peripheral Artery Disease</p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-medium text-sm text-gray-900">Deformities</h3>
              <p className="text-xs text-gray-600 mt-1">Foot structure abnormalities</p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-medium text-sm text-gray-900">Pre-ulcerative</h3>
              <p className="text-xs text-gray-600 mt-1">Early signs of ulceration</p>
            </div>
          </div>
        </div>

        <Link href="/scan-intro">
          <Button className="w-full bg-blue-800 hover:bg-blue-900 text-white h-12">
            Start Screening
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </main>
    </div>
  )
}

