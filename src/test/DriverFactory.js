import webdriver from 'selenium-webdriver';

export default class DriverFactory {
    constructor(suiteName) {

        this.suiteName = suiteName;
        this.drivers = [];

        this.useSauceLabs = process.env.TEST_BROWSER === 'sauce';

        this.getDrivers();
    }

    getDrivers(){
        // Test Chrome by default
        this.getDriver('chrome');

        const testBrowsers = process.env.TEST_BROWSER;

        if (testBrowsers === 'sauce') {
            this.getDriver('firefox');
            this.getDriver('safari');
            this.getDriver('microsoftedge');
            this.getDriver('internet explorer');
        }

        if (testBrowsers === 'win') {
            this.getDriver('firefox');
            this.getDriver('microsoftedge');
            this.getDriver('internet explorer');
        }

        if (testBrowsers === 'mac') {
            this.getDriver('firefox');
            this.getDriver('safari');
        }
    }

    getDriver(driverName) {
        let builder = new webdriver.Builder().forBrowser(driverName);

        if (this.useSauceLabs) {
            builder = this.getSauceLabs(builder, driverName);
        }

        const driver = builder.build();

        driver.getSession().then(function(sessionid) {
            driver.sessionID = sessionid.id_;
        });
        // Sanitize Browser Names
        driver.driverName = driverName.charAt(0).toUpperCase() + driverName.slice(1);
        
        this.drivers.push(driver);
    }

    getSauceLabs(builder, driverName) {
        const username = process.env.SAUCE_USERNAME;
        const accessKey = process.env.SAUCE_ACCESS_KEY;
        const server = `http://${username}:${accessKey}@ondemand.saucelabs.com:80/wd/hub`;
        builder.withCapabilities({
            'browserName': driverName,
            'username': username,
            'accessKey': accessKey,
            'name': this.suiteName
        })
        .usingServer(server);
        return builder;
    }
}