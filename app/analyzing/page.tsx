"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AnalyzingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("Initializing analysis...")

  useEffect(() => {
    // Simulate the analysis process
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          // Navigate to results page when complete
          setTimeout(() => {
            router.push("/results")
          }, 500)
          return 100
        }
        return prev + 5
      })

      // Update status text based on progress
      if (progress < 20) {
        setStatusText("Preprocessing images...")
      } else if (progress < 40) {
        setStatusText("Detecting foot boundaries...")
      } else if (progress < 60) {
        setStatusText("Analyzing temperature patterns...")
      } else if (progress < 80) {
        setStatusText("Identifying risk factors...")
      } else {
        setStatusText("Generating report...")
      }
    }, 300)

    return () => clearInterval(timer)
  }, [progress, router])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent"
                style={{
                  transform: "rotate(-90deg)",
                  transition: "all 0.2s ease",
                  clipPath: `polygon(50% 50%, 50% 0%, ${progress * 3.6 + 50}% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`,
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold">{progress}%</span>
              </div>
            </div>

            <h1 className="text-xl font-semibold mb-2">Analyzing Your Foot Images</h1>
            <p className="text-gray-600">{statusText}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="font-medium text-blue-800 mb-2">What's Happening?</h2>
              <p className="text-sm text-gray-700">
                Our AI is analyzing your RGB and thermal images to detect signs of diabetic foot complications. This
                process uses advanced machine learning algorithms to identify risk factors with high accuracy.
              </p>
            </div>

            {/* This section would be redacted in a proprietary implementation */}
            <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
              <h2 className="font-medium text-gray-800 mb-2">AI Analysis Process</h2>
              <p className="text-xs text-gray-500 italic">
                [REDACTED: Proprietary ML model processing pipeline that analyzes thermal gradients and tissue
                characteristics to detect early signs of neuropathy and vascular issues]
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4 px-6 text-center">
        <div className="flex items-center justify-center text-sm text-gray-500">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Processing data securely...
        </div>
      </footer>
    </div>
  )
}

