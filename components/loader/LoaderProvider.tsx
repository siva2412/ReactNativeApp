import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import LoaderService from "./LoaderService";

export function AppLoaderProvider({ children }: any) {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState({ title: "", message: "" });

  const showLoader = (opts: any = {}) => {
    setOptions(opts);
    setVisible(true);
  };

  const hideLoader = () => setVisible(false);

  // Register here (GLOBAL)
  // LoaderService.register(showLoader, hideLoader);

  useEffect(() => {
        LoaderService.register(showLoader, hideLoader);
    }, []);

  return (
    <>
      {children}

      {visible && (
        <View className="absolute inset-0 justify-center items-center bg-black/40 z-[9999]">
          <View className="bg-white p-6 rounded-2xl items-center">
            <ActivityIndicator size="large" color="#DC2626" />
            {options.title ? (
              <Text className="text-xl font-bold mt-3">{options.title}</Text>
            ) : null}
            {options.message ? (
              <Text className="text-gray-600 mt-1 text-center">{options.message}</Text>
            ) : null}
          </View>
        </View>
      )}
    </>
  );
}
