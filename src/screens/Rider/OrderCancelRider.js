import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import HeaderIcon from '../../components/HeaderIcon';
import {moderateScale} from 'react-native-size-matters';
import ComboChicken from '../../components/ComboChicken';
import styles from '../../globalStyle';
import {colors} from '../../constants';
import RadioButton from '../../components/radio';
import {screenWidth} from '../../constants/screenResolution';
import FontSizes from '../../constants/fontSizes';
import Fonts from '../../assets/fonts';
import CustomButton from '../../components/CustomButton';
import {AppContext} from '../../Providers';
import {networkCheck} from '../../constants/axios';
import {OrderServices, RiderServices} from '../../services';

const OrderCancel = ({navigation, route}) => {
  const context = useContext(AppContext);
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [isSelected, setIsSelected] = useState([]);

  useEffect(() => {
    getReasons();
  }, []);

  const getReasons = async () => {
    context.setLoading(true);
    await RiderServices.getCancelReasons({token: context.token})
      .then(res => {
        console.log(res?.data, 'reasons');
        setIsSelected(res?.data);
      })
      .catch(err => {
        console.log(err, 'error');
        networkCheck(err);
      })
      .finally(() => {
        context.setLoading(false);
      });
  };

  const cancelOrder = async () => {
    if (reason && description) {
      context.setLoading(true);
      Keyboard.dismiss();
      const body = {
        order_id: 1,
        cancel_reason: reason,
        cancel_reason_description: description,
      };
      console.log(body, 'body');
      setReason('');
      setDescription('');
      await RiderServices.cancelOrder({reasons: body, token: context.token})
        .then(res => {
          console.log(res?.data, 'cancel order');
          navigation.navigate('CancelRider');
        })
        .catch(err => {
          console.log(err?.response?.data, 'error1');
          networkCheck(err);
        })
        .finally(() => {
          context.setLoading(false);
        });
    }
  };

  const onRadioBtnClick = (item, isSelected, setIsSelected) => {
    let updatedState = isSelected.map(isSelectedItem =>
      isSelectedItem.title === item.title
        ? {...isSelectedItem, selected: true}
        : {...isSelectedItem, selected: false},
    );
    setIsSelected(updatedState);
    setReason(item?.title);
    console.log(item.title);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: colors.white,
        // marginBottom: moderateScale(50),
        width: screenWidth,
      }}>
      <HeaderIcon
        navigation={navigation}
        text={'Cancelar pedido'}
        marginTop={moderateScale(30, 0.1)}
      />
      <View
        style={{
          width: screenWidth - 50,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <View style={{marginVertical: moderateScale(20, 0.1)}}>
          <ComboChicken data={route?.params?.data} />
        </View>
        <Text
          style={[
            styles.boldText,
            styles.mV2,
            {marginLeft: moderateScale(10)},
          ]}>
          Motivo
        </Text>

        {isSelected?.map((item, i) => (
          <View style={{...styles.radioBtn}} key={i}>
            <RadioButton
              onPress={() => onRadioBtnClick(item, isSelected, setIsSelected)}
              selected={item?.selected}
              key={i}>
              {item?.title}
            </RadioButton>
          </View>
        ))}
        <TextInput
          style={style.descriptionInput}
          placeholder="Escribe la razon"
          multiline
          numberOfLines={8} // You can adjust the number of lines as needed
          value={description}
          onChangeText={e => setDescription(e)}
          placeholderTextColor={colors.grey}
        />
        <View style={{alignItems: 'center'}}>
          <CustomButton
            disable={reason === '' || description === ''}
            onPress={cancelOrder}
            title={'Cancelar pedido'}
            width={moderateScale(300)}
            marginTop={moderateScale(10, 0.1)}
            marginBottom={moderateScale(70, 0.1)}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  descriptionInput: {
    color: colors.gray,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    padding: moderateScale(15),
    marginVertical: moderateScale(30, 0.1),
    fontSize: FontSizes.medium,
    fontFamily: Fonts.medium,
    textAlignVertical: 'top',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: screenWidth - 50, // This property ensures the text starts from the top
  },
});
export default OrderCancel;
