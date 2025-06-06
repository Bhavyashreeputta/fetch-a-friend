'use client';
import { useFavorites } from '@/hooks/useFavorites';
import { motion, AnimatePresence } from 'framer-motion';
export default function FavTray({ onMatch }: { onMatch: () => void }) {
  const { ids, clear } = useFavorites();
  return (
    <AnimatePresence>
      {ids.length > 0 && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between gap-3 bg-blue-600 px-4 py-3 text-white sm:px-6"
        >
          <span>{ids.length} favorite&nbsp;{ids.length === 1 ? 'dog' : 'dogs'}</span>
          <div className="flex gap-2 text-sm">
            <button
              onClick={clear}
              className="rounded bg-blue-500/40 px-3 py-1 hover:bg-blue-500/60"
            >
              Clear
            </button>
            <button
              onClick={onMatch}
              className="rounded bg-white px-3 py-1 font-medium text-blue-700 hover:bg-blue-100"
            >
              Find my match →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}