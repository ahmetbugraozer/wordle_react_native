import { Alert } from 'react-native';
import Constants from 'expo-constants';


interface WordValidatorDictionary {
  [key: string]: boolean;
}

// API için tip tanımlamaları
interface ApiResponse {
  word: string;
}

class WordService {
  private static readonly base_url = Constants.expoConfig?.extra?.baseUrl;
  private static readonly api_key = Constants.expoConfig?.extra?.apiKey;

  static async fetchWords(length: number): Promise<string[]> {
    try {
      // API anahtarını kontrol et
      if (!this.api_key || !this.base_url) {
        console.warn('API anahtarı veya base URL eksik, fallback kelimeler kullanılıyor');
        throw new Error('API configuration missing');
      }

      const response = await fetch(`${this.base_url}/L/${length}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': this.api_key as string,
          'x-rapidapi-host': 'random-word-api.p.rapidapi.com'
        }
      });

      if (response.status === 403) {
        console.warn('API quota exceeded or unauthorized, using fallback words');
        throw new Error('API quota exceeded');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const word = data.word.toUpperCase(); // API'den gelen kelimeyi al
      console.log('Fetched Word:', word);
      return [word];

    } catch (error) {
      console.warn('Service Error:', error);
      const backupWords: { [key: number]: string[] } = {
        4: ['WORD', 'PLAY', 'GAME', 'TEST', 'LOVE', 'TIME', 'WORK', 'LIFE', 'HOPE', 'TEAM'],
        5: ['WORLD', 'PLAYS', 'GAMES', 'TESTS', 'LEARN', 'BRAIN', 'HEART', 'SMILE', 'PEACE', 'CHAIR'],
        6: ['WORLDS', 'PLAYER', 'GAMING', 'TESTED', 'BRIDGE', 'FRIEND', 'BOTTLE', 'FLOWER', 'WINTER', 'SUMMER']
      };
      
      const fallbackWords = backupWords[length] || ['BACKUP'];
      const randomIndex = Math.floor(Math.random() * fallbackWords.length);
      console.log('Using fallback word:', fallbackWords[randomIndex]);
      return [fallbackWords[randomIndex]];
    }
  }
}

class WordValidatorService {
  private static isInitialized = false;
  private static actualWord: string = ''; // Cevap kelimesini sakla

  static async initialize(): Promise<void> {
    this.isInitialized = true;
    return Promise.resolve();
  }

  static setActualWord(word: string): void {
    this.actualWord = word;
  }

  static async isValidWord(word: string): Promise<boolean> {
    // Eğer girilen kelime cevap kelimesiyse direkt kabul et
    if (word.toLowerCase() === this.actualWord.toLowerCase()) {
      return true;
    }

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
      return response.ok;
    } catch (error) {
      console.error('Dictionary validation error:', error);
      return true;
    }
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