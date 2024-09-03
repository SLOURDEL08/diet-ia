import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyPassword, createToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, motDePasse } = await request.json();

    if (!email || !motDePasse) {
      return NextResponse.json({ message: 'Email et mot de passe requis' }, { status: 400 });
    }

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

    const token = createToken({ userId: utilisateur._id.toString(), email: utilisateur.email });

    return NextResponse.json({
      token,
      utilisateur: {
         id: utilisateur._id.toString(),
        email: utilisateur.email,
    nom: utilisateur.nom,
    prenom: utilisateur.prenom,            // Ajout du prénom
    avatar: utilisateur.avatar,            // Ajout de l'avatar
    birthDate: utilisateur.birthDate,      // Ajout de la date de naissance
    adress: utilisateur.adress,            // Ajout de l'adresse
    sexe: utilisateur.sexe,                // Ajout du sexe
    phoneNumber: utilisateur.phoneNumber,  // Ajout du numéro de téléphone
    dateInscription: utilisateur.dateInscription
        

      }
    }, { status: 200 });
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
  }
}