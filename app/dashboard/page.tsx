'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Types pour les données
type DossierStatus = 'Nouveau' | 'En cours' | 'Incomplet' | 'Accepté' | 'Rejeté' | 'Clôturé'

type Dossier = {
  id: string
  nom: string
  prenom: string
  dateNaissance: string
  statut: DossierStatus
  dateCreation: string
  derniereMaj: string
}

export default function DashboardPage() {
  // Données simulées pour le tableau de bord
  const stats = [
    { label: 'Total Dossiers', value: 124, color: 'bg-blue-500' },
    { label: 'En cours', value: 45, color: 'bg-yellow-500' },
    { label: 'Acceptés', value: 62, color: 'bg-green-500' },
    { label: 'En attente', value: 17, color: 'bg-orange-500' }
  ]
  
  // Données simulées pour la liste des dossiers récents
  const recentDossiers: Dossier[] = [
    {
      id: '1',
      nom: 'Dupont',
      prenom: 'Marie',
      dateNaissance: '12/05/2015',
      statut: 'En cours',
      dateCreation: '15/03/2023',
      derniereMaj: '22/03/2023'
    },
    {
      id: '2',
      nom: 'Martin',
      prenom: 'Lucas',
      dateNaissance: '03/11/2016',
      statut: 'Accepté',
      dateCreation: '10/03/2023',
      derniereMaj: '18/03/2023'
    },
    {
      id: '3',
      nom: 'Petit',
      prenom: 'Sophie',
      dateNaissance: '25/07/2017',
      statut: 'Incomplet',
      dateCreation: '05/03/2023',
      derniereMaj: '12/03/2023'
    },
    {
      id: '4',
      nom: 'Dubois',
      prenom: 'Thomas',
      dateNaissance: '14/02/2014',
      statut: 'Nouveau',
      dateCreation: '01/03/2023',
      derniereMaj: '01/03/2023'
    },
    {
      id: '5',
      nom: 'Leroy',
      prenom: 'Emma',
      dateNaissance: '30/09/2018',
      statut: 'En cours',
      dateCreation: '28/02/2023',
      derniereMaj: '10/03/2023'
    }
  ]
  
  // État pour le filtrage
  const [statusFilter, setStatusFilter] = useState<DossierStatus | 'Tous'>('Tous')
  
  // Filtrer les dossiers selon le statut sélectionné
  const filteredDossiers = statusFilter === 'Tous' 
    ? recentDossiers 
    : recentDossiers.filter(dossier => dossier.statut === statusFilter)
  
  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusColor = (status: DossierStatus) => {
    switch(status) {
      case 'Nouveau': return 'bg-blue-100 text-blue-800'
      case 'En cours': return 'bg-yellow-100 text-yellow-800'
      case 'Incomplet': return 'bg-orange-100 text-orange-800'
      case 'Accepté': return 'bg-green-100 text-green-800'
      case 'Rejeté': return 'bg-red-100 text-red-800'
      case 'Clôturé': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#006B3F]">Tableau de bord</h1>
            <p className="text-gray-600">Bienvenue sur votre espace personnel</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              href="/dossiers/create" 
              className="inline-flex items-center px-4 py-2 bg-[#FF8B7B] text-white rounded-md hover:bg-[#FF7B6B] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Nouveau dossier
            </Link>
          </div>
        </div>
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-white`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{stat.value}</h2>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Liste des dossiers récents */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-[#006B3F]">Dossiers récents</h2>
          </div>
          
          {/* Filtres */}
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex flex-wrap gap-2">
              {['Tous', 'Nouveau', 'En cours', 'Incomplet', 'Accepté', 'Rejeté', 'Clôturé'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status as DossierStatus | 'Tous')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusFilter === status 
                      ? 'bg-[#006B3F] text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de naissance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de création
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dernière mise à jour
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDossiers.map((dossier) => (
                  <tr key={dossier.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {dossier.nom} {dossier.prenom}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dossier.dateNaissance}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(dossier.statut)}`}>
                        {dossier.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dossier.dateCreation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dossier.derniereMaj}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/dossiers/${dossier.id}`} className="text-[#006B3F] hover:text-[#005535] mr-4">
                        Voir
                      </Link>
                      <Link href={`/dossiers/${dossier.id}/edit`} className="text-[#FF8B7B] hover:text-[#FF7B6B]">
                        Modifier
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredDossiers.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-500">Aucun dossier ne correspond à ce filtre</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}