/**
 * @format
 */
//C:\proj309\CapstoneV2Mobile\index.js

import { AppRegistry } from 'react-native';
import App from './pages/src/App'; // 确认路径无误
import { name as appName } from './app.json'; // 确认 appName 的来源正确

AppRegistry.registerComponent('main', () => App);
