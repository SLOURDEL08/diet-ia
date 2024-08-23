'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';

const MonCompte = () => {
  const { user, updateUser } = useAuth();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setNom(user.nom);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async () => {
    const updateData = { nom, email, motDePasse };

    try {
      const response = await fetch('/api/utilisateurs/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(updatedUser);
        setMessage('Informations mises à jour avec succès');
        setMotDePasse(''); // Réinitialiser le mot de passe après mise à jour
      } else {
        setMessage('Erreur lors de la mise à jour');
      }
    } catch (error) {
      setMessage('Erreur lors de la mise à jour');
    }
  };

  if (!user) return <div>Chargement...</div>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mt-10">Mon Compte</h1>
      <div className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label className="block mb-2">Nom:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Nouveau mot de passe:</label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button onClick={handleUpdate} className="mt-2 p-2 bg-blue-500 text-white rounded">
          Mettre à jour
        </button>
        {message && <p className="text-green-500">{message}</p>}
      </div>
    </Layout>
  );
};

export default MonCompte;