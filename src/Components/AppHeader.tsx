import type {ReactNode} from 'react'
import React, {memo} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, PADDING, scale, SVGByteCode, verticalScale} from '@/Helpers'
import {Colors, Fonts} from '@/Theme'

type AppHeaderProps = {
  children?: ReactNode
  title?: string
  isBack?: boolean
  onPressBack?: () => void
}

export default memo(({children, title, isBack = true, onPressBack = () => {}}: AppHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {isBack && (
          <SvgFromXml
            onPress={onPressBack}
            width={verticalScale(20)}
            height={verticalScale(20)}
            xml={SVGByteCode.back}
          />
        )}
        <Text style={styles.labelStyle}>{title}</Text>
      </View>
      {children}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: moderateScale(40),
    borderBottomRightRadius: moderateScale(40),
    marginBottom: verticalScale(16),
    overflow: 'hidden',
    paddingHorizontal: PADDING,
    paddingVertical: verticalScale(12),
    width: '100%',
    zIndex: 999
  },
  labelContainer: {
    alignItems: 'center',
    columnGap: scale(8),
    flexDirection: 'row',
    marginBottom: verticalScale(25)
  },
  labelStyle: {
    color: Colors.blackShade2626,
    fontFamily: Fonts.ThemeSemiBold,
    fontSize: moderateScale(18)
  }
})
