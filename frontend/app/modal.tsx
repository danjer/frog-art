import React from 'react';
import { StyleSheet, Text, View, Button, Image, Linking, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Modal() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const artist = (params.artist as string) || 'Unknown artist';
  const name = (params.name as string) || 'Untitled';
  const image = (params.url as string) || 'https://picsum.photos/id/237/800/800';
  const purchaseLink = (params.purchaseLink as string) ?? '';

  const goBack = () => {
    router.back();
  };

  const goToVendor = async () => {
    const supported = await Linking.canOpenURL(purchaseLink);

    if (supported) {
      await Linking.openURL(purchaseLink);
    } else {
      Alert.alert('Error', `Cannot open link: ${purchaseLink}`);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.highlightedImage}
        resizeMode="cover"
      />

      <Text style={styles.artistHeader}>Artwork Details</Text>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{name}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Artist:</Text>
        <Text style={styles.value}>{artist}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>Kunstuitleen - Utrecht</Text>
      </View>

      {purchaseLink ? (
        <View style={styles.buttonWrapper}>
          <Button onPress={goToVendor} color="purple" title="Go to vendor" />
        </View>
      ) : null}

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
  },
  artistHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flexShrink: 1,
    textAlign: 'right',
  },
  buttonWrapper: {
    marginTop: 12,
  },
  highlightedImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    marginBottom: 25,
  },
});
