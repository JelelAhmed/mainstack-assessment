// CHANGED: added modular brand colors and 100px button radius for consistency
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Inter', 'Degular', -apple-system, 'Segoe UI', Roboto, sans-serif`,
    body: `'Inter', 'Degular', -apple-system, 'Segoe UI', Roboto, sans-serif`,
  },
  colors: {
    brand: {
      orange: "#FF5403",
      green: "#0EA163",
      red: "#961100",
      lightGray: "#EFF1F6",
      midGray: "#DBDEE6",
      textPrimary: "#131316",
      textSecondary: "#56616B",
      white: "#FFFFFF",
      bg: "#FFFFFF",
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.bg",
        color: "brand.textPrimary",
        fontSize: "14px",
        lineHeight: "1.4",
        WebkitFontSmoothing: "antialiased",
      },
      "*": {
        boxSizing: "border-box",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "100px",
        _focus: { boxShadow: "none" },
      },
    },
    Avatar: {
      baseStyle: {
        borderRadius: "100px",
      },
    },
  },
});

export default theme;
