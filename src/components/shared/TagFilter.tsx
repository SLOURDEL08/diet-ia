import React from 'react';
import Image from 'next/image';

interface TagFilterProps {
  tags: string[];
  activeTags: string[];
  onTagClick: (tag: string) => void;
  showCircle?: boolean;
}

const TagFilter: React.FC<TagFilterProps> = ({ 
  tags, 
  activeTags, 
  onTagClick, 
  showCircle = true 
}) => {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
      {tags.map((tag) => {
        const isActive = activeTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`
              flex items-center gap-3 px-6 py-3 rounded-xl
              transition-all duration-300 whitespace-nowrap
              ${isActive 
                ? 'bg-[#ff5e5b] text-white shadow-md' 
                : 'bg-white hover:bg-gray-200 text-gray-700'}
            `}
          >
            <Image
              src={`/${tag.toLowerCase()}-white.svg`}
              alt={tag}
              width={20}
              height={20}
              className={`transition-colors ${isActive ? 'brightness-100' : 'brightness-0'}`}
            />
            <span className="font-light">{tag}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TagFilter;