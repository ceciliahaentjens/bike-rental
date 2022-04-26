module.exports = {
    kind(parent, _, { dataSources }) {
        return dataSources.kindOfBike.findByPk(parent.kind_of_bike_id);
    },

    pointOfSale(parent, _, { dataSources }) {
        return dataSources.pointOfSale.findByPk(parent.point_of_sale_id);
    },
};
