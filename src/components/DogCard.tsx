import { motion } from 'framer-motion';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import type { Dog } from '@/types/dog';

export default function DogCard({
  dog,
  fav,
  onFav,
}: {
  dog: Dog;
  fav: boolean;
  onFav: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-slate-800"
    >
      <img src={dog.img} alt={dog.name} className="h-44 w-full object-cover" />
      <div className="flex-1 space-y-1 px-4 py-3 text-sm">
        <h3 className="text-lg font-semibold">{dog.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          {dog.breed} • {dog.age} yrs
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{dog.zip_code}</p>
      </div>
      <button
        onClick={onFav}
        aria-label="toggle favorite"
        className="absolute right-2 top-2 rounded-full bg-white/70 p-1 backdrop-blur hover:scale-110"
      >
        {fav ? (
          <HeartSolid className="h-5 w-5 text-rose-500" />
        ) : (
          <HeartOutline className="h-5 w-5 text-gray-700" />
        )}
      </button>
    </motion.div>
  );
}
