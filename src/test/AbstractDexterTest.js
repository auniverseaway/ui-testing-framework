import webdriver from 'selenium-webdriver';

export default class UIDriver {
    constructor() {
        this.username = process.env.SAUCE_USERNAME;
        this.accessKey = process.env.SAUCE_ACCESS_KEY;
        this.server = `http://${this.username}:${this.accessKey}@ondemand.saucelabs.com:80/wd/hub`;
    }

    getDriver() {
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .withCapabilities({
                'browserName': 'chrome',
                'username': this.username,
                'accessKey': this.accessKey,
                'name': 'UI Tests'
            })
            .build();

        driver.getSession().then(function(sessionid) {
            driver.sessionID = sessionid.id_;
        });
        return driver;
    }
}

// usingServer(this.server)