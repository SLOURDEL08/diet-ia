'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Une erreur est survenue');
    }
  };

  return (
    <Layout>
      <h1>Mot de passe oublié</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre email"
          required
        />
        <button type="submit">Envoyer le lien de réinitialisation</button>
      </form>
      {message && <p>{message}</p>}
    </Layout>
  );
}