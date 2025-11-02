import {StyleSheet} from 'react-native'

import {moderateScale, verticalScale} from '@/Helpers'
import {Colors, Fonts} from '@/Theme'

const myStyles = () =>
  StyleSheet.create({
    errorText: {
      color: Colors.redShadeFF,
      fontFamily: Fonts.ThemeBold,
      fontSize: moderateScale(12),
      marginTop: verticalScale(5)
    },
    labelStyle: {
      color: Colors.blackShade2626,
      fontFamily: Fonts.ThemeRegular,
      fontSize: moderateScale(16)
    }
  })
export default myStyles
