import {memo} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import Svg, {Path, Rect} from 'react-native-svg'

import {verticalScale} from '@/Helpers/Responsive'
import {Colors} from '@/Theme'

type AppCheckBoxProps = {
  isChecked: boolean | undefined
  onPressCheckbox?: any
  isDisabled?: boolean
  fillCheckBoxColor?: any
  isSingleSelect?: boolean
}

export default memo((props: AppCheckBoxProps) => {
  const styles = myStyles()
  const {isChecked, onPressCheckbox, isDisabled, fillCheckBoxColor, isSingleSelect = false} = props

  const SIZE = 20

  return (
    <TouchableOpacity onPress={onPressCheckbox} disabled={isDisabled} activeOpacity={0.8}>
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
    </TouchableOpacity>
  )
})

const myStyles = () =>
  StyleSheet.create({
    fillContainer: {
      backgroundColor: Colors.redShadeFF,
      borderRadius: 500,
      height: verticalScale(13),
      width: verticalScale(13)
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
