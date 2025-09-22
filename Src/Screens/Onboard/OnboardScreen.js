import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

import { scale, verticalScale, moderateScale } from '../../Utills/scaling';
import {colors} from '../../Utills/colors';
import { FontFamily, FontSize, Border } from '../../Utills/Global_Styles';
import FooterScreen from "../../Components/Footer/Footer";

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(verticalScale(100))).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(borderAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: false, // Changed to false for color animation
          }),
          Animated.timing(borderAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: false, // Changed to false for color animation
          }),
        ])
      ),
    ]).start();
  }, []);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.primaryGold, colors.primaryGold1], // Ensure these are valid color strings
  });

  return (
    <View style={styles.container}>
      <View style={styles.backgroundOverlay} />
      <View style={styles.diamondPattern} />
      
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <View style={[styles.imageContainer, { borderColor: colors.primaryGold }]}>
          <Image
            source={require('../../Assets/Images/logo.jpg')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to Vairamaaligai Jewellers</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>
            Elegance you can feel. Luxury you can wear.
          </Text>
          <Text style={styles.subtitle1}>
            Discover collections designed to shine with you.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Login')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Begin Your Journey</Text>
          <View style={styles.buttonOverlay} />
        </TouchableOpacity>
      </Animated.View>

      <FooterScreen />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivoryWhite,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(250, 245, 235, 0.7)',
  },
  diamondPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    opacity: 0.05,
    transform: [{ rotate: '45deg' }],
  },
  animatedContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: moderateScale(20),
    padding: moderateScale(30),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(252, 198, 147, 0.2)',
    marginBottom:40
  },
  imageContainer: {
    width: scale(180),
    height: scale(180),
    borderRadius: scale(90),
    marginBottom: verticalScale(30),
    borderWidth: scale(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.primaryGold,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '95%',
    height: '95%',
    borderRadius: scale(80),
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  title: {
    fontSize: FontSize.size_6xl,
    fontFamily: FontFamily.playfairDisplayBold,
    color: colors.darkCharcoal,
    textAlign: 'center',
    marginBottom: verticalScale(5),
    letterSpacing: scale(0.5),
    lineHeight: verticalScale(32),
  },
  divider: {
    width: scale(80),
    height: verticalScale(2),
    backgroundColor: colors.primaryGold,
    marginVertical: verticalScale(10),
    opacity: 0.7,
  },
  subtitle: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.cormorantGaramondSemiBold,
    color: colors.warmGray,
    textAlign: 'center',
    marginBottom: verticalScale(8),
    lineHeight: verticalScale(24),
    letterSpacing: scale(0.2),
    fontStyle: 'italic',
  },
  subtitle1: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.cormorantGaramondSemiBold,
    color: colors.warmGray,
    textAlign: 'center',
    lineHeight: verticalScale(24),
    letterSpacing: scale(0.2),
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: colors.black,
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(40),
    borderRadius: Border.br_31xl,
    shadowColor: colors.primaryDarkGold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: scale(1),
    borderColor: 'rgba(252, 198, 147, 0.3)',
    overflow: 'hidden',
    position: 'relative',
  },
  buttonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  buttonText: {
    color: colors.white,
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.cormorantGaramondBold,
    letterSpacing: scale(0.8),
    textTransform: 'uppercase',
  },
});