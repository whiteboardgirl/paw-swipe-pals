
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useDogs } from '@/contexts/DogsContext';
import { Dog, Match } from '@/types';

const MatchList = () => {
  const navigate = useNavigate();
  const { matches, userDogs, currentDog } = useDogs();
  const [matchDogs, setMatchDogs] = useState<{ match: Match; dog: Dog }[]>([]);
  
  useEffect(() => {
    if (!currentDog) return;
    
    // Generate some mock dogs for the matches
    const mockDogs = Array.from({ length: matches.length }, (_, i) => ({
      id: `mock-matched-dog-${i + 1}`,
      ownerId: `mock-owner-${i + 1}`,
      name: `Matched Dog ${i + 1}`,
      age: Math.floor(Math.random() * 15) + 1,
      breed: ['Labrador', 'Poodle', 'Bulldog', 'German Shepherd'][Math.floor(Math.random() * 4)],
      gender: Math.random() > 0.5 ? 'male' : 'female' as 'male' | 'female',
      bio: 'A lovely dog looking for friends!',
      photos: [`https://source.unsplash.com/featured/300x400?dog,puppy&sig=${i + 100}`],
      createdAt: new Date().toISOString()
    }));
    
    // Associate each match with a mock dog
    const matchedDogs = matches
      .filter(match => match.dogId1 === currentDog.id || match.dogId2 === currentDog.id)
      .map((match, index) => ({
        match,
        dog: mockDogs[index]
      }));
    
    setMatchDogs(matchedDogs);
  }, [matches, currentDog]);
  
  if (matchDogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="bg-pawblue-100 text-pawblue-500 rounded-full p-6 mb-4">
          <MessageCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-2">No matches yet</h2>
        <p className="text-gray-500 max-w-xs">
          Start swiping to find matches for your dog!
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {matchDogs.map(({ match, dog }) => (
        <div 
          key={match.id}
          className="glass-card rounded-xl overflow-hidden flex items-center p-3"
          onClick={() => navigate(`/messages/${match.id}`)}
        >
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <img
              src={dog.photos[0]}
              alt={dog.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://source.unsplash.com/random/300x400?dog,puppy";
              }}
            />
          </div>
          
          <div className="ml-3 flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{dog.name}, {dog.age}</h3>
              <span className="text-xs text-gray-500">
                {new Date(match.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {dog.breed} • {dog.gender === 'male' ? '♂' : '♀'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchList;
