import {Button} from '@rneui/themed';
import {View} from 'react-native';
import {colors} from '../../global/styles';

export function LoadingScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button type="clear" loading size="lg" color={colors.buttons} />
    </View>
  );
}
