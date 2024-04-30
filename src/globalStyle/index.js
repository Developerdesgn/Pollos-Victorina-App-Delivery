import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants';
import {moderateScale} from 'react-native-size-matters';
import fontSizes from '../constants/fontSizes';
import FontSizes from '../constants/fontSizes';
import Fonts from '../assets/fonts';
import {screenHeight, screenWidth} from '../constants/screenResolution';

const styles = StyleSheet.create({
  container: {
    paddingBottom: moderateScale(100),
    backgroundColor: colors.white,
    alignItems: 'center',
    // height:'100%'
  },
  sav: {
    flex: 1,
    height: screenHeight * 0.5,
    position: 'relative',
  },
  mainView: {
    paddingBottom: moderateScale(30),
  },
  blackBack: {
    backgroundColor: colors.textBlack,
    width: '100%',
    height: moderateScale(185),
    borderBottomRightRadius: moderateScale(80),
    borderBottomLeftRadius: moderateScale(25),
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },

  justifyContent: {
    width: screenWidth - 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: screenWidth - 30,
  },
  menu: {
    borderBottomWidth: 1,
    // paddingBottom: moderateScale(5),
    marginRight: moderateScale(10),
  },
  filter: {
    marginBottom: moderateScale(15),
    marginRight: moderateScale(5),
    // paddingHorizontal: moderateScale(6),
    borderRadius: moderateScale(25),
    borderWidth: 1,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
  },
  // Images ///
  image: {
    position: 'absolute',
    right: moderateScale(20),
    top: moderateScale(70),
    height: moderateScale(130),
    width: moderateScale(170),
  },

  filterIcon: {
    // resizeMode:'cover',
    height: moderateScale(26),
    width: moderateScale(26),
  },

  // Heading and Text //////
  headColumn: {
    height: '100%',
    paddingLeft: moderateScale(40),
    justifyContent: 'center',
  },

  heading1: {
    color: colors.white,
    fontSize: FontSizes.extraBig,
    fontFamily: Fonts.extraBold,
    lineHeight: moderateScale(28),
  },
  heading2: {
    color: colors.primaryA,
    fontSize: FontSizes.large1,
    fontFamily: Fonts.extraBold,
    lineHeight: moderateScale(28),
  },
  heading2a: {
    color: colors.black,
    fontSize: FontSizes.xLarge,
    fontFamily: Fonts.extraBold,
    // lineHeight: moderateScale(28),
  },
  heading3: {
    color: colors.white,
    fontSize: FontSizes.regular,
    fontFamily: Fonts.bold,
    lineHeight: moderateScale(20),
  },
  italic: {
    alignSelf: 'flex-start',
    fontStyle: 'italic',
    fontFamily: Fonts.extraBold,
    fontWeight: '900',
    color: colors.black,
  },
  text: {
    color: colors.mediumGray,
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    lineHeight: moderateScale(24),
  },
  boldText: {
    color: colors.primaryA,
    fontSize: FontSizes.large,
    fontFamily: Fonts.bold,
    lineHeight: moderateScale(20),
  },
  normalText: {
    color: colors.black,
    fontSize: FontSizes.normal,
    fontFamily: Fonts.medium,
    // lineHeight: moderateScale(28),
  },
  settingText: {
    color: colors.mediumGray,
    fontFamily: Fonts.medium,
    marginLeft: moderateScale(10),
  },
  btxt: {
    marginBottom: moderateScale(20),
    alignSelf: 'center',
    color: colors.primary,
  },

  smallText: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.extraBold,
    color: colors.primaryA,
    lineHeight: moderateScale(20),
    marginLeft: moderateScale(5),
  },
  xsmallText: {
    fontSize: FontSizes.xsmall,
    lineHeight: moderateScale(20),
    color: colors.grey,
  },
  menuText: {
    fontSize: FontSizes.regular,
    fontFamily: Fonts.extraBold,
    lineHeight: moderateScale(24),
  },
  xLargeText: {
    fontFamily: Fonts.extraBold,
    fontSize: FontSizes.extraLarge,
    color: colors.primaryA,
    lineHeight: moderateScale(22),
  },
  datePick: {
    borderColor: colors.primaryA,
    borderWidth: 2,
    borderRadius: moderateScale(50),
    width: '80%',
    alignItems: 'center',
    padding: moderateScale(15),
    backgroundColor: colors.secondary,
  },
  centeredText: {
    marginLeft: moderateScale(10),
    alignItems: 'flex-start',
    flex: 0.8,
  },
  thinGreyText: {
    lineHeight: moderateScale(16),
    fontFamily: Fonts.regular,
    color: colors.textBlack,
  },
  hl: {
    backgroundColor: colors.grey,
    borderRadius: 10,
    width: moderateScale(30),
    height: moderateScale(5),
    marginVertical: moderateScale(10),
    alignSelf: 'center',
  },

  secBack: {
    backgroundColor: colors.secondary,
    justifyContent: 'space-around',
    paddingHorizontal: moderateScale(15),
  },
  paymentCard: {
    marginTop: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.lightgrey,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(40),
    paddingVertical: moderateScale(20),
  },

  bottom: {
    bottom: 0,
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
    backgroundColor: colors.white,
    height: moderateScale(50),
    width: '100%',
    position: 'absolute',
  },
  //       margin padding          ///
  mT: {
    marginTop: moderateScale(40),
  },
  marginBottom: {
    marginBottom: moderateScale(15),
  },
  mV: {
    marginVertical: moderateScale(15),
  },
  mV2: {
    marginVertical: moderateScale(25),
  },
  mL: {
    marginLeft: moderateScale(5),
  },
  globalPadH: {
    paddingHorizontal: moderateScale(15),
  },
  globalPadM: {
    marginHorizontal: moderateScale(15),
  },
  pH: {
    paddingHorizontal: moderateScale(25),
  },
  responsiveWidth: {
    width: screenWidth - 80,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  screeWidthContainer: {
    width: screenWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  horizontalLine: {
    borderWidth: 0.5,
    borderColor: colors.black,
    width: '100%',
  },
  smallHL: {
    borderColor: 'rgba(0,0,0,0.3)',
    width: '50%',
    alignSelf: 'flex-start',
    marginLeft: moderateScale(45),
    marginVertical: moderateScale(10),
  },

  shadow: {
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
  ///            Button          //
  button: {
    backgroundColor: colors.primaryA,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(25),
  },
  primaryBtn: {
    paddingVertical: moderateScale(15),
    width: '100%',
    alignItems: 'center',
  },
  radioBtn: {
    width: '100%',
    justifyContent: 'center',
    marginVertical: moderateScale(5),
    // backgroundColor:'red'
  },
  trash: {
    // marginLeft: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryA,
    width: moderateScale(66),
    height: moderateScale(66),
    borderRadius: moderateScale(66 / 2),
    marginTop: moderateScale(25),
  },
  btn: {
    paddingVertical: moderateScale(5),
    marginVertical: moderateScale(5),
    flex: 0.49,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5),
  },
  absBtn: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
  },
  btnWithNoBack: {
    height: null,
    backgroundColor: colors.white,
    fontFamily: Fonts.medium,
    marginTop: moderateScale(-25),
  },
  roundIcon: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(48 / 2),
    height: moderateScale(48),
    width: moderateScale(48),
  },
  planeBtn: {
    height: null,
    backgroundColor: colors.white,
    fontFamily: Fonts.medium,
  },
  abs: {
    left: '50%',
    position: 'absolute',
    top: '55%',
    zIndex: 999,
  },
  img: {
    height: moderateScale(35),
    width: moderateScale(35),
    resizeMode: 'contain',
    tintColor: 'red',
  },
});

export default styles;
