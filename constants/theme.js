import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#FF002E",
  blue: "#4096fe",
  gray: "#464646",
  gray1: "#363636",
  lightGray: "#dedede",
  transparentWhite: "rgba(255, 255, 255, 0.2)",
  transparentBlack: "rgba(0, 0, 0, 0.4)",
};

export const SIZES = {
  //global size
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  //font sizes

  lagreTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  width,
  height,
};

export const FONTS = {
  largeTtitle: { fontfamily: "Roboto-Black", fontSize: SIZES.lagreTitle },
  h1: { fontfamily: "Roboto-Black", fontSize: SIZES.h1 },
  h2: { fontfamily: "Roboto-Black", fontSize: SIZES.h1 },
  h3: { fontfamily: "Roboto-Black", fontSize: SIZES.h1 },
  h4: { fontfamily: "Roboto-Black", fontSize: SIZES.h1 },
  body1: { fontfamily: "Roboto-Regular", fontSize: SIZES.body1 },
  body2: { fontfamily: "Roboto-Regular", fontSize: SIZES.body2 },
  body3: { fontfamily: "Roboto-Regular", fontSize: SIZES.body3 },
  body4: { fontfamily: "Roboto-Regular", fontSize: SIZES.body4 },
  body5: { fontfamily: "Roboto-Regular", fontSize: SIZES.body5 },
};

const appTheme = { COLORS, SIZES, FONTS };
export default appTheme;
