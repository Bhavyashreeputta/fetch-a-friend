'use client';
import { useMemo, useEffect, useState } from 'react';
import '../app/globals.css';

export default function PawTrail() {
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth <= 480) {
        setScreenSize('mobile');
      } else if (window.innerWidth <= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, [screenSize]);

  const pawPrints = useMemo(() => {
    const paws = [];
    
    let rows, cols;
    switch (screenSize) {
      case 'mobile':
        rows = 4;
        cols = 5;
        break;
      case 'tablet':
        rows = 6;
        cols = 7;
        break;
      default: 
        rows = 8;
        cols = 10;
    }
    const randomOffsets = [
      2.5, -1.8, 3.2, -2.1, 1.7, -3.4, 2.9, -1.2, 3.8, -2.7,
      1.4, -2.9, 3.6, -1.5, 2.3, -3.1, 1.9, -2.4, 3.7, -1.6,
      2.8, -1.9, 3.3, -2.6, 1.1, -3.5, 2.2, -1.3, 3.9, -2.8,
      1.8, -2.2, 3.4, -1.7, 2.6, -3.2, 1.5, -2.5, 3.1, -1.4,
      2.7, -1.1, 3.8, -2.3, 1.6, -3.6, 2.4, -1.8, 3.5, -2.9,
      1.2, -2.7, 3.7, -1.9, 2.1, -3.3, 1.3, -2.1, 3.2, -1.5,
      2.9, -1.7, 3.6, -2.4, 1.4, -3.1, 2.8, -1.6, 3.4, -2.8,
      1.9, -2.6, 3.1, -1.2, 2.5, -3.4, 1.7, -2.3, 3.8, -1.8
    ];
    
    const randomSizes = [
      35, 42, 48, 33, 45, 38, 52, 41, 36, 49,
      44, 37, 51, 39, 46, 34, 43, 50, 40, 47,
      32, 54, 38, 45, 41, 36, 48, 43, 39, 52,
      46, 35, 49, 42, 37, 51, 44, 33, 47, 40,
      53, 38, 45, 41, 34, 48, 36, 50, 43, 39,
      46, 42, 37, 52, 35, 49, 44, 41, 47, 38,
      51, 36, 43, 48, 40, 45, 33, 50, 37, 46,
      42, 39, 53, 35, 48, 41, 44, 47, 36, 49
    ];
    
    const randomDelays = [
      1.2, 0.8, 2.4, 1.7, 3.1, 0.5, 2.9, 1.4, 0.9, 3.5,
      2.2, 1.6, 0.3, 2.8, 1.1, 3.7, 0.7, 2.5, 1.9, 3.2,
      0.6, 2.1, 1.5, 3.4, 0.9, 2.7, 1.3, 3.8, 0.4, 2.3,
      1.8, 3.6, 0.8, 2.4, 1.2, 3.1, 0.5, 2.9, 1.7, 3.3,
      0.7, 2.6, 1.4, 3.5, 0.3, 2.8, 1.1, 3.9, 0.6, 2.2,
      1.9, 3.7, 0.9, 2.5, 1.3, 3.4, 0.8, 2.1, 1.6, 3.2,
      0.4, 2.7, 1.5, 3.8, 0.7, 2.3, 1.2, 3.6, 0.5, 2.4,
      1.8, 3.1, 0.9, 2.9, 1.4, 3.5, 0.6, 2.8, 1.1, 3.3
    ];
    
    const animationTypes = [
      'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse',
      'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float',
      'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse',
      'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float',
      'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse',
      'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float',
      'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse',
      'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float', 'pulse', 'float'
    ];
    
    let index = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const offsetX = randomOffsets[index * 2] || 0;
        const offsetY = randomOffsets[index * 2 + 1] || 0;

        const rowSpacing = screenSize === 'mobile' ? 85 : screenSize === 'tablet' ? 90 : 100;
        const colSpacing = screenSize === 'mobile' ? 85 : screenSize === 'tablet' ? 90 : 100;
        
        paws.push({
          top: `${(row * (rowSpacing / (rows - 1))) + offsetY}%`,
          left: `${(col * (colSpacing / (cols - 1))) + offsetX}%`,
          size: randomSizes[index] || 40,
          delay: `${randomDelays[index] || 1}s`,
          animationType: animationTypes[index] || 'float'
        });
        index++;
      }
    }
    
    return paws;
  }, [screenSize]);

  const PawSVG = ({ size }: { size: number }) => (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M256 512c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zm160-224c-44 0-80-36-80-80s36-80 80-80 80 36 80 80-36 80-80 80zm-320 0c-44 0-80-36-80-80s36-80 80-80 80 36 80 80-36 80-80 80zm160-112c-44 0-80-36-80-80s36-80 80-80 80 36 80 80-36 80-80 80z" />
    </svg>
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden"
    >
      {pawPrints.map(({ top, left, size, delay, animationType }, i) => (
        <div
          key={i}
          style={{
            top,
            left,
            animationDelay: delay
          }}
          className={`absolute ${animationType === 'float' ? 'animate-paw-float' : 'animate-paw-pulse'
            } text-black/20 dark:text-black/30 transform -translate-x-1/2 -translate-y-1/2`}
        >
          <PawSVG size={size} />
        </div>
      ))}
    </div>
  );
}
