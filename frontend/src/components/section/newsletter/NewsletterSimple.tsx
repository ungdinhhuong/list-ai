'use client'

import { ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { SetStateAction, useRef, useState} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import {RECAPTCHA_SITE_KEY} from '@/constants/env'
import {isValidEmail} from '@/lib/utils'
import {subscriberService} from '@/services/subscriber.service'

export default function NewsletterSimple() {
  const t = useTranslations()
  const [emailSimple, setEmailSimple] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [showCaptcha, setShowCaptcha] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleSubmit = async () => {
    setErrorMessage('')

    if (!emailSimple) {
      setErrorMessage(t('recaptcha.enter_email'))
      return
    }

    if (!isValidEmail(emailSimple)) {
      setErrorMessage(t('recaptcha.invalid_email'))
      return
    }

    if (!captchaToken) {
      setShowCaptcha(true)
      setErrorMessage(t('recaptcha.please_complete_recaptcha'))
      return
    }

    setLoading(true)

    try {
      await subscriberService.subscribe(emailSimple, captchaToken)
      setIsSubscribed(true)
      setEmailSimple('')
      setCaptchaToken(null)
      setShowCaptcha(false)
      recaptchaRef.current?.reset()
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full mx-auto">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4 text-foreground">{t('newsletter.simple.title')}</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          {t('newsletter.simple.description')}
        </p>

        {isSubscribed ? (
          <p className="text-green-600 font-semibold text-lg">
            {t('newsletter.youAreSubscribed')} 🎉
          </p>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                name="email_simple"
                id="email_simple"
                placeholder={`${t('recaptcha.enter_email')}`}
                value={emailSimple}
                onChange={e => setEmailSimple(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {loading ? `${t('common.sending')}` : `${t('common.subscribe')}`}
                <ExternalLink size={16}/>
              </button>
            </div>

            {showCaptcha && (
              <div className="flex justify-center mt-4">
                <ReCAPTCHA
                  sitekey='6LcFjJgrAAAAAAEP19swpG6v4a7wIyc1cAsuXkt-'
                  ref={recaptchaRef}
                  onChange={(token: SetStateAction<string | null>) => {
                    setCaptchaToken(token)
                    setErrorMessage('')
                    handleSubmit() // tự submit lại sau khi tick
                  }}
                />
              </div>
            )}

            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          </>
        )}
      </div>
    </div>
  )
}
