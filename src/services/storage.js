import { Preferences } from '@capacitor/preferences';

export function useStorage() {

  let set = async (key, value) => {
    await Preferences.set({
      key: key,
      value: JSON.stringify(value),
    })

    return true;
  }
  
  let get = async (key) => {
    let stored = await Preferences.get({
      key: key,
    })

    return stored.value ? JSON.parse(stored.value) : false;
  }

  return {
    set,
    get
  }
}