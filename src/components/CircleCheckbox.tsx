import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

interface CircleCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  size?: number; // diameter
  color?: string; // Tailwind text/bg color (e.g., "blue-500")
  className?: string; // for additional styling
}

const CircleCheckbox: React.FC<CircleCheckboxProps> = ({
  checked,
  onToggle,
  size = 24,
  color = 'blue-500',
  className = '',
}) => {
  const circleStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
      <View
        className={` ${className} border-2 border-${color} items-center justify-center `}
        style={circleStyle}
      >
        {checked && (
          <View
            className={`bg-black`}
            style={{
              width: size * 0.55,
              height: size * 0.55,
              borderRadius: (size * 0.55) / 2,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CircleCheckbox;
