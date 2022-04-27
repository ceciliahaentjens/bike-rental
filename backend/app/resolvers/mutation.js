const { UserInputError } = require('apollo-server');

module.exports = {
    exampleHello(_, args) {
        return args.input;
    },

    async createRent(_, args, { dataSources }) {
        const data = args.input;
        const bike = await dataSources.bike.findByPk(data.bike_id);

        // On vérifie si le vélo existe bien
        if (!bike) {
            throw new UserInputError('The selected bike doesn\'t exist');
        }
        // On vérifie si le vélo est disponible
        if (bike.status !== 'AVAILABLE') {
            throw new UserInputError('The selected bike isn\'t available');
        }
        // On vérifie si il existe au point de vente sélectionné
        if (bike.point_of_sale_id !== data.rent_point_of_sale_id) {
            throw new UserInputError('The selected bike isn\'t available at the current point of sale');
        }

        // J'ajoute la date de début à la mutation
        const startDate = new Date().toISOString();
        data.start_date = startDate;

        // Je crée la location
        const newRent = await dataSources.rent.insert(data);

        // Je marque le vélo comme étant loué
        await dataSources.bike.update({ id: bike.id }, { status: 'RENT' });

        // J'ajoute le vélo à l'objet retourné
        newRent.bike = bike;

        // J'ajoute le point de vente à l'objet retourné
        const pointOfSale = await dataSources.pointOfSale.findByPk(data.rent_point_of_sale_id);
        newRent.rent_point_of_sale = pointOfSale;

        return newRent;
    },
};
