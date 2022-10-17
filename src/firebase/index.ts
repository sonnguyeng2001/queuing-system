import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
   apiKey: 'AIzaSyAgmT1eEIN7uEyeV5ERMoxN5-hvUcDsb7Q',
   authDomain: 'queuing-system-3c2c9.firebaseapp.com',
   projectId: 'queuing-system-3c2c9',
   storageBucket: 'queuing-system-3c2c9.appspot.com',
   messagingSenderId: '719740788802',
   appId: '1:719740788802:web:5887c701daba6d224a0ddb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
