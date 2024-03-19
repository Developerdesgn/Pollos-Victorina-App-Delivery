import React, {useContext, useEffect} from 'react';
import {View, ImageBackground, StyleSheet, Alert} from 'react-native';
import {BackgroundSvg} from '../../assets/images/svg';
import {screenHeight, screenWidth} from '../../constants/screenResolution';
import {AppContext} from '../../Providers';

const Intro1 = ({navigation}) => {
  const context = useContext(AppContext);
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Intro2');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundSvg />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'stretch' or 'contain'
  },
});

export default Intro1;
