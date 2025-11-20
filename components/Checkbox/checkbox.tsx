import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function Checkbox({ checked, onChange, label }: any) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      className="flex-row items-center"
      disabled={checked}
    >
      <View
        className={`w-5 h-5 border rounded-[3px] flex items-center justify-center
        ${checked ? "bg-white border-gray-500" : "border-gray-500"}`}
      >
        {checked && <Ionicons name="checkmark" size={14} color="black" />}
      </View>

      <Text className="ml-2 text-gray-700">{label}</Text>
    </Pressable>
  );
}
