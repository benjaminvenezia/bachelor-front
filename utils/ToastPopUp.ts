import Toast from "react-native-toast-message";

const ToastPopUp = (message: string, type: string = "success") => {
  Toast.show({
    type,
    text1: message,
    position: "bottom",
    bottomOffset: 120,
  });
};

export default ToastPopUp;
