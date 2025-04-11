import { WordValidatorService } from '../utils/wordServices';

export class GameLogic {
  static readonly maxAttempts: number = 5;

  private wordLength: number;
  private wordList: string[];
  public actualWord: string;
  public gameIndex: number;
  public wordsEntered: string[];
  public backgrounds: string[];
  public gameFinished: boolean;
  public gameResult: boolean;
  public continueStatus: boolean;
  public trueLetters: string;
  public neutralLetters: string;
  public wrongLetters: string;

  constructor(wordLength: number, wordList: string[]) {
    this.wordLength = wordLength;
    this.wordList = wordList;
    this.actualWord = '';
    this.gameIndex = 0;
    this.wordsEntered = [];
    this.backgrounds = [];
    this.gameFinished = false;
    this.gameResult = false;
    this.continueStatus = true;
    this.trueLetters = '';
    this.neutralLetters = '';
    this.wrongLetters = '';
  }

  public initializeGame(): void {
    this.actualWord = this.wordList[0];
    WordValidatorService.setActualWord(this.actualWord); // Kelimeyi validator'a bildir
    console.log('Debug - Actual Word:', this.actualWord);
    this.gameIndex = 0;
    this.trueLetters = '';
    this.neutralLetters = '';
    this.wrongLetters = '';
    this.wordsEntered = Array(GameLogic.maxAttempts).fill('');
    this.backgrounds = Array(GameLogic.maxAttempts).fill('');
    this.gameFinished = false;
    this.gameResult = false;
    this.continueStatus = true;
  }

  public addLetter(letter: string): void {
    if (this.gameFinished) return;
    if (this.wordsEntered[this.gameIndex].length < this.wordLength) {
      this.wordsEntered[this.gameIndex] += letter;
    }
  }

  public deleteLetter(): void {
    if (this.gameFinished) return;
    if (this.wordsEntered[this.gameIndex].length > 0) {
      this.wordsEntered[this.gameIndex] = this.wordsEntered[this.gameIndex]
        .substring(0, this.wordsEntered[this.gameIndex].length - 1);
    }
  }

  private evaluateAndChangeBackgrounds(): void {
    const tempWord: string[] = this.actualWord.split('');
    const currentWord: string = this.wordsEntered[this.gameIndex];
    let result: string = '';

    // İlk geçiş: Tam eşleşmeleri kontrol et
    for (let i = 0; i < this.wordLength; i++) {
      if (currentWord[i] === tempWord[i]) {
        result += 't';
        tempWord[i] = '*';
        this.trueLetters += currentWord[i];
      } else {
        result += 'x';
      }
    }

    // İkinci geçiş: Yanlış pozisyondaki harfleri kontrol et
    for (let i = 0; i < this.wordLength; i++) {
      if (result[i] === 'x') {
        const indexInTemp = tempWord.indexOf(currentWord[i]);
        if (indexInTemp !== -1) {
          result = result.substring(0, i) + 'n' + result.substring(i + 1);
          tempWord[indexInTemp] = '*';
          this.neutralLetters += currentWord[i];
        } else {
          result = result.substring(0, i) + 'f' + result.substring(i + 1);
          if (!this.neutralLetters.includes(currentWord[i]) &&
              !this.trueLetters.includes(currentWord[i])) {
            this.wrongLetters += currentWord[i];
          }
        }
      }
    }

    this.backgrounds[this.gameIndex] = result;
  }
  public async enter(): Promise<void> {
    if (this.gameFinished || 
        this.wordsEntered[this.gameIndex].length !== this.wordLength) {
      return;
    }
  
    // Kelime kontrolü
    const isValid = await WordValidatorService.isValidWord(this.wordsEntered[this.gameIndex]);
    if (!isValid) {
      this.continueStatus = false;
      return;
    }
  
    this.evaluateAndChangeBackgrounds();
    this.continueStatus = true;
  
    // Oyun durumunu kontrol et
    if (this.backgrounds[this.gameIndex] === 't'.repeat(this.wordLength)) {
      this.gameFinished = true;
      this.gameResult = true;
    } else if (this.gameIndex === GameLogic.maxAttempts - 1) {
      this.gameFinished = true;
      this.gameResult = false;
    } else {
      this.gameIndex++;
    }
  }

  public restartGame(): void {
    this.initializeGame();
  }

  // Yardımcı metodlar
  public getRemainingAttempts(): number {
    return GameLogic.maxAttempts - this.gameIndex - 1;
  }

  public getCurrentWord(): string {
    return this.wordsEntered[this.gameIndex];
  }

  public isGameOver(): boolean {
    return this.gameFinished;
  }

  public isWordComplete(): boolean {
    return this.wordsEntered[this.gameIndex].length === this.wordLength;
  }

  public getLetterStatus(letter: string): {
    isProcessed: boolean;
    isTrue: boolean;
    isNeutral: boolean;
  } {
    return {
      isProcessed: this.wrongLetters.includes(letter) || 
                  this.neutralLetters.includes(letter) || 
                  this.trueLetters.includes(letter),
      isTrue: this.trueLetters.includes(letter),
      isNeutral: this.neutralLetters.includes(letter) && 
                 !this.trueLetters.includes(letter)
    };
  }
}

// Oyun durumu için tip tanımlamaları
export interface GameState {
  wordLength: number;
  currentAttempt: number;
  wordsEntered: string[];
  backgrounds: string[];
  gameFinished: boolean;
  gameResult: boolean;
  trueLetters: string;
  neutralLetters: string;
  wrongLetters: string;
}

// Hata tipleri
export enum GameError {
  INVALID_WORD = 'INVALID_WORD',
  WORD_TOO_SHORT = 'WORD_TOO_SHORT',
  WORD_TOO_LONG = 'WORD_TOO_LONG',
  GAME_OVER = 'GAME_OVER'
}

// Oyun sonucu için tip tanımlaması
export interface GameResult {
  success: boolean;
  attempts: number;
  word: string;
  score: number;
}