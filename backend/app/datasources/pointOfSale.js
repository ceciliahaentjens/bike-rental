const DataLoader = require('dataloader');
const CoreSQLDataSource = require('./core/sql');

class PointOfSale extends CoreSQLDataSource {
    tableName = 'point_of_sale';
}
module.exports = PointOfSale;
