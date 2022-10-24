import React from 'react';
import {LogBox} from 'react-native';
import {setCustomText, setCustomTextInput} from 'react-native-global-props';
import CodePush from 'react-native-code-push';
import App from './App';
import AppStyle from './shared/ui/styles/app.style';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {getDataLocal} from './services/storage';
import {MODE_KEY} from './utils/constants';

const codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};

function bootstrap() {
  LogBox.ignoreLogs(['Remote debugger']); //Remove unnecessary warnings
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  class Root extends React.Component {
    render() {
      getDataLocal(MODE_KEY).then(data => {
        const customTextProps = {
          style: {
            fontFamily: 'Quicksand-Regular',
            fontSize: AppStyle.Text.Normal,
            color: !!data && data === 'dark' ? 'white' : 'black',
            includeFontPadding: false,
          },
        };

        setCustomText(customTextProps);
        setCustomTextInput(customTextProps);
      });

      return <App />;
    }
  }
  return CodePush(codePushOptions)(Root);
}

module.exports = bootstrap;
