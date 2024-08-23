import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken, hashPassword } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function PUT(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Non autorisé' }, { status: 401 });
  }

  try {
    const decodedToken = verifyToken(token);
    const { userId } = decodedToken;

    const body = await request.json();
    const { nom, email, motDePasse } = body;

    const client = await clientPromise;
    const db = client.db();

    const updateData: any = {};
    if (nom) updateData.nom = nom;
    if (email) updateData.email = email;
    if (motDePasse) updateData.motDePasse = await hashPassword(motDePasse);

    const result = await db.collection('utilisateurs').findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const updatedUser = {
      id: result._id.toString(),
      nom: result.nom,
      email: result.email,
    };

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return NextResponse.json({ message: 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}