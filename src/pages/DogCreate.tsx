
import React from 'react';
import Layout from '@/components/Layout';
import DogForm from '@/components/DogForm';

const DogCreate = () => {
  return (
    <Layout>
      <DogForm mode="create" />
    </Layout>
  );
};

export default DogCreate;
