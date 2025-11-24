import AlertService from '@/components/alert/AlertService';
import Checkbox from '@/components/Checkbox/checkbox';
import LoaderService from '@/components/loader/LoaderService';
import { storeData } from '@/utils/storage';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import moment from 'moment';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Linking, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as yup from 'yup';

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
    .optional()
    .transform((value) => (value === '' ? undefined : value))
    .matches(/^([A-Z]{5}[0-9]{4}[A-Z]{1})?$/, 'Invalid PAN Number format'),

  profileImage: yup
    .string()
    .required('Profile Image is required'),

  // dateOfBirth: yup
  //   .date()
  //   .required('Date of Birth is required')
  //   .max(new Date(), 'Date of Birth cannot be in the future')
  //   .test('age-limit', 'You must be at least 18 years old', function (value) {
  //     if (!value) return false; // If no value, fail the test

  //     const today = new Date();
  //     let age = today.getFullYear() - value.getFullYear();
  //     const m = today.getMonth() - value.getMonth();

  //     if (m < 0 || (m === 0 && today.getDate() < value.getDate())) {
  //       age--;
  //     }
  //     return age >= 18;
  //   }),
    dateOfBirth: yup
  .string()
  .required("Date of Birth is required")
  .test("valid-date", "Invalid date", (value) => moment(value, "YYYY-MM-DD", true).isValid())
  .test("age-limit", "You must be at least 18 years old", function (value) {
    if (!value) return false;

    const dob = moment(value, "YYYY-MM-DD");
    const today = moment();

    return today.diff(dob, "years") >= 18;
  }),
}).required(); 

type EnrollmentFormData = yup.InferType<typeof enrollmentSchema>;

type Option = { label: string; value: string };


