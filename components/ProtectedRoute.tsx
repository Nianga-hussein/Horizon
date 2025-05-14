'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  requiredPermission?: string
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  requiredPermission,
  redirectTo = '/auth/login'
}: ProtectedRouteProps) {
  const { user, isLoading, hasPermission } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      // Si l'utilisateur n'est pas connecté
      if (!user) {
        router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(pathname)}`)
        return
      }
      
      // Si une permission spécifique est requise et que l'utilisateur ne l'a pas
      if (requiredPermission && !hasPermission(requiredPermission)) {
        router.push('/access-denied')
      }
    }
  }, [user, isLoading, requiredPermission, router, pathname, redirectTo, hasPermission])

  // Afficher un indicateur de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#006B3F] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  // Si l'utilisateur n'est pas connecté ou n'a pas la permission requise, ne rien afficher
  // (la redirection sera effectuée par l'effet)
  if (!user || (requiredPermission && !hasPermission(requiredPermission))) {
    return null
  }

  // Sinon, afficher le contenu protégé
  return <>{children}</>
}