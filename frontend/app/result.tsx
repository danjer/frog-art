import { useRouter, useLocalSearchParams } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const FALLBACK_IMAGES = [
  {
    url: "https://picsum.photos/id/237/800/800",
    name: "A sad looking dog",
    artist: "Jan Janssen",
    purchaseLink: "https://example.com/link-a",
  },
  {
    url: "https://picsum.photos/id/238/800/800",
    name: "The Big Apple",
    artist: "Henk de Vries",
    purchaseLink: "https://example.com/link-b",
  },
  {
    url: "https://picsum.photos/id/239/800/800",
    name: "Dandelion",
    artist: "Kees de Boer",
    purchaseLink: "https://example.com/link-c",
  },
];

export default function ResultScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);

  let parsedImages: {
    url: string;
    name?: string;
    artist?: string;
    purchaseLink?: string;
  }[] = [];

  if (!params.imageUrls || params.imageUrls === "null") {
    parsedImages = FALLBACK_IMAGES;
  } else {
    try {
      const urls = JSON.parse(params.imageUrls as string).comparable_ids[0];
      parsedImages = urls.map((id: string) => ({
        url: `https://digicat.kunstuitleenutrecht.nl/digicat/plaatjes/jpg/${id}.jpg`,
        purchaseLink: `https://kunstuitleenutrecht.kunstuitleenonline.nl/item/UTR${id}`,
      }));
    } catch (e) {
      console.error("Failed to parse image URLs:", e);
    }
  }

  if (parsedImages.length === 0) {
    parsedImages.push({
      url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg",
      name: "No Results Found",
      artist: "Please try a different photo.",
      purchaseLink: "",
    });
  }

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const activeDetails = parsedImages[activeIndex] || {};

  const openDetails = () => {
    router.push({
      pathname: "/modal",
      params: {
        name: activeDetails.name || "",
        artist: activeDetails.artist || "",
        url: activeDetails.url || "",
        purchaseLink: activeDetails.purchaseLink || "",
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.carouselContent}
        style={styles.carousel}
      >
        {parsedImages.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={{ uri: item.url }}
              style={styles.highlightedImage}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      {parsedImages.length > 1 && (
        <View style={styles.dotsContainer}>
          {parsedImages.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>{activeDetails.name}</Text>
        <Text style={styles.detailText}>{activeDetails.artist}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.retakeButton} onPress={() => router.navigate("/")}>
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moreInfoButton} onPress={openDetails}>
            <Text style={styles.moreInfoText}>More Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  carousel: {
    height: screenHeight * 0.65,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  carouselContent: {
    alignItems: "center",
  },
  imageContainer: {
    width: screenWidth,
    height: screenHeight * 0.65,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  highlightedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: "#2d409c",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  detailText: {
    fontSize: 18,
    marginBottom: 4,
    color: "#444",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 20,
  },
  retakeButton: {
    backgroundColor: "#888",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retakeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  moreInfoButton: {
    backgroundColor: "#2d409c",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  moreInfoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
