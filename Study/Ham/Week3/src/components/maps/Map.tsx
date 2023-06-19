import {useState} from 'react';
import {Text, View} from 'react-native';
import {usePermissions} from '../../hooks/usePermissions';
import Geolocation from '@react-native-community/geolocation';

const Map = () => {
  usePermissions({
    title: '권한 요청',
    message: '위치정보 접근을 허용해주세요.',
    buttonPositive: '확인',
  });

  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  Geolocation.getCurrentPosition(position => {
    const lati = JSON.stringify(position.coords.latitude);
    const long = JSON.stringify(position.coords.longitude);
    setLatitude(lati);
    setLongitude(long);
  });

  return (
    <View>
      <Text>{latitude}</Text>
      <Text>{longitude}</Text>
    </View>
  );
};

export default Map;
