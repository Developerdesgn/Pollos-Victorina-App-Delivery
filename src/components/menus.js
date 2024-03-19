import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Images from '../assets/images';
import Filtro from '../assets/images/svg/Filtro.svg';
import {moderateScale} from 'react-native-size-matters';
import styles from '../globalStyle';
import Meat from '../assets/images/svg/meat.svg';
import Tambora from '../assets/images/svg/Tambora.svg';
import Bucket from '../assets/images/svg/bucket.svg';

import Meat2 from '../assets/images/svg/redmeat.svg';
import Tambora2 from '../assets/images/svg/third.svg';
import Bucket2 from '../assets/images/svg/redbucket.svg';
import {colors} from '../constants';

const Menus = ({navigation, menu, setCatogories, onPress}) => {
  // const menuList = [
  //   {
  //     name: 'Pollo Frito',
  //     icon: () => {
  //       return <Meat2 width={moderateScale(20)} height={moderateScale(20)} />;
  //     },
  //     icon2: () => {
  //       return  <Meat width={moderateScale(20)} height={moderateScale(20)} />;

  //     },
  //     selected: true,
  //   },
  //   {
  //     name: 'Pechurinas',
  //     icon: () => {
  //       return <Bucket width={moderateScale(20)} height={moderateScale(20)} />;
  //     },
  //     icon2: () => {
  //       return <Bucket2 width={moderateScale(20)} height={moderateScale(20)} />;
  //     },
  //     selected: false,
  //   },
  //   {
  //     name: 'Tamboras',
  //     icon: () => {
  //       return <Tambora width={moderateScale(20)} height={moderateScale(20)} />;
  //     },
  //     icon2: () => {
  //       return (
  //         <Tambora2 width={moderateScale(20)} height={moderateScale(20)} />
  //       );
  //     },
  //     selected: false,
  //   },
  // ];
  const [menus, setmenus] = useState(menu);
  const checkSelected = selected => (selected ? colors.primaryA : colors.gray);
  useEffect(() => {
    setmenus(menu);
  }, [menu]);

  const MenuItem = ({data}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let temp = menus?.map(e => {
            if (data?.name == e?.name) {
              return {...e, selected: true};
            } else {
              return {...e, selected: false};
            }
          });
          setmenus(temp);
          onPress(data);
        }}
        style={[
          styles.menu,
          styles.row,
          styles.alignCenter,
          styles.mL,
          {borderColor: checkSelected(data?.selected)},
        ]}>
        {data?.selected ? (
          // <Icon2 color={selected ? colors.primaryA : colors.grey} />
          <Image
            source={{uri: data?.image}}
            resizeMode={'contain'}
            style={{
              width: moderateScale(20),
              height: moderateScale(20),
              tintColor: colors.primary,
            }}
          />
        ) : (
          // <Icon color={selected ? colors.primaryA : colors.grey} />
          <Image
            source={{uri: data?.image}}
            resizeMode={'contain'}
            style={{
              width: moderateScale(20),
              height: moderateScale(20),
              tintColor: colors.gray,
            }}
          />
        )}

        <Text
          style={[
            styles.menuText,
            styles.mL,
            {
              color: checkSelected(data?.selected),
              fontStyle: data?.selected ? 'italic' : 'normal',
              fontWeight: data?.selected ? '700' : '500',
            },
          ]}>
          {data?.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Filters', {setFiltered: setCatogories});
        }}>
        <Filtro width={moderateScale(28)} height={moderateScale(28)} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{marginTop: -10}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {menus?.map(e => {
          return <MenuItem data={e} />;
        })}
      </ScrollView>
      {/* <Text>Menus</Text> */}
    </View>
  );
};

export default Menus;
