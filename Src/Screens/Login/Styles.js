// src/Screens/Login/LoginStyles.js
import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "../../Utills/scaling";
import { colors } from "../../Utills/colors";
import { FontFamily, FontSize, Border } from "../../Utills/Global_Styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: moderateScale(30),
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    marginBottom: verticalScale(40),
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(FontSize.size_xl - 2),
    fontFamily: FontFamily.gilroyBold,
    color: colors.black,
    marginBottom: verticalScale(10),
    letterSpacing: moderateScale(0.8),
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: moderateScale(FontSize.size_sm + 2),
    fontFamily: FontFamily.gilroyMedium,
    color: colors.fontThirdColor,
    letterSpacing: moderateScale(0.3),
    textAlign: "center",
    lineHeight: verticalScale(22),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: Border.br_md,
    paddingHorizontal: moderateScale(20),
    marginBottom: verticalScale(20),
    borderWidth: 1,
    borderColor: colors.medHorizontalLine,
    height: verticalScale(40),
  },
  inputIcon: {
    marginRight: moderateScale(12),
    color: colors.fontThirdColor,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    color: colors.fontMainColor,
    fontSize: moderateScale(FontSize.size_sm),
    fontFamily: FontFamily.gilroyMedium,
    paddingVertical: 0,
  },
  button: {
    backgroundColor: colors.black,
    paddingVertical: verticalScale(10),
    borderRadius: Border.br_md,
    alignItems: "center",
    marginTop: verticalScale(10),
    shadowColor: colors.primaryGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    width: "100%",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: moderateScale(FontSize.size_md),
    fontFamily: FontFamily.gilroySemiBold,
    letterSpacing: moderateScale(0.5),
    fontWeight: "bold",
  },
  buttonIcon: {
    marginLeft: moderateScale(10),
    color: colors.white,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: verticalScale(25),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.medHorizontalLine,
  },
  dividerText: {
    fontSize: moderateScale(FontSize.size_xs),
    fontFamily: FontFamily.gilroyMedium,
    color: colors.fontThirdColor,
    marginHorizontal: moderateScale(10),
    fontWeight: "bold",
  },
  fingerprintButton: {
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  fingerprintCircle: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.medHorizontalLine,
    marginBottom: verticalScale(10),
  },
  fingerprintText: {
    color: colors.fontSecondColor,
    fontSize: moderateScale(FontSize.size_sm),
    fontFamily: FontFamily.gilroyMedium,
    fontWeight: "bold",
  },
});

export default styles;
