import React, {memo, useEffect} from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

import {moderateScale, verticalScale} from '@/Helpers'
import {Colors, Fonts} from '@/Theme'

type StepperProps = {
  currentStep: number
  onStepPress?: (step: number) => void
}

const STEPS = 4
const SIZE = verticalScale(16)
const LINE_HEIGHT = 4
const DURAION = 300

const StepComponent = ({
  stepNumber,
  progress,
  onStepPress
}: {
  stepIndex: number
  stepNumber: number
  isActive: boolean
  progress: SharedValue<number>
  onStepPress?: (step: number) => void
}) => {
  const animatedStepStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolate(progress.value, [stepNumber - 0.5, stepNumber], [0, 1])

    return {
      backgroundColor: backgroundColor > 0.5 ? Colors.primary : Colors.grayShadeCBCB
    }
  })

  return (
    <View style={styles.stepWrapper}>
      <Pressable onPress={() => onStepPress?.(stepNumber)} style={styles.stepContainer}>
        <Animated.View style={[styles.step, {width: SIZE, height: SIZE}, animatedStepStyle]} />
        <Text style={styles.stepText}>{stepNumber}</Text>
      </Pressable>
    </View>
  )
}

const ProgressLineComponent = ({progress}: {progress: SharedValue<number>}) => {
  const animatedProgressStyle = useAnimatedStyle(() => {
    const progressWidth = interpolate(progress.value, [1, STEPS], [0, 100])

    return {
      width: `${Math.max(0, Math.min(100, progressWidth))}%`
    }
  })

  return (
    <View
      style={[
        styles.progressLineContainer,
        {
          top: SIZE / 2 - LINE_HEIGHT / 2
        }
      ]}
    >
      <View
        style={[
          styles.progressLineBackground,
          {
            height: LINE_HEIGHT,
            backgroundColor: Colors.grayShadeCBCB
          }
        ]}
      />

      <Animated.View
        style={[
          styles.progressLineFill,
          {
            height: LINE_HEIGHT,
            backgroundColor: Colors.primary
          },
          animatedProgressStyle
        ]}
      />
    </View>
  )
}

export default memo(({currentStep = 1, onStepPress}: StepperProps) => {
  const progress = useSharedValue(currentStep)

  useEffect(() => {
    progress.value = withTiming(currentStep, {duration: DURAION})
  }, [currentStep, progress])

  return (
    <View style={styles.container}>
      <View style={styles.stepperContainer}>
        <ProgressLineComponent progress={progress} />

        <View style={styles.stepsContainer}>
          {Array.from({length: STEPS}, (_, index) => {
            const stepNumber = index + 1
            const isActive = stepNumber <= currentStep

            return (
              <StepComponent
                key={index}
                stepIndex={index}
                stepNumber={stepNumber}
                isActive={isActive}
                progress={progress}
                onStepPress={onStepPress}
              />
            )
          })}
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(20)
  },
  progressLineBackground: {
    borderRadius: 2,
    position: 'absolute',
    width: '100%'
  },
  progressLineContainer: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 12,
    zIndex: 0
  },
  progressLineFill: {
    borderRadius: 2,
    position: 'absolute'
  },
  step: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(50),
    elevation: 3,
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41
  },
  stepContainer: {
    alignItems: 'center'
  },
  stepText: {
    color: Colors.blackShade2626,
    fontFamily: Fonts.ThemeBold,
    fontSize: moderateScale(12),
    marginTop: verticalScale(8)
  },
  stepWrapper: {
    alignItems: 'center'
  },
  stepperContainer: {
    position: 'relative'
  },
  stepsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1
  }
})
