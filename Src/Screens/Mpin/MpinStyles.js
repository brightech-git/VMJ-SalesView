import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "../../Utills/scaling";
import {colors} from "../../Utills/colors";
import { FontFamily, FontSize } from "../../Utills/Global_Styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  // backgroundImage: {
  //   ...StyleSheet.absoluteFillObject,
  //   opacity: 0.07,
  //   zIndex: -1,
  // },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(30),
  },
  header: {
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: FontSize.H4,
    color: colors.black,
    fontFamily: FontFamily.bold,
    marginBottom: verticalScale(4),
    fontWeight:"bold",
  },
  subtitle: {
    fontSize: FontSize.small,
    color: colors.grey600,
    fontFamily: FontFamily.medium,
    textAlign: "center",
    paddingHorizontal: scale(10),
      fontWeight:"bold",
   
      },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    padding: scale(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
       marginBottom:150
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(15),
    backgroundColor: "#fafafa",
  },
  input: {
    flex: 1,
    marginLeft: scale(8),
    color: colors.black,
    fontSize: FontSize.medium,
    fontFamily: FontFamily.regular,
      // fontWeight:"bold",
  },
  digitCount: {
    marginLeft: scale(8),
      fontWeight:"bold",
  },
  digitCountText: {
    color: colors.grey500,
    fontSize: FontSize.small,
    fontFamily: FontFamily.medium,
      fontWeight:"bold",
  },
  button: {
    backgroundColor: colors.primaryGold,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(12),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(10),
  },
  buttonText: {
    color: colors.white,
    fontSize: FontSize.medium,
    fontFamily: FontFamily.bold,
      fontWeight:"bold",
  },
  alreadyHaveContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: verticalScale(16),
  },
  alreadyHaveText: {
    color: colors.grey600,
    fontSize: FontSize.small,
    fontFamily: FontFamily.medium,
  },
  loginLink: {
    color: colors.darkbutton1,
    fontSize: FontSize.small,
    fontFamily: FontFamily.medium,
    marginLeft: scale(4),
      fontWeight:"bold",
  },
});

export default styles;
