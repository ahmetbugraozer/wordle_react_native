import { auth, db } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  User
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  Timestamp 
} from 'firebase/firestore';

export interface UserData {
  id: string;
  email: string;
  displayName?: string;
  streak: number;
  lastPlayedAt?: Timestamp;
  gamesPlayed: number;
}

export const AuthService = {
  currentUser: (): User | null => auth.currentUser,

  async register(email: string, password: string, displayName: string): Promise<UserData> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Kullanıcı profil bilgilerini güncelle
      await updateProfile(userCredential.user, { displayName });
      
      // Firestore'da kullanıcı dokümanını oluştur
      const userData: Omit<UserData, 'id'> = {
        email,
        displayName,
        streak: 0,
        gamesPlayed: 0,
        lastPlayedAt: Timestamp.now()
      };

      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, userData);

      return {
        id: userCredential.user.uid,
        ...userData
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message);
    }
  },

  async login(email: string, password: string): Promise<UserData> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    return {
      id: userCredential.user.uid,
      ...userDoc.data()
    } as UserData;
  },

  logout: () => auth.signOut(),

  async canPlayToday(userId: string): Promise<boolean> {
    if (!userId) return true;

    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data() as UserData;
    if (!userData.lastPlayedAt) return true;

    const lastPlayed = userData.lastPlayedAt.toDate();
    const today = new Date();
    return lastPlayed.getDate() !== today.getDate() ||
           lastPlayed.getMonth() !== today.getMonth() ||
           lastPlayed.getFullYear() !== today.getFullYear();
  },

  async updateStreak(userId: string): Promise<void> {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data() as UserData;
    
    const lastPlayed = userData.lastPlayedAt?.toDate() || new Date(0);
    const today = new Date();
    const isConsecutiveDay = (
      lastPlayed.getDate() === today.getDate() - 1 &&
      lastPlayed.getMonth() === today.getMonth() &&
      lastPlayed.getFullYear() === today.getFullYear()
    );

    await setDoc(userRef, {
      ...userData,
      streak: isConsecutiveDay ? userData.streak + 1 : 1,
      gamesPlayed: userData.gamesPlayed + 1,
      lastPlayedAt: Timestamp.now()
    });
  },

  async updateGamesPlayed(userId: string): Promise<void> {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data() as UserData;
    
    await setDoc(userRef, {
      ...userData,
      gamesPlayed: (userData.gamesPlayed || 0) + 1,
    });
  }
};
