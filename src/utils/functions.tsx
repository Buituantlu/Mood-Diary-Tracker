import {Alert} from 'react-native';
import LangStore from '../shared/store/lang_store';

function alertInfo(
  title: string,
  content: string,
  canCancel: boolean,
  ok: () => void,
) {
  let options = !canCancel
    ? [
        {
          text: 'OK',
          onPress: ok,
        },
      ]
    : [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'OK',
          onPress: ok,
        },
      ];
  Alert.alert(title, content, options, {cancelable: false});
}

function convertTimeStampToDateTime(time: number): string {
  var date = new Date(time);
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).substr(-2);
  var day = ('0' + date.getDate()).substr(-2);
  var hour = ('0' + date.getHours()).substr(-2);
  var minutes = ('0' + date.getMinutes()).substr(-2);

  return year + '/' + month + '/' + day + '   ' + hour + ':' + minutes;
}

function convertUnixTimeToHours(time: number): string {
  let hour = Math.ceil(time / (60 * 60 * 1000));
  let minute = Math.abs((time - hour * 60 * 60 * 1000) / (60 * 1000));
  return (
    (hour > 9 ? hour : '0' + hour) + ':' + (minute > 9 ? minute : '0' + minute)
  );
}

function getCurentTimeToUnixHours(): number {
  var date = new Date();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var second = date.getSeconds();
  return (hour * 60 * 60 + minutes * 60 + second) * 1000;
}
function convertDateToString(time: string) {
  let index = time.indexOf('T');
  return `${time.substring(index + 1, index + 6)} | ${time.substring(
    0,
    index,
  )}`;
}

function formatTimeString(value: number) {
  return new Date(value * 1000).toISOString().substr(11, 8);
}

function moveElement(arr, old_index, new_index) {
  while (old_index < 0) {
    old_index += arr.length;
  }
  while (new_index < 0) {
    new_index += arr.length;
  }
  if (new_index >= arr.length) {
    var k = new_index - arr.length;
    while (k-- + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

function buildQueryString(objectParam: any) {
  let query = Object.keys(objectParam)
    .map(param => param + '=' + objectParam[param])
    .join('&');

  return query;
}

export {
  alertInfo,
  convertTimeStampToDateTime,
  convertUnixTimeToHours,
  getCurentTimeToUnixHours,
  formatTimeString,
  moveElement,
  convertDateToString,
  buildQueryString,
};
