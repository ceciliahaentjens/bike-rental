const DataLoader = require('dataloader');
const CoreSQLDataSource = require('./core/sql');

class Bike extends CoreSQLDataSource {
    tableName = 'bike';
}
module.exports = Bike;
