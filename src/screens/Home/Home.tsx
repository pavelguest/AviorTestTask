import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Home.styles';
import { getUniqueId } from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import { THomeProps } from './Home.types';

const Home: React.FC<THomeProps> = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [gaid, setGaid] = useState('');

  const getFirebaseToken = async () => {
    const tokenData = await messaging().getToken();
    const gaid = await getUniqueId();
    setToken(tokenData);
    setGaid(gaid);
  };

  const NAME = 'Pavel_Puchynski';

  const url = useMemo(
    () =>
      `https://pagbeting.space/QN9Kbb?gaid=${gaid}&token=${token}&name=${NAME}`,
    [gaid, token, NAME],
  );

  const handleOpenWebView = useCallback(async () => {
    navigation.navigate('WebViewScreen', { url: url });
  }, []);

  useEffect(() => {
    if (!token || !gaid) {
      getFirebaseToken();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="open"
        color={'#008080'}
        onPress={handleOpenWebView}
        disabled={!token || !gaid}
      />
    </SafeAreaView>
  );
};

export default memo(Home);
