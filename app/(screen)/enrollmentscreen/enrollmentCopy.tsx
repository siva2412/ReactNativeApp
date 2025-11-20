import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { FunctionComponent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as yup from 'yup';

// ---------- Validation Schema ----------
const enrollmentSchema = yup.object({
  outletId: yup
    .string()
    .required('Outlet ID is required')
    .matches(/^[0-9]+$/, 'Outlet ID must be numbers'),

  outletName: yup
    .string()
    .required('Outlet Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Outlet Name must be letters only')
    .min(3, 'Outlet Name must be at least 3 characters long'),

  csmName: yup
    .string()
    .required('CSM Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'CSM Name must be letters only')
    .min(3, 'CSM Name must be at least 3 characters long'),

  profileType: yup
    .string()
    .required('Profile Type is required'),

  mobileNumber: yup
    .string()
    .min(10, 'Mobile Number must be 10 digits')
    .max(10, 'Mobile Number must be 10 digits')
    .required('Mobile Number is required')
    .matches(/^[0-9]+$/, 'Mobile Number must be numbers only'),

  pinCode: yup
    .string()
    .min(6, 'Pin Code must be 6 digits')
    .max(6, 'Pin Code must be 6 digits')
    .required('Pin Code is required')
    .matches(/^[0-9]+$/, 'Pin Code must be numbers only'),

  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters long'),

  state: yup
    .string()
    .required('State is required'),

  city: yup
    .string()
    .required('City is required'),

  pannumber: yup
    .string()
    .required('PAN Number is required')
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN Number format'),

  profileImage: yup
    .string()
    .required('Profile Image is required')
    .url('Profile Image must be a valid URL'),
});

type EnrollmentFormData = yup.InferType<typeof enrollmentSchema>;

type Option = { label: string; value: string };

type ModalDropdownProps = {
  visible: boolean;
  setVisible: (v: boolean) => void;
  data: Option[];
  selected?: string;
  label: string;
  onSelect: (value: string) => void;
};

// ---------- Center Modal Dropdown Component ----------
const ModalDropdown: React.FC<ModalDropdownProps> = ({
  visible,
  setVisible,
  data,
  selected,
  label,
  onSelect,
}) => {
  const [search, setSearch] = useState('');

  const filteredData = data.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center px-6">
        {/* Card */}
        <View className="bg-white rounded-2xl p-4 max-h-[70%]">
          <Text className="text-xl font-semibold mb-3">{label}</Text>

          {/* Search box only if more than 10 items */}
          {data.length > 10 && (
            <TextInput
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-3"
            />
          )}

          <FlatList
            data={filteredData}
            keyExtractor={item => item.value}
            style={{ maxHeight: 300 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onSelect(item.value);
                  setVisible(false);
                }}
                className="py-3 px-2 rounded-lg"
              >
                <Text className="text-base">
                  {item.label}
                </Text>
              </Pressable>
            )}
          />
        </View>

        {/* Cancel */}
        <Pressable onPress={() => setVisible(false)} className="mt-4">
          <Text className="text-center text-white text-lg">Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

// ---------- Main Screen ----------
const Enrollment: FunctionComponent = () => {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState('');

  // Modal visibility states
  const [profileTypeModalVisible, setProfileTypeModalVisible] = useState(false);
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);


  const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri,"image");
  }
};

  // Profile types data
  const profileTypes: Option[] = [
    { label: 'Select Profile Type', value: '' },
    { label: 'Retailer', value: 'retailer' },
    { label: 'Distributor', value: 'distributor' },
    { label: 'Wholesaler', value: 'wholesaler' },
    { label: 'Manufacturer', value: 'manufacturer' },
  ];

  // States data
  const states: Option[] = [
    { label: 'Select State', value: '' },
    { label: 'Maharashtra', value: 'maharashtra' },
    { label: 'Gujarat', value: 'gujarat' },
    { label: 'Karnataka', value: 'karnataka' },
    { label: 'Tamil Nadu', value: 'tamilnadu' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Uttar Pradesh', value: 'uttarpradesh' },
    { label: 'West Bengal', value: 'westbengal' },
    { label: 'Rajasthan', value: 'rajasthan' },
  ];

  // Cities data based on state
  const getCitiesByState = (state: string): Option[] => {
    const citiesMap: Record<string, Option[]> = {
      maharashtra: [
        { label: 'Select City', value: '' },
        { label: 'Mumbai', value: 'mumbai' },
        { label: 'Pune', value: 'pune' },
        { label: 'Nagpur', value: 'nagpur' },
        { label: 'Nashik', value: 'nashik' },
      ],
      gujarat: [
        { label: 'Select City', value: '' },
        { label: 'Ahmedabad', value: 'ahmedabad' },
        { label: 'Surat', value: 'surat' },
        { label: 'Vadodara', value: 'vadodara' },
        { label: 'Rajkot', value: 'rajkot' },
      ],
      karnataka: [
        { label: 'Select City', value: '' },
        { label: 'Bangalore', value: 'bangalore' },
        { label: 'Mysore', value: 'mysore' },
        { label: 'Hubli', value: 'hubli' },
        { label: 'Mangalore', value: 'mangalore' },
      ],
      tamilnadu: [
        { label: 'Select City', value: '' },
        { label: 'Chennai', value: 'chennai' },
        { label: 'Coimbatore', value: 'coimbatore' },
        { label: 'Madurai', value: 'madurai' },
        { label: 'Salem', value: 'salem' },
      ],
      delhi: [
        { label: 'Select City', value: '' },
        { label: 'New Delhi', value: 'newdelhi' },
        { label: 'Gurgaon', value: 'gurgaon' },
        { label: 'Noida', value: 'noida' },
        { label: 'Faridabad', value: 'faridabad' },
      ],
    };

    return citiesMap[state] || [{ label: 'Select City', value: '' }];
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<EnrollmentFormData>({
    resolver: yupResolver(enrollmentSchema),
    mode: 'onBlur',
    defaultValues: {
      outletId: '',
      outletName: '',
      csmName: '',
      profileType: '',
      mobileNumber: '',
      pinCode: '',
      address: '',
      state: '',
      city: '',
      pannumber: '',
      profileImage: '',
    },
  });

  const watchState = watch('state');
  const watchProfileType = watch('profileType');
  const watchCity = watch('city');

  const onSubmit = async (data: EnrollmentFormData) => {
    console.log('Enrollment Data:', data);
  };

  // ---------- Common Text Field Renderer ----------
  const renderFormField = (
    name: keyof EnrollmentFormData,
    label: string,
    placeholder: string,
    keyboardType: 'default' | 'numeric' | 'phone-pad' = 'default',
    multiline = false,
  ) => (
    <View className="mb-4">
      <Text className="text-gray-700 text-base font-medium mb-2">{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              placeholder={placeholder}
              keyboardType={keyboardType}
              multiline={multiline}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              textAlignVertical={multiline ? 'top' : 'center'}
              className={`border rounded-lg p-4 text-base ${
                errors[name]
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-white'
              }`}
            />
            {errors[name] && (
              <View className="flex-row items-center mt-1">
                <Ionicons name="alert-circle" size={16} color="#EF4444" />
                <Text className="text-red-500 text-sm ml-1">
                  {errors[name]?.message}
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );

  return (
    <View className="bg-white w-full h-full px-8 py-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Ionicons name="arrow-back" size={24} color="#374151" />
      </TouchableOpacity>

      <ScrollView className="flex-1 py-6">
        <Text className="capitalize text-5xl font-semibold px-30 pt-4">
          Hello! Register to get started
        </Text>
        <Text className="text-1xl mt-2 text-gray-900 mb-3">
          Easy, 2 minute registration
        </Text>

        {renderFormField('outletId', 'Outlet ID*', '1254632185', 'numeric')}
        {renderFormField('outletName', 'Outlet Name*', 'Enter your outlet name')}
        {renderFormField('csmName', 'CSM Name*', 'Enter your name')}

        {/* Profile Type Dropdown */}
        <View className="mb-4">
          <Text className="text-gray-700 text-base font-medium mb-2">
            Profile Type*
          </Text>
          <Controller
            control={control}
            name="profileType"
            render={({ field: { onChange } }) => (
              <>
                <TouchableOpacity
                  onPress={() => setProfileTypeModalVisible(true)}
                  className={`border rounded-lg px-4 py-4 ${
                    errors.profileType
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300'
                  }`}
                >
                  <Text
                    className={
                      watchProfileType ? 'text-black' : 'text-gray-400'
                    }
                  >
                    {watchProfileType
                      ? profileTypes.find(
                          item => item.value === watchProfileType,
                        )?.label
                      : 'Select Profile Type'}
                  </Text>
                </TouchableOpacity>

                {errors.profileType && (
                  <View className="flex-row items-center mt-1">
                    <Ionicons
                      name="alert-circle"
                      size={16}
                      color="#EF4444"
                    />
                    <Text className="text-red-500 text-sm ml-1">
                      {errors.profileType?.message}
                    </Text>
                  </View>
                )}

                <ModalDropdown
                  visible={profileTypeModalVisible}
                  setVisible={setProfileTypeModalVisible}
                  data={profileTypes}
                  selected={watchProfileType}
                  label="Select Profile Type"
                  onSelect={value => {
                    onChange(value);
                  }}
                />
              </>
            )}
          />
        </View>

        {renderFormField(
          'mobileNumber',
          'Mobile Number*',
          'Enter your mobile number',
          'phone-pad',
        )}
        {renderFormField('pinCode', 'Pin Code*', '400001', 'numeric')}
        {renderFormField(
          'address',
          'Address*',
          'Enter complete address',
          'default',
          true,
        )}

        {/* State Dropdown */}
        <View className="mb-4">
          <Text className="text-gray-700 text-base font-medium mb-2">
            State*
          </Text>
          <Controller
            control={control}
            name="state"
            render={({ field: { onChange } }) => (
              <>
                <TouchableOpacity
                  onPress={() => setStateModalVisible(true)}
                  className={`border rounded-lg px-4 py-4 ${
                    errors.state
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300'
                  }`}
                >
                  <Text
                    className={watchState ? 'text-black' : 'text-gray-400'}
                  >
                    {watchState
                      ? states.find(item => item.value === watchState)?.label
                      : 'Select State'}
                  </Text>
                </TouchableOpacity>

                {errors.state && (
                  <View className="flex-row items-center mt-1">
                    <Ionicons
                      name="alert-circle"
                      size={16}
                      color="#EF4444"
                    />
                    <Text className="text-red-500 text-sm ml-1">
                      {errors.state?.message}
                    </Text>
                  </View>
                )}

                <ModalDropdown
                  visible={stateModalVisible}
                  setVisible={setStateModalVisible}
                  data={states}
                  selected={watchState}
                  label="Select State"
                  onSelect={value => {
                    setSelectedState(value);
                    setValue('city', '');
                    onChange(value);
                  }}
                />
              </>
            )}
          />
        </View>

        {/* City Dropdown */}
        <View className="mb-4">
          <Text className="text-gray-700 text-base font-medium mb-2">
            City*
          </Text>
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange } }) => (
              <>
                <TouchableOpacity
                  onPress={() => setCityModalVisible(true)}
                  className={`border rounded-lg px-4 py-4 ${
                    errors.city
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300'
                  }`}
                >
                  <Text
                    className={watchCity ? 'text-black' : 'text-gray-400'}
                  >
                    {watchCity
                      ? getCitiesByState(watchState).find(
                          item => item.value === watchCity,
                        )?.label
                      : 'Select City'}
                  </Text>
                </TouchableOpacity>

                {errors.city && (
                  <View className="flex-row items-center mt-1">
                    <Ionicons
                      name="alert-circle"
                      size={16}
                      color="#EF4444"
                    />
                    <Text className="text-red-500 text-sm ml-1">
                      {errors.city?.message}
                    </Text>
                  </View>
                )}

                <ModalDropdown
                  visible={cityModalVisible}
                  setVisible={setCityModalVisible}
                  data={getCitiesByState(watchState)}
                  selected={watchCity}
                  label="Select City"
                  onSelect={value => {
                    onChange(value);
                  }}
                />
              </>
            )}
          />
        </View>

        {renderFormField('pannumber', 'PAN Number*', 'ABCDE1234F')}
        {renderFormField(
          'profileImage',
          'Profile Image URL*',
          'Enter image URL',
        )}

        <View className="mt-4 mb-8">
          <TouchableOpacity
            className={`py-4 px-6 rounded-lg ${
              isSubmitting ? 'bg-gray-400' : 'bg-primary'
            }`}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <View className="flex-row items-center justify-center">
              {isSubmitting && (
                <View className="mr-2">
                  <Text className="text-white">⏳</Text>
                </View>
              )}
              <Text className="text-white text-lg font-semibold text-center">
                {isSubmitting ? 'Registering...' : 'Complete Registration'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Enrollment;
