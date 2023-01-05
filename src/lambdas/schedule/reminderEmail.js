const AWS = require('aws-sdk');
const Responses = require('../../commons/API_Responses');

const SES = new AWS.SES();

exports.handler = async event => {
    console.log('event', event);

    const message = `Hey Kim Don't forget to film next weeks serverless video`;

    const params = {
        Destination: {
            ToAddresses: ['wits73@gmail.com'],
        },
        Message: {
            Body: {
                Text: { Data: message },
            },
            Subject: { Data: 'reminder email' },
        },
        Source: 'wits73@gmail.com',
    };

    try {
        await SES.sendEmail(params).promise();
        return Responses._200({ message: 'email sent' });
    } catch (error) {
        console.log('error', error);
        return Responses._400({ message: 'failed to send the email' });
    }
};