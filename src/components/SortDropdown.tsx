import { ChevronDown, ArrowUpDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const sortOptions = [
  { value: 'breed:asc', label: 'Breed (A-Z)'},
  { value: 'breed:desc', label: 'Breed (Z-A)'},
  { value: 'name:asc', label: 'Name (A-Z)' },
  { value: 'name:desc', label: 'Name (Z-A)'},
  { value: 'age:asc', label: 'Age (Youngest)' },
  { value: 'age:desc', label: 'Age (Oldest)'},
];

export default function SortDropdown({
  value = 'breed:asc',
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = sortOptions.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
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
    <div className="relative" ref={dropdownRef}>
      <label 
        htmlFor="sort-dropdown"
        className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
      >
        <div className="flex items-center gap-2">
          <ArrowUpDown size={16} />
          Sort by
        </div>
      </label>

      <button
        id="sort-dropdown"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full sm:w-auto min-w-[180px] flex items-center justify-between px-4 py-3 
                   bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 
                   rounded-lg shadow-sm hover:border-blue-300 dark:hover:border-blue-500 
                   focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                   dark:focus:ring-blue-800 transition-all duration-200 text-left group"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            {selectedOption?.label}
          </span>
        </div>
        <ChevronDown 
          size={18} 
          className={`text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 
                     transition-all duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full sm:w-auto sm:min-w-[220px] mt-2 bg-white dark:bg-gray-800 
                        border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl 
                        overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-2" role="listbox">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-4 py-3 text-sm transition-all duration-150 
                           focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700 
                           flex items-center justify-between group ${
                             value === option.value
                               ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold'
                               : 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100'
                           }`}
                role="option"
                aria-selected={value === option.value}
              >
                <div className="flex items-center gap-3">
                  <span>{option.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {value === option.value && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}