'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const pathname = usePathname()
  
  // Utilisation de useEffect pour éviter les erreurs côté serveur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Simuler un utilisateur connecté (à remplacer par votre logique d'authentification)
    const checkAuth = () => {
      // Ici, vous devriez vérifier si l'utilisateur est authentifié
      // Par exemple, en vérifiant un token dans localStorage ou via une API
      const fakeAuth = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(fakeAuth)
    }
    
    checkAuth()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setShowProfileMenu(false)
  }, [pathname])
  
  // Vérifier si le lien est actif
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }
  
  // Simuler une déconnexion
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    setShowProfileMenu(false)
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2' : 'bg-[#FF8B7B]/90 py-4'
    }`}>
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative w-14 h-14 mr-3">
                <Image 
                  src="/images/logo.png"
                  alt="Fondation Horizons Nouveaux"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isScrolled ? 'text-[#006B3F]' : 'text-white'}`}>Fondation</h1>
                <p className="text-xs text-[#FFE5A5]">Horizons Nouveaux</p>
              </div>
            </Link>
          </div>
          
          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`relative group ${
                isScrolled ? 'text-[#006B3F]' : 'text-white'
              } ${isActive('/') ? 'font-semibold' : ''}`}
            >
              <span>Accueil</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFE5A5] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {['WISI', 'TARII', 'FHN'].map((item) => (
              <Link 
                key={item}
                href={`/formulaires/${item.toLowerCase()}`} 
                className={`relative group ${
                  isScrolled ? 'text-[#006B3F]' : 'text-white'
                } ${isActive(`/formulaires/${item.toLowerCase()}`) ? 'font-semibold' : ''}`}
              >
                <span>Formulaire {item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFE5A5] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* Afficher le bouton de connexion ou le profil utilisateur */}
            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/auth/login" 
                  className={`relative group ${
                    isScrolled ? 'text-[#006B3F]' : 'text-white'
                  } ${isActive('/auth/login') ? 'font-semibold' : ''}`}
                >
                  <span>Se connecter</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFE5A5] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href="/auth/register" 
                  className="bg-[#006B3F] text-white px-6 py-2 rounded-full hover:bg-[#005535] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  S'inscrire
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFE5A5]">
                    <Image 
                      src="/images/avatar-placeholder.jpg" 
                      alt="Photo de profil"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className={`${isScrolled ? 'text-[#006B3F]' : 'text-white'}`}>
                    Mon Profil
                  </span>
                  <svg 
                    className={`w-4 h-4 ${isScrolled ? 'text-[#006B3F]' : 'text-white'} transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Menu déroulant du profil */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fadeIn">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mon compte
                    </Link>
                    <Link 
                      href="/dossiers" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mes dossiers
                    </Link>
                    {/* Ajouter d'autres liens selon les besoins */}
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Bouton menu mobile */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4 animate-fadeIn">
            <Link 
              href="/" 
              className={`block py-2 ${
                isScrolled ? 'text-[#006B3F]' : 'text-white'
              } hover:text-[#FFE5A5] transition-colors ${
                isActive('/') ? 'font-semibold' : ''
              }`}
            >
              Accueil
            </Link>
            {['WISI', 'TARII', 'FHN'].map((item) => (
              <Link 
                key={item}
                href={`/formulaires/${item.toLowerCase()}`} 
                className={`block py-2 ${
                  isScrolled ? 'text-[#006B3F]' : 'text-white'
                } hover:text-[#FFE5A5] transition-colors ${
                  isActive(`/formulaires/${item.toLowerCase()}`) ? 'font-semibold' : ''
                }`}
              >
                Formulaire {item}
              </Link>
            ))}
            
            {/* Afficher les options de connexion ou le profil utilisateur en mobile */}
            {!isLoggedIn ? (
              <>
                <Link 
                  href="/auth/login" 
                  className={`block py-2 ${
                    isScrolled ? 'text-[#006B3F]' : 'text-white'
                  } hover:text-[#FFE5A5] transition-colors ${
                    isActive('/auth/login') ? 'font-semibold' : ''
                  }`}
                >
                  Se connecter
                </Link>
                <Link 
                  href="/auth/register" 
                  className="block bg-[#006B3F] text-white px-4 py-2 rounded-md hover:bg-[#005535] transition-colors text-center"
                >
                  S'inscrire
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center py-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#FFE5A5] mr-2">
                    <Image 
                      src="/images/avatar-placeholder.jpg" 
                      alt="Photo de profil"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className={`${isScrolled ? 'text-[#006B3F]' : 'text-white'} font-semibold`}>
                    Mon Profil
                  </span>
                </div>
                <Link 
                  href="/profile" 
                  className={`block py-2 pl-10 ${
                    isScrolled ? 'text-[#006B3F]' : 'text-white'
                  } hover:text-[#FFE5A5] transition-colors`}
                >
                  Mon compte
                </Link>
                <Link 
                  href="/dossiers" 
                  className={`block py-2 pl-10 ${
                    isScrolled ? 'text-[#006B3F]' : 'text-white'
                  } hover:text-[#FFE5A5] transition-colors`}
                >
                  Mes dossiers
                </Link>
                <button 
                  onClick={handleLogout}
                  className={`block py-2 pl-10 text-left w-full ${
                    isScrolled ? 'text-red-600' : 'text-red-300'
                  } hover:text-red-500 transition-colors`}
                >
                  Se déconnecter
                </button>
              </>
            )}
          </nav>
        )}
      </nav>
    </header>
  )
}