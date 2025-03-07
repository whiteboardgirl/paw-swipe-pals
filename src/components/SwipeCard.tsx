
import React, { useState } from 'react';
import { Heart, X, PawPrint } from 'lucide-react';
import { Dog } from '@/types';

interface SwipeCardProps {
  dog: Dog;
  onSwipeRight: () => Promise<boolean>;
  onSwipeLeft: () => void;
  onMatch: () => void;
}

const SwipeCard = ({ dog, onSwipeRight, onSwipeLeft, onMatch }: SwipeCardProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [swiping, setSwiping] = useState<'left' | 'right' | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleNextPhoto = () => {
    if (dog.photos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev + 1) % dog.photos.length);
    }
  };

  const handlePrevPhoto = () => {
    if (dog.photos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev === 0 ? dog.photos.length - 1 : prev - 1));
    }
  };

  const handleSwipeRight = async () => {
    setSwiping('right');
    const isMatch = await onSwipeRight();
    if (isMatch) {
      onMatch();
    }
    setTimeout(() => {
      setSwiping(null);
    }, 500);
  };

  const handleSwipeLeft = () => {
    setSwiping('left');
    onSwipeLeft();
    setTimeout(() => {
      setSwiping(null);
    }, 500);
  };

  return (
    <div 
      className={`dog-card ${swiping === 'right' ? 'animate-swipe-right' : swiping === 'left' ? 'animate-swipe-left' : ''}`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <img 
        src={dog.photos[currentPhotoIndex]} 
        alt={dog.name} 
        className="dog-card-image"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://source.unsplash.com/random/300x400?dog,puppy";
        }}
      />
      
      {/* Photo navigation dots */}
      {dog.photos.length > 1 && (
        <div className="absolute top-2 left-0 right-0 flex justify-center gap-1">
          {dog.photos.map((_, index) => (
            <div 
              key={index} 
              className={`h-1 rounded-full transition-all ${
                index === currentPhotoIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
              }`} 
            />
          ))}
        </div>
      )}
      
      {/* Left/Right photo navigation */}
      {dog.photos.length > 1 && (
        <>
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevPhoto();
            }}
          >
            ◀
          </button>
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation();
              handleNextPhoto();
            }}
          >
            ▶
          </button>
        </>
      )}
      
      <div className="dog-card-info">
        <h2 className="text-2xl font-bold flex items-center">
          {dog.name}, {dog.age}
          {dog.gender === 'male' ? (
            <span className="ml-2 text-blue-400">♂</span>
          ) : (
            <span className="ml-2 text-pink-400">♀</span>
          )}
        </h2>
        <p className="text-sm text-gray-300">{dog.breed}</p>
        
        {showDetails && (
          <div className="mt-3 pt-3 border-t border-white/20 animate-fade-in">
            <p>{dog.bio}</p>
          </div>
        )}
      </div>
      
      {/* Swipe buttons */}
      <div className="swipe-buttons absolute bottom-4 left-0 right-0">
        <button 
          className="swipe-button bg-white shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleSwipeLeft();
          }}
        >
          <X size={24} className="text-red-500" />
        </button>
        
        <button 
          className="swipe-button bg-white shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleSwipeRight();
          }}
        >
          <Heart size={24} className="text-green-500" />
        </button>
      </div>
    </div>
  );
};

export default SwipeCard;
