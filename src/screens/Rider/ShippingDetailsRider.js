import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  Touchable,
  TouchableWithoutFeedback,
  BackHandler,
  StyleSheet,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Header from '../../components/Header';
import {moderateScale} from 'react-native-size-matters';
import {
  BackSvg,
  Bin,
  CallSvg,
  ChatSvg,
  GrayMark,
  LoadingMark,
  RedMark,
  TrackOrderSvg,
} from '../../assets/images/svg';
import {colors} from '../../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import Fonts from '../../assets/fonts';
import FontSizes from '../../constants/fontSizes';
import HeaderIcon from '../../components/HeaderIcon';
import ComboChicken from '../../components/ComboChicken';
import {useIsFocused} from '@react-navigation/native';
import {screenHeight, screenWidth} from '../../constants/screenResolution';
import CustomButton from '../../components/CustomButton';
import Caller from '../../assets/images/svg/caller.svg';
import styles from '../../globalStyle';
import CustomModal from '../../components/modal';
import {RiderServices} from '../../services';
import {networkCheck} from '../../constants/axios';
import {AppContext} from '../../Providers';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_API_KEY} from '../AuthRider/Register';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const LATITUDE = 29.9417666;
const LONGITUDE = -95.3991524;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const SPACE = 0.01;

const ShippingDetailsRider = ({navigation, route}) => {
  const context = useContext(AppContext);
  const mapRef = useRef();

  const refRBSheet = useRef();
  const isFocused = useIsFocused();
  // console.log('dat', route?.params?.data);

  const [modalVisible, setModalVisible] = useState(false);
  const [userLoc, setUserLoc] = useState({});
  const [region, setRegion] = useState(null);
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
    Geocoder.init(GOOGLE_API_KEY);
    if (isFocused) {
      getLatLong(route?.params?.data?.branche_address, setRegion);
      getLatLong(route?.params?.data?.user_address, setUserLoc);
    }
  }, [isFocused]);

  const getLatLong = (address, setData) => {
    // context.setLoading(true);
    Geocoder.from(address)
      .then(json => {
        console.log(json, 'skd');
        var location = json.results[0].geometry.location;
        if (json.status === 'OK') {
          setData({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LATITUDE_DELTA,
          });
        }
      })
      .catch(error => {
        console.warn(error, 'error2');
      });
  };

  useEffect(() => {
    if (isFocused) {
      // Open the RBSheet when the screen is focused
      console.log('yes');
      refRBSheet.current.open();
    }
  }, [isFocused]);

  const orderComplete = async id => {
    context.setLoading(true);

    await RiderServices.orderComplete({id: id, token: context.token})
      .then(async res => {
        console.log(res?.data, 'complete');
        // setHistoryOrder(res?.data);
      })
      .catch(error => {
        console.log(error, 'errr');
        networkCheck(error);
      })
      .finally(() => context.setLoading(false));
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
        // alignItems: 'center',
        flex: 1,
        height: screenHeight * 0.5,
        position: 'relative',
      }}>
      {context?.loading ? <Loader /> : null}
      {region && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          // onRegionChange={text => {}}
          // onRegionChangeComplete={e => {
          //   // console.log(e)
          //   setRegion(e);
          // }}
          region={region}
          initialRegion={{
            latitude: 18.4338645,
            longitude: -68.9658817,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            onPress={() => {
              // setAddress(address);
              // refrbSheet.current.open();
            }}
            coordinate={{
              latitude: region?.latitude,
              longitude: region?.longitude,
            }}>
            {/* <View
            style={{
              left: '50%',
              position: 'absolute',
              top: '50%',
              zIndex: 999,
            }}>
            <Image
              source={{
                uri: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
              }}
              style={{height: moderateScale(35), width: moderateScale(35)}}
            />
          </View> */}
            <View
              style={{
                left: '50%',
                position: 'absolute',
                top: '55%',
                // backgroundColor: colors.primary,
                zIndex: 999,
              }}>
              <Image
                source={require('../../assets/images/png/union.png')}
                style={{height: moderateScale(35), width: moderateScale(35)}}
              />
            </View>
          </Marker>
          <Marker
            onPress={() => {
              // setAddress(address);
              // refrbSheet.current.open();
            }}
            coordinate={{
              latitude: userLoc?.latitude,
              longitude: userLoc?.longitude,
            }}
            title={userLoc?.name}
            description={userLoc?.description}>
            <View
              style={{
                left: '50%',
                position: 'absolute',
                top: '55%',
                height: moderateScale(60),
                width: moderateScale(60),
                zIndex: 999,
                // // backgroundColor:"yellow",
                // marginTop: moderateScale(15),
                // marginLeft: moderateScale(8),
              }}>
              <Image
                source={{
                  uri: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
                }}
                style={{height: moderateScale(35), width: moderateScale(35)}}
              />
            </View>
          </Marker>
          {/* <MapViewDirections
            strokeColor={colors.primary}
            origin={region}
            destination={userLoc}
            apikey={GOOGLE_API_KEY}
            strokeWidth={moderateScale(5)}
          /> */}
        </MapView>
      )}

      <HeaderIcon
        navigation={navigation}
        text={'Detalles del pedido'}
        marginTop={moderateScale(30, 0.1)}
      />
      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: moderateScale(100, 0.1),
          width: screenWidth - 50,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <TrackOrderSvg />
      </TouchableOpacity>
      <RBSheet
        closeOnPressBack={true}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            height: moderateScale(460),
            borderTopLeftRadius: moderateScale(15),
            borderTopRightRadius: moderateScale(15),
          },
        }}>
        <ScrollView>
          <RBSheetComponent />
        </ScrollView>
      </RBSheet>
      <CustomModal
        onPress1={() => {
          navigation.navigate('CompleteRider');
        }}
        onPress2={() => {
          setModalVisible(!modalVisible);
        }}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

export default ShippingDetailsRider;
