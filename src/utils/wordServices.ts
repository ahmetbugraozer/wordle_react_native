import { Alert } from 'react-native';

interface WordValidatorDictionary {
  [key: string]: boolean;
}

// API için tip tanımlamaları
interface ApiResponse {
  word: string;
}

class WordService {
  private static readonly BASE_URL = 'https://random-word-api.p.rapidapi.com';
  private static readonly API_KEY = '035a90b502msh6551da21d75098fp10121ejsnae6e80cf4ca3';

  static async fetchWords(length: number): Promise<string[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/L/${length}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': this.API_KEY,
          'x-rapidapi-host': 'random-word-api.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const word = data.word.toUpperCase(); // API'den gelen kelimeyi al
      console.log('Fetched Word:', word);
      return [word];

    } catch (error) {
      console.error('Service Error:', error);
      const backupWords: { [key: number]: string[] } = {
        4: ['WORD', 'PLAY', 'GAME', 'TEST'],
        5: ['WORLD', 'PLAYS', 'GAMES', 'TESTS'],
        6: ['WORLDS', 'PLAYER', 'GAMING', 'TESTED']
      };
      
      const fallbackWords = backupWords[length] || ['TEST'];
      const randomIndex = Math.floor(Math.random() * fallbackWords.length);
      return [fallbackWords[randomIndex]];
    }
  }
}

class WordValidatorService {
  private static dictionary: WordValidatorDictionary = {};
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    // Dictionary yükleme işlemini kaldırıyoruz
    // Geçici olarak tüm kelimelere izin vereceğiz
    this.isInitialized = true;
    return Promise.resolve();
  }

  static isValidWord(word: string): boolean {
    // Geçici olarak tüm kelimelere izin ver
    return true;
  }
}

// Yardımcı fonksiyonlar
const wordUtils = {
  // Kelimeyi normalize et (büyük harfe çevir ve özel karakterleri temizle)
  normalizeWord: (word: string): string => {
    return word
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  },

  // Kelimenin geçerli uzunlukta olup olmadığını kontrol et
  isValidLength: (word: string, length: number): boolean => {
    return word.length === length;
  },

  // İki kelime arasındaki benzerliği kontrol et (Wordle mantığı)
  compareWords: (guess: string, actual: string): string => {
    const result: string[] = Array(guess.length).fill('f');
    const actualArr = actual.split('');
    
    // Doğru pozisyondaki harfleri kontrol et
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === actualArr[i]) {
        result[i] = 't';
        actualArr[i] = '*';
      }
    }
    
    // Yanlış pozisyondaki harfleri kontrol et
    for (let i = 0; i < guess.length; i++) {
      if (result[i] === 'f') {
        const index = actualArr.indexOf(guess[i]);
        if (index !== -1) {
          result[i] = 'n';
          actualArr[index] = '*';
        }
      }
    }
    
    return result.join('');
  },

  // Kelime önerisi oluştur (hile modu için)
  generateHint: (word: string, revealed: number): string => {
    return word.substring(0, revealed) + '*'.repeat(word.length - revealed);
  }
};

// Hata tipleri
export enum WordError {
  INVALID_LENGTH = 'INVALID_LENGTH',
  INVALID_WORD = 'INVALID_WORD',
  NETWORK_ERROR = 'NETWORK_ERROR',
  DICTIONARY_ERROR = 'DICTIONARY_ERROR'
}

// Hata yönetimi için custom error class
export class WordServiceError extends Error {
  constructor(
    public type: WordError,
    message: string
  ) {
    super(message);
    this.name = 'WordServiceError';
  }
}

// API response için tip tanımı
export interface WordResponse {
  word: string;
  error?: WordError;
}

export { WordService, WordValidatorService, wordUtils, WordValidatorDictionary };