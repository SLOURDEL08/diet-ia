import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken, hashPassword } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Non autorisé' }, { status: 401 });
    }

    const decodedToken = verifyToken(token);
    const { userId } = decodedToken;

    const updateData = await request.json();

    const client = await clientPromise;
    const db = client.db();

    const updateFields: any = {};
    
    if (updateData.nom) updateFields.nom = updateData.nom;
    if (updateData.email) updateFields.email = updateData.email;
    if (updateData.motDePasse) updateFields.motDePasse = await hashPassword(updateData.motDePasse);
    if (updateData.prenom) updateFields.prenom = updateData.prenom;
    if (updateData.avatar) updateFields.avatar = updateData.avatar;
    if (updateData.birthDate) updateFields.birthDate = updateData.birthDate;
    if (updateData.adress) updateFields.adress = updateData.adress;
    if (updateData.sexe) updateFields.sexe = updateData.sexe;
    if (updateData.phoneNumber) updateFields.phoneNumber = updateData.phoneNumber;

    const result = await db.collection('utilisateurs').findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const updatedUser = {
      id: result._id.toString(),
      nom: result.nom,
      email: result.email,
      prenom: result.prenom,
      avatar: result.avatar,
      birthDate: result.birthDate,
      adress: result.adress,
      sexe: result.sexe,
      phoneNumber: result.phoneNumber,
      dateInscription:result.dateInscription
    };

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return NextResponse.json({ message: 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}