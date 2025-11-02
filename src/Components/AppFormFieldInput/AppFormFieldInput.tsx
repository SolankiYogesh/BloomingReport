import {trim} from 'lodash'
import React, {memo} from 'react'
import type {Control} from 'react-hook-form'
import {Controller} from 'react-hook-form'
import type {StyleProp, TextStyle} from 'react-native'
import {Text} from 'react-native'

import AppCheckBox from '../AppCheckBox/AppCheckBox'
import myStyles from './AppFormFieldInput.style'

type AppFormFieldInputProps = {
  name: string
  control?: Control<any>
  error?: any
  label?: string
  labelStyle?: StyleProp<TextStyle>
  errorText?: StyleProp<TextStyle>
  type?: number
  isChecked?: boolean | undefined
  isSingleSelect?: boolean | undefined
}

export default memo((props: AppFormFieldInputProps) => {
  const styles = myStyles()

  const {name, control, error, label, labelStyle, errorText, type, isChecked, isSingleSelect} =
    props

  const errorTextLength = Number(trim(error?.[name]?.message?.length))

  return (
    <Controller
      name={name}
      control={control}
      shouldUnregister={false}
      render={({field: {onChange, onBlur, value}}) => {
        return (
          <>
            {label && <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>}

            {type === 1 && <AppCheckBox isChecked={isChecked} isSingleSelect={isSingleSelect} />}

            {error?.[name] && errorTextLength > 1 && (
              <Text style={[styles.errorText, errorText]}>{error?.[name]?.message}</Text>
            )}
          </>
        )
      }}
    />
  )
})
