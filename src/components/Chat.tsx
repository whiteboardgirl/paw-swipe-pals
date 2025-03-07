
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDogs } from '@/contexts/DogsContext';
import { useAuth } from '@/contexts/AuthContext';
import { Message, Dog, Match } from '@/types';

const Chat = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getMessages, sendMessage, matches } = useDogs();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!matchId) return;
    
    // Load messages
    const loadMessages = async () => {
      const fetchedMessages = await getMessages(matchId);
      setMessages(fetchedMessages);
      
      // Generate a fake matched dog for demo purposes
      const mockDog: Dog = {
        id: 'mock-matched-dog',
        ownerId: 'mock-owner',
        name: 'Charlie',
        age: 3,
        breed: 'Golden Retriever',
        gender: 'male',
        bio: 'Friendly and playful, loves to run and fetch.',
        photos: ['https://source.unsplash.com/featured/300x400?golden,retriever'],
        createdAt: new Date().toISOString()
      };
      setMatchedDog(mockDog);
    };
    
    loadMessages();
  }, [matchId]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !matchId) return;
    
    await sendMessage(matchId, newMessage);
    setNewMessage('');
    
    // Reload messages
    const updatedMessages = await getMessages(matchId);
    setMessages(updatedMessages);
  };
  
  if (!matchedDog) {
    return <div className="p-4">Loading...</div>;
  }
  
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="glass-card border-b p-3 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/matches')}
          className="mr-2"
        >
          <ArrowLeft size={20} />
        </Button>
        
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={matchedDog.photos[0]} 
              alt={matchedDog.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://source.unsplash.com/random/300x400?dog,puppy";
              }}
            />
          </div>
          <div className="ml-3">
            <h3 className="font-bold">{matchedDog.name}</h3>
            <p className="text-xs text-gray-500">{matchedDog.breed}</p>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>No messages yet! Say hello to start the conversation.</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === user?.id;
            
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    isOwn
                      ? 'bg-pawblue-500 text-white rounded-br-none'
                      : 'glass-card rounded-bl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 glass-card">
        <div className="flex">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button 
            type="submit" 
            className="ml-2 bg-pawblue-500 hover:bg-pawblue-600"
            disabled={!newMessage.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
