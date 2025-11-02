import type {ReactNode} from 'react'
import React, {memo} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, SVGByteCode, verticalScale} from '@/Helpers'
import {Colors, Fonts} from '@/Theme'

type Props = {
  title: string
  onBackPress?: () => void
  rightNode?: ReactNode
  isBack?: boolean
}

export default memo(({title, onBackPress, rightNode = null, isBack = true}: Props) => {
  return (
    <View style={styles.container}>
      {isBack && (
        <TouchableOpacity onPress={onBackPress} style={styles.iconWrapper}>
          <SvgFromXml xml={SVGByteCode.back} />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {rightNode ? rightNode : <View style={styles.iconWrapper} />}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    height: verticalScale(60),
    justifyContent: 'space-between',
    paddingHorizontal: scale(16)
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(30)
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.ThemeSemiBold,
    fontSize: moderateScale(17)
  },
  titleContainer: {
    alignItems: 'center',
    left: 0,
    position: 'absolute',
    right: 0
  }
})
