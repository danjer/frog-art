import { useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import theme from '../app/style';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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
      <TouchableOpacity style={styles.libraryBtn} onPress={pickImage}>
	<FontAwesome6 name="paperclip" size={32} color="white" />
        {/* <Text style={theme.buttonText}>Photo Library</Text> */}
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },

  libraryBtn: {
	backgroundColor: '#c3a920',
	borderRadius: '50%',
	padding: '10px',
  },
});
