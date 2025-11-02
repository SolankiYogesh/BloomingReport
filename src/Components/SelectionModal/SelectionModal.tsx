import React, {useMemo, useState} from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Modal from 'react-native-modal'

import {moderateScale, scale, verticalScale} from '@/Helpers'
import {Fonts} from '@/Theme'

import Colors from '../../Theme/Colors'

const {height} = Dimensions.get('window')

type SelectionItem = {
  id: string
  label: string
  value: string
}

type SelectionModalProps = {
  isVisible: boolean
  onClose: () => void
  onSelect: (item: SelectionItem) => void
  items: SelectionItem[]
  title: string
  searchPlaceholder?: string
  selectedValue?: string
}

export default ({
  isVisible,
  onClose,
  onSelect,
  items,
  title,
  searchPlaceholder = 'Search...',
  selectedValue
}: SelectionModalProps) => {
  const [searchText, setSearchText] = useState('')

  const filteredItems = useMemo(() => {
    if (!searchText.trim()) {
      return items
    }
    return items.filter((item) => item.label.toLowerCase().includes(searchText.toLowerCase()))
  }, [items, searchText])

  const handleSelect = (item: SelectionItem) => {
    onSelect(item)
    setSearchText('')
    onClose()
  }

  const renderItem = ({item}: {item: SelectionItem}) => (
    <TouchableOpacity
      style={[styles.itemContainer, selectedValue === item.value && styles.selectedItem]}
      onPress={() => handleSelect(item)}
    >
      <View style={styles.radioContainer}>
        <View style={styles.radioOuter}>
          {selectedValue === item.value && <View style={styles.radioInner} />}
        </View>
      </View>
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  )

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        {items.length > 5 && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={searchPlaceholder}
              placeholderTextColor={Colors.grayShadeCBCB}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        )}

        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity style={styles.selectButton} onPress={onClose}>
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  closeButton: {
    padding: scale(5)
  },
  closeText: {
    color: Colors.blackShade2626,
    fontSize: moderateScale(18)
  },
  container: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    maxHeight: height * 0.8,
    paddingBottom: verticalScale(20)
  },
  header: {
    alignItems: 'center',
    borderBottomColor: Colors.grayShadeF87,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: scale(20)
  },
  itemContainer: {
    alignItems: 'center',
    borderBottomColor: Colors.grayShadeF87,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: verticalScale(15)
  },
  itemText: {
    color: Colors.blackShade2626,
    flex: 1,
    fontSize: 16
  },
  list: {
    flex: 1,
    paddingHorizontal: scale(20)
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  radioContainer: {
    marginRight: scale(15)
  },
  radioInner: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    height: verticalScale(10),
    width: verticalScale(10)
  },
  radioOuter: {
    alignItems: 'center',
    borderColor: Colors.grayShadeCBCB,
    borderRadius: 10,
    borderWidth: 2,
    height: verticalScale(20),
    justifyContent: 'center',
    width: verticalScale(20)
  },
  searchContainer: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15)
  },
  searchInput: {
    borderColor: Colors.grayShadeCBCB,
    borderRadius: 8,
    borderWidth: 1,
    color: Colors.blackShade2626,
    fontSize: moderateScale(16),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12)
  },
  selectButton: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(8),
    marginHorizontal: scale(20),
    marginTop: verticalScale(25),
    paddingVertical: verticalScale(25)
  },
  selectButtonText: {
    color: Colors.white,
    fontFamily: Fonts.ThemeSemiBold,

    fontSize: moderateScale(16)
  },
  selectedItem: {
    backgroundColor: Colors.grayShadeF87
  },
  title: {
    color: Colors.blackShade2626,
    fontFamily: Fonts.ThemeBold,
    fontSize: moderateScale(18)
  }
})
