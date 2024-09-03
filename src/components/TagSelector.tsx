import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface TagSelectorProps {
  tags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ tags, selectedTags, onTagsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(updatedTags);
  };

  const filteredTags = tags.filter(tag => 
    tag.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedTags.includes(tag)
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="  rounded-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-3 items-center rounded-lg ">
          {selectedTags.map(tag => (
            <div
              key={tag}
              className="bg-[#ff5e5b] text-white rounded-full px-3 py-1 text-sm flex items-center gap-2 group animate-fadeIn"
            >
              <span>{tag}</span>
              <button
                className="opacity-60 hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTag(tag);
                }}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            className="text-2xl font-semibold text-white  text-blac/80 bg-gray-300 transition-all pb-1 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70"
          >
            {isOpen ? '−' : '+'}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 w-72 mt-4 bg-white rounded-xl shadow-2xl z-30 overflow-hidden transition-all duration-300 ease-in-out animate-slideDown">
          <div className="p-4">
            <input
              type="text"
              placeholder="Rechercher un tag..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="max-h-60 flex flex-wrap overflow-y-auto px-4 pb-4">
            {filteredTags.length === 0 ? (
              <p className="text-gray-500 text-center">Aucun tag trouvé</p>
            ) : (
              filteredTags.map(tag => (
                <button
                  key={tag}
                  className=" text-left w-auto  p-2 hover:bg-purple-100 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  onClick={() => toggleTag(tag)}
                >
                  <span className="w-1.5 h-1.5 bg-[#ff5e5b] rounded-full"></span>
                  {tag}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelector;