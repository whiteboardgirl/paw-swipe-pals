
export interface User {
  id: string;
  email: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  createdAt: string;
}

export interface Dog {
  id: string;
  ownerId: string;
  name: string;
  age: number;
  breed: string;
  gender: 'male' | 'female';
  bio: string;
  photos: string[];
  createdAt: string;
}

export interface Match {
  id: string;
  dogId1: string;
  dogId2: string;
  createdAt: string;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  text: string;
  createdAt: string;
}
