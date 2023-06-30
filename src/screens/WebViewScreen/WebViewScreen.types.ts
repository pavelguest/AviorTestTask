import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParams } from '../../navigation/Navigation.types';

export type TWebViewScreenProps = NativeStackScreenProps<
  NavigationParams,
  'WebViewScreen'
>;
