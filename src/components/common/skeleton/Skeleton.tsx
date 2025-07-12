import React from 'react';
import { ViewStyle, StyleProp, DimensionValue } from 'react-native';
import { SkeletonBox } from './styled';

type SkeletonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  style?: StyleProp<ViewStyle>;
};

export default function Skeleton(props: SkeletonProps) {
  const { width = '100%', height = 20, style } = props;
  
  return <SkeletonBox style={[{ width, height }, style]} />;
}