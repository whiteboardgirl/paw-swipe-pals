
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
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 gap-8">
        <div className="flex-1 max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
            Pawnder
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            The perfect way to connect your furry friend with playmates nearby
          </p>
          <div className="pt-4">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-full"
            >
              Get Started
            </Button>
          </div>
        </div>
        
        <div className="flex-1 max-w-md relative">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 transform rotate-3 absolute -right-4 top-4 z-10 border border-gray-100 dark:border-gray-700">
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" 
                className="w-full h-full object-cover" 
                alt="A cute dog"
              />
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold">Max</h3>
              <p className="text-sm opacity-90">Golden Retriever, 3 years</p>
              <p className="text-xs mt-1 opacity-75">Loves long walks and tennis balls</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 transform -rotate-3 relative z-0 border border-gray-100 dark:border-gray-700">
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" 
                className="w-full h-full object-cover" 
                alt="A cute dog"
              />
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold">Bella</h3>
              <p className="text-sm opacity-90">Husky, 2 years</p>
              <p className="text-xs mt-1 opacity-75">Energetic and playful</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-700 dark:text-blue-300">
            How Pawnder Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl flex flex-col items-center text-center shadow-md">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full mb-4">
                <Dog size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create a Profile</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Set up a profile for your dog with photos and details about their personality.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl flex flex-col items-center text-center shadow-md">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full mb-4">
                <Heart size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Matches</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Swipe through dog profiles and match with compatible playmates in your area.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl flex flex-col items-center text-center shadow-md">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full mb-4">
                <MessageCircle size={32} className="text-blue-600 dark:text-blue-400" />
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
              className="bg-blue-500 hover:bg-blue-600 text-white"
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
