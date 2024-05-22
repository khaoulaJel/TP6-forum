// Import Firestore from Firebase
import { projectFirestore } from '@/firebase/Config';

// Define the updateProfile function
export const updateProfile = async (uid, data) => {
  try {
    // Reference to the user's document in Firestore
    const userDocRef = projectFirestore.collection('users').doc(uid);

    // Update the user's document with the new data
    await userDocRef.update(data);

    // Return a success message or handle success as needed
    return 'Profile updated successfully!';
  } catch (error) {
    // Handle errors or return an error message
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
};
