'use client';
import { useBreeds } from '@/hooks/useBreeds';
import { ChevronDown, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function BreedFilter({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (arr: string[]) => void;
}) {
  const { data } = useBreeds();
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!data) return null;

  const filteredBreeds = data
    .filter(breed => breed.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const handleToggleBreed = (breed: string) => {
    if (selected.includes(breed)) {
      onChange(selected.filter(b => b !== breed));
    } else {
      onChange([...selected, breed]);
    }
  };

  const handleRemoveBreed = (breed: string) => {
    onChange(selected.filter(b => b !== breed));
  };

  const clearAll = () => {
    onChange([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label
        htmlFor="breed-filter"
        className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
      >
        Filter by Breeds
        {selected.length > 0 && (
          <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium">
            {selected.length} selected
          </span>
        )}
      </label>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selected.map(breed => (
            <span
              key={breed}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 
                         text-blue-700 dark:text-blue-300 text-sm rounded-full border border-blue-200 
                         dark:border-blue-700 transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/50"
            >
              {breed}
              <button
                onClick={() => handleRemoveBreed(breed)}
                className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 
                           transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Remove ${breed} filter`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            onClick={clearAll}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 
                       dark:hover:text-gray-200 underline transition-colors focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 rounded px-1 cursor-pointer"
            aria-label="Clear all breed filters"
          >
            Clear all
          </button>
        </div>
      )}

      <button
        id="breed-filter"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 
                   border-2 border-gray-200 dark:border-gray-600 rounded-lg shadow-sm 
                   hover:border-blue-300 dark:hover:border-blue-500 focus:outline-none 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
                   transition-all duration-200 text-left"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-gray-700 dark:text-gray-200">
          {selected.length === 0 ? 'Select breeds...' : `${selected.length} breed${selected.length !== 1 ? 's' : ''} selected`}
        </span>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 
                        dark:border-gray-600 rounded-lg shadow-lg max-h-80 overflow-hidden">
          <div className="p-3 border-b border-gray-200 dark:border-gray-600">
            <input
              type="text"
              placeholder="Search breeds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 
                         rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                         placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Search dog breeds"
            />
          </div>

          <div className="max-h-60 overflow-y-auto" role="listbox" aria-multiselectable="true">
            {filteredBreeds.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                No breeds found matching `&quot;`{searchTerm}`&quot;`
              </div>
            ) : (
              filteredBreeds.map((breed) => (
                <button
                  key={breed}
                  onClick={() => handleToggleBreed(breed)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors focus:outline-none 
                             focus:bg-blue-50 dark:focus:bg-blue-900/30 hover:bg-gray-50 
                             dark:hover:bg-gray-700 ${selected.includes(breed)
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                      : 'text-gray-700 dark:text-gray-200'
                    }`}
                  role="option"
                  aria-selected={selected.includes(breed)}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${selected.includes(breed)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                      }`}>
                      {selected.includes(breed) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    {breed}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}