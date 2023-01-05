const Responses = require('../commons/API_Responses');
const Dynamo = require('../commons/Dynamo');
const { withHooks } = require('../commons/hooks');

const tableName = process.env.tableName;

const handler = async event => {
    if (!event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;
    const user = event.body;
    user.ID = ID;

    const newUser = await Dynamo.write(user, tableName);

    if (!newUser) {
        return Responses._400({ message: 'Failed to write user by ID' });
    }

    return Responses._200({ newUser });
};

exports.handler = withHooks(handler);