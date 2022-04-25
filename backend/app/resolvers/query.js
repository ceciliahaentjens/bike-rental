module.exports = {
    hello() {
        return {
            world: 'Hello World',
        };
    },

    async getAllPointsOfSale(_, args, { dataSources }) {
        const data = await dataSources.pointOfSale.findAll();
        return data;
    },
};
