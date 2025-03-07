
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import DogForm from '@/components/DogForm';
import { useDogs } from '@/contexts/DogsContext';
import { Dog } from '@/types';

const DogEdit = () => {
  const { dogId } = useParams<{ dogId: string }>();
  const navigate = useNavigate();
  const { userDogs } = useDogs();
  const [dog, setDog] = useState<Dog | undefined>(undefined);
  
  useEffect(() => {
    if (!dogId) {
      navigate('/profile');
      return;
    }
    
    const foundDog = userDogs.find(d => d.id === dogId);
    if (!foundDog) {
      navigate('/profile');
      return;
    }
    
    setDog(foundDog);
  }, [dogId, userDogs]);
  
  if (!dog) {
    return <div>Loading...</div>;
  }
  
  return (
    <Layout>
      <DogForm mode="edit" initialDog={dog} />
    </Layout>
  );
};

export default DogEdit;
