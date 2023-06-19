import {Platform, Rationale} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// Android
export const useAndroidPermissions = async (
  requestRationale: Rationale,
): Promise<Boolean> => {
  const checkPermission = async () => {
    try {
      const fineLocationStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      return fineLocationStatus;
    } catch (error) {
      console.error('Android: checkPermission error', error);
      return null;
    }
  };

  const requestPermission = async () => {
    try {
      const permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        requestRationale,
      );
      return permissionStatus;
    } catch (error) {
      console.error('Android: requestPermission error', error);
      return null;
    }
  };

  const checked = await checkPermission();
  let result = false;
  switch (checked) {
    case RESULTS.DENIED:
      const requested = await requestPermission();
      if (requested === RESULTS.GRANTED) {
        result = true;
      }
      break;
    default:
      result = false;
  }
  return result;
};

// iOS
export const useIosPermissions = async (
  requestRationale: Rationale,
): Promise<Boolean> => {
  const checkPermission = async () => {
    try {
      const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return status;
    } catch (error) {
      console.error('iOS: checkPermission error', error);
      return null;
    }
  };

  const requestPermission = async () => {
    try {
      const status = await request(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        requestRationale,
      );
      return status;
    } catch (error) {
      console.error('iOS: requestPermission error', error);
      return null;
    }
  };

  const checked = await checkPermission();
  let result = false;
  switch (checked) {
    case RESULTS.DENIED:
      const requested = await requestPermission();
      if (requested === RESULTS.GRANTED) {
        result = true;
      }
      break;
    default:
      result = false;
  }
  return result;
};

export const usePermissions = Platform.select({
  android: useAndroidPermissions,
  ios: useIosPermissions,
  default: useAndroidPermissions,
});
