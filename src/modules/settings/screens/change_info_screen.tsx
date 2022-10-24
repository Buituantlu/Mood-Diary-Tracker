import {Image, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React, {useState} from 'react';
import UIStore from '../../../shared/store/ui';
import MainView from '../../../shared/ui/containers/main_view';
import BaseHeader from '../../../shared/ui/containers/base_header';
import {ic_arrow_left_orange} from '../../../utils/icons';
import InfoUserScreen from '../../info_user/screens/info_user_screen';
import {getObjectDataLocal} from '../../../services/storage';
import UserStore, {LOCAL_USER_KEY} from '../../../shared/store/user';

interface ChangeInfoScreenProps {
  uiStore: UIStore;
  userStore: UserStore;
  navigation: any;
}

const ChangeInfoScreen = ({
  uiStore,
  userStore,
  navigation,
}: ChangeInfoScreenProps) => {
  return (
    <MainView
      childView={
        <View style={styles.container}>
          <InfoUserScreen
            uiStore={uiStore}
            userStore={userStore}
            navigation={navigation}
          />
        </View>
      }
      uiStore={uiStore}
    />
  );
};

export default ChangeInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftElementStyle: {
    width: 20,
    height: 20,
  },
  centerElementStyle: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },
  rightElementStyle: {
    fontSize: 16,
    color: '#f27d31',
    fontFamily: 'Quicksand-SemiBold',
  },
});
