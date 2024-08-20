// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#00000', // Dark navy
        color: '#ffffff', // White text
      },
    },
  },
  colors: {
    brand: {
      50: '#46006e', // Soft orange accent color
      100: '#3282b8', // Light navy
      200: '#1e5f74', // Teal blue
    },
  },
  components: {
    Button: {
      baseStyle: {
        bg: '#3282b8',
        _hover: {
          bg: '#46006e',
          color: '#ffffff',
        },
      },
    },
  },
});

export default theme;
