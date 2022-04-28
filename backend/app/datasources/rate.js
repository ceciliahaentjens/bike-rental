const MyRESTDataSource = require('./core/rest');

const authorizedCurrency = ['USD', 'CNY', 'GBP', 'BTC'];

class Rate extends MyRESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.exchangerate.host';
    }

    async getSelectedRates() {
        const response = await this.get('/latest');

        // Filter the rates
        const selectedRates = Object.fromEntries(Object
            .entries(response.rates)
            .filter(([key]) => authorizedCurrency.includes(key)));

        return selectedRates;
    }

    async convertPriceTo(price, currency) {
        // Check if the currency is an authorized currency
        if (!authorizedCurrency.includes(currency)) {
            throw new Error(`The selected currency (${currency}) isn't authorized.`);
        }

        const response = await this.get(`/convert?from=EUR&to=${currency}&amount=${price}`);
        const { result } = response;

        return (result.toFixed(2));
    }
}

module.exports = Rate;
