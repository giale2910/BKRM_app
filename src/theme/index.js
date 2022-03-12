import React from "react";
import { NativeBaseProvider, extendTheme, themeTools } from "native-base";
import { useDispatch, useSelector } from "react-redux";

const theme = () => {
  const customization = useSelector((state) => state.customize);

  return extendTheme({
    components: {
      Container: {
        baseStyle: (props) => {
          return {
            bg: themeTools.mode("white", "black")(props),
          };
        },
      },
      Heading: {
        baseStyle: (props) => {
          return {
            color: themeTools.mode("black", "white")(props),
          };
        },
      },
      Text: {
        baseStyle: (props) => {
          return {
            color: themeTools.mode("black", "white")(props),
          };
        },
      },
    },
    colors: {
      // Add new color
      primary: {},
      // Redefinig only one shade, rest of the color will remain same.
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "light",
    },
    customization: customization,
  });
};

export default theme;

// // colors: {
// //   // Add new color
// //   primary: {
// //     50: '#E3F2F9',
// //     100: '#C5E4F3',
// //     200: '#A2D4EC',
// //     300: '#7AC1E4',
// //     400: '#47A9DA',
// //     500: '#0088CC',
// //     600: '#007AB8',
// //     700: '#006BA1',
// //     800: '#005885',
// //     900: '#003F5E',
// //   },
// //   // Redefinig only one shade, rest of the color will remain same.
// //   amber: {
// //     400: '#d97706',
// //   },
// // },
// // config: {
// //   // Changing initialColorMode to 'dark'
// //   initialColorMode: 'dark',
// // },
// // components: {
// //   Heading: {
// //     // Can pass also function, giving you access theming tools
// //     baseStyle: ({ colorMode }) => {
// //       return {
// //         color: colorMode === 'dark' ? 'red' : 'black',
// //         fontWeight: 'normal',
// //       };
// //     },
// //   },
// //   Box: {
// //     baseStyle: ({ colorMode }) => {
// //       return {
// //         color: colorMode === 'dark' ? 'black' : 'white',
// //         fontWeight: 'normal',
// //       };
// //     },
// //   },
// // },
// colors: {
//   // color: customization.themeText,
//   // backgroundColor: customization.themeBackground,
//   // darkTextPrimary: customization.themeGreyText,
// },
// fontSizes: {
//   fonts: {
//     heading: undefined,
//     body: undefined,
//     mono: undefined,
//   }
// },
// fonts: {},
// config: {
//   initialColorMode: 'dark',
// },
// // customization: customization,
