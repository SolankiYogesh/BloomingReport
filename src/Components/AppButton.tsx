import type {ReactNode} from 'react'
import {memo} from 'react'
import type {StyleProp, TextStyle, TouchableOpacityProps} from 'react-native'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import type {XmlProps} from 'react-native-svg'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, verticalScale} from '@/Helpers'
import Utility from '@/Helpers/Utility'
import {Colors, Fonts} from '@/Theme'

type AppButtonProps = {
  title?: string
  textStyle?: StyleProp<TextStyle>
  leftImage?: XmlProps
  backgroundColor?: string
  rippleColor?: string
  hintText?: string
  hintTextStyle?: StyleProp<TextStyle>
  children?: ReactNode
} & TouchableOpacityProps

export default memo(
  ({
    title,
    textStyle = {},
    style = {},
    disabled = false,
    leftImage,
    backgroundColor = Utility.hexadecimal(Colors.primary)(80),
    hintText,
    hintTextStyle = {},
    children,
    ...rest
  }: AppButtonProps) => {
    return (
      <TouchableOpacity
        {...rest}
        style={[styles.container, {backgroundColor}, disabled && styles.disabledStyle, style]}
      >
        {!!leftImage?.xml && <SvgFromXml {...leftImage} />}
        {!!title && <Text style={[styles.textStyle, textStyle]}>{title}</Text>}
        {!!hintText && <Text style={[styles.hintStyle, hintTextStyle]}>{hintText}</Text>}
        {children}
      </TouchableOpacity>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: moderateScale(12),
    columnGap: scale(15),
    flexDirection: 'row',
    height: verticalScale(45),
    justifyContent: 'center',
    paddingHorizontal: scale(15)
  },
  disabledStyle: {
    backgroundColor: Colors.grayD1D1
  },
  hintStyle: {
    color: Colors.whiteShadeFAFB,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(12)
  },
  textStyle: {
    color: Colors.white,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(15)
  }
})
