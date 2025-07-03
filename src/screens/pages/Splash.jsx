"use client"

import { useEffect, useRef } from "react"
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, StatusBar, Animated } from "react-native"
import LottieView from "lottie-react-native"

const { width, height } = Dimensions.get("window")

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start()

    // Uncomment to enable auto-navigation
    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Background Gradient Elements */}
      <View style={styles.backgroundGradient1} />
      <View style={styles.backgroundGradient2} />
      <View style={styles.backgroundGradient3} />

      {/* Animated Content */}
      <Animated.View
        style={[
          styles.centerContent,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo Container with Glow Effect */}
        <View style={styles.logoContainer}>
          <View style={styles.logoGlow} />
          <Image source={{ uri: "https://media.licdn.com/dms/image/v2/D5612AQHW5HtOxoRKlg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1681285456609?e=2147483647&v=beta&t=slgQwlup6LbgmSbiM-kryTAc1HB40rrDZNGhyTH9tIE" }} style={styles.heroImage} />
        </View>

        {/* App Branding */}
        <View style={styles.brandingContainer}>
          <Text style={styles.appName}>AlignTrack</Text>
          <View style={styles.taglineContainer}>
            <View style={styles.taglineDot} />
            <Text style={styles.tagline}>Smart Posture Assistant</Text>
            <View style={styles.taglineDot} />
          </View>
        </View>

        {/* Feature Highlights */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎯</Text>
            <Text style={styles.featureText}>Real-time Analysis</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={styles.featureText}>Privacy First</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>💪</Text>
            <Text style={styles.featureText}>Health Focused</Text>
          </View>
        </View>

        {/* Enhanced Loader Section */}
        <View style={styles.loaderWrapper}>
          <View style={styles.loaderContainer}>
            <LottieView
              source={{ uri: "https://assets9.lottiefiles.com/packages/lf20_usmfx6bp.json" }}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
          <Text style={styles.loadingText}>Preparing your experience...</Text>
          <View style={styles.loadingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </View>
      </Animated.View>

      {/* Bottom Branding */}
      <View style={styles.bottomBranding}>
        <Text style={styles.versionText}>Version 1.0</Text>
        <Text style={styles.copyrightText}>Powered by AI Technology</Text>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundGradient1: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    opacity: 0.6,
  },
  backgroundGradient2: {
    position: "absolute",
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "rgba(16, 185, 129, 0.08)",
    opacity: 0.4,
  },
  backgroundGradient3: {
    position: "absolute",
    top: height * 0.3,
    left: width * 0.7,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(139, 92, 246, 0.06)",
    opacity: 0.5,
  },
  centerContent: {
    alignItems: "center",
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    position: "relative",
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logoGlow: {
    position: "absolute",
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    opacity: 0.8,
  },
  heroImage: {
    width: width * 0.85,
    height: width * 0.45,
    resizeMode: "contain",
    zIndex: 2,
    marginRight:14
  },
  brandingContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  appName: {
    fontSize: 36,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 12,
    letterSpacing: 2,
    textShadow: "0px 4px 8px rgba(0,0,0,0.3)",
  },
  taglineContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  taglineDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#3b82f6",
  },
  tagline: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  featuresContainer: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  featureItem: {
    alignItems: "center",
    flex: 1,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "500",
    textAlign: "center",
  },
  loaderWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  loaderContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  lottie: {
    width: 60,
    height: 60,
  },
  loadingText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
    marginBottom: 16,
    opacity: 0.9,
  },
  loadingDots: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3b82f6",
  },
  dot1: {
    opacity: 1,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 0.4,
  },
  bottomBranding: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
  },
  versionText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: 4,
    fontWeight: "500",
  },
  copyrightText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "400",
  },
})