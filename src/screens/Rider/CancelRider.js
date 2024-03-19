import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {
  CancelR,
  HeaderSvg,
  Location,
  LocationPoint,
  OrderCompleteSvg,
  PaymentCompleteSvg,
} from '../../assets/images/svg';
import {colors} from '../../constants';
import CustomButton from '../../components/CustomButton';
import {moderateScale} from 'react-native-size-matters';
import Fonts from '../../assets/fonts';
import FontSizes from '../../constants/fontSizes';
import {useIsFocused} from '@react-navigation/native';

const CancelRider = ({navigation}) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 2000);
  }, [isFocused]);
  return (
    <View
      style={{flex: 1, backgroundColor: colors.white, alignItems: 'center'}}>
      <HeaderSvg width={419} height={133} />
      <TouchableOpacity>
        <CancelR width={286} height={295} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={{
            fontFamily: Fonts.extraBold,
            color: colors.primary,
            fontSize: FontSizes.large1,
            marginVertical: moderateScale(50, 0.1),
          }}>
          ¡Se ha cancelado el pedido!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CancelRider;
