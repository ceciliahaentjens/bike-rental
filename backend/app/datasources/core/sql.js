const { SQLDataSource } = require('datasource-sql');
const DataLoader = require('dataloader');

// Le cache par défaut est de 5 secondes, on peut le modifier en passant un entier représentant les
// seconds en argument de la méthode cache
// ! Attention ne pas mettre une valeur trop iportante, car
// ! on ne peut pas suppriomer le cache manuellement
const SECONDS = 10;

class CoreSQLDataSource extends SQLDataSource {
    tableName;

    constructor(knexConfig) {
        super({ client: knexConfig.client });
        this.establishedConnection = knexConfig.establishedConnection;
    }

    async findAll({ skip, take, ...params } = {}) {
        const query = this.knex(this.tableName)
            .connection(this.establishedConnection)
            .select('*');
        if (params) {
            Object.entries(params).forEach(([param, value]) => {
                if (param === '$or') {
                    query.where((builder) => {
                        Object.entries(value).forEach(([key, val]) => {
                            builder.orWhere(key, val);
                        });
                    });
                } else {
                    query.where(param, value);
                }
            });
        }

        if (skip) query.offset(skip);
        if (take) query.limit(take);

        //! Attention : la méthode cache() implémenté par sql-datasource et non Knex execute la
        //! requête. donc ici il faut retourner le résultat directement
        const result = await ((process.env.CACHE_ENABLED) ? query.cache(SECONDS) : query);
        return result;
    }

    async insert(data) {
        const result = await this.knex(this.tableName)
            .connection(this.establishedConnection)
            .insert(data)
            .returning('*');
        return result[0];
    }

    async update({ id }, inputData) {
        const result = await this.knex(this.tableName)
            .connection(this.establishedConnection)
            .where({ id })
            .update({ ...inputData, updated_at: new Date() })
            .returning('*');
        return result;
    }

    async delete(id) {
        const result = await this.knex(this.tableName)
            .connection(this.establishedConnection)
            .where({ id })
            .delete();
        return result;
    }

    async findByPkBulk(ids) {
        const query = this.knex(this.tableName)
            .connection(this.establishedConnection)
            .select('*')
            .whereIn('id', ids);

        const result = await ((process.env.CACHE_ENABLED) ? query.cache(SECONDS) : query);
        return result;
    }

    idLoader = new DataLoader(async (ids) => {
        const intIds = ids.map((id) => parseInt(id, 10));
        /*
        On appelle donc la méthode qui permet de récupérer
        un ensemble de catégories via leurs ids
        */
        const records = await this.findByPkBulk(intIds);

        /*
        Il est indispensable de retourner les id dans
        le même ordre que que ce qui nous est passé en paramètre
        Les fonctions SQL IN / ANY ne nous garantissent
        pas le même ordre que ce qui est passé en requête
        On utilise donc la fonction map sur le tableau d'entrée pour réordonner les objets récupérés
        */
        return intIds.map((id) => records.find((record) => record.id === id));
    });

    async findByPk(id) {
        /*
        Ici plutôt que de faire la requête directement
        On passe l'id au DataLoader qui va le stocker
        Et décharger toute la liste d'id au moment approprié
        et redistribuer à chaque appelant les données demandées.
        */

        if (process.env.DATALOADER_ENABLED) {
            return this.idLoader.load(id);
        }
        const query = this.knex(this.tableName)
            .connection(this.establishedConnection)
            .select('*')
            .where({ id });

        const result = await ((process.env.CACHE_ENABLED) ? query.cache(SECONDS) : query);
        return result[0];
    }
}

module.exports = CoreSQLDataSource;
