import {StyleSheet} from 'react-native'

import Colors from './Colors'

export default StyleSheet.create({
  centerFlex: {
    alignItems: 'center',
    backgroundColor: Colors.black,
    flex: 1,
    justifyContent: 'center'
  },
  flex: {
    flex: 1
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  selfCenter: {
    alignSelf: 'center'
  }
})
