'use client'

import { useState } from 'react'
import InputField from '@/components/ui/InputField'

export default function FHNFormPage() {
  const [formData, setFormData] = useState({
    // Informations du répondant
    estPH: false,
    repondPourPH: false,
    lienFiliation: '',
    autreLienFiliation: '',
    
    // Informations de la PH
    sexe: '',
    trancheAge: '',
    ageSpecifique: '',
    ville: '',
    quartier: '',
    
    // Type de handicap
    typeHandicap: {
      sensoriel: {
        type: false,
        sousType: ''
      },
      physique: {
        type: false,
        sousType: ''
      },
      mental: {
        type: false,
        sousType: ''
      },
      psychique: {
        type: false,
        sousType: ''
      }
    },
    
    // Informations médicales
    troublesAssocies: '',
    epilepsie: false,
    frequenceEpilepsie: '',
    
    // Origine du handicap
    origineHandicap: '',
    precisionOrigine: '',
    
    // Accompagnement
    suiviEtablissementSpecialise: false,
    scolariseEducationNationale: false,
    formationProfessionnelle: false,
    resteALaMaison: false,
    
    // Diagnostic
    diagnosticProfessionnel: false,
    specialiteProfessionnel: '',
    testsUtilises: false,
    listeTests: '',
    bilanRecu: false,
    raisonAbsenceBilan: '',
    
    // Satisfaction des services
    connaissanceDispositifs: false,
    satisfactionPriseEnCharge: '',
    appreciationServices: '',
    appreciationFormations: '',
    
    // Attentes
    attentesOuverture: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Données FHN:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const isCheckbox = type === 'checkbox'
    
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 min-h-screen pt-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#006B3F] mb-4">Enquête d'Identification et d'Évaluation</h1>
        <h2 className="text-xl text-[#FF8B7B]">de la prise en charge du handicap</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-[#FFE5A5]">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section Identification */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#006B3F] border-b border-[#FFE5A5] pb-2">
              Identification
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="estPH"
                    checked={formData.estPH}
                    onChange={handleChange}
                    className="form-checkbox text-[#FF8B7B]"
                  />
                  <span>Vous êtes en situation de handicap</span>
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="repondPourPH"
                    checked={formData.repondPourPH}
                    onChange={handleChange}
                    className="form-checkbox text-[#FF8B7B]"
                  />
                  <span>Vous répondez pour la PH</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="lienFiliation"
                value={formData.lienFiliation}
                onChange={handleChange}
                className="form-select rounded-lg border-[#FFE5A5] focus:border-[#FF8B7B] focus:ring-[#FF8B7B]"
              >
                <option value="">Sélectionnez le lien de filiation</option>
                <option value="pere">Père</option>
                <option value="mere">Mère</option>
                <option value="tante">Tante</option>
                <option value="oncle">Oncle</option>
                <option value="autre">Autre</option>
              </select>

              {formData.lienFiliation === 'autre' && (
                <InputField
                  label="Précisez le lien"
                  name="autreLienFiliation"
                  value={formData.autreLienFiliation}
                  onChange={handleChange}
                />
              )}
            </div>
          </div>

          {/* Section Informations Personnelles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#006B3F] border-b border-[#FFE5A5] pb-2">
              Informations Personnelles de la PH
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sexe"
                    value="masculin"
                    checked={formData.sexe === 'masculin'}
                    onChange={handleChange}
                    className="form-radio text-[#FF8B7B]"
                  />
                  <span>Masculin</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sexe"
                    value="feminin"
                    checked={formData.sexe === 'feminin'}
                    onChange={handleChange}
                    className="form-radio text-[#FF8B7B]"
                  />
                  <span>Féminin</span>
                </label>
              </div>

              <select
                name="trancheAge"
                value={formData.trancheAge}
                onChange={handleChange}
                className="form-select rounded-lg border-[#FFE5A5] focus:border-[#FF8B7B] focus:ring-[#FF8B7B]"
              >
                <option value="">Sélectionnez la tranche d'âge</option>
                <option value="0-10">0-10 ans</option>
                <option value="10-15">10-15 ans</option>
                <option value="15-20">15-20 ans</option>
                <option value="autre">Plus de 20 ans</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Ville/Province"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                required
              />
              <InputField
                label="Quartier"
                name="quartier"
                value={formData.quartier}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Section Type de Handicap */}
          {/* ... Ajoutez les sections pour les types de handicap ... */}

          {/* Section Diagnostic */}
          {/* ... Ajoutez les sections pour le diagnostic ... */}

          {/* Section Satisfaction */}
          {/* ... Ajoutez les sections pour la satisfaction ... */}

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-[#FF8B7B] text-white py-3 px-6 rounded-lg hover:bg-[#FF7B6B] transition-colors font-semibold"
            >
              Soumettre le formulaire
            </button>
          </div>
        </form>
      </div>

      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Toutes les informations confidentielles transmises dans ce formulaire ne seront et ne pourront être utilisées à des fins personnelles ou commerciales.</p>
        <p className="mt-2">© {new Date().getFullYear()} Fondation Horizons Nouveaux</p>
      </div>
    </div>
  )
}