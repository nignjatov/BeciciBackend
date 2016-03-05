/**
 * Created by orahkokos on 12/12/15.
 */
var faker = require('faker');
var _ = require('lodash');

module.exports = function (number) {
    if (!number) {
        return generateUser();
    }

    var result = [];

    number = _.range(number);

    number.forEach(function () {
        result.push(generateUser())
    });

    function generateUser() {
        return {
            firstName: faker.name.firstName(),
            lastName:faker.name.lastName(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber()
        }
    }

    return result;
}
