// Oyunda kullanılacak alfabe dizisi
export const alphabet: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', ' ', 'Q', 'W', 'X', 'Y',
    'Z', ' '
  ];
  
  // Klavye düzeni için satır bazlı alfabe (isteğe bağlı kullanım için)
  export const keyboardLayout = {
    topRow: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    middleRow: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    bottomRow: ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  };
  
  // Türkçe karakter dönüşümleri için yardımcı fonksiyon (isteğe bağlı kullanım için)
  export const normalizeChar = (char: string): string => {
    const charMap: { [key: string]: string } = {
      'Ç': 'C',
      'Ğ': 'G',
      'İ': 'I',
      'Ö': 'O',
      'Ş': 'S',
      'Ü': 'U',
      'ç': 'c',
      'ğ': 'g',
      'ı': 'i',
      'ö': 'o',
      'ş': 's',
      'ü': 'u'
    };
    return charMap[char] || char.toUpperCase();
  };
  
  // Harflerin puan değerleri (isteğe bağlı kullanım için)
  export const letterScores: { [key: string]: number } = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4,
    'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3,
    'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8,
    'Y': 4, 'Z': 10
  };
  
  // Harf frekansları (isteğe bağlı kullanım için)
  export const letterFrequencies: { [key: string]: number } = {
    'A': 8.2, 'B': 1.5, 'C': 2.8, 'D': 4.3, 'E': 13, 'F': 2.2, 'G': 2.0,
    'H': 6.1, 'I': 7.0, 'J': 0.15, 'K': 0.77, 'L': 4.0, 'M': 2.4, 'N': 6.7,
    'O': 7.5, 'P': 1.9, 'Q': 0.095, 'R': 6.0, 'S': 6.3, 'T': 9.1, 'U': 2.8,
    'V': 0.98, 'W': 2.4, 'X': 0.15, 'Y': 2.0, 'Z': 0.074
  };
  
  // Alfabe ile ilgili yardımcı fonksiyonlar
  export const alphabetUtils = {
    // Harfin alfabede olup olmadığını kontrol eder
    isValidLetter: (letter: string): boolean => {
      return alphabet.includes(letter.toUpperCase());
    },
  
    // Verilen stringdeki tüm harflerin geçerli olup olmadığını kontrol eder
    isValidWord: (word: string): boolean => {
      return word.split('').every(letter => alphabetUtils.isValidLetter(letter));
    },
  
    // Boşluk karakteri olup olmadığını kontrol eder
    isSpace: (letter: string): boolean => {
      return letter === ' ';
    },
  
    // Harfin klavyedeki konumunu bulur
    getKeyboardPosition: (letter: string): string => {
      if (keyboardLayout.topRow.includes(letter)) return 'top';
      if (keyboardLayout.middleRow.includes(letter)) return 'middle';
      if (keyboardLayout.bottomRow.includes(letter)) return 'bottom';
      return 'unknown';
    }
  };
  
  export default alphabet;