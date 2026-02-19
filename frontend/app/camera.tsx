import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import * as FileSystem from "expo-file-system";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const API_URL = "http://localhost:80/api/compare-art";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/images/react-logo.png")} />
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.8,
      });
      setPhotoUri(photo.uri);
      setPhotoBase64(photo.base64);
    }
  };

  const retakePhoto = () => {
    setPhotoUri(null);
    setPhotoBase64(null);
  };

  const confirmPhotoAndSend = async () => {
    if (!photoUri) {
      Alert.alert("Error", "No photo to send.");
      return;
    }

    let base64Data = photoBase64;

    if (Platform.OS !== "web" && !base64Data) {
      try {
        base64Data = await FileSystem.readAsStringAsync(photoUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      } catch (e) {
        console.error("Error reading file on native:", e);
        Alert.alert("Error", "Could not read photo file.");
        return;
      }
    }

    if (!base64Data) {
      Alert.alert("Error", "Base64 image data could not be generated.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Data }),
      });

      if (response.ok) {
        const result = await response.json();
        setPhotoUri(null);
        setPhotoBase64(null);
        router.navigate({
          pathname: "/result",
          params: {
            imageUrls: JSON.stringify(result),
          },
        });
      } else {
        const errorData = await response.text();
        console.error("Failed to upload photo:", response.status, errorData);
        Alert.alert(
          "Error",
          `Failed to upload photo: ${response.status} - ${errorData}`,
        );
      }
    } catch (error) {
      console.error("Error sending photo:", error);
      Alert.alert("Error", "An error occurred while sending the photo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loadingText}>Analyzing artwork...</Text>
        </View>
      )}

      {photoUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.navButton} onPress={retakePhoto} disabled={isLoading}>
              <FontAwesome6 name="arrow-left" size={40} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButton}
              onPress={confirmPhotoAndSend}
              disabled={isLoading}
            >
              <FontAwesome6 name="circle-check" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => router.navigate("/")}
            >
              <FontAwesome6 name="arrow-left" size={40} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={takePhoto}
            />

            <TouchableOpacity
              style={styles.navButton}
              onPress={toggleCameraFacing}
            >
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
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    marginBottom: 64,
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  cameraButton: {
    width: 75,
    height: 75,
    marginBottom: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
    boxShadow: "0px 0px 0px 2px black inset",
  },
  navButton: {
    width: 50,
    height: 50,
    flex: 0.5,
    marginBottom: 40,
    alignItems: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    marginTop: 16,
  },
});
