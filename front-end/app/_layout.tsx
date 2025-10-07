import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Welcome' }} />
      <Stack.Screen name="camera" options={{ headerShown: false }} />
      <Stack.Screen name="result" options={{ }} />
    </Stack>
  );
}
