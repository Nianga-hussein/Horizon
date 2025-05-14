'use client'

import { useState } from 'react'
import InputField from '@/components/ui/InputField'
import { m } from 'framer-motion'

export default function WISIFormPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    typeHandicap: '',
    // Ajoutez d'autres champs selon vos besoins
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de soumission du formulaire
    console.log('Données du formulaire:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <m.div 
      className="max-w-3xl mx-auto py-8 px-4 min-h-screen pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <m.h1 
        className="text-3xl font-bold mb-8"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2 }}
      >
        Formulaire WISI
      </m.h1>
      <m.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <InputField
          label="Nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <InputField
          label="Prénom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
        <InputField
          label="Date de naissance"
          name="dateNaissance"
          type="date"
          value={formData.dateNaissance}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Soumettre le formulaire
        </button>
      </m.form>
    </m.div>
  )
}