const DataLoader = require('dataloader');
const CoreSQLDataSource = require('./core/sql');

class KindOfBike extends CoreSQLDataSource {
    tableName = 'kind_of_bike';
}
module.exports = KindOfBike;
