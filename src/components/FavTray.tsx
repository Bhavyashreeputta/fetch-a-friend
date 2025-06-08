'use client';
import { useFavorites } from '@/hooks/useFavorites';
import { motion, AnimatePresence } from 'framer-motion';

export default function FavTray({ onMatch }: { onMatch: () => void }) {
  const { ids, clear } = useFavorites();

  return (
    <AnimatePresence>
      {ids.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 30,
            opacity: { duration: 0.2 }
          }}
          className="fixed bottom-0 left-0 right-0 z-50 mx-4 mb-4 sm:mx-6 sm:mb-6"
        >
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-blue-600/30 rounded-2xl blur-sm scale-105" />

            <div className="relative px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    key={ids.length}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-center w-12 h-12 bg-white/25 rounded-full backdrop-blur-sm border border-white/40 shadow-lg"
                  >
                    <span className="text-white font-bold text-lg">
                      {ids.length}
                    </span>
                  </motion.div>
                  
                  <div className="text-white">
                    <motion.p
                      key={ids.length}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-semibold text-lg"
                    >
                      {ids.length} {ids.length === 1 ? 'Favorite' : 'Favorites'}
                    </motion.p>
                    <p className="text-blue-50 text-sm opacity-90">
                      {ids.length === 1 ? 'Ready to find your match!' : 'Great selection! Find your perfect match'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clear}
                    className="flex-1 sm:flex-none group relative overflow-hidden bg-white/15 hover:bg-white/25 text-white font-medium px-4 py-2.5 rounded-xl transition-all duration-300 border border-white/30 hover:border-white/50 backdrop-blur-sm shadow-lg"
                  >
                    <span className="relative z-10 text-sm">Clear All</span>
                    <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 8px 25px rgba(255, 255, 255, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onMatch}
                    className="flex-1 sm:flex-none group relative overflow-hidden bg-white text-blue-700 hover:text-blue-800 font-bold px-6 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <span className="relative z-10 text-sm">Find My Match</span>
                    <motion.span
                      className="relative z-10"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ✨
                    </motion.span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.button>
                </div>
              </div>

              <div className="mt-4 sm:mt-3">
                <div className="flex items-center gap-2 text-blue-50 text-xs opacity-90">
                  <span>Match accuracy improves with more favorites</span>
                  <div className="flex-1 h-1 bg-white/25 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((ids.length / 5) * 100, 100)}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-white/80 to-white/60 rounded-full shadow-sm"
                    />
                  </div>
                  <span className="text-xs font-medium text-white">
                    {Math.min(Math.round((ids.length / 5) * 100), 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}