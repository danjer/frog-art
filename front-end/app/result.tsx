import { useRouter, useLocalSearchParams, Link } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ResultScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // State to track which image index is currently centered
  const [activeIndex, setActiveIndex] = useState(0);

  let parsedImages = [];

  const no_results = "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg";
  const HARDCODED_IMAGES = [
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

    if (!params.imageUrls || params.imageUrls === 'null') {
    // If no image data is passed via navigation parameters, use hardcoded
    console.log("No API data found, using hardcoded images for development.");
    parsedImages = HARDCODED_IMAGES;
    } else {

  try {
    if (params.imageUrls) {
      console.log("Raw imageUrls param:", params.imageUrls);
      const urls = JSON.parse(params.imageUrls).comparable_ids[0];
      console.log("Parsed image URLs:", urls);

      parsedImages = urls.map((single_url) => ({
        url: `https://digicat.kunstuitleenutrecht.nl/digicat/plaatjes/jpg/${single_url}.jpg`,
      }));

      console.log(parsedImages);
    }
  } catch (e) {
    console.error("Failed to parse image URLs:", e);
  }
	};

  if(parsedImages.length === 0) {
    console.log("No images found, using fallback.");
    parsedImages.push({
      url: no_results,
      // You can add default text for this fallback image if needed
      name: "No Results Found",
      artist: "Please try a different search.",
      purchaseLink: "",
    });
  }

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const activeDetails = parsedImages[activeIndex] || {};

  return (
    <View style={styles.container}>

      {/* <View style={styles.header}> */}
      {/*   <Text style={styles.title}> */}
      {/*     Results ({activeIndex + 1}/{parsedImages.length}) */}
      {/*   </Text> */}
      {/* </View> */}

      {parsedImages.length > 0 ? (
        <>
          {/* image carousel */}
          <ScrollView
            horizontal
            pagingEnabled // Enables snap-to-page behavior
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16} // performance thing
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

          <View style={styles.detailsContainer}>
            <Text style={styles.detailTitle}>{activeDetails.name}</Text>
            <Text style={styles.detailText}>{activeDetails.artist}</Text>
            {/* <Text style={[styles.detailText, styles.linkText]}> */}
            {/*   {activeDetails.purchaseLink} */}
            {/* </Text> */}
	    <Link style={styles.moreInfoLink} href="/modal" >More Details</Link>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No comparable images found.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingTop: 40,
  },
  backButton: {
    paddingRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  carousel: {
    height: screenWidth * 1.1,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  carouselContent: {
    alignItems: "center",
  },
  imageContainer: {
    width: screenWidth,
    height: screenHeight * 0.7,
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
  linkText: {
    color: "#007AFF",
    marginTop: 10,
    fontWeight: "500",
  },
  moreInfoLink: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
});
