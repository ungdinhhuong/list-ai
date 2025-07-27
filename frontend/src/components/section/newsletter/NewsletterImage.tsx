'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React, { useRef, useState } from 'react'
// @ts-ignore
import { ReCAPTCHA } from 'react-google-recaptcha'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RECAPTCHA_SITE_KEY } from '@/constants/env'
import { isValidEmail } from '@/lib/utils'
import { subscriberService } from '@/services/subscriber.service'

export default function NewsletterImage() {
  const t = useTranslations()
  const [emailImage, setEmailImage] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleSubmit = async () => {
    if (!emailImage) {
      setErrorMessage(t('recaptcha.enter_email'))
      return
    }

    if (!isValidEmail(emailImage)) {
      setErrorMessage(t('recaptcha.invalid_email'))
      return
    }

    const token = await recaptchaRef.current?.executeAsync()
    recaptchaRef.current?.reset()

    if (!token) {
      setErrorMessage(t('recaptcha.please_complete_recaptcha'))
      return
    }

    setLoading(true)
    setErrorMessage('')

    try {
      await subscriberService.subscribe(emailImage, token)
      setIsSubscribed(true)
      setEmailImage('')
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full mx-auto bg-background rounded-2xl overflow-hidden shadow-2xl border border-border">
      <div className="relative flex flex-col lg:flex-row items-center justify-between p-4 lg:p-8 gap-4 lg:gap-8">
        {/* Background Blurs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-4 left-4 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-4 right-4 w-24 h-24 bg-blue-500 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-500 rounded-full blur-xl" />
        </div>

        {/* Image Section */}
        <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/ads.png"
            alt="Toi Vuot Minh - Hanh trinh phat trien ban than"
            width={600}
            height={400}
            sizes="(max-width: 600px) 100vw, 600px"
            className="rounded-xl object-cover"
            priority
          />
        </div>

        {/* Form Section */}
        <div className="flex-1">
          <div className="space-y-6">
            <p className="text-foreground text-lg font-medium">
              {t('newsletter.text1')}{' '}
              <span className="text-blue-500 font-bold">{t('newsletter.text2')}</span>{' '}
              {t('newsletter.text3')}
            </p>

            <div className="space-y-4">
              {isSubscribed ? (
                <div className="text-green-600 font-semibold text-lg">
                  {t('newsletter.youAreSubscribed')} 🎉
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3">
                    <Input
                      type="email"
                      name="email_image"
                      id="email_image"
                      placeholder="name@email.com"
                      value={emailImage}
                      onChange={e => setEmailImage(e.target.value)}
                      className="flex-1 bg-muted border-border text-foreground placeholder-muted-foreground"
                    />
                    <Button
                      onClick={handleSubmit}
                      className="px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                      disabled={loading}
                    >
                      {loading ? t('common.sending') : t('common.subscribe')}
                    </Button>
                    <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} size="invisible" ref={recaptchaRef} />
                  </div>
                  {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                </div>
              )}
            </div>

            <div className="flex items-center flex-wrap space-x-2 text-sm">
              <span className="text-muted-foreground">{t('newsletter.text4')}</span>
              <span className="text-foreground font-bold text-lg">{t('newsletter.text5')}</span>
              <span className="text-yellow-400">🔥</span>
              <span className="text-red-400 font-semibold">{t('newsletter.text6')}</span>
              <span className="text-muted-foreground">{t('newsletter.text7')}</span>
            </div>
          </div>
        </div>

        {/* Floating dots */}
        <div
          className="absolute top-6 right-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className="absolute bottom-8 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute top-1/3 right-8 w-4 h-4 bg-pink-400 rounded-full animate-pulse" />
      </div>
    </div>
  )
}
