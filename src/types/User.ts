interface User {
 id: string;
  nom: string;
  email: string;
  password: string;
  prenom?: string;
  avatar?: any;
  birthDate?: string;
  adress?: string;
  sexe?: string;
  phoneNumber?: string;
  dateInscription: string; // ou Date si vous préférez travailler avec des objets Date
  // Ajoutez d'autres propriétés selon vos besoins
}