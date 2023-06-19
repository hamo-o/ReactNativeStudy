import {View} from 'react-native';
import {usePermissions} from '../../hooks/usePermissions';

const Map = () => {
  usePermissions({
    title: '권한 요청',
    message: '위치정보 접근을 허용해주세요.',
    buttonPositive: '확인',
  });

  return <View></View>;
};

export default Map;
