const Responses = require('../commons/API_Responses');
const Dynamo = require('../commons/Dynamo');

const { withHooks } = require('../commons/hooks');

const tableName = process.env.tableName;

const handler = async event => {
    if (!event.pathParameters.game) {
        return Responses._400({ message: 'missing the game from the path' });
    }

    const game = event.pathParameters.game;
    const gamePlayers = await Dynamo.query({
        tableName,
        index: 'game-index',
        queryKey: 'game',
        queryValue: game,
    });

    return Responses._200(gamePlayers);
};

exports.handler = withHooks(handler);