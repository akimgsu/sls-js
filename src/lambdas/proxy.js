const Responses = require('../commons/API_Responses');

exports.handler = async event => {
    return Responses._200();
};