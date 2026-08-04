'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

type ForgotPasswordResponse = {
  statusCode?: number
  status?: boolean
  success?: boolean
  message?: string
  error?: string
}

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedEmail) {
      toast.error('Please enter your email address.')
      return
    }

    setIsSubmitting(true)
    const toastId = toast.loading('Sending OTP...')

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

      if (!apiBaseUrl) {
        toast.error('API base URL is not configured.', { id: toastId })
        return
      }

      const response = await fetch(
        `${apiBaseUrl.replace(/\/+$/, '')}/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: trimmedEmail,
          }),
        }
      )

      const data: ForgotPasswordResponse | null = await response
        .json()
        .catch(() => null)
      const hasExplicitFailure = data?.status === false || data?.success === false

      if (!response.ok || hasExplicitFailure) {
        const message =
          data?.message ||
          data?.error ||
          'Could not send OTP. Please check your email and try again.'

        toast.error(message, { id: toastId })
        return
      }

      toast.success(data?.message || 'OTP sent successfully.', { id: toastId })
      router.push(`/verify-otp?email=${encodeURIComponent(trimmedEmail)}`)
    } catch {
      toast.error('Something went wrong. Please try again.', { id: toastId })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2 ">
      {/* Image Section - Hidden on mobile, shown on desktop */}
      <div className="hidden md:flex flex-col justify-between bg-[#00000033] p-8 relative overflow-hidden">
        <Image
          src="/auth.png"
          alt="Construction background"
          fill
          className="object-cover absolute inset-0"
          priority
        />
        <div className="relative z-10">
        </div>
      </div>

      {/* Form Section */}
      <div className="relative flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/auth2.png"
          alt="Construction background"
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-black/70" /> */}
        <div className="relative z-10 w-full max-w-[560px] bg-[#FFFFFF14]  p-6 md:p-8 border border-[#333333] rounded-[12px]">
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A7</span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            <div className="text-center">
              <Image
                src="/logo.png"
                alt="A7 Logo"
                width={100}
                height={100}
                className="mx-auto"
              />
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 mt-6">
                Forgot Password!
              </h2>
              <p className="text-[#D7D7D7] text-base">
                Enter your email to recover your password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-base font-normal text-[#FFFFFF]">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter Your Email Address..."
                  value={email}
                  onChange={handleChange}
                  className="bg-[#333333] h-[51px] border-none rounded-full text-white placeholder:text-gray-500 pl-5"
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* Send OTP Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="w-full bg-[#BB7B1D] hover:bg-[#BB7B1D]/80 text-white h-[51px] text-base font-semibold py-2 rounded-full transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </form>

            {/* Back to Login */}
            <div className="text-center ">
              <Link
                href="/login"
                className="text-[#BB7B1D] hover:text-[#BB7B1D] transition-colors font-medium text-sm"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
