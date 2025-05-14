'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CreateDossierPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  // État du formulaire
  const [formData, setFormData] = useState({
    // Informations de l'enfant
    nom: '',
    prenom: '',
    dateNaissance: '',
    sexe: '',
    commune: '',
    
    // Informations du parent/tuteur
    parentNom: '',
    parentTelephone: '',
    parentEmail: '',
    
    // Informations médicales
    diagnostic: '',
    
    // Fichiers
    documents: [] as File[]
  })
  
  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Gérer l'upload de fichiers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newFiles]
      }))
    }
  }
  
  // Supprimer un fichier
  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }))
  }
  
  // Passer à l'étape suivante
  const nextStep = () => {
    setStep(prev => prev + 1)
    window.scrollTo(0, 0)
  }
  
  // Revenir à l'étape précédente
  const prevStep = () => {
    setStep(prev => prev - 1)
    window.scrollTo(0, 0)
  }
  
  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulation d'envoi de données (à remplacer par une vraie API)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Rediriger vers la page de confirmation
      router.push('/dossiers/success')
    } catch (error) {
      console.error('Erreur lors de la création du dossier:', error)
      alert('Une erreur est survenue lors de la création du dossier.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen pt-24 pb-10 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#006B3F]">Création d'un nouveau dossier</h1>
          <p className="text-gray-600 mt-2">
            Veuillez remplir les informations ci-dessous pour créer un dossier pour votre enfant
          </p>
        </div>
        
        {/* Indicateur d'étapes */}
        <div className="mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepNumber ? 'bg-[#006B3F] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`h-1 w-16 ${step > stepNumber ? 'bg-[#006B3F]' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium">Informations de l'enfant</span>
            <span className="text-sm font-medium">Informations du parent</span>
            <span className="text-sm font-medium">Documents</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit}>
            {/* Étape 1: Informations de l'enfant */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#006B3F] mb-4">Informations de l'enfant</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F]"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                    <input
                      type="date"
                      id="dateNaissance"
                      name="dateNaissance"
                      value={formData.dateNaissance}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="sexe" className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
                    <select
                      id="sexe"
                      name="sexe"
                      value={formData.sexe}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F]"
                    >
                      <option value="">Sélectionner</option>
                      <option value="M">Masculin</option>
                      <option value="F">Féminin</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="commune" className="block text-sm font-medium text-gray-700 mb-1">Commune</label>
                  <input
                    type="text"
                    id="commune"
                    name="commune"
                    value={formData.commune}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F]"
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#006B3F] text-white px-6 py-2 rounded-md hover:bg-[#005535] transition-colors"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
            
            {/* Étape 2: Informations du parent/tuteur */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#006B3F] mb-4">Informations du parent/tuteur</h2>
                
                <div>
                  <label htmlFor="parentNom" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    id="parentNom"
                    name="parentNom"
                    value={formData.parentNom}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F]"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="parentTelephone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      id="parentTelephone"
                      name="parentTelephone"
                      value={formData.parentTelephone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="parentEmail"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#006B3F] text-white px-6 py-2 rounded-md hover:bg-[#005535] transition-colors"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
            
            {/* Étape 3: Documents et diagnostic */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#006B3F] mb-4">Documents et diagnostic</h2>
                
                <div>
                  <label htmlFor="diagnostic" className="block text-sm font-medium text-gray-700 mb-1">Diagnostic médical</label>
                  <textarea
                    id="diagnostic"
                    name="diagnostic"
                    value={formData.diagnostic}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#006B3F] focus:border-[#006B3F]"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#006B3F] hover:text-[#005535] focus-within:outline-none">
                          <span>Téléverser des fichiers</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                        </label>
                        <p className="pl-1">ou glisser-déposer</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF jusqu'à 10MB
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Liste des fichiers téléversés */}
                {formData.documents.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700">Fichiers téléversés</h3>
                    <ul className="mt-2 divide-y divide-gray-200 border border-gray-200 rounded-md">
                      {formData.documents.map((file, index) => (
                        <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 flex-1 w-0 truncate">
                              {file.name}
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="font-medium text-red-600 hover:text-red-500"
                            >
                              Supprimer
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Précédent
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#006B3F] text-white px-6 py-2 rounded-md hover:bg-[#005535] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Traitement en cours...
                      </>
                    ) : (
                      'Soumettre le dossier'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/dossiers" className="text-[#006B3F] hover:underline">
            Retour à la liste des dossiers
          </Link>
        </div>
      </div>
    </div>
  )
}