module.exports = {

    async getAllPointsOfSale(_, args, { dataSources }) {
        const params = { ...args };
        const data = await dataSources.pointOfSale.findAll(params);
        return data;
    },

    async getAllKindsOfBike(_, args, { dataSources }) {
        const params = { ...args };
        const data = await dataSources.kindOfBike.findAll(params);
        return data;
    },

    async getAllBikes(_, args, { dataSources }) {
        const params = { ...args };
        const data = await dataSources.bike.findAll(params);
        return data;
    },

    async getBike(_, args, { dataSources }) {
        const data = await dataSources.bike.findByPk(args.id);
        return data;
    },

    searchBike(_, args, { dataSources }) {
        return dataSources.bike.search(args.searchTerm, args.status);
    },

};
