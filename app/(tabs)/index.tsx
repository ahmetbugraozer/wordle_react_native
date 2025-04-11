import { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('./home');
    }, 2000);
  
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../../assets/images/icon.png')} 
          style={styles.image}
        />
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
    backgroundColor: '#1F1F1F', // MyColors.backgroundColor
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',  // Ekran genişliğinin %80'i
    height: '40%', // Ekran yüksekliğinin %40'ı
    resizeMode: 'contain',
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