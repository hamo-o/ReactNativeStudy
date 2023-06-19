import React, {useState} from 'react';
import {View} from 'react-native';
import {usePermissions} from '../../hooks/usePermissions';
import Geolocation from '@react-native-community/geolocation';
import NaverMapView, {Marker} from 'react-native-nmap';

const Map = () => {
  usePermissions({
    title: '권한 요청',
    message: '위치정보 접근을 허용해주세요.',
    buttonPositive: '확인',
  });

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  Geolocation.getCurrentPosition(position => {
    const lati = JSON.stringify(position.coords.latitude);
    const long = JSON.stringify(position.coords.longitude);
    setLatitude(Number(lati));
    setLongitude(Number(long));
  });

  return (
    <View style={{flex: 1}}>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={true}
        center={{latitude: latitude, longitude: longitude, zoom: 15}}
      />
      <Marker coordinate={{latitude: latitude, longitude: longitude}} />
    </View>
  );
};

export default Map;
