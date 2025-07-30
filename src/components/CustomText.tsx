import React, { ReactNode } from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';
import appFonts from '../constants/appFonts';

type FontTypes = 'regular' | 'medium' | 'light' | 'bold';

interface CustomTextProps extends TextProps {
  font?: FontTypes;
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  className?: string;
}

const CustomText: React.FC<CustomTextProps> = ({
  font = 'regular',
  children,
  style,
  className = '',
  ...props
}) => {
  let fontFamily: string;

  switch (font) {
    case 'bold':
      fontFamily = appFonts.bold;
      break;
    case 'medium':
      fontFamily = appFonts.medium;
      break;
    case 'light':
      fontFamily = appFonts.light;
      break;
    case 'regular':
    default:
      fontFamily = appFonts.regular;
      break;
  }

  return (
    <Text
      style={[{ fontFamily }, style]}
      testID={className}
      className={` ${className} `}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;
