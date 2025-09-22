import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Api_Rate_url2 } from '../../Config/Config';
import { FontFamily, FontSize, Border } from '../../Utills/Global_Styles';
import {colors} from "../../Utills/colors"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RateSection() {
  const [goldRate, setGoldRate] = useState(0);
  const [silverRate, setSilverRate] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    let isMounted = true;
    
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    fetchRates();

    const interval = setInterval(() => {
      if (isMounted) {
        // Pulse animation when rates update
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
        fetchRates();
      }
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const fetchRates = async () => {
    try {
      const response = await fetch(`${Api_Rate_url2}`);
      const data = await response.json();
      setGoldRate(data.G || 0);
      setSilverRate(data.S || 0);
    } catch (error) {
      console.error('Error fetching rates:', error);
      setGoldRate(0);
      setSilverRate(0);
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          opacity: fadeAnim,
          transform: [{ scale: pulseAnim }] 
        }
      ]}
    >
      <View style={[styles.rateBox, styles.goldBox]}>
        <View style={styles.iconContainer}>
          <Icon name="gold" size={24} color={colors.primaryGold} />
        </View>
        <View style={styles.rateContent}>
          <Text style={styles.label}>GOLD (22K)</Text>
          <Text style={[styles.value, styles.goldValue]}>
            ₹ {goldRate.toLocaleString('en-IN')}
            <Text style={styles.perGram}> </Text>
          </Text>
        </View>
      </View>

      <View style={[styles.rateBox, styles.silverBox]}>
        <View style={styles.iconContainer}>
          <Icon name="silverware" size={24} color={colors.fontThirdColor} />
        </View>
        <View style={styles.rateContent}>
          <Text style={styles.label}>SILVER (916)</Text>
          <Text style={[styles.value, styles.silverValue]}>
            ₹ {silverRate.toLocaleString('en-IN')}
            <Text style={styles.perGram}></Text>
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 8,
    marginVertical: 6,
    // marginHorizontal: 16,
    borderRadius: Border.br_md,
    elevation: 4,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    width:"100%"
  },
  rateBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: Border.br_sm,
    marginHorizontal: 4,
  },
  goldBox: {
    backgroundColor: "rgba(114, 204, 226, 0.3)",
    borderWidth: 1,
    borderColor: 'rgba(255, 123, 0, 0.3)',
  },
  silverBox: {
      backgroundColor: "rgba(114, 204, 226, 0.3)",
    borderWidth: 1,
    borderColor: 'rgba(158, 149, 149, 0.2)',
  },
  iconContainer: {
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 2,
  },
  rateContent: {
    flex: 1,
  },
  label: {
    fontSize: FontSize.size_xs+2,
    fontFamily: FontFamily.gilroySemiBold,
       color: colors.black,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  value: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.gilroyBold,
  },
  goldValue: {
    color: colors.black,
    fontWeight:"bold",
     fontSize: FontSize.size_md+2,
    fontFamily: FontFamily.gilroyBold,
  },
  silverValue: {
    color: colors.black,
     fontWeight:"bold",
      fontSize: FontSize.size_md+2,
    fontFamily: FontFamily.gilroyBold,
  },
  perGram: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.gilroyMedium,
        color: colors.black,
  },
});