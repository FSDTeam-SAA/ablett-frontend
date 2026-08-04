'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const queryClient = new QueryClient()

type ResetPasswordPayload = {
  email: string
  newPassword: string
}

type ResetPasswordResponse = {
  status?: boolean
  success?: boolean
  message?: string
  error?: string
}

async function resetPassword(payload: ResetPasswordPayload) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  if (!apiBaseUrl) {
    throw new Error('API base URL is not configured.')
  }

  const response = await fetch(
    `${apiBaseUrl.replace(/\/+$/, '')}/auth/reset-password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  )

  const data: ResetPasswordResponse | null = await response
    .json()
    .catch(() => null)
  const hasExplicitFailure = data?.status === false || data?.success === false

  if (!response.ok || hasExplicitFailure) {
    throw new Error(
      data?.message || data?.error || 'Password reset failed. Please try again.'
    )
  }

  return data
}

function ChangePasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')?.trim().toLowerCase() || ''
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data?.message || 'Password changed successfully.')
      router.push('/login')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Password reset failed. Please try again.'
      )
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) {
      toast.error('Email is missing. Please verify OTP again.')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }

    resetPasswordMutation.mutate({
      email,
      newPassword: formData.newPassword,
    })
  }

  const isPasswordMatch = formData.newPassword && formData.confirmPassword === formData.newPassword
  const isFormValid = formData.newPassword && isPasswordMatch

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
                Change Password
              </h2>
              <p className="text-[#D7D7D7] text-base">
                Create a new password for your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* New Password Field */}
              <div className="space-y-2">
                <label className="text-base font-normal text-[#FFFFFF]">
                  Create New Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    placeholder="Enter Password..."
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="bg-[#333333] h-[51px] border-none rounded-full text-white placeholder:text-gray-500 pl-5 pr-10"
                    disabled={resetPasswordMutation.isPending}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={resetPasswordMutation.isPending}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-base font-normal text-[#FFFFFF]">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Enter Password..."
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-[#333333] h-[51px] border-none rounded-full text-white placeholder:text-gray-500 pl-5 pr-10"
                    disabled={resetPasswordMutation.isPending}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={resetPasswordMutation.isPending}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className={`text-sm ${isPasswordMatch ? 'text-green-500' : 'text-red-500'}`}>
                  {isPasswordMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                </div>
              )}

              {/* Continue Button */}
              <Button
                type="submit"
                disabled={!isFormValid || resetPasswordMutation.isPending}
                className="w-full bg-[#BB7B1D] hover:bg-[#BB7B1D]/80 disabled:bg-[#333333] disabled:cursor-not-allowed text-white h-[51px] text-base font-semibold py-2 rounded-full transition-colors"
              >
                {resetPasswordMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Continue'
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

export default function ChangePasswordPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChangePasswordForm />
    </QueryClientProvider>
  )
}
