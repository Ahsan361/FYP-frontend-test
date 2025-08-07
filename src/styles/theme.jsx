import { createTheme } from '@mui/material/styles';

// Professional color palette for cultural heritage
const colors = {
  primary: {
    main: '#1B4332',
    lightmain: "#616161",// Deep forest green - represents heritage and tradition
    light: '#2D5A3D',
    dark: '#0F2920',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#B8860B', // Antique gold - represents artifacts and precious items
    light: '#D4AF37',
    dark: '#8B6914',
    contrastText: '#FFFFFF'
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  }
};

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: colors.primary,
    lightmain: colors.primary.lightmain,
    secondary: colors.secondary,
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF'
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[700]
    },
    divider: colors.neutral[200]
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6
    }
  },
  shape: {
    borderRadius: 8
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 6
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
          borderRadius: 12
        }
      }
    }
  }
});

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4ADE80',
      lightmain: "#4ade808a", // Bright green - represents growth and renewal
      light: '#6EE7B7',
      dark: '#22C55E',
      contrastText: '#000000'
    },
    secondary: colors.secondary,
    background: {
      default: '#111827',
      paper: '#1F2937'
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB'
    },
    divider: '#374151'
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6
    }
  },
  shape: {
    borderRadius: 8
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 6
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          borderRadius: 12
        }
      }
    }
  }
});