import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function AlertModal({
  visible,
  title,
  message,
  buttons = []
}: any) {

  const isTwoButtons = buttons.length === 2;
  const isThreeOrMore = buttons.length >= 3;

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-6 w-4/5 shadow-lg">

          {title && (
            <Text className="text-2xl font-bold mb-3 text-center">
              {title}
            </Text>
          )}

          {message && !title &&  (
            <Text className="text-xl text-center font-bold mb-6">
              {message}
            </Text>
          )}
          {message && title && (
            <Text className="text-base text-center text-gray-800 mb-6">
              {message}
            </Text>
          )}

          {/* Button Layout Handler */}
          <View
            className={
              isTwoButtons
                ? "flex-row justify-between  gap-3"
                : isThreeOrMore
                ? "flex-row space-x-3 flex-wrap justify-center gap-3"
                : "flex-col items-center space-y-3"
            }
          >
            {buttons.map((button: any, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={button.onPress}
                className={`py-3 rounded-xl w-[48%] ${
                  button.style || "bg-blue-600"
                }`}
              >
                <Text className="text-center text-white font-semibold">
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </View>
    </Modal>
  );
}
