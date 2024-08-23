import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyPassword, createToken } from '@/lib/auth';

export async function POST(request: Request) {
  const { email, motDePasse } = await request.json();

  if (!email || !motDePasse) {
    return NextResponse.json({ message: 'Email et mot de passe requis' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const utilisateur = await db.collection('utilisateurs').findOne({ email });

    if (!utilisateur) {
      return NextResponse.json({ message: 'Email ou mot de passe incorrect' }, { status: 401 });
    }

    const motDePasseValide = await verifyPassword(motDePasse, utilisateur.motDePasse);

    if (!motDePasseValide) {
      return NextResponse.json({ message: 'Email ou mot de passe incorrect' }, { status: 401 });
    }

    const token = createToken({ userId: utilisateur._id, email: utilisateur.email });

    return NextResponse.json({ token, utilisateur: { id: utilisateur._id, email: utilisateur.email, nom: utilisateur.nom } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de la connexion' }, { status: 500 });
  }
}