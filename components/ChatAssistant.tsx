'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

type Message = {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Bonjour ! Je suis Horizon, votre assistant virtuel. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Faire défiler automatiquement vers le bas lorsque de nouveaux messages arrivent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Simuler une réponse de l'assistant avec contexte de conversation
  const getAssistantResponse = async (userMessage: string): Promise<string> => {
    // Ajouter le message de l'utilisateur au contexte de la conversation
    const updatedContext = [...conversationContext, userMessage]
    setConversationContext(updatedContext)
    
    // Simuler un délai de réponse
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Logique avancée de réponse basée sur le contexte de la conversation
    const lowerCaseMessage = userMessage.toLowerCase()
    
    // Réponses spécifiques à la Fondation
    if (lowerCaseMessage.includes('formulaire') && lowerCaseMessage.includes('wisi')) {
      return "Le formulaire WISI est une évaluation complète des besoins de l'enfant. Vous pouvez y accéder depuis la page d'accueil ou directement via le menu en haut. Souhaitez-vous que je vous guide pour le remplir ?"
    } else if (lowerCaseMessage.includes('formulaire') && lowerCaseMessage.includes('tarii')) {
      return "Le formulaire TARII concerne le suivi médical et le développement personnel. Vous pouvez y accéder depuis la page d'accueil ou le menu principal. Puis-je vous aider avec une section spécifique ?"
    } else if (lowerCaseMessage.includes('formulaire') && lowerCaseMessage.includes('fhn')) {
      return "Le questionnaire FHN adopte une approche holistique pour comprendre les besoins de votre enfant. Vous pouvez le trouver sur notre page d'accueil ou via le menu. Avez-vous des questions sur son contenu ?"
    } 
    
    // Réponses sur la fondation
    else if (lowerCaseMessage.includes('fondation') || lowerCaseMessage.includes('horizons nouveaux')) {
      return "La Fondation Horizons Nouveaux est dédiée à l'accompagnement des enfants en situation de handicap au Gabon. Notre mission est de fournir un soutien personnalisé pour favoriser leur développement et leur inclusion. Souhaitez-vous en savoir plus sur nos programmes spécifiques ?"
    }
    
    // Réponses sur les contacts
    else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('joindre')) {
      return "Vous pouvez nous contacter par téléphone au +241 12 345 678, par email à contact@fondation-hn.org, ou en utilisant le formulaire de contact sur notre site. Souhaitez-vous que je vous aide à remplir ce formulaire ?"
    } 
    
    // Réponses sur l'inscription
    else if (lowerCaseMessage.includes('inscription') || lowerCaseMessage.includes('inscrire')) {
      return "Pour inscrire votre enfant, vous devez d'abord créer un compte utilisateur, puis remplir le formulaire WISI. Souhaitez-vous commencer ce processus maintenant ?"
    } 
    
    // Réponses sur la connexion
    else if (lowerCaseMessage.includes('connexion') || lowerCaseMessage.includes('connecter')) {
      return "Vous pouvez vous connecter en cliquant sur 'Se connecter' en haut à droite de la page. Si vous n'avez pas encore de compte, vous devrez d'abord vous inscrire. Puis-je vous aider avec l'inscription ?"
    } 
    
    // Réponses de politesse
    else if (lowerCaseMessage.includes('merci') || lowerCaseMessage.includes('au revoir')) {
      return "Je vous en prie ! N'hésitez pas à revenir si vous avez d'autres questions. Bonne journée !"
    } 
    
    // Réponses sur le handicap
    else if (lowerCaseMessage.includes('handicap') || lowerCaseMessage.includes('besoin spécial')) {
      return "La Fondation Horizons Nouveaux accompagne les enfants présentant divers types de handicaps, notamment physiques, intellectuels, sensoriels et troubles du développement. Notre approche est personnalisée pour répondre aux besoins spécifiques de chaque enfant. Quel type d'accompagnement recherchez-vous ?"
    }
    
    // Réponses sur les services
    else if (lowerCaseMessage.includes('service') || lowerCaseMessage.includes('programme')) {
      return "Nous proposons plusieurs services, notamment : évaluations personnalisées, accompagnement éducatif, suivi médical, soutien psychologique, et activités de socialisation. Quel service vous intéresse particulièrement ?"
    }
    
    // Réponses sur l'équipe
    else if (lowerCaseMessage.includes('équipe') || lowerCaseMessage.includes('professionnel')) {
      return "Notre équipe est composée de professionnels qualifiés dans divers domaines : médecins, psychologues, éducateurs spécialisés, orthophonistes, kinésithérapeutes et assistants sociaux. Tous sont formés pour accompagner les enfants en situation de handicap avec bienveillance et expertise."
    }
    
    // Réponses générales sur la santé
    else if (lowerCaseMessage.includes('santé') || lowerCaseMessage.includes('médical')) {
      return "La santé et le bien-être des enfants sont au cœur de notre mission. Nous offrons un suivi médical régulier et adapté aux besoins spécifiques de chaque enfant. Avez-vous des questions sur un aspect particulier du suivi médical ?"
    }
    
    // Réponses sur l'éducation
    else if (lowerCaseMessage.includes('éducation') || lowerCaseMessage.includes('école')) {
      return "Nous travaillons en étroite collaboration avec les établissements scolaires pour favoriser l'inclusion des enfants. Notre approche éducative est adaptée aux capacités et aux besoins de chaque enfant, avec pour objectif de développer leur autonomie et leurs compétences."
    }
    
    // Réponses sur les activités
    else if (lowerCaseMessage.includes('activité') || lowerCaseMessage.includes('loisir')) {
      return "Nous organisons diverses activités adaptées : ateliers créatifs, activités sportives, sorties culturelles et événements de socialisation. Ces activités sont conçues pour favoriser le développement global et l'épanouissement des enfants."
    }
    
    // Réponses sur les coûts
    else if (lowerCaseMessage.includes('coût') || lowerCaseMessage.includes('prix') || lowerCaseMessage.includes('tarif')) {
      return "La Fondation s'efforce de rendre ses services accessibles à tous. Certains services sont gratuits, d'autres peuvent être partiellement ou totalement pris en charge selon votre situation. N'hésitez pas à nous contacter pour discuter des options financières adaptées à votre situation."
    }
    
    // Réponses sur l'âge
    else if (lowerCaseMessage.includes('âge') || lowerCaseMessage.includes('enfant')) {
      return "Nous accompagnons les enfants de 0 à 18 ans. Nos programmes sont adaptés aux différentes tranches d'âge et stades de développement. Quel est l'âge de l'enfant pour lequel vous recherchez des informations ?"
    }
    
    // Réponses sur les témoignages
    else if (lowerCaseMessage.includes('témoignage') || lowerCaseMessage.includes('avis')) {
      return "De nombreuses familles ont partagé leur expérience positive avec notre fondation. Leurs témoignages soulignent l'impact significatif de notre accompagnement sur le développement et le bien-être de leurs enfants. Vous pouvez consulter certains de ces témoignages sur notre page d'accueil."
    }
    
    // Réponses sur les partenaires
    else if (lowerCaseMessage.includes('partenaire') || lowerCaseMessage.includes('collaboration')) {
      return "Nous collaborons avec divers partenaires : établissements de santé, écoles, associations, entreprises et organismes gouvernementaux. Ces partenariats nous permettent d'offrir un accompagnement complet et de qualité aux enfants et à leurs familles."
    }
    
    // Réponses sur les événements
    else if (lowerCaseMessage.includes('événement') || lowerCaseMessage.includes('conférence')) {
      return "Nous organisons régulièrement des événements : journées portes ouvertes, conférences sur le handicap, ateliers pour les parents et festivités pour les enfants. Consultez notre calendrier sur le site pour connaître les prochains événements."
    }
    
    // Réponses sur le bénévolat
    else if (lowerCaseMessage.includes('bénévole') || lowerCaseMessage.includes('volontaire')) {
      return "Nous accueillons avec plaisir les bénévoles souhaitant contribuer à notre mission. Vous pouvez nous aider de diverses façons selon vos compétences et disponibilités. Contactez-nous pour en savoir plus sur les opportunités de bénévolat."
    }
    
    // Réponses sur les dons
    else if (lowerCaseMessage.includes('don') || lowerCaseMessage.includes('soutenir')) {
      return "Votre soutien est précieux pour nous permettre de poursuivre notre mission. Vous pouvez faire un don financier, offrir du matériel ou partager votre expertise. Chaque contribution, quelle que soit sa nature ou son ampleur, fait une différence dans la vie des enfants que nous accompagnons."
    }
    
    // Réponses sur la confidentialité
    else if (lowerCaseMessage.includes('confidentialité') || lowerCaseMessage.includes('données')) {
      return "Nous accordons une importance primordiale à la confidentialité et à la protection des données. Toutes les informations que vous nous confiez sont traitées avec la plus grande discrétion et sécurité, conformément aux réglementations en vigueur."
    }
    
    // Réponses sur l'accessibilité
    else if (lowerCaseMessage.includes('accessibilité') || lowerCaseMessage.includes('accès')) {
      return "Nos locaux sont entièrement accessibles aux personnes à mobilité réduite. Nous veillons à ce que tous nos services et activités soient inclusifs et adaptés aux différents types de handicap."
    }
    
    // Réponses générales
    else if (lowerCaseMessage.includes('bonjour') || lowerCaseMessage.includes('salut')) {
      return "Bonjour ! Je suis ravi de vous accueillir sur le site de la Fondation Horizons Nouveaux. Comment puis-je vous aider aujourd'hui ?"
    }
    
    // Réponse par défaut avec analyse du contexte
    else {
      // Analyser le contexte de la conversation pour une réponse plus pertinente
      if (conversationContext.length > 1) {
        const previousMessage = conversationContext[conversationContext.length - 2].toLowerCase();
        
        if (previousMessage.includes('formulaire')) {
          return "Pour en savoir plus sur nos formulaires, vous pouvez consulter la section dédiée sur notre site. Nous proposons trois types de formulaires : WISI, TARII et FHN, chacun ayant un objectif spécifique dans notre processus d'accompagnement. Lequel vous intéresse particulièrement ?"
        }
        
        if (previousMessage.includes('contact')) {
          return "N'hésitez pas à nous contacter pour toute question supplémentaire. Notre équipe est disponible pour vous répondre et vous accompagner dans vos démarches."
        }
      }
      
      return "Je ne suis pas sûr de comprendre votre demande. Je peux vous renseigner sur la Fondation Horizons Nouveaux, nos services d'accompagnement pour les enfants en situation de handicap, nos formulaires (WISI, TARII, FHN), ou vous aider avec le processus d'inscription. Comment puis-je vous être utile ?"
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Obtenir la réponse de l'assistant
    try {
      const response = await getAssistantResponse(inputValue)
      
      // Ajouter la réponse de l'assistant
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Erreur lors de la génération de la réponse:', error)
      
      // Message d'erreur
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Désolé, je rencontre des difficultés à traiter votre demande. Veuillez réessayer plus tard.",
        sender: 'assistant',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bouton de chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-16 h-16 rounded-full bg-[#006B3F] text-white shadow-lg hover:bg-[#005535] transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Ouvrir l'assistant"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Fenêtre de chat */}
      <div className={`fixed bottom-0 right-0 w-full sm:w-96 bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl transition-all duration-300 transform ${
        isOpen ? 'translate-y-0 sm:translate-y-0 sm:bottom-6 sm:right-6' : 'translate-y-full sm:translate-y-full'
      } overflow-hidden flex flex-col`} style={{ height: isOpen ? '500px' : '0' }}>
        {/* En-tête */}
        <div className="bg-[#006B3F] text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative w-10 h-10 mr-3 rounded-full overflow-hidden border-2 border-[#FFE5A5]">
              <Image 
                src="/images/logo.png" 
                alt="Assistant Horizon"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold">Assistant Horizon</h3>
              <p className="text-xs text-[#FFE5A5]">Toujours là pour vous aider</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-[#FFE5A5] transition-colors"
            aria-label="Fermer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Corps du chat */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-3 ${
                  message.sender === 'user' 
                    ? 'bg-[#006B3F] text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                }`}>
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Pied de page avec zone de saisie */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#006B3F] focus:border-transparent"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`p-3 rounded-full ${
                !inputValue.trim() || isTyping
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#FF8B7B] text-white hover:bg-[#FF7B6B]'
              } transition-colors`}
              aria-label="Envoyer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}