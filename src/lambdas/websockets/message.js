const Responses = require('../../commons/API_Responses');
const Dynamo = require('../../commons/Dynamo');
const WebSocket = require('../../commons/websocketMessage');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    const { connectionId: connectionID } = event.requestContext;

    const body = JSON.parse(event.body);

    try {
        const record = await Dynamo.get(connectionID, tableName);
        const { messages, domainName, stage } = record;

        messages.push(body.message);

        const data = {
            ...record,
            messages,
        };

        await Dynamo.write(data, tableName);

        await WebSocket.send({
            domainName,
            stage,
            connectionID,
            message: 'This is a reply to your message',
        });
        console.log('sent message');

        return Responses._200({ message: 'got a message' });
    } catch (error) {
        return Responses._400({ message: 'message could not be received' });
    }

    return Responses._200({ message: 'got a message' });
};