import React, { useEffect } from 'react'
import { useAuth } from '../src/context/AuthContext'
import router from 'next/router'
function homePage() {
  const { hasUser } = useAuth()
  useEffect(() => {
    !hasUser && router.push(`/`)
  }, [])
  return <div>homePage</div>
}

export default homePage
