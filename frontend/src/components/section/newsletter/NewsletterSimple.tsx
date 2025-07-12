'use client'

import { useState, useRef } from 'react'
// @ts-ignore
import ReCAPTCHA from 'react-google-recaptcha'
import { subscriberService } from '@/services/subscriber.service'
import { ExternalLink } from 'lucide-react'
import {isValidEmail} from "@/lib/utils";

export default function NewsletterSimple() {
  const [emailSimple, setEmailSimple] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleSubmit = async () => {
    if (!emailSimple) {
      setErrorMessage('Please enter your email')
      return
    }

    if (!isValidEmail(emailSimple)) {
      setErrorMessage('Invalid email format')
      return
    }

    const token = await recaptchaRef.current?.executeAsync()
    recaptchaRef.current?.reset()

    if (!token) {
      setErrorMessage('Please complete the reCAPTCHA')
      return
    }

    setLoading(true)
    setErrorMessage('')

    try {
      await subscriberService.subscribe(emailSimple, token)
      setIsSubscribed(true)
      setEmailSimple('')
    } catch (err: any) {
      setErrorMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full mx-auto">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4 text-foreground">
          Stay Updated with Latest AI Tools
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join over 50,000 subscribers and get exclusive access to new AI tools,
          curated lists, and productivity tips delivered to your inbox.
        </p>

        {isSubscribed ? (
          <p className="text-green-600 font-semibold text-lg">
            You're subscribed! 🎉
          </p>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                name="email_simple"
                id="email_simple"
                placeholder="Enter your email"
                value={emailSimple}
                onChange={(e) => setEmailSimple(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : 'Subscribe'}
                <ExternalLink size={16} />
              </button>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                size="invisible"
                ref={recaptchaRef}
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
