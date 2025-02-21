import React, { useState, useEffect } from 'react';
import { PageTransition } from './PageTransition';
import { PlusCircle, Trash2, Edit, AlertTriangle, Bell, Download, BarChart2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Show } from '../types';

interface AdminAccessProps {
  onAccess: () => void;
}

function AdminAccess({ onAccess }: AdminAccessProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '1987') {
      onAccess();
      setError('');
    } else {
      setError('Code incorrect');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          Accès Administrateur
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-200 mb-2">
              Code d'accès
            </label>
            <input
              type="password"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Accéder
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminTvManagement() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [shows, setShows] = useState<Show[]>([
    {
      id: '1',
      title: 'The Voice - La finale',
      channel: 'TF1',
      datetime: '2025-03-15T20:50:00',
      description: 'La grande finale de The Voice 2025 !',
      host: 'Nikos Aliagas',
      genre: 'Divertissement',
      imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81'
    },
    {
      id: '2',
      title: 'Koh-Lanta',
      channel: 'TF1',
      datetime: '2025-03-14T21:00:00',
      description: 'La nouvelle saison de Koh-Lanta débute !',
      host: 'Denis Brogniart',
      genre: 'Divertissement',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    {
      id: '3',
      title: 'Les Feux de l\'Amour',
      channel: 'France 2',
      datetime: '2025-03-15T20:00:00',
      description: 'Drame romantique sur France 2',
      host: 'N/A',
      genre: 'Série',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);
  const [newShow, setNewShow] = useState<Show>({
    id: '',
    title: '',
    channel: '',
    datetime: '',
    description: '',
    host: '',
    genre: '',
    imageUrl: '',
  });

  const handleAddShow = () => {
    if (editingShow) {
      setShows(shows.map(show => show.id === editingShow.id ? newShow : show));
      toast.success('Programme modifié avec succès !');
    } else {
      const id = String(Date.now());
      setShows([...shows, { ...newShow, id }]);
      toast.success('Programme ajouté avec succès !');
    }
    setNewShow({
      id: '',
      title: '',
      channel: '',
      datetime: '',
      description: '',
      host: '',
      genre: '',
      imageUrl: '',
    });
    setShowForm(false);
    setEditingShow(null);
  };

  const handleEditShow = (show: Show) => {
    setEditingShow(show);
    setNewShow(show);
    setShowForm(true);
  };

  const handleDeleteShow = (id: string) => {
    setShows(shows.filter(show => show.id !== id));
    toast.success('Programme supprimé avec succès !');
  };

  if (!isAdmin) {
    return <AdminAccess onAccess={() => setIsAdmin(true)} />;
  }

  return (
    <PageTransition>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Administration</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <BarChart2 className="w-8 h-8 text-purple-500" />
              <h3 className="text-lg font-medium">Total Programmes</h3>
            </div>
            <p className="text-3xl font-bold">{shows.length}</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <Bell className="w-8 h-8 text-purple-500" />
              <h3 className="text-lg font-medium">Notifications</h3>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Envoyer une notification
            </button>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <Download className="w-8 h-8 text-purple-500" />
              <h3 className="text-lg font-medium">Exporter</h3>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Exporter les données
            </button>
          </div>
        </div>

        {showForm ? (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">
              {editingShow ? 'Modifier un programme' : 'Ajouter un nouveau programme'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  value={newShow.title}
                  onChange={(e) => setNewShow({ ...newShow, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Chaîne
                </label>
                <input
                  type="text"
                  value={newShow.channel}
                  onChange={(e) => setNewShow({ ...newShow, channel: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date et heure
                </label>
                <input
                  type="datetime-local"
                  value={newShow.datetime}
                  onChange={(e) => setNewShow({ ...newShow, datetime: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newShow.description}
                  onChange={(e) => setNewShow({ ...newShow, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Présentateur
                </label>
                <input
                  type="text"
                  value={newShow.host}
                  onChange={(e) => setNewShow({ ...newShow, host: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Genre
                </label>
                <select
                  value={newShow.genre}
                  onChange={(e) => setNewShow({ ...newShow, genre: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Sélectionner un genre</option>
                  <option value="Divertissement">Divertissement</option>
                  <option value="Sport">Sport</option>
                  <option value="Talk-show">Talk-show</option>
                  <option value="Série">Série</option>
                  <option value="Film">Film</option>
                  <option value="Documentaire">Documentaire</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL de l'image
                </label>
                <input
                  type="url"
                  value={newShow.imageUrl}
                  onChange={(e) => setNewShow({ ...newShow, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleAddShow}
                  className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  {editingShow ? 'Modifier' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingShow(null);
                  }}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Ajouter un programme
            </button>
          </div>
        )}

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Liste des programmes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-6">Titre</th>
                  <th className="text-left py-4 px-6">Chaîne</th>
                  <th className="text-left py-4 px-6">Date</th>
                  <th className="text-left py-4 px-6">Genre</th>
                  <th className="text-right py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shows.map((show) => (
                  <tr key={show.id} className="border-b border-gray-700">
                    <td className="py-4 px-6">{show.title}</td>
                    <td className="py-4 px-6">{show.channel}</td>
                    <td className="py-4 px-6">
                      {new Date(show.datetime).toLocaleString('fr-FR')}
                    </td>
                    <td className="py-4 px-6">{show.genre}</td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditShow(show)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5 text-purple-500" />
                        </button>
                        <button
                          onClick={() => handleDeleteShow(show.id)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}