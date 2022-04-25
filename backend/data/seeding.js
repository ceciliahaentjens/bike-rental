/**
 * Ce fichier à pour but d'insérer en BDD des données de films, d'utilisateurs, de catégories de
 * film et de critiques. Les données de films sont récupérées de l'API omdb si aucun fichier
 * seeding.json n'est présent dans le même répertoire. Pensez à indiquer votre clé d'API dans le
 * .env avant d'exécuter ce fichier s'il n'y a pas de fichier seeding.json.
 *
 * L'exécution de ce script est présente dans le script resetDB et initDB
 */
require('dotenv').config();
const faker = require('faker');
const debug = require('debug')('seeding');
const data = require('./data.json');

const db = require('../app/db/pg');

faker.locale = 'fr';

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function insertPointOfSaleItems() {
    await db.query('TRUNCATE TABLE "point_of_sale" RESTART IDENTITY CASCADE');
    const values = data.point_of_sale.map((item) => `(
        '${item.label}'
    )`);
    const queryStr = `
        INSERT INTO "point_of_sale"
        (
           "label"
        )
        VALUES ${values}
        RETURNING id
    `;
    const result = await db.query(queryStr);
    return result.rows.map((item) => item.id);
}

async function insertTypeOfBikeItems() {
    await db.query('TRUNCATE TABLE "kind_of_bike" RESTART IDENTITY CASCADE');
    const values = data.type_of_bike.map((item) => `(
        '${item.label}',
        '${item.price}'
    )`);
    const queryStr = `
        INSERT INTO "kind_of_bike"
        (
            "label",
            "price"
        )
        VALUES ${values}
        RETURNING id
    `;
    const result = await db.query(queryStr);
    return result.rows.map((item) => item.id);
}

function generateBike(pointOfSaleIds, kindOfBikeIds, nbBike) {
    return [...Array(nbBike)]
        .map(() => {
            const index = randomIntFromInterval(0, kindOfBikeIds.length - 1);
            const kindOfBikeId = kindOfBikeIds[index];

            const indexPointOfSale = randomIntFromInterval(0, pointOfSaleIds.length - 1);
            const pointOfSaleId = pointOfSaleIds[indexPointOfSale];

            const carac = String.fromCharCode(97 + index).toUpperCase();
            const number = faker.unique(faker.datatype.number);
            return {
                status: 'AVAILABLE', number: `${carac}${number}`, kind_of_bike_id: kindOfBikeId, point_of_sale_id: pointOfSaleId,
            };
        });
}

async function insertBikeItems(bikes) {
    await db.query('TRUNCATE TABLE "bike" RESTART IDENTITY CASCADE');
    const values = bikes.map((item) => `(
        '${item.number}',
        '${item.status}',
        '${item.kind_of_bike_id}',
        '${item.point_of_sale_id}'
    )`);
    const queryStr = `
        INSERT INTO "bike"
        (
            "number",
            "status",
            "kind_of_bike_id",
            "point_of_sale_id"
        )
        VALUES ${values}
        RETURNING id
    `;
    const result = await db.query(queryStr);
    return result.rows.map((item) => item.id);
}

(async () => {
    const [pointOfSaleIds, kindOfBikeIds] = await Promise.all([
        insertPointOfSaleItems(),
        insertTypeOfBikeItems(),
    ]);
    debug(`${pointOfSaleIds.length} point of sale inserted`);
    debug(`${kindOfBikeIds.length} kind of bike inserted`);
    const bikes = generateBike(pointOfSaleIds, kindOfBikeIds, 1000);
    const bikeIds = await insertBikeItems(bikes);
    debug(`${bikeIds.length} bike inserted`);

    db.originalClient.end();
})();
