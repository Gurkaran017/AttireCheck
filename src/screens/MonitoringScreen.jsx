'use client';

import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Linking,
  Platform,
  View,
  Text,
  Button,
} from 'react-native';
import {
  useCameraDevices,
  useCameraPermission,
  Camera,
} from 'react-native-vision-camera';
import WebView from 'react-native-webview';
import RNFS from 'react-native-fs';
import CameraOverlay from '../components/CameraDisplay';
import LoadingScreen from '../components/Loader';
import {usePostureMonitoring} from '../hooks/PostureData';
import CameraView from '../components/CameraView';
import { Modal, Pressable,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { YogaData } from '../hooks/YogaData';


const PostureMonitoringScreen = ({ navigation, route }) => {
  // State and refs
  const [webViewError, setWebViewError] = useState(null);
  const [webViewLoaded, setWebViewLoaded] = useState(false);
  const cameraRef = useRef(null);
  const webviewRef = useRef(null);

  // const webViewSource = {
  //   uri:
  //     Platform.OS === 'android'
  //       ? 'file:///android_asset/src/html/pose.html'
  //       : `${RNFS.MainBundlePath}/src/html/pose.html`,
  //   baseUrl:
  //     Platform.OS === 'android'
  //       ? 'file:///android_asset/src/html/'
  //       : `${RNFS.MainBundlePath}/src/html/`,
  // };

  const webViewSource = Platform.select({
  android: {
    uri: 'file:///android_asset/src/html/pose.html',
    baseUrl: 'file:///android_asset/src/html/',
  },
  ios: require('../../ios/assets/pose.html'), // or wherever it is now inside the Xcode bundle
});


  // Camera hooks
  const devices = useCameraDevices();
  const {hasPermission, requestPermission} = useCameraPermission();

  // State management
  const [chosenCameraDevice, setChosenCameraDevice] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('front');
  const [showControls, setShowControls] = useState(true);  
  const [postureData, setPostureData] = useState(null);
  const [attireData, setAttireData] = useState(null);
  const [groomingData, setGroomingData] = useState(null);
  const [groomingStatus, setGroomingStatus] = useState(null);
  const [showAsanaModal, setShowAsanaModal] = useState(false);
  const [enableButton, setEnableButton] = useState(false);

  const [selectedAsana, setSelectedAsana] = useState('Tadasana');
  const [yogaData, setYogaData] = useState([]);
  const [showFinalFeedbackModal, setShowFinalFeedbackModal] = useState(false);

  const isYoga = route?.params?.setYoga ?? false;
  const isAttire = route?.params?.setAttire ?? false;
  const isGrooming = route?.params?.setGrooming ?? false;


  
    useEffect(() => {
      console.log('Yoga Mode?', isYoga); // true or false   // yoga or false  
      if (isYoga === true) { // yoga
    setShowAsanaModal(true); // ✅ use setter to update state. 
  }
    }, [isYoga]);
    
    // You can also set it to a state if needed:
    const [yogaMode, setYogaMode] = useState(isYoga);
    const [attireMode , setAttireMode] = useState(isAttire);
    const [groomingMode , setGroomingMode] = useState(isGrooming);

  // Posture monitoring
  const {
    isMonitoring,
    sessionTime,
    postureStatus,
    postureScore,
    alertsCount,
    handleStartStop,
    
  } = usePostureMonitoring(postureData,yogaMode,yogaData ,attireData );

  

  const handleMessage = useCallback(async event => {
    try {
      const data = await JSON.parse(event.nativeEvent.data);
      console.log('WebView message received:', data);

      // console.log('Received from WebView:', {
      //   type: data.type,
      //   timestamp: data.timestamp,
      //   message: data.message,
      //   from: data.from,
      // });

      // Handle different message types
      switch (data.type) {
        case 'log':
          console.log('[WebView log]', data.message);
          break;

        case 'posture_analysis':
          // Process pose data with timestamp
          console.log('[WebView pose data]', data);
          setPostureData(() => data.posture);
          break;

        case 'grooming_analysis':
          console.log("grooming messageis thiiiiiiis ",data)
          // console.log("tatti khalo friends",data.grooming.status)
          // console.log("tatti khalo friends",data.grooming.message)
          // setGroomingData(data.grooming.message);
          setGroomingData(
    data.grooming.message !== undefined
      ? data.grooming.message
      : data.grooming.status
  );
          break;

        case 'attire_analysis':
          setAttireData(data.attire.message)
          console.log("attire messageis thiiiiiiis ",data.attire.message)
          break;  

        case 'yoga_analysis':
          // Process pose data with timestamp
          console.log("mai hun chutiya")
          console.log('[WebView pose data]', data);
          console.log("yoga all feedback is ",data.feedback)
          console.log("issue from yoga" , data.issue)
          console.log("All DATA from yoga" , data)
          // console.log("yoga feedback[0] is ",data.feedback[0])
          // console.log("yoga feedback[feedback] is ",data.feedback[0])
          setYogaData(()=>data)
          break;  

        case 'ready':
          console.log('WebView model loaded successfully');
          setWebViewLoaded(true);
          setEnableButton(true); // Enable button when WebView is ready
          break; // ← ADD THIS

        case 'ping':
          console.log('WebView ping received');
          break;

        case 'error':
          console.error('[WebView Error]', data.message);
          setWebViewError(data.message);
          break;

        default:
          console.log('Unknown WebView message:', data);
      }
    } catch (error) {
      console.error('Message parsing error:', error);
      setWebViewError('Failed to parse WebView message');
    }
  }, []);

  console.log(enableButton);

  const captureAndSendPhoto = async () => {
    try {
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'speed',
        skipMetadata: true,
      });

      console.log('Photo taken:', photo);

      const path = photo.path;
      const base64 = await RNFS.readFile(path, 'base64');


      if(attireMode===true){
        console.log("attire check modal is running")
        const message = {
        command: 'attire',
        image: `data:image/jpeg;base64,${base64}`,
        from: 'sending photo',
        };
        console.log('Sending photo to WebView');
        webviewRef.current.postMessage(JSON.stringify(message));
        console.log('Photo sent to WebView');
      }

      if(groomingMode===true){
        console.log("grooming check modal is running")
        const message = {
        command: 'grooming',
        image: `data:image/jpeg;base64,${base64}`,
        from: 'sending photo',
        };
        console.log('Sending photo to WebView');
        webviewRef.current.postMessage(JSON.stringify(message));
        console.log('Photo sent to WebView');
      }


      if(yogaMode===false && attireMode===false){
        const message = {
        command: 'predict',
        image: `data:image/jpeg;base64,${base64}`,
        from: 'sending photo',
        };
      console.log('Sending photo to WebView');
      webviewRef.current.postMessage(JSON.stringify(message));
      console.log('Photo sent to WebView');
      }

      if(yogaMode===true){
        const message = {
        command: "init",
        yogaMode: true,
        asanaName: selectedAsana,
        image: `data:image/jpeg;base64,${base64}`,
        from: 'sending photo',
        };
      console.log('Sending photo to WebView from yoga Detection');
      webviewRef.current.postMessage(JSON.stringify(message));
      console.log('Photo sent to WebView for yoga Detection');
      }

      
    } catch (error) {
      console.warn('Photo error:', error);
    }
  };

  // Camera setup and permission handling
  useEffect(() => {
    let interval;
    if (isMonitoring && webViewLoaded && cameraRef.current) {
      interval = setInterval(() => {
        console.log('📸 Sending frame to WebView...');
        captureAndSendPhoto();
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring, webViewLoaded, cameraRef]);

  useEffect(() => {
    const setupCamera = async () => {
      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          Alert.alert(
            'Camera Access Required',
            'Please enable camera access in settings',
            [
              {text: 'Settings', onPress: Linking.openSettings},
              {text: 'Cancel', onPress: () => navigation.goBack()},
            ],
          );
          return;
        }
      }

      const device =
        devices.find(d => d.position === cameraPosition) || devices[0];
      if (device) {
        setChosenCameraDevice(device);
        setIsCameraActive(true);
      }
    };
    setupCamera();
  }, [hasPermission, devices, cameraPosition]);

  if (!chosenCameraDevice || !hasPermission) {
    return <LoadingScreen onRetry={requestPermission} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {showAsanaModal && (
  <Modal
    animationType="fade"
    transparent={true}
    visible={showAsanaModal}
    onRequestClose={() => setShowAsanaModal(false)}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Choose Yoga Asana</Text>
        {['Tadasana', 'Vrikshasana', 'Utkatasana', 'Virabhadrasana'].map(
          asana => (
            <TouchableOpacity
              key={asana}
              style={[
                styles.asanaOption,
                selectedAsana === asana && styles.selectedOption,
              ]}
              onPress={() => setSelectedAsana(asana)}
            >
              <Text
                style={[
                  styles.asanaText,
                  selectedAsana === asana && styles.selectedText,
                ]}
              >
                {asana}
              </Text>
            </TouchableOpacity>
          ),
        )}

        <TouchableOpacity
          style={styles.okButton}
          onPress={() => setShowAsanaModal(false)}
        >
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)}

    
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={chosenCameraDevice}
        isActive={isCameraActive}
      />
      

      <WebView
        ref={webviewRef}
        source={webViewSource}
        onMessage={handleMessage}
        onLoad={() => setWebViewLoaded(true)}
        onError={e => setWebViewError(e.nativeEvent.description)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        // style={{height: 1, width: 1}}
        style={{ position: 'absolute', height: 1, width: 1, opacity: 0 }}
      />

      {webViewError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{webViewError}</Text>
        </View>
      )}

      <CameraOverlay
        showControls={showControls}
        isMonitoring={isMonitoring}
        sessionTime={sessionTime}
        postureData={postureData} // ✅ pass here
        yogaData={yogaData}
        attireData={attireData}
        groomingData={groomingData}
        groomingMode={groomingMode}
        groomingStatus={groomingStatus}
        enableButton={enableButton}
        yogaMode={yogaMode}
        attireMode={attireMode}
        alertsCount={alertsCount}
        cameraPosition={cameraPosition}
        // onBack={() => navigation.goBack()}
        onBack={() => navigation.navigate("MainTabs")}

        onToggleCamera={() =>
          setCameraPosition(p => (p === 'front' ? 'back' : 'front'))
        }
        onToggleControls={() => setShowControls(s => !s)}
        onStartStop={handleStartStop}
        selectedAsana={selectedAsana}
        onChangeAsana={() => setShowAsanaModal(true)}

      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContainer: {
  backgroundColor: '#fff',
  padding: 24,
  borderRadius: 16,
  width: '80%',
  alignItems: 'center',
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 16,
  color: '#1F2937',
},
asanaOption: {
  paddingVertical: 12,
  paddingHorizontal: 20,
  marginVertical: 6,
  borderRadius: 8,
  backgroundColor: '#F3F4F6',
  width: '100%',
  alignItems: 'center',
},
selectedOption: {
  backgroundColor: '#A78BFA',
},
asanaText: {
  fontSize: 16,
  color: '#1F2937',
},
selectedText: {
  color: '#fff',
  fontWeight: 'bold',
},
okButton: {
  marginTop: 20,
  backgroundColor: '#10B981',
  paddingHorizontal: 24,
  paddingVertical: 10,
  borderRadius: 30,
},
okButtonText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 16,
},

});

export default PostureMonitoringScreen;
