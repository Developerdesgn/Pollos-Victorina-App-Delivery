import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styles from '../globalStyle';
import Images from '../assets/images';
import Button from './button';

const BackHeader = ({onPress}) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.blackBack}>
        <View style={[styles.row, {height: '100%'}]}>
          <View style={styles.headColumn}>
            <Text style={styles.heading1}>Titulo</Text>
            <Text style={styles.heading1}>promo</Text>

            <Text style={[styles.heading3, styles.marginBottom]}>
              Texto promo
            </Text>
            <Button text={'Comprar'} onPress={onPress} />
          </View>
          <View style={{flex: 0.1}}></View>
        </View>
      </View>
      <Image
        source={Images.Hamburguesa}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
};

export default BackHeader;
