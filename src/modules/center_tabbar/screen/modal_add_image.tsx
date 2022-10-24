import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppStyle from '../../../shared/ui/styles/app.style';
import BaseHeader from '../../../shared/ui/containers/base_header';
import {IC_DOWN} from '../../../utils/icons';

interface ModalAddImageProps {
  setOpenModal: any;
  openModal: boolean;
}

const ModalAddImage = ({setOpenModal, openModal}: ModalAddImageProps) => {
  const ListImage = ({item}) => {
    return (
      <View
        style={{
          height: AppStyle.Screen.FullWidth / 4,
          width: AppStyle.Screen.FullWidth / 4,
          backgroundColor: 'red',
          margin: 0.8,
          left: -0.4,
        }}>
        <TouchableOpacity>
          {/* <Image source={item.image} /> */}
          <Text>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Modal
      animationType="slide"
      visible={openModal}
      onRequestClose={() => {
        setOpenModal(!openModal);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: AppStyle.BGColor.White,
        }}>
        <BaseHeader
          leftElement={
            <Text
              style={{
                color: 'blue',
                fontSize: 18,
                fontFamily: 'Quicksand-Regular',
              }}>
              Cancel
            </Text>
          }
          leftAction={() => {
            setOpenModal(false);
          }}
          centerElement={
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  paddingRight: 8,
                  fontFamily: 'Quicksand-SemiBold',
                }}>
                Recents
              </Text>
              <Image style={{height: 8, width: 8}} source={IC_DOWN} />
            </TouchableOpacity>
          }
          rightElement={
            <Text
              style={{
                color: 'blue',
                fontSize: 18,
                fontFamily: 'Quicksand-Regular',
              }}>
              Done
            </Text>
          }
          rightAction={() => {
            setOpenModal(false);
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            keyExtractor={item => item.toString()}
            renderItem={({item}) => <ListImage item={item} />}
            scrollEnabled={false}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddImage;

const styles = StyleSheet.create({});
