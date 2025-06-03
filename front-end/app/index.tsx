import { TouchableOpacity, ImageBackground, StyleSheet, Text, View } from 'react-native';
import PhotoPicker from '../components/PhotoPicker';
import { useRouter } from 'expo-router';
import theme from './style';

export default function Home() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/starry_night.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Overlay View for buttons and other content */}
      <View style={styles.overlayContent}>
        <TouchableOpacity style={theme.button} onPress={() => router.navigate('/camera')}>
          <Text style={theme.buttonText}>Open Camera</Text>
        </TouchableOpacity>
        <PhotoPicker />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Make the background image take up the full available space
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    flex: 1, // Make the overlay content take up the full space of the background image
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
  },
});