import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Food1 from '../assets/images/svg/food1.svg';
import Food2 from '../assets/images/svg/food2.svg';
import Food3 from '../assets/images/svg/food3.svg';
import Food4 from '../assets/images/svg/food4.svg';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../constants';
import FontSizes from '../constants/fontSizes';
import Fonts from '../assets/fonts';
import Star from '../assets/images/svg/Star.svg';
import {screenHeight, screenWidth} from '../constants/screenResolution';
import Entypo from 'react-native-vector-icons/Entypo';

const FoodItem = ({data, navigation}) => {
  const [localData, setLocalData] = useState(data);
  const heartClick = click => {
    let tem = {...localData, heartClicked: click ? true : false};
    setLocalData(tem);
  };
  // console.log(localData, 'dd');
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PantallaPoducto', {product: localData});
      }}
      style={styles.item}>
      {/* {localData?.image()} */}
      <View
        style={{
          position: 'absolute',
          top: moderateScale(-30),
          // left: moderateScale(5),
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
        <View></View>
        <TouchableOpacity
          onPress={() => {
            heartClick(!localData?.heartClicked);
          }}
          style={styles.heartContainer}>
          <Entypo
            name={localData?.heartClicked ? 'heart' : 'heart-outlined'}
            size={moderateScale(30)}
            color={colors.primaryA}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>{localData?.name}</Text>

      <View style={styles.row}>
        <View style={styles.starContainer}>
          <Star width={moderateScale(17)} height={moderateScale(17)} />

          <Text
            style={{
              marginLeft: moderateScale(5),
              fontSize: FontSizes.small,
              fontFamily: Fonts.bold,
              color: colors.grey,
            }}>
            {localData?.avg_rating}
          </Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>${localData?.retail_price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    // flex:0.47,
    // flex:0.5,
    width: screenWidth * 0.43,
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
    marginBottom: moderateScale(25),
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
    marginTop: moderateScale(30),
    marginBottom: moderateScale(10),
    fontSize: FontSizes.medium,
    fontFamily: Fonts.extraBold,
    color: colors.primaryA,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 5,
    color: colors.primaryA,
  },
  priceContainer: {
    width: '60%',
    height: '29%',
    position: 'absolute',
    // width: moderateScale(100),
    bottom: 0,
    right: 0,
    backgroundColor: colors.primaryA,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    padding: moderateScale(8),
    paddingHorizontal: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
  },
  priceText: {
    fontSize: FontSizes.regular,
    fontFamily: Fonts.bold,
    color: colors.white,
  },
});

export default FoodItem;
