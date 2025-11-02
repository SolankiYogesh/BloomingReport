import React, {memo} from 'react'
import {StatusBar, type StyleProp, StyleSheet, View, type ViewStyle} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {Colors} from '@/Theme'

type AppContainerProps = {
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  isSafeArea?: boolean
  paddingHorizontal?: number
}

export default memo(
  ({children, isSafeArea = true, style = {}, paddingHorizontal = 0}: AppContainerProps) => {
    const {bottom, top} = useSafeAreaInsets()

    return (
      <View
        style={[
          styles.container,
          {paddingHorizontal},
          isSafeArea && {
            paddingTop: top,
            paddingBottom: bottom
          },
          style
        ]}
      >
        <StatusBar animated backgroundColor={Colors.white} barStyle={'dark-content'} />
        {children}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  }
})
