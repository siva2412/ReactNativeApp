import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

interface BrandCardProps {
  logo: ImageSourcePropType;
  cases: number;
  percentage: number;
  gradientColors: string[];
  ringColor: string;
}

const BrandCard: React.FC<BrandCardProps> = ({
  logo,
  cases,
  percentage,
  gradientColors,
  ringColor,
}) => {
  const radius = 35;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (circumference * percentage) / 100;

  return (
    <View className="flex-row items-center bg-white/10 rounded-3xl p-2 mb-3 backdrop-blur-lg w-[95%]">
      {/* Circular Progress with Logo */}
      <View style={{ width: 60, height: 80 }} className="">
        <Svg width={80} height={80} className=''> 
          <Defs>
            <LinearGradient id={`grad-${cases}-${logo}`} x1="1" y1="0" x2="2" y2="0">
              <Stop offset="0%" stopColor={gradientColors[0]} />
              <Stop offset="100%" stopColor={gradientColors[1]} />
            </LinearGradient>
          </Defs>

          {/* Background Circle */}
          <Circle
            cx="37"
            cy="40"
            r={radius}
            stroke="#ffffff30"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Progress Circle */}
          <Circle
            cx="40"
            cy="37"
            r={radius}
            stroke={`url(#grad-${cases}-${logo})`}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            rotation="-90"
            origin="40,40"
          />
        </Svg>

        {/* Logo in Center */}
        <View
          style={{
            position: 'absolute',
            top: 15,
            left: 12,
            width: 50,
            height: 50,
            backgroundColor: 'white',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            // shadowColor: ringColor,
            // shadowOffset: { width: 0, height: 4 },
            // shadowOpacity: 0.5,
            // shadowRadius: 8,
          }}
        >
          <Image source={logo} style={{ width: 45, height: 45 }} resizeMode="contain" />
        </View>
      </View>

      {/* Text Content */}
      <View className="flex-1 pl-5">
        <Text className="text-white text-xl font-bold">{cases} Cases</Text>
        <Text className="text-white/80 text-base mt-1">{percentage}% Achieved</Text>
      </View>
    </View>
  );
};

export default BrandCard;
