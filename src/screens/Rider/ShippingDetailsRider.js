import Geolocation from '@react-native-community/geolocation';
import {useIsFocused} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, {Marker, PROVIDER_GOOGLE, Camera} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {AppContext} from '../../Providers';
import Fonts from '../../assets/fonts';
import {Bin, ChatSvg} from '../../assets/images/svg';
import Caller from '../../assets/images/svg/caller.svg';
import ComboChicken from '../../components/ComboChicken';
import CustomButton from '../../components/CustomButton';
import HeaderIcon from '../../components/HeaderIcon';
import Loader from '../../components/loader';
import CustomModal from '../../components/modal';
import {colors} from '../../constants';
import {networkCheck} from '../../constants/axios';
import FontSizes from '../../constants/fontSizes';
import {screenHeight, screenWidth} from '../../constants/screenResolution';
import styles from '../../globalStyle';
import {RiderServices} from '../../services';
import {GOOGLE_API_KEY} from '../AuthRider/Register';
import Rider from '../../assets/images/svg/delivery.svg';
import Feather from 'react-native-vector-icons/Feather';

const LATITUDE = 29.9417666;
const LONGITUDE = -95.3991524;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const SPACE = 0.01;

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const obj = {
  centroid: {
    latitude: '24.2472',
    longitude: '89.920914',
  },
  boundingBox: {
    southWest: {
      latitude: '24.234631',
      longitude: '89.907127',
    },
    northEast: {
      latitude: '24.259769',
      longitude: '89.934692',
    },
  },
};
const lat = parseFloat(obj.centroid.latitude);
const lng = parseFloat(obj.centroid.longitude);
const northeastLat = parseFloat(obj.boundingBox.northEast.latitude);
const southwestLat = parseFloat(obj.boundingBox.southWest.latitude);
const latDelta = northeastLat - southwestLat;
const lngDelta = latDelta * ASPECT_RATIO;

