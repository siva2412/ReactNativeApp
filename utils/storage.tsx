import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = typeof value === "string" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data', e);
  }
}

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    try {
      return JSON.parse(value!);  // if it's JSON, returns object
    } catch {
      return value;               // if it's plain string, return string
    }
  } catch (e) {
    console.error('Error retrieving data', e);
  }
}

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key); 
    } catch (e) {
    console.error('Error removing data', e);
  }
}

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Error clearing data', e);
  }
}   
