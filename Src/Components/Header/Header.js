// components/AppHeader.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Api_Base_url } from '../../Config/Config';

const AppHeader = () => {
  const [companyName, setCompanyName] = useState('Loading...');
  const [logoSource, setLogoSource] = useState(require('../../../assets/icon.png'));

  const getCompanyName = async () => {
    try {
      const url = `${Api_Base_url}companyNamesAndLogo`;
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0 && data[0].COMPANYNAME) {
        setCompanyName(data[0].COMPANYNAME);
        
        if (data[0].LOGO_URL) {
          setLogoSource({ uri: data[0].LOGO_URL });
        }
      } else {
        setCompanyName('Company');
      }
    } catch (error) {
      console.error('Error fetching company:', error);
      setCompanyName('Company');
    }
  };

  useEffect(() => {
    getCompanyName();
  }, []);

  return (
    <View style={styles.header}>
      <Image 
        source={logoSource} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <Text style={styles.companyName}>
        {companyName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderRadius:10
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 15,
    borderRadius: 20,
  },
  companyName: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    flexWrap: 'wrap',
    fontWeight:"bold"
  },
});

export default AppHeader;