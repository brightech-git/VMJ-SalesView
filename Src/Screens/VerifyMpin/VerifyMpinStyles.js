import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "../../Utills/scaling";
import {colors} from "../../Utills/colors";
import { FontFamily, FontSize } from "../../Utills/Global_Styles";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(82, 78, 78, 0.08)",
    justifyContent: "center",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(30),
  },

  // backgroundImage: {
  //   ...StyleSheet.absoluteFillObject,
  //   opacity: 0.07,
  //   zIndex: -1,
  // },

  title: {
    fontSize: FontSize.H4,
    fontFamily: FontFamily.bold,
    color: colors.black,
    textAlign: "center",
    marginBottom: verticalScale(24),
    fontWeight:"bold"
  },

  input: {
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: "#d4af37",
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(14),
    fontSize: FontSize.medium,
    fontFamily: FontFamily.regular,
    color: colors.black,
    backgroundColor: "#fdfdfd",
    marginBottom: verticalScale(10),
      fontWeight:"bold"
  },

  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: verticalScale(16),
  },

  linkText: {
    fontSize: FontSize.small,
    color: colors.darkbutton1,
    fontFamily: FontFamily.medium,
      fontWeight:"bold"
  },

  button: {
    backgroundColor: colors.primaryGold,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(20),
  },

  buttonLoading: {
    opacity: 0.5,
  },

  buttonText: {
    fontSize: FontSize.medium,
    color:"#fff",
    fontFamily: FontFamily.bold,
      fontWeight:"bold"
  },

  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: verticalScale(12),
  },

  linkText1: {
    fontSize: FontSize.small,
    color: colors.grey600,
    fontFamily: FontFamily.medium,
      fontWeight:"bold"
  },

  linkText2: {
    fontSize: FontSize.small,
    color: colors.darkbutton1,
    marginLeft: scale(4),
    fontFamily: FontFamily.bold,
      fontWeight:"bold"
  },
});

export default styles;
