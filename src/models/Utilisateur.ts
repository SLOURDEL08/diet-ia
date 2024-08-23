import { ObjectId } from 'mongodb';

export interface Utilisateur {
  _id?: ObjectId;
  nom: string;
  email: string;
  motDePasse: string;
  dateInscription: Date;
}