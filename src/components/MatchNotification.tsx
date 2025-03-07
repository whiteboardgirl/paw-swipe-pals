
import React from 'react';
import { PawPrint, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

interface MatchNotificationProps {
  onClose: () => void;
}

const MatchNotification = ({ onClose }: MatchNotificationProps) => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3B82F6', '#60A5FA', '#93C5FD']
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3B82F6', '#60A5FA', '#93C5FD']
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, []);
  
  const handleMessage = () => {
    navigate('/messages');
    onClose();
  };
  
  return (
    <div className="match-animation">
      <div className="match-container">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute -left-10 bg-pawblue-500 rounded-full p-3 animate-pulse-soft">
              <PawPrint size={28} className="text-white" />
            </div>
            
            <div className="text-6xl font-bold animate-pulse-soft">
              💞
            </div>
            
            <div className="absolute -right-10 bg-pawblue-500 rounded-full p-3 animate-pulse-soft delay-75">
              <PawPrint size={28} className="text-white" />
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-pawblue-500 mb-2">It's a Match!</h2>
        <p className="text-lg mb-6">You and another dog owner liked each other's pups!</p>
        
        <div className="flex flex-col gap-4">
          <Button 
            onClick={handleMessage}
            className="bg-pawblue-500 hover:bg-pawblue-600 flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Send a Message
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Keep Swiping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchNotification;
