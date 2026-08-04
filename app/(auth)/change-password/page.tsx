import React, { Suspense } from 'react'
import ChangePasswordPage from './_components/ChangePasswordPage'

const page = () => {
  return (
    <Suspense fallback={null}>
      <ChangePasswordPage/>
    </Suspense>
  )
}

export default page
