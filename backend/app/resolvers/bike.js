module.exports = {
    kind(parent, _, { dataSources }) {
        return dataSources.kindOfBike.findByPk(parent.kind_of_bike_id);
    },
};
