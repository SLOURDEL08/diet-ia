import { NextResponse } from 'next/server';
import { verifyToken, createToken } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Token non fourni' }, { status: 401 });
  }

  try {
    const decodedToken = verifyToken(token);
    const { userId } = decodedToken;

    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection('utilisateurs').findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const newToken = createToken({ userId: user._id.toString() });

    return NextResponse.json({
      token: newToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        nom: user.nom,
        dateInscription: user.dateInscription // Ajoutez cette ligne
      }
    });
  } catch (error) {
    console.error('Erreur lors du rafraîchissement du token:', error);
    return NextResponse.json({ message: 'Erreur lors du rafraîchissement du token' }, { status: 401 });
  }
}