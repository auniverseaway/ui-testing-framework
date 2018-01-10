import chai from 'chai';

export default class LocalTest {
    constructor(driver) {
        // Setup Assertion Library
        const assert = chai.assert;
        const should = chai.should();

        describe('Local Test', function() {
            // Ensure Local Opens
            it('Open Local', function() {
                return driver.get('http://localhost:3000');
            });

            // Make sure the title is 'Google'
            it('Get Title', function() {
                return driver.getTitle().then(function(title) {
                    assert.equal('React DOM Components Test', title);
                });
            });
        });
    }
}
