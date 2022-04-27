const DataLoader = require('dataloader');
const CoreSQLDataSource = require('./core/sql');

class Bike extends CoreSQLDataSource {
    tableName = 'bike';

    async search(searchTerm) {
        // Le cache est tributaire du cache des headers de la réponse à la requête HTTP
        // ici
        // cache-control: max-age=3600
        const query = this.knex(this.tableName)
            .connection(this.establishedConnection)
            .select('*')
            .where('status', 'AVAILABLE')
            .andWhereILike('number', `%${searchTerm}%`)
            .limit(15);

        const result = await query;

        return result;
    }
}
module.exports = Bike;
