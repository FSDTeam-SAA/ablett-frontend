import React, { Suspense } from 'react'
import LoginPage from './_components/LogingPage'

const page = () => {
  return (
    <Suspense fallback={null}>
      <LoginPage/>
    </Suspense>
  )
}

export default page
