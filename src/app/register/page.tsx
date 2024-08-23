'use client';

import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

const Register: NextPage = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, motDePasse }),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const error = await res.json();
        setErreur(error.message);
      }
    } catch (error) {
      setErreur('Une erreur est survenue lors de l\'inscription');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mt-10">Inscription</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        {erreur && <p className="text-red-500 mb-4">{erreur}</p>}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Sinscrire
        </button>
      </form>
    </Layout>
  );
};

export default Register;