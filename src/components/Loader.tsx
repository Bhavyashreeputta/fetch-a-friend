'use client';

import { useState, useEffect } from 'react';
import '../app/globals.css';

const PremiumDogLoader = () => {
  const [loadingText, setLoadingText] = useState('Finding your perfect match');
  const [progress, setProgress] = useState(0);
  const [currentDot, setCurrentDot] = useState(0);

  useEffect(() => {
    const loadingMessages = [
      'Finding your perfect match',
      'Searching through happy tails',
      'Connecting hearts and paws',
      'Preparing furry friends',
      'Almost there...'
    ];

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 85) return prev;
        return prev + Math.random() * 12;
      });
    }, 400);

    const messageInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        return loadingMessages[(currentIndex + 1) % loadingMessages.length];
      });
    }, 2000);

    const dotInterval = setInterval(() => {
      setCurrentDot(prev => (prev + 1) % 5);
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-lime-50 to-sky-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900 flex items-center justify-center">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-200/30 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-200/30 dark:bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-lime-200/20 dark:bg-lime-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center space-y-12 px-8">

        <div className="relative">
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 border-4 border-transparent border-t-pink-400 border-r-sky-400 rounded-full animate-spin"></div>
            <div className="absolute inset-3 border-4 border-transparent border-b-lime-400 border-l-amber-400 rounded-full animate-spin animate-reverse delay-300"></div>

            <div className="absolute inset-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-200 dark:border-slate-600">
              <div className="text-4xl animate-bounce">🐕</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-sky-700 dark:text-sky-300 tracking-tight">
            {loadingText}
          </h1>

          <div className="flex justify-center space-x-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentDot 
                    ? 'bg-pink-500 scale-125 shadow-lg shadow-pink-500/50' 
                    : i < currentDot 
                      ? 'bg-sky-400' 
                      : 'bg-gray-300 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <div className="relative h-2 bg-amber-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-500 via-sky-500 to-lime-500 transition-all duration-700 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute right-0 top-0 w-8 h-full bg-white/40 blur-sm animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-slate-400">
            <span>Loading...</span>
            <span>{Math.round(Math.min(progress, 100))}%</span>
          </div>
        </div>

        <div className="relative h-20">
          <div className="absolute left-1/2 transform -translate-x-1/2 space-x-8 flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center text-white text-xl animate-float shadow-lg">
              🦴
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-500 rounded-xl flex items-center justify-center text-white animate-float delay-300 shadow-lg">
              ⚽
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center text-white text-xl animate-float delay-600 shadow-lg">
              🐾
            </div>
            <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center text-white animate-float delay-900 shadow-lg">
              ❤️
            </div>
          </div>
        </div>

        <p className="text-gray-500 dark:text-slate-400 text-lg font-light max-w-sm mx-auto leading-relaxed">
          Preparing thousands of adorable pups waiting for their forever home
        </p>
      </div>
    </div>
  );
};

export const SkeletonCard = () => (
  <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200/50 dark:border-slate-600/50 overflow-hidden animate-pulse">
    <div className="h-48 bg-gradient-to-br from-sky-100 to-pink-100 dark:from-slate-600 dark:to-slate-500"></div>
    <div className="p-6 space-y-4">
      <div className="h-5 bg-gradient-to-r from-amber-200 to-lime-200 dark:from-slate-600 dark:to-slate-500 rounded-lg w-4/5"></div>
      <div className="h-4 bg-sky-200 dark:bg-slate-600 rounded w-3/5"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-4 bg-pink-200 dark:bg-slate-600 rounded w-2/5"></div>
        <div className="h-10 w-10 bg-gradient-to-br from-lime-200 to-amber-200 dark:from-slate-600 dark:to-slate-500 rounded-full"></div>
      </div>
    </div>
  </div>
);

export default PremiumDogLoader;