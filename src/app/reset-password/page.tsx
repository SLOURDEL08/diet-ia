'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Une erreur est survenue');
    }
  };

  return (
    <Layout>
      <h1>Réinitialiser le mot de passe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nouveau mot de passe"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmer le mot de passe"
          required
        />
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
      {message && <p>{message}</p>}
    </Layout>
  );
}