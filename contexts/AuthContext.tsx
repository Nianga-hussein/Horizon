'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Types de rôles disponibles
export type UserRole = 'parent' | 'secretaire' | 'analyste' | 'admin'

// Interface utilisateur
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

// Interface du contexte d'authentification
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<boolean>
  hasPermission: (permission: string) => boolean
}

// Permissions par rôle
const rolePermissions: Record<UserRole, string[]> = {
  parent: [
    'dossier.create.own',
    'dossier.view.own',
    'dossier.comment.own',
  ],
  secretaire: [
    'dossier.create.any',
    'dossier.view.any',
    'dossier.update.any',
    'dossier.search',
  ],
  analyste: [
    'dossier.view.any',
    'dossier.comment.any',
    'dossier.status.update',
    'dossier.close',
    'dossier.validate',
  ],
  admin: [
    'user.manage',
    'settings.manage',
    'dossier.view.any',
    'dossier.create.any',
    'dossier.update.any',
    'dossier.delete.any',
    'dossier.search',
    'dossier.comment.any',
    'dossier.status.update',
    'dossier.close',
    'dossier.validate',
  ]
}

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l intérieur d un AuthProvider')
  }
  return context
}

// Fournisseur du contexte
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simuler une vérification d'authentification
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Utilisateur de test selon l'email
      let mockUser: User | null = null
      
      if (email.includes('parent')) {
        mockUser = { id: '1', name: 'Parent Test', email, role: 'parent' }
      } else if (email.includes('secretaire')) {
        mockUser = { id: '2', name: 'Secrétaire Test', email, role: 'secretaire' }
      } else if (email.includes('analyste')) {
        mockUser = { id: '3', name: 'Analyste Test', email, role: 'analyste' }
      } else if (email.includes('admin')) {
        mockUser = { id: '4', name: 'Admin Test', email, role: 'admin' }
      }
      
      if (mockUser) {
        setUser(mockUser)
        localStorage.setItem('user', JSON.stringify(mockUser))
        localStorage.setItem('isLoggedIn', 'true')
        return true
      }
      
      return false
    } catch (error) {
      console.error('Erreur de connexion:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction de déconnexion
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
  }

  // Fonction d'inscription
  const register = async (name: string, email: string, password: string, role: UserRole = 'parent'): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role
      }
      
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      localStorage.setItem('isLoggedIn', 'true')
      return true
    } catch (error) {
      console.error('Erreur d\'inscription:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Vérifier si l'utilisateur a une permission spécifique
  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return rolePermissions[user.role].includes(permission)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register, hasPermission }}>
      {children}
    </AuthContext.Provider>
  )
}