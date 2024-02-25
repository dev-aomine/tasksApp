import {Dimensions, Platform} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Calculate the scale ratios
const widthScaleRatio = screenWidth / guidelineBaseWidth;
const heightScaleRatio = screenHeight / guidelineBaseHeight;

// Calculate platform-specific scaling factors
const getPlatformFactor = () => {
  if (Platform.OS === 'web') {
    return 0.12;
  } else if (Platform.OS === 'android') {
    return 1;
  } else if (Platform.OS === 'ios') {
    // You can set a different factor for iOS if needed
    return 0.5;
  } else {
    // Default factor for unknown platforms (e.g., tablets)
    return 0.8;
  }
};

// Scale the provided size based on the device's screen width or height with platform-specific factor
const scaleSize = (size, scaleRatio) =>
  size + (scaleRatio * size - size) * getPlatformFactor();

// Scale the provided font size based on the device's screen width, height, and pixel density
const scaleFont = size => scaleSize(size, widthScaleRatio);

// Scale the provided width and height based on the device's screen width or height
const scaleWidth = width => scaleSize(width, widthScaleRatio);
const scaleHeight = height => scaleSize(height, heightScaleRatio);

export {scaleWidth, scaleHeight, scaleFont, screenWidth, screenHeight};