const Enrollment = () => {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [isYearModalOpen, setIsYearModalOpen] = useState(false);
  const [image, setImage] = useState<{ uri: string; sizeInMB: string } | null>(null);
  const [imagemodal, setImagemodal] = useState<boolean | false>(false);
  const [panmodal, setPanmodal] = useState<boolean | false>(false);
  const [panVerified, setPanVerified] = useState<boolean>(false);
  const years = Array.from(
    { length: 2025 - 1900 + 1 },
    (_, i) => 2025 - i
  );



  // const [filterOptions, setFilterOptions] = useState<any[]>([]);
  const { control, handleSubmit, formState: { errors, isSubmitting } , setValue }
    = useForm({
      resolver: yupResolver(enrollmentSchema),
      mode: 'onChange',
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
        dateOfBirth: moment(new Date()).format("YYYY-MM-DD"),
      }
    });



  const states: Option[] = [
    { label: 'Maharashtra', value: 'maharashtra' },
    { label: 'Gujarat', value: 'gujarat' },
    { label: 'Karnataka', value: 'karnataka' },
    { label: 'TamilNadu', value: 'tamilnadu' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Uttar Pradesh', value: 'uttarpradesh' }
  ];

  // Cities data based on state
  const getCitiesByState = (state: string): Option[] => {
    const citiesMap: Record<string, Option[]> = {
      maharashtra: [
        { label: 'Mumbai', value: 'mumbai' },
        { label: 'Pune', value: 'pune' },
        { label: 'Nagpur', value: 'nagpur' },
        { label: 'Nashik', value: 'nashik' },
      ],
      gujarat: [
        { label: 'Ahmedabad', value: 'ahmedabad' },
        { label: 'Surat', value: 'surat' },
        { label: 'Vadodara', value: 'vadodara' },
        { label: 'Rajkot', value: 'rajkot' },
      ],
      karnataka: [
        { label: 'Bangalore', value: 'bangalore' },
        { label: 'Mysore', value: 'mysore' },
        { label: 'Hubli', value: 'hubli' },
        { label: 'Mangalore', value: 'mangalore' },
      ],
      tamilnadu: [
        { label: 'Chennai', value: 'chennai' },
        { label: 'Coimbatore', value: 'coimbatore' },
        { label: 'Madurai', value: 'madurai' },
        { label: 'Salem', value: 'salem' },
      ],
      delhi: [
        { label: 'New Delhi', value: 'newdelhi' },
        { label: 'Gurgaon', value: 'gurgaon' },
        { label: 'Noida', value: 'noida' },
        { label: 'Faridabad', value: 'faridabad' },
      ],
    };

    // return citiesMap[state] || [{ label: 'Select City', value: '' }];
    return citiesMap[state] || [];
  };

  const onSubmit = async (data: any) => {
    console.log('Enrollment Data:', data);
    
    LoaderService.show("Please wait...");

    setTimeout(async () => {
      
      await storeData('isEnrolled', true);
      LoaderService.hide();
      router.push('/(tabs)/home');
    }, 3000);

  }


  const renderFormField = (
    name: keyof EnrollmentFormData,
    placeholder: string,
    label: string,
    keyboardType: 'default' | 'numeric' | 'phone-pad' = 'default',
    multiline = false
  ) => (
    <View className='mb-4'>
      <Text className='absolute -top-1 left-5 bg-white px-1 z-10 font-semibold text-gray-700 text-1xl' >{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            keyboardType={keyboardType}
            // onChange={}siva
            multiline={multiline}
            onChangeText={onChange}
            onBlur={onBlur}
            value={typeof value === 'string' ? value : ''}
            textAlignVertical={multiline ? 'top' : 'center'}
            className={`border  ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md p-4 mt-2`}
          />
        )}
      />
      {errors[name] && (
        <Text className="text-red-500 text-sm mt-1">
          {errors[name]?.message}
        </Text>
      )}
    </View>
  );



  const renderFormDropdown = (
    name: keyof EnrollmentFormData,
    label: string,
    placeholder: string,

    options: string[]) => (
      <>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {

        const [searchText, setSearchText] = useState("");
        const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

        // const filtered = options; // Add filtering logic if needed

        // const filteredOptions = filtered.filter(option =>(
        //     option.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        // ))
        // setFilterOptions(filteredOptions);
        const handleSearchChange = (text: string) => {
          // setSearchText(text);

          const filtered = options.filter((opt) =>
            opt.toLowerCase().includes(text.toLowerCase())
          );

          setFilteredOptions(filtered);
        };

        return (<View className='mb-4'>
          <Text className='absolute -top-1 left-5 bg-white px-1 z-10 font-semibold text-gray-700 text-1xl' >{label}</Text>
          <Pressable>
            <TouchableOpacity
              onPress={() => {
                setActiveModal(name);
                setFilteredOptions(options); // Reset filtered options when opening
              }}
            >
              <Text
                className={`border border-gray-300 rounded-md p-4 mt-2 ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
              >
                {(typeof value === 'string' ? value : '') || placeholder}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#9CA3AF" className="absolute right-4 top-1/2 -translate-y-1/2" />
            </TouchableOpacity>
            {
              /* Modal component can be added here to show options when modal is active */
              activeModal === name && (
                <Modal
                  transparent={true}
                  animationType="slide"
                  visible={activeModal === name}
                  onRequestClose={() => setActiveModal(null)}
                >
                  <View className='flex-1 justify-center items-center bg-black/60 px-6'>
                    <View className="bg-white/90 w-full rounded-3xl p-5 max-h-[70%]">

                      {/* Header with close button */}
                      <View className="flex-row justify-between items-center mb-5 mt-2">
                        <Text className="text-lg font-semibold text-gray-900">{label}</Text>
                        <TouchableOpacity onPress={() => setActiveModal(null)}>
                          <Ionicons name="close" size={24} color="#374151" />
                        </TouchableOpacity>
                      </View>

                      <ScrollView showsVerticalScrollIndicator={true}>

                        {
                          filteredOptions.length === 0 && (
                            <Text className='text-gray-900 text-base'>No options available</Text>
                          )
                        }
                        {filteredOptions.length > 0 && (

                          <TextInput
                            placeholder="Search options..."
                            className="border border-gray-300  rounded-md px-4 py-2 mb-4 w-full h-12 "
                            onChangeText={handleSearchChange}
                          />

                        )
                        }
                        {filteredOptions.map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => {
                              // Set selected option logic here
                              setActiveModal(null);
                              onChange(option);
                            }}
                            // className="w-full py-3 border-b border-gray-200 items-center"
                            className="p-4 border-b border-gray-200 w-full items-start"
                          >
                            <Text
                              className='text-gray-900 text-base'
                            >{option}</Text>
                          </TouchableOpacity>
                        ))}
                        {/* </View> */}
                      </ScrollView>
                    </View>
                  </View>

                </Modal>
              )
            }
          </Pressable>
          {errors[name] && (
            <Text className="text-red-500 text-sm mt-1">
              {errors[name]?.message}
            </Text>
          )}
        </View>)
      }}
    />

      </>

  );


  const goPrevMonth = () => {
    setCalendarDate(prev => moment(prev).subtract(1, "month").toDate());
  };

  const goNextMonth = () => {
    setCalendarDate(prev => moment(prev).add(1, "month").toDate());
  };

  const selectYear = (yr: number) => {
    setCalendarDate(prev => moment(prev).year(yr).toDate());
    setIsYearModalOpen(false);
  };

  const renderFormDatePicker = (
    name: keyof EnrollmentFormData,
    placeholder: string,
    label: string
  ) => (
    <View className="mb-4">
      <Text className="absolute -top-1 left-5 bg-white px-1 z-10 font-semibold text-gray-700">
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <>
            <TouchableOpacity
              className={`border rounded-md p-4 mt-2 ${errors[name] ? 'border-red-500' : 'border-gray-600'}`}
              onPress={() => {
                if (value) {
                  setCalendarDate(new Date(value));   // IMPORTANT FIX
                }
                setIsDatePickerOpen(true);
              }}
            >
              <Text className={value ? "text-black" : "text-gray-400"}>
                {value ? moment(value).format("DD/MM/YYYY") : placeholder}
              </Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal visible={isDatePickerOpen} transparent animationType="slide">
              <View className="flex-1 bg-black/60 justify-center items-center px-6">
                <View className="bg-white w-full rounded-2xl p-5">

                  {/* Header */}
                  <View className="flex-row justify-between items-center px-4 pb-3">
                    <TouchableOpacity onPress={goPrevMonth}>
                      <Ionicons name="arrow-back" size={24} color="#ef4444" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsYearModalOpen(true)}>
                      <Text className="text-black text-lg font-semibold">
                        {moment(calendarDate).format("MMMM YYYY")}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goNextMonth}>
                      <Ionicons name="arrow-forward" size={24} color="#ef4444" />
                    </TouchableOpacity>
                  </View>

                  {/* Calendar */}
                  <Calendar
                    key={moment(calendarDate).format("YYYY-MM")}
                    current={moment(calendarDate).format("YYYY-MM-DD")}
                    hideArrows={true}
                    renderHeader={() => null}
                    onMonthChange={(month) => {
                      setCalendarDate(new Date(month.dateString));
                    }}

                    onDayPress={(day) => {
                      // console.log('Selected day:', day.dateString);
                      const formatted = moment(day.dateString).format("YYYY-MM-DD");
                      onChange(formatted);                    // update form value
                      setCalendarDate(new Date(formatted));   // update calendar state
                      setIsDatePickerOpen(false);
                      setValue(name, formatted, { shouldValidate: true });
                    }}
                    theme={{
                      textSectionTitleColor: "#ef4444",
                    }}
                    markedDates={{
                      [value as string]: { selected: true, selectedColor: "#ef4444" }
                    }}
                  />

                  {/* Footer */}
                  <View className="flex-row justify-end mt-4 px-2">
                    <TouchableOpacity onPress={() => setIsDatePickerOpen(false)}>
                      <Text className="text-gray-700 text-lg font-semibold">
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </Modal>

            {/* Year Modal */}
            <Modal visible={isYearModalOpen} transparent animationType="fade">
              <View className="flex-1 bg-black/40 justify-center items-center px-6">
                <View className="bg-gray-200 w-full rounded-3xl px-8 py-10 max-h-[70%]">
                  <Text className="text-center text-lg font-bold mb-4 text-primary ">Select Year</Text>

                  <ScrollView>
                    {years.map((yr) => (
                      <TouchableOpacity
                        key={yr}
                        className="p-4 border-b border-gray-300"
                        onPress={() => selectYear(yr)}
                      >
                        <Text className="text-lg text-center">{yr}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  <TouchableOpacity
                    className="mt-4 bg-red-500 p-3 rounded-xl"
                    onPress={() => setIsYearModalOpen(false)}
                  >
                    <Text className="text-white text-center font-semibold">Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
        )}
      />

      {errors[name] && (
        <Text className="text-red-500 text-sm mt-1">{errors[name]?.message}</Text>
      )}
    </View>
  );


  const pickFromGallery = async (name: keyof EnrollmentFormData) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.4,
    });

    if (!result.canceled) {
      setImagemodal(false);
      // const compressImageUri = await compressImage(result.assets[0].uri);
      // setValue(name, result.assets[0].uri);
      setValue(name, result.assets[0].uri, { shouldValidate: true });

      const sizeInMB = await sizeMB(result.assets[0].fileSize ?? 0);
      setImage({ uri: result.assets[0].uri, sizeInMB: sizeInMB });
    }
  };



  // const compressImage = async (uri: string) => {
  //   const result = await ImageManipulator.manipulateAsync(
  //     uri,
  //     [{ resize: { width: 800 } }],  // Resize width to 800px (keeps aspect ratio)
  //     {
  //       compress: 0.4,              // 0.0–1.0 (lower = more compression)
  //       format: ImageManipulator.SaveFormat.JPEG,
  //     }
  //   );

  //   return result.uri;
  // };


  const sizeMB = async (fileSize: number) => {

    const sizeInBytes: number = fileSize ?? 0;
    const sizeMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
    return sizeMB;
  }

  const openCamera = async (name: keyof EnrollmentFormData) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {

      const gotoSettingsButton = [
        {
          text: "Go to Settings",
          onPress: () => {
            Linking.openSettings(); // Therse for opening settings
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            AlertService.hideAlert();
            setImagemodal(false);
          },
          // style: ""
        }
      ]

      AlertService.showAlert("Camera permission needed!", "Cannot open camera without permission. Please enable it in settings. Please click below go to settings.", gotoSettingsButton);

      // Linking.openSettings();
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,   // <-- FIXED
      quality: 0.4,
      allowsEditing: false
    });

    if (!result.canceled) {
      setImagemodal(false);
      // setValue(name, result.assets[0].uri); // Set form value
      setValue(name, result.assets[0].uri, { shouldValidate: true });
      const sizeInMB = await sizeMB(result.assets[0].fileSize ?? 0);
      setImage({ uri: result.assets[0].uri, sizeInMB: sizeInMB });
    }
  };

  const renderFormImagePicker = (
    name: keyof EnrollmentFormData,
    placeholder: string,
    label: string
  ) => {
    return (
      <View className='mb-4'>
        <TouchableOpacity
          onPress={() => setImagemodal(true)}
          className={`border-x-2 border-y-2 p-4 rounded-lg  border-dashed ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
        >
          <Text className="text-black/70 text-center text-lg font-semibold">{placeholder}</Text>
        </TouchableOpacity>
        {

        }

        <Modal visible={imagemodal} transparent animationType="fade">
          <View className="flex-1 bg-black/40 justify-center items-center px-6 py-6">
            <View className="bg-white w-full rounded-3xl px-5 max-h-[70%] py-10 ">

              <View className='items-center bg-gray-200 p-4 rounded-3xl'>
                <TouchableOpacity className='mt-4 border-b border-gray-300 '
                  onPress={() => openCamera(name)}>
                  <Text className='text-gray-900 text-xl'>Take Photo</Text>
                </TouchableOpacity>
                <Text numberOfLines={1} className='text-gray-400 text-xl my-4'>
                  ______________________________________________________________
                </Text>
                <TouchableOpacity className='mt-4 mb-4'
                  onPress={() => pickFromGallery(name)}
                >
                  <Text className='text-gray-900 text-xl'>Choose from Gallery</Text>
                </TouchableOpacity>
              </View>

              {/* footer with close button */}
              <View className="flex-row justify-center mt-10 px-2 bg-primary rounded-3xl py-3">
                <TouchableOpacity onPress={() => setImagemodal(false)}>
                  <Text className="text-white text-lg font-semibold">Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {image && image.uri && (
          <View className='mt-4 items-start mb-4 border px-2 py-3 rounded-lg border-gray-300 '>
           
            {image && image.uri && (
              <View className='flex-row justify-between w-full'>
                <View className='flex-row gap-4'>
                  <Image source={{ uri: image.uri }} className='w-20 h-20' />

                  <View>
                    <Text className='text-xl'>Profile Picture</Text>
                    <Text className='text-base text-gray-700 mt-2 font-semibold'>
                      Size: {image.sizeInMB} MB
                    </Text>
                  </View>
                </View>

                <TouchableOpacity onPress={() => setImage(null)}
                      className='px-2 py-6'
                    >
                  <Ionicons name="close-circle-outline" size={28} color={"red"} />
                </TouchableOpacity>
              </View>
            )}

          </View>
        )}

        {errors[name] && (
        <Text className="text-red-500 text-sm mt-1">{errors[name]?.message}</Text>
      )}
      </View>
    );
  };


  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const renderFormDataWithVerifyModal = (
    name: keyof EnrollmentFormData,
    placeholder: string,
    label: string
  ) => {
    
    // if()

    return (
    <View className='mb-4 '>
       <Text className="absolute -top-1 left-5 bg-white px-1 z-10 font-semibold text-gray-700">
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
          render={({ field: { value, onChange } }) => (
            <>
              <View
                className={`px-2 border rounded-md mt-2 flex-row justify-between items-center ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
              >

                <TextInput
                  placeholder={placeholder}
                  keyboardType='default'
                  onChangeText={onChange}
                  value={typeof value === 'string' ? value : ''}
                  className="flex-1 p-4 text-gray-900 text-lg"
                />

                <TouchableOpacity
                  className={`bg-red-500 px-6 py-2 rounded-md mx-2 justify-center items-center ${panVerified ? 'opacity-50' : ''}`}
                  onPress={() => {
                    // Verification logic here
                    setPanmodal(true);
                  }}
                  disabled={panVerified}
                >
                  <Text className="text-white text-base font-semibold"> { panVerified ? "Verified" : "Verify"}</Text>
                </TouchableOpacity>

              </View>
              {/* PAN Verification Modal */}
              <Modal visible={panmodal} transparent animationType="slide">
                <View className="flex-1 bg-black/40 justify-center items-center px-6 py-6">
                  <View className="bg-white w-full rounded-3xl p-5 max-h-[70%]">
                    <Text className="text-center text-lg font-bold mb-4 text-primary ">PAN Verification</Text>
                    
                  <View className='mb-4'>

                      <Text className="absolute -top-1 left-5 bg-white px-1 z-10 font-semibold text-gray-700">
                        Name you have entered
                      </Text>
                      <TextInput
                        // keyboardType='default'
                        onChangeText={onChange}
                        editable={false}
                        value="Sivasankar"
                        className={`border  'border-gray-300' rounded-md p-4 mt-2`}
                      />
                    </View>

                    
                    <View className='mb-4'>

                      <Text className="absolute -top-1 left-5 bg-white px-1 z-10 font-semibold text-gray-700">
                        Name as per PAN
                      </Text>
                      <TextInput
                        // keyboardType='default'
                        onChangeText={onChange}
                        editable={false}
                        value='Sivasankar Dharmaraj'
                        className={`border  'border-gray-300' rounded-md p-4 mt-2`}
                      />
                    </View>

                    <View className='mb-4'>

                      <Text className="absolute -top-1 left-5 bg-white px-1 z-10 font-semibold text-gray-700">
                        {label}
                      </Text>
                      <TextInput
                        placeholder={placeholder}
                        // keyboardType='default'
                        onChangeText={onChange}
                        editable={false}
                        value={typeof value === 'string' ? value : ''}
                        className={`border uppercase  'border-gray-300' rounded-md p-4 mt-2`}
                      />
                    </View>

                    <View className='mb-4'>

                      <Text className="absolute -top-1 left-5 bg-white px-1 z-10 font-semibold text-gray-700">
                        Status
                      </Text>
                      <TextInput
                        // keyboardType='default'
                        onChangeText={onChange}
                        editable={false}
                        value="Verified"
                        className={`border  'border-gray-300' rounded-md p-4 mt-2`}
                      />
                    </View>

                    <View className='flex-row flex-nowrap gap-4 px-4'>
                      {/* <Pressable className="h-8 w-8 border border-primary " >
                                <Text className="text-primary text-lg font-semibold"></Text>
                              </Pressable> */}
                      <Checkbox checked={isChecked} onChange={handleCheckboxChange} label="" />
                      <Text className='text-base text-zinc-600  font-semibold '>
                        I give my consent that the mentioned pan card details belongs to me and ABl or its representatives or third-party service provider to use my pan card Number to file TDS under Income tax for all my redemptions
                      </Text>

                    </View>
                    {/* <Text className="text-gray-900 text-base">
                      PAN Number {value ? (typeof value === 'string' ? value : value.toString()) : ''} has been successfully verified.
                    </Text> */}
                    <TouchableOpacity
                      className={`mt-4 p-3 rounded-xl ${!isChecked ? 'bg-gray-400' : 'bg-red-500'}`}
                      disabled={!isChecked}
                      onPress={() => {setPanmodal(false); setPanVerified(true);}}
                    >
                      <Text className="text-white text-center text-lg font-semibold">Verify</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </>
          )}
      />

      {errors[name] && (
        <Text className="text-red-500 text-sm mt-1">{errors[name]?.message}</Text>
      )}
    </View>
    );
  }

  //  Main 
  return (

    <View className='bg-white w-full h-full px-8 py-4'>
      {/* <TouchableOpacity
        onPress={() => router.back()}
        className="mb-4"
      >
        <Ionicons name="arrow-back" size={24} color="#374151" />
      </TouchableOpacity> */}
      <Text
        className='capitalize text-5xl font-semibold px-30 pt-4'
      >Hello! Register to get started</Text>
      <Text className='text-1xl mt-2 text-gray-900'>
        Easy, 2 minute registration
      </Text>

      <ScrollView className='mt-4'>

        {renderFormField('outletId', 'Enter Outlet ID', 'Outlet ID', 'numeric')}
        {renderFormField('outletName', 'Enter Outlet Name', 'Outlet Name', 'default')}
        {renderFormField('csmName', 'Enter CSM Name', 'CSM Name', 'default')}
        {renderFormDropdown('profileType', 'Profile Type', 'Select Profile Type', ['Retailer', 'Distributor', 'Wholesaler'])}
        {renderFormField('mobileNumber', 'Enter Mobile Number', 'Mobile Number', 'numeric')}
        {renderFormField('pinCode', 'Enter Pin Code', 'Pin Code', 'numeric')}
        {renderFormField('address', 'Enter Address', 'Address', 'default')}
        {/* {renderFormField('state', 'Enter State', 'State', 'default')} */}
        {renderFormDropdown('state', 'State', 'Select State', states.map(s => s.label))}
        {renderFormDropdown('city', 'City', 'Select City', getCitiesByState(control._formValues.state.toLowerCase()).map(s => s.label))}
        {/* {renderFormField('pannumber', 'Enter PAN Number', 'PAN Number', 'default')} */}
        {renderFormDataWithVerifyModal('pannumber', 'Enter PAN Number', 'PAN Number')}
        {/* {renderFormDatePicker('dateOfBirth', 'Enter Date of Birth', 'Select Date of Birth')} */}
        {renderFormDatePicker('dateOfBirth', 'Enter Date of Birth', 'Date of Birth')}
        {renderFormImagePicker('profileImage', 'Capture Profile Picture', 'Profile Picture')}
      
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className={`bg-red-500 rounded-md py-4 mt-2 mb-10 ${isSubmitting ? 'opacity-50' : 'opacity-100'}`}
        >
          <Text className='text-white text-center text-2xl font-semibold'>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </ScrollView>


    </View>
  )
}

export default Enrollment

