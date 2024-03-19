import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
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

const OrderCancelRider = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [isSelected, setIsSelected] = useState([
    {
      id: 1,
      name: 'La persona no se presento',
      selected: true,
    },
    {
      id: 2,
      name: 'No toman las llamadas',
      selected: false,
    },
    {
      id: 3,
      name: 'No encontre el lugar',
      selected: false,
    },
    {
      id: 4,
      name: 'Orden equivocada',
      selected: false,
    },
    {
      id: 5,
      name: 'Por avería',
      selected: false,
    },
  ]);

  const onRadioBtnClick = (item, isSelected, setIsSelected) => {
    let updatedState = isSelected.map(isSelectedItem =>
      isSelectedItem.id === item.id
        ? {...isSelectedItem, selected: true}
        : {...isSelectedItem, selected: false},
    );
    setIsSelected(updatedState);

    console.log(item.name);
  };
  return (
    <ScrollView
      contentContainerStyle={{backgroundColor: colors.white}}
      style={{
        backgroundColor: colors.white,
        width: screenWidth,
      }}>
      <View
        style={{
          width: screenWidth - 50,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <Text
          style={{
            fontFamily: Fonts.extraBold,
            color: colors.primary,
            fontSize: FontSizes.large1,
            marginTop: moderateScale(25, 0.1),
            textAlign: 'center',
          }}>
          Cancelar pedido
        </Text>
        <View style={{marginVertical: moderateScale(20, 0.1)}}>
          <ComboChicken />
        </View>
        <Text
          style={[
            styles.boldText,
            styles.mV2,
            {marginLeft: moderateScale(10)},
          ]}>
          Motivo
        </Text>
        {isSelected.map((item, i) => (
          <View style={{...styles.radioBtn}} key={i}>
            <RadioButton
              onPress={() => onRadioBtnClick(item, isSelected, setIsSelected)}
              selected={item.selected}
              key={item.id}>
              {item.name}
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
          placeholderTextColor={colors.lightGrey}
        />
        <View style={{alignItems: 'center'}}>
          <CustomButton
            onPress={() => {
              navigation.navigate('CancelRider');
            }}
            title={'Cancelar pedido'}
            width={308}
            marginTop={moderateScale(10, 0.1)}
            marginBottom={moderateScale(0, 0.1)}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  descriptionInput: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: moderateScale(30, 0.1),
    fontSize: FontSizes.medium,
    fontFamily: Fonts.medium,
    textAlignVertical: 'top',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: screenWidth - 50, // This property ensures the text starts from the top
  },
});
export default OrderCancelRider;
