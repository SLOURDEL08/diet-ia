'use client';

import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token, data.utilisateur);
        router.push('/dashboard');
      } else {
        setErreur(data.message || 'Une erreur est survenue lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setErreur('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return null;
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
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        {erreur && <p className="text-red-500 mb-4">{erreur}</p>}
        <button 
          type="submit" 
          className="w-full p-2 bg-blue-500 text-white rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
      <div className="text-center mt-4">
        <Link href="/forgot-password" className="text-blue-500 hover:text-blue-600">
          Mot de passe oublié ?
        </Link>
      </div>
    </Layout>
  );
};

export default Login;