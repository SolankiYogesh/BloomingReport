import React, {forwardRef, useImperativeHandle, useRef} from 'react'
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native'

import {moderateScale, verticalScale} from '@/Helpers'
import {Colors, CommonStyle} from '@/Theme'

const {width, height} = Dimensions.get('screen')

const AppLoader = forwardRef<AppLoaderRefType>((_, ref) => {
  const viewRef = useRef<View>(null)

  useImperativeHandle(ref, () => ({
    showLoader(state: boolean) {
      viewRef.current?.setNativeProps({
        style: {
          display: state ? 'flex' : 'none'
        }
      })
    }
  }))

  return (
    <View ref={viewRef} style={styles.modalContainer}>
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={Colors.primary} />
      </View>
    </View>
  )
})

export default AppLoader

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(15),
    elevation: 6,
    height: verticalScale(100),
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    width: verticalScale(100)
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,

    ...CommonStyle.centerFlex,
    backgroundColor: Colors.backdrop,
    display: 'none',
    height,
    width,
    zIndex: 9999999
  }
})
