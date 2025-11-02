import React, {memo} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, PADDING, scale, SVGByteCode, verticalScale} from '@/Helpers'
import {Colors, Fonts} from '@/Theme'

import CustomStepper from './CustomStepper'

type AppHeaderProps = {
  currentStep: number
  onStepPress?: (step: number) => void
}

const LABELS = ['Farmer Profile', 'Land Details', 'Flowering Details', 'Beekeeping Scope']

export default memo(({currentStep, onStepPress}: AppHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {currentStep > 1 && (
          <SvgFromXml width={verticalScale(20)} height={verticalScale(20)} xml={SVGByteCode.back} />
        )}
        <Text style={styles.labelStyle}>Blooming Report</Text>
      </View>
      <CustomStepper currentStep={currentStep} onStepPress={onStepPress} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{LABELS[currentStep - 1] || LABELS[0]}</Text>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: moderateScale(40),
    borderBottomRightRadius: moderateScale(40),
    marginBottom: verticalScale(16),
    overflow: 'hidden',
    paddingHorizontal: PADDING,
    paddingVertical: verticalScale(12),
    width: '100%'
  },
  labelContainer: {
    alignItems: 'center',
    columnGap: scale(8),
    flexDirection: 'row',
    marginBottom: verticalScale(25)
  },
  labelStyle: {
    color: Colors.blackShade2626,
    fontFamily: Fonts.ThemeSemiBold,
    fontSize: moderateScale(18)
  },
  stepperContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: Colors.blackShade2626,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(16),
    textAlign: 'center'
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: verticalScale(15)
  }
})
