import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
export const primary1Color = '#000'
export const secondaryColor = '#000'
export const accent1Color = secondaryColor
export const gray = '#88959E'
export const buttonBgColor = '#E7F3FF'

export const muiTheme = getMuiTheme({

  // fontFamily: 'Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, \
  //  Microsoft YaHei, Noto Sans CJK SC, WenQuanYi Micro Hei, Arial, sans-serif',
  fontFamily: `Roboto, sans-serif`,
  palette: {
    primary1Color: primary1Color,

    primary2Color: primary1Color,
    primary3Color: primary1Color,
    accent1Color: primary1Color,
    accent2Color: primary1Color,
    accent3Color: primary1Color,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,

    disabledColor: fade(primary1Color, 0.3),
    pickerHeaderColor: primary1Color,
    clockCircleColor: fade(primary1Color, 0.07),
    shadowColor: 'rgba(0,0,0,0)',
  },
  card: {
    titleColor: fullBlack
  },
  appBar: {
    color: '#fff',
    height: 48,
    textColor: '#ffffff',
    padding: 75,
  },
  menuItem: {
    hoverColor: buttonBgColor,
    selectedTextColor: primary1Color,
  },
  raisedButton: {
    primaryTextColor: '#ffffff',
    textColor: '#ffffff',
    primaryColor: primary1Color,
    secondaryColor: secondaryColor,
    secondaryTextColor: '#ffffff'
  },
  icon: {
    color: gray
  },
  svgIcon: {
    color: gray,
  },
})

