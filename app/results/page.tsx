"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Info } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

// This would typically come from the API after analysis
// In a proprietary implementation, this would be the output of the ML model
const mockResults = {
  timestamp: new Date().toISOString(),
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
  recommendations: [
    "Schedule an appointment with a podiatrist within the next 2 weeks",
    "Continue daily foot inspections using a mirror",
    "Ensure proper footwear with adequate support",
    "Monitor for any changes in foot temperature or appearance",
  ],
}

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("overview")

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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-medium ml-2">Screening Results</h1>
          </div>

          <Link href="/recommendations">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Recommendations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <div className={`p-4 ${getRiskBg(mockResults.overallRisk)}`}>
          <div className="flex items-center gap-3">
            {getRiskIcon(mockResults.overallRisk)}
            <div>
              <h2 className={`font-medium ${getRiskColor(mockResults.overallRisk)}`}>
                {mockResults.overallRisk.charAt(0).toUpperCase() + mockResults.overallRisk.slice(1)} Risk
              </h2>
              <p className="text-xs text-gray-500">
                Analyzed on {new Date(mockResults.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="flex-1" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid grid-cols-3 mx-4 my-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Results</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-4 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Risk Assessment Summary</h2>

              {mockResults.conditions.map((condition, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-3 border-b bg-gray-50">
                    <div className="font-medium">{condition.name}</div>
                    <div className={`text-sm font-medium ${getRiskColor(condition.risk)}`}>
                      {condition.risk.charAt(0).toUpperCase() + condition.risk.slice(1)} Risk
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Risk Score</span>
                      <span className="text-xs font-medium">{condition.score}%</span>
                    </div>
                    <Progress value={condition.score} className="h-2" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Next Steps</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                {mockResults.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                      {index + 1}
                    </div>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
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

                    {/* This section would be redacted in a proprietary implementation */}
                    <div className="mt-3 text-xs text-gray-500 italic border-t border-dashed pt-2">
                      [REDACTED: Proprietary algorithm details explaining how the risk score was calculated based on
                      specific thermal and RGB image features]
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="images" className="p-4 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Captured Images</h2>

              <div className="border rounded-lg overflow-hidden">
                <div className="p-3 border-b bg-gray-50 font-medium">RGB Image</div>
                <div className="p-4">
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                    {/* In a real app, this would be the actual captured image */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      [RGB Image Placeholder]
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="p-3 border-b bg-gray-50 font-medium">Thermal Image</div>
                <div className="p-4">
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                    {/* In a real app, this would be the actual captured thermal image */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      [Thermal Image Placeholder]
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="p-3 border-b bg-gray-50 font-medium">Analysis Overlay</div>
                <div className="p-4">
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                    {/* In a real app, this would show the analysis visualization */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      [Analysis Visualization Placeholder]
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 italic">
                    [REDACTED: Proprietary visualization showing detected risk areas with heat map overlay]
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

