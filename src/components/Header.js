import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {BackSvg, HeaderSvg, LogoRed} from '../assets/images/svg';
import {colors} from '../constants';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import styless from '../globalStyle';
import {useNavigation} from '@react-navigation/native';

const Header = ({back, heart, logo, title, backIcon, titleAlign, onPress}) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* {backIcon || (
        <TouchableOpacity
          style={{
            position: 'absolute',
            alignSelf: 'flex-start',
            padding: moderateScale(10, 0.1),
            marginLeft: moderateScale(10, 0.1),
            marginTop: moderateScale(10, 0.1),
          }}>
          <BackSvg width={27} height={27} />
        </TouchableOpacity>
      )} */}

      <HeaderSvg width={419} height={133} />
      {!back ? (
        <TouchableOpacity
          onPress={() => {
            onPress ? onPress() : navigation.goBack();
          }}
          style={{
            position: 'absolute',
            left: moderateScale(20),
            top: moderateScale(40),
          }}>
          <Entypo
            name={'chevron-left'}
            size={moderateScale(30)}
            color={colors.primaryA}
          />
        </TouchableOpacity>
      ) : null}

      <View style={{position: 'absolute', top: moderateScale(60, 0.1)}}>
        {logo ? <LogoRed width={113} height={151} /> : null}
      </View>
      {title ? (
        <View
          style={{
            position: 'absolute',
            top: moderateScale(47, 0.1),
            left: titleAlign == 'left' ? moderateScale(55) : null,
          }}>
          <Text style={styless.heading2}>{title}</Text>
        </View>
      ) : null}
      {heart ? (
        <TouchableOpacity
          onPress={() => {
            setHeartClicked(!heartClicked);
          }}
          style={{
            position: 'absolute',
            right: moderateScale(20),
            top: moderateScale(40),
          }}>
          <Entypo
            name={heartClicked ? 'heart' : 'heart-outlined'}
            size={moderateScale(30)}
            color={colors.primaryA}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: Dimensions.get('screen').width - moderateScale(10),
    backgroundColor: colors.white,
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
export default Header;
