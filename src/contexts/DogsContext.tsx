
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Dog, Match, Message } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface DogsContextType {
  userDogs: Dog[];
  currentDog: Dog | null;
  swipeDogs: Dog[];
  matches: Match[];
  messages: Record<string, Message[]>;
  isLoading: boolean;
  createDog: (dog: Omit<Dog, 'id' | 'ownerId' | 'createdAt'>) => Promise<void>;
  updateDog: (dogId: string, updates: Partial<Dog>) => Promise<void>;
  deleteDog: (dogId: string) => Promise<void>;
  swipeRight: (dogId: string) => Promise<boolean>;
  swipeLeft: (dogId: string) => Promise<void>;
  getMatches: () => Promise<void>;
  sendMessage: (matchId: string, text: string) => Promise<void>;
  getMessages: (matchId: string) => Promise<Message[]>;
  setCurrentDog: (dog: Dog | null) => void;
}

const DogsContext = createContext<DogsContextType | undefined>(undefined);

export const useDogs = () => {
  const context = useContext(DogsContext);
  if (context === undefined) {
    throw new Error('useDogs must be used within a DogsProvider');
  }
  return context;
};

// Utility function to generate mock dog data
const generateMockDogs = (count: number): Dog[] => {
  const breeds = [
    'Labrador Retriever', 'German Shepherd', 'Golden Retriever', 
    'Bulldog', 'Beagle', 'Poodle', 'Rottweiler', 'Yorkshire Terrier',
    'Boxer', 'Dachshund', 'Shih Tzu', 'Siberian Husky'
  ];
  
  const bios = [
    'Loves long walks and playing fetch!',
    'Friendly with everyone, especially kids',
    'Enjoys swimming and outdoor adventures',
    'Very energetic and playful',
    'Calm and well-behaved, great with other dogs',
    'A bit shy at first, but warms up quickly',
    'Loves belly rubs and treats',
    'Very loyal and protective'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `mock-dog-${i + 1}`,
    ownerId: `mock-owner-${i + 1}`,
    name: `Dog ${i + 1}`,
    age: Math.floor(Math.random() * 15) + 1,
    breed: breeds[Math.floor(Math.random() * breeds.length)],
    gender: Math.random() > 0.5 ? 'male' : 'female',
    bio: bios[Math.floor(Math.random() * bios.length)],
    photos: [`https://source.unsplash.com/featured/300x400?dog,puppy&sig=${i}`],
    createdAt: new Date().toISOString()
  }));
};

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [userDogs, setUserDogs] = useState<Dog[]>([]);
  const [currentDog, setCurrentDog] = useState<Dog | null>(null);
  const [swipeDogs, setSwipeDogs] = useState<Dog[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState<Record<string, string[]>>({});

  // Load user dogs
  useEffect(() => {
    if (user) {
      const loadUserDogs = () => {
        const storedDogs = localStorage.getItem(`pawnder_user_dogs_${user.id}`);
        if (storedDogs) {
          const parsedDogs = JSON.parse(storedDogs) as Dog[];
          setUserDogs(parsedDogs);
          // Set the first dog as current if available
          if (parsedDogs.length > 0 && !currentDog) {
            setCurrentDog(parsedDogs[0]);
          }
        }
        setIsLoading(false);
      };

      loadUserDogs();
      loadLikes();
      loadMatches();
    }
  }, [user]);

  // Load potential dogs to swipe on
  useEffect(() => {
    if (user) {
      const loadSwipeDogs = () => {
        const mockDogs = generateMockDogs(20);
        // Filter out user's own dogs and already swiped dogs
        const filteredDogs = mockDogs.filter(
          dog => !userDogs.some(userDog => userDog.id === dog.id)
        );
        setSwipeDogs(filteredDogs);
      };

      loadSwipeDogs();
    }
  }, [user, userDogs]);

  const loadLikes = () => {
    if (!user) return;
    
    const storedLikes = localStorage.getItem(`pawnder_likes_${user.id}`);
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }
  };

  const loadMatches = async () => {
    if (!user) return;
    
    const storedMatches = localStorage.getItem(`pawnder_matches_${user.id}`);
    if (storedMatches) {
      setMatches(JSON.parse(storedMatches));
    }
  };

  const createDog = async (dog: Omit<Dog, 'id' | 'ownerId' | 'createdAt'>) => {
    if (!user) throw new Error('User must be logged in');
    
    const newDog: Dog = {
      ...dog,
      id: `dog-${Date.now()}`,
      ownerId: user.id,
      createdAt: new Date().toISOString()
    };
    
    const updatedDogs = [...userDogs, newDog];
    setUserDogs(updatedDogs);
    localStorage.setItem(`pawnder_user_dogs_${user.id}`, JSON.stringify(updatedDogs));
    
    // Set as current dog if it's the only one
    if (updatedDogs.length === 1) {
      setCurrentDog(newDog);
    }
    
    toast.success('Your dog profile has been created!');
    return;
  };

  const updateDog = async (dogId: string, updates: Partial<Dog>) => {
    if (!user) throw new Error('User must be logged in');
    
    const updatedDogs = userDogs.map(dog => 
      dog.id === dogId ? { ...dog, ...updates } : dog
    );
    
    setUserDogs(updatedDogs);
    localStorage.setItem(`pawnder_user_dogs_${user.id}`, JSON.stringify(updatedDogs));
    
    // Update current dog if it was updated
    if (currentDog && currentDog.id === dogId) {
      setCurrentDog({ ...currentDog, ...updates });
    }
    
    toast.success('Dog profile updated successfully');
    return;
  };

  const deleteDog = async (dogId: string) => {
    if (!user) throw new Error('User must be logged in');
    
    const updatedDogs = userDogs.filter(dog => dog.id !== dogId);
    setUserDogs(updatedDogs);
    localStorage.setItem(`pawnder_user_dogs_${user.id}`, JSON.stringify(updatedDogs));
    
    // Update current dog if it was deleted
    if (currentDog && currentDog.id === dogId) {
      setCurrentDog(updatedDogs.length > 0 ? updatedDogs[0] : null);
    }
    
    toast.success('Dog profile deleted successfully');
    return;
  };

  const swipeRight = async (dogId: string): Promise<boolean> => {
    if (!user || !currentDog) throw new Error('User must be logged in and have a current dog');
    
    // Add to likes
    const currentDogId = currentDog.id;
    const updatedLikes = { ...likes };
    
    if (!updatedLikes[currentDogId]) {
      updatedLikes[currentDogId] = [];
    }
    
    updatedLikes[currentDogId] = [...updatedLikes[currentDogId], dogId];
    setLikes(updatedLikes);
    localStorage.setItem(`pawnder_likes_${user.id}`, JSON.stringify(updatedLikes));
    
    // Check if this is a match
    let isMatch = false;
    
    // A match occurs if the other dog has already liked the current dog
    if (Object.keys(updatedLikes).includes(dogId)) {
      const otherDogLikes = updatedLikes[dogId] || [];
      if (otherDogLikes.includes(currentDogId)) {
        isMatch = true;
        // Create match
        const newMatch: Match = {
          id: `match-${Date.now()}`,
          dogId1: currentDogId,
          dogId2: dogId,
          createdAt: new Date().toISOString()
        };
        
        const updatedMatches = [...matches, newMatch];
        setMatches(updatedMatches);
        localStorage.setItem(`pawnder_matches_${user.id}`, JSON.stringify(updatedMatches));
      }
    }
    
    // Remove the dog from swipe dogs
    setSwipeDogs(swipeDogs.filter(dog => dog.id !== dogId));
    
    return isMatch;
  };

  const swipeLeft = async (dogId: string) => {
    // Simply remove the dog from swipe dogs
    setSwipeDogs(swipeDogs.filter(dog => dog.id !== dogId));
  };

  const getMatches = async () => {
    await loadMatches();
  };

  const sendMessage = async (matchId: string, text: string) => {
    if (!user) throw new Error('User must be logged in');
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      matchId,
      senderId: user.id,
      text,
      createdAt: new Date().toISOString()
    };
    
    const matchMessages = messages[matchId] || [];
    const updatedMessages = [...matchMessages, newMessage];
    
    setMessages({
      ...messages,
      [matchId]: updatedMessages
    });
    
    localStorage.setItem(`pawnder_messages_${matchId}`, JSON.stringify(updatedMessages));
    return;
  };

  const getMessages = async (matchId: string): Promise<Message[]> => {
    const storedMessages = localStorage.getItem(`pawnder_messages_${matchId}`);
    let matchMessages: Message[] = [];
    
    if (storedMessages) {
      matchMessages = JSON.parse(storedMessages);
      setMessages({
        ...messages,
        [matchId]: matchMessages
      });
    }
    
    return matchMessages;
  };

  return (
    <DogsContext.Provider
      value={{
        userDogs,
        currentDog,
        swipeDogs,
        matches,
        messages,
        isLoading,
        createDog,
        updateDog,
        deleteDog,
        swipeRight,
        swipeLeft,
        getMatches,
        sendMessage,
        getMessages,
        setCurrentDog
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};
