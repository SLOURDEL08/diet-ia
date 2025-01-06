import React from 'react';
import { CalendarDays, Target, Scale, Timer, Award } from 'lucide-react';
import Layout from '@/components/Layout';
import WeightProgress from '@/components/WeightProgress';

const MonObjectif = () => {
  return (
    <Layout>
         <div className="flex gap-10 min-h-screen">
      <div className="flex-1 space-y-6">
        <div className="bg-white rounded-2xl ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Mon objectif</h2>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all">
                <CalendarDays className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-[#ff5e5b] text-white rounded-lg hover:bg-[#ff4b48] transition-all">
                Modifier mon objectif
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-center bg-gray-100 p-6 rounded-xl">
              <div className="bg-white p-3 rounded-xl">
                <Award className="w-10 h-10 text-[#ff5e5b]" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Prise de masse</h3>
                <p className="text-gray-600">Objectif en cours depuis le 09/04/2024</p>
              </div>
              </div>
              <div>
                    <WeightProgress />
              </div>
          

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-100 p-6 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Poids de départ</p>
                <p className="text-3xl font-bold">75 kg</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Poids actuel</p>
                <p className="text-3xl font-bold">73 kg</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Objectif</p>
                <p className="text-3xl font-bold">80 kg</p>
              </div>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-xl">
              <div className="flex justify-between mb-2">
                <h3 className="font-bold">Progression</h3>
                <span className="text-[#ff5e5b] font-bold">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#ff5e5b] h-2.5 rounded-full w-[30%]"></div>
              </div>
            </div>

            <div className="border rounded-xl p-6">
              <h3 className="font-bold mb-4">Programme recommandé</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <span className="block text-lg mb-1">🏋️‍♂️ Musculation</span>
                  <span className="text-sm text-gray-600">4 séances / semaine</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <span className="block text-lg mb-1">🥑 Nutrition</span>
                  <span className="text-sm text-gray-600">2800 kcal / jour</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[400px]">
        <div className="bg-white rounded-2xl sticky top-0">
          <div className="bg-gradient-to-r from-[#ff5e5b] to-[#ff8b89] rounded-xl p-6 text-white mb-6">
            <div className="w-20 h-20 bg-white rounded-full mb-4"></div>
            <div>
              <h3 className="font-bold text-lg">LOURDEL Sébastien</h3>
              <p className="text-sm opacity-90">Membre depuis le 09/04/2024</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="w-5 h-5 text-[#ff5e5b]" />
                <span className="font-semibold">Temps restant</span>
              </div>
              <p className="text-2xl font-bold">4 mois</p>
            </div>

            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="w-5 h-5 text-[#ff5e5b]" />
                <span className="font-semibold">Progrès</span>
              </div>
              <p className="text-2xl font-bold">-2kg</p>
            </div>

            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-[#ff5e5b]" />
                <span className="font-semibold">Objectif quotidien</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">2800</p>
                <span className="text-gray-600">kcal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
 
  );
};

export default MonObjectif;