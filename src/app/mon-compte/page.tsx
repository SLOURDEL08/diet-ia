'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import AvatarUpload from '@/components/AvatarUpload';
import { AccountIcon, CheckIcon, DownloadAvatarIcon, EmailIcon, HeightIcon, UploadAvatarIcon, WeightIcon } from '../ux/IconApp';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';

// Définition de l'interface User ici au lieu de l'importer
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
  dateInscription: string;
}

const MonCompte = () => {
  const router = useRouter();
  const { user, updateUser, logout, refreshToken } = useAuth();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [prenom, setPrenom] = useState('');
  const [avatar, setAvatar] = useState('/default-avatar.jpg');
  const [birthDate, setBirthDate] = useState('');
  const [adress, setAdress] = useState('');
  const [sexe, setSexe] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');

   useEffect(() => {
    if (user?.password) {
      setCurrentPassword('*'.repeat(user.password.length));
    }
  }, [user]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotDePasse(e.target.value);
    setIsEditingPassword(true);
  };

  useEffect(() => {
    if (user) {
      setNom(user.nom || '');
      setEmail(user.email || '');
      setPrenom(user.prenom || '');
      setAvatar(user.avatar || '/default-avatar.jpg');
      setBirthDate(user.birthDate || '');
      setAdress(user.adress || '');
      setSexe(user.sexe || '');
      setPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);

const handleUpdate = async () => {
  setIsLoading(true);
  setMessage('');
  
  const updateData: Partial<User> = {};
  if (nom !== user?.nom) updateData.nom = nom;
  if (email !== user?.email) updateData.email = email;
  if (isEditingPassword && motDePasse) updateData.password = motDePasse;
  if (prenom !== user?.prenom) updateData.prenom = prenom;
  if (avatar !== user?.avatar) updateData.avatar = avatar;
  if (birthDate !== user?.birthDate) updateData.birthDate = birthDate;
  if (adress !== user?.adress) updateData.adress = adress;
  if (sexe !== user?.sexe) updateData.sexe = sexe;
  if (phoneNumber !== user?.phoneNumber) updateData.phoneNumber = phoneNumber;

  if (Object.keys(updateData).length === 0) {
    setMessage('Aucune modification détectée');
    setIsLoading(false);
    return;
  }

  try {
    await refreshToken();
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Pas de token trouvé après rafraîchissement');
    }

    const response = await fetch('/api/utilisateurs/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      updateUser(updatedUser);
      setMessage('Informations mises à jour avec succès');
      setAvatar(`${updatedUser.avatar}?v=${Date.now()}`);
      setMotDePasse('');
      setIsEditingPassword(false);
      if (updatedUser.password) {
        setCurrentPassword('*'.repeat(updatedUser.password.length));
      }
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la mise à jour');
    }
  } catch (error: unknown) {
    console.error('Erreur lors de la mise à jour:', error);
    if (error instanceof Error) {
      setMessage(`Erreur lors de la mise à jour: ${error.message}`);
    } else {
      setMessage('Une erreur inattendue s\'est produite');
    }
  } finally {
    setIsLoading(false);
  }
};

  if (!user) return <LoadingScreen />;

  const dateInscriptionFormatted = user?.dateInscription 
    ? format(new Date(user.dateInscription), "dd MMMM yyyy", { locale: fr })
    : 'Date inconnue';

  return (
    <Layout className='text-left p-0 '>
      <div className='bg-gray-100 rounded-3xl space-y-4 p-10'>
        <div className='flex gap-10 flex-row-reverse items-start justify-between '>

          <AvatarUpload className='min-w-40' currentAvatar={avatar} onAvatarChange={setAvatar}/>
          <div className=' flex flex-col gap-10'>
            <div className='flex items-center gap-4'>
                          <AccountIcon className='w-7 h-7'/>
  <h2 className='fontSyneBold text-3xl'>Mon compte</h2>
            </div>

          <div className='gap-8 gap-y-6 flex justify-start items-start flex-wrap font-  text-lg'>
            
              <div className='flex items-center gap-3'>
                      

        <div className='p-1.5  bg-[#fff] text-[#ff5e5b] rounded-full'>
          <AccountIcon />
        </div>
        <span>{nom} {prenom}</span>
      </div>
      <div className='flex items-center  gap-3'>
        <div className='p-1.5  bg-[#fff] text-[#ff5e5b] rounded-full'>
          <EmailIcon />
        </div>
        <span>{email}</span>
      </div>
      <div className='flex items-center gap-3'>
        <div className='p-1.5  bg-[#fff] text-[#ff5e5b]  rounded-full'>
          <CheckIcon />
        </div>
        <span>Inscrit depuis le {dateInscriptionFormatted}</span>
            </div>
            <div className='flex items-center gap-3'>
        <div className='p-1.5  bg-[#fff] text-[#ff5e5b] rounded-full'>
          <WeightIcon />
        </div>
                <span>{"1ère pesée :"}<b className=''> 89kg</b></span>
            </div>
            <div className='flex items-center gap-3'>
        <div className='p-1.5 bg-[#fff] text-[#ff5e5b] rounded-full'>
          <HeightIcon />
        </div>
        <span>Taille : <b className=''> 1m79cm</b></span>
      </div>
            </div>
            <div className='flex gap-10 items-center justify-start'>
          <div className='p-4 graydiended px-4 w-60 group flex gap-4 items-center cursor-pointer bg-white border border-gray-100 rounded-2xl relative group  overflow-hidden'>
                        <Image src="/heartapple.png" alt='image santé' width={35} height={35} className='group-hover:scale-110 transition ' />
                <span className='fontSyneRegular text-black text-base leading-5 group-hover:underline underline-offset-4'>Lié votre compte à Apple Santé</span>
              </div>
              <div className='p-4 px-6  cursor-pointer bg-black/80 rounded-2xl relative  overflow-hidden'>
            <span className='fontSyneMedium text-white text-xl hover:underline underline-offset-4  mr-12'>Lié votre compte à Apple Santé</span>
            <Image src="/heartapple.png" alt='image santé' width={60} height={60} className='absolute -right-2 top-4 rotate-12' />
          </div>
      </div>
          </div>
          
      </div>
       
      </div>
      <div className='py-4 text-left'>


      

      <div className="w-full flex flex-wrap gap-10 gap-y-4">
      {/* Champ Nom */}
<div className="mb-4 flex items-center">
  <label className="p-3 px-4 h-12 border border-r-0 fontSyneRegular rounded-l-xl bg-gray-100/50">Nom :</label>
  <input
    type="text"
    value={nom}
    onChange={(e) => setNom(e.target.value)}
    className="font-light p-3 h-12 px-4 border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

{/* Champ Prénom */}
<div className="mb-4 flex items-center">
  <label className="p-3 h-12 px-4 border border-r-0 fontSyneRegular rounded-l-xl bg-gray-100/50">Prénom :</label>
  <input
    type="text"
    value={prenom}
    onChange={(e) => setPrenom(e.target.value)}
    className="font-light h-12 p-3 px-4 border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

{/* Champ Adresse E-mail */}
<div className="mb-4  flex items-center">
  <label className="p-3 h-12 px-4 border border-r-0 fontSyneRegular rounded-l-xl bg-gray-100/50">Adresse E-mail :</label>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="font-light h-12 p-3 px-4 border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

{/* Champ Nouveau mot de passe */}
<div className="mb-4 flex items-center">
      <label className="p-3 h-12 px-4 border border-r-0 w-full fontSyneRegular rounded-l-xl bg-gray-100/50">
        {isEditingPassword ? "Mot de passe :" : "Mot de passe :"}
      </label>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          value={isEditingPassword ? motDePasse : currentPassword}
          onChange={handlePasswordChange}
          className="w-full h-12 font-light p-3 px-4 border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={isEditingPassword ? "Entrez un nouveau mot de passe" : ""}
          readOnly={!isEditingPassword}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
    </div>

{/* Champ Date de Naissance */}
<div className="mb-4 flex items-center">
  <label className="p-3 h-12 px-4 border border-r-0 fontSyneRegular rounded-l-xl bg-gray-100/50 flex items-center">
    Date de Naissance :
  </label>
  <input
    type="date"
    value={birthDate}
    onChange={(e) => setBirthDate(e.target.value)}
    className="font-light h-12 p-3 px-4 border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
  />
</div>

{/* Champ Adresse */}
<div className="mb-4 flex  items-center">
  <label className="p-3 px-4 h-12 border border-r-0 fontSyneRegular  rounded-l-xl bg-gray-100/50">Adresse :</label>
  <input
    type="text"
    value={adress}
    onChange={(e) => setAdress(e.target.value)}
    className="font-light h-12 p-3 px-4 border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

{/* Champ Sexe */}
<div className="mb-4 flex items-center">
  <label className="p-3 h-12 px-4 border border-r-0 fontSyneRegular rounded-l-xl bg-gray-100/50">Sexe :</label>
  <select
    value={sexe}
    onChange={(e) => setSexe(e.target.value)}
    className="font-light h-12 p-3 px-4 border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option className='' value="">Sélectionnez</option>
    <option value="homme">Homme</option>
    <option value="femme">Femme</option>
    <option value="autre">Autre</option>
  </select>
</div>

{/* Champ Numéro de Téléphone */}
<div className="mb-4 flex items-center">
  <label className="p-3 px-4 border border-r-0 fontSyneRegular  rounded-l-xl bg-gray-100/50">Numéro de Téléphone :</label>
  <input
    type="tel"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    className="font-light p-3 px-4 border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

{/* Bouton Mettre à Jour */}
<div className="">
  <button
    onClick={handleUpdate}
    className="p-3 px-4 fontSyneBold bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    disabled={isLoading}
  >
    {isLoading ? 'Mise à jour...' : 'Mettre à jour'}
  </button>
</div>
       
        
        {message && (
          <p className="text-green-500 text-center mt-4">{message}</p>
        )}
      </div>
      </div>
         
    </Layout>
  );
};

export default MonCompte;