const ShippingDetailsRider = ({navigation, route}) => {
  const context = useContext(AppContext);
  const mapRef = useRef();
  const markerRef = useRef();
  const refRBSheet = useRef();
  const isFocused = useIsFocused();
  // console.log('dat', route?.params?.data);

  const [modalVisible, setModalVisible] = useState(false);
  const [userLoc, setUserLoc] = useState(null);
  const [region, setRegion] = useState(null);
  const [riderLoc, setRiderLoc] = useState(null);

  // const [address, setAddress] = useState({});

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Delivery');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    // Function to fetch data from API
    const saveLocation = async () => {
      // console.log('fetch')
      getaddress();
    };
    let intervalId;
    // Call fetchData initially and every 3 seconds when the component is on the screen
    if (isFocused) {
      // intervalId = setInterval(saveLocation, 5000);
    } else {
      clearInterval(intervalId);
    }

    // Cleanup function to clear the interval when the component unmounts or not on the screen
    return () => clearInterval(intervalId);
  }, [isFocused]);
  // 180000

  const getaddress = () => {
    Geolocation.getCurrentPosition(info => {
      // console.log(info, 'coords');
      // setRiderLoc({
      //   latitude: info?.coords?.latitude,
      //   longitude: info?.coords?.longitude,
      // });
      let r = {
        latitude: 18.4819735,
        longitude: -69.9288782,
      };
      setRiderLoc(r);
      saveRiderLocation({
        latitude: info?.coords?.latitude,
        longitude: info?.coords?.longitude,
      });
    });
  };

  useEffect(() => {
    if (isFocused) {
      getLatLong(route?.params?.data?.branche_address, setRegion);
      getLatLong(route?.params?.data?.user_address, setUserLoc);
    }
  }, [isFocused]);

  const getLatLong = (address, setData) => {
    // context.setLoading(true);
    Geocoder.from(address)
      .then(json => {
        console.log(json, address, 'skd');
        var location = json.results[0].geometry.location;
        if (json.status === 'OK') {
          setData({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta,
          });
        }
      })
      .catch(error => {
        console.warn(error, 'error2');
      });
  };

  useEffect(() => {
    if (isFocused) {
      refRBSheet.current.open();
    }
  }, [isFocused]);

  useEffect(() => {
    if (region && userLoc) {
      console.log(region, userLoc, 'loc');
    }
  }, [region, userLoc]);

  const openMap = () => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${userLoc.latitude},${userLoc?.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  const orderComplete = async id => {
    context.setLoading(true);
    refRBSheet.current.close();
    setModalVisible(false);
    await RiderServices.orderComplete({id: id, token: context.token})
      .then(async res => {
        console.log(res?.data, 'complete');
        navigation.navigate('CompleteRider');
      })
      .catch(error => {
        console.log(error, 'errr');
        networkCheck(error);
      })
      .finally(() => context.setLoading(false));
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

  const handleZoomIn = () => {
    mapRef.current?.getCamera().then((cam: Camera) => {
      if (Platform.OS === 'android') {
        cam.zoom += 1;
      } else {
        cam.altitude /= 2;
      }
      mapRef.current?.animateCamera(cam);
    });
  };

  const handleZoomOut = () => {
    mapRef.current?.getCamera().then((cam: Camera) => {
      if (Platform.OS === 'android') {
        cam.zoom -= 1;
      } else {
        cam.altitude *= 2;
      }
      mapRef.current?.animateCamera(cam);
    });
  };

  const RBSheetComponent = () => {
    return (
      <View style={{marginTop: moderateScale(0, 0.1), width: screenWidth}}>
        <ComboChicken rating={false} id={true} data={route?.params?.data} />
        <View style={{alignItems: 'center'}}>
          <CustomButton
            // onPress={() => {
            //   navigation.navigate('CompleteRider');
            // }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            title={'Pedido entregado'}
            marginBottom={moderateScale(10, 0.1)}
            marginTop={moderateScale(10, 0.1)}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OrderCancelRider', {
                data: route?.params?.data,
              });
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginVertical: moderateScale(20, 0.1),
            }}>
            <Bin />

            <Text
              style={{
                fontFamily: Fonts.bold,
                color: colors.primaryA,
                fontSize: FontSizes.regular,
              }}>
              {/* {text} */}
              Problemas con el orden
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: Fonts.extraBold,
              color: colors.time,
              fontSize: FontSizes.extraBigX,
            }}>
            {/* {text} */}
            20 min
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              color: colors.grey,
              fontSize: FontSizes.regular,
            }}>
            {/* {text} */}
            Tiempo estimado de entrega
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              color: colors.grey,
              fontSize: FontSizes.regular,
            }}>
            {/* {text} */}
            10:20pm
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: colors.white,
              height: moderateScale(101, 0.1),
              borderWidth: 1,
              borderColor: colors.gray,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              width: screenWidth,
              paddingHorizontal: moderateScale(10, 0.1),
              //   position: 'absolute',
              //   bottom: 0,
            }}>
            <View
              style={{
                width: moderateScale(66, 0.1),
                height: moderateScale(66, 0.1),
                borderRadius: 33,
                backgroundColor: colors.lightGrey,
              }}></View>
            <View
              style={
                {
                  // alignContent: 'flex-start',
                }
              }>
              <Text
                style={{
                  fontFamily: Fonts.extraBold,
                  color: colors.time,
                  fontSize: FontSizes.regular,
                }}>
                {/* {text} */}
                Servicio Cliente
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: colors.grey,
                  fontSize: FontSizes.regular,
                  // marginLeft: moderateScale(15, 0.1),
                }}>
                {/* {text} */}
                Representante
              </Text>
            </View>
            <View style={[styles.row, styles.alignCenter]}>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.close();
                  navigation.navigate('CustomerServiceRider');
                }}>
                {/* <CallSvg /> */}
                <Caller />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: moderateScale(-10),
                  marginLeft: -moderateScale(15),
                }}
                onPress={() => {
                  refRBSheet.current.close();
                  navigation.navigate('CustomerServiceRider');
                }}>
                <ChatSvg />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        ...StyleSheet.absoluteFillObject,
        ...styles.sav,
      }}>
      {context?.loading ? <Loader /> : null}
      {region && userLoc ? (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          region={region}
          initialRegion={{
            latitude: 18.4338645,
            longitude: -68.9658817,
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta,
          }}>
          {riderLoc ? (
            <Marker.Animated ref={markerRef} coordinate={riderLoc}>
              {/* <View style={styles.abs}> */}
              {/* <Image
                source={require('../../assets/images/png/rider.png')}
                style={styles.img}
              /> */}
              <Rider width={moderateScale(24)} height={moderateScale(24)} />
              {/* </View> */}
            </Marker.Animated>
          ) : null}

          <Marker
            coordinate={{
              latitude: region?.latitude,
              longitude: region?.longitude,
            }}>
            {/* <View style={styles.abs}> */}
            <Image
              source={require('../../assets/images/png/union.png')}
              style={[{height: moderateScale(25), width: moderateScale(25)}]}
            />
            {/* </View> */}
          </Marker>
          <Marker
            coordinate={{
              latitude: userLoc?.latitude,
              longitude: userLoc?.longitude,
            }}
            pinColor="red"
          />
          <MapViewDirections
            strokeColor={colors.primary}
            origin={riderLoc ? riderLoc : region}
            destination={userLoc}
            apikey={GOOGLE_API_KEY}
            strokeWidth={moderateScale(5)}
          />
        </MapView>
      ) : null}
      <HeaderIcon
        navigation={navigation}
        text={'Detalles del pedido'}
        marginTop={moderateScale(30, 0.1)}
      />
      <TouchableOpacity onPress={handleZoomIn} style={styles.zoom}>
        <Feather
          name="zoom-in"
          size={moderateScale(24)}
          color={colors.white}
          onPress={handleZoomIn}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleZoomOut}
        style={[
          styles.zoom,
          {margin: moderateScale(10), top: moderateScale(120)},
        ]}>
        <Feather
          name="zoom-out"
          size={moderateScale(24)}
          color={colors.white}
          onPress={handleZoomOut}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: moderateScale(100, 0.1),
          width: screenWidth - 50,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <TrackOrderSvg />
      </TouchableOpacity> */}
      <RBSheet
        closeOnPressBack={true}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        minClosingHeight={moderateScale(100)}
        customStyles={{
          container: {
            height: moderateScale(460),
            borderTopLeftRadius: moderateScale(15),
            borderTopRightRadius: moderateScale(15),
          },
        }}>
        <ScrollView>
          <RBSheetComponent />
          <CustomModal
            onPress1={() => {
              console.log(route?.params?.data);
              orderComplete(route?.params?.data?.o_id);
            }}
            onPress2={() => {
              setModalVisible(!modalVisible);
            }}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
        </ScrollView>
      </RBSheet>
      <TouchableOpacity
        onPress={handleZoomOut}
        style={[{position: 'absolute', bottom: moderateScale(100)}]}>
        <Feather
          name="zoom-out"
          size={moderateScale(24)}
          color={colors.white}
          onPress={handleZoomOut}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // refRBSheet.current.open();
          openMap();
        }}
        style={styles.bottom}>
        <View style={styles.hl} />
        <Text style={[styles.menuText, styles.btxt]}>open</Text>
      </TouchableOpacity>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default ShippingDetailsRider;
