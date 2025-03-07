
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Edit2, Plus, LogOut, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Layout from '@/components/Layout';
import { useDogs } from '@/contexts/DogsContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const { userDogs, deleteDog } = useDogs();
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };
  
  const handleDeleteDog = async (dogId: string) => {
    try {
      await deleteDog(dogId);
      toast.success('Dog profile deleted successfully');
    } catch (error) {
      toast.error('Failed to delete dog profile');
      console.error(error);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
        
        <div className="glass-card rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="font-medium w-24">Name:</span>
              <span>{user?.name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24">Email:</span>
              <span>{user?.email}</span>
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Dogs</h2>
            
            {userDogs.length < 3 && (
              <Button 
                onClick={() => navigate('/dogs/create')}
                className="bg-pawblue-500 hover:bg-pawblue-600"
              >
                <Plus size={16} className="mr-2" />
                Add Dog
              </Button>
            )}
          </div>
          
          {userDogs.length === 0 ? (
            <div className="text-center p-8">
              <div className="bg-pawblue-100 text-pawblue-500 rounded-full p-6 inline-block mb-4">
                <PawPrint size={32} />
              </div>
              <h3 className="text-lg font-medium mb-2">No dogs added yet</h3>
              <p className="text-gray-500 mb-4">Add your first dog to get started!</p>
              <Button 
                onClick={() => navigate('/dogs/create')}
                className="bg-pawblue-500 hover:bg-pawblue-600"
              >
                <Plus size={16} className="mr-2" />
                Add Dog
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {userDogs.map(dog => (
                <div key={dog.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={dog.photos[0]} 
                        alt={dog.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://source.unsplash.com/random/300x400?dog,puppy";
                        }}
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold">{dog.name}, {dog.age}</h3>
                      <p className="text-sm text-gray-500">{dog.breed}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => navigate(`/dogs/edit/${dog.id}`)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" className="text-red-500">
                          <Trash2 size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete dog profile?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete {dog.name}'s profile.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteDog(dog.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
