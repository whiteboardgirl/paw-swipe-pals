
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useDogs } from '@/contexts/DogsContext';
import { toast } from 'sonner';
import { Dog } from '@/types';

interface DogFormProps {
  initialDog?: Dog;
  mode: 'create' | 'edit';
}

const DogForm = ({ initialDog, mode }: DogFormProps) => {
  const navigate = useNavigate();
  const { createDog, updateDog } = useDogs();
  
  const [name, setName] = useState(initialDog?.name || '');
  const [age, setAge] = useState(initialDog?.age.toString() || '');
  const [breed, setBreed] = useState(initialDog?.breed || '');
  const [gender, setGender] = useState<'male' | 'female'>(initialDog?.gender || 'male');
  const [bio, setBio] = useState(initialDog?.bio || '');
  const [photos, setPhotos] = useState<string[]>(initialDog?.photos || []);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAddPhoto = () => {
    // For demo purposes, we'll add a random dog photo from Unsplash
    const newPhoto = `https://source.unsplash.com/featured/300x400?dog,puppy&sig=${Date.now()}`;
    setPhotos([...photos, newPhoto]);
  };
  
  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !age || !breed || !bio || photos.length === 0) {
      toast.error('Please fill in all fields and add at least one photo');
      return;
    }
    
    try {
      setIsLoading(true);
      
      if (mode === 'create') {
        await createDog({
          name,
          age: parseInt(age),
          breed,
          gender,
          bio,
          photos
        });
        
        toast.success('Dog profile created successfully!');
        navigate('/');
      } else if (initialDog) {
        await updateDog(initialDog.id, {
          name,
          age: parseInt(age),
          breed,
          gender,
          bio,
          photos
        });
        
        toast.success('Dog profile updated successfully!');
        navigate('/profile');
      }
    } catch (error) {
      toast.error(mode === 'create' ? 'Failed to create dog profile' : 'Failed to update dog profile');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="flex items-center justify-center mb-6">
        <PawPrint className="text-pawblue-500" size={32} />
        <h1 className="text-3xl font-bold ml-2">
          {mode === 'create' ? 'Add Your Dog' : 'Edit Dog Profile'}
        </h1>
      </div>
      
      <div className="glass-card rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="photos" className="block text-sm font-medium">
              Photos
            </label>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={photo} 
                    alt={`Dog ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {photos.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-pawblue-400 transition-colors"
                >
                  <Camera size={24} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              placeholder="Your dog's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-medium">
                Age
              </label>
              <Input
                id="age"
                type="number"
                placeholder="Years"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="0"
                max="20"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-medium">
                Gender
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="form-radio text-pawblue-500"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="form-radio text-pawblue-500"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="breed" className="block text-sm font-medium">
              Breed
            </label>
            <Input
              id="breed"
              placeholder="Dog breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="bio" className="block text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              placeholder="Tell us about your dog..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-pawblue-500 hover:bg-pawblue-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'create' ? 'Creating...' : 'Updating...'}
              </>
            ) : (
              mode === 'create' ? 'Create Dog Profile' : 'Update Dog Profile'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DogForm;
