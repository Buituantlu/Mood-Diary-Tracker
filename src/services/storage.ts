import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveObjectDataLocal(key: string, val: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(val));
  } catch (error) {
    console.error(error);
  }
}

async function getObjectDataLocal(key: string) {
  let value: any;
  try {
    const savedVal = await AsyncStorage.getItem(key);
    if (savedVal !== null) {
      value = JSON.parse(savedVal);
    }
  } catch (error) {
    console.error(error);
  }
  return value;
}

async function saveDataLocal(key: string, val: string) {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (error) {
    console.error(error);
  }
}

async function getDataLocal(key: string) {
  let value: string | null = null;
  try {
    value = await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(error);
  }
  return value == null ? '' : value;
}

async function clearDataLocal(key?: string) {
  if (key) {
    await AsyncStorage.removeItem(key);
  } else {
    await AsyncStorage.getAllKeys((err, keys) => {
      keys && AsyncStorage.multiRemove(keys, err => {});
    });
  }
}

export {
  saveObjectDataLocal,
  getObjectDataLocal,
  saveDataLocal,
  getDataLocal,
  clearDataLocal,
};
