"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Camera, RotateCcw, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ScanPage() {
  const [scanStage, setScanStage] = useState<"prepare" | "scanning" | "processing" | "complete">("prepare")
  const [scanProgress, setScanProgress] = useState(0)
  const [captureCount, setCaptureCount] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Start camera when component mounts
  useEffect(() => {
    if (scanStage === "scanning") {
      startCamera()

      // Simulate progress for demo
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          const newProgress = prev + 2
          if (newProgress >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setScanStage("processing")

              // After "processing", move to complete
              setTimeout(() => {
                setScanStage("complete")
              }, 2000)
            }, 500)
            return 100
          }

          // Increment capture count at certain points
          if (newProgress % 20 === 0) {
            setCaptureCount((prev) => prev + 1)
          }

          return newProgress
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }, [scanStage])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const startScan = () => {
    setScanStage("scanning")
    setCaptureCount(0)
    setScanProgress(0)
  }

  const resetScan = () => {
    setScanStage("prepare")
    setCaptureCount(0)
    setScanProgress(0)
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="px-4 py-3 flex items-center justify-between">
        <Link href="/scan-intro">
          <Button variant="ghost" size="icon" className="text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="text-white text-sm font-medium">
          {scanStage === "prepare" && "Ready to Scan"}
          {scanStage === "scanning" && "Scanning in Progress"}
          {scanStage === "processing" && "Processing Scan"}
          {scanStage === "complete" && "Scan Complete"}
        </div>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </header>

      <main className="flex-1 flex flex-col">
        {/* Camera/Preview Area */}
        <div className="relative flex-1 bg-black">
          {scanStage === "prepare" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
              <div className="bg-white/10 p-6 rounded-full mb-6">
                <Camera className="h-12 w-12" />
              </div>
              <h2 className="text-xl font-bold mb-2">3D Foot Scan</h2>
              <p className="text-sm opacity-80 mb-8 max-w-xs">
                Position your foot on a flat surface and keep the camera steady during scanning
              </p>
              <Button onClick={startScan} className="bg-white text-black hover:bg-gray-100 h-12 px-8">
                Start Scanning
              </Button>
            </div>
          )}

          {scanStage === "scanning" && (
            <>
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />

              {/* Scanning overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Scanning grid/frame */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-blue-400 rounded-lg opacity-70"></div>
                </div>

                {/* Capture indicators */}
                <div className="absolute top-6 left-6 right-6 flex justify-between">
                  <div className="text-white text-sm font-medium">Captures: {captureCount}/5</div>
                  <div className="text-white text-sm font-medium">{Math.round(scanProgress)}%</div>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-24 left-6 right-6">
                  <Progress value={scanProgress} className="h-1 bg-white/20" />
                  <p className="text-white text-xs mt-2 text-center">
                    {scanProgress < 30 && "Capturing front view..."}
                    {scanProgress >= 30 && scanProgress < 60 && "Capturing side views..."}
                    {scanProgress >= 60 && scanProgress < 90 && "Capturing thermal data..."}
                    {scanProgress >= 90 && "Finalizing scan..."}
                  </p>
                </div>
              </div>
            </>
          )}

          {scanStage === "processing" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
              <h2 className="text-xl font-bold mb-2">Processing Scan</h2>
              <p className="text-sm opacity-80 max-w-xs">Creating 3D model and analyzing foot structure...</p>
            </div>
          )}

          {scanStage === "complete" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
              <div className="bg-green-500 p-4 rounded-full mb-6">
                <CheckCircle className="h-12 w-12" />
              </div>
              <h2 className="text-xl font-bold mb-2">Scan Complete</h2>
              <p className="text-sm opacity-80 mb-8 max-w-xs">
                Your 3D foot scan has been successfully captured and processed
              </p>
              <div className="space-y-3 w-full max-w-xs">
                <Link href="/analysis">
                  <Button className="w-full bg-white text-black hover:bg-gray-100 h-12">View Analysis</Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white/10 h-12"
                  onClick={resetScan}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Rescan
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

