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

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(verticalScale(100))).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

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
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require('../../Assets/Images/logo.jpg')}
          
          style={{ width: 120, height: 120, resizeMode: "contain", alignSelf: "center", marginBottom: 10,marginTop:-150}}
    
        />

        <Text style={styles.title}>Welcome to BRIGHTECH SOFTWARE SOLUTIONS</Text>
        <Text style={styles.subtitle}>
         Check Sales of Your Jewellery from Anytime and Anywhere
        </Text>
        <Text style={styles.subtitle1}>

        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Login')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Get Started</Text>
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
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(24),
  },
  animatedContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: scale(200),
    height: scale(200),
    borderRadius: scale(125),
    marginBottom: verticalScale(30),
    borderWidth: scale(2),
    // borderColor: colors.primaryGold,
    backgroundColor: colors.white, // fallback background
  },
  title: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.gilroyBold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: verticalScale(12),
    // letterSpacing: scale(0.8),
    textShadowColor: 'rgba(252, 198, 147, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    fontWeight:"bold"
  },
  subtitle: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.gilroyMedium,
    color: colors.primaryGold ,
    textAlign: 'center',
    paddingHorizontal: scale(12),
    marginBottom: verticalScale(10),
    lineHeight: verticalScale(22),
    letterSpacing: scale(0.3),
    fontWeight:"bold"
  },
  subtitle1: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.gilroyMedium,
    color: colors.primaryGold,
    textAlign: 'center',
    paddingHorizontal: scale(12),
    marginBottom: verticalScale(40),
    lineHeight: verticalScale(22),
    letterSpacing: scale(0.3),
    fontWeight:"bold"
  },
  button: {
    backgroundColor: colors.black,
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(32),
    borderRadius: Border.br_31xl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: scale(1),
    borderColor: 'rgba(252, 198, 147, 0.5)',
  },
  buttonText: {
    color: colors.white,
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.gilroySemiBold,
    letterSpacing: scale(0.5),
    fontWeight:"bold"
  },
});
