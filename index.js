import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import RootNavigation from './src/Navigation/RootNavigation';
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => RootNavigation);
