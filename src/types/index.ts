import { ObjectId } from 'mongodb';

export interface UtilisateurInscription {
  nom: string;
  email: string;
  password: string;
  dateInscription: string;
}

export interface UserComplet extends UtilisateurInscription {
  id: string;
  prenom?: string;
  avatar?: any;
  birthDate?: string;
  adress?: string;
  sexe?: string;
  phoneNumber?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: UserComplet | null;
  login: (token: string, user: UserComplet) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserComplet>) => void;
  refreshToken: () => Promise<void>;
  loading: boolean;
  favorites: string[];
  addFavorite: (recipeId: string) => Promise<void>;
  removeFavorite: (recipeId: string) => Promise<void>;
}

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  preparationTime: number;
  difficulty: string;
  rating: number;
  image: string;
  tags: string[];
  ingredients: string[];
}