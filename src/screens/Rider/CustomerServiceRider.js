import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {colors} from '../../constants';
import Header from '../../components/Header';
import HeaderIcon from '../../components/HeaderIcon';
import BackHeader from '../../components/backHeader';
import {moderateScale} from 'react-native-size-matters';
import {BackSvg, HeaderSvg, RoundGray, SendIcon} from '../../assets/images/svg';
import Fonts from '../../assets/fonts';
import FontSizes from '../../constants/fontSizes';
import {screenWidth} from '../../constants/screenResolution';

const CustomerServiceRider = ({navigation}) => {
  const [messages, setMessages] = useState([
    {id: 1, text: 'Ya va de camino?!', sender: 'contact'},

    {id: 3, text: 'Si, le va llegar una notificacion', sender: 'user'},
    {id: 4, text: 'Esta bien, espero.', sender: 'contact'},

    {id: 7, text: 'ya llegue, estoy fuera.', sender: 'user'},

    {id: 10, text: 'Contactaremos al cliente.', sender: 'contact'},

    // Add more fake messages as needed
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: 'user', // You can set the sender as 'user' or 'contact' based on the message sender
      };

      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const renderMessage = ({item}) => (
    <>
      {item.sender === 'contact' && (
        <View style={{position: 'absolute', top: 105, right: 0}}>
          <RoundGray />
        </View>
      )}
      <View
        style={{
          alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
        }}>
        <View
          style={{
            backgroundColor:
              item.sender === 'user' ? colors.secondary : colors.primaryB,
            paddingHorizontal: 25,
            paddingVertical: 15,
            borderRadius: 100,
            margin: 5,
            maxWidth: moderateScale(230, 0.1),
            minHeight: moderateScale(50, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
            marginRight:
              item.sender === 'user' ? moderateScale(40) : moderateScale(0),
            marginTop: moderateScale(20, 0.1),
          }}>
          <Text
            style={{
              fontFamily: Fonts.medium,
              color: item.sender === 'user' ? colors.textBlack : colors.white,
              fontSize: FontSizes.regular,
              lineHeight: 21,
            }}>
            {item.text}
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: colors.white,
        width: screenWidth,
      }}>
      <View style={{position: 'absolute'}}>
        <HeaderSvg width={419} height={133} />
      </View>
      <HeaderIcon
        navigation={navigation}
        text={'Servicio cliente'}
        color={colors.time}
        fontFamily={Fonts.regular}
        fontSize={FontSizes.large}
        marginTopIcon={moderateScale(5, 0.1)}
        marginTop={moderateScale(40, 0.1)}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMessage}
        // To display the latest messages at the bottom
      />
      <View
        style={{
          marginBottom: moderateScale(30, 0.1),
          width: screenWidth - 60,
          marginLeft: 'auto',
          marginRight: 'auto',
          height: moderateScale(62, 0.1),
          borderRadius: 32,
          paddingHorizontal: 30,
          marginTop: moderateScale(20, 0.1),
          position: 'relative',
          borderWidth: 1,
          borderColor: colors.primaryB,
          backgroundColor: colors.secondary,
          justifyContent: 'center',
        }}>
        <TextInput
          style={{
            fontFamily: Fonts.medium,
            fontSize: FontSizes.small,
          }}
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholder="Escribe algo"
          placeholderTextColor={colors.grey}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{position: 'absolute', right: 20, bottom: 20}}>
          <SendIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomerServiceRider;
