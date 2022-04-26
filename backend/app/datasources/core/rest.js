const { RESTDataSource } = require('apollo-datasource-rest');
const debug = require('debug')('REST:log');

class MyRESTDataSource extends RESTDataSource {
    didReceiveResponse(res, req) {
        debug(req.url);
        return super.didReceiveResponse(res, req);
    }
}

module.exports = MyRESTDataSource;
