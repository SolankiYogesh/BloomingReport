import {yupResolver} from '@hookform/resolvers/yup'
import {memo} from 'react'
import {useForm} from 'react-hook-form'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import * as yup from 'yup'

import {AppFormFieldInput} from '@/Components'
import {moderateScale, verticalScale} from '@/Helpers'
import {Colors, Fonts} from '@/Theme'

export default memo(() => {
  const schema = yup.object({
    unit: yup.number(),
    landHolding: yup.number()
  })

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    watch,
    clearErrors
  } = useForm({
    defaultValues: {
      unit: -1,
      landHolding: -1
    },
    resolver: yupResolver(schema)
  })

  const onPressCheckBox = (index: number) => {
    setValue('landHolding', index)
  }

  const QUESTIONS = [
    {
      label: 'Select unit for Area*',
      type: 3,
      onPressBox: () => {},
      name: 'unit'
    },
    {
      label: 'Land holding',
      type: 1,
      name: 'landHolding',
      allQuestion: [
        {questionText: 'Owned by the farmer'},
        {questionText: 'Co-owned by farmer and family'},
        {questionText: 'Shared (Neighbouring farmers)'}
      ],
      onPressCheckBox: onPressCheckBox,
      isSingleSelect: true
    }
  ]

  const renerQuestionItem = ({item}) => {
    return (
      <AppFormFieldInput
        name={item.name}
        control={control}
        error={errors}
        type={item.type}
        allQuestions={item.allQuestion}
        watch={watch}
        label={item.label}
        onPressCheckBox={onPressCheckBox}
        isSingleSelect={item.isSingleSelect}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LandDetailsPage</Text>
      <FlatList data={QUESTIONS} renderItem={renerQuestionItem} />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  },

  title: {
    color: Colors.black,
    fontFamily: Fonts.ThemeBold,
    fontSize: moderateScale(24),
    marginBottom: verticalScale(16),
    textAlign: 'center'
  }
})
