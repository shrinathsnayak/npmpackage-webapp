'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { NavigationProgress, nprogress } from '@mantine/nprogress'

export const NavigationProgressBar = () => {
  const pathname = usePathname()

  useEffect(() => {
    nprogress.complete()
    return () => {
      nprogress.start()
    }
  }, [pathname])

  return <NavigationProgress color='red.8' size={5} />
}