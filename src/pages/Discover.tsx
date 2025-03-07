
import React, { useState, useEffect } from 'react';
import { PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import SwipeCard from '@/components/SwipeCard';
import MatchNotification from '@/components/MatchNotification';
import { useDogs } from '@/contexts/DogsContext';
import { useNavigate } from 'react-router-dom';

const Discover = () => {
  const navigate = useNavigate();
  const { swipeDogs, currentDog, swipeRight, swipeLeft } = useDogs();
  const [showMatch, setShowMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);
  
  useEffect(() => {
    if (!currentDog) {
      navigate('/');
    }
    
    if (swipeDogs.length === 0) {
      setShowEmptyState(true);
    } else {
      setShowEmptyState(false);
    }
  }, [currentDog, swipeDogs]);
  
  const handleSwipeRight = async () => {
    if (!swipeDogs.length) return false;
    
    setLoading(true);
    const isMatch = await swipeRight(swipeDogs[0].id);
    setLoading(false);
    
    if (isMatch) {
      setShowMatch(true);
    }
    
    return isMatch;
  };
  
  const handleSwipeLeft = () => {
    if (!swipeDogs.length) return;
    
    setLoading(true);
    swipeLeft(swipeDogs[0].id);
    setLoading(false);
  };
  
  if (!currentDog) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <div className="bg-pawblue-100 text-pawblue-500 rounded-full p-6 inline-block mb-4">
              <PawPrint size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-2">No Active Dog!</h1>
            <p className="text-gray-500 mb-6">
              You need to create a dog profile first
            </p>
            <Button 
              onClick={() => navigate('/dogs/create')}
              className="bg-pawblue-500 hover:bg-pawblue-600"
            >
              Create Dog Profile
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto p-4 flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-xl p-3 mb-6 flex items-center justify-between">
            <h2 className="font-bold flex items-center">
              <PawPrint className="text-pawblue-500 mr-1" size={20} />
              Swiping as {currentDog.name}
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/')}
            >
              Change
            </Button>
          </div>
          
          {showEmptyState ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center p-6">
                <div className="bg-pawblue-100 text-pawblue-500 rounded-full p-6 inline-block mb-4">
                  <PawPrint size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">No More Dogs</h2>
                <p className="text-gray-500 mb-4">
                  You've gone through all available dogs in your area.
                </p>
                <p className="text-gray-500 mb-6">
                  Check back later for more potential matches!
                </p>
                <Button 
                  onClick={() => navigate('/matches')}
                  className="bg-pawblue-500 hover:bg-pawblue-600"
                >
                  View Your Matches
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative min-h-[60vh] flex items-center justify-center">
              {swipeDogs.length > 0 && (
                <SwipeCard 
                  dog={swipeDogs[0]}
                  onSwipeRight={handleSwipeRight}
                  onSwipeLeft={handleSwipeLeft}
                  onMatch={() => setShowMatch(true)}
                />
              )}
              
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pawblue-500" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {showMatch && <MatchNotification onClose={() => setShowMatch(false)} />}
    </Layout>
  );
};

export default Discover;
