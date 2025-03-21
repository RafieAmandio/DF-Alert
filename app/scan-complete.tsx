"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ScanComplete() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Scan Complete",
      description: "Your 3D foot scan has been successfully captured",
    },
    {
      title: "Scan Analyzed",
      description: "We've analyzed your foot structure and arch type",
    },
    {
      title: "Recommendation Ready",
      description: "Your custom orthotic recommendation is ready to view",
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Navigate to product view
    }
  }

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
          <div className="text-sm font-medium">Results</div>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#f1f5f9] flex items-center justify-center mb-6">
          {currentStep === 0 && (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13L9 17L19 7" stroke="#23bc99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {currentStep === 1 && (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 4V20M20 12H4"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {currentStep === 2 && (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#23bc99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        <h1 className="text-2xl font-semibold mb-2">{steps[currentStep].title}</h1>
        <p className="text-[#64748b] mb-8">{steps[currentStep].description}</p>

        <div className="flex gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentStep ? "bg-[#6366f1]" : "bg-[#cbd5e1]"}`}
            />
          ))}
        </div>

        <Button onClick={nextStep} className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white py-6">
          {currentStep < steps.length - 1 ? "Continue" : "View Recommendation"}
          <ChevronRight className="h-5 w-5 ml-2" />
        </Button>
      </main>

      {/* Device frame for mobile preview */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-black rounded-[40px] z-10"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20"></div>
    </div>
  )
}

