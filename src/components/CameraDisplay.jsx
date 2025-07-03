import { StyleSheet, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import TopBar from './Header.jsx';
import PostureIndicator from './PostureIndicator.jsx';
import BottomControls from './Footer.jsx';

const { width, height } = Dimensions.get('window');

const CameraOverlay = ({
  showControls,
  isMonitoring,
  sessionTime,
  postureData,
  alertsCount,
  cameraPosition,
  onBack,
  onToggleCamera,
  onToggleControls,
  onStartStop,
  selectedAsana,
  onChangeAsana,
  yogaMode,
  yogaData,
}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideTopAnim = useRef(new Animated.Value(0)).current;
  const slideBottomAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: showControls ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideTopAnim, {
        toValue: showControls ? 0 : -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideBottomAnim, {
        toValue: showControls ? 0 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [showControls]);

  useEffect(() => {
    if (isMonitoring) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.06,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  }, [isMonitoring]);

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.topSection, { opacity: fadeAnim, transform: [{ translateY: slideTopAnim }] }]}>
        {showControls && (
          <TopBar
            isMonitoring={isMonitoring}
            sessionTime={sessionTime}
            cameraPosition={cameraPosition}
            onBack={onBack}
            onToggleCamera={onToggleCamera}
          />
        )}
      </Animated.View>

      <TouchableOpacity style={styles.centerArea} activeOpacity={1} onPress={onToggleControls}>
        {isMonitoring && (postureData || yogaData )&& (
          <Animated.View style={[styles.indicatorContainer, { transform: [{ scale: pulseAnim }] }]}>
            <PostureIndicator
              postureScore={postureData?.score}
              postureStatus={postureData?.posture}
              reason={postureData?.reason}
              yogaFeedback={yogaData.feedback}
              yogaMode={yogaMode}
            />
          </Animated.View>
        )}

        {/* {!showControls && (
          <Animated.View style={[styles.tapHint, { opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }]}>
            <View style={styles.tapHintCircle}>
              <Animated.Text style={[styles.tapHintText, { transform: [{ scale: pulseAnim }] }]}>
                Tap Anywhere
              </Animated.Text>
            </View>
          </Animated.View>
        )} */}
      </TouchableOpacity>

      <Animated.View style={[styles.bottomSection, { opacity: fadeAnim, transform: [{ translateY: slideBottomAnim }] }]}>
        {showControls && (
          <BottomControls
            isMonitoring={isMonitoring}
            alertsCount={alertsCount}
            postureStatus={postureData?.posture || 'unknown'}
            onStartStop={onStartStop}
            selectedAsana={selectedAsana}
            onChangeAsana={onChangeAsana}
            yogaMode={yogaMode}
            
          />
        )}
      </Animated.View>

      {isMonitoring && sessionTime > 0 && (
        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: `${Math.min((sessionTime / 3600) * 100, 100)}%`,
                backgroundColor: postureData?.posture === 'good' ? '#22C55E' :
                                postureData?.posture === 'fair' ? '#FBBF24' : '#EF4444'
              },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  topSection: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  centerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  indicatorContainer: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  tapHint: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  tapHintCircle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  tapHintText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomSection: {
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  progressContainer: {
    position: 'absolute',
    top: 0,
    height: 4,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
});

export default CameraOverlay;
