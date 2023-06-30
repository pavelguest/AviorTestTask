import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import { ActivityIndicator, BackHandler, Platform, View } from 'react-native';
import WebView from 'react-native-webview';

import { TWebViewScreenProps } from './WebViewScreen.types';
import { styles } from './WebViewScreen.styles';
import { Touchable } from '../../components/Touchable';
import ChevronLeftIcon from '../../components/Icons/ChevronLeftIcon';
import CloseIcon from '../../components/Icons/CloseIcon';

const WebViewScreen: React.FC<TWebViewScreenProps> = ({
  navigation,
  route,
}) => {
  const webViewRef = useRef<WebView>(null);

  const [canGoBack, setCanGoBack] = useState(false);

  const url = route.params.url;

  const renderLoading = useCallback(
    () => (
      <ActivityIndicator
        size="large"
        style={styles.loading}
        color={styles.loading.color}
      />
    ),
    [styles.loading],
  );

  const onError = useCallback((e: any) => {
    console.warn(e);
  }, []);

  const handleGoBack = useCallback(() => {
    if (!canGoBack) {
      navigation.goBack();
      return true;
    }

    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  }, [canGoBack, navigation]);

  const handleNavigationGoBack = useCallback(
    () => navigation.goBack(),
    [navigation],
  );

  const renderHeaderLeft = useCallback(
    () => (
      <Touchable onPress={handleGoBack}>
        <ChevronLeftIcon color={styles.headerBackColor.color} />
      </Touchable>
    ),
    [handleGoBack, styles.headerBackColor.color],
  );

  const renderHeaderRight = useCallback(
    () => (
      <Touchable onPress={handleNavigationGoBack}>
        <CloseIcon color={styles.headerBackColor.color} />
      </Touchable>
    ),
    [handleNavigationGoBack, styles.headerBackColor.color],
  );

  useEffect(() => {
    if (url)
      navigation.setOptions({
        title: url?.match(/\/\/([a-z-_0-9.]+)\//i)?.[1],

        headerLeft: renderHeaderLeft,

        headerRight: renderHeaderRight,
      });
  }, [navigation, renderHeaderLeft, renderHeaderRight, url]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', handleGoBack);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
      };
    }
  }, [handleGoBack]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.webViewContainer}
        source={{ uri: url }}
        originWhitelist={['*']}
        cacheEnabled
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        startInLoadingState
        renderLoading={renderLoading}
        onError={onError}
        allowsBackForwardNavigationGestures
        onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
      />
    </View>
  );
};

export default memo(WebViewScreen);
