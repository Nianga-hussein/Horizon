'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    role: 'parent' // Par défaut, les inscriptions sont pour les parents
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation basique
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    try {
      // Simulation d'inscription (à remplacer par une vraie API)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Rediriger vers la page de connexion
      router.push('/auth/login?registered=true')
    } catch (err) {
      setError('Une erreur est survenue lors de l\'inscription')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              <Image 
                src="/images/logo.png" 
                alt="Logo Fondation Horizons Nouveaux" 
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#006B3F]">Créer un compte</h2>
          <p className="mt-2 text-sm text-gray-600">
            Rejoignez la Fondation Horizons Nouveaux
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label htmlFor="nom" className="sr-only">Nom</label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  value={formData.nom}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F] focus:z-10 sm:text-sm"
                  placeholder="Nom"
                />
              </div>
              <div>
                <label htmlFor="prenom" className="sr-only">Prénom</label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  required
                  value={formData.prenom}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F] focus:z-10 sm:text-sm"
                  placeholder="Prénom"
                />
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="sr-only">Adresse email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F] focus:z-10 sm:text-sm"
                placeholder="Adresse email"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="telephone" className="sr-only">Téléphone</label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                required
                value={formData.telephone}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F] focus:z-10 sm:text-sm"
                placeholder="Téléphone"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F] focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirmer le mot de passe</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F] focus:z-10 sm:text-sm"
                placeholder="Confirmer le mot de passe"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#006B3F] hover:bg-[#005535] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006B3F] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Vous avez déjà un compte?{' '}
            <Link href="/auth/login" className="font-medium text-[#FF8B7B] hover:text-[#FF7B6B]">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}