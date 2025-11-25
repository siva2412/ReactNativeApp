import Dropdown from '@/components/Dropdown/Dropdown'
import LoaderService from '@/components/loader/LoaderService'
import Table from '@/components/table/Table'
import { Ionicons } from '@expo/vector-icons'
import { goBack } from 'expo-router/build/global-state/routing'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

const Targetandachivementdetails = () => {


    const months = Array.from({ length: 12 }, (_, i) =>
        new Date(0, i).toLocaleString("default", { month: "long" })
    );
    // console.log("Months:", months);
    const [filtermodalvisible, setfiltermodalvisible] = useState(false);
    const [selectedmonth, setselectedmonth] = useState(months[new Date().getMonth()]);

    const radius = 30;
    const strokeWidth = 7;
    const circumference = 2 * Math.PI * radius;

    // State for dynamic data based on selected month
    const [tableData, setTableData] = useState([
        { id: 1, target: '100', achieved: '63', brand: "Budwiser" },
        { id: 2, target: '150', achieved: '120', brand: "Magnum" },
        { id: 3, target: '200', achieved: '180', brand: "Corona" },
        { id: 4, target: '300', achieved: '380', brand: "Hoegaarden" }
    ]);
    const [totalTarget, setTotalTarget] = useState(100);
    const [percentage, setPercentage] = useState(63);

    const progress = circumference - (circumference * percentage) / 100;

    useEffect(() => {
        LoaderService.show("Fetching Data...")

        setTimeout(() => {
            LoaderService.hide();
            // console.log("Selected Month changed:", selectedmonth);
            // Fetch data for the selected month
            fetchDataForMonth(selectedmonth);
        }, 500);
    }, [selectedmonth]);

    const fetchDataForMonth = (month: string) => {
        // TODO: Replace this with actual API call to fetch data for the selected month
        console.log("Fetching data for month:", month);
        
        // Mock data - replace with actual API call
        // Example: Different data based on month
        const mockData = {
            'January': { total: 120, percentage: 75, data: [
                { id: 1, target: '120', achieved: '90', brand: "Budwiser" },
                { id: 2, target: '160', achieved: '140', brand: "Magnum" }
            ]},
            'February': { total: 150, percentage: 80, data: [
                { id: 1, target: '150', achieved: '120', brand: "Budwiser" },
                { id: 2, target: '180', achieved: '150', brand: "Magnum" }
            ]},
            // Default for current implementation
            'default': { total: 100, percentage: 63, data: [
                { id: 1, target: '100', achieved: '63', brand: "Budwiser" },
                { id: 2, target: '150', achieved: '120', brand: "Magnum" },
                { id: 3, target: '200', achieved: '180', brand: "Corona" },
                { id: 4, target: '300', achieved: '380', brand: "Hoegaarden" }
            ]}
        };

        const monthData = mockData[month as keyof typeof mockData] || mockData.default;
        setTotalTarget(monthData.total);
        setPercentage(monthData.percentage);
        setTableData(monthData.data);
    };

    const handleMonthChange = (month: string) => {
        console.log("Month selected:", month);
        setselectedmonth(month);
    }

    return (
        <View className='bg-white flex-1'>
            <View className='flex-row w-full bg-primary'>
                <Ionicons name="arrow-back-outline" size={30} color="white" className='m-4' onPress={() => { goBack() }} />
                <Text className='text-white text-xl  mt-5'>Targets & Acheivements</Text>
           
            </View>

            <View
                className='h-[25%] bg-primary'
            >

                <View className='mt-4'>
                    <View className='px-4 py-2 items-end'>
                        <Dropdown
                            label="Month"
                            placeholder="Select a Month"
                            value={selectedmonth}
                            options={months}
                            onChange={handleMonthChange}
                        />
                    </View>

                    {/* <TouchableOpacity
                         className='absolute top-4 right-4 bg-white/20 rounded-3xl px-4 py-2 flex-row items-center'
                        className='items-end rounded-3xl px-4 py-2  '
                        onPress={() => setfiltermodalvisible(true)}
                    > */}
                        {/* <View className='px-4 py-2'>
                            <Dropdown
                                label="Month"
                                placeholder="Select a Month"
                                value={selectedmonth}
                                options={months}
                                onChange={handleMonthChange}
                            />
                        </View> */}
                    {/* </TouchableOpacity> */}
                </View>

                <View className='px-4 mt-2 flex-row justify-evenly'>
                    <View className='flex-col justify-between items-center  '>
                        <Text className='text-6xl font-semibold text-white pt-2'>
                            {totalTarget}
                        </Text>

                        <Text className='ml-2 text-white text-xl'>
                            Total Target
                        </Text>
                    </View>
                    <View className='flex-col justify-between items-center border-r-2 border-white/30'>
                    </View>
                    <View className='flex-col '>
                        <View style={{ width: 60, height: 70, }} className='mb-2'>
                            <Svg width={80} height={80} className='bg-white'>
                                {/* Background Circle */}
                                <Circle
                                    cx="40"
                                    cy="40"
                                    r={radius}
                                    stroke="#ffffff30"
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                />
                                {/* Progress Circle */}
                                <Circle
                                    cx="40"
                                    cy="40"
                                    r={radius}
                                    stroke="#F8CA42"
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                    strokeDashoffset={progress}
                                    strokeDasharray={circumference}
                                    strokeLinecap="round"
                                    rotation="-90"
                                    origin="40,40"
                                />
                            </Svg>
                            <Text
                                className='text-white text-center  font-bold text-xl'
                                style={{ position: 'absolute', top: 27, left: 25, right: 0 }}
                            >
                                {percentage}%
                            </Text>

                        </View>

                        <Text className='ml-2 text-white text-xl '>
                            Achieved
                        </Text>
                    </View>
                </View>

            </View>

            {/* Table Section */}
            <View className=''>
                <Table header={['Brand', 'Target', 'Achieved']}
                    data={tableData}
                ></Table>
            </View>

            {/* <Modal
  visible={filtermodalvisible}
  transparent
  animationType="slide"
>
  <View className="flex-1 justify-center items-center bg-black/60 px-6">
    
    <View className="w-full">
      <Dropdown
        label="Month"
        placeholder="Select a Month"
        options={months}
        onChange={handleMonthChange}
      />
    </View>

  </View>
</Modal> */}


        </View>
    )
}

export default Targetandachivementdetails