import type {ReactNode} from 'react'
import React, {forwardRef, useState} from 'react'
import type {StyleProp, TextInput, TextInputProps, ViewStyle} from 'react-native'
import {StyleSheet, Text, TextInput as RNTextInput, TouchableOpacity, View} from 'react-native'
import type {XmlProps} from 'react-native-svg'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, SVGByteCode, verticalScale} from '@/Helpers'
import {Colors, Fonts} from '@/Theme'

type AppInputProps = TextInputProps & {
  error?: string
  label?: string
  rightImage?: XmlProps
  leftImage?: XmlProps
  containerStyle?: StyleProp<ViewStyle>
  isErrorTextShow?: boolean
  rightNode?: ReactNode
}

const AppInput = forwardRef<TextInput, AppInputProps>(
  (
    {
      style,
      rightImage,
      leftImage,
      label,
      error,
      secureTextEntry,
      containerStyle = {},
      isErrorTextShow = true,
      rightNode = null,
      ...rest
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry)
    const [isFocus, setIsFocus] = useState(false)

    return (
      <View style={[styles.container, containerStyle]}>
        {!!label && <Text style={styles.label}>{label}</Text>}

        <View
          style={[styles.inputWrapper, isFocus && styles.focusStyle, error && styles.errorBorder]}
        >
          {!!leftImage?.xml && <SvgFromXml {...leftImage} />}

          <RNTextInput
            {...rest}
            onFocus={(event) => {
              rest?.onFocus?.(event)
              setIsFocus(true)
            }}
            onBlur={(event) => {
              rest?.onBlur?.(event)

              setIsFocus(false)
            }}
            ref={ref}
            style={{...styles.input, ...((style as any) ?? {})}}
            secureTextEntry={!isPasswordVisible && !!secureTextEntry}
            placeholderTextColor={Colors.grayD1D1}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
          />
          {rightNode}
          {secureTextEntry ? (
            <TouchableOpacity onPress={() => setIsPasswordVisible((prev) => !prev)}>
              <SvgFromXml xml={isPasswordVisible ? SVGByteCode.eyeOn : SVGByteCode.eyeOff} />
            </TouchableOpacity>
          ) : (
            rightImage?.xml && <SvgFromXml {...rightImage} />
          )}
        </View>

        {error && isErrorTextShow && <Text style={styles.errorText}>{error}</Text>}
      </View>
    )
  }
)

export default AppInput

const styles = StyleSheet.create({
  container: {
    rowGap: verticalScale(10)
  },
  errorBorder: {
    borderColor: Colors.redShadeFF
  },
  errorText: {
    color: Colors.redShadeFF,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(12),
    marginVertical: verticalScale(4)
  },
  focusStyle: {
    borderColor: Colors.primary
  },
  input: {
    color: Colors.black,
    flex: 1,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(13),
    height: verticalScale(45)
  },
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: Colors.grayShadeF87,
    borderColor: Colors.transparent,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    columnGap: scale(10),
    flexDirection: 'row',
    overflow: 'hidden',
    paddingHorizontal: scale(15)
  },
  label: {
    color: Colors.black,
    fontFamily: Fonts.ThemeSemiBold,
    fontSize: moderateScale(13)
  }
})
