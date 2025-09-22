import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './HomeStyles';

const Header = ({ onProfilePress, company }) => (
  <View>
    <Image
      source={require('../assets/logo_transparent.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    />
    <View style={styles.header}>
      <Image
        source={require('../assets/icon.png')}
        style={{ width: 40, height: 40 }}
      />
<Text style={styles.headerTitle}>{company}</Text>
<Text style={styles.headerTitle}> </Text>
    </View>
  </View>
);

export default Header;