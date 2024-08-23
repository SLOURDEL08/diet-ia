import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  const { nom, email, motDePasse } = await request.json();

  if (!nom || !email || !motDePasse) {
    return NextResponse.json({ message: 'Tous les champs sont requis' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const existingUser = await db.collection('utilisateurs').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Cet email est déjà utilisé' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(motDePasse);
    const result = await db.collection('utilisateurs').insertOne({
      nom,
      email,
      motDePasse: hashedPassword,
      dateInscription: new Date(),
    });

    return NextResponse.json({ message: 'Utilisateur créé avec succès', userId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de la création de l\'utilisateur' }, { status: 500 });
  }
}