'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'

export default function AccessDenied() {
  const { user } = useAuth()
  const router = useRouter()

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!user) {
      router.push('/login?callbackUrl=/')
    }
  }, [user, router])

  if (!user) return null

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-6">
                <Image
                  src="/images/access-denied.svg"
                  alt="Accès refusé"
                  fill
                  className="object-contain"
                />
              </div>
              
              <h1 className="text-3xl font-bold text-[#006B3F] mb-4">Accès Refusé</h1>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-left w-full">
                <p className="text-red-700">
                  Vous n'avez pas les permissions nécessaires pour accéder à cette page.
                </p>
              </div>
              
              <p className="text-gray-600 mb-8">
                Votre compte actuel ({user.name}) avec le rôle <strong>{user.role}</strong> ne dispose pas des droits d'accès requis pour cette section.
              </p>
              
              <div className="space-y-4 w-full">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="font-semibold text-[#006B3F] mb-2">Que puis-je faire ?</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 text-left">
                    <li>Retourner à la page d'accueil</li>
                    <li>Contacter un administrateur pour obtenir les accès nécessaires</li>
                    <li>Vous connecter avec un compte disposant des permissions requises</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link 
                  href="/"
                  className="bg-[#006B3F] text-white px-6 py-3 rounded-lg hover:bg-[#005535] transition-colors"
                >
                  Retour à l'accueil
                </Link>
                
                <button 
                  onClick={() => router.back()}
                  className="border border-[#006B3F] text-[#006B3F] px-6 py-3 rounded-lg hover:bg-[#006B3F] hover:text-white transition-colors"
                >
                  Page précédente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}