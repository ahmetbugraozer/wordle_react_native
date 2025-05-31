import { Stack } from 'expo-router';
import { AuthProvider } from '../../src/contexts/AuthContext';

export default function Layout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="game/wordle" />
      </Stack>
    </AuthProvider>
  );
}