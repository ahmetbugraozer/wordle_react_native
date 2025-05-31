import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, textStyles, layout, shadows, images } from './Elements';

// Project Title Component
export const ProjectTitle: React.FC = () => {
  return (
    <View style={styles.projectTitle}>
      <Image 
        source={images.projectIcon}
        style={styles.titleImage}
      />
    </View>
  );
};

// Game Selection Button Component
interface GameSelectionButtonProps {
  letterAmount: string;
  onPress: () => void;
}

export const GameSelectionButton: React.FC<GameSelectionButtonProps> = ({ 
  letterAmount, 
  onPress 
}) => {
  const imagePath = {
    'Four': images.four,
    'Five': images.five,
    'Six': images.six,
  }[letterAmount];

  return (
    <TouchableOpacity 
      style={styles.selectionButton} 
      onPress={onPress}
    >
      <Image 
        source={imagePath} 
        style={styles.selectionImage}
      />
      <View style={styles.selectionTextContainer}>
        <Text style={styles.selectionButtonText}>
          {`${letterAmount} Letters`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Word Box Component
interface WordBoxProps {
  word: string;
  boxIndex: number;
  indicator: string[];
  gameIndex: number;
}

export const WordBox: React.FC<WordBoxProps> = ({
  word,
  boxIndex,
  indicator,
  gameIndex,
}) => {
  const getBoxColor = () => {
    if (indicator[gameIndex]?.length >= boxIndex + 1) {
      switch (indicator[gameIndex][boxIndex]) {
        case 't': return colors.lastResultTrueColor;
        case 'n': return colors.lastResultSemiTrueColor;
        case 'f': return colors.firstNeutralColor;
        default: return colors.firstNeutralColor;
      }
    }
    return colors.firstNeutralColor;
  };

  return (
    <View style={[styles.wordBox, { backgroundColor: getBoxColor() }]}>
      <Text style={styles.letterText}>
        {word.length >= boxIndex + 1 ? word[boxIndex] : ''}
      </Text>
    </View>
  );
};

// Operator Button Component
interface OperatorButtonProps {
  operator: 'backspace' | 'enter';
  onPress: () => void;
}

export const OperatorButton: React.FC<OperatorButtonProps> = ({ 
  operator, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.operatorButton}
      onPress={onPress}
    >
      <MaterialIcons 
        name={operator === 'backspace' ? 'backspace' : 'subdirectory-arrow-left'} 
        size={24} 
        color={colors.white} 
      />
    </TouchableOpacity>
  );
};

// Letter Box Component
interface LetterBoxProps {
  letter: string;
  isProcessed?: boolean;
  isTrue?: boolean;
  isNeutral?: boolean;
  isTransparent?: boolean;
  onPress?: () => void;
}

export const LetterBox: React.FC<LetterBoxProps> = ({
  letter,
  isProcessed = false,
  isTrue = false,
  isNeutral = false,
  isTransparent = false,
  onPress,
}) => {
  const getBackgroundColor = () => {
    if (isTransparent) return 'transparent';
    if (isProcessed) {
      if (isTrue) return colors.lastResultTrueColor;
      if (isNeutral) return colors.lastResultSemiTrueColor;
      return colors.keyboardFalseColor;
    }
    return colors.firstNeutralColor;
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

// Game Over Screen Component
interface GameOverScreenProps {
  gameResult: boolean;
  actualWord?: string;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  gameResult,
  actualWord,
  onRestart,
}) => {
  return (
    <View style={styles.gameOverContainer}>
      <Text style={styles.gameOverText}>Game Over!</Text>
      {gameResult ? (
        <Text style={styles.resultText}>You Won!</Text>
      ) : (
        <View style={styles.loseTextContainer}>
          <Text style={styles.resultText}>You Lose! The word was </Text>
          <Text style={styles.actualWordText}>{actualWord}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.restartButton}
        onPress={onRestart}
      >
        <Text style={styles.restartText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  projectTitle: {
    height: layout.headerHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImage: {
    height: 90,
    width: 180,
    resizeMode: 'contain',
  },
  selectionButton: {
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    ...shadows.default,
  },
  selectionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selectionTextContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  selectionButtonText: {
    ...textStyles.title,
  },
  wordBox: {
    height: layout.wordBoxSize,
    width: layout.wordBoxSize,
    margin: 3,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.default,
  },
  letterBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    ...shadows.light,
  },
  letterText: {
    ...textStyles.letter,
  },
  operatorButton: {
    flex: 1,
    backgroundColor: colors.firstNeutralColor,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 4,
    ...shadows.light,
  },
  gameOverContainer: {
    height: layout.keyboardHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    ...textStyles.title,
    marginBottom: 20,
  },
  resultText: {
    ...textStyles.result,
  },
  loseTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actualWordText: {
    ...textStyles.resultWord,
  },
  restartButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: colors.firstNeutralColor,
    borderRadius: 8,
    ...shadows.light,
  },
  restartText: {
    ...textStyles.selection,
  },
});