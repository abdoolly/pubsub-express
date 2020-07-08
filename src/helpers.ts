import { post } from 'request-promise';
import { Topic } from './models/Topic';

/**
 * @description a simple function to send post request to the subscribers
 * @param url the url to send the request to
 * @param body  the body to send to the specified url above
 */
export const callPost = async (url: string, body: any) => {
    let success = true;
    try {
        let response = await post(url, { body, json: true, timeout: 5000 });
        return { success, response };
    } catch (err) {
        return { success: false, url };
    }
};

/**
 * @description publishes an event object
 * @param topic the topic to publish to
 * @param eventBody the event body to send to the subscribers
 */
export const publishEventToTopic = async (topic: string, eventBody: any) => {
    let urls = await getTopicUrls(topic);
    let requests: Promise<any>[] = [];
    for (let { url } of urls) {
        requests.push(callPost(url, { topic, data: eventBody }));
    }

    let problemUrls: any[] = [];
    let responses = await Promise.all(requests);
    for (let response of responses) {
        if (!response.success)
            problemUrls.push(response.url);
    }

    return { problemUrls };
};

/**
 * @description save the topic and url together in the database
 * @param topic topic to save 
 * @param url url that will receive the request on the topic publishing event
 */
export const saveTopicWithUrl = async (topic: string, url: string) => {
    // if the topic and url exists together already then dont duplicate them
    return await Topic.findOneAndUpdate({
        topic,
        url
    }, {
        topic,
        url
    }, { upsert: true });
};

/**
 * @description get the topic urls using the topic
 * @param topic  topic to get its subscribers urls
 */
export const getTopicUrls = async (topic: string) => {
    return await Topic.find({ topic });
};

