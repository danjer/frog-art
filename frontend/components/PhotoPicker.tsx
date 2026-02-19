import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';

const API_URL = 'http://localhost:80/api/compare-art';

export default function PhotoPicker() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (pickerResult.canceled) return;

    const asset = pickerResult.assets[0];
    let base64Data = asset.base64;

    if (!base64Data && asset.uri) {
      try {
        base64Data = await FileSystem.readAsStringAsync(asset.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      } catch (e) {
        Alert.alert('Error', 'Could not read image file.');
        return;
      }
    }

    if (!base64Data) {
      Alert.alert('Error', 'Could not get image data.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Data }),
      });

      if (response.ok) {
        const data = await response.json();
        router.navigate({
          pathname: '/result',
          params: { imageUrls: JSON.stringify(data) },
        });
      } else {
        const errorData = await response.text();
        Alert.alert('Error', `Failed to upload photo: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while sending the photo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.libraryBtn} onPress={pickImage} disabled={isLoading}>
        {isLoading
          ? <ActivityIndicator color="white" size="small" />
          : <FontAwesome6 name="paperclip" size={32} color="white" />
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  libraryBtn: {
    backgroundColor: '#c3a920',
    borderRadius: 50,
    padding: 20,
  },
});
