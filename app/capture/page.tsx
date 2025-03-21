"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Camera, RefreshCw, ThermometerSun } from "lucide-react"
import Link from "next/link"

export default function CapturePage() {
  const [activeTab, setActiveTab] = useState("rgb")
  const [capturedRGB, setCapturedRGB] = useState<string | null>(null)
  const [capturedThermal, setCapturedThermal] = useState<string | null>(null)
  const [cameraActive, setCameraActive] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Start camera when component mounts or tab changes
  useEffect(() => {
    if (cameraActive) {
      startCamera()
    }

    return () => {
      // Stop camera when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [activeTab, cameraActive])

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

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Get the image data URL
        const imageDataURL = canvas.toDataURL("image/png")

        // Store the captured image based on active tab
        if (activeTab === "rgb") {
          setCapturedRGB(imageDataURL)
        } else {
          // In a real app, this would be thermal image data
          // For demo, we'll simulate a thermal image with a filter
          ctx.fillStyle = "rgba(255, 0, 0, 0.3)"
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          setCapturedThermal(canvas.toDataURL("image/png"))
        }

        // Stop the camera after capturing
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream
          const tracks = stream.getTracks()
          tracks.forEach((track) => track.stop())
        }

        setCameraActive(false)
      }
    }
  }

  const resetCapture = () => {
    if (activeTab === "rgb") {
      setCapturedRGB(null)
    } else {
      setCapturedThermal(null)
    }
    setCameraActive(true)
  }

  const bothImagesReady = capturedRGB && capturedThermal

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/consent">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-medium ml-2">Capture Images</h1>
          </div>

          {bothImagesReady && (
            <Link href="/analyzing">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Continue
              </Button>
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Tabs
          defaultValue="rgb"
          className="flex-1 flex flex-col"
          onValueChange={(value) => {
            setActiveTab(value)
            setCameraActive(true)
          }}
        >
          <TabsList className="grid grid-cols-2 mx-4 my-4">
            <TabsTrigger value="rgb" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              RGB Image
              {capturedRGB && <div className="w-2 h-2 bg-green-500 rounded-full ml-1"></div>}
            </TabsTrigger>
            <TabsTrigger value="thermal" className="flex items-center gap-2">
              <ThermometerSun className="h-4 w-4" />
              Thermal Image
              {capturedThermal && <div className="w-2 h-2 bg-green-500 rounded-full ml-1"></div>}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rgb" className="flex-1 flex flex-col m-0 data-[state=active]:flex-1">
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              {!capturedRGB && !cameraActive && (
                <div className="text-center space-y-4">
                  <div className="bg-gray-100 p-8 rounded-full mx-auto">
                    <Camera className="h-12 w-12 text-gray-500" />
                  </div>
                  <h2 className="text-lg font-medium">Capture RGB Image</h2>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    Position your foot in good lighting and ensure it's clearly visible
                  </p>
                  <Button onClick={() => setCameraActive(true)} className="bg-blue-600 hover:bg-blue-700">
                    Start Camera
                  </Button>
                </div>
              )}

              {!capturedRGB && cameraActive && (
                <div className="w-full max-w-md aspect-[3/4] bg-black rounded-lg overflow-hidden relative">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-64 border-2 border-white rounded-lg opacity-50"></div>
                  </div>
                  <Button
                    onClick={captureImage}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black hover:bg-gray-200"
                    size="lg"
                  >
                    Capture
                  </Button>
                </div>
              )}

              {capturedRGB && (
                <div className="w-full max-w-md">
                  <div className="aspect-[3/4] bg-black rounded-lg overflow-hidden relative">
                    <img
                      src={capturedRGB || "/placeholder.svg"}
                      alt="Captured RGB foot image"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      onClick={resetCapture}
                      variant="outline"
                      size="sm"
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retake
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">RGB image captured successfully</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="thermal" className="flex-1 flex flex-col m-0 data-[state=active]:flex-1">
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              {!capturedThermal && !cameraActive && (
                <div className="text-center space-y-4">
                  <div className="bg-gray-100 p-8 rounded-full mx-auto">
                    <ThermometerSun className="h-12 w-12 text-gray-500" />
                  </div>
                  <h2 className="text-lg font-medium">Capture Thermal Image</h2>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    Position your foot in the same position as the RGB image
                  </p>
                  <Button onClick={() => setCameraActive(true)} className="bg-blue-600 hover:bg-blue-700">
                    Start Thermal Camera
                  </Button>
                </div>
              )}

              {!capturedThermal && cameraActive && (
                <div className="w-full max-w-md aspect-[3/4] bg-black rounded-lg overflow-hidden relative">
                  {/* In a real app, this would be the thermal camera feed */}
                  {/* For demo purposes, we're using the regular camera with a filter */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ filter: "hue-rotate(180deg) saturate(200%)" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-64 border-2 border-white rounded-lg opacity-50"></div>
                  </div>
                  <Button
                    onClick={captureImage}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black hover:bg-gray-200"
                    size="lg"
                  >
                    Capture
                  </Button>
                </div>
              )}

              {capturedThermal && (
                <div className="w-full max-w-md">
                  <div className="aspect-[3/4] bg-black rounded-lg overflow-hidden relative">
                    <img
                      src={capturedThermal || "/placeholder.svg"}
                      alt="Captured thermal foot image"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      onClick={resetCapture}
                      variant="outline"
                      size="sm"
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retake
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">Thermal image captured successfully</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

