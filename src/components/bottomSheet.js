import React from 'react';
import {ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {moderateScale} from 'react-native-size-matters';
import {screenWidth} from '../constants/screenResolution';

const BottomSheet = ({
  refRBSheet,
  closeOnDrag,
  height,
  children,
  closeOnPressBack,
}) => {
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnPressBack={closeOnPressBack ? closeOnPressBack : false}
      closeOnPressMask={closeOnPressBack ? closeOnPressBack : false}
      closeOnDragDown={closeOnDrag ? closeOnPressBack : false}
      // height={calculateSheetHeight(appData?.contacts?.length)}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        container: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: height,
          width: screenWidth - 30,
          alignSelf: 'center',
        },
        draggableIcon: {
          backgroundColor: '#fff',
        },
      }}>
      <ScrollView contentContainerStyle={{paddingBottom: moderateScale(80)}}>
        {children}
      </ScrollView>
    </RBSheet>
  );
};

export default BottomSheet;
