import React from 'react';
import { StyleSheet, Text, View, Button, Image, Linking } from 'react-native';
import { useRouter, useNavigation } from "expo-router";

export default function Modal({ artworkDetails = {} }) {
  
  let router = useRouter();

  const { 
    artist = 'Lorem Ipsum dolor sit amet', 
    location = 'Kunstuitleen - Utrecht', 
    size = '100x75', 
    cost = '2000 EUR',
    image = 'https://picsum.photos/id/237/800/800',
    link = 'https://kunstuitleenutrecht.kunstuitleenonline.nl/item/UTRVIN013'
  } = artworkDetails;

  const goBack = () => {
    router.navigate('/result');
  };

const goToVendor = async () => {
  const url = link; // TO DO: make dynamic

  // Can the link be opened?
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`An error occurred while opening: ${url}`);
  }
};

  return (
    <View style={styles.container}>
	<Image
	  source={{uri: image}}
	  style={styles.highlightedImage}
	  resizeMode="cover"
	/>

      <Text style={styles.artistHeader}>Artwork Details</Text>
      
      <View style={styles.detailRow}>
        <Text style={styles.label}>Artist:</Text>
        <Text style={styles.value}>{artist}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{location}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Size:</Text>
        <Text style={styles.value}>{size}</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Text style={styles.label}>Cost:</Text>
        <Text style={styles.value}>{cost}</Text>
      </View>

      <Text style={styles.galleryHeader}>Gallery Details</Text>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>Lorem ipsum dolor sit amet</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Text style={styles.label}>Style:</Text>
        <Text style={styles.value}>Modern & Contemporary</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>Kerkstraat 1, 1234AB, Utrecht</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Website:</Text>
        <Text style={styles.value}>http://example.com</Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Button onPress={goToVendor} color="purple" title="Go to vendor" />
      </View>

      <View style={styles.buttonWrapper}>
        <Button onPress={goBack} title="Back" />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  artistHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  galleryHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Puts label on left, value on right
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    flexShrink: 1, // Allows long text to wrap
    textAlign: 'right',
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'end',
  },
  highlightedImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    marginBottom: 25,
  },

});
