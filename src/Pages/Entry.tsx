import {memo, useRef, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PagerView from 'react-native-pager-view'

import {AppContainer, AppHeader, CustomStepper} from '@/Components'
import {moderateScale, verticalScale} from '@/Helpers'
import {Colors, CommonStyle, Fonts} from '@/Theme'

import BeepKeepingScope from './BeepKeepingScope'
import CropDetailsPage from './CropDetailsPage'
import FarmerDetailsPage from './FarmerDetailsPage'
import LandDetailsPage from './LandDetailsPage'
const LABELS = ['Farmer Profile', 'Land Details', 'Flowering Details', 'Beekeeping Scope']

export default memo(() => {
  const [currentStep, setCurrentStep] = useState(1)
  const pagerRef = useRef<PagerView>(null)

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
    pagerRef.current?.setPage(step - 1)
  }

  const handlePageSelected = (event: any) => {
    const {position} = event.nativeEvent
    setCurrentStep(position + 1)
  }

  return (
    <AppContainer>
      <AppHeader title="Blooming Report">
        <CustomStepper currentStep={currentStep} onStepPress={handleStepChange} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{LABELS[currentStep - 1] || LABELS[0]}</Text>
        </View>
      </AppHeader>
      <PagerView
        ref={pagerRef}
        scrollEnabled={false}
        style={CommonStyle.flex}
        initialPage={0}
        onPageSelected={handlePageSelected}
      >
        <FarmerDetailsPage key="1" />
        <LandDetailsPage key="2" />
        <CropDetailsPage key="3" />
        <BeepKeepingScope key="4" />
      </PagerView>
    </AppContainer>
  )
})
const styles = StyleSheet.create({
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
