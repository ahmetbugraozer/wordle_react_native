import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs, Timestamp, DocumentData } from 'firebase/firestore';

interface GameResult {
  word: string;
  attempts: number;
  success: boolean;
  date: Date;
}

interface GameResultDoc extends DocumentData {
  id: string;
  userId: string;
  word: string;
  attempts: number;
  success: boolean;
  date: Date;
  timestamp: Date;
}

export const FirebaseService = {
  // Oyun sonuçlarını kaydet
  saveGameResult: async (userId: string, result: GameResult) => {
    try {
      await addDoc(collection(db, 'game_results'), {
        userId,
        ...result,
        timestamp: Timestamp.fromDate(new Date())
      });
    } catch (error) {
      console.error('Error saving game result:', error);
    }
  },

  // Kullanıcının istatistiklerini getir
  getUserStats: async (userId: string): Promise<GameResultDoc[]> => {
    try {
      const q = query(collection(db, 'game_results'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GameResultDoc[];
    } catch (error) {
      console.error('Error getting user stats:', error);
      return [];
    }
  }
};
