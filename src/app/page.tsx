// pages/index.tsx
import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import VisitorLayout from '../components/VisitorLayout';
import { ArrowRight, ChefHat, Dumbbell, Calendar } from 'lucide-react';

const Home: NextPage = () => {
  return (
    <VisitorLayout>
      {/* Hero Section */}
     {/* Hero Section */}
<section className=" pl-10">
  <div className="max-w-[1440px] mx-auto">
    <div className="grid grid-cols-2 gap-16 items-center">
      <div className="space-y-8 pt-16">
        <span className="inline-block px-4 py-2 bg-[#ff5e5b]/10 text-[#ff5e5b] rounded-full text-sm font-medium">
          Nouveau : IA intégrée 🚀
        </span>
        <h1 className="text-5xl font-bold leading-tight">
          Votre coach personnel pour une alimentation{' '}
          <span className="text-[#ff5e5b] relative">
            intelligente
            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
              <path d="M0 7c20-2 40-2 60 0s40 2 60 0" stroke="#ff5e5b" strokeWidth="2" fill="none"/>
            </svg>
          </span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          DietIA vous aide à atteindre vos objectifs en vous proposant des recettes personnalisées et un suivi adapté à vos besoins.
        </p>
        <div className="flex gap-4">
          <Link
            href="/register"
            className="px-6 py-3 bg-[#ff5e5b] text-white rounded-xl hover:bg-[#ff4b48] transition-colors inline-flex items-center gap-2 shadow-lg shadow-[#ff5e5b]/20"
          >
            Commencer maintenant
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-white border border-gray-200 rounded-xl hover:border-[#ff5e5b]/20 hover:bg-[#ff5e5b]/5 transition-all"
          >
            En savoir plus
          </Link>
        </div>
        <div className="pt-4 flex items-center gap-6 text-sm text-gray-600">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-[#ff5e5b] to-[#ff8b89]"
              />
            ))}
          </div>
          <div>
            <p className="font-medium text-gray-900">+1000 utilisateurs satisfaits</p>
            <div className="flex items-center gap-1 text-[#ff5e5b]">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
              <span className="ml-1">4.9/5</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative aspect-square overflow-hidden shadow-2xl shadow-gray-200/50">
        <Image
          src="/landinghome.jpg" // Image de préparation de repas sains avec des légumes colorés
          alt="DietIA - Préparation de repas sains"
          layout="fill"
          objectFit="cover"
          priority
          className="hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent">
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#ff5e5b]/10">
                <ChefHat className="w-5 h-5 text-[#ff5e5b]" />
              </div>
              <div>
                <p className="text-sm font-medium">Recettes intelligentes</p>
                <p className="text-xs text-gray-600">Adaptées à vos objectifs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Features avec plus de #ff5e5b */}
<section className="py-16 px-6 bg-white">
  <div className="max-w-[1440px] mx-auto">
    <div className="text-center mb-16">
      <span className="inline-block px-4 py-2 bg-[#ff5e5b]/10 text-[#ff5e5b] rounded-full text-sm font-medium mb-4">
        Fonctionnalités
      </span>
      <h2 className="text-3xl font-bold mb-4">Tout ce dont vous avez besoin</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Une solution complète pour gérer votre alimentation et votre activité physique
      </p>
    </div>

    <div className="grid grid-cols-3 gap-8">
      {[
        {
          icon: ChefHat,
          title: "Recettes personnalisées",
          description: "Des recettes adaptées à vos préférences et objectifs"
        },
        {
          icon: Dumbbell,
          title: "Suivi sportif",
          description: "Programmes d'entraînement sur mesure"
        },
        {
          icon: Calendar,
          title: "Planning intelligent",
          description: "Organisation optimale de vos repas et séances"
        }
      ].map((feature, i) => (
        <div 
          key={i} 
          className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#ff5e5b]/30 hover:shadow-xl hover:shadow-[#ff5e5b]/5 transition-all"
        >
          <div className="p-3 bg-[#ff5e5b]/10 rounded-xl w-fit group-hover:bg-[#ff5e5b] transition-colors mb-4">
            <feature.icon className="w-6 h-6 text-[#ff5e5b] group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tout ce dont vous avez besoin</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une solution complète pour gérer votre alimentation et votre activité physique
            </p>
          </div>
          <div className='flex gap-10'>
             <div className="grid min-w-2/3 w-2/5 grid-cols-1 gap-8">
            {[
              {
                icon: ChefHat,
                title: "Recettes personnalisées",
                description: "Des recettes adaptées à vos préférences et objectifs"
              },
              {
                icon: Dumbbell,
                title: "Suivi sportif",
                description: "Programmes d'entraînement sur mesure"
              },
              {
                icon: Calendar,
                title: "Planning intelligent",
                description: "Organisation optimale de vos repas et séances"
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                <feature.icon className="w-10 h-10 text-[#ff5e5b] mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
            </div>
            <div className='border rounded-2xl w-3/5 h-full '>
              <Image src="/speedometer.png" alt='' className=' w-full h-full' width={100} height={100} />
            </div>
</div>
         
        </div>
      </section>

      {/* CTA Section */}
      <section className=" px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-gray-900 text-white rounded-2xl p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-50">
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#ff5e5b] rounded-full blur-3xl" />
              <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">Prêt à commencer votre transformation ?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Rejoignez DietIA aujourdhui et découvrez comment une alimentation intelligente peut changer votre vie.
              </p>
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Créer un compte gratuitement
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </VisitorLayout>
  );
};

export default Home;