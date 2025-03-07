
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDogs } from '@/contexts/DogsContext';
import Layout from '@/components/Layout';

const Home = () => {
  const navigate = useNavigate();
  const { userDogs, currentDog, setCurrentDog } = useDogs();
  
  useEffect(() => {
    // If no dogs, redirect to create dog page
    if (userDogs.length === 0) {
      navigate('/dogs/create');
    }
  }, [userDogs]);
  
  if (userDogs.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <div className="bg-pawblue-100 text-pawblue-500 rounded-full p-6 inline-block mb-4">
              <PawPrint size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome to Pawnder!</h1>
            <p className="text-gray-500 mb-6">
              Let's create a profile for your dog to get started
            </p>
            <Button 
              onClick={() => navigate('/dogs/create')}
              className="bg-pawblue-500 hover:bg-pawblue-600"
            >
              <Plus size={18} className="mr-2" />
              Add Your Dog
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <PawPrint className="text-pawblue-500 mr-2" />
          Welcome to Pawnder
        </h1>
        
        {userDogs.length > 0 && (
          <div className="glass-card rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Dogs</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userDogs.map(dog => (
                <div 
                  key={dog.id} 
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    currentDog?.id === dog.id ? 'border-pawblue-500 shadow-lg' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentDog(dog)}
                >
                  <div className="aspect-[3/2] relative">
                    <img 
                      src={dog.photos[0]} 
                      alt={dog.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://source.unsplash.com/random/300x400?dog,puppy";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="font-bold">{dog.name}, {dog.age}</h3>
                      <p className="text-sm">{dog.breed}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {userDogs.length < 3 && (
                <div 
                  className="rounded-lg border-2 border-dashed border-gray-300 aspect-[3/2] flex items-center justify-center hover:border-pawblue-400 transition-colors cursor-pointer"
                  onClick={() => navigate('/dogs/create')}
                >
                  <div className="text-center">
                    <Plus size={30} className="mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">Add another dog</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            onClick={() => navigate('/discover')}
            className="bg-pawblue-500 hover:bg-pawblue-600 px-6 py-2 text-lg"
          >
            Start Swiping
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
