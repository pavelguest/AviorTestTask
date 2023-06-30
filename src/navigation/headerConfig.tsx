import React from 'react';

import { Text } from 'react-native';

import type { HeaderTitleProps } from './Navigation.types';

export const Title = ({ children }: HeaderTitleProps) => {
  return <Text numberOfLines={1}>{children}</Text>;
};

export const useHeaderConfig = () => {
  return {
    headerShown: true,
    headerBackVisible: false,
    headerBackTitleVisible: false,
    headerTitle: (props: HeaderTitleProps) => <Title {...props} />,
    headerTitleAlign: 'center' as const,
  };
};
