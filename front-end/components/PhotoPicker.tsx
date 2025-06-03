import { useState } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import theme from '../app/style';

export default function PhotoPicker() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={theme.button} onPress={pickImage}>
        <Text style={theme.buttonText}>Photo Library</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // This container might need some styling if you want to control the layout of the
    // button and the image, e.g., if you want the image below the button.
    // flex: 1, // Uncomment if you want this container to take up available space
    alignItems: 'center', // Center content horizontally within PhotoPicker
    justifyContent: 'center', // Center content vertically within PhotoPicker
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20, // Add some space between the button and the image
    borderRadius: 10, // Optional: make image corners rounded
  },
});
