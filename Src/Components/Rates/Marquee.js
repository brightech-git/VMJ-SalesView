import React, { useRef, useEffect, useState } from "react";
import { Animated, Text, View, StyleSheet, Dimensions } from "react-native";
import { Api_Rate_url } from "../../Config/Config";
import { FontSize, FontFamily } from "../../Utills/Global_Styles";
import { colors } from "../../Utills/colors";

const OneWayMarquee = ({ text, speed = 50 }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;
  const [textWidth, setTextWidth] = useState(0);

  const startAnimation = () => {
    translateX.setValue(screenWidth);
    Animated.timing(translateX, {
      toValue: -(textWidth),
      duration: (screenWidth + textWidth) * speed,
      useNativeDriver: true,
    }).start(() => startAnimation());
  };

  useEffect(() => {
    if (textWidth > 0) {
      startAnimation();
    }
  }, [textWidth]);

  return (
    <View style={styles.marqueeContainer}>
      <Animated.Text
        style={[styles.marqueeText, { transform: [{ translateX }] }]}
        onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
      >
        {text}
      </Animated.Text>
    </View>
  );
};

export default function RateSectionWithMarquee() {
  const [goldRate, setGoldRate] = useState(0);
  const [silverRate, setSilverRate] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchRates = async () => {
      try {
        const response = await fetch(`${Api_Rate_url}`);
        const data = await response.json();
        if (isMounted) {
          setGoldRate(data.GOLDRATE || 0);
          setSilverRate(data.SILVERRATE || 0);
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 100);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const marqueeText = `GOLD (22K): ₹ ${goldRate.toLocaleString(
    "en-IN"
  )}   |   SILVER: ₹ ${silverRate.toLocaleString("en-IN")}`;

  return (
    <View style={styles.container}>
      <OneWayMarquee text={marqueeText} speed={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 60,
    width: "100%",
    backgroundColor: "#000000ee",
    paddingVertical: 6,

  },
  marqueeContainer: {
    overflow: "hidden",
    width: "100%",
  },
  marqueeText: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.gilroyBold,
    color: colors.white,
  },
});
