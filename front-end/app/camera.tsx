import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import theme from './style';


export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null); // State to store the taken photo URI
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    // hide the header when using camera
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/react-logo.png')}/>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      console.log('Photo taken:', photo.uri);
    }
  };

  const retakePhoto = () => {
    setPhotoUri(null); // Clear the photo URI to show the camera again
  };

  const confirmPhotoAndSend = async () => {
    if (!photoUri) {
      Alert.alert('Error', 'No photo to send.');
      return;
    }

    try {
      // Expo neemt foto van device en convert naar base64
      const base64 = await FileSystem.readAsStringAsync(photoUri, { encoding: FileSystem.EncodingType.Base64 });

      const data = {
        image: `data:image/jpeg;base64,${base64}`,
      };

      console.log('Sending photo to API...', data);
      router.navigate('/');
      const response = await fetch('http://localhost:8001/api/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Photo uploaded successfully:', result);
        Alert.alert('Success', 'Photo uploaded successfully!');
        setPhotoUri(null); // Clear photo URI
        router.navigate('/'); // Example: navigate back home
      } else {
        // Als het naar de klote gaat
        const errorData = await response.text();
        console.error('Failed to upload photo:', response.status, errorData);
        Alert.alert('Error', `Failed to upload photo: ${response.status} - ${errorData}`);
        router.navigate('/');
      }
    } catch (error) {
      console.error('Error sending photo:', error);
      Alert.alert('Error', 'An error occurred while sending the photo.');
    }
  };

  // Render taken photo, or camera UI
  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={theme.button} onPress={retakePhoto}>
              <Text style={styles.text}>Retake Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={theme.button} onPress={confirmPhotoAndSend}>
              <Text style={styles.text}>Confirm Photo</Text>
            </TouchableOpacity>

          </View>
        </View>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={theme.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={theme.button} onPress={takePhoto}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={theme.button} onPress={() => router.navigate('/')}>
              <Text style={styles.cameraText}>Close Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 64,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  button: {
    flex: 0.5,
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
  },
  cameraText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    margin: 'auto',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});