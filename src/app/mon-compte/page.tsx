'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import AvatarUpload from '@/components/AvatarUpload';
import { AccountIcon, CheckIcon, EmailIcon, HeightIcon, WeightIcon } from '../ux/IconApp';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';
import { User, Mail, Calendar, MapPin, Phone, Shield, Weight, Ruler, Activity, Apple } from 'lucide-react';

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
const [backgroundColor, setBackgroundColor] = useState('#ff5e5b');

  
  
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
    <Layout className="">
      <div className='max-w-[1400px] mx-auto'>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className='flex items-center gap-4'>
            <AccountIcon className='w-7 h-7 text-[#ff5e5b]'/>
            <h2 className='text-3xl font-bold'>Mon compte</h2>
          </div>
        </div>
{/* Profil Card */}
{/* Profil Card */}
<div className="bg-white rounded-3xl border mb-8 overflow-hidden">
 <div 
   className="h-32 relative"
   style={{ 
     backgroundImage: `linear-gradient(to right, ${backgroundColor}10, ${backgroundColor}05)` 
   }}
 >
   {/* Color Picker Section */}
   <div className="absolute top-4 right-4 flex gap-2">
     {['#ff5e5b', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'].map((color) => (
       <button
         key={color}
         onClick={() => setBackgroundColor(color)}
         className={`w-8 h-8 rounded-full border-2 border-white/50 shadow-sm hover:scale-110 transition-transform`}
         style={{ backgroundColor: color }}
       />
     ))}
     <input
       type="color"
       onChange={(e) => setBackgroundColor(e.target.value)}
       className="w-8 h-8 rounded-full border-2 border-white/50 cursor-pointer"
       title="Choisir une couleur personnalisée"
     />
   </div>
 </div>

 <div className="px-8 -mt-24 pb-8">
   <div className="flex gap-8 items-start">
     {/* Avatar Section */}
     <div className="relative">
       <AvatarUpload 
         currentAvatar={avatar} 
         onAvatarChange={setAvatar}
         width={128}
         height={128}
         upload={true}
       />
     </div>
     
     {/* Info Section */}
     <div className="flex-grow space-y-12 pt-12">
       <div className="flex items-center justify-between">
         <h1 className="text-2xl capitalize font-bold">{nom} {prenom}</h1>
         <div className="flex gap-3">
           <span className="px-4 py-1.5 bg-[#ff5e5b]/10 text-[#ff5e5b] rounded-full text-sm font-medium">
             Membre Premium
           </span>
         </div>
       </div>

       <div className="flex gap-10 text-lg">

         <div className="flex items-center gap-3">
           <div className="p-1.5 bg-white text-[#ff5e5b] rounded-full border shadow-sm">
             <EmailIcon />
           </div>
           <span className="truncate">{email}</span>
         </div>
         <div className="flex items-center gap-3">
           <div className="p-1.5 bg-white text-[#ff5e5b] rounded-full border shadow-sm">
             <CheckIcon />
           </div>
           <span>Inscrit depuis le {dateInscriptionFormatted}</span>
         </div>
       </div>

    
     </div>
   </div>
 </div>
