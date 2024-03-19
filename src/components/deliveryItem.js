import {View, Text} from 'react-native';
import React from 'react';
import Fonts from '../assets/fonts';
import {colors} from '../constants';
import FontSizes from '../constants/fontSizes';
import Ionicons from 'react-native-vector-icons/Ionicons'; // You can change the icon library if needed
import {moderateScale} from 'react-native-size-matters';
import {ComboChickenSvg} from '../assets/images/svg';
import styles from '../globalStyle';
import Button from './button';
import Clock from '../assets/images/svg/Timer.svg';
import {screenWidth} from '../constants/screenResolution';
const DeliveryItem = ({time, onPress}) => {
  return (
    <View style={{width: '100%', marginBottom: moderateScale(15)}}>
      <View
        style={[
          styles.shadow,
          {
            width: '100%',
            // backgroundColor:'red',
            marginBottom: moderateScale(10),
            paddingVertical: moderateScale(12),
            display: 'flex',
            flexDirection: 'row',
          },
        ]}>
        <View style={{alignSelf: 'center', flex: 0.4}}>
          <ComboChickenSvg />
        </View>
        <View style={{flex: 0.6}}>
          <Text
            style={{
              top: moderateScale(2),
              right: moderateScale(10),
              position: 'absolute',
              fontFamily: Fonts.regular,
              color: colors.primaryA,
              fontSize: FontSizes.xsmall,
            }}>
            ID #5679
          </Text>
          <View>
            <Text
              style={{
                fontFamily: Fonts.regular,
                color: colors.gray,
                fontSize: FontSizes.xsmall,
              }}>
              13 Sept, 10:00pm
            </Text>
            <Text
              style={{
                fontFamily: Fonts.extraBold,
                color: colors.black,
                fontSize: FontSizes.small,
                width: screenWidth - moderateScale(180),
                // width: '80%',
              }}>
              {/* {text} */}
              Combo 2 Piezas de Pollo x2
            </Text>
            <Text
              style={{
                fontFamily: Fonts.regular,
                color: colors.gray,
                fontSize: FontSizes.xsmall,
              }}>
              {/* {text} */}
              <Text style={{color: colors.black, fontWeight: '700'}}>
                1x
              </Text>{' '}
              Refresco de uva
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons
                name={'location-outline'}
                size={moderateScale(14)}
                color={colors.gray}
              />
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: colors.gray,
                  fontSize: FontSizes.xsmall,

                  width: screenWidth - moderateScale(200),
                }}>
                Av. Winston Churchill, Multicentro
              </Text>
            </View>
            <Text
              style={{
                fontFamily: Fonts.regular,
                color: colors.gray,
                fontSize: FontSizes.xsmall,
                paddingLeft: moderateScale(5, 0.1),
                width: '100%',
              }}>
              $ 545.00
            </Text>
          </View>
        </View>
        {time ? (
          <View
            style={[
              styles.row,
              {
                // backgroundColor:"red",
                alignItems: 'center',
                bottom: moderateScale(5),
                right: moderateScale(50),
                position: 'absolute',
              },
            ]}>
            <View>
              <Clock
                width={moderateScale(14)}
                height={moderateScale(14)}
                stroke={colors.primaryA}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: colors.primaryA,
                  fontSize: FontSizes.xsmall,
                  lineHeight: moderateScale(10),
                }}>
                Tiempo de entrega:
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.extraBold,
                  color: colors.primaryA,
                  fontSize: FontSizes.xsmall,
                  lineHeight: moderateScale(10),
                }}>
                {time}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
      {!time ? (
        <Button
          onPress={onPress}
          text={'Empezar entrega'}
          btnStyle={styles.primaryBtn}
        />
      ) : null}
    </View>
  );
};

export default DeliveryItem;
