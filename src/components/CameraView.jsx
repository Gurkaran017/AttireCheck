import { forwardRef } from "react"
import { StyleSheet } from "react-native"
import { Camera } from "react-native-vision-camera"
import { useMemo } from "react"
import { useCameraDevices } from "react-native-vision-camera"

const getBestFormat = (formats) => {
  return formats
    .filter(format => format.photoResolution && format.frameRateRanges)
    .sort((a, b) => {
      // Sort by highest photo resolution
      const aPixels = a.photoHeight * a.photoWidth
      const bPixels = b.photoHeight * b.photoWidth
      return bPixels - aPixels
    })[0]
}

const CameraView = forwardRef(({ device, isActive }, ref) => {
  const bestFormat = useMemo(() => getBestFormat(device.formats), [device.formats]);
  return (
    <Camera
      ref={ref}
      style={StyleSheet.absoluteFillObject}
      device={device}
      isActive={isActive}
      preset="high"
      photo={true}
      fps={30}
      // format={device.formats[0]}
      format={bestFormat}
    />
  )
})

CameraView.displayName = "CameraView"

export default CameraView
