import {View, Text, Image} from 'react-native';
import React from 'react';
import Fonts from '../assets/fonts';
import {colors} from '../constants';
import FontSizes from '../constants/fontSizes';
import AntDesign from 'react-native-vector-icons/AntDesign'; // You can change the icon library if needed
import {moderateScale} from 'react-native-size-matters';
import {ComboChickenSvg} from '../assets/images/svg';
import {screenHeight, screenWidth} from '../constants/screenResolution';

const ComboChicken = ({
  data,
  text,
  text1,
  text2,
  alignItems,
  width,
  rating = true,
  id,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: width,
        alignSelf: 'center',
      }}>
      <View style={{width: screenWidth * 0.3, height: screenHeight * 0.15}}>
        {data?.product?.image ? (
          <Image
            source={{uri: data?.product?.image}}
            resizeMode={'cover'}
            style={{width: '100%', height: '100%'}}
          />
        ) : (
          <ComboChickenSvg
            style={{
              marginTop: moderateScale(20),
              marginLeft: moderateScale(-20),
            }}
          />
        )}
      </View>
      <View>
        <Text
          style={{
            fontFamily: Fonts.extraBold,
            color: colors.primary,
            fontSize: FontSizes.medium,
            width: '80%',
            //   marginTop: moderateScale(15, 0.1),
          }}>
          {/* {text} */}
          {data?.product_name}
        </Text>
        {!rating ? null : (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AntDesign
              name={'star'}
              size={moderateScale(14)}
              color={colors.primary}
            />

            <Text
              style={{
                fontFamily: Fonts.extraBold,
                color: colors.gray,
                fontSize: FontSizes.extraSmall,
                paddingLeft: moderateScale(5, 0.1),
              }}>
              {data?.product?.avg_rating}
            </Text>
          </View>
        )}
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: colors.gray,
            fontSize: FontSizes.small,
          }}>
          {text1 ? text1 : '13 Sept, 10:00pm'}
        </Text>
        <Text
          style={
            text1
              ? {
                  fontFamily: Fonts.bold,
                  color: colors.gray,
                  fontSize: FontSizes.small,
                }
              : {
                  fontFamily: Fonts.medium,
                  color: colors.darkishGray,
                  fontSize: FontSizes.regular,
                  marginTop: moderateScale(5, 0.1),
                }
          }>
          {text2 ? text2 : '1x Refresco De Uva'}
        </Text>
        {id && (
          <Text
            style={{
              fontFamily: Fonts.medium,
              color: colors.gray,
              fontSize: FontSizes.small,
            }}>
            ID #5679
          </Text>
        )}
      </View>
    </View>
  );
};

export default ComboChicken;
