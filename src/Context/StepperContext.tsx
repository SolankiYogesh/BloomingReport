import type { ReactNode } from 'react'
import React, { createContext, useContext } from 'react'

type StepperContextType = {
  currentStep: number
  totalSteps: number
  goToNext: () => void
  goToPrevious: () => void
  goToStep: (step: number) => void
  canGoNext: boolean
  canGoPrevious: boolean
}

const StepperContext = createContext<StepperContextType | undefined>(undefined)

type StepperProviderProps = {
  children: ReactNode
  currentStep: number
  totalSteps: number
  onStepChange: (step: number) => void
}

export const StepperProvider: React.FC<StepperProviderProps> = ({
  children,
  currentStep,
  totalSteps,
  onStepChange
}) => {
  const goToNext = () => {
    if (currentStep < totalSteps) {
      onStepChange(currentStep + 1)
    }
  }

  const goToPrevious = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      onStepChange(step)
    }
  }

  const canGoNext = currentStep < totalSteps
  const canGoPrevious = currentStep > 1

  const value: StepperContextType = {
    currentStep,
    totalSteps,
    goToNext,
    goToPrevious,
    goToStep,
    canGoNext,
    canGoPrevious
  }

  return <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
}

export const useStepperContext = (): StepperContextType => {
  const context = useContext(StepperContext)
  if (context === undefined) {
    throw new Error('useStepperContext must be used within a StepperProvider')
  }
  return context
}