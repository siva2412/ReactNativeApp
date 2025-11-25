import { FlatList, StyleSheet, Text, View } from "react-native";

interface TableProps {
    header: string[];
    data: any[];
    serial?: false | boolean;
}


const Table = ({ header, data, serial = false }: TableProps) => {
    return (
        <View className="w-full bg-white/10 rounded-3xl mb-3 backdrop-blur-lg">

            {/* Table Header */}
            <View className="flex-row  bg-primary" style={styles.tableHeader}>

                {/* Serial Header */}
                {serial && (
                    <View className="w-12">
                        <Text className="text-white font-bold text-center text-xl">#</Text>
                    </View>
                )}

                {header.map((h: any, index: any) => (
                    <View key={index} className="flex-1" >
                        <Text className="text-white font-bold text-center text-xl">{h}</Text>
                    </View>
                ))}
            </View>

            {/* Table Body */}
            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => {
                    const cleanedItem = Object.fromEntries(
                        Object.entries(item).filter(([key])=> key !== 'id')
                    );

                    return (
                        <View className="flex-row items-center" style={styles.tableBody}>

                            {/* Serial Column */}
                            {serial && (
                                <View className="w-12" style={styles.tableBodyData}>
                                    <Text className="text-black text-center">{index + 1}</Text>
                                </View>
                            )}

                            {/* Data Columns */}
                            {Object.values(cleanedItem).map((value: any, colIndex: any) => (

                                serial && colIndex === 0 && value ? null : (
                                    <View
                                        key={colIndex}
                                            style={styles.tableBodyData}
                                        className="flex-1 "
                                    >
                                        <Text className="text-black text-center">{value}</Text>
                                    </View>
                                )
                            ))}
                        </View>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    tableHeader: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 8,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        backgroundColor:"#E53935",
        borderColor: '#e0e0e0',
    },
    
    tableBody: {
        flexDirection: 'row',
        // paddingTop: 6,
    },
    tableBodyData: {
        flex: 1,
        borderWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        paddingVertical: 8,
    },
})

export default Table;
