import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {LogoRed, LogoWhite} from '../../assets/images/svg';
import {colors} from '../../constants';
import {useIsFocused} from '@react-navigation/native';

const Intro2 = ({navigation}) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('StartScreen');
      navigation.navigate('SignInRider');
    }, 3000);
  }, [isFocused]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
      }}>
      <View>
        <LogoWhite />
      </View>
      {/* <Text>Maaz</Text> */}
    </View>
  );
};

export default Intro2;
