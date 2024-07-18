import React from 'react';
import { ViewStyle } from 'react-native';
import {SvgXml} from 'react-native-svg';

interface SVGProps {
  image: string,
  width: number | string,
  height: number | string,
  style: ViewStyle
}

export default (props: SVGProps) => {
  return <SvgXml xml={props.image} width={props.width || 24} style={props.style} />;
};
