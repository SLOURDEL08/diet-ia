import mongoose from 'mongoose';
import { UtilisateurInscription } from '@/types';

const UtilisateurSchema = new mongoose.Schema<UtilisateurInscription>({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateInscription: { type: String, default: () => new Date().toISOString() },
});

export default mongoose.models.Utilisateur || mongoose.model<UtilisateurInscription>('Utilisateur', UtilisateurSchema);