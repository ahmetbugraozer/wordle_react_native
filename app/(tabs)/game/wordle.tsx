import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Icon from '@expo/vector-icons/MaterialIcons';
import { alphabet } from '../../../src/utils/alphabet';
import { WordService, WordValidatorService } from '../../../src/utils/wordServices';
import { GameLogic } from '../../../src/logic/GameLogic';

type WordBoxProps = {
  word: string;
  boxIndex: number;
  indicator: string[];
  gameIndex: number;
};

const WordBox = ({ word, boxIndex, indicator, gameIndex }: WordBoxProps) => {
  const getBoxColor = () => {
    if (indicator[gameIndex]?.length >= boxIndex + 1) {
      switch (indicator[gameIndex][boxIndex]) {
        case 't': return '#3D8E40'; // lastResultTrueColor
        case 'n': return '#D0C030'; // lastResultSemiTrueColor
        case 'f': return '#5B5B5B'; // firstNeutralColor
        default: return '#5B5B5B';
      }
    }
    return '#5B5B5B';
  };

  return (
    <View style={[styles.wordBox, { backgroundColor: getBoxColor() }]}>
      <Text style={styles.letterText}>
        {word.length >= boxIndex + 1 ? word[boxIndex] : ''}
      </Text>
    </View>
  );
};

const LetterBox = ({ 
  letter, 
  isProcessed = false, 
  isTrue = false, 
  isNeutral = false, 
  isTransparent = false,
  onPress 
}: {
  letter: string;
  isProcessed?: boolean;
  isTrue?: boolean;
  isNeutral?: boolean;
  isTransparent?: boolean;
  onPress?: () => void;
}) => {
  const getBackgroundColor = () => {
    if (isTransparent) return 'transparent';
    if (isProcessed) {
      if (isTrue) return '#3D8E40';
      if (isNeutral) return '#D0C030';
      return '#000000';
    }
    return '#5B5B5B';
  };

  return (
    <TouchableOpacity 
      style={[styles.letterBox, { backgroundColor: getBackgroundColor() }]}
      onPress={onPress}
      disabled={isTransparent || !onPress}
    >
      <Text style={styles.letterText}>{letter}</Text>
    </TouchableOpacity>
  );
};

export default function WordlePage() {
  const router = useRouter();
  const { wordLength } = useLocalSearchParams();
  const [gameLogic, setGameLogic] = useState<GameLogic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [, forceUpdate] = useState({});

  const initializeGame = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      await WordValidatorService.initialize();
      const word = await WordService.fetchWords(Number(wordLength));
      
      const newGameLogic = new GameLogic(Number(wordLength), word);
      newGameLogic.initializeGame();
      setGameLogic(newGameLogic);
      setIsLoading(false);
    } catch (error) {
      console.error('Initialize Game Error:', error);
      setIsLoading(false);
      setErrorMessage('Failed to load word. Please try again.');
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (errorMessage || !gameLogic) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMessage}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={initializeGame}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleLetterPress = (letter: string) => {
    gameLogic.addLetter(letter);
    forceUpdate({});
  };

  const handleDelete = () => {
    gameLogic.deleteLetter();
    forceUpdate({});
  };

  const handleEnter = async () => {
    await gameLogic.enter();
    forceUpdate({});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={initializeGame}>
          <Icon name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.gameBoard}>
        {!gameLogic.continueStatus && (
          <Text style={styles.warningText}>Please enter a valid word!</Text>
        )}
        
        {Array(GameLogic.maxAttempts).fill(0).map((_, i) => (
          <View key={i} style={styles.row}>
            {gameLogic.gameIndex >= i &&
              Array(Number(wordLength)).fill(0).map((_, j) => (
                <WordBox
                  key={j}
                  word={gameLogic.wordsEntered[i]}
                  boxIndex={j}
                  indicator={gameLogic.backgrounds}
                  gameIndex={i}
                />
              ))}
          </View>
        ))}
      </View>

      {!gameLogic.gameFinished ? (
        <View style={styles.keyboard}>
          <Text style={styles.attemptsText}>
            attempts remaining: {4 - gameLogic.gameIndex}
          </Text>
          
          <View style={styles.keyboardGrid}>
            {alphabet.map((letter, index) => (
              <View key={index} style={styles.keyWrapper}>
                {letter === " " ? (
                  <LetterBox letter="" isTransparent />
                ) : (
                  <LetterBox
                    letter={letter}
                    isProcessed={gameLogic.wrongLetters.includes(letter) || 
                               gameLogic.neutralLetters.includes(letter) || 
                               gameLogic.trueLetters.includes(letter)}
                    isTrue={gameLogic.trueLetters.includes(letter)}
                    isNeutral={gameLogic.neutralLetters.includes(letter) && 
                              !gameLogic.trueLetters.includes(letter)}
                    onPress={() => handleLetterPress(letter)}
                  />
                )}
              </View>
            ))}
          </View>

          <View style={styles.operatorButtons}>
            <TouchableOpacity
              style={styles.operatorButton}
              onPress={handleDelete}
            >
              <Icon name="backspace" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.operatorButton}
              onPress={handleEnter}
            >
              <Icon name="subdirectory-arrow-left" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.gameOver}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          {gameLogic.gameResult ? (
            <Text style={styles.resultText}>You Won!</Text>
          ) : (
            <View style={styles.loseTextContainer}>
              <Text style={styles.resultText}>You Lose! The word was </Text>
              <Text style={styles.actualWordText}>{gameLogic.actualWord}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.restartButton}
            onPress={initializeGame}
          >
            <Text style={styles.restartText}>Restart Game</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  header: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  gameBoard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  wordBox: {
    height: 60,
    width: 60,
    margin: 3,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  keyboard: {
    height: 335,
    padding: 10,
  },
  keyboardGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyWrapper: {
    width: '14%',
    aspectRatio: 1,
    padding: 2,
  },
  letterBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  operatorButtons: {
    flexDirection: 'row',
    height: 50,
    marginTop: 10,
  },
  operatorButton: {
    flex: 1,
    margin: 5,
    backgroundColor: '#5B5B5B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  letterText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  attemptsText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  warningText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  gameOver: {
    height: 335,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 45,
    color: 'white',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 25,
    color: 'white',
  },
  loseTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actualWordText: {
    fontSize: 25,
    color: 'grey',
  },
  restartButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#5B5B5B',
    borderRadius: 8,
  },
  restartText: {
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#5B5B5B',
    borderRadius: 5,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
  },
});