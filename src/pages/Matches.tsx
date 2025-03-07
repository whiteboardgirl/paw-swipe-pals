
import React from 'react';
import Layout from '@/components/Layout';
import MatchList from '@/components/MatchList';
import { PawPrint } from 'lucide-react';

const Matches = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <header className="px-4 py-4 glass-card border-b">
          <h1 className="text-2xl font-bold flex items-center">
            <PawPrint className="text-pawblue-500 mr-2" size={20} />
            Your Matches
          </h1>
        </header>
        
        <MatchList />
      </div>
    </Layout>
  );
};

export default Matches;
