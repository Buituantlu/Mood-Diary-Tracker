import {Dimensions} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var heightFull = Dimensions.get('screen').height;
var widthFull = Dimensions.get('screen').width;

const AppStyle = {
  Screen: {
    FullWidth: width,
    FullHeight: height,
    FullHeightAndroid: heightFull,
    FullWidthAndroid: widthFull,
  },
  BGColor: {
    Black: '#000',
    White: '#FFFFFF',
    Gray: '#8D8D8D',
    DarkLayer: 'rgba(44, 41, 38, 0.83)',
    Dark: '#2D2D2D',
    Main: '#232323',
    BlueSky: '#6495ED',
    GrayDark: '#34495E',
    LightGray: '#008080',
    OrangeLittle: '#fee7d7',
    WhiteLittle: '#f8f7f3',
    BgLightChart: '#66FFFF',
    BgDarkChart: '#70727e',
    BGMainLight: '#f9f7f3',
    BGMainDark: '#1d1e27',
    BGDarkMode: '#3a3a41',
  },
  TextColor: {
    Primary: '#2C2926',
    Secondary: '#8D8D8D',
    White: '#FFFFFF',
    WhiteBlur: '#FFFFFF80',
    Red: '#AF2926',
    Black: '#221D1A',
    Accent: '#E88B00',
    ActiveText: '#FAD92F',
    RedPink: '#DE3163',
    BlueSky: '#6495ED',
  },
  MoreColors: {
    Red: '#AF2926',
    Deactived: '#707070',
    LightGray: '#CCCCCC',
    ThumbDeactived: '#f4f3f4',
    iosThumbBackGround: '#3e3e3e',
    OrangeSub: '#FFBC25',
    Orange: '#E88B00',
    Yellow: '#FAD92F',
    Grey: '#9D9D9D',
    Line: '#D9D9D9',
    BorderSearch: '#ADADAD',
    OrangeMain: '#f17f2e',
    BlueMain: '#3e97f2',
    White: '#FFFFFF',
    Black: '#000000',
  },
  Text: {
    Large: 20,
    Medium2: 18,
    Medium: 16,
    Normal: 14,
    Small: 12,
    Min: 10,
    Heading1: 24,
    Heading2: 32,
    Heading3: 40,
    Heading4: 60,
  },
  BgMood: {
    Awful: '#646464',
    Bad: '#4d678e',
    Meh: '#40593e',
    Good: '#a38e36',
    Rad: '#c8793d',
  },
  BottomTabColor: {
    BgLightMode: '#ffffff',
    BgDarkMode: '#1d1e27',
    Blue: '#3e97f2',
    Orange: '#f27d31',
  },
};

export default AppStyle;
