
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dog, Heart, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGetStarted = () => {
    navigate('/login');
    toast({
      title: "Welcome to Pawnder!",
      description: "Find the perfect playdate for your furry friend.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 gap-8">
        <div className="flex-1 max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-pawblue-600 dark:text-pawblue-400">
            Pawnder
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            The perfect way to connect your furry friend with playmates nearby
          </p>
          <div className="pt-4">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-pawblue-500 hover:bg-pawblue-600 text-white px-8 py-6 text-lg rounded-full"
            >
              Get Started
            </Button>
          </div>
        </div>
        
        <div className="flex-1 max-w-md relative">
          <div className="dog-card transform rotate-3 absolute -right-4 top-4 z-10">
            <div className="dog-card-image-container h-full">
              <img 
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" 
                className="dog-card-image" 
                alt="A cute dog"
              />
            </div>
            <div className="dog-card-info">
              <h3 className="text-2xl font-bold">Max</h3>
              <p className="text-sm opacity-90">Golden Retriever, 3 years</p>
              <p className="text-xs mt-1 opacity-75">Loves long walks and tennis balls</p>
            </div>
          </div>
          
          <div className="dog-card transform -rotate-3 relative z-0">
            <div className="dog-card-image-container h-full">
              <img 
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" 
                className="dog-card-image" 
                alt="A cute dog"
              />
            </div>
            <div className="dog-card-info">
              <h3 className="text-2xl font-bold">Bella</h3>
              <p className="text-sm opacity-90">Husky, 2 years</p>
              <p className="text-xs mt-1 opacity-75">Energetic and playful</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 px-6 bg-gradient-to-b from-transparent to-pawblue-50 dark:to-pawblue-950/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-pawblue-700 dark:text-pawblue-300">
            How Pawnder Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center">
              <div className="bg-pawblue-100 dark:bg-pawblue-900/50 p-4 rounded-full mb-4">
                <Dog size={32} className="text-pawblue-600 dark:text-pawblue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create a Profile</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Set up a profile for your dog with photos and details about their personality.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center">
              <div className="bg-pawblue-100 dark:bg-pawblue-900/50 p-4 rounded-full mb-4">
                <Heart size={32} className="text-pawblue-600 dark:text-pawblue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Matches</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Swipe through dog profiles and match with compatible playmates in your area.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center">
              <div className="bg-pawblue-100 dark:bg-pawblue-900/50 p-4 rounded-full mb-4">
                <MessageCircle size={32} className="text-pawblue-600 dark:text-pawblue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Chat with other dog owners and arrange playdates at parks near you.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={handleGetStarted}
              className="bg-pawblue-500 hover:bg-pawblue-600"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
