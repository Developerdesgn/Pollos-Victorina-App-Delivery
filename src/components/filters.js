import React, {useState} from 'react';
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
//   import styles from '../globalStyle';
import Tambora from '../assets/images/svg/Tambora.svg';
import Bucket from '../assets/images/svg/bucket.svg';
import {colors} from '../constants';
import styles from '../globalStyle';

const filterList = [
  {
    name: 'Pollo Frito',
    Icon: ({color}) => {
      return (
        <Bucket
          width={moderateScale(20)}
          height={moderateScale(20)}
          color={color}
        />
      );
    },
  },
  {
    name: 'Pechurinas',
    Icon: ({color}) => {
      return (
        <Bucket
          width={moderateScale(20)}
          height={moderateScale(20)}
          color={color}
        />
      );
    },
  },
  {
    name: 'Alasam',
    Icon: ({color}) => {
      return (
        <Bucket
          width={moderateScale(20)}
          height={moderateScale(20)}
          color={color}
        />
      );
    },
  },
  {
    name: 'Tamboras',
    Icon: ({color}) => {
      return (
        <Tambora
          width={moderateScale(20)}
          height={moderateScale(20)}
          color={color}
        />
      );
    },
  },
  {
    name: 'Chipli',
    Icon: ({color}) => {
      return (
        <Bucket
          width={moderateScale(20)}
          height={moderateScale(20)}
          color={color}
        />
      );
    },
  },

  {
    name: 'chiken',
    Icon: ({color}) => {
      return (
        <Tambora
          width={moderateScale(20)}
          height={moderateScale(20)}
          color={color}
        />
      );
    },
  },
  {
    name: 'cjeekk',
    Icon: ({color}) => {
      return (
        <Bucket
          width={moderateScale(20)}
          height={moderateScale(20)}
          color={color}
        />
      );
    },
  },
  {
    name: 'kesras',
    Icon: ({color}) => {
      return (
        <Tambora
          width={moderateScale(20)}
          height={moderateScale(20)}
          color={color}
        />
      );
    },
  },
  {
    name: 'Asaadse',
    Icon: ({color}) => {
      return (
        <Bucket
          width={moderateScale(20)}
          height={moderateScale(20)}
          color={color}
        />
      );
    },
  },

  {
    name: 'Alassee',
    Icon: ({color}) => {
      return (
        <Bucket
          width={moderateScale(20)}
          height={moderateScale(20)}
          color={color}
        />
      );
    },
  },
  {
    name: 'Tamborasaes',
    Icon: ({color}) => {
      return (
        <Tambora
          width={moderateScale(20)}
          height={moderateScale(20)}
          color={color}
        />
      );
    },
  },
];

const FiltersScreen = ({categories, handleFilterPress, selectedFilters}) => {
  const FilterItem = ({menu}) => {
    const isSelected = selectedFilters.includes(menu?.name);
    return (
      <TouchableOpacity
        key={menu?.name}
        onPress={() => {
          handleFilterPress(menu);
        }}
        style={[
          styles.filter,
          styles.row,
          // styles.alignCenter,
          {borderColor: isSelected ? colors.primaryA : colors.icon},
        ]}>
        {/* <Icon color={isSelected ? colors.primaryA : colors.icon} /> */}
        <View style={{width: moderateScale(20), height: moderateScale(20)}}>
          <Image
            source={{uri: menu?.image}}
            resizeMode={'cover'}
            style={{
              width: '100%',
              height: '100%',
              tintColor: isSelected ? colors.primary : colors.gray,
            }}
          />
        </View>
        <Text
          style={[
            styles.menuText,
            styles.mL,
            {
              color: isSelected ? colors.primaryA : colors.icon,
            },
          ]}>
          {menu?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styless.container}>
      {categories.map(menu => (
        <FilterItem menu={menu} />
      ))}
    </View>
  );
};

const styless = StyleSheet.create({
  container: {
    width: '100%',

    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    padding: moderateScale(5),
  },
  filterButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    margin: 8,
  },
  selectedFilterButton: {
    backgroundColor: '#3498db',
  },
  filterText: {
    marginTop: 8,
    color: '#333',
  },
  selectedFilterText: {
    color: '#fff',
  },
});

export default FiltersScreen;
