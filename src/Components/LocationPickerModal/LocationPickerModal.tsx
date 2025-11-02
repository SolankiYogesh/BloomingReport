import React, {useState} from 'react'
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import Modal from 'react-native-modal'

import {moderateScale, scale, verticalScale} from '@/Helpers'
import {Fonts} from '@/Theme'

import Colors from '../../Theme/Colors'

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
  searchPlaceholder?: string
}

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  initialLocation,
  searchPlaceholder = 'Search for street name or area'
}) => {
  const [searchText, setSearchText] = useState('')
  const [selectedLocation] = useState<LocationData>(
    initialLocation || {
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'Pali road',
      city: 'Devanahalli',
      state: 'Karnataka'
    }
  )

  const handleSearch = () => {
    if (!searchText.trim()) {
      return
    }

    // Here you would implement geocoding to search for the location
    Alert.alert('Search', `Searching for: ${searchText}`)
  }

  const handleConfirm = () => {
    onConfirm(selectedLocation)
    onClose()
  }

  const handleCurrentLocation = () => {
    Alert.alert('Location', 'Getting current location...')
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropOpacity={0.5}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Location</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={searchPlaceholder}
            placeholderTextColor={Colors.grayShadeCBCB}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude
              }}
              title="Selected Location"
              description={selectedLocation.address}
            />
          </MapView>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>
              Map View
              {'\n'}
              (Install react-native-maps to enable)
            </Text>
            <View style={styles.markerPlaceholder}>
              <Text style={styles.markerText}>📍</Text>
            </View>
          </View>

          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>Pin the location of your house</Text>
            <Text style={styles.tooltipSubtext}>Move the pin to change the location</Text>
          </View>

          <TouchableOpacity style={styles.currentLocationButton} onPress={handleCurrentLocation}>
            <Text style={styles.currentLocationText}>📍</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.locationInfo}>
          <View style={styles.locationIcon}>
            <Text style={styles.locationIconText}>📍</Text>
          </View>
          <View style={styles.locationDetails}>
            <Text style={styles.locationAddress}>{selectedLocation.address}</Text>
            <Text style={styles.locationCity}>
              {selectedLocation.city}, {selectedLocation.state}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backButton: {
    padding: 5
  },
  backText: {
    color: Colors.blackShade2626,
    fontSize: 24
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
  currentLocationButton: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 25,
    bottom: 20,
    elevation: 5,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 50
  },
  currentLocationText: {
    fontSize: 20
  },
  header: {
    alignItems: 'center',
    borderBottomColor: Colors.grayShadeF87,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingVertical: 15
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
    backgroundColor: Colors.white,
    borderTopColor: Colors.grayShadeF87,
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15)
  },
  mapContainer: {
    flex: 1,
    position: 'relative'
  },
  mapPlaceholder: {
    alignItems: 'center',
    backgroundColor: Colors.grayShadeF87,
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  },
  mapPlaceholderText: {
    color: Colors.grayShadeCBCB,
    fontSize: moderateScale(16),
    textAlign: 'center'
  },
  markerPlaceholder: {
    left: '50%',
    marginLeft: -15,
    marginTop: -30,
    position: 'absolute',
    top: '45%'
  },
  markerText: {
    fontSize: moderateScale(30)
  },
  modal: {
    margin: 0
  },
  placeholder: {
    width: scale(34)
  },
  searchButton: {
    padding: scale(10)
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15)
  },
  searchIcon: {
    color: Colors.primary,
    fontSize: moderateScale(20)
  },
  searchInput: {
    borderColor: Colors.grayShadeCBCB,
    borderRadius: 8,
    borderWidth: 1,
    color: Colors.blackShade2626,
    flex: 1,
    fontSize: moderateScale(16),
    marginRight: scale(10),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12)
  },
  title: {
    color: Colors.blackShade2626,
    fontFamily: Fonts.ThemeSemiBold,
    fontSize: moderateScale(18)
  },
  tooltip: {
    backgroundColor: Colors.blackShade2626,
    borderRadius: 8,
    left: scale(20),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    position: 'absolute',
    right: scale(20),
    top: verticalScale(20)
  },
  tooltipSubtext: {
    color: Colors.white,
    fontSize: moderateScale(12),
    marginTop: verticalScale(2),
    opacity: 0.8
  },
  tooltipText: {
    color: Colors.white,
    fontFamily: Fonts.ThemeSemiBold,
    fontSize: moderateScale(14)
  }
})

export default LocationPickerModal
