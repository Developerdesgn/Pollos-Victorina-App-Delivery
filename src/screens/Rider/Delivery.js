import React, {useContext, useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import Geolocation from '@react-native-community/geolocation';

const Delivery = ({navigation}) => {
  const context = useContext(AppContext);
  const [selectedButton, setSelectedButton] = useState('PEDIDOS EN CURSO');
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
    context.setLoading(true);
    setUser(context.userData);
    console.log(context.userData, 'newew');
    // const user = await AsyncStorage.getItem('userData');
    // console.log(user, 'renavavs');
    // setUser(JSON.parse(user));
    context.setLoading(false);
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
        setOrderCount(res?.data['in-progress']);
      })
      .catch(error => {
        console.log(error, 'errr');
        networkCheck(error);
      })
      .finally(() => context.setLoading(false));
  };

  useEffect(() => {
    // Function to fetch data from API
    const saveLocation = async () => {
      console.log('fetch');
      getaddress();
    };
    let intervalId;
    // Call fetchData initially and every 3 seconds when the component is on the screen
    if (isFocused) {
      intervalId = setInterval(saveLocation, 500000);
    } else {
      clearInterval(intervalId);
    }

    // Cleanup function to clear the interval when the component unmounts or not on the screen
    return () => clearInterval(intervalId);
  }, [isFocused]);
  // 180000

  const getaddress = () => {
    Geolocation.getCurrentPosition(info => {
      console.log(info, 'coords');

      saveRiderLocation({
        latitude: info?.coords?.latitude,
        longitude: info?.coords?.longitude,
      });
    });
  };

  const saveRiderLocation = async ({latitude, longitude}) => {
    // context.setLoading(true);
    const body = {
      latitude: latitude,
      longitude: longitude,
    };

    await RiderServices.saveRiderLocation({body: body, token: context.token})
      .then(async res => {
        console.log(res?.data, 'saved loc');
        // setHistoryOrder(res?.data);
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
        {/* {user?.name ? ( */}
        <RHeader
          onPress={() => {
            context.setToken('');
            context.setUserData({});
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('userData');

            // navigation.navigate('AuthScreensRider');
          }}
          title={`${context?.userData?.name} ${context?.userData?.last_name}`}
          text={'Delivery interno'}
          ID={context?.userData?.id}
        />
        {/* ) : null} */}

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
