import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

// Hata ayıklama için environment variables'ları kontrol et
console.log('Environment variables check:');
console.log('Firebase API Key:', Constants.expoConfig?.extra?.firebaseApiKey ? 'Mevcut' : 'Eksik');
console.log('Firebase Project ID:', Constants.expoConfig?.extra?.firebaseProjectId ? 'Mevcut' : 'Eksik');

// Firebase console'dan aldığınız yapılandırma bilgilerini buraya ekleyin
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || 'demo-api-key',
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || 'demo-project.firebaseapp.com',
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || 'demo-project',
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || 'demo-project.appspot.com',
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId || '123456789',
  appId: Constants.expoConfig?.extra?.firebaseAppId || 'demo-app-id',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);