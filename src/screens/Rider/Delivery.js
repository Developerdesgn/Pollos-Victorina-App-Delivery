import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../globalStyle';
import RHeader from '../../components/RiderHeader';
import DeliveryItem from '../../components/deliveryItem';
import CustomModal from '../../components/modal';
import Tabs from '../../components/tabs';
import {useIsFocused} from '@react-navigation/native';
import {AppContext} from '../../Providers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Delivery = ({navigation}) => {
  const context = useContext(AppContext);
  const [selectedButton, setSelectedButton] = useState('02');
  const [modalVisible, setModalVisible] = useState(false);
  // const isFocused = useIsFocused();
  // useEffect(() => {
  //   if (isFocused) {
  //     // Fetch data or perform actions on screen focus
  //     selectedButton;
  //   }
  // }, [navigation]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        styles.pH,
        styles.screeWidthContainer,
      ]}>
      <RHeader
        onPress={() => {
          context.setToken('');
          AsyncStorage.removeItem('token');
          // navigation.navigate('AuthScreensRider');
        }}
        title={'Nombre usuario'}
        text={'Delivery interno'}
        ID={'55657'}
      />

      <Tabs
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
      />
      {selectedButton === '02' ? (
        <View style={{width: '100%'}}>
          <Text
            style={[
              styles.boldText,
              styles.mT,
              styles.mV,
              {alignSelf: 'flex-start'},
            ]}>
            PEDIDOS EN CURSO
          </Text>

          <DeliveryItem
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
          <DeliveryItem
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      ) : (
        <View style={{width: '100%'}}>
          <Text
            style={[
              styles.boldText,
              styles.mT,
              styles.mV,
              {alignSelf: 'flex-start'},
            ]}>
            HISTORIAL DEL PEDIDO
          </Text>
          <DeliveryItem time={'20 minutos'} />

          <DeliveryItem time={'15 minutos'} />
        </View>
      )}

      <CustomModal
        onPress1={() => {
          navigation.navigate('ShippingDetailsRider');
        }}
        onPress2={() => {
          setModalVisible(!modalVisible);
        }}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </ScrollView>
  );
};

export default Delivery;
