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
      <View
        style={{
          width: moderateScale(100),
          height: moderateScale(120),
          marginRight: moderateScale(10),
        }}>
        {data?.product_image ? (
          <Image
            source={{uri: data?.product_image}}
            resizeMode={'contain'}
            style={{
              width: '100%',
              height: '100%',
            }}
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
      <View style={{padding: moderateScale(10)}}>
        <Text
          style={{
            fontFamily: Fonts.extraBold,
            color: colors.primary,
            fontSize: FontSizes.medium,
            width: '100%',
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
          {data?.created_at ? data?.created_at : '13 Sept, 10:00pm'}
        </Text>
        {data?.addtional_selection && (
          <Text
            style={{
              fontFamily: Fonts.medium,
              color: colors.darkishGray,
              fontSize: FontSizes.regular,
              marginTop: moderateScale(5, 0.1),
            }}>
            1x {data?.addtional_selection}
          </Text>
        )}

        {data?.drink && (
          <Text
            style={{
              fontFamily: Fonts.medium,
              color: colors.darkishGray,
              fontSize: FontSizes.regular,
              // marginTop: moderateScale(5, 0.1),
            }}>
            1x {data?.drink}
          </Text>
        )}

        {data?.order_id && (
          <Text
            style={{
              fontFamily: Fonts.medium,
              color: colors.gray,
              fontSize: FontSizes.small,
            }}>
            {data?.order_id}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ComboChicken;
