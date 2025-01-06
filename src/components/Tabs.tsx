import Image from 'next/image';
import React, { useState } from 'react';

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { 
      title: "Départ", 
      content: (
        <div className='flex flex-col gap-2'>
          <p className="fontSyneBold">Votre point de départ</p>
          <p className='text-sm mb-1'>Ici, vous pouvez décrire votre situation initiale.</p>
              <div className='flex items-center text-sm justify-start gap-2 text-black/60 flex-wrap'>
                  <div className='h-10 bg-gray-100 transition-all duration-200 cursor-pointer hover:bg-gray-200 hover:text-black w-auto px-2.5 rounded-lg flex justify-center items-center'>
                      <span>89,9<b> kg</b></span>
                  </div>
                  <div className='h-10 bg-gray-100 transition-all duration-200 cursor-pointer hover:bg-gray-200 hover:text-black w-auto px-2.5 rounded-lg flex justify-center items-center'>
                      <span>1M89cm</span>
                  </div>
                  <div className='h-10 bg-gray-100  transition-all duration-200 cursor-pointer hover:bg-gray-200 hover:text-black w-auto px-2.5 rounded-lg flex justify-center items-center'>
                      <span>21 ans</span>
                  </div>
                  <div className='h-10 bg-gray-100  transition-all duration-200 cursor-pointer hover:bg-gray-200 hover:text-black w-auto px-2.5 rounded-lg flex justify-center items-center'>
                      <span>89,9<b>kg</b></span>
                  </div> 
                  <div className='h-10 bg-gray-100  transition-all duration-200 cursor-pointer hover:bg-gray-200 hover:text-black w-auto px-2.5 rounded-lg flex justify-center items-center'>
                      <span>89,9<b>kg</b></span>
                  </div>
                  <div className='h-10 bg-gray-100  transition-all duration-200 cursor-pointer hover:bg-gray-200 hover:text-black w-auto px-2.5 rounded-lg flex justify-center items-center'>
                      <span>89,9<b>kg</b></span>
                  </div>

          </div>
        </div>
      )
    },
    { 
      title: "Évolution", 
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2">Votre progression</h3>
          <ul className="list-disc list-inside">
            <li>Étape 1 : ...</li>
            <li>Étape 2 : ...</li>
            <li>Étape 3 : ...</li>
          </ul>
          <div className="mt-2 bg-gray-100 p-2 rounded">
            <p className="italic">"Citation inspirante sur l'évolution"</p>
          </div>
        </div>
      )
    },
    { 
      title: "Objectif", 
      content: (
        <div>
          <h3 className="text-lg font-bold mb-2">Votre objectif final</h3>
          <p>Décrivez ici votre objectif ultime.</p>
          <div className="flex items-center mt-2">
            <div className="w-1/2 bg-green-200 p-2 rounded mr-2">
              <p className="font-semibold">Bénéfices attendus :</p>
              <p>Liste des avantages...</p>
            </div>
            <div className="w-1/2 bg-blue-200 p-2 rounded">
              <p className="font-semibold">Actions à entreprendre :</p>
              <p>Liste des actions...</p>
            </div>
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="w-full h-full flex flex-col border bg-gray-200/80 rounded-xl">
      <div className="flex gap-4 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 border py-1.5 gap-1 text-center fontSyneMedium text-[14px]  font-semibold ${
              activeTab === index
                ? 'gradiend-app border  border-[#ff5e5b] transition-all duration-200 text-white rounded-lg'
                : 'border border-white bg-white text-black/60 transition-all duration-200 hover:border-[#ff5e5b] hover:bg-[#ff5e5b] rounded-lg hover:text-white'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-lg flex-grow flex flex-col overflow-hidden">
        <div className="p-5 flex-grow border rounded-lg overflow-y-auto">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;