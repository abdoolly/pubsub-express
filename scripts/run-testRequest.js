// run a request that talks to the publisher and talks to the subscriber 
let { post } = require('request-promise');

let runTestRequest = async () => {
    try {
        console.log('##############################################');
        console.log('SUBSCRIBING');
        let url = 'http://localhost:3000/subscribe/topic1';
        let body = {
            url: 'http://localhost:3000/event'
        };
        let response = await post(url, { body, json: true });

        console.log(`Sending request to ${url}`);
        console.log('----------------------------------------');
        console.log(`with body ${JSON.stringify(body, null, 2)}`);
        console.log('----------------------------------------');
        console.log(`response is: ${JSON.stringify(response, null, 2)}`);
        console.log('----------------------------------------');
    } catch (err) {
        console.log('Request did not succeed', err);
    }

    console.log('##############################################');
    console.log('PUBLISHING');
    try {
        let url = 'http://localhost:3000/publish/topic1';
        let body = {
            msg: 'hello'
        };
        let response = await post(url, { body, json: true });

        console.log(`Sending request to ${url}`);
        console.log('----------------------------------------');
        console.log(`with body ${JSON.stringify(body)}`);
        console.log('----------------------------------------');
        console.log(`response is: ${JSON.stringify(response)}`);
        console.log('----------------------------------------');
    } catch (err) {
        console.log('Request did not succeed');
        if (!err.error)
            return;

        console.log('with error: ', err.error);
    }
};


runTestRequest().then((data) => {
});