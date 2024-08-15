// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#121212',
        color: '#ffffff',
      },
    },
  },
  colors: {
    brand: {
      50: '#1db954', // Primary color
    },
  },
  components: {
    Button: {
      baseStyle: {
        bg: '#333333',
        _hover: {
          bg: '#1db954',
          color: '#121212',
        },
      },
    },
  },
});

export default theme;
