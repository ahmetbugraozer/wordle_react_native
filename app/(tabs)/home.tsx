import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

// Görselleri statik olarak import edelim
const images = {
  'Four': require('../../assets/images/Four.jpg'),
  'Five': require('../../assets/images/Five.jpg'),
  'Six': require('../../assets/images/Six.jpg'),
} as const;

type SelectionButtonProps = {
  letterAmount: string;
  onPress: () => void;
};

const GameSelectionButton = ({ letterAmount, onPress }: SelectionButtonProps) => {
  return (
    <TouchableOpacity style={styles.selectionButton} onPress={onPress}>
      <Image 
        source={images[letterAmount as keyof typeof images]}
        style={styles.selectionImage}
      />
      <View style={styles.selectionTextOverlay}>
        <Text style={styles.selectionButtonText}>
          {`${letterAmount} Letters`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Home() {
  const router = useRouter();
  const selections = ["Four", "Five", "Six"];

  const getWordLength = (selection: string): number => {
    switch (selection) {
      case "Four": return 4;
      case "Five": return 5;
      case "Six": return 6;
      default: return 4;
    }
  };

  return (
    <View style={styles.container}>
  <View style={styles.header}>
    <Image 
      source={require('../../assets/images/iconShrink.png')}
      style={styles.headerImage}
    />
  </View>

  <View style={styles.content}>
    <View style={styles.textContainer}>
      <Text style={styles.selectionText}>
        Select amount of letter to start playing:
      </Text>
    </View>

    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false} // Scroll bar'ı gizleyelim
    >
      {selections.map((selection) => (
        <GameSelectionButton
          key={selection}
          letterAmount={selection}
          onPress={() => router.push(`./game/wordle?wordLength=${getWordLength(selection)}`)}
        />
      ))}
    </ScrollView>
  </View>

    <View style={styles.footer}>
      <Text style={styles.footerText}>AXEON</Text>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Header ile content arasında boşluk
  },
  headerImage: {
    height: 60, // Header görselini biraz küçültelim
    width: 120,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textContainer: {
    marginBottom: 30, // Text ile scroll view arasında boşluk
  },
  selectionText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  scrollView: {
    flex: 2, // ScrollView'ın flex değerini 1 yapalım
  },
  scrollViewContent: {
    paddingVertical: 20, // Dikey padding ekleyelim
  },
  selectionButton: {
    height: 180, // Button yüksekliğini azaltalım
    marginVertical: 10, // Buttonlar arası mesafeyi azaltalım
    borderRadius: 10,
    overflow: 'hidden',
  },
  selectionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selectionTextOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Yarı saydam arka plan
    padding: 10,
  },
  selectionButtonText: {
    fontSize: 35,
    color: 'white',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Text gölgesi
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  footer: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 17,
    fontWeight: '300',
    letterSpacing: 5,
    color: 'white',
  },
});