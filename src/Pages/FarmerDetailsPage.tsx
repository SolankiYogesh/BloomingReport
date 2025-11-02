import {memo} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import {moderateScale, verticalScale} from '@/Helpers'
import {Colors, Fonts} from '@/Theme'

export default memo(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmer Profile</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  },

  title: {
    color: Colors.black,
    fontFamily: Fonts.ThemeBold,
    fontSize: moderateScale(24),
    marginBottom: verticalScale(16),
    textAlign: 'center'
  }
})
