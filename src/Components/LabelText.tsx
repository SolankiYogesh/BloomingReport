import {memo} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'
import {StyleSheet, Text} from 'react-native'

import {moderateScale} from '@/Helpers'
import {Colors, Fonts} from '@/Theme'

export default memo(({label, style = {}}: {label: string; style?: StyleProp<ViewStyle>}) => (
  <Text style={[styles.label, style]}>{label}</Text>
))
const styles = StyleSheet.create({
  label: {
    color: Colors.blackShade2626,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(16)
  }
})
