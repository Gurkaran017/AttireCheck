import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatTime } from '../utils/TimeUtils.jsx';

const TopBar = ({ isMonitoring, sessionTime, cameraPosition, onBack, onToggleCamera }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.button} onPress={onBack}>
        <Ionicons name="arrow-back" size={18} color="#0c0c0c" />
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      {/* Session Timer */}
      {isMonitoring && (
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionLabel}>⏱️ Session</Text>
          <Text style={styles.sessionTime}>{formatTime(sessionTime)}</Text>
        </View>
      )}

      {/* Camera Switch */}
      <TouchableOpacity style={styles.button} onPress={onToggleCamera}>
        <Ionicons name="camera-reverse" size={18} color="#030303" />
        <Text style={styles.buttonText}>Flip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#bebfc2', // Match splash screen blue
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 30,
    marginHorizontal: 12,
    marginTop: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // lighter contrast on dark blue
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 25,
  },
  buttonText: {
    color: '#070606',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 6,
  },
  sessionInfo: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(87, 84, 84, 0.08)',
    borderRadius: 20,
  },
  sessionLabel: {
    fontSize: 12,
    color: '#070707',
    fontWeight: '500',
    marginBottom: 2,
  },
  sessionTime: {
    fontSize: 18,
    fontWeight: '700',
    color: '#060505',
  },
});

