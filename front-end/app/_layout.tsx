import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* The 'index' route will be your default/home screen */}
      <Stack.Screen name="index" options={{ title: 'Welcome' }} />
      {/* The 'camera' route will be your camera screen */}
      <Stack.Screen name="camera" options={{ headerShown: false }} />
    </Stack>
  );
}