import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import * as Linking from 'expo-linking';
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { colors } from './Elements';

interface ResultModalProps {
  visible: boolean;
  won: boolean;
  answer: string;
  guesses: string[];
  onClose: () => void;
}

export default function ResultModal({ visible, won, answer, guesses, onClose }: ResultModalProps) {
  const generateShareText = () => {
    const emoji = won ? '🎉' : '😔';
    const header = `Wordle ${emoji}\nKelime: ${answer}\n\n`;
    const guessEmojis = guesses
      .map(guess => {
        return guess
          .split('')
          .map(letter => (letter === answer[guess.indexOf(letter)] ? '🟩' : letter === '' ? '⬜' : '🟨'))
          .join('');
      })
      .join('\n');
    return header + guessEmojis;
  };

  const copyToClipboard = async () => {
    await Share.share({
      message: generateShareText()
    });
  };

  const shareToWhatsApp = () => {
    Linking.openURL(`whatsapp://send?text=${encodeURIComponent(generateShareText())}`);
  };

  const shareToTwitter = () => {
    Linking.openURL(`https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareText())}`);
  };

  const shareGeneral = async () => {
    await Share.share({
      message: generateShareText(),
      title: 'Wordle Sonucum'
    });
  };

  return (
    <Modal 
      visible={visible} 
      animationType="slide" 
      transparent
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.container} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <TouchableOpacity 
          style={styles.modal} 
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={styles.title}>{won ? 'Congratulations!' : 'You Lost!'}</Text>
          <Text style={styles.message}>Word: {answer}</Text>
          
          <View style={styles.shareSection}>
            <Text style={styles.shareTitle}>Share your result:</Text>
            
            <View style={styles.shareButtonsRow}>
              <TouchableOpacity 
                style={[styles.shareButton, styles.whatsappButton]} 
                onPress={shareToWhatsApp}
              >
                <FontAwesome name="whatsapp" size={24} color="white" />
                <Text style={styles.shareButtonText}>WhatsApp</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.shareButton, styles.twitterButton]} 
                onPress={shareToTwitter}
              >
                <FontAwesome name="twitter" size={24} color="white" />
                <Text style={styles.shareButtonText}>X</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.shareButtonsRow}>
              <TouchableOpacity 
                style={[styles.shareButton, styles.copyButton]} 
                onPress={copyToClipboard}
              >
                <MaterialCommunityIcons name="content-copy" size={24} color="white" />
                <Text style={styles.shareButtonText}>Copy</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.shareButton, styles.shareGeneralButton]} 
                onPress={shareGeneral}
              >
                <Ionicons name="share-social" size={24} color="white" />
                <Text style={styles.shareButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#2F2F2F', // Değiştirildi: koyu gri arka plan
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  shareSection: {
    marginVertical: 20,
  },
  shareTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  shareButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  twitterButton: {
    backgroundColor: '#1DA1F2',
  },
  copyButton: {
    backgroundColor: '#6e6e6e',
  },
  shareGeneralButton: {
    backgroundColor: '#538d4e',
  },
  closeButton: {
    backgroundColor: '#787c7e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
