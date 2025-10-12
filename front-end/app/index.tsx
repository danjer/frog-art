import { Text, TouchableOpacity, ImageBackground, StyleSheet, View } from 'react-native';
import PhotoPicker from '../components/PhotoPicker';
import { useRouter } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Home() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/starry_night.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlayContent}>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Frog Art</Text>
        </View>

        <View style={styles.buttonContainer}>
          <PhotoPicker />
          <TouchableOpacity style={styles.cameraBtn} onPress={() => router.navigate('/camera')}>
            <FontAwesome6 name="camera" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayContent: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 50,
    marginRight: 50,
  },
  cameraBtn: {
    backgroundColor: '#2d409c',
    borderRadius: 50,
    padding: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  welcomeText: {
    color: 'white',
    fontSize: 48,
    textAlign: 'center',
  },
});
