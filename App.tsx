import React, {memo} from 'react'
import {SystemBars} from 'react-native-edge-to-edge'
import {KeyboardProvider} from 'react-native-keyboard-controller'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import Entry from '@/Pages/Entry'
import {CommonStyle} from '@/Theme'

export default memo(() => {
  return (
    <SafeAreaProvider style={CommonStyle.flex}>
      <KeyboardProvider>
        <SystemBars
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            navigationBar: 'light',
            statusBar: 'light'
          }}
        />
        <Entry />
      </KeyboardProvider>
    </SafeAreaProvider>
  )
})
