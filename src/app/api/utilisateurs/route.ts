import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

import { hashPassword } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nom, email, motDePasse, prenom, avatar, birthDate, adress, sexe, phoneNumber } = req.body;

    if (!nom || !email || !motDePasse) {
      return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis' });
    }

    try {
      const client = await clientPromise;
      const db = client.db();

      const existingUser = await db.collection('utilisateurs').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }

      const hashedPassword = await hashPassword(motDePasse);
      const result = await db.collection('utilisateurs').insertOne({
        nom,
        email,
        motDePasse: hashedPassword,
        prenom,
        avatar,
        birthDate,
        adress,
        sexe,
        phoneNumber,
        dateInscription: new Date(),
      });

      res.status(201).json({ message: 'Utilisateur créé avec succès', userId: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}