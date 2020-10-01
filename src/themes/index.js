import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const lightTheme = createMuiTheme({
  palette: {
    // primary: {
    //     light: '#3381ff',
    //     main: '#0C1B66',
    //     dark: '#111940'
    // },
    // secondary: {
    //   light: '#63ddac',
    //   main: '#3dd598',
    //   dark: '#2a956a'
    // },
    // success: {
    //   light: '#9bcf63',
    //   main: '#82c43c',
    //   dark: '#5b892a'
    // },
    // error: {
    //   light: '#fc7b7b',
    //   main: '#fc5a5a',
    //   dark: '#b03e3e'
    // },
    // warning: {
    //   light: '#ffab6e',
    //   main: '#ff974a',
    //   dark: '#b26933'
    // },
    // info: {
    //   light: '#73c3ff',
    //   main: '#50b5ff',
    //   dark: '#387eb2'
    // },
    almostBlack: {
      0: "#ffffff",
      100: "#fafafb",
      200: "#f1f1f5",
      300: "#e2e2ea",
      400: "#d5d5dc",
      500: "#b5b5be",
      600: "#92929d",
      700: "#696974",
      800: "#44444f",
      900: "#171725",
    },
    subText: {
      // main : '#6A6A66'
    },
    // background: {
    //   paper: '#fff',
    //   default: '#fafafb'
    // },
    // text: {
    //   primary: '#171725',
    //   secondary: '#92929d',
    //   disabled: '#e2e2ea',
    //   hint: '#e2e2ea'
    // }
  },
  // status: {
  //   danger: 'orange',
  // },
  typography: {
    fontFamily: ["Raleway", "sans-serif", "Montserrat", "Roboto"].join(","),
  },
});

export default {
  light: responsiveFontSizes(lightTheme),
};
