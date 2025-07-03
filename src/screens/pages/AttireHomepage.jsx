import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
} from "react-native"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

const AttireHomepage = ({ navigation }) => {
  const handleStartStyling = () => {
    navigation.navigate("PostureMonitoring", { setYoga: false , setAttire:true })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#e91e63" />
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        {/* Header Section with Gradient */}
        <View style={styles.headerSection}>
          <View style={styles.gradientOverlay} />
          <Image
            source={{ uri: "/placeholder.svg?height=300&width=400" }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Style Your Way</Text>
            <Text style={styles.headerSubtitle}>AI-Powered Fashion Guidance</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.contentSection}>
          {/* Feature Cards */}
          <View style={styles.featureGrid}>
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>👗</Text>
              </View>
              <Text style={styles.featureTitle}>Perfect Fit</Text>
              <Text style={styles.featureDescription}>Smart size recommendations</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>🔒</Text>
              </View>
              <Text style={styles.featureTitle}>Private & Secure</Text>
              <Text style={styles.featureDescription}>All processing on-device</Text>
            </View>
          </View>

          {/* Main Description Card */}
          <View style={styles.descriptionCard}>
            <Text style={styles.cardTitle}>Transform Your Wardrobe</Text>
            <Text style={styles.description}>
              Discover your perfect style with AI-powered fashion analysis. Get personalized outfit recommendations, 
              color matching suggestions, and style tips tailored to your body type and preferences.
              {"\n\n"}
              Our advanced technology analyzes your style preferences, body measurements, and current trends 
              to curate the perfect wardrobe that makes you look and feel confident every day.
            </Text>
          </View>

          {/* Fashion Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1652795385719-3164c3dd8d14?q=80&w=1043&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
              style={styles.fashionIllustration}
              resizeMode="contain"
            />
          </View>

          {/* Privacy Assurance */}
          <View style={styles.privacyCard}>
            <View style={styles.privacyHeader}>
              <View style={styles.privacyIconContainer}>
                <Text style={styles.privacyIcon}>🛡️</Text>
              </View>
              <View style={styles.privacyTextContainer}>
                <Text style={styles.privacyTitle}>Your Privacy Matters</Text>
                <Text style={styles.privacySubtitle}>100% local processing • No data uploaded</Text>
              </View>
            </View>
          </View>

          {/* Benefits Section */}
          <View style={styles.benefitsSection}>
            <Text style={styles.benefitsTitle}>Why Choose AI Fashion Guidance?</Text>
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>✨</Text>
                <Text style={styles.benefitText}>Instant style recommendations</Text>
              </View>

              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>🎯</Text>
                <Text style={styles.benefitText}>Personalized outfit curation</Text>
              </View>

              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>📱</Text>
                <Text style={styles.benefitText}>Works offline</Text>
              </View>

              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>🔐</Text>
                <Text style={styles.benefitText}>Complete privacy</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Enhanced Start Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartStyling} activeOpacity={0.8}>
          <View style={styles.buttonContent}>
            <Text style={styles.startButtonText}>Start Your Style Journey</Text>
            <Text style={styles.buttonSubtext}>Begin fashion analysis</Text>
          </View>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AttireHomepage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollViewContent: {
    minHeight: SCREEN_HEIGHT,
    paddingBottom: 120,
  },
  headerSection: {
    position: "relative",
    height: 320,
    overflow: "hidden",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(233, 30, 99, 0.8)", // Changed to pink theme
    zIndex: 2,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  headerContent: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
    zIndex: 3,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
    textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#e2e8f0",
    fontWeight: "500",
  },
  contentSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  featureGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  featureCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 16,
  },
  descriptionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 32,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  fashionIllustration: {
    width: "100%",
    height: 200,
  },
  privacyCard: {
    backgroundColor: "#fdf2f8", // Changed to pink theme
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#f9a8d4", // Changed to pink theme
  },
  privacyHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  privacyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fce7f3", // Changed to pink theme
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  privacyIcon: {
    fontSize: 20,
  },
  privacyTextContainer: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#831843", // Changed to pink theme
    marginBottom: 2,
  },
  privacySubtitle: {
    fontSize: 14,
    color: "#be185d", // Changed to pink theme
  },
  benefitsSection: {
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 20,
    textAlign: "center",
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  benefitIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
  },
  benefitText: {
    fontSize: 16,
    color: "#475569",
    fontWeight: "500",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  startButton: {
    backgroundColor: "#e91e63", // Changed to pink theme
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#e91e63", // Changed to pink theme
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonContent: {
    flex: 1,
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
  },
  buttonSubtext: {
    color: "#f8bbd9", // Changed to pink theme
    fontSize: 14,
    fontWeight: "500",
  },
  buttonArrow: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "300",
  },
})