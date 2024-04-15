import React, {useContext, useEffect, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../globalStyle';
import RHeader from '../../components/RiderHeader';
import DeliveryItem from '../../components/deliveryItem';
import CustomModal from '../../components/modal';
import Tabs from '../../components/tabs';
import {useIsFocused} from '@react-navigation/native';
import {AppContext} from '../../Providers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RiderServices} from '../../services';
import {networkCheck} from '../../constants/axios';

const Delivery = ({navigation}) => {
  const context = useContext(AppContext);
  const [selectedButton, setSelectedButton] = useState('PEDIDOS EN CURSO');
  console.log(context?.userData, 'sda');
  const isFocused = useIsFocused();
  const [ordercount, setOrderCount] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const [orderinProgress, setOrderinProgress] = useState([]);
  const [historyOrder, setHistoryOrder] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isFocused) {
      // Fetch data or perform actions on screen focus
      getOrderInProgress(true);
      getHistoryOrders(true);
      getCount();
      getUser();
    }
  }, [isFocused]);

  const getUser = async () => {
    const user = await AsyncStorage.getItem('userData');
    setUser(JSON.parse(user));
  };

  const getOrderInProgress = async loader => {
    loader ? context.setLoading(true) : null;

    await RiderServices.getOrders({token: context.token})
      .then(async res => {
        console.log(res?.data, 'orders');
        setOrderinProgress(res?.data);
        setOrderCount(res?.data?.length);
      })
      .catch(error => {
        console.log(error, 'errr');
        networkCheck(error);
      })
      .finally(() => context.setLoading(false));
  };

  const startOrder = async data => {
    context.setLoading(true);
    console.log(data, 'gd');
    await RiderServices.startOrder({id: data?.o_id, token: context.token})
      .then(async res => {
        console.log(res?.data, 'start');
        navigation.navigate('ShippingDetailsRider', {data: data});

        // setHistoryOrder(res?.data);
      })
      .catch(error => {
        console.log(error, 'errr');
        networkCheck(error);
      })
      .finally(() => context.setLoading(false));
  };

  const getHistoryOrders = async loader => {
    loader ? context.setLoading(true) : null;

    await RiderServices.getHistoryOrders({token: context.token})
      .then(async res => {
        console.log(res?.data, 'history');
        setHistoryOrder(res?.data);
      })
      .catch(error => {
        console.log(error, 'errr');
        networkCheck(error);
      })
      .finally(() => context.setLoading(false));
  };

  const getCount = async () => {
    context.setLoading(true);

    await RiderServices.getCount({token: context.token})
      .then(async res => {
        console.log(res?.data, 'count');
        setHistoryCount(res?.data?.history);
        setOrderCount(res?.data?.in - progress);
      })
      .catch(error => {
        console.log(error, 'errr');
        networkCheck(error);
      })
      .finally(() => context.setLoading(false));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
          title={`${user?.name} ${user?.last_name}`}
          text={'Delivery interno'}
          ID={user?.id}
        />
        {/* {historyCount && ordercount && ( */}
        <Tabs
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          getOrders={getOrderInProgress}
          getOrders2={getHistoryOrders}
          ordercount={ordercount}
          historyCount={historyCount}
        />
        {/* )} */}

        {selectedButton === 'PEDIDOS EN CURSO' ? (
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
            {orderinProgress?.length ? (
              <FlatList
                keyExtractor={(elem, i) => i.toString()}
                data={orderinProgress}
                renderItem={elem => {
                  return (
                    <DeliveryItem startOrder={startOrder} data={elem?.item} />
                  );
                }}
              />
            ) : (
              <Text style={[styles.menuText, {alignSelf: 'center'}]}>
                No orders in progress
              </Text>
            )}
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
            {historyOrder?.length ? (
              <FlatList
                keyExtractor={(elem, i) => i.toString()}
                data={historyOrder}
                renderItem={elem => {
                  return <DeliveryItem data={elem?.item} time={'20 minutos'} />;
                }}
              />
            ) : (
              <Text style={[styles.menuText, {alignSelf: 'center'}]}>
                No orders in history
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Delivery;
