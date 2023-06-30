import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Home.styles';
import { getUniqueId } from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import { THomeProps } from './Home.types';

const NAME = 'Pavel_Puchynski';

const getUrl = (gaid: string, token: string, name: string) =>
  `https://pagbeting.space/QN9Kbb?gaid=${gaid}&token=${token}&name=${name}`;

const Home: React.FC<THomeProps> = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [gaid, setGaid] = useState('');

  const getFirebaseToken = async () => {
    const tokenData = await messaging().getToken();
    const gaid = await getUniqueId();
    setToken(tokenData);
    setGaid(gaid);
  };

  const handleOpenWebView = useCallback(() => {
    navigation.navigate('WebViewScreen', { url: getUrl(gaid, token, NAME) });
  }, [gaid, token, NAME, navigation]);

  useEffect(() => {
    if (!token || !gaid) {
      getFirebaseToken();
    }
  }, [token, gaid]);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="open"
        color={'#669933'}
        onPress={handleOpenWebView}
        disabled={!token || !gaid}
      />
    </SafeAreaView>
  );
};

export default memo(Home);
