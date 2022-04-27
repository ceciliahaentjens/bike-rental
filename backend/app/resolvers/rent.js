module.exports = {

    bike(parent, _, { dataSources }) {
        return dataSources.bike.findByPk(parent.bike_id);
    },

    rent_point_of_sale(parent, _, { dataSources }) {
        return dataSources.pointOfSale.findByPk(parent.rent_point_of_sale_id);
    },

    return_point_of_sale(parent, _, { dataSources }) {
        if (parent.return_point_of_sale_id) {
            return dataSources.pointOfSale.findByPk(parent.return_point_of_sale_id);
        }
        return null;
    },

};
