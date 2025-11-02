import React, {memo} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import Entry from '@/Pages/Entry'
import {CommonStyle} from '@/Theme'

export default memo(() => {
  return (
    <SafeAreaProvider style={CommonStyle.flex}>
      <Entry />
    </SafeAreaProvider>
  )
})
