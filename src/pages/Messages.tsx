
import React from 'react';
import Layout from '@/components/Layout';
import MatchList from '@/components/MatchList';
import { MessageCircle } from 'lucide-react';

const Messages = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <header className="px-4 py-4 glass-card border-b">
          <h1 className="text-2xl font-bold flex items-center">
            <MessageCircle className="text-pawblue-500 mr-2" size={20} />
            Messages
          </h1>
        </header>
        
        <MatchList />
      </div>
    </Layout>
  );
};

export default Messages;
