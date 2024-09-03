import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { sendEmail } from '@/lib/emailService';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection('utilisateurs').findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Si cet email existe, un lien de réinitialisation a été envoyé.' }, { status: 200 });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpires = Date.now() + 3600000; // 1 hour

    await db.collection('utilisateurs').updateOne(
      { _id: user._id },
      { $set: { resetPasswordToken: resetToken, resetPasswordExpires: resetTokenExpires } }
    );

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    await sendEmail(
      email,
      'Réinitialisation de votre mot de passe',
      `Cliquez sur ce lien pour réinitialiser votre mot de passe: <a href="${resetUrl}">${resetUrl}</a>`
    );

    return NextResponse.json({ message: 'Si cet email existe, un lien de réinitialisation a été envoyé.' }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation du mot de passe:', error);
    return NextResponse.json({ message: 'Une erreur est survenue' }, { status: 500 });
  }
}