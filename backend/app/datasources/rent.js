const DataLoader = require('dataloader');
const CoreSQLDataSource = require('./core/sql');

const SECONDS = 10;

class Rent extends CoreSQLDataSource {
    tableName = 'rent';

    async findByBike(bikeId, { asc }) {
        if (process.env.DATALOADER_ENABLED) {
            return this.bikeIdLoader.load({ bikeId, asc });
        }
        const query = this.knex(this.tableName)
            .connection(this.establishedConnection)
            .select('*')
            .where('bike_id', bikeId);

        const result = await ((process.env.CACHE_ENABLED) ? query.cache(SECONDS) : query);
        return result;
    }

    async findByBikeBulk(bikeIds, asc) {
        const query = this.knex(this.tableName)
            .connection(this.establishedConnection)
            .select('*')
            .whereIn('bike_id', bikeIds)
            .orderBy('created_at', asc ? 'asc' : 'desc');

        const result = await ((process.env.CACHE_ENABLED) ? query.cache(SECONDS) : query);
        return result;
    }

    bikeIdLoader = new DataLoader(async (keys) => {
        const intIds = keys.map((k) => parseInt(k.bikeId, 10));
        const records = await this.findByBikeBulk(intIds, keys[0].asc);

        /*
        Attention ici on ne doit pas utilisé un find, mais un filter,
        car il peut y avoir plusieurs locations
        */
        return intIds.map((id) => records.filter((record) => record.bike_id === id));
    });
}
module.exports = Rent;
