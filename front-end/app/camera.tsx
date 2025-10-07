import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, Alert, Platform} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import theme from './style';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null); // State to store the taken photo URI
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
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
 	const photo = await cameraRef.current.takePictureAsync({
            base64: true, // Request base64 data for all platforms
	    quality: 0.8,
	});
      //const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      setPhotoBase64(photo.base64); // this is needed for web dev
      console.log('Photo taken:', photo.uri);
    }
  };

  const retakePhoto = () => {
    setPhotoUri(null); // Clear the photo URI to show the camera again
    setPhotoBase64(null);
  };

  const confirmPhotoAndSend = async () => {
    if (!photoUri) {
      Alert.alert('Error', 'No photo to send.');
      return;
    }

    let base64Data = photoBase64;

    if (Platform.OS !== 'web' && !base64Data) {
        try {
	// This is safe because it only runs on native (iOS/Android)
	base64Data = await FileSystem.readAsStringAsync(photoUri, { 
	    encoding: FileSystem.EncodingType.Base64 
	});
    } catch (e) {
	console.error('Error reading file on native:', e);
	Alert.alert('Error', 'Could not read photo file.');
	return;
    }
        }
        
        if (!base64Data) {
            Alert.alert('Error', 'Base64 image data could not be generated.');
            return;
        }

    try {
      // Expo neemt foto van device en convert naar base64
      //const base64 = await FileSystem.readAsStringAsync(photoUri, { encoding: FileSystem.EncodingType.Base64 });

      const data = {
	image: base64Data, 
        //image: `data:image/jpeg;base64,${base64}`,
      };

      console.log('Sending photo to API...', data);
      const response = await fetch('http://localhost:8000/api/compare-art', {
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
	setPhotoBase64(null);

    	router.navigate({
            pathname: '/result',
            params: { 
                imageUrls: JSON.stringify(result) // Pass the array as a JSON string
            }
	});

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
            <TouchableOpacity style={styles.navButton} onPress={retakePhoto}>
		<FontAwesome6 name="arrow-left" size={40} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={confirmPhotoAndSend}>
		<FontAwesome6 name="circle-check" size={40} color="white" />
            </TouchableOpacity>

          </View>
        </View>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/')}>
	<FontAwesome6 name="arrow-left" size={40} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={toggleCameraFacing}>
		<FontAwesome6 name="arrows-rotate" size={40} color="white" />
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
  cameraButton: {
    width: 75,
    height: 75,
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 3,
    boxShadow: '0px 0px 0px 2px black inset',
  },
  navButton: {
    width: 50,
    height: 50,
    flex: 0.5,
    marginBottom: 40,
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rotateIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
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
