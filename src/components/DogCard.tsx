import { motion } from 'framer-motion';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { MapPinIcon} from '@heroicons/react/24/outline';
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
    <motion.article
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:bg-slate-800/80"
      role="article"
      aria-label={`${dog.name}, ${dog.breed}, ${dog.age} years old`}
    >
      <div className="relative overflow-hidden">
        <motion.img 
          src={dog.img} 
          alt={`Photo of ${dog.name}, a ${dog.breed}`}
          className="h-56 w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <motion.button
          onClick={onFav}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:bg-slate-800/90 dark:hover:bg-slate-700"
          aria-label={fav ? `Remove ${dog.name} from favorites` : `Add ${dog.name} to favorites`}
        >
          <motion.div
            animate={{ scale: fav ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            {fav ? (
              <HeartSolid className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            ) : (
              <HeartOutline className="h-5 w-5 text-gray-600 transition-colors group-hover:text-pink-600 dark:text-gray-400 dark:group-hover:text-pink-400" />
            )}
          </motion.div>
        </motion.button>

        <div className="absolute bottom-3 left-3 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-3 py-1 text-sm font-medium text-white shadow-lg dark:from-sky-600 dark:to-sky-700">
          {dog.age} yr{dog.age !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-sky-700 transition-colors group-hover:text-pink-600 dark:text-sky-300 dark:group-hover:text-pink-400">
            {dog.name}
          </h3>

          <p className="text-base font-medium text-gray-600 dark:text-slate-400">
            {dog.breed}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MapPinIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{dog.zip_code}</span>
        </div>
      </div>

      <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-lime-500 opacity-20 transition-all duration-500 group-hover:scale-150 group-hover:opacity-30" />
      <div className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full bg-gradient-to-br from-pink-400 to-sky-500 opacity-20 transition-all duration-500 group-hover:scale-125 group-hover:opacity-40" />
    </motion.article>
  );
}