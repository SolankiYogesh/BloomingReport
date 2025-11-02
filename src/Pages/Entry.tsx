import {memo, useRef, useState} from 'react'
import PagerView from 'react-native-pager-view'

import {AppContainer, AppHeader} from '@/Components'
import {CommonStyle} from '@/Theme'

import BeepKeepingScope from './BeepKeepingScope'
import CropDetailsPage from './CropDetailsPage'
import FarmerDetailsPage from './FarmerDetailsPage'
import LandDetailsPage from './LandDetailsPage'

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
      <AppHeader currentStep={currentStep} onStepPress={handleStepChange} />
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
