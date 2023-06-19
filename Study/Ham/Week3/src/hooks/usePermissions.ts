import {useCallback} from 'react';
import {Platform, Rationale} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  PermissionStatus,
} from 'react-native-permissions';

interface Permission {
  checkPermission: () => Promise<PermissionStatus | null>;
  requestPermission: () => Promise<PermissionStatus | null>;
}

// Android
export const useAndroidPermissions = (
  requestRationale: Rationale,
): Permission => {
  const checkPermission = async () => {
    try {
      const fineLocationStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      );
      return fineLocationStatus;
    } catch (error) {
      console.error('Android: checkPermission error', error);
      return null;
    }
  };

  const requestPermission = useCallback(async () => {
    try {
      const permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        requestRationale,
      );
      return permissionStatus;
    } catch (error) {
      console.error('Android: requestPermission error', error);
      return null;
    }
  }, [requestRationale]);

  return {
    checkPermission: checkPermission,
    requestPermission: requestPermission,
  };
};

// iOS
export const useIosPermissions = (requestRationale: Rationale): Permission => {
  const checkPermission = async () => {
    try {
      const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return status;
    } catch (error) {
      console.error('iOS: checkPermission error', error);
      return null;
    }
  };

  const requestPermission = useCallback(async () => {
    try {
      const status = await request(
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        requestRationale,
      );
      return status;
    } catch (error) {
      console.error('iOS: requestPermission error', error);
      return null;
    }
  }, [requestRationale]);

  return {
    checkPermission: checkPermission,
    requestPermission: requestPermission,
  };
};

export const usePermissions = Platform.select({
  android: useAndroidPermissions,
  ios: useIosPermissions,
  default: useAndroidPermissions,
});
