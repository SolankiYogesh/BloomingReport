import {map} from 'lodash'
import type {ReactNode} from 'react'
import React, {memo} from 'react'
import type {Control, FieldErrors, UseFormWatch} from 'react-hook-form'
import {Controller} from 'react-hook-form'
import type {StyleProp, TextStyle, ViewStyle} from 'react-native'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'

import AppCheckBox from '../AppCheckBox/AppCheckBox'
import myStyles from './AppFormFieldInput.style'

type AppFormFieldInputProps = {
  name: string
  control?: Control<any>
  error?: FieldErrors<TFieldValues>
  watch?: UseFormWatch<TFieldValues>
  label?: string
  labelStyle?: StyleProp<TextStyle>
  errorText?: StyleProp<TextStyle>
  type?: number
  isChecked?: boolean
  isSingleSelect?: boolean
  onPressBox?: () => void
  onPressCheckBox?: any
  rightNode?: ReactNode
  questionText?: string
  rightNodeContainerStyle?: StyleProp<ViewStyle>
  allQuestions?: any
}

export default memo((props: AppFormFieldInputProps) => {
  const styles = myStyles()

  const {
    name,
    control,
    error,
    label,
    labelStyle,
    errorText,
    type,
    isChecked,
    isSingleSelect,
    onPressBox,
    rightNode,
    questionText,
    rightNodeContainerStyle,
    allQuestions,
    onPressCheckBox,
    watch
  } = props

  console.log('watch?.[name]', watch(name), name)

  return (
    <Controller
      name={name}
      control={control}
      shouldUnregister={false}
      render={({field: {onChange, onBlur, value}}) => {
        return (
          <>
            {label && <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>}

            {type === 1 &&
              map(allQuestions, (item, index) => (
                <View
                  style={[styles.rowView, index !== allQuestions?.length && styles.itemSeparate]}
                >
                  <AppCheckBox
                    isChecked={watch(name) === index}
                    isSingleSelect={isSingleSelect}
                    onPressCheckbox={() => onPressCheckBox(index)}
                    isDisabled={false}
                  />
                  {item.questionText && (
                    <Text style={[styles.textStyle, styles.ml8]}>{item.questionText}</Text>
                  )}
                </View>
              ))}

            {type === 2 && (
              <>
                <TextInput
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  style={styles.inputBoxStyle}
                />
                {rightNode && <View style={rightNodeContainerStyle}>{rightNode}</View>}
              </>
            )}

            {type === 3 && (
              <TouchableOpacity onPress={onPressBox} style={styles.inputBoxStyle}>
                <Text style={styles.textStyle}>{value}</Text>
                {rightNode && <View style={rightNodeContainerStyle}>{rightNode}</View>}
              </TouchableOpacity>
            )}

            {error?.[name] && (
              <Text style={[styles.errorText, errorText]}>{error?.[name]?.message}</Text>
            )}
          </>
        )
      }}
    />
  )
})
