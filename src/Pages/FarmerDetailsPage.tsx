import {yupResolver} from '@hookform/resolvers/yup'
import {useNetInfo} from '@react-native-community/netinfo'
import {memo, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded
} from 'react-native-android-location-enabler'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'
import {SvgFromXml} from 'react-native-svg'
import * as yup from 'yup'

import {AppButton, AppCheckBox, AppInput, LabelText, LocationPickerModal} from '@/Components'
import {moderateScale, PADDING, Permission, scale, SVGByteCode, verticalScale} from '@/Helpers'
import {Colors, Fonts} from '@/Theme'

const farmerDetailsSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  contactNumber: yup
    .string()
    .required('Contact number is required')
    .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits'),
  gender: yup.string().required('Gender is required')
})

type FarmerDetailsForm = yup.InferType<typeof farmerDetailsSchema>

const genderOptions = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'}
]

export default memo(() => {
  const [isLocationPicker, setIsLocationPicker] = useState(false)
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
          <LabelText style={styles.genderLabel} label="3. Select Gender*" />
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
          {!!errors?.gender && <Text style={styles.errorText}>{errors.gender.message}</Text>}
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
        <View style={styles.fieldContainer}>
          <LabelText style={styles.genderLabel} label="4. House location*" />

          <View style={styles.onlineViewContainer}>
            <TouchableOpacity
              style={styles.locationButtonStyle}
              onPress={() => {
                Permission.getLocationPermission().then(async (resp) => {
                  if (resp) {
                    if (Platform.OS === 'android') {
                      const checkEnabled = await isLocationEnabled()
                      if (!checkEnabled) {
                        const enableResult = await promptForEnableLocationIfNeeded()
                        if (enableResult === 'enabled') {
                          setIsLocationPicker(true)
                        }
                      } else {
                        setIsLocationPicker(true)
                      }
                    } else {
                      setIsLocationPicker(true)
                    }
                  }
                })
              }}
            >
              <SvgFromXml xml={SVGByteCode.location} />
              <View>
                <Text style={styles.locationText}>Fetch Location</Text>
                <Text style={styles.locationRecoText}>{'(Recommended)'}</Text>
              </View>
            </TouchableOpacity>
            <Text style={[styles.noInternetTextStyle, styles.textUpparStyle]}>Or</Text>
            <TouchableOpacity style={[styles.locationButtonStyle, styles.manualButtonStyle]}>
              <Text>Enter Manually</Text>
            </TouchableOpacity>
          </View>
        </View>

        <AppButton
          title="Create Farmer Profile"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        />
      </KeyboardAwareScrollView>
      {isLocationPicker && (
        <LocationPickerModal
          onConfirm={(location) => {
            console.log('location', location)
          }}
          isVisible={true}
          onClose={() => setIsLocationPicker(false)}
        />
      )}
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
    marginBottom: verticalScale(16)
  },
  genderOptions: {
    rowGap: verticalScale(16)
  },
  locationButtonStyle: {
    alignItems: 'center',
    backgroundColor: Colors.redShadeFFE,
    borderRadius: moderateScale(6),
    columnGap: scale(10),
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: verticalScale(48),
    padding: scale(12)
  },

  locationRecoText: {
    color: Colors.primary,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(12)
  },
  locationText: {
    color: Colors.primary,
    fontFamily: Fonts.ThemeSemiBold,
    fontSize: moderateScale(14)
  },
  manualButtonStyle: {
    backgroundColor: Colors.grayShadeEFE
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
  onlineViewContainer: {
    marginVertical: verticalScale(8),
    paddingHorizontal: PADDING,
    rowGap: verticalScale(16)
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(40),
    paddingTop: verticalScale(20),
    rowGap: verticalScale(8)
  },
  submitButton: {
    margin: PADDING
  },
  textUpparStyle: {
    textTransform: 'uppercase'
  }
})
