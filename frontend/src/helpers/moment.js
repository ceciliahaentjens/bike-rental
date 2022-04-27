const moment = require('moment');

function getTomorrow() {
    const tomorrow = moment().add(1,'days');
    return tomorrow.toDate();
}

module.exports = {
    getTomorrow,
}