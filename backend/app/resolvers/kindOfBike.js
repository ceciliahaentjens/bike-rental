module.exports = {
    USDPrice(parent, _, { dataSources }) {
        return dataSources.rate.convertPriceTo(parent.price, 'USD');
    },
};
