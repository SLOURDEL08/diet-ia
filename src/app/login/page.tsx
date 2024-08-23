'use client';

import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const router = useRouter();

  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard'); // Redirige vers le tableau de bord si l'utilisateur est déjà connecté
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.token, data.utilisateur);
        router.push('/dashboard');
      } else {
        const error = await res.json();
        setErreur(error.message);
      }
    } catch (error) {
      setErreur('Une erreur est survenue lors de la connexion');
    }
  };

  if (isAuthenticated) {
    return null; // Empêche le rendu du formulaire de connexion si l'utilisateur est connecté
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mt-10">Connexion</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
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
          Se connecter
        </button>
      </form>
    </Layout>
  );
};

export default Login;