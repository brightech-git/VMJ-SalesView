// MaterialTable.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from './HomeStyles';
import { formatINR } from '../server/rupees';


export default function MaterialTable({ goldWeight, Oldgold, goldStock, silverWeight, OldSilver, silverStock, stngram, stncarat }) {
  return (
    <View>
      <View><Text style={{ color: 'red', textAlign: 'center' }}>* stock will be show for current date only*</Text></View>
      <View style={styles.table}>

        <View style={styles.headerRow}>
          <Text style={styles.firstCelll}>Material</Text>
          <Text style={styles.centercell}>Sales(g)</Text>
          <Text style={styles.centercell}>Purchase</Text>
          <Text style={styles.headerCel}>Stock(g)</Text>
        </View>

        <View style={styles.headerRoww}>
          <Text style={styles.firstCelll}>Gold</Text>

          <Text style={styles.centercell}>
            {formatINR(goldWeight)}            
            {stncarat !== 0 && (
              <Text style={styles.colorcell}>  {formatINR(stncarat)}c</Text>
            )}            
            {stngram !== 0 && (
              <Text style={styles.colorcell} >  {formatINR(stngram)}g</Text>
            )}
          </Text>

          <Text style={styles.centercell}>{formatINR(Oldgold)}</Text>
          <Text style={styles.headerCel}>{formatINR(goldStock)}</Text>
        </View>

        <View style={styles.headerRoww}>
          <Text style={styles.firstCelll}>Silver</Text>
          <Text style={styles.centercell}>{formatINR(silverWeight)}</Text>
          <Text style={styles.centercell}>{formatINR(OldSilver)}</Text>
          <Text style={styles.headerCel}>{formatINR(silverStock)}</Text>
        </View>
      </View>
    </View>
  );
}
