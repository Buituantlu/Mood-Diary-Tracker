import {observer} from 'mobx-react';
import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import UIStore from '../../store/ui';

type CustomModalProps = {
  uiStore: UIStore;
};

export const CustomModal = observer(({uiStore}: CustomModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={uiStore.curCustomModalView != undefined ? true : false}>
      <View style={styles.container}>
        {!!uiStore.curCustomModalView &&
          (uiStore.curCustomModalView()! as JSX.Element)}
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 100001,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
