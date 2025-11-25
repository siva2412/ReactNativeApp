import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

interface DropdownProps {
    label: string;
    placeholder: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    labelVisible?: boolean;
}

const Dropdown = ({ label, placeholder, options, value, onChange, disabled = false, labelVisible = false }: DropdownProps) => {
    
    const [visible, setVisible] = useState(false);
    const [filtered, setFiltered] = useState(options);

    console.log("Dropdown render - value:", value, "placeholder:", placeholder);

    const handleSearch = (text: string) => {
        const result = options.filter((item: string) =>
            item.toLowerCase().includes(text.toLowerCase())
        );
        setFiltered(result);
    };

    return (
        <View className="mb-4" style={{ minWidth: 150 }}>
            {labelVisible && (
                <Text className="absolute -top-1 left-5 px-1 bg-gray-200/80 font-semibold text-gray-700 text-base">
                    {label}
                </Text>
            )}

            {/* Input Box */}
            <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                    setVisible(true);
                    setFiltered(options);
                }}
            >
                <View className="rounded-xl px-4 py-2 mt-2 flex-row items-center bg-gray-100/20" style={{ minWidth: 150 }}>
                    <Text className="text-white text-base flex-1" numberOfLines={1}>
                        {value || placeholder}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="white" style={{ marginLeft: 8 }} />
                </View>
            </TouchableOpacity>

            {/* Modal */}
            <Modal visible={visible} transparent animationType="slide">
                <View className="flex-1 justify-center items-center bg-black/70 px-6">
                    <View className="bg-white/90 w-full rounded-3xl p-5 max-h-[70%]">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-semibold text-gray-900">{label}</Text>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Ionicons name="close" size={24} color="#374151" />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            placeholder="Search..."
                            className="border border-gray-300 rounded-md px-4 py-2 mb-4"
                            onChangeText={handleSearch}
                        />

                        <ScrollView>
                            {filtered.length === 0 && (
                                <Text className="text-gray-700 text-base">No options found</Text>
                            )}

                            {filtered.map((item:any) => (
                                <TouchableOpacity
                                    key={item}
                                    className="p-4 border-b border-gray-200"
                                    onPress={() => {
                                        onChange(item);
                                        setVisible(false);
                                    }}
                                >
                                    <Text className="text-gray-900 text-base">{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Dropdown;
