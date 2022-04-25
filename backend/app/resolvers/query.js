module.exports = {

    async getAllPointsOfSale(_, args, { dataSources }) {
        const data = await dataSources.pointOfSale.findAll();
        return data;
    },

};
