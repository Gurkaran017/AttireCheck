import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, StatusBar, Dimensions } from "react-native"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

const BackgroundHomepage = ({ navigation }) => {
  const handleStartMonitoring = () => {
    navigation.navigate("PostureMonitoring", { setYoga: false, setAttire:false, setGrooming: false , setBackground: true })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
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
            <Text style={styles.headerTitle}>Perfect Your Background</Text>
            <Text style={styles.headerSubtitle}>AI-Powered Smart Experience</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.contentSection}>
          {/* Feature Cards */}
          <View style={styles.featureGrid}>
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>🏠</Text>
              </View>
              <Text style={styles.featureTitle}>Smart Home</Text>
              <Text style={styles.featureDescription}>Real-time background analysis</Text>
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
            <Text style={styles.cardTitle}>Ensure Professional Presence</Text>
            <Text style={styles.description}>
              Never worry about unprofessional backgrounds again. Our AI instantly analyzes your video call environment,
              detecting people, beds, clutter, or any non-professional elements that might affect your image.
              {"\n\n"}
              Get real-time alerts and suggestions to maintain the perfect professional appearance in every meeting,
              interview, or presentation.
            </Text>
          </View>

          {/* Background Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop",
              }}
              style={styles.backgroundIllustration}
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
            <Text style={styles.benefitsTitle}>Why AI-Powered Smart Experience</Text>
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>✨</Text>
                <Text style={styles.benefitText}>Instant smart features</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>🎯</Text>
                <Text style={styles.benefitText}>Personalized experience</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>📱</Text>
                <Text style={styles.benefitText}>Smart Detection</Text>
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
        <TouchableOpacity style={styles.startButton} onPress={handleStartMonitoring} activeOpacity={0.8}>
          <View style={styles.buttonContent}>
            <Text style={styles.startButtonText}>Start Background Check</Text>
            <Text style={styles.buttonSubtext}>Begin smart experience</Text>
          </View>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BackgroundHomepage

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
    backgroundColor: "rgba(102, 126, 234, 0.8)",
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
  backgroundIllustration: {
    width: "100%",
    height: 200,
  },
  privacyCard: {
    backgroundColor: "#ecfdf5",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#a7f3d0",
  },
  privacyHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  privacyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#d1fae5",
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
    color: "#065f46",
    marginBottom: 2,
  },
  privacySubtitle: {
    fontSize: 14,
    color: "#047857",
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
    backgroundColor: "#667eea",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#667eea",
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
    color: "#c7d2fe",
    fontSize: 14,
    fontWeight: "500",
  },
  buttonArrow: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "300",
  },
})