</div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className=" bg-gray-100 p-6 rounded-2xl hover:border-[#ff5e5b] transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#ff5e5b]/10 text-[#ff5e5b] rounded-xl">
                <Weight size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Poids initial</p>
                <p className="text-xl font-semibold">89 kg</p>
              </div>
            </div>
          </div>
          <div className=" bg-gray-100 p-6 rounded-2xl hover:border-[#ff5e5b] transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#ff5e5b]/10 text-[#ff5e5b] rounded-xl">
                <Ruler size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Taille</p>
                <p className="text-xl font-semibold">179 cm</p>
              </div>
            </div>
          </div>
          <div className=" bg-gray-100 p-6 rounded-2xl hover:border-[#ff5e5b] transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#ff5e5b]/10 text-[#ff5e5b] rounded-xl">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">IMC</p>
                <p className="text-xl font-semibold">24.5</p>
              </div>
            </div>
          </div>
          <div className=" bg-gray-100 p-6 rounded-2xl hover:border-[#ff5e5b] transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#ff5e5b]/10 text-[#ff5e5b] rounded-xl">
                <Apple size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Calories/jour</p>
                <p className="text-xl font-semibold">2,400</p>
              </div>
            </div>
          </div>
        </div>

        {/* Connecter Services */}
        <div className="border bg-white rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#ff5e5b]" />
            Services connectés
          </h2>
          <div className="flex gap-6">
            <button className="flex bg-gradient-to-r from-gray-100 to-gray-100/60 items-center gap-3 px-6 py-3 border rounded-xl hover:border-[#ff5e5b] hover:bg-[#ff5e5b]/5 transition-colors">
              <Apple className="h-6 w-6" />
              <span>Connecter Apple Health</span>
            </button>
            <button className="flex bg-gradient-to-r from-gray-100 to-gray-100/60 items-center gap-3 px-6 py-3 border rounded-xl hover:border-[#ff5e5b] hover:bg-[#ff5e5b]/5 transition-colors">
              <Activity className="h-6 w-6" />
              <span>Connecter Google Fit</span>
            </button>
          </div>
        </div>

        {/* Forms Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Info Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#ff5e5b]" />
              Informations personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
              {/* Nom */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="pl-10 w-full rounded-xl border hover:border-[#ff5e5b] focus:border-[#ff5e5b] focus:ring-[#ff5e5b] transition-colors"
                  />
                </div>
              </div>

              {/* Prénom */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="pl-10 w-full rounded-xl border hover:border-[#ff5e5b] focus:border-[#ff5e5b] focus:ring-[#ff5e5b] transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full rounded-xl border hover:border-[#ff5e5b] focus:border-[#ff5e5b] focus:ring-[#ff5e5b] transition-colors"
                  />
                </div>
              </div>

              {/* Date de naissance */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="pl-10 w-full rounded-xl border hover:border-[#ff5e5b] focus:border-[#ff5e5b] focus:ring-[#ff5e5b] transition-colors"
                  />
                </div>
              </div>

              {/* Adresse */}
              <div className="md:col-span-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                    className="pl-10 w-full rounded-xl border hover:border-[#ff5e5b] focus:border-[#ff5e5b] focus:ring-[#ff5e5b] transition-colors"
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10 w-full rounded-xl border hover:border-[#ff5e5b] focus:border-[#ff5e5b] focus:ring-[#ff5e5b] transition-colors"
                  />
                </div>
              </div>

              {/* Sexe */}
              <div>
                <select
                  value={sexe}
                  onChange={(e) => setSexe(e.target.value)}
                  className="w-full rounded-xl border hover:border-[#ff5e5b] focus:border-[#ff5e5b] focus:ring-[#ff5e5b] transition-colors"
                >
                  <option value="">Sélectionnez</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Form */}
          <div className="bg-white flex flex-col justify-between rounded-2xl border p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#ff5e5b]" />
              Sécurité
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Mot de passe</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={isEditingPassword ? motDePasse : currentPassword}
                    onChange={handlePasswordChange}
                    className="pl-10 w-full rounded-xl border hover:border-[#ff5e5b] focus:border-[#ff5e5b] focus:ring-[#ff5e5b] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {message && (
                <div className={`p-4 rounded-xl border ${
                  message.includes('succès') 
                    ? 'border-green-200 bg-green-50/50 text-green-700' 
                    : 'border-red-200 bg-red-50/50 text-red-700'
                }`}>
                  {message}
                </div>
              )}

              <button
                onClick={handleUpdate}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#ff5e5b] text-white rounded-xl hover:bg-[#ff4b48] focus:ring-2 focus:ring-[#ff5e5b] focus:ring-offset-2 transition-colors"
              >
                {isLoading ? 'Mise à jour...' : 'Mettre à jour'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Delete Account */}
        <div className="mt-8 p-8 bg-white rounded-2xl border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-red-600">Supprimer mon compte</h3>
              <p className="text-gray-600 mt-1">Cette action est irréversible</p>
            </div>
            <button className="px-6 py-3 border border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition-colors">
             Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MonCompte;