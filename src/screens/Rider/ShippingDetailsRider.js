import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  Touchable,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../components/Header';
import {moderateScale} from 'react-native-size-matters';
import {
  BackSvg,
  Bin,
  CallSvg,
  ChatSvg,
  GrayMark,
  LoadingMark,
  RedMark,
  TrackOrderSvg,
} from '../../assets/images/svg';
import {colors} from '../../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import Fonts from '../../assets/fonts';
import FontSizes from '../../constants/fontSizes';
import HeaderIcon from '../../components/HeaderIcon';
import ComboChicken from '../../components/ComboChicken';
import {useIsFocused} from '@react-navigation/native';
import {screenHeight, screenWidth} from '../../constants/screenResolution';
import CustomButton from '../../components/CustomButton';
import Caller from '../../assets/images/svg/caller.svg';
import styles from '../../globalStyle';
const ShippingDetailsRider = ({navigation}) => {
  const refRBSheet = useRef();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Open the RBSheet when the screen is focused
      console.log('yes');
      refRBSheet.current.open();
    }
  }, [isFocused]);

  const RBSheetComponent = () => {
    return (
      <View style={{marginTop: moderateScale(17, 0.1), width: screenWidth}}>
        <ComboChicken rating={false} id={true} />
        <View style={{alignItems: 'center'}}>
          <CustomButton
            onPress={() => {
              navigation.navigate('CompleteRider');
            }}
            title={'Pedido entregado'}
            marginBottom={moderateScale(10, 0.1)}
            marginTop={moderateScale(10, 0.1)}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OrderCancelRider');
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginVertical: moderateScale(20, 0.1),
            }}>
            <Bin />

            <Text
              style={{
                fontFamily: Fonts.bold,
                color: colors.primaryA,
                fontSize: FontSizes.regular,
              }}>
              {/* {text} */}
              Problemas con el orden
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              color: colors.time,
              fontSize: FontSizes.extraBigX,
            }}>
            {/* {text} */}
            20 min
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              color: colors.grey,
              fontSize: FontSizes.regular,
            }}>
            {/* {text} */}
            Tiempo estimado de entrega
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              color: colors.grey,
              fontSize: FontSizes.regular,
            }}>
            {/* {text} */}
            10:20pm
          </Text>
   
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: colors.white,
              height: moderateScale(101, 0.1),
              borderWidth: 1,
              borderColor: colors.gray,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              width: screenWidth,
              paddingHorizontal: moderateScale(10, 0.1),
              //   position: 'absolute',
              //   bottom: 0,
            }}>
            <View
              style={{
                width: moderateScale(66, 0.1),
                height: moderateScale(66, 0.1),
                borderRadius: 33,
                backgroundColor: colors.lightGrey,
              }}></View>
            <View
              style={
                {
                  // alignContent: 'flex-start',
                }
              }>
              <Text
                style={{
                  fontFamily: Fonts.extraBold,
                  color: colors.time,
                  fontSize: FontSizes.regular,
                }}>
                {/* {text} */}
                Servicio Cliente
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: colors.grey,
                  fontSize: FontSizes.regular,
                  // marginLeft: moderateScale(15, 0.1),
                }}>
                {/* {text} */}
                Representante
              </Text>
            </View>
            <View style={[styles.row, styles.alignCenter]}>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.close();
                  navigation.navigate('CustomerServiceRider');
                }}>
                {/* <CallSvg /> */}
                <Caller />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: moderateScale(-10),
                  marginLeft: -moderateScale(15),
                }}
                onPress={() => {
                  refRBSheet.current.close();
                  navigation.navigate('CustomerServiceRider');
                }}>
                <ChatSvg />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.lightGrey,
        width: screenWidth,
      }}>
      <HeaderIcon
        navigation={navigation}
        text={'Detalles del pedido'}
        marginTop={moderateScale(30, 0.1)}
      />
      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: moderateScale(100, 0.1),
          width: screenWidth - 50,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <TrackOrderSvg />
      </TouchableOpacity>
      <RBSheet
        closeOnPressBack={true}
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          // wrapper: {
          //   backgroundColor: 'transparent',
          // },
          container: {
            height: moderateScale(440),
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          // draggableIcon: {
          //   backgroundColor: colors.darkGray,
          //   width: moderateScale(70),
          //   height: moderateScale(7),
          // },
        }}>
        <ScrollView>
          <RBSheetComponent />
        </ScrollView>
      </RBSheet>
    </View>
  );
};

export default ShippingDetailsRider;
