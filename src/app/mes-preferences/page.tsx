'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { Clock, Dumbbell, UtensilsCrossed, CalendarDays, Ban, Heart } from 'lucide-react';
import { AccountIcon } from '../ux/IconApp';

const PreferencesPage = () => {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const sports = ['Musculation', 'Cardio', 'Yoga', 'CrossFit', 'Running', 'Natation'];
  const meals = ['Italien', 'Japonais', 'Healthy', 'Végétarien', 'Méditerranéen', 'Américain'];

  const toggleSelection = (item: string, current: string[], setter: (items: string[]) => void) => {
    if (current.includes(item)) {
      setter(current.filter(i => i !== item));
    } else {
      setter([...current, item]);
    }
  };

  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto space-y-6">
     {/* Header */}
<div className="bg-white rounded-2xl space-y-6  border-gray-200 overflow-hidden">
  {/* Banner gradient */}
  <div className=" border rounded-2xl px-8 py-6 text-white">
            <div className="flex justify-between items-start">
              <div className='flex gap-8'>
                              <AccountIcon className='text-white   !w-16 !h-16 p-4 bg-red-400 rounded-2xl'/> 

                 <div className="space-y-2">
        <h1 className="text-3xl text-black font-bold">Mes préférences</h1>
        <p className="text-black/50">Personnalisez votre expérience pour des recommandations sur mesure</p>
      </div>
              </div>
     
      <div className="flex items-center gap-3 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-xl">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm text-black">Préférences synchronisées</span>
      </div>
    </div>
  </div>
  
  {/* Quick stats */}
  <div className="px-8 border rounded-2xl py-6 bg-gray-100 grid grid-cols-3 gap-8">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-xl shadow-sm">
        <Image
          src="/strong.png"
          alt="Sports"
          width={24}
          height={24}
        />
      </div>
      <div>
        <p className="text-sm text-gray-600">Sports favoris</p>
        <p className="font-bold text-lg">3 sélectionnés</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-xl shadow-sm">
        <Image
          src="/heart.png"
          alt="Ingredients"
          width={24}
          height={24}
        />
      </div>
      <div>
        <p className="text-sm text-gray-600">Ingrédients favoris</p>
        <p className="font-bold text-lg">12 ajoutés</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-xl shadow-sm">
        <Image
          src="/clock.png"
          alt="Disponibilités"
          width={24}
          height={24}
        />
      </div>
      <div>
        <p className="text-sm text-gray-600">Jours disponibles</p>
        <p className="font-bold text-lg">4 jours/sem.</p>
      </div>
    </div>
  </div>
</div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Sports Préférés */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Dumbbell className="w-5 h-5 text-[#ff5e5b]" />
                <h2 className="text-xl font-bold">Sports préférés</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {sports.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => toggleSelection(sport, selectedSports, setSelectedSports)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedSports.includes(sport)
                        ? 'bg-[#ff5e5b] text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>

            {/* Disponibilités */}
            <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <CalendarDays className="w-5 h-5 text-[#ff5e5b]" />
                <h2 className="text-xl font-bold">Disponibilités</h2>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleSelection(day, selectedDays, setSelectedDays)}
                    className={`p-3 rounded-xl text-center text-sm transition-all ${
                      selectedDays.includes(day)
                        ? 'bg-[#ff5e5b] text-white'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Google Calendar */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-[#ff5e5b]" />
                <h2 className="text-xl font-bold">Synchronisation agenda</h2>
              </div>
              <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image src="/google-calendar.png" alt="Google Calendar" width={32} height={32} />
                  <div>
                    <p className="font-medium">Google Calendar</p>
                    <p className="text-sm text-gray-600">Synchronisez vos séances avec votre agenda</p>
                  </div>
                </div>
                <button className="bg-white px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Connecter
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Cuisine Préférée */}
            <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-5 h-5 text-[#ff5e5b]" />
                <h2 className="text-xl font-bold">Cuisine préférée</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {meals.map((meal) => (
                  <button
                    key={meal}
                    onClick={() => toggleSelection(meal, selectedMeals, setSelectedMeals)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedMeals.includes(meal)
                        ? 'bg-[#ff5e5b] text-white'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {meal}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingrédients */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <UtensilsCrossed className="w-5 h-5 text-[#ff5e5b]" />
                <h2 className="text-xl font-bold">Ingrédients préférés</h2>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ajouter un ingrédient..."
                  className="w-full p-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff5e5b]"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Poulet', 'Riz', 'Avocat'].map((ingredient) => (
                  <span key={ingredient} className="bg-gray-100 px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
                    {ingredient}
                    <button className="hover:text-[#ff5e5b]">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Ingrédients à bannir */}
            <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Ban className="w-5 h-5 text-[#ff5e5b]" />
                <h2 className="text-xl font-bold">Ingrédients à éviter</h2>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ajouter un ingrédient à bannir..."
                  className="w-full p-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff5e5b]"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Fruits de mer', 'Arachides'].map((ingredient) => (
                  <span key={ingredient} className="bg-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
                    {ingredient}
                    <button className="hover:text-[#ff5e5b]">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-[#ff5e5b] text-white px-6 py-3 rounded-xl hover:bg-[#ff4b48] transition-colors">
            Enregistrer mes préférences
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PreferencesPage;