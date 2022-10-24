import {observer} from 'mobx-react';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import UIStore from '../../store/ui';
import BaseButton from '../components/base_button';
import AppStyle from '../styles/app.style';

type AlertModalProps = {
  uiStore: UIStore;
};

const AlertModal = observer(({uiStore}: AlertModalProps) => {
  const {alertData} = uiStore;
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={alertData !== undefined}
      onRequestClose={uiStore.hideCommonAlert}>
      <TouchableOpacity
        style={styles.container}
        onPressOut={uiStore.hideCommonAlert}>
        <TouchableWithoutFeedback>
          <View style={styles.contentContainer}>
            {alertData?.title && (
              <Text style={styles.title}>{alertData.title}</Text>
            )}
            {alertData?.subTitle && (
              <Text
                style={[
                  styles.text,
                  {textAlign: 'left', paddingHorizontal: 16},
                ]}>
                {alertData.subTitle}
              </Text>
            )}
            <View style={styles.groupBtn}>
              {!alertData?.hideCancel && (
                <BaseButton
                  containerStyle={[styles.button, {marginRight: 16}]}
                  titleStyle={[
                    styles.text,
                    {
                      fontFamily: 'Quicksand-Bold',
                      color: 'red',
                    },
                  ]}
                  title="Cancel"
                  action={() => {
                    alertData?.onCancel && alertData?.onCancel();
                    uiStore.hideCommonAlert();
                  }}
                />
              )}
              <BaseButton
                containerStyle={styles.button}
                titleStyle={[
                  styles.text,
                  {
                    fontFamily: 'Quicksand-Bold',
                    color: AppStyle.TextColor.White,
                  },
                ]}
                title="OK"
                action={() => {
                  alertData?.onOk && alertData?.onOk();
                  uiStore.hideCommonAlert();
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
});

export default AlertModal;

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
  contentContainer: {
    width: AppStyle.Screen.FullWidth - 48,
    backgroundColor: AppStyle.BGColor.Main,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    zIndex: 1000000,
  },
  groupBtn: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    // paddingTop: 60,
    paddingRight: 16,
  },
  button: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: AppStyle.Text.Medium,
    color: AppStyle.TextColor.White,
    paddingVertical: 12,
    paddingHorizontal: 24,
    paddingBottom: 0,
    fontFamily: 'Quicksand-Bold',
  },
  text: {
    fontSize: AppStyle.Text.Normal,
    textAlign: 'center',
    color: AppStyle.TextColor.White,
  },
});
