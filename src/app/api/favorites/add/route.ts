import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'Non autorisé' }, { status: 401 });
    }

    const decodedToken = verifyToken(token);
    const { userId } = decodedToken;

    const { recipeId } = await request.json();

    const db = await connectToDatabase();
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { favorites: recipeId } }
    );

    return NextResponse.json({ message: 'Favori ajouté avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du favori:', error);
    return NextResponse.json({ message: 'Erreur lors de l\'ajout du favori' }, { status: 500 });
  }
}