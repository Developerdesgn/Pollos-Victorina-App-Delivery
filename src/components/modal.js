import React, {useState} from 'react';
import {
  Alert,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import Cancel from '../assets/images/svg/cancel.svg';
import {moderateScale} from 'react-native-size-matters';
import Button from './button';
import {colors} from '../constants';
import Timer from '../assets/images/svg/Timer.svg';
import {screenWidth} from '../constants/screenResolution';
import styless from '../globalStyle';
import Fonts from '../assets/fonts';
import FontSizes from '../constants/fontSizes';
const CustomModal = ({modalVisible, setModalVisible, onPress1, onPress2}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={[styles.centeredView]}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Cancel width={moderateScale(27)} height={moderateScale(27)} />
            </TouchableOpacity>
            <Text style={[styless.mV, styles.modalText]}>
              Desea eliminar finalizar su labor?
            </Text>
            <Button
              onPress={onPress1}
              text={'Finalizer'}
              btnStyle={styles.button}
              textStyle={{color: colors.primaryA}}
              RightIcon={() => {
                return (
                  <Timer width={moderateScale(24)} height={moderateScale(24)} />
                );
              }}
            />
            <Button
              onPress={onPress2}
              text={'Cancelar'}
              btnStyle={[
                styles.primaryBtn,
                {width: '80%', paddingVertical: moderateScale(10)},
              ]}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: screenWidth - moderateScale(40),
    margin: moderateScale(20),
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
    padding: moderateScale(35),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.primaryA,
    width: '80%',
    marginBottom: moderateScale(10),
    paddingVertical: moderateScale(10),
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    position: 'absolute',
    top: moderateScale(15),
    right: moderateScale(15),
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    lineHeight: moderateScale(25),
    textAlign: 'center',
    width: '70%',
    color: colors.black,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.large,
  },
});

export default CustomModal;
