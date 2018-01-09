import WebServer from '../../index';
import GoogleTest from './GoogleTest';
import UIDriver from './AbstractDexterTest';

// Setup WebServer
const webServer = new WebServer();

// Setup Driver
const uiDriver = new UIDriver();

// Run Tests
new GoogleTest(uiDriver.getDriver());

webServer.close();