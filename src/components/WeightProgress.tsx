'use client'
import React, { useState } from 'react';

interface DataPoint {
  date: string;
  poids: number;
  calories: number;
  proteines: string;
}

const WeightProgress = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  
  const data: DataPoint[] = [
    { date: '09/04/2024', poids: 75, calories: 2800, proteines: "180g" },
    { date: '16/04/2024', poids: 74.5, calories: 2750, proteines: "175g" },
    { date: '23/04/2024', poids: 73.8, calories: 2700, proteines: "170g" },
    { date: '30/04/2024', poids: 73.2, calories: 2850, proteines: "185g" },
    { date: '07/05/2024', poids: 73, calories: 2900, proteines: "190g" },
  ];

  const poids = data.map(d => d.poids);
  const minPoids = Math.floor(Math.min(...poids));
  const maxPoids = Math.ceil(Math.max(...poids));

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-gray-800">Évolution du poids</h3>
        <div className="flex gap-2">
          <select className="px-3 py-2 text-sm bg-gray-100 rounded-lg">
            <option>7 derniers jours</option>
            <option>30 derniers jours</option>
            <option>3 derniers mois</option>
          </select>
        </div>
      </div>

      <div className="w-full h-80 flex flex-col">
        <div className="flex-1 flex">
          <div className="w-24 flex flex-col justify-between text-sm text-gray-400 pr-4 border-r border-gray-100">
            {data.map(point => (
              <span key={point.date} className="font-medium">{point.date}</span>
            ))}
          </div>
          
          <div className="flex-1 relative mx-6">
            <svg className="absolute inset-0 w-full h-full">
              {/* Grille horizontale */}
              {[...Array(5)].map((_, i) => (
                <line
                  key={`grid-${i}`}
                  x1="0"
                  y1={`${i * 25}%`}
                  x2="100%"
                  y2={`${i * 25}%`}
                  stroke="#f5f5f5"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}
              
              {/* Zone colorée sous la courbe */}
              <path
                d={`
                  M ${(0 / (data.length - 1)) * 100}% ${100 - ((data[0].poids - minPoids) / (maxPoids - minPoids)) * 100}%
                  ${data.map((point, index) => {
                    const x = (index / (data.length - 1)) * 100;
                    const y = 100 - ((point.poids - minPoids) / (maxPoids - minPoids)) * 100;
                    return `L ${x}% ${y}%`;
                  }).join(' ')}
                  L ${100}% 100%
                  L 0% 100%
                  Z
                `}
                fill="url(#gradient)"
                opacity="0.1"
              />
              
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff5e5b" />
                  <stop offset="100%" stopColor="#ff5e5b" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Ligne principale */}
              {data.map((point, index) => {
                const y = 100 - ((point.poids - minPoids) / (maxPoids - minPoids)) * 100;
                const x = (index / (data.length - 1)) * 100;
                return (
                  <g key={point.date} className="opacity-0 animate-[fadeIn_1s_ease-in_forwards]" 
                     style={{ animationDelay: `${index * 0.2}s` }}>
                    {index > 0 && (
                      <line
                        x1={`${(index - 1) / (data.length - 1) * 100}%`}
                        y1={`${100 - ((data[index - 1].poids - minPoids) / (maxPoids - minPoids)) * 100}%`}
                        x2={`${x}%`}
                        y2={`${y}%`}
                        stroke="#ff5e5b"
                        strokeWidth="2.5"
                      />
                    )}
                    <g 
                      onMouseEnter={() => setHoveredPoint(index)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      className="transform transition-transform duration-200 hover:scale-110"
                    >
                      {/* Point externe */}
                      <circle
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="8"
                        fill="white"
                        stroke="#ff5e5b"
                        strokeWidth="2"
                        className="cursor-pointer"
                      />
                      
                      {/* Point interne */}
                      <circle
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="4"
                        fill="#ff5e5b"
                        className="cursor-pointer"
                      />
                      
                      {hoveredPoint === index && (
                        <g className="drop-shadow-lg">
                          <rect
                            x={`${x}%`}
                            y={`${y}%`}
                            width="140"
                            height="90"
                            transform="translate(-70, -110)"
                            fill="white"
                            stroke="#ff5e5b"
                            strokeWidth="1.5"
                            rx="6"
                          />
                          <text x={`${x}%`} y={`${y}%`} transform="translate(-60, -85)" 
                                fill="#374151" fontSize="12" fontWeight="500">
                            <tspan x={`${x}%`} dy="0" fill="#6B7280">Date</tspan>
                            <tspan x={`${x}%`} dy="12" className="font-medium">{point.date}</tspan>
                            <tspan x={`${x}%`} dy="20" fill="#6B7280">Poids</tspan>
                            <tspan x={`${x}%`} dy="12">{point.poids} kg</tspan>
                          </text>
                        </g>
                      )}
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
        
        {/* Axe des poids */}
        <div className="h-8 flex justify-between px-24 text-sm font-medium text-gray-500 border-t border-gray-100 pt-4">
          {poids.map((weight, i) => (
            <span key={i}>{weight} kg</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeightProgress;