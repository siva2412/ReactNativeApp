import "react-native";

declare module "react-native" {
  interface TextProps {
    style?: any;
  }

  interface Text {
    defaultProps?: {
      style?: any;
    };
  }

  interface TextInput {
    defaultProps?: {
      style?: any;
    };
  }
}
