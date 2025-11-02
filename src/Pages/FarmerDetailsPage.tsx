import {yupResolver} from '@hookform/resolvers/yup'
import {useNetInfo} from '@react-native-community/netinfo'
import {memo} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {StyleSheet, Text, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'
import * as yup from 'yup'

import {AppCheckBox} from '@/Components'
import AppButton from '@/Components/AppButton'
import AppInput from '@/Components/AppInput'
import {moderateScale, PADDING, scale, verticalScale} from '@/Helpers'
import {Colors, Fonts} from '@/Theme'

// Validation schema
const farmerDetailsSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  contactNumber: yup
    .string()
    .required('Contact number is required')
    .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits'),
  gender: yup.string().required('Gender is required')
})

type FarmerDetailsForm = yup.InferType<typeof farmerDetailsSchema>

export default memo(() => {
  const {isConnected} = useNetInfo()
  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm<FarmerDetailsForm>({
    resolver: yupResolver(farmerDetailsSchema),
    defaultValues: {
      fullName: '',
      contactNumber: '',
      gender: ''
    }
  })

  const onSubmit = (data: FarmerDetailsForm) => {
    console.log('Form data:', data)
  }

  const genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'}
  ]

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.fieldContainer}>
          <Controller
            control={control}
            name="fullName"
            render={({field: {onChange, onBlur, value}}) => (
              <AppInput
                label="1. Enter full name*"
                placeholder="Enter name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.fullName?.message}
              />
            )}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Controller
            control={control}
            name="contactNumber"
            render={({field: {onChange, onBlur, value}}) => (
              <AppInput
                label="2. Contact number*"
                placeholder="Enter mobile number"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.contactNumber?.message}
                keyboardType="phone-pad"
                maxLength={10}
              />
            )}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.genderLabel}>3. Select Gender*</Text>
          <View style={styles.genderOptions}>
            {genderOptions.map((option) => (
              <Controller
                key={option.value}
                control={control}
                name="gender"
                render={({field: {onChange, value}}) => (
                  <AppCheckBox
                    label={option.label}
                    onPressCheckbox={() => onChange(option.value)}
                    isChecked={value === option.value}
                  />
                )}
              />
            ))}
          </View>
          {errors.gender && <Text style={styles.errorText}>{errors.gender.message}</Text>}
        </View>
        {!isConnected && (
          <View style={styles.offlineViewContainer}>
            <Text style={styles.noInternetTextStyle}>
              You are offline right now, please connect {'\n'} to the internet to use map features.
            </Text>
            <Text style={styles.noInternetTextStyle}>Or</Text>
            <Text style={styles.noInternetTextStyle}>Fill details manually</Text>
          </View>
        )}

        <AppButton
          title="Create Farmer Profile"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        />
      </KeyboardAwareScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  errorText: {
    color: Colors.redShadeFF,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(12),
    marginTop: verticalScale(4)
  },
  fieldContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grayShadeCBCB,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: PADDING,
    paddingVertical: scale(16),
    width: '100%'
  },
  genderLabel: {
    color: Colors.blackShade2626,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(16),
    marginBottom: verticalScale(16)
  },
  genderOptions: {
    rowGap: verticalScale(16)
  },

  noInternetTextStyle: {
    color: Colors.blackShade2626,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(14),
    textAlign: 'center'
  },

  offlineViewContainer: {
    marginVertical: verticalScale(8),
    rowGap: verticalScale(12)
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(40),
    paddingTop: verticalScale(20),
    rowGap: verticalScale(8)
  },
  submitButton: {
    margin: PADDING
  }
})
