import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg'; // Import SvgXml from react-native-svg
import Food1 from '../assets/images/svg/food1.svg';
import Food2 from '../assets/images/svg/food2.svg';
import Food3 from '../assets/images/svg/food3.svg';
import Food4 from '../assets/images/svg/food4.svg';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../constants';
import FontSizes from '../constants/fontSizes';
import Fonts from '../assets/fonts';
import Star from '../assets/images/svg/Star.svg';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {screenHeight, screenWidth} from '../constants/screenResolution';

const HorizontalFoodItem = ({data, navigation, heart, disable, onPress}) => {
  const [localData, setLocalData] = useState(data);
  const heartClick = click => {
    let tem = {...localData, heartClicked: click ? true : false};
    setLocalData(tem);
  };
  // console.log(data,'item')
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={() => {
        if (onPress) {
          onPress();
        } else {
          navigation.navigate('PantallaPoducto', {product: localData});
        }
      }}
      style={styles.container}>
      {/* <Text>h</Text> */}
      <View style={styles.item}>
        {/* // {localData?.image()} */}

        <View
          style={{
            position: 'absolute',
            top: moderateScale(-10),
            left: moderateScale(-50),
            width: moderateScale(110),
            height: moderateScale(110),
          }}>
          <Image
            source={{uri: localData?.image}}
            resizeMode={'contain'}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View style={styles.row}>
          <View style={{flex: 0.3}}></View>
          <Text style={styles.heading}>{localData?.name}</Text>

          <TouchableOpacity
            onPress={() => {
              heartClick(!localData?.heartClicked);
            }}
            style={styles.heartContainer}>
            {heart ? (
              <Entypo
                name={localData?.heartClicked ? 'heart' : 'heart-outlined'}
                size={moderateScale(30)}
                color={colors.primaryA}
              />
            ) : (
              <Octicons
                name={'plus-circle'}
                size={moderateScale(24)}
                color={colors.primaryA}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={[styles.row, {marginLeft: moderateScale(40)}]}>
          <View style={styles.starContainer}>
            <Star width={moderateScale(17)} height={moderateScale(17)} />

            <Text style={styles.rate}> {localData?.avg_rating}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${localData?.retail_price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: moderateScale(30),
    height: screenHeight * 0.15,
    width: screenWidth * 0.85,
  },
  item: {
    width: moderateScale(200),
    height: moderateScale(90),
    marginLeft: moderateScale(60),
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    // padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rate: {
    marginLeft: moderateScale(2),
    fontSize: FontSizes.small,
    fontFamily: Fonts.bold,
    color: colors.grey,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },

  heartContainer: {
    // marginTop:moderateScale(10)
    // Add styling for your heart container
  },
  heart: {
    fontSize: 20,
  },
  heading: {
    width: moderateScale(100),
    marginLeft: moderateScale(40),
    fontSize: FontSizes.medium,
    fontFamily: Fonts.extraBold,
    color: colors.primaryA,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(15),
  },
  star: {
    marginRight: 5,
    color: colors.primaryA,
  },
  priceContainer: {
    position: 'absolute',
    // width: moderateScale(100),
    bottom: 0,
    right: 0,
    backgroundColor: colors.primaryA,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    padding: moderateScale(4),
    paddingHorizontal: moderateScale(10),
    borderTopLeftRadius: moderateScale(20),
    width: '40%',
  },
  priceText: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.bold,
    color: colors.white,
  },
});

export default HorizontalFoodItem;
