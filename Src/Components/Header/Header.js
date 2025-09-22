import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import { Api_Base_url2 } from '../../Config/Config';

const AppHeader = () => {
  const [companyName, setCompanyName] = useState('Loading...');
  const [logoSource, setLogoSource] = useState(require('../../Assets/Images/logo.jpg'));
  const fadeAnim = useState(new Animated.Value(0))[0];

  const getCompanyName = async () => {
    try {
      const url = `${Api_Base_url2}companyNames`;
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0 && data[0].COMPANYNAME) {
        setCompanyName(data[0].COMPANYNAME);
        
        if (data[0].LOGO_URL) {
          setLogoSource({ uri: data[0].LOGO_URL });
        }
      } else {
        setCompanyName('Vairamaaligai Jewellers');
      }
    } catch (error) {
      console.error('Error fetching company:', error);
      setCompanyName('Vairamaaligai Jewellers');
    } finally {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    getCompanyName();
  }, []);

  return (
    <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
      <View style={styles.logoContainer}>
        <Image 
          source={logoSource} 
          style={styles.logo} 
          resizeMode="cover"
        />
        <View style={styles.logoGlow} />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.companyName} numberOfLines={1} ellipsizeMode="tail">
          {companyName} JEWELLERY
        </Text>
        {/* <Text style={styles.tagline}>Elegance Redefined</Text> */}
      </View>
      
      <View style={styles.divider} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(179, 100, 55)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(252, 198, 147, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderRadius:10
  },
  logoContainer: {
    position: 'relative',
    marginRight: 15,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: 'rgba(252, 198, 147, 0.5)',
    zIndex: 2,
  },
  logoGlow: {
    position: 'absolute',
    width: 47,
    height: 47,
    borderRadius: 23.5,
    backgroundColor: 'rgba(252, 198, 147, 0.15)',
    top: -1,
    left: -1,
    zIndex: 1,
  },
  textContainer: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontFamily: 'serif',
    color: '#f5f5f5',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(252, 198, 147, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontWeight:"bold"
  },
  tagline: {
    fontSize: 13,
    fontFamily: 'serif',
    color: 'rgba(252, 198, 147, 0.8)',
    letterSpacing: 0.8,
    marginTop: 2,
    fontWeight:"bold"
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    left: 80,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(252, 198, 147, 0.2)',
  },
});

export default AppHeader;