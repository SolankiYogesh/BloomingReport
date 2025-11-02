import {StyleSheet} from 'react-native'

import {moderateScale, scale, verticalScale} from '@/Helpers'
import {Colors, Fonts} from '@/Theme'

const myStyles = () =>
  StyleSheet.create({
    errorText: {
      color: Colors.redShadeFF,
      fontFamily: Fonts.ThemeBold,
      fontSize: moderateScale(12),
      marginTop: verticalScale(5)
    },
    inputBoxStyle: {
      borderColor: Colors.grayShadeCBCB,
      borderRadius: moderateScale(6),
      borderWidth: 0.5,
      color: Colors.blackShade2626,
      fontFamily: Fonts.ThemeRegular,
      fontSize: moderateScale(16),
      paddingHorizontal: scale(14),
      paddingVertical: verticalScale(8)
    },
    itemSeparate: {
      marginBottom: verticalScale(12)
    },
    labelStyle: {
      color: Colors.blackShade2626,
      fontFamily: Fonts.ThemeRegular,
      fontSize: moderateScale(16)
    },
    ml8: {
      marginLeft: scale(8)
    },
    rowView: {
      alignItems: 'center',
      flexDirection: 'row'
    },
    textStyle: {
      color: Colors.blackShade2626,
      fontFamily: Fonts.ThemeRegular,
      fontSize: moderateScale(14),
      lineHeight: verticalScale(18)
    }
  })
export default myStyles
