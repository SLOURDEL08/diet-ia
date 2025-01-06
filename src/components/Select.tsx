import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = () => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative fontSyneMedium group w-[250px]" ref={selectRef}>
      <div
        className="bg-gray-200/80 hover:bg-[#ff5e5b] px-3 border rounded-md p-2 flex items-center justify-between text-gray-500 hover:text-white hover:border-[#ff5e5b] cursor-pointer transition-colors"
        onClick={toggleSelect}
      >
        <span className="">Sélectionnez une option</span>
              <ChevronDown 
                  strokeWidth='2.5px'
          className={`w-5 h-5 text-gray-500  group-hover:text-[#ff5e5b] bg-white group-hover:bg-white rounded-md transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="p-2 hover:bg-gray-100 cursor-pointer transition-colors">Option 1</div>
          <div className="p-2 hover:bg-gray-100 cursor-pointer transition-colors">Option 2</div>
          <div className="p-2 hover:bg-gray-100 cursor-pointer transition-colors">Option 3</div>
        </div>
      )}
    </div>
  );
};

export default Select;