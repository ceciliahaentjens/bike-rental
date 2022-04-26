const MyRESTDataSource = require('./core/rest');

const selectedCurrency = ['USD', 'CNY', 'GBP', 'BTC'];

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
            .filter(([key]) => selectedCurrency.includes(key)));

        return selectedRates;
    }
}

module.exports = Rate;
