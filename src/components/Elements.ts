// Renk paletimiz
export const colors = {
    appBarColor: 'transparent',
    backgroundColor: '#1F1F1F',
    firstNeutralColor: '#5B5B5B',
    lastResultSemiTrueColor: '#D0C030',
    lastResultTrueColor: '#3D8E40',
    keyboardFalseColor: '#000000',
    white: '#FFFFFF',
    grey: '#808080',
    black: '#000000',
  };
  
  // Text stilleri
  export const textStyles = {
    title: {
      fontSize: 45,
      letterSpacing: 2,
      color: colors.white,
    },
    selection: {
      fontSize: 16,
      color: colors.white,
    },
    letter: {
      fontSize: 30,
      fontWeight: '700' as const,
      color: colors.white,
    },
    result: {
      fontSize: 25,
      color: colors.white,
    },
    resultWord: {
      fontSize: 25,
      color: colors.grey,
    },
    warning: {
      fontSize: 20,
      color: colors.white,
    },
    footer: {
      fontSize: 17,
      fontWeight: '300' as const,
      letterSpacing: 5,
      color: colors.white,
    },
  };
  
  // Sabit metinler
  export const texts = {
    title: 'WORDLE',
    selection: 'Select amount of letter to start playing:',
    gameOver: 'Game Over!',
    resultWin: 'You Won!',
    resultLose: 'You Lose! The word was ',
    restart: 'Restart Game',
    inappropriateWord: 'Please enter a valid word!',
    attemptsRemaining: (attempts: number) => `attempts remaining: ${attempts}`,
    letterCount: (count: string) => `${count} Letters`,
  };
  
  // Genel stil sabitleri
  export const layout = {
    headerHeight: 80,
    footerHeight: 56,
    keyboardHeight: 335,
    wordBoxSize: 60,
    keyboardKeySize: '14%',
  };
  
  // Gölge stilleri
  export const shadows = {
    default: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    light: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 2,
    },
  };
  
  // Genel border radius değerleri
  export const borderRadius = {
    small: 2,
    medium: 4,
    large: 8,
  };
  
  // Spacing değerleri
  export const spacing = {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 25,
  };
  
  // Image paths
  export const images = {
    projectIcon: require('../../assets/images/iconShrink.png'),
    four: require('../../assets/images/Four.jpg'),
    five: require('../../assets/images/Five.jpg'),
    six: require('../../assets/images/Six.jpg'),
  } as const;
  
  // Button stilleri
  export const buttonStyles = {
    primary: {
      backgroundColor: colors.firstNeutralColor,
      padding: spacing.md,
      borderRadius: borderRadius.large,
    },
    text: {
      color: colors.white,
      fontSize: 16,
    },
  };
  
  // Container stilleri
  export const containerStyles = {
    screen: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    centered: {
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
  };
  
  // Animasyon süreleri
  export const animationDurations = {
    short: 200,
    medium: 500,
    long: 800,
  };
  
  // Zindex değerleri
  export const zIndex = {
    base: 0,
    above: 1,
    modal: 100,
    overlay: 99,
  };