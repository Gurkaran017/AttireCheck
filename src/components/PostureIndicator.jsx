import { StyleSheet, Text, View, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { getPostureMessage } from "../utils/PostureUtils.jsx";

const postureColors = {
  good: '#10B981',         // Emerald green
  bad: '#EF4444',          // Red
  average: '#F59E0B',      // Amber
  unknown: '#6B7280'       // Gray
};

const PostureIndicator = ({
  postureScore = 100,
  postureStatus = "unknown",
  reason = null,
  yogaFeedback ,
  yogaMode
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;



  console.log("yogaaaaaaaMode 11111", yogaMode)
  console.log("yogaFeedbackkkkk",yogaFeedback)


  const message = yogaMode === false
  ? getPostureMessage(postureStatus)
  : getPostureMessage(yogaFeedback?.length > 0 ? yogaFeedback : "unknown");

  console.log(message)
  

  useEffect(() => {
    // Simple pulse animation when posture status changes
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [postureStatus]);

  const bgColor = postureColors[postureStatus] || postureColors.unknown;

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
      <View style={[styles.badge, { backgroundColor: bgColor }]}>
        <Text style={styles.postureText}>
          {message}
        </Text>
      </View>
      {reason && (
  <View style={styles.reasonWrapper}>
    <Text style={styles.reasonText}>{reason}</Text>
  </View>
)}

    </Animated.View>
  );
};

export default PostureIndicator;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 16,
  },
  badge: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  postureText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  reasonWrapper: {
  marginTop: 10,
  paddingHorizontal: 16,
  paddingVertical: 8,
  backgroundColor: 'rgba(96, 90, 90, 0.8)',
  borderRadius: 12,
},

reasonText: {
  fontSize: 15,
  color: '#f3f4f6', // brighter than before
  fontWeight: '500',
  textAlign: 'center',
  letterSpacing: 0.5,
},

});
