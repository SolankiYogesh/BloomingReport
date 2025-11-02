import {memo} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Svg, {Path, Rect} from 'react-native-svg'

import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {Colors, Fonts} from '@/Theme'

type AppCheckBoxProps = {
  isChecked?: boolean
  onPressCheckbox?: () => void
  isDisabled?: boolean
  fillCheckBoxColor?: string
  isSingleSelect?: boolean
  label?: string
}

export default memo((props: AppCheckBoxProps) => {
  const {
    isChecked,
    onPressCheckbox,
    isDisabled,
    fillCheckBoxColor,
    isSingleSelect = true,
    label
  } = props

  const SIZE = 20

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPressCheckbox}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {isSingleSelect ? (
        <View
          style={[
            styles.unFillContainer,
            {borderColor: isChecked ? Colors.redShadeFF : Colors.grayShadeCBCB}
          ]}
        >
          {isChecked && <View style={styles.fillContainer} />}
        </View>
      ) : (
        <Svg width={verticalScale(SIZE)} height={verticalScale(SIZE)} viewBox="0 0 24 24">
          <Rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="4"
            fill={isChecked ? (fillCheckBoxColor ?? Colors.redShadeFF) : Colors.transparent}
            stroke={isChecked ? (fillCheckBoxColor ?? Colors.redShadeFF) : Colors.grayShadeCBCB}
            strokeWidth="2"
          />
          {isChecked && (
            <Path
              d="M7 12l3 3 6-6"
              stroke={Colors.white}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          )}
        </Svg>
      )}
      {!!label && <Text style={styles.labelStyle}>{label}</Text>}
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    columnGap: scale(12),
    flexDirection: 'row'
  },
  fillContainer: {
    backgroundColor: Colors.redShadeFF,
    borderRadius: 500,
    height: verticalScale(13),
    width: verticalScale(13)
  },
  labelStyle: {
    color: Colors.blackShade2626,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(14)
  },
  unFillContainer: {
    alignItems: 'center',
    borderRadius: 500,
    borderWidth: 1,
    height: verticalScale(20),
    justifyContent: 'center',
    width: verticalScale(20)
  }
})
