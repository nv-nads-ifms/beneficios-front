import { createTheme } from "@mui/material/styles";
import { ptBR } from '@mui/x-data-grid';
import { ptBR as corePtBR } from '@mui/material/locale';

const RpasTheme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: {
        light: '#455fd9',
        main: '#455fd9',
        dark: '#424347',
      },
      // Provide every color token (light, main, dark, and contrastText) when using
      // custom colors for props in Material UI's components.
      // Then you will be able to use it like this: `<Button color="custom">`
      // (For TypeScript, you need to add module augmentation for the `custom` value)
      custom: {
        light: '#45d9b5',
        main: '#45d9b5',
        dark: '#2c3447',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
    },
    components: {

      MuiDataGrid: {
        styleOverrides: {
          root: {
            fontFamily: "Nova Round"
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Nova Round"
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontFamily: "Nova Round"
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontFamily: "Nova Round"
          }
        }
      },
      MuiStepIcon: {
        styleOverrides: {
          text: {
            fontFamily: "Nova Round"
          }
        }
      },
      MuiStepLabel: {
        styleOverrides: {
          label: {
            fontFamily: "Nova Round"
          },
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            fontFamily: "Nova Round",
            borderRadius: "25px"
          },
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontFamily: "Nova Round",
            borderRadius: "25px"
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "Nova Round",
            borderRadius: "25px",
            padding: "15px 30px"
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: "Nova Round",
            borderRadius: "25px",
            padding: "15px 30px"
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontFamily: "Nova Round",
            borderRadius: "25px",
            padding: "15px 30px"
          }
        }
      },
    }
  },
  ptBR, // x-data-grid translations
  // pickersBgBG, // x-date-pickers translations
  corePtBR, // core translations
);

export { RpasTheme };