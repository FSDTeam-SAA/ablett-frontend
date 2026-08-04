import React, { Suspense } from 'react'
import VerifyEmailPage from './_components/VerifyEmailPage'

const page = () => {
  return (
    <Suspense fallback={null}>
      <VerifyEmailPage/>
    </Suspense>
  )
}

export default page
