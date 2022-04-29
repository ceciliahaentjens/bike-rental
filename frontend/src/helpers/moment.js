const moment = require('moment');

function getTomorrow() {
    const tomorrow = moment().add(1,'days');
    return tomorrow;
}

function getReadableDate(date) {
    return moment(date).format('DD/MM/YYYY à HH:mm');
}

module.exports = {
    getTomorrow,
    getReadableDate
}