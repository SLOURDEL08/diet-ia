import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection('utilisateurs').findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: 'Le token est invalide ou a expiré' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    await db.collection('utilisateurs').updateOne(
      { _id: user._id },
      {
        $set: { motDePasse: hashedPassword },
        $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 },
      }
    );

    return NextResponse.json({ message: 'Votre mot de passe a été réinitialisé avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    return NextResponse.json({ message: 'Une erreur est survenue' }, { status: 500 });
  }
}