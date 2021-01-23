import { ToastAndroid } from 'react-native'
export default function showToast(message) {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
}