import {Platform} from 'react-native'
import {PERMISSIONS, request} from 'react-native-permissions'

const getLocationPermission = () => {
  return new Promise((resolve) => {
    request(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_ALWAYS
    )
      .then((response) => {
        if (response === 'granted') {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(() => resolve(false))
  })
}

const Permission = {
  getLocationPermission
}

export default Permission
