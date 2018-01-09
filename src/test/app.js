import WebServer from '../../index';
import WebDriver from './WebDriver';
import TestRunner from './TestRunner';

// Setup WebServer
const webServer = new WebServer();

// Setup Driver
const webDriver = new WebDriver();

new TestRunner(webServer, webDriver.getDriver());