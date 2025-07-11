import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle, StyleProp, DimensionValue } from 'react-native';

type SkeletonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  style?: StyleProp<ViewStyle>;
};

const SkeletonBox = styled.View`
  background-color: #e1e9ee;
  border-radius: 4px;
  margin-vertical: 4px;
`;

export default function Skeleton(props: SkeletonProps) {
  const { width = '100%', height = 20, style } = props;
  
  return <SkeletonBox style={[{ width, height }, style]} />;
}