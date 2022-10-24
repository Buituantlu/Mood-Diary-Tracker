import {action, makeAutoObservable, observable} from 'mobx';
import Toast from 'react-native-easy-toast';
import React from 'react';
import {getDataLocal, saveDataLocal} from '../../services/storage';
import {MODE_KEY} from '../../utils/constants';
import RNRestart from 'react-native-restart';
import AppStyle from '../ui/styles/app.style';
import {setCustomText, setCustomTextInput} from 'react-native-global-props';

export type CommonAlertType = {
  title?: string;
  subTitle?: string;
  onOk?: () => void;
  onCancel?: () => void;
  hideCancel?: boolean;
};
export default class UIStore {
  protected loadingIds: Array<String> = [];
  protected loadingMess: string = 'Loading...';
  protected toast: Toast | null = null;
  codepushLoaded: boolean = false;
  isShowAudioControl: boolean = true;
  isSettingScreen: number = 0;
  product_mode: boolean = true;
  target_version: string = '1.0';
  alertData?: CommonAlertType;
  countClick: number = 0;
  bgMode: 'light' | 'dark' = 'light';
  curCustomModalView?: () => void = undefined;
  language: string = '';

  constructor() {
    makeAutoObservable(this);
    getDataLocal(MODE_KEY).then(data => {
      this.bgMode = !!data ? (data as 'light' | 'dark') : 'light';
    });
  }

  async setBgMode(mode: 'light' | 'dark') {
    this.bgMode = mode;
    await saveDataLocal(MODE_KEY, mode);
    // RNRestart.Restart();
    const customTextProps = {
      style: {
        fontFamily: 'Quicksand-Regular',
        fontSize: AppStyle.Text.Normal,
        color: mode === 'dark' ? 'white' : 'black',
        includeFontPadding: false,
      },
    };

    setCustomText(customTextProps);
    setCustomTextInput(customTextProps);
  }

  setProductMode(value: boolean) {
    this.product_mode = value;
  }

  setIsSettingScreen(status: number) {
    this.isSettingScreen = status;
  }
  setCountClick(value: number) {
    this.countClick = value;
  }

  setToast = (ref: Toast) => {
    this.toast = ref;
  };

  showToast = (mess: string) => {
    this.toast?.show(mess, 500);
  };

  showLoading(loadingId: string, mess?: string) {
    this.loadingIds.push(loadingId);
    if (mess) {
      this.loadingMess = mess;
    } else {
      this.loadingMess = 'Loading...';
    }
  }

  hideLoading(loadingId?: string, moreAction?: () => void) {
    if (loadingId) {
      const index = this.loadingIds.indexOf(loadingId);
      if (index > -1) {
        this.loadingIds.splice(index, 1);
      }
    } else {
      this.loadingIds = [];
    }
    setTimeout(moreAction ? moreAction : () => {}, 200);
  }

  get shouldShowLoading() {
    return this.loadingIds.length > 0;
  }

  get curLoadingMess() {
    return !!this.loadingMess;
  }

  changeCodepushState(state: boolean) {
    this.codepushLoaded = state;
  }

  /**
   * For common alert
   */
  showCommonAlert(alert: CommonAlertType) {
    this.alertData = alert;
  }

  hideCommonAlert = () => {
    this.alertData = undefined;
  };

  onChangeCustomModal(element?: () => void) {
    this.curCustomModalView = element;
  }
}
