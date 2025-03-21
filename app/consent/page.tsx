"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ConsentPage() {
  const [consented, setConsented] = useState(false)
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(false)

  const allChecked = consented && privacyAgreed && termsAgreed

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 py-3 border-b">
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-medium ml-2">Consent & Privacy</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="space-y-6 mb-8">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h2 className="font-medium text-amber-800 mb-2">Important Notice</h2>
              <p className="text-sm text-gray-700">
                This application is designed for screening purposes only and is not a substitute for professional
                medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified
                health provider with any questions you may have regarding a medical condition.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  checked={consented}
                  onCheckedChange={(checked) => setConsented(checked as boolean)}
                />
                <div>
                  <label htmlFor="consent" className="font-medium text-sm cursor-pointer">
                    I understand this is a screening tool
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    I understand that this application provides screening and not a medical diagnosis. I will consult
                    healthcare professionals for any concerns.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy"
                  checked={privacyAgreed}
                  onCheckedChange={(checked) => setPrivacyAgreed(checked as boolean)}
                />
                <div>
                  <label htmlFor="privacy" className="font-medium text-sm cursor-pointer">
                    I agree to the Privacy Policy
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    I consent to the collection and processing of my health data as described in the Privacy Policy. My
                    data will be securely stored and used only for the purposes stated.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={termsAgreed}
                  onCheckedChange={(checked) => setTermsAgreed(checked as boolean)}
                />
                <div>
                  <label htmlFor="terms" className="font-medium text-sm cursor-pointer">
                    I agree to the Terms of Service
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    I have read and agree to the Terms of Service governing the use of this application.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link href={allChecked ? "/capture" : "#"}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={!allChecked}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

