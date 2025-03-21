"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Info } from "lucide-react"
import Link from "next/link"

// Mock analysis results
const mockResults = {
  overallRisk: "moderate", // low, moderate, high
  conditions: [
    {
      name: "Loss of Protective Sensation (LOPS)",
      risk: "moderate",
      score: 65,
      details: "Moderate risk detected based on thermal patterns indicating reduced sensation in the forefoot area.",
    },
    {
      name: "Peripheral Artery Disease (PAD)",
      risk: "low",
      score: 25,
      details: "Low risk detected. Blood flow appears adequate based on thermal imaging patterns.",
    },
    {
      name: "Foot Deformities",
      risk: "high",
      score: 85,
      details: "High risk detected. Possible early signs of Charcot foot deformity observed in the midfoot region.",
    },
    {
      name: "Pre-ulcerative Lesions",
      risk: "low",
      score: 15,
      details: "No significant pre-ulcerative lesions detected in the images.",
    },
  ],
}

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "moderate":
        return "text-amber-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "moderate":
        return <AlertTriangle className="h-5 w-5 text-amber-600" />
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Info className="h-5 w-5 text-gray-600" />
    }
  }

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-50 border-green-200"
      case "moderate":
        return "bg-amber-50 border-amber-200"
      case "high":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <header className="px-4 py-3 border-b flex items-center">
          <Link href="/scan">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-medium ml-2">Analysis</h1>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h2 className="text-xl font-bold mb-2">Analyzing Results</h2>
          <p className="text-sm text-gray-600 text-center max-w-xs">
            Our AI is analyzing your 3D foot scan to identify potential issues and recommend appropriate footwear
          </p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/scan">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-medium ml-2">Analysis Results</h1>
        </div>

        <Link href="/recommendations">
          <Button size="sm" className="bg-blue-800 hover:bg-blue-900">
            Recommendations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col">
        <div className={`p-4 ${getRiskBg(mockResults.overallRisk)}`}>
          <div className="flex items-center gap-3">
            {getRiskIcon(mockResults.overallRisk)}
            <div>
              <h2 className={`font-medium ${getRiskColor(mockResults.overallRisk)}`}>
                {mockResults.overallRisk.charAt(0).toUpperCase() + mockResults.overallRisk.slice(1)} Risk
              </h2>
              <p className="text-xs text-gray-500">Based on your 3D foot scan analysis</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="flex-1" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid grid-cols-3 mx-4 my-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="3d-model">3D Model</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-4 space-y-6 flex-1">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Risk Assessment</h2>

              {mockResults.conditions.map((condition, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-3 border-b bg-gray-50">
                    <div className="font-medium">{condition.name}</div>
                    <div className={`text-sm font-medium ${getRiskColor(condition.risk)}`}>
                      {condition.risk.charAt(0).toUpperCase() + condition.risk.slice(1)}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Risk Score</span>
                      <span className="text-xs font-medium">{condition.score}%</span>
                    </div>
                    <Progress value={condition.score} className="h-2" />
                    <p className="text-xs text-gray-600 mt-2">{condition.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">What's Next?</h3>
              <p className="text-sm text-gray-700 mb-3">
                Based on your analysis, we've identified suitable footwear options that can help address your specific
                foot conditions.
              </p>
              <Link href="/recommendations">
                <Button className="w-full bg-blue-800 hover:bg-blue-900">View Footwear Recommendations</Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="3d-model" className="flex-1 flex flex-col">
            <div className="flex-1 bg-gray-100 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">3D Model Viewer</p>
                </div>
                <p className="text-sm text-gray-600">Interactive 3D model of your foot scan</p>
              </div>
            </div>

            <div className="p-4 border-t">
              <h3 className="font-medium mb-2">3D Scan Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Arch Type</p>
                  <p className="font-medium">High Arch</p>
                </div>
                <div>
                  <p className="text-gray-500">Pronation</p>
                  <p className="font-medium">Moderate</p>
                </div>
                <div>
                  <p className="text-gray-500">Foot Width</p>
                  <p className="font-medium">Wide</p>
                </div>
                <div>
                  <p className="text-gray-500">Pressure Points</p>
                  <p className="font-medium">Forefoot</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="p-4 space-y-6">
            {mockResults.conditions.map((condition, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getRiskBg(condition.risk)}`}>
                <div className="flex items-start gap-3">
                  {getRiskIcon(condition.risk)}
                  <div>
                    <h3 className="font-medium">{condition.name}</h3>
                    <div className="flex items-center gap-2 mt-1 mb-2">
                      <span className={`text-sm font-medium ${getRiskColor(condition.risk)}`}>
                        {condition.risk.charAt(0).toUpperCase() + condition.risk.slice(1)} Risk
                      </span>
                      <span className="text-xs text-gray-500">Score: {condition.score}%</span>
                    </div>
                    <p className="text-sm text-gray-700">{condition.details}</p>

                    <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
                      <h4 className="text-sm font-medium mb-1">Recommended Features</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {condition.name === "Loss of Protective Sensation (LOPS)" && (
                          <>
                            <li>• Extra cushioning in footwear</li>
                            <li>• Seamless interior construction</li>
                            <li>• Pressure-distributing insoles</li>
                          </>
                        )}
                        {condition.name === "Peripheral Artery Disease (PAD)" && (
                          <>
                            <li>• Adjustable closures for swelling</li>
                            <li>• Non-constricting uppers</li>
                            <li>• Breathable materials</li>
                          </>
                        )}
                        {condition.name === "Foot Deformities" && (
                          <>
                            <li>• Extra depth design</li>
                            <li>• Structured support</li>
                            <li>• Accommodative toe box</li>
                            <li>• Custom orthotic compatibility</li>
                          </>
                        )}
                        {condition.name === "Pre-ulcerative Lesions" && (
                          <>
                            <li>• Offloading design</li>
                            <li>• Anti-shear construction</li>
                            <li>• Moisture-wicking liners</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

