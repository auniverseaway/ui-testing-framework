import GoogleTest from "./GoogleTest";
import LocalTest from "./LocalTest";

export default class TestRunner {
    constructor(server, driver) {
        this.init(server, driver);
    }

    init(server, driver) {
        describe('UI Tests', function() {
            this.timeout(0);

            // Add tests here
            new GoogleTest(driver);
            new LocalTest(driver);

            after(function(done) {
                driver.quit();
                server.close();
            });
        });
    }
}