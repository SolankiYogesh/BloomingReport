import {toast} from '@backpackapp-io/react-native-toast'
import Geolocation from '@react-native-community/geolocation'
import React, {memo, useCallback, useState} from 'react'
import {Alert, StyleSheet, Text, View} from 'react-native'
import type {Region} from 'react-native-maps'
import MapView from 'react-native-maps'
import Modal from 'react-native-modal'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, PADDING, scale, SVGByteCode, verticalScale} from '@/Helpers'
import {Fonts} from '@/Theme'

import Colors from '../../Theme/Colors'
import AppButton from '../AppButton'
import AppHeader from '../AppHeader'
import AppInput from '../AppInput'

type LocationData = {
  latitude: number
  longitude: number
  address: string
  city: string
  state: string
}

type LocationPickerModalProps = {
  isVisible: boolean
  onClose: () => void
  onConfirm: (location: LocationData) => void
  initialLocation?: LocationData
}

const fetchAddress = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCFb5wVYQbwRZLDR46nFhE4R_ZxEdBKXF4`
    )

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const addressComponents = data.results[0].address_components
      const getComponent = (type: string) =>
        addressComponents.find((c: any) => c.types.includes(type))?.long_name || ''

      const placeName =
        getComponent('point_of_interest') ||
        getComponent('premise') ||
        getComponent('establishment') ||
        getComponent('neighborhood')
      const city = getComponent('locality') || getComponent('administrative_area_level_2')
      const state = getComponent('administrative_area_level_1')

      return {placeName, city, state}
    } else {
      return null
    }
  } catch (_) {
    return null
  }
}

export default memo(({isVisible, onClose, onConfirm}: LocationPickerModalProps) => {
  const [searchText, setSearchText] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  const handleSearch = useCallback(() => {
    if (!searchText.trim()) {
      return
    }
    Alert.alert('Search', `Searching for: ${searchText}`)
  }, [searchText])
  const handleConfirm = useCallback(() => {
    if (!selectedLocation) {
      toast.error('Please select valid location')
      return
    }
    onConfirm(selectedLocation)
    onClose()
  }, [onClose, onConfirm, selectedLocation])

  const onRegionChangeComplete = useCallback(async (region: Region) => {
    const data = await fetchAddress(region.latitude, region.longitude)
    if (data) {
      setSelectedLocation({
        address: data.placeName,
        city: data.city,
        state: data.state,
        latitude: region.latitude,
        longitude: region.longitude
      })
    }
  }, [])

  const onModalShow = useCallback(() => {
    Geolocation.getCurrentPosition((result) => {
      setCurrentLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude
      })
    })
  }, [])

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      onModalShow={onModalShow}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropOpacity={0.5}
    >
      <View style={styles.container}>
        <AppHeader title="Location" onPressBack={onClose}>
          <AppInput
            placeholder={'Search for street name or area'}
            placeholderTextColor={Colors.grayShadeCBCB}
            value={searchText}
            rightImage={{
              xml: SVGByteCode.search
            }}
            containerStyle={{
              paddingBottom: verticalScale(16)
            }}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
        </AppHeader>

        {currentLocation && (
          <MapView
            style={StyleSheet.absoluteFill}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            onRegionChangeComplete={onRegionChangeComplete}
            showsUserLocation
            showsMyLocationButton
          />
        )}

        <View style={styles.mapContainer}>
          <SvgFromXml style={styles.pinStyle} xml={SVGByteCode.pin} />
        </View>

        {selectedLocation && (
          <View style={styles.bottomSheet}>
            <View style={styles.locationInfo}>
              <SvgFromXml xml={SVGByteCode.locationBlack} />
              <View style={styles.locationDetails}>
                <Text style={styles.locationAddress}>{selectedLocation.address}</Text>
                <Text style={styles.locationCity}>
                  {selectedLocation.city}, {selectedLocation.state}
                </Text>
              </View>
            </View>
            <AppButton title="Confirm Location" onPress={handleConfirm} />
          </View>
        )}
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  backButton: {
    padding: 5
  },
  backText: {
    color: Colors.blackShade2626,
    fontSize: 24
  },
  bottomSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: moderateScale(40),
    borderTopRightRadius: moderateScale(40),
    padding: PADDING,
    rowGap: verticalScale(16),
    width: '100%'
  },
  confirmButton: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 15
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600'
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING,
    paddingVertical: verticalScale(12)
  },
  locationAddress: {
    color: Colors.blackShade2626,
    fontSize: 16,
    fontWeight: '600'
  },
  locationCity: {
    color: Colors.grayShadeCBCB,
    fontSize: 14,
    marginTop: 2
  },
  locationDetails: {
    flex: 1
  },
  locationIcon: {
    marginRight: scale(15)
  },
  locationIconText: {
    fontSize: moderateScale(24)
  },
  locationInfo: {
    alignItems: 'center',
    columnGap: scale(10),
    flexDirection: 'row'
  },
  mapContainer: {
    flex: 1
  },
  modal: {
    margin: 0
  },

  pinStyle: {
    left: '47%',
    position: 'absolute',
    top: '42%',
    zIndex: 99999
  },
  placeholder: {
    width: scale(34)
  },
  title: {
    color: Colors.blackShade2626,
    fontFamily: Fonts.ThemeSemiBold,
    fontSize: moderateScale(18)
  }
})
