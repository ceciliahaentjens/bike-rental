module.exports = {

    async getAllPointsOfSale(_, args, { dataSources }) {
        const data = await dataSources.pointOfSale.findAll();
        return data;
    },

    async getAllBikes(_, args, { dataSources }) {
        const data = await dataSources.bike.findAll();
        return data;
    },

};
