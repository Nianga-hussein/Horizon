'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type AssistantContextType = {
  openAssistant: () => void
  closeAssistant: () => void
  isAssistantOpen: boolean
  sendMessage: (message: string) => void
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined)

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)

  const openAssistant = () => {
    setIsAssistantOpen(true)
  }

  const closeAssistant = () => {
    setIsAssistantOpen(false)
  }

  const sendMessage = (message: string) => {
    // Cette fonction sera implémentée pour communiquer avec le composant ChatAssistant
    // Pour l'instant, on ouvre simplement l'assistant
    setIsAssistantOpen(true)
    
    // Ici, vous pourriez utiliser un système d'événements ou un état global
    // pour envoyer le message au composant ChatAssistant
    const event = new CustomEvent('assistant-message', { detail: message })
    window.dispatchEvent(event)
  }

  return (
    <AssistantContext.Provider value={{ openAssistant, closeAssistant, isAssistantOpen, sendMessage }}>
      {children}
    </AssistantContext.Provider>
  )
}

export function useAssistant() {
  const context = useContext(AssistantContext)
  if (context === undefined) {
    throw new Error('useAssistant must be used within an AssistantProvider')
  }
  return context
}