import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const BottomControls = ({
  isMonitoring,
  alertsCount,
  postureStatus,
  onStartStop,
  selectedAsana,
  onChangeAsana,
  yogaMode, // receives true or false
}) => {
  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.row,
          !yogaMode && { justifyContent: "center" }, // center button if not yoga mode
        ]}
      >
        {/* Start/Stop Button */}
        <TouchableOpacity
          onPress={onStartStop}
          style={[
            styles.actionButton,
            { backgroundColor: isMonitoring ? "#F87171" : "#14B8A6" },
          ]}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>
            {isMonitoring ? "Stop Session" : "Start Session"}
          </Text>
        </TouchableOpacity>

        {/* Asana Change Icon - only visible in yogaMode */}
        {yogaMode && (
          <TouchableOpacity
            onPress={onChangeAsana}
            style={[
              styles.iconButton,
              isMonitoring && styles.iconDisabled,
            ]}
            disabled={isMonitoring}
            activeOpacity={0.9}
          >
            <Icon name="body-outline" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default BottomControls;

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    alignSelf: "center",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: "#0b0a0a",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
  iconButton: {
    backgroundColor: "#14B8A6",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    top: 0,
  },
  iconDisabled: {
    opacity: 0.5, // Dimmed appearance when disabled
  },
});

