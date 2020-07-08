import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import { isValidUrl, isValidTopic } from './validators';
import { validationErrorResponse, successResponse, serverError, systemError } from './responses';
import { saveTopicWithUrl, publishEventToTopic } from './helpers';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * @description a test function acting as subscribtion url which receives topic events
 * and log them
 */
app.post('/event', (req, res) => {
    console.log('event received');
    console.log(req.body);
    return res.send('event received');
});

/**
 * @description post method function to allow client to subscibe to a certain topic with a certain url
 */
app.post('/subscribe/:topic', async (req, res) => {
    let url = req.body.url;
    let topic = req.params.topic;

    if (!url)
        return validationErrorResponse(res, 'Url field is required');

    if (!isValidTopic(topic))
        return validationErrorResponse(res, 'Topic is not valid please remove any special characters');

    if (!isValidUrl(url))
        return validationErrorResponse(res, `Url ${url} is not valid`);

    // saving topic with the url
    try {
        await saveTopicWithUrl(topic, url);
    } catch (err) {
        return serverError(res, 'Something went wrong');
    }

    return successResponse(res, `You have subscribed on topic: '${topic}' with url ${url}`);
});

/**
 * @description post method function to allow client to publish an event object 
 * to all subscribers on a certain topic
 */
app.post('/publish/:topic', async (req, res) => {
    let topic = req.params.topic;

    if (!isValidTopic(topic))
        return validationErrorResponse(res, 'Topic is not valid please remove any special characters');

    let { problemUrls } = await publishEventToTopic(topic, req.body);
    if (problemUrls.length) {
        return systemError(res, {
            error: 'Failed to publish event to the urls below',
            urls: problemUrls
        });
    }

    return successResponse(res, 'Published event to subscribers successfully');
});

export default app;
